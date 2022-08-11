---
layout: post
title: "Using a circuit breaker to spare the API we are calling"
description: "What is a circuit-breaker, and how are we using it?"
author: v_claras
tags: [backend, php, api, api-gateway, back-for-front, resiliency, circuit-breaker]
comments: true
color: rgb(255,128,0)
language: en
---

Hi! We're going to start our [fourth article](#From the same series) about Bedrock's API gateway.
Today we will talk about the circuit breaker pattern, what it is, and how we're using it.

## The Circuit Breaker Pattern

In a single sentence, this pattern allows for detection of errors when calling our dependencies, and stop doing so if a given threshold of errors is crossed.

The circuit breaker allows us to spare the dependencies in difficulty, but also avoid taking time to do something that will most likely fail.

You'll find a more detailed explanation about the circuit breaker on Martin FOWLER's [blog](https://martinfowler.com/bliki/CircuitBreaker.html).

## Where to use it?

As soon as a service call is not mandatory for our BFF to answer something that a frontend application can read, then we can use the circuit breaker pattern.

If an API cannot handle a sudden increase in traffic, by scaling too slowly for example, or if a database starts to throttle, it's better to stop calling it temporarily.
An API throttling will result in an error with correct timeout configured, as seen [in the previous article](/2022/08/25/backend-errors-connexions)

Here some examples:

*Video progress information*

Displaying a video progress bar is useful for our end user, but it's better to not display the information, than risking the full page to not be displayed.
If the service that store video viewing sessions is (slowing) down, we can stop asking for this information and stop displaying the video progress bar.

![a video with a progress bar](/images/posts/2022-09-02-backend-circuit-breaker/progress-bar.png)

*User geolocation*

The geolocation service allows us to know where the end user is in the world. Based on this information we lock some area restricted contents.
If this service goes down for some reason, we will stop calling it, and instead use a default area matching the area of our customer as it's the majority case.

## Implementation and configuration

So far we're only using the circuit breaker pattern with HTTP calls.
This is made possible thanks to the [Ganesha library](https://github.com/ackintosh/ganesha), and it's Guzzle middleware.

The Guzzle middleware is created as a service within the Symfony service definitions.
It's then injected into our `HttpClientFactory` that will handle the creation of all the different clients.
The responsibility of using the circuit breaker falls on each service that will create a http client.

```
Ackintosh\Ganesha\GuzzleMiddleware:
    factory: ['@...Infrastructure\HttpClient\CircuitBreaker\CircuitBreakerMiddlewareFactory', 'buildWithRateStrategy']
    arguments:
        $timeWindow: 60
        $failureRateThreshold: 40
        $minimumRequests: 10
        $intervalToHalfOpen: 60
```

## Monitoring the circuit breaker

At Bedrock, we're used to monitor everything. The circuit breaker makes no exception to this rule.
Usually we store time spent and response code for every outgoing http call.
To see when the circuit breaker is open, we catch the ganesha's `RejectedException` to save a dedicated `666` http status.

This allows us to look for the exact number of calls avoided.
Below lies an example of a monitoring chart showing some errors happening during a usual night.

![monitoring excluding less reliable services](/images/posts/2022-09-02-backend-circuit-breaker/monitoring-1.png)

We also have to query slower services that often trigger our circuit breaker because they cannot answer in the short timeout we impose.
Thereafter, the same monitoring chart including such services.

![monitoring including less reliable service](/images/posts/2022-09-02-backend-circuit-breaker/monitoring-2.png)


## Going further

So far, we have identified two areas for improvement described below.

### Different configurations

We're only using a single configuration for the circuit breaker.
We should allow each service to choose from a named list of configurations when creating a client, [similarly to the different guzzle configuration we are using](/2022/08/25/backend-errors-connexions).
The main obstacle is a lack of hindsight which prevent us to have fine-tuned values.
This is something that will definitively be improved over time as we monitor over long period.

### Staled cache when the circuit breaker is open

For many editorial contents, we're using a staled cache version of the data as a fallback.
To do so, we're using [another guzzle middleware](https://github.com/Kevinrob/guzzle-cache-middleware).

Sadly, the two middlewares don't work together. We have to chose which one to use based on the criticality of the content and the API behind. 
This is something that we aim at solving with a bit of R&D.

## Conclusion

In today's post we've seen our usage of the circuit breaker pattern.
It allows us to spare the services we are calling, and avoid slowing us down in case of throttling.

Next time, we will talk about our ultimate layer of protection to ensure the BFF always responds something readable to frontend applications.


## From the same series

1. [What's a BFF](/2022/06/10/backend-bff)
2. [Handling API failures in a gateway](/2022/06/12/backend-fallbacks)
3. [What's an error, and handling connexion to multiple APIs](/2022/08/25/backend-errors-connexions)
4. [Using a circuit breaker](/2022/09/02/backend-circuit-breaker)
