---
layout: post
title: "8,591 invisible errors per request: the PHP 8.5 deprecation that doubled our CPU"
description: "Upgrading to PHP 8.5 doubled our CPU usage and blocked a migration for four months. The cause was a single deprecated method call — raised 8,591 times per request, logged nowhere, and spotted on day one by the AI agent that then spent months looking everywhere else."
author: [b_colin]
category:
tags: [php, performance, profiling, newrelic, excimer, opcache, kubernetes, ai, loadtest, gatling]
color: rgb(79, 91, 147)
language: en
comments: true
---

Our BFF — the service that assembles every layout served to our apps — had a PHP 8.5 migration PR open since April. It was approved by four reviewers and technically ready. It stayed blocked for four months, because every benchmark said the same thing: PHP 8.5 was slower. Noticeably slower.

The final answer turned out to be a single deprecated method call in a library, raised **8 591 times per request**. Getting there took two false leads, six load-test sessions, a dozen throwaway deployments, and a profiler we had to compile ourselves.

This is the story of that investigation, and of what an AI agent could and could not do when we handed it real access to the codebase, to New Relic, to our container registry and — eventually — to the deploy pipeline.

## Table of Contents

- [The symptom](#the-symptom)
- [False lead #1: OPcache was never enabled](#false-lead-1-opcache-was-never-enabled)
- [The regression survives](#the-regression-survives)
- [False lead #2: the instruments were lying](#false-lead-2-the-instruments-were-lying)
- [Fifteen components, all at parity](#fifteen-components-all-at-parity)
- [Excimer, and the difference between inclusive and self time](#excimer-and-the-difference-between-inclusive-and-self-time)
- [The verdict](#the-verdict)
- [The notice we had already seen](#the-notice-we-had-already-seen)
- [What Claude was good at, and what it got wrong](#what-claude-was-good-at-and-what-it-got-wrong)
- [Takeaways](#takeaways)

## The symptom

The numbers from the spring benchmark campaign were consistent and ugly: **−15 to −17 % RPS**, **+34 to +36 % on APM p50**, **+29 % CPU per request**. Several rounds of cells had been run — PHP 8.4 vs 8.5, New Relic on and off, `lazy: true` vs `lazy: false` on the Redis provider, JIT on and off — and the regression survived all of them.

One earlier finding pointed at downstream HTTP calls: a "+20–25 ms of PHP-side overhead per call" that showed up on fast internal services and vanished on slow ones like S3. It looked like a smoking gun. Keep it in mind — we will come back to it.

So we started again, this time with [Claude Code](https://claude.com/claude-code) working alongside us in the terminal, and gave it access progressively: the repository first, then New Relic and Grafana, then AWS so it could inspect our container registry, then read-only Kubernetes, and finally permission to dispatch deployments itself.

That progression matters. Each level of access unlocked a class of question the previous one could not answer — and, as it turned out, the very first one it was given beyond the source code is what cracked the first false lead open.

## False lead #1: OPcache was never enabled

The first thing the agent did with ECR access was not to read code. It pulled the base images and compared what PHP actually reported at runtime:

```bash
docker run --rm --entrypoint php <base-php-84> -r 'echo ini_get("opcache.memory_consumption");'
docker run --rm --entrypoint php <base-php-85> -r 'echo ini_get("opcache.memory_consumption");'
```

| | `base-php-84` | `base-php-85` (pinned in the PR) |
|---|---|---|
| `opcache.memory_consumption` | **512 MB** | **128 MB** |
| `opcache.max_accelerated_files` | **32000** | **10000** |
| `opcache.validate_timestamps` | **0** | **1** |

The 8.5 image was running on OPcache's **built-in defaults**. The reason is a subtle packaging change: since PHP 8.5, OPcache is statically compiled into the engine. There is no `opcache.so` to load with `zend_extension`, and nothing for `phpenmod` to enable — so the 8.4-era `mods-available` + `phpenmod` mechanism in our base images applied *nothing at all*, silently.

The agent then quantified it against our real application image, by compiling the whole vendor tree and reading `opcache_get_status()`:

| config | scripts cached | memory | verdict |
|---|---|---|---|
| 128 MB / 10000 / `validate_timestamps=1` | **4 456 / 16 056** | 128 MB used, **0 free** | `cache_full=true` |
| 512 MB / 32000 / `validate_timestamps=0` | **16 056 / 16 056** | 433 MB used, 78 MB free | `cache_full=false` |

Roughly **72 % of the codebase was being recompiled on every single request**, plus a `stat()` per included file from `validate_timestamps=1`.

The fix was upstream and already merged in our base-images repository — it had landed *one day after* the image tag pinned in the PR was built. A one-line bump.

It also meant something less pleasant: **every load-test number produced before that date was void**, including the "+20–25 ms per downstream call" conclusion that had oriented months of investigation.

## The regression survives

With OPcache verified correct in the deployed image, we ran a fresh load-test session on staging and the regression was still there. Bigger, in fact, once measured properly: **+124 % CPU per request**.

This is where the AI's autonomy started paying off. We drive our load tests with [Gatling](https://gatling.io/), and announce each session in a shared channel so everyone knows an environment is under load and why. We opened one on a staging environment, held a constant ~50 rps on a fixed endpoint mix for the afternoon, and gave the agent permission to dispatch deployments itself. It then ran a series of cells without further input — each one a throwaway branch, deployed, warmed, measured, and superseded by the next:

| cell | what it isolates |
|---|---|
| 8.5 with the APM agent's Guzzle instrumentation disabled | the HTTP instrumentation specifically |
| 8.5 with the APM extension not loaded at all | the agent as a whole |
| **8.4 with the APM extension not loaded** | the missing control, to complete the 2×2 |
| 8.5 with a newer APM agent version | the agent version |

The loop per cell was roughly twenty minutes — ten of image build, three of rolling restart, six of warm-up before any number counts — and the agent handled the whole cycle: dispatch, watch the job graph, measure, record, move on. Two details mattered more than they sound. Our deploy pipeline continues on to production once staging succeeds, so it **cancelled each run the moment the staging job completed**, with the production environment's manual approval gate as a second line of defence; production was verified untouched throughout. And because two of these cells remove the APM agent entirely — taking application monitoring with it — request throughput had to be recovered from a *downstream* service's own monitoring, which tracked our rate to within 1 %.

The third cell is the one worth dwelling on. The agent had already measured 8.5-without-agent and was about to conclude that the agent explained most of the regression — a conclusion that would have been wrong, because the comparison point still *had* an agent in it. Spotting the asymmetry and spending a deploy on the missing control is what turned four numbers into a usable 2×2:

| | agent ON | agent OFF |
|---|---|---|
| **PHP 8.4** | 25.8 cores | **13.7 cores** |
| **PHP 8.5** | 43.8 cores | **30.7 cores** |

Two results at once. New Relic instrumentation costs **~12–13 cores on both versions** — so it is expensive (about 47 % of this service's CPU, a finding worth its own ticket) but it is *not* the regression. And with the agent removed from both sides, PHP 8.5 still cost **+124 %**.

Eager versus lazy Redis connections made no difference. The agent version made no difference — the newer one measured 44.9 cores against 43.8, well inside noise. Node placement was excluded too: the cluster autoscaler had spread the cells unevenly across ARM and x86 nodes, but both architectures regressed by the same factor. At the end of the session the agent redeployed the main branch and confirmed the environment was back to normal.

## False lead #2: the instruments were lying

The agent had built a detailed per-downstream-host analysis from New Relic span data: `/bff/bookmarks` at 70 ms on 8.4 versus 379 ms on 8.5, and so on. It looked like a precise localisation.

Then one cell from that same session disproved it. With the agent's Guzzle instrumentation switched off, the external spans shrank by 23–62 % — while **wall-clock duration and CPU did not move at all**.

The spans had been inflated by the agent's own instrumentation. The calls were never really taking 379 ms. An entire branch of the analysis, built on that data, had to be thrown out.

The lesson generalises badly for anyone doing this kind of work: on an async, wrapper-heavy stack, *the instrument perturbs what it measures*, and it does so unevenly. We later saw the same effect quantitatively — `transaction_tracer.detail = 1` put the HTTP stack at **4.9×** where the application's own clock said **1.74×**.

What saved the investigation was an independent measurement we already owned: custom events emitted by our own code, with our own timers, recorded alongside the APM data. Being application-level, they are immune to whatever the agent is or is not instrumenting. They pointed somewhere quite different — the **per-item** work of assembling a layout block, with cache **hits** four times slower on 8.5:

| `cacheStatus` | 8.4 | 8.5 |
|---|---|---|
| **hit** | ~8 ms | **~35 ms** |
| miss | ~92 ms | ~188 ms |

A cache hit involves no downstream call at all. So the cost was not in HTTP, and it scaled with the number of items processed.

## Fifteen components, all at parity

That should have made it easy to reproduce locally. It did not.

The agent benchmarked, in the real production images, on both PHP versions: the interpreter itself, `curl` + `json_decode`, the full Tornado → Amp (uv driver) → Guzzle async path, igbinary, APCu, json, zstd, native `serialize`, Symfony's `DefaultMarshaller`, `ApcuAdapter`, `RedisAdapter` against a real Redis, autoload + container boot, OPcache footprint, GC, and a complete nginx + php-fpm harness.

**Fifteen components, all at parity.** It even pulled a real serialised value out of the staging Redis cluster and replayed it through the exact production deserialisation path — zstd decompression, then igbinary — on both versions: 44 µs on 8.4, 43 µs on 8.5.

Only the assembled workload was slow. Which is exactly why months of microbenchmarking had found nothing.

## Excimer, and the difference between inclusive and self time

Every instrument we had reported **inclusive** time, and on this codebase that is close to useless. A 2023 Blackfire proof-of-concept had already failed for the same reason: the Tornado event loop puts `wait()` underneath everything, so the call tree is unreadable.

What we needed was **self time** — time attributed to the frame actually executing, not to its callers.

[Excimer](https://www.mediawiki.org/wiki/Excimer) does that. It samples on a CPU-time timer and attributes each sample to its leaf frame, so `wait()` becomes an ordinary frame and I/O wait is excluded by construction. Since Sury ships no `php8.x-excimer` package, we built it from source in our existing `php_builder` stage, mirroring how we already build `php-uv`.

Getting the data *out* was its own problem. There is no `kubectl exec` or `kubectl cp` on these pods, and an unauthenticated dump route on an internet-reachable ingress was not worth the exposure. So the profiler folds self-time counts into APCu during the request and ships them at `kernel.terminate` as **New Relic custom events**, reusing a pattern the service already had. Off by default behind a flag, capped at 150 functions per pod per minute to stay clear of account-wide ingest limits.

Two cells, differing only by PHP version, both with the profiler enabled so the sampling distortion was symmetric.

## The verdict

The profile did not show one slow frame. It showed a **cluster** of them, and together they were **93 % of the delta** (self time per request, 8.4 → 8.5):

| frame | 8.4 | 8.5 | |
|---|---|---|---|
| `ErrorHandler::cleanTrace` | 6.09 ms | **95.93 ms** | 15.7× |
| `ErrorHandler::handleError` | 5.06 ms | **79.05 ms** | 15.5× |
| Monolog (5 frames) | 2.90 ms | 28.83 ms | |
| `configureException` closure | 1.59 ms | 28.98 ms | |
| `FailingPromiseCollection::unwatchPromise` | 1.21 ms | 24.41 ms | 20.1× |

Everything else was at parity. That shape is the whole story: the last row is the *cause*, the rows above it are the *cost*.

PHP 8.5 deprecates `SplObjectStorage::detach()`. `unwatchPromise()` calls it, and it runs on **every promise resolution** — so the notice fires once per promise. On a request that fans out across our async stack, that is **8 591 deprecations per request**.

The notice itself is cheap. The error handler around it is not. Symfony's `ErrorHandler` builds an `ErrorException`, then calls `getTrace()` and `cleanTrace()` on it, **before** deciding what to do with the record. `tracedErrors` defaults to `0x77FB` and Symfony never calls `traceAt()`, so every diagnostic is traced regardless of whether any logger wants it. The record is then handed to Monolog, which builds a `LogRecord` that `FilterHandler` promptly **drops** — our `deprecation` channel has no handler and falls through to `ignore_third_parties` at `min_level: CRITICAL`.

All of the work, none of the output. **Log volume never moved** — level-3 logs sat at ~22/s on both cells — which is precisely why every log-based check said "nothing wrong" for months.

Ranking every diagnostic raised over 5 minutes across 36 pods made the scale obvious:

| diagnostic | count |
|---|---:|
| `SplObjectStorage::detach()` | **131 828 912** |
| guzzlehttp/psr7 `withHeader()` given an int | 7 168 272 |
| `CURLOPT_SHARE` | 45 024 |
| `SplObjectStorage::attach()` | 12 784 |

| | 8.4 | 8.5 unpatched | 8.5 + fix |
|---|---|---|---|
| PHP CPU per request | 202 ms | 458 ms | **220 ms** |
| replicas at ~50 rps | 19 | 36 | **28** |
| cache-hit block resolution | 7.26 ms | 23.34 ms | **7.54 ms** |
| `SplObjectStorage` notices / request | 0 | **8 591** | **0** |

The fix is two lines in [Tornado](https://github.com/BedrockStreaming/Tornado/pull/56) — our own package, which made this pleasantly easy: `detach()` → `offsetUnset()`, `attach()` → `offsetSet()`, semantically identical since `detach()` is documented as an alias. Merged and tagged `v1.0.1`.

The four-month-old PR was merged on 12 August and reached all three production clusters within fifteen minutes. Verified the next day over matched 18-hour windows before and after the cutover:

| | platform A | platform B | platform C |
|---|---|---|---|
| avg latency | 360→349 ms | 301→317 ms | 275→269 ms |
| p95 | 1313→1313 ms | 844→922 ms | 672→672 ms |
| error rate | 0.012→0.008 % | 0.015→0.009 % | 0.014→0.003 % |
| total PHP CPU cores | 93→94 | 57→59 | 29→28 |

CPU parity is the decisive line — it is the number that was +127 % unfixed.

## The notice we had already seen

Here is the part worth sitting with.

On the very first day of the investigation, the agent ran the Behat suite with `E_DEPRECATED` re-enabled to find out what the PR had silenced. It found exactly one deprecation, and reported it:

```
Method SplObjectStorage::detach() is deprecated since 8.5, use offsetUnset() instead
  in vendor/m6web/tornado/src/Adapter/Common/Internal/FailingPromiseCollection.php:28
```

It then did the reasonable thing: documented it as vendor code we could not fix from here, kept the `E_DEPRECATED` filter in the test config with a comment explaining why, and moved on to hunt the performance problem.

The root cause was on screen, correctly identified, on day one — and filed as test-suite noise. Nobody connected "a deprecation notice in a hot path" with "2× CPU", because deprecation notices are supposed to be free. They are not, once an error handler is installed.

## What Claude was good at, and what it got wrong

Being honest about both is the only way this account is useful.

**Where it clearly helped.** It compared artifacts rather than intentions — pulling six ECR image tags and diffing their runtime `ini` output is what found the OPcache trap in the first hour, after months of reading configuration files that *said* the right thing. It built measurement harnesses quickly, and ran the deploy-measure-rollback loop across a dozen cells with a discipline that is tedious for a human: pinned replicas, verified warm-up, load-rate cross-checks via downstream throughput, and a cancel-before-production guard on every run. It also caught its own methodological errors — noticing that a "parallel" benchmark had been serialised by a single-threaded origin server, by checking that the sum of injected latencies matched the measured wall-clock.

**Where it was wrong.** It produced at least four confident hypotheses that measurement demolished: object hydration, the Symfony cache layer, `ini_set` overhead in the marshaller, and the whole per-downstream-host analysis built on inflated spans. It twice concluded a file did not exist because it had truncated its own directory listing with `head`. And it estimated an ingest cost 50× too high, because it had not checked that the span sampling cap was already saturated.

The pattern is consistent: it was strong at *executing* a measurement protocol and at cross-referencing artifacts, and weak at *guessing mechanisms* from a distance. Nearly every hypothesis it volunteered without data was wrong; nearly every conclusion it derived from a measurement was right.

Which is also why the ending worked. Choosing excimer was not a lucky guess — it followed from a measured observation, that two instruments disagreed by 3× on the same code because both reported inclusive time. Once the tool matched the question, the answer took one profiling run. The agent's most useful move in four months was recognising that its instruments were the problem.

The human contributions that actually unblocked things were small and decisive: pointing it at our own application-level events when the APM span data proved untrustworthy, granting the access that made artifact comparison possible, running the load, and knowing that the cache cluster was reachable from a workstation when the agent had assumed it was not.

## Takeaways

**A deprecation notice is not free.** With an error handler installed — which any Symfony application has — each one can cost an exception construction and a backtrace walk. In a hot path called thousands of times per request, that is a performance bug wearing a compatibility warning's clothes. Before a major version migration, count your notices; do not just silence them.

**Silencing deprecations hides cost, not just messages.** Our test configuration filtered `E_DEPRECATED`, and our log levels discarded the records at the end of a full handler cycle. Both made the problem invisible while leaving it fully paid for.

**There is a cheap defence in depth, and we did not have it.** Symfony's `framework.php_errors.log` accepts a level map, not just `true`. Omitting `E_DEPRECATED` and `E_USER_DEPRECATED` from it leaves those types with no logger, so `loggedErrors` excludes them and `ErrorHandler` returns *before* building the exception and walking the backtrace. It costs nothing in observability — those records were already being discarded — and it would have capped the blast radius of this bug at roughly zero, whatever library had raised the notice.

**Verify the runtime, not the configuration.** Our base images *contained* correct OPcache settings that were never applied. Only asking a running container what `ini_get()` returns exposed it.

**Know whether your profiler reports inclusive or self time.** On an async, wrapper-heavy stack, inclusive time will confidently point you at the wrong frame — and different instruments will disagree with each other by 3× while all looking authoritative.

**Microbenchmarks prove the absence of a problem, not its location.** Fifteen components at parity told us, correctly, that no single component was broken. Only profiling the assembled workload under real load found the interaction.

---

*Thanks to Anthony Tenneriello for the original migration work and the many bench cells that preceded this one, and to everyone who kept the load-test sessions running on staging while we deployed a dozen throwaway builds on top of them.*

*Disclosure: the investigation described here was carried out with Claude Code, and this article was written with Claude too — from the pull requests, the profiling data, the load-test session notes and the agent's own memory of the work. Which is also why the section on what it got wrong is as detailed as the one on what it got right: those mistakes are in the transcripts, and leaving them out would have made for a much less useful article.*
