---
layout: post
title: "How to migrate to Cilium with zero downtime"
description: "How can you hot change your CNI from VPC CNI to Cilium on your Kubernetes cluster with zero downtime in a production environment?"
author: [v_pelus, g_sanchez, j_menan]
category:
tags: [kubernetes, cloud, HAProxy, aws, cilium, consul, nlb, ebpf]
color: rgb(0, 150, 255)
thumbnail: "/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/main.png"
feature-img:
language: en
comments: true
---

At Bedrock, at the beginning of our journey to Kubernetes and AWS, we opted for AWS VPC CNI as our CNI on our clusters to ensure perfect compatibility with our cloud provider. It provides native integration with AWS and simplified network management.

At least that is what we thought in 2018 when we were migrating from on-premise to the Cloud.

At that time, Cilium was not yet the powerhouse it is today in the Kubernetes ecosystem, and VPC CNI was the safest choice for moving to AWS. We didn't require the extensive capabilities that Cilium offered at that moment. It worked perfectly for a long time and fulfilled its mission well. However, as time passed, new customers were onboarded, and new challenges arose. We needed additional capabilities from our CNI and began facing performance bottlenecks.

## Table of Contents

* [What about today](#WhatAboutToday)
* [Enter Cilium](#EnterCilium)
* [A bit more explanations](#BitMoreExplanations)
    * [What is kube-proxy, why iptables](#WhatIsKubeproxy)
    * [Why Cilium and eBPF](#WhyCiliumEbpf)
* [Dig into live migration](#DigIntoLiveMigration)
    * [Handle live migration with zero downtime](#HandleLiveMigrationZeroDowntime)
        * [Blue/Green deployment](#BlueGreenDeployment)
        * [Canary deployment](#CanaryDeployment)
    * [HAProxy blue/green load balancing](#HAProxyBlueGreenLoadBalancing)
    * [Consul powered configuration update](#ConsulPoweredConfUpdate)
* [A little Conclusion](#ALittleConclusion)

# What about today? <a name="WhatAboutToday"></a>

Fast forward to 2026, and our perspective has evolved. While still relying on [KOps](https://kops.sigs.k8s.io/)-managed Kubernetes clusters running on EC2 spot instances in private subnets on AWS, we needed greater observability at the network layer. Better insights into potential bottlenecks in our infrastructure.

We faced issues with kube-proxy and the massive volume of iptables rules our nodes needed to manage. With each node handling thousands of iptables rules, we experienced slowness during large-scale scaling or downscaling events. The extensive iptables rule management required to ensure workload reachability became a significant bottleneck.

But wait! Why is changing the CNI supposed to improve anything here on those matters?

# Enter Cilium <a name="EnterCilium"></a>

[Cilium](https://cilium.io/get-started/) is an open-source cloud-native solution for high-performance networking, security, and observability in container environments like Kubernetes, leveraging the Linux kernel's eBPF technology for deep visibility and control at the kernel level. It provides advanced features such as identity-based security policies and more.

But wait!

<center><img alt="what is eBPF" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image1.png"></center>

<br>

And that is an excellent question! We'll go a little bit more in details in the following chapters.

## A bit more explanations <a name="BitMoreExplanations"></a>

To provide more context on why eBPF was better suited to our use case, let's dive into how iptables and eBPF differ fundamentally in their behavior and architecture.

### What is kube-proxy, why iptables <a name="WhatIsKubeproxy"></a>

Kube-proxy is the default networking component installed on each node in a Kubernetes cluster, responsible for facilitating communication between services and pods. Think of it as an old telephone operator—connecting containers across the network. It maintains network rules for service-to-pod mapping, allowing cluster-wide communication, and acts as an L3/L4 network proxy and load balancer, managing traffic routing rules including NAT when required.

It relies on iptables to accomplish its mission. Iptables is a packet filter and firewall tool within the Linux kernel, analyzing, modifying, and filtering network packets on a set of user-defined rules based on IP addresses or port-based rules (TCP/UDP).

Rules are organized into tables and chains. A chain is an ordered list of rules evaluated sequentially when a packet traverses it. A table groups chains together; there are five tables covering Filter, NAT, Mangle, Raw, and Security.

Performance in iptables relies on a sequential algorithm, going through each rule one-by-one in the table to match rules against observed traffic. This means that the time taken scales linearly with each added rule, and performance strain quickly becomes apparent as more services and endpoints are added. A packet has to traverse each rule to find a match, introducing latency and causing problems with stability, especially when you have a lot of movement in your cluster during traffic surges and Kubernetes starts to spin up new nodes/pods to answer the load.

### Why Cilium and eBPF <a name="WhyCiliumEbpf"></a>

eBPF is a revolutionary technology that has rapidly gained traction in Linux networking. It enables programmable processing directly within the kernel—like installing a plugin or mod—supporting a wide range of network, observability, and security tasks with exceptional speed and flexibility.

[eBPF](https://ebpf.io/what-is-ebpf/) stands for extended Berkeley Packet Filter. This capability fundamentally changes how the kernel's functionality can be extended at runtime. It's basically plugins that developers can make in a C-like language, then compiled into eBPF bytecode. The bytecode is loaded into the kernel via a system call, and the eBPF program is attached to a specific "hook" point within the kernel, such as a system call, network event, or function entry/exit point. When that event occurs, the eBPF program is automatically executed.

Unlike iptables, eBPF programs run in kernel-space rather than user-space, providing direct access to kernel operations.

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image2.png"></center>
<br>

For load balancing, iptables was never designed for highly scaled operations like we see today with Kubernetes. The sequential rule matching and rigid IP-based rules struggle with frequently changing IP addresses. eBPF uses efficient hash tables allowing for almost unlimited scale.

[A link to Isovalent blog article giving a lot of explanations and KPIs on the difference between kube-proxy iptables and Cilium eBPF](https://isovalent.com/blog/post/why-replace-iptables-with-ebpf)

![Comparing Standard CNI with eBPF CNI](/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image0.png)
<center><i>Comparing Standard CNI with eBPF CNI</i> [Inspired by schema from Isovalent]</center>

We can clearly see on the schema upwards the overhead induced in our use-case by iptables usage and how Cilium offers an interesting alternative for environment with huge scaling capabilities.

# Dig into live migration <a name="DigIntoLiveMigration"></a>

Now that we understand Cilium's technological advantages over kube-proxy and iptables, the key question remains: how do you migrate from one CNI to another without downtime? Let's explore how we executed this transition.

## Handle live migration with zero downtime <a name="HandleLiveMigrationZeroDowntime"></a>

Several strategies exist for achieving zero or near-zero downtime during migration. The two most common approaches are Blue/Green and Canary deployments. Each has distinct advantages depending on your infrastructure and risk tolerance. We evaluated both before selecting the approach that best aligned with our production requirements and operational constraints.

### Blue/Green deployment <a name="BlueGreenDeployment"></a>

Blue/Green deployment is a strategy that improves application availability while minimizing downtime and risk. You deploy to two identical production environments: "blue" represents the current live environment, while "green" hosts the next version.

Once thoroughly tested in green, traffic switches from blue to green. This swift transition minimizes downtime and enables instant rollback if issues arise—simply revert traffic back to blue.

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image5.png"></center>
<br>

### Canary deployment <a name="CanaryDeployment"></a>

Canary deployment takes a different approach by avoiding the need for duplicate production environments. Instead, you select a subset of servers or nodes to receive the new deployment first, serving as a testing ground before rolling out changes across the entire infrastructure.

A typical canary deployment workflow using a load balancer looks like this:

1. Your production infrastructure runs behind a load balancer with additional nodes kept in reserve.
2. Deploy the new version to these spare nodes, which become your "canary" servers—the first to run the updated code in production.
3. Configure the load balancer to route a small percentage of traffic to the canary nodes, exposing the new version to a limited number of users while monitoring for errors and gathering feedback.
4. If metrics look healthy and no critical issues emerge, progressively increase traffic to the canary nodes until they handle 100% of requests.

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image6.png"></center>
<br>

## HAProxy blue/green load balancing <a name="HAProxyBlueGreenLoadBalancing"></a>

At Bedrock, we opted for a hybrid Blue-Green Canary approach to handle our live migration. We still use [HAProxy](https://www.haproxy.com) for reverse proxy needs—it works perfectly-fin on our side and we know it well. This made it the natural choice for orchestrating our migration to Cilium.

To avoid making an ON/OFF migration, we leveraged HAProxy to make a progressive switch to our new Cilium cluster. We deployed a new layer of load balancing and ASG with HAProxy in front of our Kubernetes cluster with pre-defined weights between our blue and green clusters.

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image3.png"></center>
<br>

This setup allowed us to progressively adjust traffic distribution to our new cluster, analyze KPIs, monitor Cilium's behavior in our environment, and rollback instantly if issues arose. Importantly, this load balancing layer added negligible latency to our response times, giving us confidence to proceed.

## Consul powered configuration update <a name="ConsulPoweredConfUpdate"></a>

But how do you update weights on the fly to advance the migration or rollback during issues?

We leverage [Consul](https://developer.hashicorp.com/consul) to dynamically update our HAProxy configuration. Using [Consul-agent](https://developer.hashicorp.com/consul/docs/automate/consul-template) and Consul KV/Store, we synchronize all HAProxy configurations across our infrastructure:

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image4.png"></center>
<br>

When ready to migrate an application, we simply update the blue and green weights for that specific API in our Consul KV/Store. The Consul-template opens a peristent connection to the Consul server KV/Store and detects the change to its watched keys and triggers a hot reload of HAProxy via [the Runtime API](https://www.haproxy.com/documentation/haproxy-runtime-api/), seamlessly shifting traffic distribution. Using the Runtime API saves us the need to execute HAProxy reload which could cause some loss of performance during high traffic events, same approach we use for our [HSDO project](https://tech.bedrockstreaming.com/2021/11/18/hsdo.html).

## A little Conclusion <a name="ALittleConclusion"></a>

So to recap, here's how we achieved our zero-downtime migration from VPC CNI to Cilium:

1. **Deployed a new Kubernetes cluster** with Cilium as the CNI, running in parallel to our existing VPC CNI cluster
2. **Set up HAProxy as a traffic orchestrator** in front of both clusters, with configurable weights to control traffic distribution
3. **Leveraged Consul KV/Store** to manage HAProxy configuration dynamically, allowing us to adjust traffic weights on the fly
4. **Gradually shifted traffic** from the blue (VPC CNI) cluster to the green (Cilium) cluster, application by application
5. **Monitored KPIs closely** at each step to validate performance improvements and catch any potential issues early
6. **Maintained rollback capability** throughout the process by simply adjusting weights back to the blue cluster if needed

This hybrid approach enabled us to migrate production workloads without service disruption while unlocking all the benefits of eBPF-powered networking.

Potential enhancements to our solution include:

- **Automate weight adjustments** based on real-time metrics leveraging our monitoring stack [Victoria Metrics](https://tech.bedrockstreaming.com/2022/09/06/monitoring-at-scale-with-victoriametrics.html)
- **Implement automated rollback triggers** if error rates or latency thresholds are exceeded
- **Create a self-service interface** for teams to control their own application migrations
- **Target specific subsets of users** and enable sticky canaries, which will ensure that a subset of users are always redirected to our new cluster

