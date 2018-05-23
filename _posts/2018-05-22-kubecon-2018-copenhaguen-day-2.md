---
layout: post
title: "KubeCon 2018 Copenhaguen, day 2"
description: "Our notes for the conferences we saw during the second day of KubeCon 2018 in Copenhaguen"
author:
  name: Vincent Gallissot, Pascal Martin
  avatar:
  email:
  twitter:
  facebook:
  github:
category:
tags: [kubernetes, KubeCon]
image:
  feature: posts/kubecon-2018/title-kubecon.jpg
  credit: Pascal Martin
  creditlink:
comments: true
language: en
---

After an interesting [first day at KubeCon 2018](/kubecon-2018-copenhaguen-day-1/), we are back for the second day!


# Autoscale your Kubernetes Workload with Prometheus - Frederic Branczyk, CoreOS

The goal of autoscaling, ultimately, is to fullfill [SLO](https://en.wikipedia.org/wiki/Service_level_objective) of [SLA](https://en.wikipedia.org/wiki/Service-level_agreement) through [SLI](https://en.wikipedia.org/wiki/Service_level_indicator) (yeah, you may have to think for a while after reading this ^^). Demand must be measured by metrics, which must themselves be collected, stored and made queryable. Autoscaling can be *horizontal* (increase replicas when necessary, the focus of this talk) or *vertical* (increase resources request/limits when necessary).

Autoscaling on Kubernetes used to rely on Heapster. But Heapster's API is unspecified, it doesn't work with Prometheus, and vendor implementations are often unmaintained. Starting with 1.8, Kubernetes provides a resource and custom metrics API. It is a specification (not an implementation), the implementations are developed and maintained by vendors, and each metric returns a single value. Kubernetes' HPA (HorizontalPodAutoscaler) uses these metrics to scale up/down.

Core metrics are CPU and RAM, by pod/container/node, and there is a canonical implementation called [`metrics-server`](https://github.com/kubernetes-incubator/metrics-server). The custom metrics API has the same semantics (a single value is returned) but no canonical implementation is provided (take a look at [`DirectXMan12/k8s-prometheus-adapter`](https://github.com/DirectXMan12/k8s-prometheus-adapter) for an implementation). Each metric is related to a Kubernetes object (Pod, Service, Deployment, ...). Finally, there is also an external metrics API (currently in alpha stage) for things not related to a Kubernetes object (like the queue length for a queuing service provided by a Cloud provider -- SQS on AWS, for example).


# Pod Anomaly Detection and Eviction using Prometheus Metrics - David Benque & Cedric Lamoriniere, Amadeus

This talk started with a reminder: stability is hard, especially for a distributed system. And using load-balancers doesn't help at all, on the contrary. Solutions include proximity-based load-balancing (sharding by Availability Zone, which is not something Kubernetes does natively, but for which Istio can help with its [pilot-agent proxy](https://istio.io/docs/reference/commands/pilot-agent.html#pilot-agent%20proxy) as it is AZ-aware). Using healthchecks (liveness kills the container when it fails, readiness only removes it temporarily from service discovery when it fails) is a good idea, but you should keep probes simple (complexity = bugs) and you shouldn't check external dependencies. Also, don't forget about circuit breakers and retries. But note all this suffers from limitations, as it's only based on technical signals and depends on local decisions (pods/containers, service mesh/proxy).

This conference was about a tool called [Kubervisor](https://github.com/AmadeusITGroup/kubervisor), which aims to detect mis-behaving Pods and remove them from the cluster (switching a label on the corresponding service). The decisions are based on metrics (using PromQL for Prometheus metrics) that can include business metrics, and not only technical ones nor data limited to a specific pod.

I didn't write much about this, I was too busy watching [the demo](https://github.com/AmadeusITGroup/kubervisor/tree/master/examples/demo), which was really interesting. In the end, I wrote down I should (and I probably will) take a better look at this in a few months, when we have deployed a few more pieces of software to Kubernetes.


# Challenges to Writing Cloud Native Applications - Vallery Lancey, Checkfront

Building and deploying an application to the cloud has advantages: automatic scaling, load-balancing, replication, infrastructure provisioning and teardown is done for us, ... It also has challenges.

Storage of persistent data is one of these challenges (simple replication is rarely a good idea, working with unreplicated shards is a common pattern, using multiple volatile copies is a good strategy, but the best approach is runtime data replication -- which requires a large setup and implies non-negligible maintenance costs). Services coupling (database + services interacting with it) and internal API calls (source of delays) are also common sources of troubles, even if the second can be mitigated with simpler API actions, endpoints for specific actions (not CRUD!), batch endpoints and caching. Testing is a huge concern, especially with microservices, and working with discrete compoments helps, as we can run one service and mock the others. Finally, local development is not a solved problem yet (in any case, you should remove the "build an image" step).


# GitOps for Istio - Manage Istio Config like Code - Varun Talwar, Stealth Startup & Alexis Richardson, WeaveWorks

During this talk, WeaveWorks team talked about how istio config can be managed like code through git based workflows.
They evoked using terraform to describe cloud state.
As of *gitops* principles, devs shouldn't use `kubectl` to interact with clusters. Additionally, they should push code, not containers. GitHub events must lead deployments, not humans.
As part of this automation, deployments must auto-rollout when things break. They either fail or succeed cleanly.
One can use operator patterns to help integrating those concepts. The WeaveWorks team also talked about [flux](https://github.com/weaveworks/flux) to manage environments states.
Weave Flux brings a lot more annotations for Istio, making automated releases deployments, etc.


# OPA: The Cloud Native Policy Engine - Torin Sandall, Styra

Policy enforcement is a fundamental problem for an organisation, and policy decisions should be decoupled from policy enforcement. [Open Policy Agent](https://www.openpolicyagent.org/) is an open-source general-purpose policy engine. It uses a high-level declarative language, can be used to implement RBAC, has integrations with Istio or Terraform. This is not my current priority, but it could be worth taking a look at OPA if you need to add policy enforcement to your application.


# Kubernetes Multi-Cluster Operations without Federation - Rob Szumski, CoreOS

A lot of people are using multiple Kubernetes clusters. For example, Zalando uses 80. It can become a mess to manage all those clusters with their specific components like secrets, controllers, configmaps, etc.
To solve this problem, a new cli has been created: `kubefed`.
But Rob explains that this new tool doesn't solve all the problems. I.E: You'll have to give access to all-clusters to people and not only few clusters (that breaks isolation), the Federation api must be run by a top-root user (accessing everything), etc.

CoreOs brought the concept of [k8s operators](https://coreos.com/operators/).
Rob explains why that solves problems and why you should use that instead of Federation.

Clearly I wasn't convinced at all by this presentation. Besides, we are working in the same building and problems brought by Rob (modifications by hundred of devs/SRE split across the world) do not concern us at the moment.


# Building a Kubernetes Scheduler using Custom Metrics - Mateo Burillo, Sysdig

There are so many possibilities when scheduling pods. The scheduler first applies filters (resource requests, volumes, selectors/taints), then ranks (including the default behavior of spreading pods of the same service), then goes to applying hard constraints (taints, node selector), and soft contraints (prefer no schedule, node affinity, pod affinity, weight) and pod priority and does taint-based evictions. To understand what actually goes on and prevent complex situations, you should only add important constraints.

In some cases, you might want to build a custom scheduler, using custom metrics (when the default scheduler is not good enough for you and/or you have very specific needs). An example, based on sysdig metrics: [`draios/kubernetes-scheduler`](https://github.com/draios/kubernetes-scheduler). And more informations in [this blog-post](https://sysdig.com/blog/kubernetes-scheduler/). Remember creating a scheduler is not easy task and many things can go wrong (think about concurrency and race conditions).

In the end, the idea of implementing a custom scheduler might be interesting, but a bit *scary*: messing things up could mean no pod getting scheduled, which is not a nice scenario. I'm not sure I currently see a situation in which I'd go this way...


# Clusters as Cattle: How to Seamlessly Migrate Apps across Kubernetes Clusters - Andy Goldstein, Heptio

As many people, Andy has a lot of clusters. To re-route traffic between clusters, he uses envoy.
To maintain consistent configurations, he uses ansible to provision everything.
So far, I don't really see the point of having a lot of clusters and even less of migrating a single app between clusters, but that can be interesting for people that like that trend.


# Party, Tivoli Gardens

For the evening, we went to an all-attendees party at [Tivoli Gardens](https://en.wikipedia.org/wiki/Tivoli_Gardens), an amusement park and pleasure garden right in the middle of Copenhagen. We walked around for a bit, before settling for a beer and a few snacks, talking with other French Kubenetes fans.

![Pascal and Vincent at Tivoli](/images/posts/kubecon-2018/tivoli-gardens-pascal-and-vincent.jpg)
