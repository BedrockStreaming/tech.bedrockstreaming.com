---
layout: post
title: "Hosting the 2026 World Cup on M6+"
description: "How Bedrock prepared M6+ for the 2026 World Cup: prescaling, load tests, edge features and plan Bs. 54 matches, 39 days, zero major incident."
author: [v_chabrier]
category:
tags: [kubernetes, scaling, prescaling, high availability, aws, cloud, cdn, resilience, loadtesting]
color: rgb(251,87,66)
thumbnail: "/images/posts/2026-08-25-hosting-the-2026-world-cup-on-m6plus/traffic-curve.png"
language: en
comments: true
---

On June 11th 2026, Mexico and South Africa kicked off the World Cup. For us, it was the start of 54 matches streamed on M6+ and 39 days of match-evening operations.

At Bedrock, we build and operate M6+, the M6 group's streaming platform, along with the platforms of several other European broadcasters.

This was not our first international football championship on M6+ but it was the first at this scale. M6 acquired the rights to nearly every match of the tournament: we had never streamed that many matches, especially during the night, and we expected more simultaneous users than the platform had ever seen.

A football kickoff is a brutal load pattern. Millions of users arrive in a few minutes, all for the same live stream. Reactive autoscaling alone cannot follow that curve. But a kickoff has one good property: you know when it happens. Everything we did for this World Cup comes down to that: **anticipate, prepare, verify**.

Here is how we validated the platform months ahead, how the match evenings went, and how we made a success of this worldwide event.

## Table of Contents

* [Preparing months ahead](#preparing-months-ahead)
    * [Prescale, don't react](#prescale-dont-react)
    * [Load tests: validate, and calibrate](#load-tests-validate-and-calibrate)
    * [Serve the match from the edge](#serve-the-match-from-the-edge)
    * [Plan B: circuit breakers and fallbacks](#plan-b-circuit-breakers-and-fallbacks)
    * [Freeze, then keep verifying](#freeze-then-keep-verifying)
* [Match evenings](#match-evenings)
    * [The evening ritual](#the-evening-ritual)
    * [The lifecycle of a match evening](#the-lifecycle-of-a-match-evening)
    * [When the unexpected happens](#when-the-unexpected-happens)
* [Wrap-up](#wrap-up)

# Preparing months ahead <a name="preparing-months-ahead"></a>

## Prescale, don't react <a name="prescale-dont-react"></a>

In 2022, we explained [how we prescale our platform](https://tech.bedrockstreaming.com/2022/02/03/prescaling.html) for football evenings. The idea has not changed: for an event of this scale and importance, don't bet on reactive autoscaling. When millions of users arrive in the same couple of minutes, capacity must already be there.

And we don't try to optimize the last few euros of compute: a tournament like this happens about once a year. We would rather start a bit more machines than strictly needed and be certain that all the capacity is up before kickoff. Fewer scaling mechanisms in play means fewer things that can go wrong, and the best possible experience for viewers.

Concretely, three layers have to scale ahead of a match:

- the Kubernetes clusters themselves (nodes, managed by Karpenter),
- the applications deployed on them,
- the managed services around them (DynamoDB capacity, Fastly KV stores, etc.).

For the applications, we don't touch the HPAs' minimum replicas. Each project's HPA scales on a dedicated prescaling metric, which varies with the prescaling size we want and the configuration set in the project itself. Every microservice gets a prescaling adapted to it. The exporter behind this mechanism is open source and maintained by Bedrock: [prescaling-exporter](https://github.com/BedrockStreaming/prescaling-exporter).

To drive all of this, we built our own solution. "prescaling-api" orchestrates the scaling actions through a system of scheduled jobs: it declares an event with a start time, an end time and an expected number of concurrent streams, and it arms each layer at the right moment before kickoff, then tears everything down after the match. On top of it, the Prescaling UI lets us register every match weeks in advance and choose the prescaling size for each one.

![A football match registration in the Prescaling UI](/images/posts/2026-08-25-hosting-the-2026-world-cup-on-m6plus/prescaling-ui.png)
<center><em>A football match registration in the Prescaling UI</em></center>
<br>

Since Euro 2024, arming and disarming is fully automated. Nobody scales or downscales anything manually anymore at the beginning of the match.

## Load tests: validate, and calibrate <a name="load-tests-validate-and-calibrate"></a>

From March to June, we ran regular load-test sessions with [Gatling](https://gatling.io/), in production, in the morning.

The first goal was the obvious one: prove that the platform holds well above the biggest audience forecast.

The second goal was to calibrate: we validated how the different components scale with the user arrival rate. That is what lets us determine the sizing to plan for each match, based on its forecast plus a safety margin.

## Serve the match from the edge <a name="serve-the-match-from-the-edge"></a>

Being as static as possible and serving from the edge is the key to very-high-traffic events: every request answered by the CDN is pressure taken off the backends. And it is easy to do on a World Cup evening, because we know exactly what users come for: the match. That is the idea behind the features we deployed for the tournament. A few examples:

- **Static Homepage**: displayed in place of the classic home page on every match day, it gives users a fully static path into the platform, with no call to our backends.
- **Live@edge**: live responses are pre-generated per platform and user profile, then served entirely from the CDN edge, with no call to the origin.
- **Rate limiting on the ad router**: protects the ad stack from request storms.

Each of these features went through its own load-test validation before joining the match-evening setup.

## Plan B: circuit breakers and fallbacks <a name="plan-b-circuit-breakers-and-fallbacks"></a>

If something breaks at 9pm in front of millions of viewers, we don't want to improvise. Every critical path has a plan B, and we tested those too.

We have already experienced this kind of incident in the past: an error hits every viewer at the same time during playback, everyone refreshes at once, and the platform takes a massive arrival rate in an instant. So we built a dedicated Gatling scenario replaying that massive F5, and used it to validate the fallback and mitigation mechanisms in place to withstand this kind of trouble.

Same logic on authentication: if our auth provider fails during a match, a degradation bypass can open the gates rather than lock viewers out.

And as a last resort, for the worst-case scenario: if a backend fails entirely, our CDN automatically falls back to static response files stored on S3, regenerated every few minutes by a cron. The main layouts are covered (homepage, services, folders, live, navigation), programs and clips get an error layout. This mode drops authentication, locked content and personalization, but the platform stays browsable and the live reachable.

## Freeze, then keep verifying <a name="freeze-then-keep-verifying"></a>

During the tournament, production deployments on M6+ were frozen. Exceptions had to go through an explicit validation process.

A freeze protects against regressions, but it proves nothing by itself. So we kept running no-regression load-test sessions: twice in the days before the first match, and once more mid-tournament. Same scenarios, same targets, one question: does the platform still respond exactly as when we validated it?

# Match evenings <a name="match-evenings"></a>

## The evening ritual <a name="the-evening-ritual"></a>

Every match evening followed the same ritual. Infra teams online one hour before kickoff, application teams (web, mobile, TV) thirty minutes before. One permanent meet link for the whole tournament, and one Slack thread per evening where everything gets logged: checks, observations, decisions, and how long each action took. An AI agent monitors the platform throughout the evening, warns us when it spots an anomaly, and produces a technical report of the whole evening at the end.

Before kickoff, a checklist: prescaling armed on every layer, static homepage configured for the match window, World Cup features up, authentication provider checked. Each team then watches its own scope on shared dashboards. On the biggest matches, AWS engineers were on standby on a dedicated bridge.

## The lifecycle of a match evening <a name="the-lifecycle-of-a-match-evening"></a>

One hour before kickoff, the prescaling arms itself: nodes first, then applications, DynamoDB tables and KV stores, each layer at its own offset. Nobody scales anything: we verify.

At kickoff, the wave. The arrival rate is what stresses the platform, much more than the plateau that follows: users call our microservices mostly when they arrive and launch the live. Once it plays, it is mainly video consumption, served from the CDNs, and our backends are barely solicited. Halftime brings a dip, then a second wave.

If a match goes to extra time or penalties, we extend the event directly in the Prescaling UI and the capacity stays up. After the final whistle, users leave, the platform downscales automatically, and everyone goes to bed.

![A typical traffic curve for a soccer game](/images/posts/2026-08-25-hosting-the-2026-world-cup-on-m6plus/traffic-curve.png)
<center><em>A typical traffic curve for a soccer game</em></center>
<br>

## When the unexpected happens <a name="when-the-unexpected-happens"></a>

Zero major incident in 54 matches does not mean nothing happened. A few evenings tested the plan Bs:

- **Our authentication provider failed** right at the biggest peak of the tournament. Retries and fallbacks absorbed it, and the issue resolved itself. The "open the gates" bypass stayed ready, we never needed it.
- **A storm in Philadelphia delayed a kickoff** by about two hours. The whole prescaling was rescheduled on the fly through the UI. A marathon evening for the teams, a non-event for viewers.
- **The audience beat the forecasts** on some early matches (the tournament was an instant success), and reactive autoscaling took over without any trouble: the kickoff wall had already been absorbed, and the extra viewers arrived gradually. Elasticity stays on as a safety net on top of the prescaling. We adjusted the forecasts with M6 for the following matches.
- **A small DDoS hit during a match.** The WAF absorbed it, nobody had to act.

None of it reached the viewers. That is what the preparation was for.

# Wrap-up <a name="wrap-up"></a>

54 matches, 39 days, zero major incident.

On M6's side, the tournament gathered [60 million French viewers across the channel and M6+](https://www.businesswire.com/news/home/20260728735190/fr). M6+ broke several records: the platform signed its 13 best audiences ever, M6+ was the most downloaded app on the stores for the whole competition, and counted more than 100 million videos viewed, 11 million users and over 4 million new sign-ups.

Three things we take away from it:

- **Anticipating beats reacting**: for an event you can see coming, prescale rather than rely on autoscaling to keep up.
- **Load tests are as much about calibration as validation**: knowing how each component scales with the arrival rate is what let us size every match from its forecast.
- **Being static and served from the edge** is the most effective lever on very-high-traffic events.

And a few things we want to improve: bringing the platform back down earlier after a match, so teams get to sleep sooner and we save a little bit of money. Better graceful shutdown on our backend APIs during downscale. And sharper escalation paths with our external partners, the ones we depend on but do not operate.

See you at the next big event.

*Thanks to everyone who made these late nights look easy.*
