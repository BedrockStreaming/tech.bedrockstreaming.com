---
layout: post
title: "KubeCon 2018 Copenhaguen, day 1"
description: "Our notes for the conferences we saw during the first day of KubeCon 2018 in Copenhaguen"
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
  feature: posts/kubecon-2018/kubecon-day-1.jpg
  credit: Pascal Martin
  creditlink:
comments: true
language: en
---

At the very beginning of May, we (Pascal and Vincent) went to KubeCon 2018. It was a three-days long event, with more than 300 conferences. 4300 people met at Bella Center, a huge conference place close to Copenhaguen in Denmark. Here are some of our notes about some talks we saw.


# Keynotes

## How Good Is Our Code? - Dan Kohn, Executive Director, Cloud Native Computing Foundation

## CNCF Project Update - Liz Rice, Technology Evangelist, Aqua Security; Sugu Sougoumarane, CTO, PlanetScale Data; Colin Sullivan, Product Manager, Synadia Communications, Inc. & Andrew Jessup, Co-founder, Scytale Inc.

During this keynote, I realized the CNCF is helping a lot more projects than I thought it was: it's not just Kubernetes. I will take a closer look to some of them in the future -- they are all listed on [l.cncf.io](https://landscape.cncf.io/).

## Re-thinking Networking for Microservices - Lew Tucker, VP/CTO Cloud Computing, Cisco Systems, Inc.

## CERN Experiences with Multi-Cloud Federated Kubernetes - Ricardo Rocha, Staff Member, CERN & Clenimar Filemon, Software Engineer, Federal University of Campina Grande

OK, so, sometimes, it actually is *rocket-science* (or pretty close to it). It's nice seeing Kubernetes used for science and research, on a federation of around 400 clusters!

## From Innovation to Production - Dirk Hohndel, VP & Chief Open Source Officer, VMware

## CNCF 20-20 Vision - Alexis Richardson, Founder & CEO, Weaveworks


![Waiting for the Keynotes to start](/images/posts/kubecon-2018/kubecon-before-keynotes.jpg)


# Whats Up With All The Different Container Runtimes? - Ricardo Aravena, Branch Metrics

Overview of the different containers runtime, starting with OpenVZ in 2006 (still maintained, but the last 2.7 version is not as stable as the previous one, and it doesn't support Kubernetes), and LXC (Kubernetes support is low-priority WIP and LXC uses a specific image format) in 2011. Docker (initially based on LXC) arrived in 2013 and things have gone insane since then. With libcontainer and rkt in 2014, OCI in 2015 and CRI in 2016. Today, Kubernetes supports several runtines.

rkt could be interesting from a security point of view (supports TPM and VMs). With Kubernetes 1.10, the default runtime is runc. crun is the most interesting runtime for performances, but is WIP and isn't currently used much. Kata, released in 2017 has the best security (it runs containers in VMs) and is OCI compliant, but is slower and more heavyweight. Other very specific runtimes include nvidia, railcar, pouch, lmctfg, systemd-nspawn...

Basically, today and for most workloads, you should go with the standard docker/containerd runtime. There is a convergence towards OCI, it's the default for Kubernetes and docker is going to adopt the CRI plugin.


# Continuous Delivery Meets Custom Kubernetes Controller: A Declarative Configuration Approach to CI/CD - Suneeta Mall & Simon Cochrane, Nearmap

Kubernetes is great but, CI/CD is not really its job -- and CI/CD depends a lot on the company you work at and its culture. Here, they started deploying their applications with `kubectl` and YAML files, and even if CI usually doesn't cause much troubles, CD is not that easy. And using a managed CI (CircleCI, shippable, AWS Codepipeline...) means exposing Kubernetes's control plane on the Internet, which is not great. Also, the *Gitops* approach with its *git is the source of truth* mindset is OK, but committing version numbers again and again *pollutes* the history with a lot of noise -- when this history could be kept in the cluster itself.

So, they went with some kind of CD *lite*: a service running in the cluster, which monitors the registry and deploys the new version of an image when it sees it. This means the cluster doesn't need to access git and the CI chain doesn't need to access the cluster, making the configuration simpler.

The tool they developed for this is [`nearmap/cvmanager`](https://github.com/nearmap/cvmanager). It seems relatively easy to install and configure. And I like the idea of having a gap between Git/CI and CD. I may have to test this, especially to see what it can do when it comes to canary or blue/green deployments, but this is one of the things I saw at KubeCon I will discuss with my colleagues!


# Habitat Builder: Cloud Native Application Automation - Elliott Davis & Fletcher Nichol, Chef.io (Habitat.sh)

I had never heard of [Habitat](https://www.habitat.sh/) before, so I was kind of curious what this was about. This idea of platform-independent build artifacts (with exporters for docker, Kubernetes, Helm) could be interesting for some teams, but it's not a need I currently have. The automated deployments might be interesting though, but we are already looking at other tools.


# How to Export Prometheus Metrics from Just About Anything - Matt Layher, DigitalOcean

This presentation was about a few good practices to follow when it comes to exposing Prometheus metrics from a Go application. Basically, you should use the Go client library, be really careful about concurrency, build reusable packages, write unit-tests, use `promtool check-metrics`, and read and follow the Prometheus metrics best practices.


# Seamless Development Environments on Kubernetes using Telepresence - Ara Pulido, Bitnami

Kubernetes is a great production environment, but it feels like development environment is kind of an afterthought: even for a simple application, if you want to develop (locally?), things are not easy. People are currently using two distinct ways: using docker compose to replicate the production environment (but compose doesn't do everything: rbac, job, ingress... and having to maintain everything twice is not fun), or build/push/deploy-to-k8s and wait many seconds everytime one wants to F5 on a page, which is unberably slow (I wouldn't ask my developers' colleagues to do this for even half a day!).

The solution proposed during this conference is [Telepresence](https://www.telepresence.io/). It allows a developer to swap out a pod from a cluster and *inject* her own pod, running locally, at its place. Some sort of VPN is established between her computer and the cluster, which means the pod running locally behaves just like if it was still in the cluster (including DNS, service discovery, access to non-Kubernetes managed services and all).

There are still limitations and constraints (if two developers want to work on the same service, they'll each need their own namespace in the cluster, as two people cannot swap out the same pod), but the plans for this project are interesting and I will definitely take a closer look at it in a couple of month, when I start thinking more about our development stack!


# From Data Centers to Cloud Native - Dave Zolotusky & James Wen, Spotify

This last conference of the first day was about Spotify's migration from their on-premise datacenters to *the cloud*. For many years, they were doing everything on-prem (including a 3000 nodes Hadoop cluster -- the largest in Europe, at the time), often developing their own proprietary software (like custom monitoring, proprietary messaging framework, custom Java service framework, custom container orchestrator, ... Some have been open-sourced). The first step for them has been to get out of their own datacenters, moving everything to *another datacenter* (but still using their proprietary stuff). It took them three years and a half, trying to make this migration as seamless as possible for the development teams.

Next step is to become *cloud native*, especially moving to Kubernetes. They did this in several steps, starting small by sending production traffic to one service deployed to one cluster for one hour (allowed them to validate DNS, logging, service discovery, metrics system, networking). Then, three services on one cluster (permissions, namespaces, quotas for each namespace, developers documentation). After that, services on a *volunteer* basis (clusters, scripted clusters creation, secrets, deployment tooling based on a wrapper around `kubectl`, CI integration => a lot of learning for a lot of people). Then, two high-traffic services, including a service receiving 1.5 million requests per second (horizontal auto-scaling, network setup, confidence, reference for other projects). And, finally, self-service migration, with teams migrating when they want, following the docs, and ops not always knowing what's running in the cluster (reliability, alerts, on-call, disaster recovery, backups, sustainable deploy). Everything going pretty much fine by now, it's time to investigate on a few *odd things* and specific needs, with a temporary ops team assembled to help.

The most importat idea here is you don't have to do everything right from the start. For example, they waited quite a long time before setting up a sustainable deployment method, which might seem odd to many of us. But it allowed them to move forward and validate a lot of things one after the other. That's something I will keep in mind: if it worked for them (4000 employees, including 500 techies), it could work for many other companies!


# Keynote: Anatomy of a Production Kubernetes Outage - Oliver Beattie, Head of Engineering, Monzo Bank

This keynote was about  major outage at Monzo. You can read more about it in the [post-mortem](https://community.monzo.com/t/resolved-current-account-payments-may-fail-major-outage-27-10-2017/26296/94) they posted after it happened. Basically, even when you are careful, an outage can still happen: several causes combined with a very specific bug happening with specific versions in a specific case and voilà. Nice talk, and nice to hear a bank being so open!


# Keynote: Prometheus 2.0 – The Next Scale of Cloud Native Monitoring - Fabian Reinartz, Software Engineer, Google

Prometheus is *the* monitoring stack everyone seems to be using now. This keynote presented how much faster Prometheus 2.x is, compared to Prometheus 1.x. Having never used the 1.x versions, I have to admit I never suffered from it. It is still nice noting 2.x scales much better (requires less RAM/CPU and its performances don't degrade much with a huge number of metrics).


# Welcome reception

This first day ended with a nice buffet at Bella Center, next to the sponsor booths. As we each one went to see different talks, it allowed us to chat about what we saw and heard, even if we didn't stick around too long, after such a long day -- especialy knowing there would be two more just after!

![There is so much wind in Copenhaguen there was a sign at the corner of the conference center!](/images/posts/kubecon-2018/windy-in-copenhaguen.jpg)
