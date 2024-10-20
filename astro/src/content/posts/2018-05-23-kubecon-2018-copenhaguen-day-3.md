---
layout: ../../layouts/post.astro
title: "KubeCon 2018 Copenhagen, day 3"
description: "Our notes for the conferences we saw during the third day of KubeCon 2018 in Copenhagen"
author: Vincent Gallissot, Pascal Martin


  
  
  
category:
tags: [kubernetes, KubeCon]
feature-img: "../../../../images/posts/kubecon-2018/title-kubecon.jpg"
comments: true
language: en
---

Back to KubeCon 2018 in Copenhagen, for the third and last day! You can read about [our first day here](/kubecon-2018-copenhaguen-day-1/) and [about our second day there](/kubecon-2018-copenhaguen-day-2/).


# Keynotes

## Cloud Native ML on Kubernetes - David Aronchick, Product Manager, Cloud AI and Co-Founder of Kubeflow, Google & Vishnu Kannan, Sr. Software Engineer, Google

Trying to run Machine Learning on Kubernetes? Working with Jupyter and Tensorflow? [Kuebeflow](https://github.com/kubeflow/kubeflow) could be of interest to you.


## Running with Scissors - Liz Rice, Technology Evangelist, Aqua Security

Even if we *never fall*, running with scissors could be dangerous. We wouldn't run with scissors, would we? Then, why do we keep running containers with privileges they should not need? And why do we mount more directories than needed as volumes?


![Just before the Keynotes](/images/posts/kubecon-2018/pascal-and-vincent-at-kubecon.jpg)


# Chaos Engineering WG Deep Dive – Sylvain Hellegouarch, ChaosIQ

One of the goals of Chaos Engineering being to *break stuff*, the talk started by a word about mindset: one must love supporting the team, and not try to save the day herself. Also, one must nurture empathy (including for the system), be assertive but not arrogant, not blame / be snarky (many of us are not great on that point).

Chaos Engineering follows a continuous loop. Start with a steady state (a baseline that comes from objective observation, which means you need business metrics and to collect data), formulate an hypothesis (not necessarily business oriented), and define an experimental method (the things we vary to prove / disprove the hypothesis). Warning: don't vary too many things at once.

The talk finished with a few words about the [Chaos Toolkit](https://chaostoolkit.org/), which aims to be simpler than the famous [Chaos Monkey](https://github.com/Netflix/chaosmonkey).


# Istio - The Weather Company's Journey - Nick Nellis & Fabio Oliveira, IBM

Several istio talks weren't enough for me, I wanted more. I didn't learn much more on this new one, except those tips:
*       You can define route specific retries with Istio
*       They use vistio to visualize istio traffic. That tool seems based on Netflix's Vizceral. Unfortunately, I couldn't find any GH repo nor blog talking about vistio.
*       If you want to implement Istio: start small


# Are You Ready to Be Edgy? — Bringing Cloud-Native Applications to the Edge of the Network - Megan O'Keefe & Steve Louie, Cisco

There are a few common problems in a *cloud computing* setting. Many devices (with IoT for instance) can mean a bottleneck on the network side of things, *the cloud* being far away can cause latency problems. Edge computing, moving apps (or parts of apps) from a centralized cloud, could help with those problems. Think AR/VR for latency, Video for high bandwidth, facial recognition for temporary/secure data.

The talk introduced the idea of deploying Kubernetes in edge locations -- like in cell towers -- and pointing users to the closest location. Those Kubernetes clusters would only host APIs or applications with specific needs, while the main parts would remain in a centralized cloud, which means we would have to develop edge-ready applications, keeping in mind problems such as network splits, data synchronization, deployment, ...


# Integrating Prometheus and InfluxDB - Paul Dix, InfluxData

I was a lot surprised in this talk as we were like 30 in a room for 300.
I guess people don't need to keep metrics more than 15days with the Prometheus engine, or maybe people are already using InfluxDB as a guaranteed long term storage.
Because we are in the second case, we are testing influxDB with Prometheus, so this talk came at the right time.
I didn't learn much on InfluxDB + Prometheus, nor on federated queries that comes with HA.

Paul then questioned why not use a single query language for all query engines? That would be more practical and maintainable. The question is still open, even if Paul proposes IFQL to rule them all. The main idea is for all query engines to coordinate and stop creating a new language on each new engine.


# A Hackers Guide to Kubernetes and the Cloud - Rory McCune, NCC Group PLC

First, a word about threat models. Pretty much everyone will see random Internet hackers looking for easy preys. Some of us will be specifically targeted by attackers. Only a few will be targeted by nation states. You should think about your threat model, which may or may not be the same as your neighbour's.

Then, time to think about your attack surface. Attackers will find the weakest point, which is not always where your might think. What about the cloud around your Kubernetes cluster? Github is a great way of getting accesses (many commit their credentials and/or do not remove them from history -- bots are crawling this!). Developers' laptop are generally full of interesting data, and are not necessarily protected enough.

On Kubernetes, external attackers will try to access the API server and etcd, the kubelets, or maybe inject malicious containers. You should turn off the *insecure port*, control access to kubelet and etcd, retrict the use of service tokens, restrict privileged containers, enable authentication and authorization on the API server, set pod security and network policies, and do regular upgrades. Also, don't forget about cloud permissions.


# Cloudbursting with Kubernetes - Irfan Ur Rehman & Quinton Hoole, Huawei Technologies

That might not be everyone's problem, but still interesting to hear about. If you have multiple cloud providers with different pricings, you might want to optimize your costs by using the most expensive only on load peaks. That is exactly what they did, using Kubernetes clusters federation and specific annotations. We won't go over this approach because we'll stick with one cloud provider, but that may be interesting for some people.


# Operating a Global-Scale FaaS on Top of Kubernetes - Chad Arimura & Matt Stephenson, Oracle

This was about the [Fn project](https://fnproject.io/). A couples of problems related to multitenancy: network isolation on Kubernetes, noisy neighbors (I/O being the bottleneck). Helm has a few limits, worked around with shell scripts.


# Inside Kubernetes Resource Management (QoS) – Mechanics and Lessons from the Field - Michael Gasch, VMware

Resource management goes through cgroups. With containers, we see all the CPU/RAM, but this doesn't mean we'll be able to use them all: we may have to share with other containers. Works with requests. For now, cpu and memory are stable resources, but others (hugepages, ephemeral storage, device plugins) are in beta. You should align Kubernetes' QoS with the underlying infrastructure, enable quotas in the cluster, and protect critical system pods.

I have to admit I didn't take much notes during this talk, but noted [the slides](https://schd.ws/hosted_files/kccnceu18/33/Inside%20Kubernetes%20QoS%20M.%20Gasch%20KubeCon%20EU%20FINAL.pdf) contain a lot of informations -- for more, go read them ;-)


# Observing and Troubleshooting your Microservices with Istio - Isaiah Snell-feikema, IBM & Douglas Reid, Google

I promise, this is the last Istio conf I went to.
In case that wasn't obvious, Istio is becoming the default service mesh, like Prometheus is for metrics. I couldn't work much on it so I wanted to learn the most possible from it during this KubeCon. I can say this talk was one of the best for Istio discovery and even advanced skill. I won't be able to summarize everything, so here are few tips I kept from it:
* Envoy's `/stats` route gives a lot of infos of servers
* Istio system logs gives also traffic spikes
* Istio's access logs can be uploaded to fluentd/elk
* Canary testing / blue-green deployments can be done via RouteRule CRD.

If you are considering using Istio, you **must** see [the slides](https://schd.ws/hosted_files/kccnceu18/99/Observing%20and%20Troubleshooting%20your%20Microservices%20with%20Istio.pdf)


# Vitess and a Kubernetes Operator - Sugu Sougoumarane, YouTube

I heard about [Vitess](https://vitess.io/) for the first time during this KubeCon, even though it's an *old* project. It's a middleware for MySQL, sitting between the database and our applications. It helps scale it through sharding -- the goal being to answer the common pain points for databases: scalability, cloud and making DBAs happy. It's also one of the CNCF project I noted a few days ago I should take a closer look at.


# Final words?

The weather was nice and our plane was only on Saturday, so we finished the day with a walk in the City.

![Doing some sightseeing in the city after KubeCon](/images/posts/kubecon-2018/a-boat-in-the-city.jpg)
