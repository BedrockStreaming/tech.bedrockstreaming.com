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

At Bedrock, we recently migrated our Kubernetes clusters from AWS VPC CNI to Cilium—with zero downtime. By leveraging HAProxy for progressive traffic shifting and Consul for dynamic configuration updates, we achieved a seamless transition to eBPF-powered networking. In this article, we'll share how we designed our hybrid Blue-Green Canary strategy, the technical implementation details, and the lessons we learned along the way.

When we first adopted Kubernetes on AWS back in 2018, we chose VPC CNI for its native integration and simplified network management.

At that time, Cilium was not yet the powerhouse it is today in the Kubernetes ecosystem, and VPC CNI was the safest choice for moving to AWS. It worked perfectly for a long time and fulfilled its mission well. However, as time passed, new customers were onboarded, and new challenges arose. We needed additional capabilities from our CNI and began facing performance bottlenecks.

## Table of Contents

* [What about today?](#WhatAboutToday)
* [Dig into live migration](#DigIntoLiveMigration)
    * [Handle live migration with zero downtime](#HandleLiveMigrationZeroDowntime)
        * [Blue/Green deployment](#BlueGreenDeployment)
        * [Canary deployment](#CanaryDeployment)
    * [HAProxy blue/green load balancing](#HAProxyBlueGreenLoadBalancing)
    * [Deploying and synchronizing applications on both clusters](#DeploySynchronizeApplications)
    * [Consul powered configuration update](#ConsulPoweredConfUpdate)
* [Conclusion](#Conclusion)

# What about today? <a name="WhatAboutToday"></a>

Today in 2026, we think otherwise. Still relying on [KOps](https://kops.sigs.k8s.io/) managed Kubernetes cluster running on EC2 spot instances in private subnets at AWS. We needed to get more observability at our network layer on Kubernetes to have better insights about possible bottlenecks on our infrastructure or our ingresses implementation, but not only.

To have more insights on the fundamental differences between iptables with kubeproxy and eBPF there's this very interesting blogpost from [Isolvalent](https://isovalent.com) that we encourage you to check. It contains a lot of usefull informations.

[What is Kube-Proxy and why move from iptables to eBPF?](https://isovalent.com/blog/post/why-replace-iptables-with-ebpf/)

# Dig into live migration <a name="DigIntoLiveMigration"></a>

With a clear understanding of why we needed to migrate to Cilium, the critical question became: how do you execute such a migration in production without any downtime? This chapter explores the deployment strategies we evaluated, our hybrid approach combining Blue-Green and Canary patterns, and the technical infrastructure we built using HAProxy and Consul to orchestrate the migration safely.

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
Our hybrid approach also gave us the flexibility to migrate traffic application by application rather than switching everything at once. By maintaining separate weight configurations for each API or service, we could independently control the traffic distribution for individual workloads. This granular approach was a mandatory prerequisite to ensure stability and security throughout the migration.

We could start with less critical services, validate Cilium's performance in production with real traffic, and progressively move more sensitive applications only after gaining confidence. If an issue appeared with a specific application on the Cilium cluster, we could immediately roll back just that service while keeping others on the new infrastructure—significantly reducing blast radius and risk compared to an all-or-nothing migration strategy.

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image3.png"></center>
<br>

Importantly, this load balancing layer added negligible latency to our response times, giving us confidence to proceed.

## Deploying and synchronizing applications on both clusters <a name="DeploySynchronizeApplications"></a>

A critical challenge in our migration strategy was ensuring application parity between clusters. Without a centralized orchestration tool to manage deployments across all environments globally, we needed to adapt our existing processes.

At Bedrock, we use a common CI/CD workflow shared by all development teams to build and deploy their applications to Kubernetes. Our first step was updating this workflow to deploy applications to both clusters simultaneously. This ensured that all workloads remained synchronized between blue and green environments at all times.

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image7.png"></center>
<br>

However, not all projects follow the same deployment cadence. Some applications are rarely redeployed, which meant we couldn't rely solely on the CI/CD pipeline to synchronize everything. We had to manually verify that all projects were deployed and ready to receive traffic on both clusters before proceeding with traffic shifting.

This manual overhead highlighted the need for a more automated approach. To address this, we introduced a specific annotation to our Helm releases. This annotation is consumed by a workflow we developed, which can automatically redeploy releases from one cluster to another. This would significantly accelerates synchronization and will prove invaluable for any future blue/green migrations—whether for CNI changes, Kubernetes upgrades, or other infrastructure evolutions.

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image8.png"></center>
<br>

## Consul powered configuration update <a name="ConsulPoweredConfUpdate"></a>

But how do you update weights on the fly to advance the migration or rollback during issues?

We leverage [Consul](https://developer.hashicorp.com/consul) to dynamically update our HAProxy configuration. Using [Consul-agent](https://developer.hashicorp.com/consul/docs/automate/consul-template) and Consul KV/Store, we synchronize all HAProxy configurations across our infrastructure:

<center><img alt="" src="/images/posts/2026-01-16-how-to-migrate-to-cilium-with-zero-downtime/image4.png"></center>
<br>

When ready to migrate an application, we simply update the blue and green weights for that specific API in our Consul KV/Store. The Consul-template opens a persistent connection to the Consul server KV/Store and detects the change to its watched keys and triggers a hot reload of HAProxy via [the Runtime API](https://www.haproxy.com/documentation/haproxy-runtime-api/), seamlessly shifting traffic distribution. Using the Runtime API saves us the need to execute HAProxy reload which could cause some loss of performance during high traffic events, same approach we use for our [HSDO project](https://tech.bedrockstreaming.com/2021/11/18/hsdo.html).

## Conclusion <a name="Conclusion"></a>

So to recap, here's how we achieved our zero-downtime migration from VPC CNI to Cilium:

1. **Deployed a new Kubernetes cluster** with Cilium as the CNI, running in parallel to our existing VPC CNI cluster
2. **Set up HAProxy as a traffic orchestrator** in front of both clusters, with configurable weights to control traffic distribution
3. **Leveraged Consul KV/Store** to manage HAProxy configuration dynamically, allowing us to adjust traffic weights on the fly
4. **Gradually shifted traffic** from the blue (VPC CNI) cluster to the green (Cilium) cluster, application by application
5. **Monitored KPIs closely** at each step to validate performance improvements and catch any potential issues early
6. **Maintained rollback capability** throughout the process by simply adjusting weights back to the blue cluster if needed

This hybrid approach enabled us to migrate production workloads without service disruption while unlocking all the benefits of eBPF-powered networking.

One significant advantage of this architecture is its reusability. The same HAProxy and Consul-based traffic orchestration can be leveraged for future infrastructure changes—such as upgrading to new Kubernetes versions. While we currently perform in-place upgrades, major version upgrades can be risky. With this pattern already in place, we can simply spin up a new cluster with the target Kubernetes version and progressively migrate traffic, significantly reducing the risk associated with potentially breaking changes.

Potential enhancements to our solution include:

- **Automate weight adjustments** based on real-time metrics leveraging our monitoring stack [Victoria Metrics](https://tech.bedrockstreaming.com/2022/09/06/monitoring-at-scale-with-victoriametrics.html)
- **Implement automated rollback triggers** if error rates or latency thresholds are exceeded
- **Create a self-service interface** for teams to control their own application migrations
- **Target specific subsets of users** and enable sticky canaries, which will ensure that a subset of users are always redirected to our new cluster

---

*Many thanks to all contributors and reviewers of this article, and especially to our beloved Lead at the time: [Vincent Gallissot](https://github.com/vgallissot)*
