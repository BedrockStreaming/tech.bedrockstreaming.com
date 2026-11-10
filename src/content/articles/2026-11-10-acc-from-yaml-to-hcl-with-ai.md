---
layout: post
title: "Our ad configuration moves to HCL, with AI as co-pilot"
description: "Why and how we migrated the configuration of Ad Configurator, our ad decisioning service, from YAML to HCL, Terraform's configuration language, with AI involved end to end: design, code, review, monitoring. What it cost, what it bought us, and why driving the AI rather than letting it run stays entirely our job."
author: [t_petit]
thumbnail: /images/posts/2026-11-10-acc-from-yaml-to-hcl-with-ai/thumbnail.jpg
language: en
date: 2026-11-10
permalink: /2026/11/10/acc-from-yaml-to-hcl-with-ai.html
topics: [backend, architecture, ai]
---

Ad Configurator (ACC, for Ad Configurator Configurable) is the service that decides, for every ad request, which ad server to call and with which parameters. This is the story of how we migrated its configuration from YAML to HCL (HashiCorp Configuration Language, the language of Terraform), with AI involved end to end: design, code, review, monitoring. What it cost, what it bought us, and why driving the AI rather than letting it run stays entirely our job.

## Context

ACC decides, for every ad request, which ad server to call and with which parameters. A "configuration" is a set of files describing, for a given customer and platform, which ad server to contact, which URL to call, and which parameters to send. Business and engineers change this content constantly, at two speeds: a value changes with no deployment, while a real business rule stays code, reviewed and deployed like any other change. That's the system we set out to preserve while migrating.

These configuration files lived in YAML, edited through Ad Configurator Manager (ACM), a dedicated back office hosted in a separate project. We'd wanted to change that for a while: too many easy mistakes to make, implicit behavior that only lived in code, a format that enforced neither precision nor consistency. We moved to HCL, with an editor built into ACC (language server and linter included), all of it built with AI as a pair-programmer. Here's why, and how we got there without breaking anyone's ads.

## Why leave YAML

The format had three concrete flaws, which we let accumulate without ever tackling head-on. Here they are in detail, with real examples.

### You already had to know what to do, and where to look

Here is, pretty much as-is, a real chunk of YAML configuration for one customer (RTLDE), three different files, shown here one after another:

```yaml
kind: configuration
metadata:
  active: true
  customer: rtlde
  description: RTLDE SmartClip Web
  id: m6web_live_web
  version: 11
spec:
  constraints:
    - routine: target
      values: live
    - routine: platform
      values:
        - m6group_web
  providers:
    - id: m6web_smartclip_live_web
      output_key: freewheel
      output_name: freewheel
---
kind: provider
metadata:
  active: true
  customer: rtlde
  description: RTLDE - m6group_web - LIVE - SmartClip
  id: m6web_smartclip_live_web
  version: 7
spec:
  ad_server: smart_x
  format: composed
  attributes:
    ang_plrh:
      routine: player_height
      if_empty: "404"
      if_error: "404"
    fwd_rpusr:
      routine: ad_scheme
      if_empty: ada_free
      if_error: ada_max
---
kind: parameters
metadata:
  active: true
  customer: rtlde
  description: SmartClip ad server parameters for RTLDE
  id: smart_x
  version: 5
spec:
  ad_server: smart_clip
  base_url: {{host}}
  host_targeting_separator: "?"
  targeting_keys_separator: "&"
```

One thing this file doesn't say: `spec.format: composed` silently requires that a `targeting: {}` be returned, a requirement hardcoded in the Go that interprets that field, never mentioned in any configuration. Worse: it complicates onboarding. Old hands know what `composed` and `decomposed` mean; newcomers struggle more. It's implicit behavior living in code rather than in the data meant to describe it.

Even once you've found the right file, finding your way around is a challenge. A definition nests `configuration`, then `provider`, then `parameters` (an inherited name that doesn't make much sense today). Each level is its own file, referenced by ID strings like `m6web_smartclip_live_web` or `smart_x`: connecting the three snippets above means already knowing they reference each other, and where to find each one.

In HCL, all of that fits in a single file, every reference is clickable (jump-to-definition, like in an IDE), and a block shared by several definitions is automatically factored out: delete the last reference to it, and the tooling folds it back in on its own. Here's the full equivalent of the customer above, in a single HCL file:

```hcl
advertising "rtlde_live_web" {
  customer    = "rtlde"
  description = "RTLDE SmartClip Web"

  conditions = [
    contains(["m6group_web"], platform()),
    target() == "live",
  ]

  providers {
    slot "video" {
      name = "smart_x"

      ad_request {
        hostTargetingSeparator = "?"
        targetingKeysSeparator = "&"
        targeting              = {}

        url "host" {
          base_url = "{{host}}"
          query_params = {
            ang_plrh  = fallback(player_height(), "404", "404")
            fwd_rpusr = fallback(ad_scheme(), "ada_free", "ada_max")
          }
        }
      }
    }
  }
}
```

And it's that exact HCL block, once resolved, that produces this JSON: the YAML block above produces the exact same result. The separators were present there too, just buried in another file. The real weak point of YAML is the empty `targeting`, which was never written anywhere in it and shows up here explicitly:

```json
{
  "advertising": {
    "smart_x": {
      "base_url": "{{host}}?ang_plrh=404&fwd_rpusr=ada_free",
      "host_targeting_separator": "?",
      "targeting_keys_separator": "&",
      "targeting": {}
    },
    "providers": {
      "video": "smart_x"
    }
  }
}
```

Assuming this is the only definition that exists (not true in reality, but for the sake of the example): if the conditions aren't met (on replay, say, or on a platform other than web), the response is simply empty, `{}`. It's advertising, so nothing is blocking: never an error, an empty response and an HTTP 200 every time.

Same behavior, same request produced. But one reads, the other has to be deciphered.

### ACM and the HCL editor

ACM, the interface the business side uses, doesn't help: navigating between linked items there is limited and finicky. Links don't always show up, and not every definition type is supported for navigation. Going back can land you on an unexpected page, and climbing back up to the root configuration from a provider or a parameters definition can quickly get complicated.

<center><img alt="ACM, for a single definition: four screens. 1, the flat list behind a single static URL. 2, the detail of rtlde_replay_tvjs, where you read IDs rather than links. 3, another page to open to find rtlde_pausevast_replay_TVJS. 4, yet another for smart_x_rtlde, the last link in the chain. Purple arrows show each click." src="/images/posts/2026-11-10-acc-from-yaml-to-hcl-with-ai/acm-four-screens.jpg"></center>

1. The flat list, behind a single static URL.
2. The detail of `rtlde_replay_tvjs`: you read IDs, not links.
3. You have to open another page to find `rtlde_pausevast_replay_TVJS`.
4. And yet another for `smart_x_rtlde`, the last link in the chain.

Same definition, this time in the HCL editor: it all fits on one screen, no scavenger hunt.

<center><img alt="The HCL editor, same definition, one screen: the file tree and version tabs on the left, the HCL for rtlde_replay_tvjs in the middle with the pausevast block automatically inlined, the computed payload on the right" src="/images/posts/2026-11-10-acc-from-yaml-to-hcl-with-ai/hcl-editor-one-screen.jpg"></center>

*The file tree on the left, the HCL for `rtlde_replay_tvjs` on the right: here the `pausevast` block, automatically inlined.*

Obviously, we don't want to duplicate an identical provider in every definition that uses it. In HCL, factoring is automatic: a block shared by several definitions is extracted on its own, and `Cmd`+click on a reference jumps straight to its declaration; going from an inlined block back to its source, or the other way around, takes no manual gymnastics. For example, `endpoint.smart_x` replaces the old `kind: parameters`: that variable now only holds the host, to avoid duplication. Neither factoring nor inlining is something you manage by hand: the tooling handles it.

### YAML enforces no type

This one is a real bug that shipped to production. The same key, `fwd_br`, written differently depending on the file:

```yaml
# provider smart_x
fwd_br: '1'  # string

# provider yospace
fwd_br: 1    # int

# v2.yaml (drifted over time)
fwd_br: 1.0  # float
```

Nothing says which of the three is correct. And all three shipped to production without a single alert. In HCL, every attribute has exactly one type, declared once in our Go code, checked on load. It's not a convention we hope people follow, it's a structural guarantee.

That power stays scoped: only ~150 already-reviewed Go routines can produce a value, variables are typed and whitelisted, and the schema rejects any invalid definition before it's saved.

### Freewheel's invisible limit

One last example, probably the clearest. Freewheel, one of our ad servers, expects a URL where several parameter blocks are concatenated, separated by `;` (a constraint imposed by Freewheel itself, not by us), a separator that doesn't follow HTTP conventions.

In YAML, that concatenation was handled entirely by Go code, wired to assemble exactly two blocks, glued together by a single `;`:

```yaml
# "targeting" is an internal name, Freewheel never heard of it,
# hence the rename to "key_values" on the HCL side below
spec:
  ad_server: freewheel
  attributes:
    ang_api:
      value: "2,7"
    ang_plrh:
      routine: player_height
      if_empty: "404"
      if_error: "404"
    targeting:
      plcmt:
        value: "1"
      fwd_nltype:
        value: std
```

→ `...host?ang_api=2,7&ang_plrh=404;plcmt=1&fwd_nltype=std`

Nothing in this file says Freewheel expects `block_0;block_1;block_2...`, or that each block must be generated separately then glued with `;`. That rule lived only in rendering code, wired for a fixed number of blocks. The day an extra slot showed up, we simply had no way to express it from the configuration. It would have meant touching Go code, not a file.

Here's the HCL equivalent, for the same result, and the rename of `targeting` to `key_values`, the name Freewheel actually expects. And unlike YAML, HCL also lets you declare extra blocks per slot with `slot_params`, each with its own parameters: something simply not expressible in YAML, where the number of blocks was fixed in rendering code.

```hcl
fw_ad_request "freewheel" {
  fwl_url "host" {
    base_url = var.smart_x_base_url

    query_string {
      param_block_separator = ";"

      global_params = {
        ang_api  = "2,7"
        ang_plrh = fallback(player_height(), "404", "404")
      }

      key_values = {
        plcmt      = "1"
        fwd_nltype = "std"
      }

      # slot_params: only expressible in HCL, not in YAML
      slot_params "0" { ang_ifa = "1" }
      slot_params "1" {
        ang_plrh = "720"
        ang_plwh = "1080"
      }
    }
  }
}
```

Without `slot_params`, one block per `;`:

```text
...host?ang_api=2,7&ang_plrh=404
  ;plcmt=1&fwd_nltype=std
```

*Exactly the same request (`;` included), but here every piece is named and declared.*

With `slot_params`:

```text
...host?ang_api=2,7&ang_plrh=404
  ;plcmt=1&fwd_nltype=std
  ;ang_ifa=1
  ;ang_plrh=720&ang_plwh=1080
```

*Two extra slots, each with its own parameters, each adding its own `;`, simply not expressible in YAML.*

## The migration steps

The single most important point isn't the language, it's the double run: for several weeks, YAML and HCL ran side by side, with production serving never depending on the new format until it had proven it produced the same result. Nothing migrated in one shot. It was a chain of small, reversible steps, at the pace of earned confidence rather than a calendar.

During that double run, we kept shipping new features, on this project and others, without ever impacting the migration, and once it was running, it cost us no daily time: monitoring told us what was happening, and alerted us if production serving misbehaved or the gap between YAML and HCL went beyond what's normal.

Building that plan took time, and AI was involved as much as in the execution: breaking the project into a precise number of steps, ordering their dependencies, defining for each one what would prove it had gone well. That preparation was at least as much work as the code generated afterwards.

We rolled this out through progressive shadowing: every request ran both decoders, the YAML result was the only one served, the HCL result was only compared. External dependencies (an API call, say) only ran once: nothing was duplicated on the network side. Only the HCL interpretation ran in addition, on the same data as the YAML one.

<center><img alt="Progressive shadowing: one ad request enters an orchestrator that runs both the YAML decoder and the HCL decoder, their results go through a comparison step that logs match or mismatch to New Relic, the YAML result is served with ratio 1 always, the HCL result is only compared with a ratio going from 0 to 1 per customer, and rollback is ratio back to 0 with no deployment" src="/images/posts/2026-11-10-acc-from-yaml-to-hcl-with-ai/diagram-progressive-shadowing.png"></center>

*The YAML result shipped alone to production; the HCL result was never served, only compared, until the confidence ratio reached 100%, customer by customer, then switched over to real HCL serving at the same pace.*

This rollback principle holds for both phases, shadowing and later serving: resetting the ratio to 0 is enough, no deployment at all. The idea is to minimize, at every step of the process, the number of actions that can go wrong: turning things on or off, at any point, only ever goes through a feature flag.

This tracking ran on a dedicated New Relic dashboard, built for this project: every YAML/HCL comparison was logged there, customer by customer, platform by platform. The goal was a 100% match. When it wasn't, the dashboard pointed straight at the customer, the platform, and the field that diverges.

| customer | platform | field | yaml | hcl | result |
| --- | --- | --- | --- | --- | --- |
| `rtlde` | `m6group_web` | `fwd_rpusr` | `ada_free` | `ada_max` | **← mismatch** |

Here you can see in seconds that for customer `rtlde`, on `m6group_web`, the field `fwd_rpusr` diverges: HCL returns `ada_max` where YAML returns `ada_free`. Enough to trace straight back to the offending configuration line, without replaying the request by hand.

We ramped the comparison ratio from 0 to 100%, until zero unexplained mismatches for several weeks straight. During that phase, the new HCL editor was already available, but read-only: you could browse it, get used to it, with no save ever coming from there. ACM remained the only hand on the configuration actually served.

Concretely, that ratio lived in a feature-flag key like `hcl_shadow.rtlde.rtlde`, each customer has its own, with a value per target and then per platform, with a default fallback if something is missing (0 meaning 0%, 1 meaning 100%):

```json
{
  "_default": {
    "_default": "0"
  },
  "live": {
    "_default": "0",
    "amazon_kepler": "1",
    "chromecast": "0",
    "foxxum_smarttv": "0",
    "m6group_android_tv": "0",
    "m6group_androidmob": "1",
    "m6group_androidtab": "0",
    "m6group_apple_tv": "0",
    "m6group_hbbtv": "0.3",
    "m6group_ipad": "0",
    "m6group_iphone": "1",
    "m6group_web": "0",
    "magenta_android_box": "0",
    "magenta_ott_boxes": "0.5",
    "ott_boxes": "0",
    "smarttv": "0"
  },
  "replay": {
    "_default": "0",
    "amazon_kepler": "0",
    "chromecast": "1",
    "foxxum_smarttv": "0.5",
    "google_bot": "0",
    "m6group_android_tv": "0",
    "m6group_androidmob": "1",
    "m6group_androidtab": "0",
    "m6group_apple_tv": "1",
    "m6group_hbbtv": "0",
    "m6group_ipad": "1",
    "m6group_iphone": "1",
    "m6group_web": "0",
    "magenta_android_box": "0",
    "magenta_ott_boxes": "0",
    "ott_boxes": "0.6",
    "smarttv": "0"
  }
}
```

Once every platform was at 1, the same principle took over on the serving side, through a `hcl_serving.rtlde.rtlde` key: that's the moment ACM switched to read-only, and the HCL editor took over the saves.

Same ratio-based rollout for serving, with a rollback always available (ratio to 0, no deployment). Today, 100% of traffic is served from HCL, and YAML has been removed.

Despite the double run (YAML and HCL both computed and compared on every request), response time stayed between 40 and 55ms depending on the tenant, throughout shadowing. Shadowing itself was rolled out progressively, platform by platform.

*Small aside: once everything was validated, we reset the ratio to 0% then flipped it back to 100% everywhere at once, on purpose, so we could pull this graph and show in black and white that performance never suffered. The marker below is a feature flag change, not an app deployment.*

<center><img alt="New Relic chart, average response time in milliseconds by status over 30 minutes: a flat line around 50ms for HTTP 200, with a deployment marker in the middle that changes nothing" src="/images/posts/2026-11-10-acc-from-yaml-to-hcl-with-ai/new-relic-response-time.png"></center>

## AI's place in this project

Without AI, a project of this scope (rewriting the configuration format, the editor, the automatic migrator, and keeping both systems alive in parallel during the switch) simply wouldn't have happened on this timeline, with one person on it. We used it across the whole chain: for the design of the feature itself, to write the code (the language, parser, editor, migrator), for review (every step coded by one agent is reviewed by another), and for monitoring the cutover (the YAML/HCL comparison dashboard detailed above).

The project (language, parser, editor, automatic migrator) was built in one month, by a single engineer, for about $4,000 of AI usage overall (Claude and Codex both involved). **51,472 net lines** were added across the five pull requests (PRs) that make up the project, of which only **~75 lines** touched ACC's business core. That's the work serving the entirety of ad traffic today.

*Small aside: that number is only a snapshot. Once the migration is final, all the YAML-related infrastructure will disappear: its validation, ACM itself, and the cautionary guardrails added along the way. So yes, a lot of lines went in, but a lot are also coming back out.*

And despite that volume, ACC's business core was only touched to add the YAML/HCL comparison: the rest of the core didn't move; only the primary and secondary infrastructure around it absorbed the changes.

### Costs and gains

Without AI, this project would have stayed in the backlog, not because we'd have moved slower, but because a single engineer couldn't absorb it on top of everything else, and the team didn't have the budget to isolate it for several months.

<center><img alt="About $4,000 of AI for one engineer-month of work. With AI: about one month, one engineer, about $4,000 of usage. Without AI, estimated: several months and a dedicated team budget that was never granted. Result: a project that simply wouldn't have happened." src="/images/posts/2026-11-10-acc-from-yaml-to-hcl-with-ai/diagram-cost.png"></center>

### Driving the AI, not riding along

But it wasn't autopilot. Our job was to drive the AI rather than let it run: verifiable steps one at a time, precise scoping each time, reviewing every line touching the business core like any other sensitive change. That harness (not the model alone) made the difference.

This harness didn't exist from day one: for most of the project (nearly all of the ~52,000 lines in the end, including the ~75 touching the business core), we worked with a less structured process, adjusting the method day by day, week by week. Each improvement made it a bit faster and cheaper. Only on the last two steps did it reach its most refined form: Claude and Codex paired under human supervision, with a plan, a plan review, one agent coding the step, the other reviewing it, then the roles flip for the next step. The second-to-last step, run over 23 sub-steps this way, cost about $400.

Before launching the last one, we refined the harness further: switching models by task size, a model suggested by the agent in charge based on its own estimate, cleaner context sharing between agents. Result: the last step (21 sub-steps, same pattern) cost about $130.

That harness didn't improve from human supervision alone: the agents knew they were being tested, and gave their own feedback on how to improve the process. They also knew they were competing with each other, each trying to do better than the other on the next step.

*Small aside: we'd already tried this kind of exercise with Claude alone, and the results were worse than with this Claude/Codex mix. But the models changed in the meantime, so that comparison is probably a bit biased.*

<center><img alt="Core business-logic lines touched per PR: 0 for PR 1, 50 for PR 2, 0 for PR 3, 0 for PR 4, 25 for PR 5. Not a downward curve: most PRs touched zero lines of the core." src="/images/posts/2026-11-10-acc-from-yaml-to-hcl-with-ai/diagram-core-lines-per-pr.png"></center>

*~75 core lines in total, concentrated in just two PRs: adding the YAML/HCL comparison (PR 2) and a later adjustment (PR 5). The other three touched zero core lines: the AI kept its work scoped to the surrounding infrastructure, leaving the core alone.*

We also went further than usual on safety nets, knowing AI was involved at this volume of code. Shadowing is one. We also added, temporarily, mechanisms we probably wouldn't have deemed necessary by hand: `recover` calls scattered around, and a hard-delete route kept on hand just in case. None of this is meant to stay. It's cautionary instrumentation, to be removed once trust is established.

> The kind of precaution you gladly take when a good chunk of the code didn't come out of a human keyboard line by line, and you'd rather be able to react fast than bet that nothing will go wrong.

We ship this project two, three, sometimes four times a day, without drama, alongside the squad's other projects, which also deploy continuously. That was already true before AI, and still is since: what makes us effective is how the code is split, and that hasn't changed. AI just helps us be even more so.

The AI itself stays naturally scoped by that architecture: it writes in isolated zones, never in the business core without a review. Some parts could be improved (this isn't a perfect project), but isolated, they never threaten the rest. We work in parallel on improving those weaker zones and on how we scope the AI, and the two pull each other up: better-split code makes it safer to let AI work on it, and scoping the AI better buys us the time to keep improving the code.

We've come to think that over-constraining AI on a clean codebase is actually counterproductive as models keep improving: we'd rather enforce things with linters, and define an architecture validated by a deterministic tool, than build skills to make the AI do it.

On more legacy projects, ones we know less well, or ones mid-rewrite, it's the opposite: we push the AI harder to quickly frame how we want it to work.

None of this is trust earned once and for all. It's a balance we keep reworking, and that's exactly what lets us move fast, with AI, without ever losing control.

> My job as a software engineer has never been to write code, but to solve problems. Code is a tool for solving those problems, and today we write it faster than ever, while still staying in control of it. That lets me spend a lot more time on the facets of the job that, to me, matter far more.
