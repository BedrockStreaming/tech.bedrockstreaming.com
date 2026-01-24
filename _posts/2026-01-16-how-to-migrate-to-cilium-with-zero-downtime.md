---
layout: post
title: "How to migrate on Cilium with zero downtime"
description: "How can you hot change your CNI from VPC CNI to Cilium on your kubernetes cluster with zero downtime in prod environnment?"
author: [v_pelus, g_sanchez, j_menan]
category:
tags: [kubernetes, cloud, haproxy, aws, cloud, hace, cilium, consul, nlb]
color: rgb(0, 150, 255)
thumbnail: "/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/main.png"
feature-img:
language: en
comments: true
---

At Bedrock at the begining of our journey to Kubernetes and AWS we opted for AWS VPC CNI as our CNI on our clusters to ensure perfect compatibility with our cloud provider. Provides native integration with AWS, simplified network management.

At least that is what we thought in 2018 when we were migrating from on premise to the Cloud.

At that time Cilium was not yet the MVP it is now in the Kubernetes ecosystem and VPC CNI was the safest choice for our needs to move on AWS. We did not have any needs for the large capabilities that Cilium could bring us at this moment.

It has worked perfectly for a large amount of time and it filled it's mission pretty well. But as time went on and new customers were onboarded and new challenged rises we started needing additionnal capabilities for our CNI and we started facing some issues.

## Table of Contents

* [What about today](#WhatAboutToday)
* [Enter Cilium](#EnterCilium)
* [A bit more explanations](#BitMoreExplanations)
    * [What is kube-proxy, why iptables](#WhatIsKubeproxy)
    * [Why Cilium and eBPF](#WhyCiliunEbpf)
* [Dig into live migration](#DigIntoLiveMigration)
    * [Haproxy blue/green load balancing](#HaproxyBlueGreenLoadBalancing)
    * [Consul powered configuration update](#ConsulPoweredConfUpdate)
* [Conclusion](#conclusion)

# What about today? <a name="WhatAboutToday"></a>

Today in 2026, we think otherwise. Still relying on [KOps](https://kops.sigs.k8s.io/) managed Kubernetes cluster running on EC2 spot instances in private subnets at AWS. We needed to get more observability at our network layer on Kubernetes to have better insights about possible bottlenecks on our infrastructure or our ingresses implementation, but not only.

We started facing issues due to kube-proxy and the huge amount of iptables our nodes needed to manage. The fact that each nodes were managing thousands and thousands of iptables rules it could sometimes create slowness our issues during huge scaling or downscaling event on our platform as our nodes would need to perform a lot of iptables rules management to ensure all our workload was reachable.

But wait! Why changing the CNI is supposed to improve anything here on those matter?

# Enter Cilium <a name="EnterCilium"></a>

[Cilium](https://cilium.io/get-started/) is an open-source cloud-native solution for high-performance networking, security, and observability in container environments like Kubernetes, leveraging the Linux kernel's eBPF technology for deep visibility and control at the kernel level. It provides advanced features such as identity-based security policies and more.

But wait !

<center><img alt="what is eBPF" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image1.png"></center>

<br>

And that is an excellent question! 

[eBPF](https://ebpf.io/what-is-ebpf/) stands for extended Berkeley Packet Filter. This capability fundamentally changes how the kernel's functionality can be extended at runtime. It's basically plugins that developpers can make in C-like language, then compiled into eBPF bytecode. The bytecode is loaded into the kernel via a system call, the eBPF program is attached to a specific "hook" point within the kernel, such as a system call, network event, or function entry/exit point. When that event occurs, the eBPF program is automatically executed.

And now you start to understand probably the main difference. 

While iptables relies on a linear, sequential rule lists for packet filtering, which could slow down with scale. Cilium uses eBPF (extended Berkeley Packet Filter) to attach programs directly to the kernel, enabling high-performance, more obervability. Cilium is working directly at kernel space level.

![Comparing Standard CNI with eBPF CNI](/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image0.png)
<center><i>Comparing Standard CNI with eBPF CNI</i>[Inspired by schema from isovalent](https://cdn.sanity.io/images/xinsvxfu/production/d7e538715d25eddc181230273506aa9e58bd62bf-1600x973.webp?auto=format&q=80&fit=clip&w=1080)</center>

## A bit more explanations <a name="BitMoreExplanations"></a>

To give a bit more context and explanations on the difference between each tools and why eBPF was more suited to our use-case. We are going to go a little bit in detail on how iptables and eBPF behaves and their fundamentals differences

### What is kube-proxy, why iptables <a name="WhatIsKubeproxy"></a>

Kube-proxy is the default networking component in Kubernetes installed on each node in a cluster. It's responsible for facilitating communication between services and pods. Picture it as the old phone operator, it helps link containers with the telephone network. It's maintaining network rules for service-to-pod mapping, allowing communication cluster wide. It acts as an L3/L4 network proxy and load-balancer.

As it acts as a network proxy it manages network rules necessary for traffic routing, including NAT when required. 

It relies on IPTABLES to accomplish it's missiom. Iptables is a packet filter and firewall tool within the Linux kernel. Analyzing, modifying and filtering network packets on a set of user-defined rules based on IP addresses or port-based rules (TCP/UDP).

Iptables rules are organized into iptables tables and iptables chains. An iptables chain is the ordered list of rules that is evaluated sequentially when a packet traverses the chain. An iptables table is a way to group together chains of rules, iptables has five tables covering Filter, NAT, Mangle, Raw, and Security.

Performance in iptables relies on a sequential algorithm, going through each rule one-by-one in the table to match rules against observed traffic. This means that the time taken scales linearly with each added rule, and performance strain quickly becomes apparent as more services and endpoints are added. A packet has to traverse each rule to find a match, introducing latency and causing problems with stability especialy when you have a lot of movement in your cluster during traffic surge and kubernetes starts to spin-up new nodes/pods to answer the load.

### Why Cilium and eBPF <a name="WhyCiliunEbpf"></a>

For the uninitiated, eBPF is an efficient technology that has rapidly gained traction in Linux networking. It allows for programmable processing directly within the Linux kernel like you would enable plugin or mod, enabling a wide range of network, observability, and security-related tasks with highly efficient speed and flexibility.

So on the contrary of Iptables, eBPF programs are not running inside the user-space of Linux but in the kernel-space

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image2.png"></center>
<br>

For load balancing, iptables was never designed for highly scaled operations like we see today with Kubernetes. The sequential rule matching and stiff IP based rules struggle with frequently changing IP addresses. eBPF uses efficient hash tables allowing for almost unlimited scale.

[A link to Isovalent blog article giving a lot of explanations and KPI on the difference between kube-proxy iptables and Cilium eBPF](https://isovalent.com/blog/post/why-replace-iptables-with-ebpf)


# Dig into live migration <a name="DigIntoLiveMigration"></a>

Ok ok now we understand a little bit more Cilium and on what technology it relies compared to kube-proxy and iptables. But how do you move from your old CNI to the new one without needing maintenance? Here is the time to get into how we executed our transition.

## Haproxy blue/green load balancing <a name="HaproxyBlueGreenLoadBalancing"></a>

Here at Bedrock we are still using Haproxy for some of our reverse proxy needs, it works perfectly fine and we now it well. Hence why it came to our mind when we wanted to find a why to migrate our clusters to our new CNI Cilium. 

There are many ways to handle such a migration. At Bedrock we chose to aims for Blue/Green deployment with controlled load spread between each new cluster.

To avoid making an ON/OFF migration we leverage on Haproxy to make a progressive switch to our new Cilium cluster. We deployed a new layer of Load-balancing and ASG with Haproxy in front of our Kubernetes cluster with pre-defined weight between our blue and green cluster.

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image3.png"></center>
<br>

## Consul powered configuration update <a name="ConsulPoweredConfUpdate"></a>

But how to update the weight on the fly to advance in the migration or rollback in case of issue you'd ask us? 

We use Consul and consul-agent to update our Haproxy configuration on the fly. It helps us to hot update our load-balancing parameters :

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image4.png"></center>
<br>

As we feel confident to move some of our applications to our green cluster we just need to update both weights of our blue and green cluster for a specific API to start send traffic to our Cilium brand new cluster. It helps us to check how our cluster behaves with small amount of traffic, we observe different KPIs and Cilium behaviour. Making quick rollback in case of any issues.
