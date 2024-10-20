---
layout: ../../layouts/post.astro
title: Prescaling pods in Kubernetes, we open source our solution
description: Reactive scaling in k8s is not always enough. We have built a solution and we share it with everyone now!
author: [j_planckeel, v_chabrier]
tags: [k8s, kubernetes, pods, prometheus, scaling, hpa, resiliency, go, prescaling, opensource]
color: rgb(251,87,66) # this is Bedrock color here
---

Previously we [discussed](https://tech.bedrockstreaming.com/2022/02/03/prescaling.html) how we manage the load of our Kubernetes clusters and how we can anticipate our needs with prescaling. Today, we are here to share our solution that we have reworked and open sourced! 
![BedrockStreaming Logo](/images/posts/2022-09-01-kubernetes-prescaling-we-open-source-our-solution/br-opensource.png) 

At [Bedrock Streaming](https://www.bedrockstreaming.com/), we provide streaming platforms to our customers (6play, Salto, Videoland and many others), we have a good knowledge of the daily load peaks and we know in advance the programs that are likely to generate a lot of traffic. We can therefore rely not only on reactive scaling, which has its limits (cf. [prescaling article](https://tech.bedrockstreaming.com/2022/02/03/prescaling.html)) but also on prescaling. 

_> **Prescaling** consists of increasing the number of critical application pods in our clusters in advance in order to be ready to face a sudden traffic peak._

Initially, we developed an in-house solution in Python for a simple reason: it was the language that most people in the team knew. Since we had time to test our solution, we thought it would be great to share it with everyone. But to do so, we had to make some adjustments.

## We rewrote everything in go

Many open source projects we use are written in Golang. In addition, the DevOps/Cloud world is mostly focused on Go. So, we decided to rewrite our prescaling solution in Go in order to make our teams more skilled in this language. The other goal was to make it cloud agnostic. In the Python version, we had an API part that stored prescaling events in a DynamoDB table, which made the solution dependent on AWS. Since prescaling is Kubernetes oriented, we had thought in the first versions in Python to store these events in Custom Resources (CRD) but due to lack of time, we did not implement it. We took advantage of the redesign to implement it and remove the dependency with AWS DynamoDB.

We also wanted to simplify the project. In the first versions, we had two bricks: one containing the exporter and another the API. We merged the two applications into one monolith. The API is CRUD and can handle CRD events. 

## Here we go, we open source it

The great moment has come. Our prescaling solution is now available on GitHub in its alpha version: [https://github.com/BedrockStreaming/prescaling-exporter](https://github.com/BedrockStreaming/prescaling-exporter).

This is the version we currently use in all our clusters. Let's quickly see how to implement the solution (you can find more details in the repo README).

The prescaling-exporter is distributed with helm charts in order to install it in kubernetes cluster. 

### Prerequisites

The following bricks must be installed in the k8s cluster: 
   * `Prometheus` Stack or `Victoria Metrics Stack`
   * `Prometheus Adapter`

It is possible to use another metrics stack but we do not provide an example at this time. 

Clone the repo and run the following command with Helm3: 

```bash
helm install prescaling-exporter ./helm/prescaling-exporter -n prescaling-exporter --create-namespace
```

It's required to add the following configuration to Prometheus adapter: 

```
- "metricsQuery": "avg(<<.Series>>{<<.LabelMatchers>>})"
    "name":
      "as": "prescale_metric"
    "resources":
      "overrides":
        "namespace":
          "resource": "namespace"
    "seriesQuery": "prescale_metric"
```

### Daily prescaling event 

We have chosen to manage the configuration of daily events directly on the HPA (HorizontalPodAutoscaler) of the applications. Here is how to activate it, through annotations:

```yaml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: "{{ .Release.Name }}"
  annotations:
    annotations.scaling.exporter.replica.min: "{{ .Values.hpa.annotations.replica_min }}"
    annotations.scaling.exporter.time.end: "{{ .Values.hpa.annotations.time_end }}"
    annotations.scaling.exporter.time.start: "{{ .Values.hpa.annotations.time_start }}"
spec:
  metrics:
  - type: External
    external:
      metricName: "prescaling_metric"
      metricSelector:
          matchLabels:
            deployment: "{{ .Release.Name }}"
      targetValue: 10
```

We are able to control the start and end time of the prescaling and the minimum number of pods we want during this window. Please note that if the number of pods we want for prescaling is less than the current number of pods, the solution will not downscale the application and the HPA will continue to behave as usual.



### One-time events

We can also record one-off events. For example, at Bedrock Streaming, during an important soccer match, we will record a special event in a Custom Resource Definition. 
One-time events allow to prescale all applications having annotations on their HPA by multiplying their prescaling minimum replicas (`annotations.scaling.exporter.replica.min`) by the multiplier of the event in question.

To record a one-time event, an OpenAPI UI (formerly known as Swagger) is exposed by the prescaling exporter at the url `/swagger/index.html`. We can also register a new event from here or directly by making an api call to the following address `/api/v1/events/`. 

![Screenshot POST prescaling event](/images/posts/2022-09-01-kubernetes-prescaling-we-open-source-our-solution/post-prescaling-event.png) 


## What’s next?

We will continue to improve the solution. For example, we are thinking about removing annotations on HPAs and replacing them with a new dedicated CRD.

All contributions are welcome, don't hesitate to come and exchange with us on GitHub if you want to use the solution, we would be delighted. 

<br/>

Authors:[ Jérémy Planckeel](https://www.linkedin.com/in/jeremy-planckeel-44426112b/), [Valentin Chabrier](https://www.linkedin.com/in/valentin-chabrier-180937142/) 