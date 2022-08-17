---
layout: post
title: Prescaling pods in Kubernetes, we open source our solution
description: Reactive scaling in k8s is not always enough. We have built a solution and we share it with everyone now!
author: Jérémy Planckeel, Valentin Charbier 
tags: [k8s, kuernetes, pods, prometheus, scaling, hpa, resiliency, go, prescaling, opensource]
color: rgb(251,87,66) # this is Bedrock color here
---

Previously we [discussed](https://tech.bedrockstreaming.com/2022/02/03/prescaling.html) how we manage the load of our Kubernetes clusters and how we can anticipate our needs with prescaling. Today, we are here to share our solution that we have reworked and open sourced! 
![BedrockStreaming Logo](/images/posts/2022-09-01-kubernetes-prescaling-we-open-source-our-solution/br-opensource.png) 

At [Bedrock Streaming](https://www.bedrockstreaming.com/), we provide streaming platforms for customers (6play, Salto, Videoland and many others), we have a good knowledge of the daily load peaks and we know in advance the programs that are likely to generate a lot of traffic. We can therefore not only rely on reactive scaling which has its limits (cf. https://tech.bedrockstreaming.com/2022/02/03/prescaling.html) but also on prescaling. 

_> **Prescaling** means increasing the number of critical application pods in our clusters in advance to be ready for a sudden traffic spike._

Initially, we developed an in-house solution in Python for a simple reason: it was the language that most people in the team knew. Since we had time to test our solution, we thought it would be great to share it with everyone. But to do so, we had to make some adjustments.

## We rewrote everything in go

Many open source projects we use are written in Golang. In addition, the DevOps/Cloud world is mostly centered on Go. So, we decided to rewrite our prescaling solution in Go in order to make our teams more skilled in this language. The other objective was to make it cloud agnostic. In the Python version, we had an API part which stored prescaling events in a DynamoDB table, which made the solution AWS dependent. The prescaling being Kubernetes oriented, we had thought in the first versions in Python to store these events in Custom Resources (CRD) but due to lack of time, we did not implement it. We took advantage of the redesign to implement it and remove the dependency with AWS DynamoDB.

We also wanted to simplify the project. In the first versions, we had two bricks: one containing the exporter and another the API. We merged both applications into one monolith. The API is CRUD which allows managing CRD events. 
