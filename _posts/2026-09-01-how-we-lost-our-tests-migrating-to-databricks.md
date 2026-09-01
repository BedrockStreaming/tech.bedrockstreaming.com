---
layout: post
title: "How we lost our tests migrating to Databricks (and how we're getting them back)"
description: "Three generations of data pipelines: a well-tested Scala stack, a Databricks rebuild that lost the tests along the way, and the platform we're building to keep the best of both — property-based testing, self-discovering CI gates, and AI with guardrails."
tags: [data-engineering, databricks, spark, scala, python, terraform, testing, tdd, hypothesis, ci, ai]
author: [b_abbad]
color: rgb(251,87,66)
language: en
thumbnail: "/images/posts/2026-09-01-how-we-lost-our-tests-migrating-to-databricks/thumbnail.png"
comments: true
---

Earlier this year, a one-character-wide fix closed a bug that had been failing one of our
pipelines in a particularly instructive way:

```python
# before
return df.drop(*[f"`{c}`" for c in invalid])
# after
return df.drop(*invalid)
```

The function's job was to collect column names that Delta would reject (spaces, weird
characters) and drop them before the write. The bug: PySpark's `df.drop()` takes raw
column name strings, not SQL-style backtick-quoted identifiers. Given quoted names, it
found no matching columns, and since dropping a non-existent column is by design a no-op,
it silently dropped nothing. The guard ran, reported success, and did not guard. Invalid
columns sailed through to Delta, which rejected them and took the pipeline down.

Here is the uncomfortable part. That function is small, pure and easy to test. The
invariant is one line: after dropping, no invalid column remains. A unit test would have
refuted the bug in milliseconds, on a laptop, months before it reached production. The
test didn't exist, and there was a structural reason why: the function lives inside a
784-line Databricks notebook that no test can import.

How it ended up there is the story of a migration. We modernized our data platform's
architecture and lost our tests on the way, which, if the data teams we talk to are any
indication, might be the most common failure mode in this industry. This post walks
through the three generations of our pipelines: the Scala stack whose discipline we loved
and whose weight we didn't, the Databricks rebuild that fixed the weight and dropped the
discipline, and the platform we are building now for the media-consumption data source,
which is our attempt to keep both. It ends with the part we didn't plan: how this
verification infrastructure turned out to decide how much of our development we could
hand to AI agents.

<center><img alt="Three pipeline generations side by side: Scala jobs with tested importable modules, a Databricks rebuild with logic inline in notebooks and no seam for tests, and the new platform where a thin notebook wires an importable, tested Python package" src="/images/posts/2026-09-01-how-we-lost-our-tests-migrating-to-databricks/diagram-0-three-architectures.png"></center>

## Generation one: the Scala years

Our first-generation pipelines were Scala and Spark batch jobs, orchestrated by Airflow,
and their engineering discipline was real. In the core repository, roughly fifteen
thousand lines of test code sat next to nineteen thousand lines of main code. Every
output table was a class whose schema was derived from a case class, so "the table has
the declared schema" was a compile-time property plus a one-line test. Sources were
constructor-injected, which meant a transformation's entire upstream graph could be
stubbed with typed in-memory datasets. The ingestion repository tested against golden
files: real gzipped event payloads, plus a small museum of deliberately malformed ones.
Even the Airflow DAG topology was unit-tested. Compliance rules like per-purpose data
retention were pinned by tests, so a regression there failed CI rather than an audit.

We want to be fair to this stack, because what follows makes more sense if you understand
that it worked. When something broke, a test usually caught it before production did.
Refactoring was routine rather than frightening.

But the weight was real too. Configuration was compiled Scala, written per customer, so
supporting three customers meant three config trees that were 80% identical and had to be
kept in sync by hand. The build produced one jar per customer per environment through six
Maven profiles, and CI compiled all six on every pull request. The inventory of ingested
event types lived in three parallel JSON files of roughly four hundred entries each.
Cross-DAG timing was hand-tuned sensor offsets, annotated with comments about winter
time. The test suite took fourteen minutes. None of this was anyone's fault; it was the
accumulated cost of building per-customer systems before we had a platform. The
consequence was plain: onboarding a new customer or evolving a schema was slow, and
everyone knew it.

## Generation two: a better architecture, minus the tests

So we rebuilt. The next generation moved to Databricks: a medallion architecture (bronze,
silver, gold), declarative pipelines with built-in data-quality expectations, and
reusable internal Terraform modules, so that standing up a new data product became "copy
this folder and change the variables" instead of "write and compile a new config tree".
This was genuinely better. The architecture problems of generation one were solved, and
solved well.

We shipped it under a schedule that was not going to move, and under that schedule the
transformation logic landed where it was quickest to iterate: inline, in notebooks. In
one representative pipeline, about three thousand lines of transformation logic live in
three notebook files, while the importable Python package next to them is empty. The
notebooks aren't careless code; they're well commented, they define functions, they pass
lint. But the functions are defined inside the notebook rather than imported into it, the
files are Terraform templates with `${...}` placeholders interpolated at deploy time, and
they depend on `spark` and `dbutils` globals injected by the runtime. Code like that has
no seam a unit test can grab. It can only be verified by deploying it and watching.

And that's precisely what the repo's own docs prescribed: the verification step for a
change was "apply to staging, run the pipeline, check for green checkmarks in the UI".
The test directory tells the same story. Two test files. One of them is a smoke test
whose docstring reads, in full, `"""To add tests"""`. CI ran linters on every pull
request but no test step; the pytest hook sat in the pre-commit config, commented out.

We want to be precise about what happened here, because "they didn't write tests" is not
it. The linting survived the migration. The code review survived. What got lost was the
factoring that makes tests possible, and it got lost for economic reasons: under deadline
pressure, inline notebook code is faster this week, and the cost lands next quarter. The
platform modules even offered an affordance for shipping a proper Python package
alongside the notebook. The flag sits in the config, set to false.

Next quarter arrived on schedule. Over roughly a year, more than half of the meaningful
commits to that pipeline were fixes. Three separate one-shot repair jobs were written,
deployed and decommissioned to mend data in place. Four corrupted metrics tables had to
be recovered. And a disproportionate share of the incidents were exactly the class a unit
test is best at: pure-logic bugs in column-name validation, the backtick no-op from the
opening among them. Meanwhile the commit history shows sixteen changes evolving the main
notebook for every four touching the tests.

The frustrating part in hindsight: generation one would have caught most of these before
merge, and generation one's tests were only possible because of seams (injected
dependencies, pure functions, importable modules) that the notebook form factor had
quietly removed.

<center><img alt="Five-dimension comparison of generation one and generation two: tenant onboarding, build and deploy, and data-quality checks improve with the rebuild, while the location of the logic and the unit tests are lost" src="/images/posts/2026-09-01-how-we-lost-our-tests-migrating-to-databricks/diagram-1-the-trade.png"></center>

## Generation three: keeping both

We are now building the next platform, for the media-consumption data source (who watched
what, on which device, for how long), and it has one design rule that everything else
hangs off: the legacy stack defines *output semantics only*. We are not porting the Scala
architecture, and we are not repeating the notebook shortcut. The concrete practices:

Notebooks are thin. The product's rulebook states it bluntly: "If you are writing an
`if` inside a notebook, you are in the wrong file." The notebook is the wiring that
declares the pipeline graph; every transformation is an importable, pure function in a
package, where pytest and a local Spark session can reach it. The notebook itself is
inside the lint and type-check gate like any other file, because it is effectively the
product's `main.py`.

Tests come first, mechanically. The rule is "a transform without a unit test does not
merge", and the failing test exists before the implementation. Fixtures are synthetic
and PII-free. This sounds like textbook TDD because it is; the only interesting part is
that it held, and what it caught. Before the pipeline had run even once on a cluster,
the test suite had surfaced six real defects, including a Spark ANSI-mode behavior change
on empty arrays, an inverted boolean in an exclusion predicate that would have kept every
row it was meant to filter, and a hash that silently depended on the machine's timezone.
Our internal RFC records it in one line: three real defects were caught before a single
DBU was spent. The suite went from 112 tests to just under 600 in the product's first
weeks, and it runs in under two minutes.

Structure mirrors infrastructure. The source tree, the test tree and the Terraform roots
share one vocabulary (bronze, silver, facts, ops), one to one. Establishing that mirror
was itself a bug hunt: the restructuring exposed two latent deployment defects, including
a file-upload rule that would have shipped 2 of the 19 library files and left the rest
behind. Both were invisible to tests and would have been fatal on the first pipeline
update.

## Property-based tests, or: the bugs you didn't imagine

Unit tests, including ours, share a silent assumption: the author can imagine the bad
input. For open-ended input spaces, names, paths, dates, identifiers, that assumption
fails quietly. Our favorite recent example is a validator guarding a destructive
operation. Identifiers were checked against an allowlist regex anchored with `$`:

```python
run_id_re = re.compile(r"^[a-z0-9_-]{1,64}$")
```

In Python, `$` matches at the end of the string, and also just before a trailing
newline. So `"abc123\n"` validates, newline included, and that string was on its way
into a SQL `DELETE` statement built from it. Four of our validation regexes had the same
anchor. Every example-based test passed, because nobody writes the trailing-newline
example. That is the pattern: the bug class that survives example tests is the class
nobody thought of.

A property-based test inverts the job. State what must hold for all inputs; let the
framework hunt. With [Hypothesis](https://hypothesis.readthedocs.io/):

```python
from hypothesis import given, strategies as st

@given(st.text())
def test_validator_rejects_anything_not_purely_allowlisted(s):
    if run_id_re.match(s):
        assert set(s) <= ALLOWED_CHARS
```

Hypothesis finds the newline in seconds and shrinks it to a minimal counterexample. The
fix is one character: `\Z`, which anchors at the true end of the string. All four
regexes now use it, and twenty-two property tests now cover the validators and parsers
whose input spaces are too large to enumerate.

Two honest footnotes, because property testing gets oversold. First, in CI we pin the
random seed: a blocking gate that fails on a different input every run is a gate people
learn to re-run rather than read. That buys reproducibility at the price of exploring a
fixed slice of the space. Second, this technique has found us one defect class so far,
not ten; the six pre-cluster catches above came from ordinary disciplined unit tests.
Property tests are a scalpel for a specific wound, the imagination gap, and that wound
is real: it is the same one the backtick bug came through.

## Gates that discover their own scope

The second generation had another quiet failure mode worth designing against: the hollow
gate. Its contract-checking crown jewel was six hundred lines of logic inlined in a CI
workflow file, where no test could reach it, and its pytest step was configured but never
wired to run. A gate that exists and doesn't fire is worse than no gate, because it
radiates confidence.

Our defense in generation three is a verification script with a design rule stated in
its own header: discovery, not enumeration. It never contains a list of things to check.
It finds every Python product by globbing for `pyproject.toml`, every Terraform root by
globbing for `backend.tf`, every generated artifact by globbing for its regeneration
script, and then asserts per discovered item: tests exist, lint passes, formatting holds,
generated files match their sources. The header includes the sentence that motivated the
rewrite, which we'll admit was written about ourselves: "a root missing from the list is
a root nobody checks" was true of this file about itself. The day the hand-maintained
list became a glob, the script flagged two Terraform roots that had never been checked by
anything. Not new roots. They had been green by omission since the day they were created.

The other design rule is honest exit codes. A skipped gate is not a passed gate: if a
required tool is missing, that's a failure, not a skip. There is no `|| true` anywhere in
the script, and a comment forbids adding one. As the platform grew, the gate count went
from 10 to 31 without a single edit to the script, which is the point: coverage that
tracks the codebase by construction instead of by diligence.

<center><img alt="Four-step flow of a discovery gate: glob the repository for structural markers, derive the checklist per discovered item, assert every gate treating a skipped check as a failure, and exit listing exactly what is missing" src="/images/posts/2026-09-01-how-we-lost-our-tests-migrating-to-databricks/diagram-2-discovery-gates.png"></center>

## Where AI comes in

Everything above would have been worth doing in any decade. What makes it strategic now
is a change in economics.

Be honest about why generation two happened: rigor costs engineer-hours, deadlines don't
negotiate, and rigor lost. Discipline was the only remedy on offer, and discipline loses
that fight often enough that most data teams have a story like ours. What changed is
that the marginal cost of rigor collapsed. On the new platform, AI agents write most of
the first draft of everything: the property tests, the Terraform for a new stage, the
schema definitions, the test fixtures. The suite grew from 112 to nearly 600 tests in
weeks at constant team size, and that growth is the direct product of agents doing the
mechanical writing while humans decide what must be true.

The reason this is safe here, and would have been reckless on generation two, is the
infrastructure this post has been describing. An agent's characteristic failure is
confident, plausible, wrong code, which is the exact failure the gates catch. A property
test doesn't care who wrote the regex. The discovery script doesn't care who added the
Terraform root; the moment an agent scaffolds one, CI demands its tests and its wiring,
and an agent cannot forget what a glob will find. We've also adopted a working rule for
review: when an incident or a review reveals a mechanical hazard class, the fix is not
vigilance, it is an executable guard. Internally we phrase it as "if it can be
greppable, it must be a failing test", and the review agents check diffs against those
declared hazards rather than free-associating over the code. The same principle covers
our own claims: our repo rule is "verify, don't assert", and the verification script
exists so that a reviewer, or an agent, can re-check a claim like "everything passes"
instead of trusting a status file that says so.

So the loop runs in both directions. The gates make agent output trustworthy, and agents
make gate-quality rigor affordable. But the order of operations is the entire lesson of
our second generation: the verification infrastructure has to come first. Point agents
at a codebase with no invariants holding them and you don't get a faster team. You get
our generation two at machine speed.

<center><img alt="The development loop: an AI agent drafts tests and infrastructure, the output passes through a trust boundary of property tests, discovery gates and hazard guards, a human reviews the invariants, the change merges, and red builds feed back to the agent" src="/images/posts/2026-09-01-how-we-lost-our-tests-migrating-to-databricks/diagram-3-ai-loop.png"></center>

## If you want to try this

The order matters more than the ingredients:

1. Give your logic seams. Pull transformations out of notebooks into importable, pure
   functions with injected dependencies. This is the step generation two skipped, and it
   is the precondition for everything else. The notebook keeps only the wiring.
2. Property-shape the tests where input spaces are open-ended: names, identifiers,
   paths, dates. One invariant per function; let the framework do the imagining. The
   first shrunk counterexample will convert more colleagues than any slide deck.
3. Convert one hand-maintained checklist into a gate that discovers its own scope. Glob
   for the structural marker, derive the checks, and treat a skipped check as a failure.
   Expect the first run to find something; that finding is the inventory of what you
   weren't checking.
4. Then open the door to the agents: tests first, hazards declared as executable guards,
   automated review before every PR. They are exactly as good as the fences you've built.

## Closing

We should say plainly where we are: the new platform is young. Its first production
milestone is still ahead of it, and its output will have to prove itself against the
legacy stack's numbers through a formal parity gate, seven consecutive clean daily runs,
before anything gets switched over. What we can already say is that it caught its first
six bugs before it ever touched a cluster, that its checklist cannot silently rot, and
that we now know, from having lived both, which half of a migration is easy to lose in
transit.

The backtick bug at the top of this post was one character wide. The hole it revealed
was a missing test; the hole behind that was a missing seam; and the hole behind that
was a migration that optimized everything it could see. Architecture is what you draw on
the whiteboard. Discipline is what's left when the deadline arrives. This time we built
the discipline into the structure, where deadlines can't reach it.

This is the data engineering chapter's first article on this blog. The next chapter of
this story is the parity run and the cutover, and we intend to report it here, including
whatever it breaks.

*Thanks to the data engineering chapter, whose work this describes, to Jabrane Hajadi
for backing the article, and to our reviewers in the blog channel.*
