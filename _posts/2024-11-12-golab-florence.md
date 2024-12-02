---
layout: post
title: Insights from Golab Conference 2024, Florence
description: TODO
author: [t_geindre, k_phan]
tags: [golang, opensource, community, conference, 2024]
color: rgb(251,87,66)
thumbnail: "/images/posts/2024-11-12-golab-firenze/firenze.jpg"
---

Attending the [Golab conference](https://golab.io/) in Florence has been a thrilling experience for us as developers. Immersing ourselves in talks by some of the most brilliant minds in the Go community gave us a deeper understanding of advanced concepts, practical libraries, and the future of Go. We’ve summarized the key takeaways from the talks we attended to share some of the valuable lessons and fresh perspectives we gained.

---

## Keynote: Go Telemetry Wins

The opening keynote, delivered by Russ Cox, focused on the importance of telemetry in the Go ecosystem itself. Russ explained how telemetry data helps the Go team make informed decisions to improve the language and its ecosystem, emphasizing the strict measures taken to ensure user privacy. We learned how telemetry is carefully designed to protect sensitive information while still providing valuable insights.

![Go telemetry wins](/images/posts/2024-11-12-golab-firenze/go_telemetry_keynote.jpg)


The session concluded with a call to action, encouraging everyone to enable telemetry (by running `go telemetry on`) on their Go installations to support ongoing enhancements and community-driven improvements.


---

## Instrumenting Go Apps With OpenTelemetry

This talk introduced us to OpenTelemetry, an open source solution for instrumenting applications. The speaker introduced the topic with a specific situation, you have instrumenting with datadog and want to switch to another tool (for any reason such as better pricing, UX...).
![Instrumenting with datadog](/images/posts/2024-11-12-golab-firenze/instrumenting_with_datadog.jpg)
![Changing tool due to cost](/images/posts/2024-11-12-golab-firenze/changing_agent.jpg)
Then he demonstrated how OpenTelemetry can be used to collect and analyze performance data (ie. through Grafana), and its benefits compared to an agent :
- No need to install an agent on the host
- No cost of install when changing agent 
- Open source so it's tool agnostic
![Opentelemetry simple schema](/images/posts/2024-11-12-golab-firenze/opentelemtry_schema.avif)

At Bedrock, we mainly use [NewRelic for our monitoring](https://tech.bedrockstreaming.com/2024/10/03/enhancing-production-monitoring-with-newrelic.html), but we are free either to use the NewRelic agent or to use OpenTelemetry to collect traces, metrics and logs.

---

## Watermill: The Missing Standard Library for Event-Driven Applications

The [Watermill library](https://watermill.io/) was highlighted as a game-changer for event-driven architecture in Go. Initially born out of a need to simplify the complexity of building event-driven systems, Watermill has evolved into a mature and widely adopted library. The talk inspired us by demonstrating how adopting Watermill can transform projects needing scalability and resilience, and it has now become a key consideration for us in future architectural designs.

---

## Let’s Go Asynchronous

This session tackled the common dilemma between synchronous and asynchronous communication. [Real-world examples](https://github.com/kedlas/presentations/tree/main/2024-golab-florence_lets_go_async/sync/http) illustrated how synchronous patterns can lead to bottlenecks, while asynchronous designs promote efficiency. Techniques like load balancing, rate limiting, and implementing retries were demonstrated, showcasing Go’s flexibility with tools like RabbitMQ and PGQ. It’s a solid reminder to evaluate communication patterns carefully and how going asynchronous isn’t as daunting as it sounds.

---

## How to Write a Programming Language and Shell in Go with 92% Test Coverage

A fascinating exploration of Elvish, a shell written in Go, broke down how to create a programming language. Beyond the technical implementation, the speaker provided insights into achieving impressive test coverage and setting up instant CI/CD pipelines. The talk underscored the power of Go in developing robust systems, even for complex challenges like creating a shell.

---

## From Bland to Spiky: How Generics Made My Service Super Robust

This lively talk explored how generics have brought versatility to Go. The speaker used vivid examples, transforming generic code to create robust, maintainable services. The presentation not only demystified generics but also highlighted their practical benefits, such as eliminating repetition and enhancing code maintainability.

---

## TinyGo for Pet Automation

This session was both fun and practical, demonstrating how TinyGo can be leveraged for pet automation using Arduino. The speaker presented a compelling case for TinyGo as an accessible platform for embedded programming, opening possibilities beyond traditional web development. Automation projects, whether for pets or other use cases, seem more achievable and engaging with TinyGo.

---

## Gophers Gone Domain-Driven: A Tale of Go and DDD

Domain-Driven Design (DDD) often intimidates developers, but this talk simplified the fundamentals for Go practitioners. By exploring domain modeling, bounded contexts, and ubiquitous language, we gained insights into creating a codebase that aligns with business logic. The speaker also discussed using hexagonal architecture to make Go applications scalable and maintainable, providing a practical roadmap for implementing DDD concepts.

---

## To CGo or Not: Cross Compiling a SQLite Driver

The challenge of cross-compiling without relying on CGo was explored in this technical deep dive. The speaker introduced modernc.org/sqlite, a CGo-free driver, explaining how transpilers and C runtime emulation make it feasible. This was particularly eye-opening for those of us working on projects that need efficient and lightweight database solutions.

---

## Graphs and Games: Can Go Take a Ticket to Ride?

Blending board games and Go programming, this presentation took us on a journey through graph algorithms inspired by "Ticket to Ride." The speaker demonstrated how they implemented a Go-based version of the game and applied algorithms to improve gameplay. It was a fun reminder of how computer science concepts can intersect with entertainment, sparking ideas for gamifying our projects.

---

## Deep Dive into a Go Binary
Jesús Espino
Software developer at Mattermost who loves to deep dive into technical details and previously talked about [Go Runtime](https://www.youtube.com/watch?v=arH3jp_x8yQ) answers this question :
What lies inside a Go binary?

![Deep dive in go binary](/images/posts/2024-11-12-golab-firenze/deep_dive_go_binary.jpg)

This talk unveiled the secrets of compiled Go programs while mirroring The Lord of the Rings making it very pedagogical, starting with ELF format composed of a set of headers, list of sections and segments to the internal mechanisms that make a binary tick.

Understanding the anatomy of a Go binary enhanced our appreciation for the Go compiler and the efficient executables it generates.
You can view his presentation slides [here](https://speakerdeck.com/jespino/deep-dive-into-a-go-binary)

Here some of his references:
- [In-depth ELF](https://youtu.be/nC1U1LJQL80?si=0-X8EnOUVgbmCkPp)
- [GoReSym](https://github.com/mandiant/GoReSym)
- [Garble](https://github.com/burrowers/garble)
- The go source code (specifically the linker code)

---

## How to Punch Holes in Network Infrastructure Using Go

Finally, we delved into the intricacies of peer-to-peer networking. Using the go-libp2p module, the speaker showed how to establish decentralized connections by bypassing traditional network barriers. This talk was both technical and visionary, providing us with ideas on how to optimize network performance using Go’s robust features.

---

## Closing Keynote: Go Back to the Future

The closing keynote was a captivating journey through Go's past, present, and future, filled with live demos and unexpected surprises. The speaker showcased the evolution of Go while exploring how the language might shape the future of programming. One of the highlights was a live demonstration where the presenter made a drone fly over the audience, all powered and controlled by Go. This thrilling spectacle illustrated the language’s potential in robotics and automation, leaving everyone inspired and in awe of what Go can achieve.


### Conclusion

The Golab conference in Florence provided a rich tapestry of knowledge, sparking inspiration and reaffirming our love for Go. From new architectural insights to innovative uses of Go in domains like automation and networking, we walked away with a toolkit full of ideas to bring back to our development practices. We’re eager to implement some of these learnings and contribute further to the vibrant Go community!

![Bedrock devs](/images/posts/2024-11-12-golab-firenze/golab_group.jpg)

