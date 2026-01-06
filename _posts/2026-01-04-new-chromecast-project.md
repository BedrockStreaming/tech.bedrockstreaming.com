---
layout: post
title: "Rebuilding Chromecast: From a Monolithic "Nightmare" to a High-Performance Standalone App"
description: Chromecast used to be a nightmare for our clients and our teams, here is the story of how we made it one of our most interesting and modern project while dramaticaly improving performences.
author: [a_gaudard]
tags: [chromecast, TV, web, javascript, frontend, player, video, performences]
color: rgb(251,87,66)
language: en
---

Chromecast can be a notoriously difficult platform to develop for. Over the years, the hardware has evolved significantly; while recent models are powerful, early versions are easily overloaded and struggle with modern web overhead.

At Bedrock, we faced a specific architectural challenge: our Chromecast project was living as a single route within our massive main web repository. While this "monolith" approach worked initially, our rapid growth eventually turned it into a bottleneck.

**📉 The Trouble with the Monolith**

As the project scaled, we hit a wall with two primary issues:

User Dissatisfaction: Performance wasn't meeting our standards. One of our major clients has massive Chromecast traffic, and the laggy experience was becoming a significant pain point.

Developer Dread: The team grew to worry whenever a Chromecast ticket appeared in the sprint. Because it was tied to the main web project, it meant dealing with long, complex and painful developer experience.

**🛠 The Challenge: Breaking Free**

We couldn't change the hardware our users owned, so we had to change how our software interacted with it. We identified two core areas for improvement:

1. **Bloated Dependencies:** Because the Chromecast app was part of the main website, it was loading tons of irrelevant Javascript. We were essentially forcing a low-power device to carry the weight of a full desktop site.

2. **Deployment Velocity:** Our build and deployment processes were tethered to the main web project. We needed a workflow that allowed us to move fast without being slowed down by the main site's release cycle.

**🚀 The Solution: Chromecast Standalone**

Following Bedrock’s **Request for Comment (RFC)** process, our Tech Lead conducted a deep dive into our options. The verdict? **It was time to move to a dedicated, standalone repository**.

This wasn't just a change of address; it was a total refresh:

- **Modern Tech Stack:** We adopted updated tools better suited for the platform.
- - BiomeJS
- - Vite

- **Transformed Developer Experience:** By moving to a standalone project, we completely overhauled how we work. We built custom simulation tools to replicate the Chromecast environment locally, drastically increasing feature velocity.

- **The POC:** To prove our theory, we built a Proof of Concept. It was a very simplified version of what would become the Chromecast Standalone, however we could do so much with so little that we were all convinced.

**📊 The Results: Impact by the Numbers**

The results didn't just meet our expectations—they shattered them. By decoupling the project, we saw a significant and measurable increase in both stability and speed.

Core Performance Metrics

- **Video Join Time:** Reduced from **~5.8s** to **~2.8s** 🚀 (A massive **52% improvement**!)

- **IDLE / Pairing Page Load:** Dropped from **~7s** down to **~4s** ⚡

- **Stability:** We have witnessed significantly fewer critical performance variations, leading to a much more consistent user experience.

    **Note:** We are still in the process of migrating our entire user base, but the  data from the new implementation is already showing all the benefits.

**💡 Lessons Learned**

Decoupling a core feature from a monolith is a major undertaking, but this project highlighted several key principles for success:

- **Validate via POC:** Building a Proof of Concept was crucial. It provided the data needed to prove that a standalone architecture would solve our performance issues before we committed to a full rewrite.

- **Platform-Specific Needs:** Low-power devices like the Chromecast don't just benefit from lean code—they require it. Tailoring the environment specifically for the hardware is often more effective than trying to optimize a shared codebase.

- **Autonomy Drives Velocity:** Removing the dependency on the main web project's build and deployment cycles did more than just speed up our workflow; it removed the "developer dread" by giving the team full ownership of their release process.

- **Data-Driven Buy-In:** Highlighting clear KPIs, like the 50% reduction in video join time, made it easy to demonstrate the ROI to stakeholders and justify the time spent on refactoring.

By focusing on these areas, we successfully transitioned from a technical bottleneck to a modern, high-performance application that our team is proud to maintain.
