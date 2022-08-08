---
layout: post
title: "BFF's error definition, and handling connexions to multiple API"
description: "What is an error, a failing API? How is the BFF handling connexions to multiple API?"
author: v_claras
tags: [backend, php, api, api-gateway, back-for-front, error, guzzle]
comments: true
color: rgb(255,128,0)
language: en
---

A ~quick~ sidetrack in [our series](#From the same series) about Bedrock's API gateway.
This piece define what are we talking about when we say: an error, and explains how we handle the multiples connexions to the services we are calling.

## Definition

In [the previous article](/2022/08/12/backend-fallbacks), we've seen how we handle errors.
This was mainly from a business point of view, and how it's done in our domain.

*But what is "an error"?*

This term is a bit generic, and the definition will be too: *an error, is anything unexpected by the application*.

In our context of an API Gateway, we are restricting this to the services we are calling.

This can be, but not exhaustively, a service not responding because:
* it's offline;
* it's taking too much time to answer;
* it's responding with a 5** error (when talking about an API);
* it's giving us an unexpected content.

## What are the consequences of those errors?

The first issue, is that we won't be able to display some part of the application as intended.
We've talked about this previously already.

The second, more insidious error, is that it can slow down terribly our BFF.

The BFF response time is, in average, equals to the slowest service we are calling.
If a service, usually responding in 200ms, starts slowing down to an average response time of 1s, while timing out half the time, it will increase the BFF response time to 1,5s (1s average, and 50% retry).

That's why we must be careful when configuring those timeout.
It's better to lose some responses, than risking slowing the BFF to a point where frontend won't get any response.

## How are we mitigating the errors?

For any remote service, we make sure to use short timeout, and retry when we can.
The values are tailored according to our usages.
We use our monitoring to adapt those values in order to reduce the number of errors, while minimizing the impact on the BFF response time. 

```yaml
    app.http_client_configs.best_effort:
        retry: 1
        timeout: 0.6
        connect_timeout: 0.1
    app.http_client_configs.fast_fail:
        retry: 0
        timeout: 0.6
        connect_timeout: 0.1
    app.http_client_configs.long_fail:
        retry: 0
        timeout: 1
        connect_timeout: 0.1
    app.http_client_configs.reliant:
        retry: 2
        timeout: 60
        connect_timeout: 0.1
```
Above, you can see the yaml configuration used inside our Symfony application. It's used to build the Guzzle clients.

Each configuration can cascade onto the clients, making variants available for our Symfony services.

Below lies a Symfony configuration example:
* We have an interface `BFF\Domain\Content\Repository` from the domain for a content repository.
* The interface is linked to an implementation `BFF\Infra\HttpContentClient` inside the infrastructure.
* The implementation is built with variants (`best_effort` and `fast_fail`) from a factory using the matching Guzzle configurations.
* Other services use a chosen repository *according to their needs and criticality*.

```yaml
    # Service definition with its aliases.
    BFF\Domain\Content\Repository: '@BFF\Domain\Content\Repository.fast_fail'
    BFF\Domain\Content\Repository.best_effort: '@BFF\Infra\HttpContentClient.best_effort'
    BFF\Domain\Content\Repository.fast_fail: '@BFF\Infra\HttpContentClient.fast_fail'

    # Concrete implementations
    BFF\Infra\HttpContentClient.best_effort:
        class: 'BFF\Infra\HttpContentClient'
        factory: ['@BFF\Infra\ContentClientFactory', 'create']
        bind:
            $clientConfig: '%app.http_client_configs.best_effort%'
    BFF\Infra\HttpContentClient.fast_fail:
        class: 'BFF\Infra\HttpContentClient'
        factory: ['@BFF\Infra\ContentClientFactory', 'create']
        bind:
            $clientConfig: '%app.http_client_configs.fast_fail%'

    # Other services using the Repository
    BFF\Domain\Navigation\NavBarResolver:
        $content: '@BFF\Domain\Content\Repository.best_effort'

    BFF\Domain\Layout\BlockResolver:
        $content: '@BFF\Domain\Content\Repository.fast_fail'
```

_This is an over simplified example as we have more layers and wrappers used for things like caching, monitoring, logging, etc._

## Conclusion

In this article, we've clarified what an error is, and explained that we cannot generalize the configuration and usage of our APIs.

This was a deviation on the road to our next article, where we will talk about monitoring the errors and stopping calls to failing APIs.

## From the same series

1. [What's a BFF](/2022/06/10/backend-bff-intro)
2. [Handling API failures in a gateway](/2022/08/12/backend-fallbacks)
3. [What's an error, and handling connexion to multiple APIs](/2022/08/25/backend-errors-connexions)
