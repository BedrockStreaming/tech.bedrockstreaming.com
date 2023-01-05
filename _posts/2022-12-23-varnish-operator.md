---
layout: post
title: "Microservice architecture and caching layer"
description: "We needed to optimize our plateforme for inter-api calls"
author: arthurzinck
category:
tags: [onprem, cloud, cdn, varnish, aws, cloud, fastly, varnish-operator, cloudfront, alb]
color: rgb(0, 150, 255)
thumbnail: "/images/posts/2022-12-23-varnish-operator/main.png"
feature-img:
language: en
comments: true

---

At Bedrock we protect our applications with a Cloudfront or Fastly CDN. This layer ensures our applications are protected from potential Denial of Service Attack and it provides a layer of cache. No need to go down to the app for an easily cacheable response.

<center><img alt="before the project" src="/images/posts/2022-12-23-varnish-operator/image0.png"></center>

<br>

At least that is what we thought in 2018 when we were migrating from on premise to the Cloud.

At that time we had a Varnish instance caching everything at the border  of our on premise infrastructure. All the applications were running either on virtual machines or on bare metal servers. Those applications called each other through Varnish. This is ideal if applications are mostly called from the outside world. 

<center><img alt="historically before 2018" src="/images/posts/2022-12-23-varnish-operator/image2.png"></center>

<br>
In 2023, we think otherwise. We have now a Kops managed Kubernetes cluster running EC2 spot instances in private subnets at AWS. As we migrated to the cloud we also embarked on the journey of splitting monolith into smaller more manageable microservices.

With less monoliths the Bedrock product is more resilient and easier to scale but it changes the topologies of network calls. Before there were far more calls coming from the internet from end-users browsers. Now with the new architecture coming into place inter-app requests have increased.

One solution would be to directly call the ingress of the applications, staying inside the cluster but without the benefit of caching as it is handled by the CDN. This would lead to unsustainable increase in CPU usage, and probably very little gain in terms of response time.

A better solution for us would be to have the caching of CDN inside the cluster. This would enable us to have fast response time and little to no increase in CPU usage.

# Enter Varnish-Operator

We tested the project [IBM/Varnish-Operator](https://github.com/IBM/varnish-operator). This project allows us to create Custom Resources for Kubernetes handled by the Varnish-Operator. This object is called a VarnishCluster, the configuration is pretty simple to get started. This enables us to have a caching layer, between the Ingress-Controller and the Application.

<center><img alt="varnishcluster" src="/images/posts/2022-12-23-varnish-operator/image1.png"></center>

<br>

VarnishCluster also uses Varnish Configuration Language (VCL) which we are pretty familiar with since we use Varnish Onprem since 2015, and developers use it regularly to configure Fastly distribution.

By adding cache using VarnishCluster to an application that is not fully cacheable, we almost divided it's average response time by two. It is not a surprise as inter api calls used to look like the following graph:
<center><img alt="before-after-varnishcluster" src="/images/posts/2022-12-23-varnish-operator/image3.png"></center>

<br>

We changed parameters in the application after adding VarnishCluster so that it calls other app inside the cluster like in the following graph:
<center><img alt="before-after-varnishcluster" src="/images/posts/2022-12-23-varnish-operator/image4.png"></center>

<br>

# A few details

Before I wrap this up, here are a few details about the implementations.

As you will be able to read in the Varnish documentation: 
> "By default Varnish will use 100 megabytes of malloc(3) storage for caching objects, if you want to cache more than that, you should look at the `-s` argument."
So if you give many Gigs of memory to your Varnish container it won’t be attributed to the Varnish process. You can set it with the argument `-s storage=malloc,<Number>`.


As we use only Spot nodes that can be terminated by AWS at any moment with only 2 minutes notice, we want to give more resilience to our Varnish Clusters pod as cache is stored in RAM memory.
You lose all your cache at each restart of the Varnish Container. We added podAntiAffinity between application pods and VarnishClusters’ to avoid scheduling those pods on the same node and be vulnerable to reclaims.

We added a podDisruptionBudget to avoid losing all our pods at the same time. We also customized the VCL a bit to make Varnish serve stale content in case our application is unreachable.

We added a Prometheus Service Monitor to make sure all Varnish metrics would be scraped by [Victoria Metrics](https://tech.bedrockstreaming.com/2022/09/06/monitoring-at-scale-with-victoriametrics.html).

# In the Future

In next versions we would like to add the possibility to configure PriorityClass of VarnishClusters pod. PriorityClasses are used to order workloads priority.
In a context of scaling and of scarcity of resources, the scheduler will evict pods of lower priority to make room for the pod it is trying to schedule.

For now our VarnishCluster's pods have the PriorityClass by default but it is more critical than any other applications as it holds a cache in its Ram memory.

Also we do not have logs of Varnish. We would like to be able to stream Varnishlog content into [Loki](https://grafana.com/oss/loki/). This would be super useful to debug and to investigate if we ever encounter bugs or unexpected behaviors.

# Conclusion

With the generalisation of microservices, Bedrock needed to rethink its architecture to optimize not only for browser to api services calls but also for more API to API usage. By adding VarnishCluster in front of our applications and calling them directly from inside the cluster we improved significantly the Bedrock product.
[The Github project](https://github.com/IBM/varnish-operator) is still young and lacks important features, we hope with this article to help draw attention to this project and potential contributors. 
