---
layout: post
title: "Three years running Kubernetes on production at Bedrock"
description: "Running all our workloads on Kubernetes is not that simple. We've learned a lot and are still learning, but we can already share what we're doing"
author:
  name: Vincent Gallissot
  avatar:
  email:
  twitter: vgallissot
  facebook:
  github:
category:
tags: [Infrastructure, Cloud, Kubernetes, Kops, AWS, HAProxy]
image:
  feature: posts/2020-12-08-three-years-running-kubernetes/ihor-dvoretskyi-UGKfiS5CcZI-unsplash.jpg
  credit: Ihor Dvoretskyi
  creditlink: https://unsplash.com/photos/UGKfiS5CcZI
comments: true
language: en
---

We migrated our first application to a Kubernetes cluster at AWS in 2018.
Three years later, we manage a dozen clusters, to which we have added a lot of tools and we have a much better grasp of certain subtleties.
Each cluster reaches, depending on the load, hundreds of nodes and thousands of pods.


## Table of Content

* Base
    * Kops and templates
    * Tools we use
    * Keep tools up to date on all clusters
* Resiliency
    * DNS
    * Lot of ASGs
    * edicated ASGs by app
    * QOS Guaranteed Daemonsets
* Scalability
    * Cluster Autoscaler
        *  Expander Priority
    * Overprovisioning
    * PriorityClass
    * Low HPA targets
    * Long downscale durations
* Observability
    * Metrics
    * Logs
    * Alerting
* Costs
    * Spot instances
        * Inter accounts reclaims
        * Ondemand fallback
        * Draino and node-problem-detector
        * Spot Tips
    * Kube-downscaler
    * HAProxy Ingress Controller


## Base

### Kops and templates

EKS didn’t exist when we started to work on Kubernetes on AWS. So we chose to use Kops which, by the way, works very well.
Kops is responsible for creating, updating and deleting our clusters, but also associating resources on our AWS accounts: DNS zone + entries, AutoScalingGroups, SecurityGroups, etc.
Our rolling-updates and rolling-upgrades are 100% handled by kops which never failed us.

Because we have several clusters, we chose to use `kops toolbox template` feature instead of having a single YAML file per cluster. That allows us to have mutualized resources definitions, like AutoScalingGroups, DNS options or namespaces list, inside common files and a dedicated template file per cluster, referencing mutualized configs through variables.

For example, the EC2 instance types will be defined as snippets:

± cat snippets/spot_4x_32Gb_machine_type.yaml:
- c5.4xlarge
- c5d.4xlarge
- c5n.4xlarge


And used inside a generic template file:
± cat templates/3_spot-nodes.yaml.tpl
…
  mixedInstancesPolicy:
    instances:
    {{ if eq $index "4x_32Gb" }}
    {{ include "spot_4x_32Gb_machine_type.yaml" . | indent 4 }}
    {{ end }}
…

Finally, if the cluster requires an ASG with instances size 4x with 32GB RAM on Spot instances:
± cat vars/prod-customer.k8s.foo.bar.yaml
…
spot_nodes:
  4x_32Gb:
    az:
      - eu-west-3a
      - eu-west-3b
      - eu-west-3c
    min: 1
    max: 100


A bash script makes the glue between all this, generating manifests files, creating/updating clusters and checking everything is operating normally.

All of the above lives as files in a git repository, ensuring we’re doing only Infrastructure as Code.

We never make any Infrastructure modification outside of code.


### Tools we use

We add some tools to a raw Kubernetes cluster:

* aws-authenticator
* cluster-autoscaler
* cloudwatch-exporter-in-cluster
* cni-metrics-helper
* draino
* fluentd
* haproxy-ingress-controller
* iam-role-for-serviceaccount
* k8s-spot-termination-handler
* kube-downscaler
* logstash
* loki
* metrics-server
* node-problem-detector
* overprovisioning
* prometheus
* prometheus-dnsmasq-exporter
* prometheus-pushgateway
* statsd-exporter
* statsd-proxy
* victoria-metrics-cluster

Some of those tools stand for compatibility reasons after our cloud migration, so our developers can still use our ELK stack, or a statsd format to generate metrics.

We need all these tools to have a production-ready cluster, so we can provide scaling, resilience, observability, security with controlled costs. This list isn't even exhaustive.

It evolved a lot over the last 2 years and will surely evolve a lot in the near future, as both Kubernetes and AWS are moving playgrounds.


### Keep tools up to date on all clusters

We use a Jenkins job for that.

We deploy k8s-tools the same way we deploy our apis in the cluster: with bash scripts and a helm chart, dedicated per application.

± tree app/loki/.cloud/       
app/loki/.cloud/
├── charts
│   ├── Chart.yaml
│   ├── templates/
│   ├── values.customerX.yaml
│   └── values.customerY.yaml
└── jenkins
    ├── builder.sh
    └── deployer.sh

A Jenkins job runs the builder.sh, then the deployer.sh script for every k8s-tool.
Builder.sh is run when we need to build our own Docker images.
Deployer.sh handles the Helm Chart deployment subtleties.
All apps are first deployed on all our staging clusters, then on prod.

Consistency is maintained over all our clusters through this Jenkins job.


## Resiliency
### DNS

Like everyone who’s using Kubernetes on production, at some point, we faced an outage due to DNS. It was either [UDP failing because of a kernel race condition](https://www.weave.works/blog/racy-conntrack-and-dns-lookup-timeouts), or [musl (Alpine Linux’s replacement of glibc) not correctly handling domain or search](https://github.com/gliderlabs/docker-alpine/blob/master/docs/caveats.md#dns), or also the default ndots 5 dnsConfig, or even KubeDNS not handling peak loads properly.

As of today:

* We are using a local DNS cache on each worker node, with dnsmasq,
* We use Fully Qualified Domain Names as much as possible,
* We’ve defined dnsConfig preferences for all our applications,
* We use CoreDNS with autoscaling,
* We forbid as much as possible musl/Alpine

Example of a dns configuration in prod:

```yml
  dnsConfig:
    options:
    - name: use-vc
    - name: single-request
    - name: single-request-reopen
    - name: ndots
      value: "1"
  dnsPolicy: ClusterFirst
```

`dnsPolicy: ClusterFirst` makes sure we’re using the node’s loop interface, so pods will send their DNS requests to dnsmasq installed locally on each node.
Dnsmasq forwards DNS queries to CoreDNS for certain domains and to the VPC’s DNS server for the rest.


### Lot of ASGs

We had a dozen ASGs per cluster.
This is both for resiliency and because we use Spot instances.
With spot instance reclaims, we needed to have a lot of instance types and family types: m5.4xlarge, c5.4xlarge, m5n.8xlarge, etc.
This is an autoscaler recommendation to split ASGs so that [each ASG has the same amount of RAM and number of CPU cores](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/README.md#using-mixed-instances-policies-and-spot-instances) when using mixed instances policies.
As a result, we had ASGs like:

* spot_4x_32Gb
* spot_4x_64Gb
* spot_4x_128Gb

**Lot of ASGs doesn’t work well**
AZ rebalancing doesn’t work anymore when using more than one ASG. It becomes totally unpredictable and uncontrollable. It is even a total nightmare with a dozen ASGs.

You can see the difference of outgoing traffic between our 3 NAT Gateway over 4 hours time range :
![difference of outgoing traffic between our 3 NAT Gateway](/images/posts/2020-12-08-three-years-running-kubernetes/Screenshot-from-2020-11-17-16-07-11.png)
The blue NAT gateway is way more used than the two others between 19h00 and 22h00. The green NAT gateway is used half as much as the other two during peak usage times.

Kubernetes’s **cluster-autoscaler** isn’t really compatible with many ASGs. We’ll cover how it works later in this post (Scalability/ExpanderPriority), but keep in mind that you shouldn’t have more than 4 ASGs per application group. This is due to the failover mechanism of cluster-autoscaler that doesn’t detect ASGs errors like _InsufficientInstanceCapacity_.


We’ve rolled-back on the ASG number. We now have a maximum of 4 ASGs per application group (see next section: Resiliency/DedicatedASGs), with 2 being Spot and 2 on-demand fallbacks.


### Dedicated ASGs by app

We started to dedicate ASGs for some applications when Prometheus was eating all the memory of a node, ending up in OOM errors. Because Prometheus replays its WAL at startup and consumes a lot of memory doing so, adding a Limit over the memory was of no use. It was OOMKill during the WAL process, restarted, OOMKilled again, etc. . Therefore, we isolated Prometheus on on-demand nodes having a lot of memory so it could use up all of it.

Then, one of our main API experienced a huge load, 60% IDLE CPU to 0%, in a few seconds. Because of the violence of such a peak, active pods started to consume all CPU available on nodes, depriving other pods. Getting rid of CPU Limits is [a recommendation](https://erickhun.com/posts/kubernetes-faster-services-no-cpu-limits/) that comes with drawbacks that we measured and chose to ensure performance. As a result, the entire cluster went down, lacking for available CPU.
We tried to isolate this API on its own nodes, as such peaks can repeat in the future, because it’s uncacheable and userfacing. We added Taint on dedicated nodes and Tolerations on the selected API.
Since that, we had to deploy a dedicated overprovisioning on those nodes as the overprovisioning pods didn’t have this toleration. It turned out we’re also able to adapt the overprovisioning specifically for this API, which wasn’t the base idea, but it has proven to be very effective due to the API’s nature. We talk more about overprovisioning's conf a little later on.

For the record, we’re using back CPU limits, at least for all applications not using dedicated nodes and also because we’ve updated our kernels [to the patched version](https://engineering.indeedblog.com/blog/2019/12/cpu-throttling-regression-fix/). We follow their CPU usage through Prometheus alerting, with:

```yaml
    - labels:
        severity: notice
        cluster_name: "{{ $externalLabels.cluster_name }}"
      annotations:
        alertmessage: '{{ $labels.namespace }}/{{ $labels.pod }}/{{ $labels.container
            }} : {{ printf "%0.0f" $value }}%'
        description: Container using more CPU than expected.
          It will soon be throttled, which has a negative impact on performances.
        summary: "{{ $externalLabels.cluster_name }} - Notice - K8S - Container using 90% CPU Limit"
      alert: Notice - K8S - Container getting close to its CPU Limit
      expr: |
        (
          sum(rate(container_cpu_usage_seconds_total{job="kubelet", container!="POD", container!=""}[1m])) by (container, namespace, pod)
        / sum(kube_pod_container_resource_limits_cpu_cores{job="kube-state-metrics", container!="POD", container!=""}) by (container, namespace, pod)
        ) * 100 > 90
```

We don’t currently have alerting on Throttling, only a Grafana graph using the metric:
{% highlight prometheus %}
sum by (pod) (rate(container_cpu_cfs_throttled_seconds_total{job="kubelet", image!="",container!="POD"}[1m]))
{% endhighlight %}


At the same time, we chose to isolate Prometheus on its own ASGs, as we later did for Victoria Metrics and Grafana Loki.
We’re also isolating “admin” tools, like CoreDNS, cluster-autoscaler, HAProxy Ingress Controller, on dedicated “admin nodes” group. That way, admin tools can’t mess with developers pods and vice versa.

![Nodes separations on groups](/images/posts/2020-12-08-three-years-running-kubernetes/dedicated_admin_nodes.png)
Our developers can only deploy on Worker nodes. An application’s pods can only be scheduled on 4 ASGs, including 2 on-demand backups.

Those admin nodes are on-demand. Having an ASG of few nodes all Spot is a risk we didn’t want to take regarding the criticality of those pods.

TODO: rewrite this: We are rolling back that choice and we are removing those dedicated admin nodes of the mix. We have too many clusters for this solution to be profitable.
CoreDNS, HAProxy Ingress Controller and cluster-autoscaler are going back on the main ASGs.


### QOS Guaranteed Daemonsets

All our Daemonsets have Requests and Limits at the same value.
We’ve found out that a lot of Daemonsets don’t define those values by default.
Enforcing QOS Guaranteed Daemonsets:

* ensures our daemonsets are Requesting all the resources they need, which is also important for the k8s scheduler to be more effective,
* daemonsets bad behaviours can be contained through Limits, and will not mess up with pods,
* it’s a good indicator of the overhead we add on each node and helps us choose our EC2 instance types better (E.g: 2x.large instances are too small),
* it’s a reminder that a server with 16 CPUs has in fact only 80% of them usable by developer pods.


## Scalability

### Cluster Autoscaler

We automatically scale our EC2 Instances, our nodes, with cluster-autoscaler.

![Autoscaling nodes](/images/posts/2020-12-08-three-years-running-kubernetes/overprovisioning-total-node-count.png)

As mentioned before, we have several ASGs per Cluster.
We use the service discovery feature of cluster-autoscaler to find all ASGs to work with and to control them automatically.
This is done in two steps:


1. We add 2 tags on ASGs that the cluster-autoscaler should manage
    a. k8s.io/cluster-autoscaler/enabled: "true"
    b. k8s.io/cluster-autoscaler/{{ $cluster.name }}: "true"
2. Then, inside the Chart, we add those two labels to the node-group-auto-discovery parameter:

```yaml
        command:
        - ./cluster-autoscaler
        - --cloud-provider=aws
        - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/{{ index .Values.nodes .Values.env "clusterName" }}
        …
```

#### Expander Priority

We’re using cluster-autoscaler with the _expander: priority_.
ASGs will be chosen as:

* `spot-nodes-.*`
* `on-demand-.*`

Cluster-autoscaler will randomly add an EC2 instance in an ASG in the first group: _spot-nodes-*_. If a new instance hasn’t joined the cluster after the fallback timeout (`--max-node-provision-time`), it will try another ASG in the same group. He will try all the ASGs in this group before moving on to the next group: _on-demand-*_.
With a dozen ASGs, most of them being Spot, we’ve already waited for 45mns to be actually able to successfully add an EC2 instance.

EC2s are sometimes _InsufficientInstanceCapacity_, especially Spot instances. With the autoscaler recommendation to split ASGs by the same amount of CPU/RAM, there were just too many ASGs to try before falling back on-demand. We’ve reduced the cluster-autoscaler fallback timeout to 5mns and still are facing many scaling problems at Paris, where we lack Spot instances.

![InsufficientInstanceCapacity](/images/posts/2020-12-08-three-years-running-kubernetes/Screenshot-from-2020-10-22-13-33-22.png)

Expander priority is the more resilient way we chose to have automatic fallback from Spot to on-demand when there’s no Spot left.
We have already faced, multiple times, a fallback to on-demand instances, even with a dozen different instance types. _InsufficientInstanceCapacity_ errors are not a myth. Even on-demand instances can be in _InsufficientInstanceCapacity_, which we may never face with expander priority, 10+ Spot instance types, 10+ on-demand instance types and low _--max-node-provision-time_.


### Overprovisioning
We have overprovisioning pods inside the cluster.
The objective is to trigger a node scale-up before a legitimate pod actually needs resources. Doing so, the pod doesn’t wait minutes to be scheduled, but a few seconds.
This works using overprovisioning pods which request resources without doing anything (docker image: k8s.gcr.io/pause). Those pods are also using a low PriorityClass (-10), lower than our apps.

This trick is the whole magic of this overprovisioning: we reserve space until API needs it. When we need it, we free up this space by expelling overprovisioning pods (lower priority) and the expelled pods change their state to "Unschedulable". Pods on "Unschedulable" state force the cluster-autoscaler to add nodes.


We follow the efficiency of this overprovisioning with these Prometheus expressions:

* `kube_deployment_status_replicas_unavailable`: we know which pods are waiting to be scheduled,
* `sum(kube_node_status_condition{condition="Ready",status="false"})`: we know if there are UnReady nodes, like when nodes are scaling-up and new nodes don’t have their daemonsets Ready.

Because we have some nice pikes on our applications, we are using the ladder mode of the overprovisioning. That ensures that we always have a minimum amount of overprovisioning running in the cluster, so we’re able to handle huge loads at any time. Also, we ensure that we don’t waste too much resources when heavily loaded, so we don’t reserve 200 nodes in a cluster of 1000 nodes for example.

The configmap looks like:

```yaml
data:
  ladder: '{"coresToReplicas":[[16,4],[100,10],[200,20]]}'
```

We chose to have big overprovisioning pods, bigger than any other pod in the cluster, to ensure that expelling one of the overprovisioning pods is enough to schedule any Pending pod.


## PriorityClass

We sacrifice some applications when it's crap.

The overprovisioning magic is based on PriorityClass objects.  
We’re using the same logic for our other applications, using PriorityClass.  
We have 3 of them which concern applications:

* low -5
* default 0
* high 5

Critical applications are using the “high” PriorityClass.  
Most applications are using the “default” one, so they don’t even have to explicitly use it.  
Workers doing asynchronous tasks can be cut off for several tens of minutes without any business impact. These are the ones with the “low” PriorityClass we sacrifice when needed.

Here is an example, during a heavy load :
![A lot of unavailable pods](/images/posts/2020-12-08-three-years-running-kubernetes/Screenshot-from-2020-11-17-18-17-24.png)
Hundreds of unavailable pods for 10 minutes.

If we filter out _“low”_ PriorityClass pods in the graph above, there’s only one application having unavailable pods:
![Not so many high priority unavailable pods](/images/posts/2020-12-08-three-years-running-kubernetes/Screenshot-from-2020-11-17-18-18-56.png)
New pods for this application stayed in the Unavailable state for 15 seconds.


### Low HPA targets

Kubernetes takes time to scale-up pods.

Without overprovisioning, we’ve measured that we wait up to 4 minutes when there’s no available node where pods can be scheduled.
Then, with overprovisioning, we mostly wait for 45seconds, between the moment the HorizontalPodAutoscaler changes the Replicas of a Deployment and for those pods to be ready and receive traffic.

We can’t wait so long during our peaks , so we generally define HPA targets at 60%, 70% or 80% of the CPU Request. That gives us time to handle the load while new pods are being scheduled.


On the following graphs, we can see two nice peaks at 20h52 and 21h02:
![two nice peaks](/images/posts/2020-12-08-three-years-running-kubernetes/Screenshot-from-2020-10-08-15-06-25_1.png)
Above, in green, the number of consumed CPUs for one specific application: +55% in one minute.

Below, in blue, new pods are created in response to the peak.
![pods created in response to the peak](/images/posts/2020-12-08-three-years-running-kubernetes/Screenshot-from-2020-10-08-15-06-38_1.png)

This is obviously not a good way of managing resources, as we waste them as soon as the load balances.
![](/images/posts/2020-12-08-three-years-running-kubernetes/Screenshot-from-2020-10-08-15-57-43.png)


This waste effect is amplified with the load: the more pods we have, the more we waste.

We don’t have a viable solution to solve this.  

We’re thinking about reducing scale-up duration, so we won’t need those spare resources while adding new pods. This is a challenge as the scaling mechanism is composed of several tools and changing only one of them can have catastrophic behavior on the cluster stability. This huge subject will need its own dedicated blogpost...


### Long downscale durations

Recently, we have increased the downscale durations from 5 to 30minutes.  

It’s done through Kops spec:
```yaml
  kubeControllerManager:
    horizontalPodAutoscalerDownscaleStabilization: 30m0s
```

When an application fails, its traffic decreases. When front A fails, traffic on backend B decreases too. When front A comes back, both A and B will have a big peak load.

The default five minutes delay for scaling down pods is too short for us. Increasing this delay makes the return to life of front A transparent on the number of pods of the whole platform, at least for the first 30 minutes of shutdown.

We’ve seen blog posts where people turn off autoscaling for those very situations.
Failure is not an extreme case. Failure is expected. Autoscaling strategies must adapt to it.

You can see that one waits 30 minutes after an upscale, before downscaling:
![30mns of stabilization after a scale-up](/images/posts/2020-12-08-three-years-running-kubernetes/Screenshot-from-2020-12-04-15-32-46-2.png)

[Documentation](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-cooldown-delay) specifies that: “this duration specifies how long the autoscaler has to wait before another downscale operation can be performed after the current one has completed.”

We can observe on the graph above that it’s rather : “this duration specifies how long the autoscaler has to wait to perform a downscale after the last upscale”.













