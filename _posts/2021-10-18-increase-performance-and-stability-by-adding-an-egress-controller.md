---
layout: post
title: "Increase performance and stability by adding an Egress Controller in a Kubernetes cluster at AWS"
description: "How to avoid ErrorPortAllocation on AWS NAT Gateways, with PHP applications, at scale"
author:
    name: Tanguy Falconnet
avatar:
email:
twitter: 
github: tfalconnet
category:
tags: [php, aws, cloud, performance, sysadmin, kubernetes, HAProxy]
comments: true
image:
  feature: posts/bonnes-pratiques-web/bedrock.jpg
language: en
---

# Introduction

We recently encountered issues with our PHP applications at scale in our Kubernetes clusters at AWS. We will explain the root cause of these issues, how we fixed them with Egress Controller, and overall improvements. We also added a detailed configuration to use HAProxy as Egress Controller.

# Context

Bedrock is using PHP for almost all of the backend API of our streaming platforms (6Play, RTLMost, Salto, …). We have deployed our applications in AWS on our kops-managed Kubernetes clusters. Each of our applications is behind a CDN for caching purposes (CloudFront, Fastly). This means every time an application needs to access another API, requests go on the internet to access the latter through CDN.

During special events with huge loads on our platforms, we started to see TCP connection errors from our applications to the outside of our VPC.

# ErrorPortAllocation source

After a few investigations, we saw that TCP connection errors were correlated with NAT Gateways ErrorPortAllocation.

![Error Port Allocation Graph](/images/posts/2021-10-18-increase-performance-and-stability-by-adding-an-egress-controller/error-port-allocation.png)
<center><ins>Some loadtesting on our platform, which you may see as no traffic, huge traffic, then no traffic again</ins></center>


In AWS, NAT Gateways are endpoints allowing us to go outside our VPC. They have hard limits that can’t be modified:
> A NAT gateway can support up to 55,000 simultaneous connections [...]. If the destination IP address, the destination port, or the protocol (TCP/UDP/ICMP) changes, you can create an additional 55,000 connections. For more than 55,000 connections, there is an increased chance of connection errors due to port allocation errors. [AWS Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html#nat-gateway-limits)

Our applications always request the same endpoints: other APIs CDN. Destination port, IP or protocol doesn’t change that much, so we start hitting max connections, resulting in ErrorPortAllocation.

At the same time, we found a very interesting blog post: [Impact of using HTTP connection pooling for PHP applications at scale](https://techblog.wikimedia.org/2020/10/26/impact-of-using-http-connection-pooling-for-php-applications-at-scale/), which was a very good coincidence.

As you can read in Wikimedia's post, PHP applications aren’t able to reuse TCP connections, as PHP processes are not sharing information from a request to another. Recreating new connections on the same endpoints is inefficient: adds latency, wastes CPU (TLS negotiation and TCP connection lifecycle) but also overconsumes TCP connections.

![Outgoing Traffic without Egress Controller](/images/posts/2021-10-18-increase-performance-and-stability-by-adding-an-egress-controller/outgoing-traffic-without-egress-schema.png)
<center><ins>PHP application calls another API on internet through the NAT gateway</ins></center>

# Outgoing requests optimization

## Egress Controller 

HAproxy is fast and reliable. We use it often and know it well. We already have it as Ingress Controller in our clusters and we know service mesh needs time to be production-ready. So we thought a service mesh might be overkill in our case and we tried to add HAProxy as Kubernetes Egress Controller in our clusters. 

![Outgoing Traffic with Egress Controller](/images/posts/2021-10-18-increase-performance-and-stability-by-adding-an-egress-controller/outgoing-traffic-with-egress-schema.png)
<center><ins>Outgoing requests go through the Egress Controller, which pools and maintains TCP and TLS connections</ins></center>


We configured some applications to send a few outgoing requests to Egress Controller. The latter was configured to do TCP re-use and to forward to desired endpoints. 

## Effects

With this optimization, we don’t encounter ErrorPortAllocation anymore. Requests duration are reduced by 20 to 30%, and apps are consuming less CPU. Ressources were spent to instantiate a new TLS connection, which is now handled by Egress Controller.

![CPU consumption of an app configured to use Egress Controller for DynamoDB requests](/images/posts/2021-10-18-increase-performance-and-stability-by-adding-an-egress-controller/cpu-metrics.png)
<center><ins>Application consumes less CPU, because Egress Controller is responsible of TLS and TCP connections to the outside world, which consumes a lot of resources</ins></center>

# Detailed configuration

We generally prefer to use what already exists rather than starting from scratch, so we tried to see if [HAProxy Kubernetes Ingress Controller](https://www.haproxy.com/documentation/kubernetes/latest/installation/community/) could be used as egress.

HAProxy Ingress Controller loads its frontend domains in [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resource, and loads backend servers in the associated [Service](https://kubernetes.io/docs/concepts/services-networking/service/) resource. To inject an external domain as a backend server, we have to use [Service ExternalName](https://kubernetes.io/docs/concepts/services-networking/service/#externalname).

![Detailed Configuration Schema](/images/posts/2021-10-18-increase-performance-and-stability-by-adding-an-egress-controller/detailed-configuration.png)

To use HAProxy Kubernetes Ingress Controller as an Egress Controller, we will use Ingress Kubernetes resource as Egress to define domains handled by the Controller.

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: app1
spec:
  type: ExternalName
  externalName: app1.example.com
  ports:
    - name: https
      protocol: TCP
      port: 443
      targetPort: 443
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: app1
annotations:
    haproxy.org/server-ssl: "true"
    haproxy.org/backend-config-snippet: |
      # See this article for the deep reasons of both parameters: https://www.haproxy.com/fr/blog/http-keep-alive-pipelining-multiplexing-and-connection-pooling/
      # enforce SNI with the Host string instead of the 'Host' header, because HAProxy cannot reuse connections with a non-fixed Host SNI value.
      default-server check-sni app1.example.com sni str(app1.example.com) resolvers mydns resolve-prefer ipv4
      # make HAProxy reuse connections, because the default safe mode reuses connections only for the same source.ip
      http-reuse always

spec:
  rules:
  - host: app1.example.com
    http:
      paths:
      - backend:
          serviceName: app1
          servicePort: 443
```


When everything is ready, you will be able to send requests:

```yaml
curl -H “host: app1.example.com” https://haproxy-egress.default.svc.cluster.local/health
```

By default, HAProxy resolves domain names only at bootime. But it can be configured to resolves during runtime by adding a [config snippet to Egress Controller configuration](https://www.haproxy.com/documentation/kubernetes/latest/configuration/configmap/#global-config-snippet):

```yaml
global-config-snippet: |
  resolvers mydns
    nameserver local <MY_DNS>:53
```

# Conclusions

It seems surprising to reduce requests latency by adding a hop in a network. But it does really work, even if it has some limits.

The main problem with this approach is the fact that we are effectively creating a Single Point of Failure in our clusters if we choose to send all our egress traffic through it. Instead, we are carefully selecting applications that should use an Egress Controller to refine the configuration little by little. Some applications are tightly tied to external services and would massively gain from this and others would only be less resilient.
