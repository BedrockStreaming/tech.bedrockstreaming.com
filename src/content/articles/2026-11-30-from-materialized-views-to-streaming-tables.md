---
layout: post
date: 2026-11-30
permalink: /2026/11/30/from-materialized-views-to-streaming-tables.html
title: "From materialized views to streaming tables: cheaper, and finally correct"
description: "Our video consumption pipeline recomputed its full history on every run. Moving it from materialized views to streaming tables with CDC cut its compute costs by about 90%, and fixed data quality bugs hidden in a GROUP BY."
author: [m_fernandes]
language: en
topics: [data, platform, architecture, performance]
excerpt_separator: <!--more-->
---

One of our data pipelines was paying to recompute its whole history every time it ran.
It turns raw video viewing events into one row per viewing session. Several teams use
those rows: analytics, ad targeting, personalisation, and internal reporting.

The pipeline ran on Databricks, as a Delta Live Tables (DLT) pipeline (now called
Lakeflow Spark Declarative Pipelines) built on materialized views. It ran. But each run read the entire table history, grouped it,
and wrote it back. The bill grew with the history, not with the new data.

We moved it to streaming tables with change data capture (CDC). The compute costs
of the pipeline dropped by about 90%. And along the way, we found that the old design was not only
expensive. It was also producing wrong data.

This article explains what we changed, why it was cheaper, and what we gave up in
return.

<!--more-->

## The starting point

The pipeline reads a silver table of consumption events. Each event says that a device
is playing a video, at a given position, with the consent the user has given. A single
viewing session produces many events.

The business rule is simple: **one row per session and per day, with the latest state
of that session**.

The first version implemented this rule with a `GROUP BY`. Two "global" tables grouped
all events by session and day, and wrapped more than 40 columns in `MAX()` or `MIN()`:

```sql
SELECT
  max(event_id) AS event_id,
  min(cast(event_time AS TIMESTAMP)) AS first_event_time,
  max(cast(event_time AS TIMESTAMP)) AS last_event_time,
  max(device_id) AS device_id,
  max(account_id) AS account_id,
  content_session_id AS session_id,
  -- ... 30+ more MAX() aggregations ...
  max(clip.media) AS media
FROM content_consumption_with_consent_silver AS session
  LEFT JOIN clip_bronze AS clip ON ...
  LEFT JOIN program ON ...
  LEFT JOIN video_publication ON ...
GROUP BY
  session.content_session_id,
  CAST(from_unixtime(session.session_create_date) AS DATE)
```

Why a `GROUP BY` with `MAX()` in the first place? The pipeline was a one-to-one
migration of our previous generation of pipelines.
The `GROUP BY` with `MAX()` came from there, where it was a deliberate choice: a session
counted as consented if any of its events had consent. But the old job processed one
day at a time. Our materialized views had no such limit, so every refresh grouped the
whole history. We copied the logic, and lost the one thing that kept it cheap.

From these global tables, the pipeline fanned out to one table per purpose: analytics,
ad targeting, personalisation, consent-exempted uses, and three internal tables. Two of
the internal tables also joined a program tagging table. Each of them did this join on
its own.

<div class="mermaid">
flowchart TD
    S[Silver consumption events] --> G1[Global table A<br/>GROUP BY + 40 MAX columns<br/>3 joins]
    S --> G2[Global table B<br/>same logic, duplicated]
    G1 --> P1[analytics]
    G1 --> P2[ad targeting]
    G1 --> P3[personalisation]
    G1 --> P4[exempted]
    G2 --> I1[internal]
    G2 --> I2[internal advanced<br/>+ tag join]
    G2 --> I3[internal analytics advanced<br/>+ tag join]
</div>

Every table after the silver source was a materialized view.

## Why it cost so much

Databricks can refresh a materialized view incrementally, but only on serverless
compute, and only when the query and its sources meet a list of conditions. Even then,
a cost model decides at each run whether an incremental refresh is worth it. On classic
compute, a materialized view is always fully recomputed
([Databricks documentation](https://docs.databricks.com/aws/en/optimizations/incremental-refresh)).

Our pipeline ran on classic compute for most of its life. When we moved it to
serverless, every table with these aggregations still ran in **full recompute** mode.
Each run re-read the whole history, grouped it again, and rewrote the result.

So the cost had four causes:

- **Full recompute.** Every run processed all historical data, not only the new events.
- **Heavy aggregations.** Grouping on 40+ columns across the full history uses a lot of
  memory and shuffle.
- **Duplicated work.** The two global tables had the same logic. Their outputs were
  identical, because the data that should have made them differ did not exist yet.
- **Joins after the fan-out.** The program tagging join ran twice per run, once in each
  advanced table.

## The bug hidden in the GROUP BY

When we looked at the query closely, we found something worse than cost. `MAX()` does
not mean "latest". It means "biggest". For many columns, the two happen to match. For
some, they don't.

1. **Rewinding a video.** A user watches up to minute 40, then goes back to minute 10.
   The latest position is minute 10. `MAX()` keeps minute 40. The table said the user
   was further into the video than they were.

So the goal changed. We did not only want a cheaper pipeline. We wanted one that keeps
the **latest** state of a session, and can **remove** a row when the latest state says
so.

## The new design: three layers and CDC

The new pipeline has three layers, all built on streaming tables.

<div class="mermaid">
flowchart TD
    S[Silver consumption events] -->|readStream| L1[Layer 1: source<br/>streaming table]
    L1 -->|readStream| L2[Layer 2: enriched<br/>no GROUP BY<br/>stream-static joins]
    L2 -->|CDC| P1[analytics]
    L2 -->|CDC| P2[ad targeting]
    L2 -->|CDC| P3[personalisation]
    L2 -->|CDC| P4[exempted]
    L2 -->|CDC| I1[internal]
    L2 -->|readStream| L3[Layer 3: refined<br/>single tag join]
    L3 -->|CDC| I2[internal advanced]
    L3 -->|CDC| I3[internal analytics advanced]
</div>

### Layer 1: read only what is new

The first layer is a streaming table on top of the silver events. A streaming table
keeps a checkpoint. Each run reads only the events that arrived since the last run.

The source is append-only for our purposes, so we read it with `skipChangeCommits`.
This tells the stream to ignore commits that update or delete rows in the source,
instead of failing on them.

### Layer 2: enrich each event, don't group

The enriched layer keeps the same joins as before (clip, program, video publication),
but it drops the `GROUP BY`. Each event keeps its own values:

```sql
SELECT
  event_id,
  CAST(from_unixtime(session.session_create_date) AS TIMESTAMP) AS first_event_time,
  CAST(event_time AS TIMESTAMP) AS last_event_time,
  COALESCE(device_id, home_id) AS device_id,
  account_id,
  content_session_id AS session_id,
  -- ... direct column mappings, no aggregation ...
  clip.media AS media,
  CAST(from_unixtime(session.session_create_date) AS DATE) AS d_date
FROM session
  LEFT JOIN clip_bronze AS clip ON ...
  LEFT JOIN program ON ...
  LEFT JOIN video_publication ON ...
-- no GROUP BY
```

The joins are now **stream-static joins**. The stream side is the new events. The
static side is the reference tables, read in full at each micro-batch. Only the new
events are joined, not the whole history.

The first event time no longer needs a `MIN()`. We take it from the session creation
date, which every event already carries.

This single table replaces both global tables. They had the same logic and produced the
same output, so there was no reason to keep two. The internal tables now read from the
same enriched layer as the purpose tables.

### Layer 3: join once, before the fan-out

Only two tables need the program tags. So the tag join moved into its own layer, after
the enriched layer and before those two tables. It now runs once per run instead of
twice. The struct it builds is defined in one place, so the two tables can no longer
drift apart.

The general rule we applied: **do expensive work before the fan-out, not after it**.

### Purpose tables: let CDC keep the latest state

This is where "one row per session and per day, with the latest state" is now
implemented. Each purpose table is a streaming table fed by an auto CDC flow:

```python
dlt.create_streaming_table(
    name=TARGET_TABLE,
    partition_cols=["d_date"],
    table_properties=TABLE_PROPERTIES,
)

dlt.create_auto_cdc_flow(
    target=TARGET_TABLE,
    source=SOURCE_TABLE,
    keys=["session_id", "d_date"],
    sequence_by="last_event_time",
    apply_as_deletes=expr("not(adtargeting = TRUE) or adtargeting is null"),
    stored_as_scd_type=1,
    ignore_null_updates=False,
    column_list=TARGET_COLUMNS,
)
```

Each parameter does one job:

- `keys` defines what "one row" means: a session on a given day.
- `sequence_by` defines what "latest" means: the event with the most recent event time
  wins. Events that arrive out of order are handled, because the order comes from the
  data, not from arrival time.
- `stored_as_scd_type=1` overwrites the row. We keep the current state, not the history.
- `apply_as_deletes` removes the row when the latest event matches a condition. For each
  purpose table, the condition is "consent for this purpose is not given". A missing
  consent value counts as no consent: the row is deleted, not kept.
- `ignore_null_updates=False` lets a null in a newer event overwrite the stored value.
  `MAX()` skipped nulls, so this looks like a risk. It is safe here because the key
  identifiers, such as `account_id` and `program_id`, are always filled on every event.

With this, the rewind bug goes away. A rewind produces a newer event with a smaller
position, and it replaces the row. Deletes work the same way: when the latest event has
no consent for a purpose, the row leaves that table.

### How we validated it

We could not compare the old and new tables row by row. The new output was meant to
differ, because the old one was wrong. So we validated against the source events
instead. For each session we checked, we read all its events and confirmed that the
row in the new table held the data of the latest event.

## The results

| | Before (materialized views) | After (streaming + CDC) |
| --- | --- | --- |
| Processing model | Full recompute | Incremental |
| Data scanned per run | Whole history | New events only |
| Compute cost | Baseline | About 90% lower |
| `GROUP BY` operations | Every run | None |
| Program tag joins | 2 per run | 1 per run |
| Refresh frequency | Limited by recompute time | Near real time |
| Video rewind | Wrong position (max) | Latest position |

We then applied the same change to our audio listening pipeline, which had the same
shape and the same problems.

## What we traded

The new design is not free. These are the trade-offs we accepted.

**More intermediate storage.** The old global table was aggregated, so it was small.
The new enriched and refined tables keep one row per event. They take more space. We
accepted this because, for us, storage costs much less than the compute we saved.

**Stream-static joins don't look back.** When a reference table changes, for example a
program gets a new tag, the change applies only to events processed after it. Rows
already written keep the old value. With full recompute, every run used the latest
reference data for all rows. If a team needs corrected history, we have to run a
targeted backfill.

**Changes in the source are ignored.** Because the first layer uses
`skipChangeCommits`, an update or a delete in the silver table does not flow down. For
our source this is fine, because it only receives new events. If that changes, this
setting has to be revisited.

**A full refresh is more expensive.** A streaming table can be fully refreshed, but it
then reprocesses the whole history once. This is a rare operation, not the normal run.
But we plan for it when we change the logic of an upstream layer.

## What we learned

**Check the refresh mode, not only the query.** A materialized view looks incremental
from the outside. On serverless compute, the pipeline event log tells you whether each
refresh was incremental or a full recompute. Ours were full recomputes, every time.

**`MAX()` is not "latest".** A `GROUP BY` with `MAX()` is a common way to deduplicate.
It only works when bigger always means newer. As soon as a value can go down, like a
video position, or switch off on any feature, it gives wrong answers. If the business
rule says "latest", use something that orders by time. Auto CDC with `sequence_by`
does exactly that.

**A new framework does not fix old logic.** Moving to a declarative framework did not
make our logic correct, and it did not make it incremental. It ran the same
`GROUP BY` we gave it. A one-to-one migration is a good first step, but someone has to
read the logic again afterwards.

**Do the expensive work before the fan-out.** If several tables need the same join,
compute it once upstream and let them read the result.

**Deletes are part of the design.** A pipeline that can only add or update rows cannot
follow a user who withdraws consent. With `apply_as_deletes`, removing a row is part of
the normal flow, not a separate clean-up job.

A cost optimization made us read the pipeline line by line. That is how we found the
data quality bugs. In this case, the cheaper design and the correct design were the same.
