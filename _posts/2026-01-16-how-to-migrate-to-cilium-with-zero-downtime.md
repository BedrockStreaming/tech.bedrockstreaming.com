---
layout: post
title: "How to migrate to Cilium with zero downtime"
description: "How can you hot change your CNI from VPC CNI to Cilium on your Kubernetes cluster with zero downtime in a production environment?"
author: [v_pelus, g_sanchez, j_menan]
category:
tags: [kubernetes, cloud, HAProxy, aws, cloud, hace, cilium, consul, nlb]
color: rgb(0, 150, 255)
thumbnail: "/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/main.png"
feature-img:
language: en
comments: true
---

At Bedrock, at the beginning of our journey to Kubernetes and AWS, we opted for AWS VPC CNI as our CNI on our clusters to ensure perfect compatibility with our cloud provider. It provides native integration with AWS and simplified network management.

At least that is what we thought in 2018 when we were migrating from on-premise to the Cloud.

At that time, Cilium was not yet the MVP it is now in the Kubernetes ecosystem, and VPC CNI was the safest choice for our needs to move to AWS. We did not have any need for the large capabilities that Cilium could bring us at that moment. It worked perfectly for a long time and fulfilled its mission pretty well. But as time went on and new customers were onboarded and new challenges arose, we started needing additional capabilities for our CNI and we started facing some issues.

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

Today in 2026, we think otherwise. Still relying on [KOps](https://kops.sigs.k8s.io/) managed Kubernetes clusters running on EC2 spot instances in private subnets at AWS. We needed to get more observability at our network layer on Kubernetes to have better insights about possible bottlenecks on our infrastructure or our ingress implementation, but not only.

We started facing issues due to kube-proxy and the huge amount of iptables our nodes needed to manage. The fact that each node was managing thousands and thousands of iptables rules could sometimes create slowness or issues during huge scaling or downscaling events on our platform as our nodes would need to perform a lot of iptables rules management to ensure all our workloads were reachable.

But wait! Why is changing the CNI supposed to improve anything here on those matters?

# Enter Cilium <a name="EnterCilium"></a>

[Cilium](https://cilium.io/get-started/) is an open-source cloud-native solution for high-performance networking, security, and observability in container environments like Kubernetes, leveraging the Linux kernel's eBPF technology for deep visibility and control at the kernel level. It provides advanced features such as identity-based security policies and more.

But wait!

<center><img alt="what is eBPF" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image1.png"></center>

<br>

And that is an excellent question! 

[eBPF](https://ebpf.io/what-is-ebpf/) stands for extended Berkeley Packet Filter. This capability fundamentally changes how the kernel's functionality can be extended at runtime. It's basically plugins that developers can make in a C-like language, then compiled into eBPF bytecode. The bytecode is loaded into the kernel via a system call, and the eBPF program is attached to a specific "hook" point within the kernel, such as a system call, network event, or function entry/exit point. When that event occurs, the eBPF program is automatically executed.

And now you probably start to understand the main difference.

While iptables relies on linear, sequential rule lists for packet filtering, which can slow down with scale, Cilium uses eBPF (extended Berkeley Packet Filter) to attach programs directly to the kernel, enabling high-performance and more observability. Cilium works directly at the kernel space level.

![Comparing Standard CNI with eBPF CNI](/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image0.png)
<center><i>Comparing Standard CNI with eBPF CNI</i> [Inspired by schema from Isovalent]</center>

## A bit more explanations <a name="BitMoreExplanations"></a>

To give a bit more context and explanations on the difference between each tool and why eBPF was more suited to our use case, we are going to go a little bit into detail on how iptables and eBPF behave and their fundamental differences.

### What is kube-proxy, why iptables <a name="WhatIsKubeproxy"></a>

Kube-proxy is the default networking component in Kubernetes installed on each node in a cluster. It's responsible for facilitating communication between services and pods. Picture it as the old phone operator—it helps link containers with the telephone network. It maintains network rules for service-to-pod mapping, allowing communication cluster-wide. It acts as an L3/L4 network proxy and load balancer.

As it acts as a network proxy, it manages network rules necessary for traffic routing, including NAT when required.

It relies on iptables to accomplish its mission. Iptables is a packet filter and firewall tool within the Linux kernel, analyzing, modifying, and filtering network packets on a set of user-defined rules based on IP addresses or port-based rules (TCP/UDP).

Iptables rules are organized into iptables tables and iptables chains. An iptables chain is an ordered list of rules that is evaluated sequentially when a packet traverses the chain. An iptables table is a way to group together chains of rules; iptables has five tables covering Filter, NAT, Mangle, Raw, and Security.

Performance in iptables relies on a sequential algorithm, going through each rule one-by-one in the table to match rules against observed traffic. This means that the time taken scales linearly with each added rule, and performance strain quickly becomes apparent as more services and endpoints are added. A packet has to traverse each rule to find a match, introducing latency and causing problems with stability, especially when you have a lot of movement in your cluster during traffic surges and Kubernetes starts to spin up new nodes/pods to answer the load.

### Why Cilium and eBPF <a name="WhyCiliumEbpf"></a>

For the uninitiated, eBPF is an efficient technology that has rapidly gained traction in Linux networking. It allows for programmable processing directly within the Linux kernel, like you would enable a plugin or mod, enabling a wide range of network, observability, and security-related tasks with highly efficient speed and flexibility.

So contrary to iptables, eBPF programs are not running inside the user-space of Linux but in the kernel-space.

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image2.png"></center>
<br>

For load balancing, iptables was never designed for highly scaled operations like we see today with Kubernetes. The sequential rule matching and rigid IP-based rules struggle with frequently changing IP addresses. eBPF uses efficient hash tables allowing for almost unlimited scale.

[A link to Isovalent blog article giving a lot of explanations and KPIs on the difference between kube-proxy iptables and Cilium eBPF](https://isovalent.com/blog/post/why-replace-iptables-with-ebpf)


# Dig into live migration <a name="DigIntoLiveMigration"></a>

Ok, ok, now we understand a little bit more about Cilium and what technology it relies on compared to kube-proxy and iptables. But how do you move from your old CNI to the new one without needing maintenance? Here is the time to get into how we executed our transition.

## Handle live migration with zero downtime <a name="HandleLiveMigrationZeroDowntime"></a>

There are many ways to handle migration with zero or near-zero downtime. The two most common approaches are Blue/Green deployment and Canary deployment. Each strategy has its own advantages depending on your infrastructure and risk tolerance. In our case, we evaluated both options before choosing the one that best fit our production requirements and operational constraints.

### Blue/Green deployment <a name="BlueGreenDeployment"></a>

Blue/Green deployment is a strategy that improves application availability and minimizes downtime and risks during deployments. You deploy to identical production environments called blue and green. The "blue" one is the outgoing live environment, while the "green" one serves as the next version.

Once changes are fully tested in "green", traffic is switched from "blue" to "green". This swift transition minimizes downtime and allows quick rollback in case of issues by reverting traffic from "green" to "blue".

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

At Bedrock, we chose to aim for a hybrid way to handle our live migration with Blue-Green Canary. We are still using [HAProxy](https://www.haproxy.com) for some of our reverse proxy needs—it works perfectly fine and we know it well. Hence why it came to our mind when we wanted to find a way to migrate our clusters to our new CNI Cilium.

To avoid making an ON/OFF migration, we leveraged HAProxy to make a progressive switch to our new Cilium cluster. We deployed a new layer of load balancing and ASG with HAProxy in front of our Kubernetes cluster with pre-defined weights between our blue and green clusters.

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image3.png"></center>
<br>

We can then progressively increase or decrease the amount of traffic we want to send to our new cluster, analyze KPIs and how Cilium behaves with our environment, and rollback quickly if any issue is raised. This new layer of load balancing induced close to no increase in our response time, so we felt confident to move forward with this architecture.

## Consul powered configuration update <a name="ConsulPoweredConfUpdate"></a>

But how do you update the weight on the fly to advance in the migration or rollback in case of an issue, you'd ask us?

We use Consul to update our HAProxy configuration on the fly. Leveraging Consul-agent and Consul KV/Store, we are able to synchronize all our HAProxy configurations:

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image4.png"></center>
<br>

As we feel confident to move some of our applications to our new cluster, we just need to update both weights of our blue and green for a specific API on our Consul KV/Store to start sending traffic to the new Cilium cluster. 
The Consul agent detects that an update has been made to the key it watches in the KV/Store and triggers the hot update of HAProxy through [the Runtime API](https://www.haproxy.com/documentation/haproxy-runtime-api/).

## A little Conclusion <a name="ALittleConclusion"></a>

So to recap, here's how we achieved our zero-downtime migration from VPC CNI to Cilium:

1. **Deployed a new Kubernetes cluster** with Cilium as the CNI, running in parallel to our existing VPC CNI cluster
2. **Set up HAProxy as a traffic orchestrator** in front of both clusters, with configurable weights to control traffic distribution
3. **Leveraged Consul KV/Store** to manage HAProxy configuration dynamically, allowing us to adjust traffic weights on the fly
4. **Gradually shifted traffic** from the blue (VPC CNI) cluster to the green (Cilium) cluster, application by application
5. **Monitored KPIs closely** at each step to validate performance improvements and catch any potential issues early
6. **Maintained rollback capability** throughout the process by simply adjusting weights back to the blue cluster if needed

This hybrid Blue/Green Canary approach gave us the confidence to migrate production workloads without risking service disruption, while gaining all the benefits of eBPF-powered networking.

There are still improvements to our solution that can be done:

- **Automate weight adjustments** based on real-time metrics leveraging our monitoring stack [Victoria Metrics](https://tech.bedrockstreaming.com/2022/09/06/monitoring-at-scale-with-victoriametrics.html)
- **Implement automated rollback triggers** if error rates or latency thresholds are exceeded
- **Create a self-service interface** for teams to control their own application migrations
- **Target specific subsets of users** and enable sticky canaries, which will ensure that a subset of users are always redirected to our new cluster

