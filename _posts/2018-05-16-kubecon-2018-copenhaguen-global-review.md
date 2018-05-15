---
layout: post
title: "KubeCon 2018 Copenhaguen, global review"
description: "Our global review of KubeCon 2018 in Copenhaguen"
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
  feature: posts/kubecon-2018/kubecon-review.jpg
  credit: Pascal Martin
  creditlink:
comments: true
language: en
---

After those three days at KubeCon, we've seen and heard a lot of interesting ideas. If we had to do a short recap, here are the points we would list.

First of all "Cloud native" seems to be *the* buzzword of the year. Not just *cloud* anymore, but *cloud native*! What does it mean? Instead of just deploying your application to the cloud, it should fully *use the cloud*.

Then, Kubernetes. It is a mature solution in itself. There doesn't seem to be any doubt left about that.

Deployment, CI and CD. Well, not so much. There are a few projects out there and several different approaches (`kubectl apply`, a bit of Jenkins around it, deployments from inside the cluster, ...), but not one thing that everyone is doing/using.

For monitoring, use Prometheus. It's pretty much what everyone is using.

Service mesh. One of the big things this year, everybody is talking about it, Istio seems to be taking the lead. It's still moving fast, though and not enough people are trully mastering this in a production setup.

Development environment. Well, "LOL" would do it maybe. This is clearly not a priority yet. Some teams and projects (like Telepresence) have started working on this, but there is still road ahead.

GitOps. Everybody is going this way. Versionning, of course. But also using Git events to pilot things.

Things are beginning to move on the security side of things. Companies are starting to notice there is work to be done, startups are appearing with different services.

And, finally, multi-clusters. We felt a few people are using multi-cluster, but it's often done *by hand*. Maybe a subject we'll hear more about in the future?
