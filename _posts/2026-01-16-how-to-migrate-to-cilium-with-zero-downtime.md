---
layout: post
title: "How to migrate to Cilium with zero downtime"
description: "How can you hot change your CNI from VPC CNI to Cilium on your kubernetes cluster with zero downtime in prod environnment?"
author: [v_pelus, g_sanchez_, j_menan]
category:
tags: [kubernetes, cloud, haproxy, aws, cloud, hace, cilium, consul, nlb]
color: rgb(0, 150, 255)
thumbnail: "/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/main.png"
feature-img:
language: en
comments: true
---

At Bedrock at the begining of our journey to Kubernetes and AWS we opted for AWS VPC CNI as our CNI on our clusters to ensure perfect compatibility with our cloud provider. Provides native integration with AWS, simplified network management.

<center><img alt="before the project" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image0.png"></center>

<br>

At least that is what we thought in 2018 when we were migrating from on premise to the Cloud.

At that time Cilium was not yet the MVP it is now in the Kubernetes ecosystem and VPC CNI was the safest choice for our needs to move on AWS. We did not have any needs for the large capabilities that Cilium could bring us at this moment.

It has worked perfectly for a large amount of time and it filled it's mission pretty well. But as time went on and new customers were onboarded and new challenged rises we started needing additionnal capabilities for our CNI and we started facing some issues.


<center><img alt="historically-before-2018" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image2.png"></center>

<br>
Today in 2026, we think otherwise. Still relying on [KOps](https://kops.sigs.k8s.io/) managed Kubernetes cluster running on EC2 spot instances in private subnets at AWS. We needed to get more observability at our network layer on Kubernetes to have better insights about possible bottlenecks on our infrastructure or our ingresses implementation, but not only.

We started facing issues due to the huge amount of iptables our nodes needed to manage. The fact that each nodes were managing thousands and thousands of iptables rules it could sometimes create slowness our issues during huge scaling or downscaling event on our platform as our nodes would need to perform a lot of iptables rules management to ensure all our workload was reachable.

But wait! Why changing the CNI is supposed to improve anything here on those matter?


# Enter Cilium

[Cilium](https://cilium.io/get-started/) is an open-source cloud-native solution for high-performance networking, security, and observability in container environments like Kubernetes, leveraging the Linux kernel's eBPF technology for deep visibility and control at the kernel level. It provides advanced features such as identity-based security policies and more.

But wait !

<center><img alt="what is eBPF" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image4.png"></center>

And that is an excellent question! [eBPF](https://ebpf.io/what-is-ebpf/) stands for extended Berkeley Packet Filter. This capability fundamentally changes how the kernel's functionality can be extended at runtime. It's basically plugins that developpers can make in C-like language, then compiled into eBPF bytecode. The bytecode is loaded into the kernel via a system call, the eBPF program is attached to a specific "hook" point within the kernel, such as a system call, network event, or function entry/exit point. When that event occurs, the eBPF program is automatically executed.

And now you start to understand probably the main difference. 

While iptables relies on a linear, sequential rule lists for packet filtering, which could slow down with scale. Cilium uses eBPF (extended Berkeley Packet Filter) to attach programs directly to the kernel, enabling high-performance, more obervability. Cilium is working directly at kernel space level.

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/cilium-schema-spaces.png"></center>

<br>

Ok ok now we understand a little bit more Cilium and on what technology it relies. But how do you move from your old CNI to the new one without needing maintenance?

# Haproxy blue/green load balancing

Here at Bedrock we are still using Haproxy for some of our reverse proxy needs, it works perfectly fine and we now it well. Hence why it came to our mind when we wanted to find a why to migrate our clusters to our new CNI Cilium. 

There are many ways to handle such a migration. You could do 

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image5.png"></center>