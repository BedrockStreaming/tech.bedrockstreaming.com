---
layout: post
title: "Handling dependencies failures in an API gateway"
description: "How are we handling downtime from the API we are calling, and what can we do about it?"
author: v_claras
tags: [backend, php, api, api-gateway, back-for-front, resiliency]
comments: true
color: rgb(255,128,0)
language: en
---

Welcome to our second article about the backend architecture and its api gateway.
In [the first part](/2022/06/10/backend-bff-intro.html), we talked about the BFF and all services it depends on.
Today we're going to take a look at what to do when one of them (or many), fails to respond.

## Service dependencies

As seen previously, the BFF uses multiple data sources and services to create a full layout.

Those services are used to gather the contents to be displayed in the application:
* getting user personalisation data;
* advertising and analytics configuration;
* asking if the user has some authorizations.

If we don't want our BFF to become one giant SPOF [(1)](#notes), we need to be resilient to the death [(2)](#notes) of those dependencies, any of them, at any time!
You must keep in mind that **our top priority is to always be able to answer something readable** to the frontend applications.

## DDD

First thing first, we are using a DDD [(3)](#notes) approach for our modeling.
This means that we focus on the business, as described by our Product Owner. We try not to worry about the various implementation of our backend's friends and their different services.

A picture is always easier to understand.

![asking for a layout to the domain means asking a interface for](/tech.bedrockstreaming.com/public/images/posts/2022-08-12-backend-fallbacks/ddd-page-min.png)

Above, we can see that when a user ask for a layout A, we are looking to resolve who is `A`.
From the domain point of view, the page collection is only an interface. 

In the picture below, we see the "Page collection implem (Infra)".
It's a layer implementing the interface defined in the domain. It uses multiple clients that call the services behind.
It's its responsibility to chose which service to look on for the page.

![page collection implementation chose the correct data source](/tech.bedrockstreaming.com/public/images/posts/2022-08-12-backend-fallbacks/ddd-page-full.png)

DDD is a too large subjects to be perfectly defined in this article. If you want to dig deeper into it, there are multiple great reads, feel free to check them out!
Now, how does this help us?

## Handling failures

Failures handling is done by the middle layer seen in the previous example.
Its goal is to catch error [(4)](#notes), and convert them to something expected and defined by the interface.

That said, its responsibility is not to know what the expected answer is. To do that, we use the domain.

Let's see with a small code sample.

_Note: The following example is not a real use-case, but it's representative and simple enough to illustrate how it works._

In the code below, we see a class that represents the subscribing status of a user, which has two properties:
* `hasAccess` controls whether the user can read protected contents;
* `isSubscribed` is used in analytics, and to show subscription pages.

```php
<?php
final class SubscribeStatus
{
    private function __construct(
        public readonly bool $hasAccess,
        public readonly bool $isSubscribed,
    ) {
    }

    public static function createAnonymous(): self
    {
        return new self(false, false);
    }

    public static function createSubscribed(): self
    {
        return new self(true, true);
    }
}
```

To create such an object, we use either one of the two static functions, depending on the status we get from the subscriptions API.
This is done in the middle layer, but the business is kept in the domain.


To handle the failure, we add a new named constructor, dedicated to this specific case.

```
    public static function createUnknown(): self
    {
        return new self(true, false);
    }
```

When an error happens and we can't retrieve the user subscription status, we now have a fallback option.
With this fallback option, the user will:
* be able to access any content, it's better to let an anonymous user access a content it should not, that blocking a paying customer;
* still be reported as not subscribed and will see all available offers.


Most of the time, the answer is even simpler than this one.

Another example would be user's viewing statuses. If we can't retrieve them, we don't display any progress bar.
Users won't be able to tell if they have seen a content, but they will still be able to navigate the application.

## Infrastructure solution, the stale cache

In some cases, the above solution doesn't work.
For example, contents information cannot be replaced by default values. If we don't know about a video or a program, we cannot guess what it is.

Luckily, we can rely on the stale cache.
Stale cache is an old cache entry which is expired. When the cache finds such entry, it usually ignores it and asks for a new version of the response.
In case of failure, we can use the available staled version.

![following first example, when the http fails to answer, we use the stale cached response](/tech.bedrockstreaming.com/public/images/posts/2022-08-12-backend-fallbacks/stale-cache-usage.png)

_The limitation is that a response must have been cached at least once, in order to have a staled version._

When there is no stale cache, we don't display the content [(5)](#notes).

So far, we are only using it with http implementation:
* called API must answers with `stale-if-error` cache directive, it allows for the response to be used while stale when an error happens;
* called API can answer with `stale-while-revalidate` cache directive, for better performances;
* calling API can query with `max-stale` cache directive, to use stale response see [the mdn for more on those headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#cache_directives);
* on the client side, we are using the [`Kevinrob/guzzle-cache-middleware`](https://github.com/Kevinrob/guzzle-cache-middleware) to do the job.

For an entry cached for up to 10 minutes (answered with `max-age`), we allow up to 4 hours of stale cache (with `stale-if-error`).
Since we are using a shared cache, we are using `max-stale` when querying, with a random value up to 1 hour.
This makes most requests use the last stale response while one of them ask for a fresher response.
Those values are chosen according to our platform usages where peak visitor last for about 2 to 3 hours at night.

We plan to expand its usage to other kinds of cached entries, such as manually saved data, and database queries.

## Conclusion

In today's post, we have seen how we handle the loss of our dependencies by anticipating their potential failures and preparing default acceptable behaviours. 

Next time, we will see how we can spare some traffic on those dependencies when they're struggling with traffic.


## Notes
1. SPOF, as [single point of failure](https://en.wikipedia.org/wiki/Single_point_of_failure) since all frontend applications have to rely on the BFF, I cannot resist linking this excellent [xkcd](https://xkcd.com/2347/).
2. By "death", we mean anything unexpected. It can be a 500 error code, a timeout, a wrong content. We will talk a bit more about this in the next article.
3. DDD, as domain driven design, you can read more about it on [Martin FOWLER's website](https://martinfowler.com/bliki/DomainDrivenDesign.html).
4. Throwing errors is still allowed, but restricted to domain exceptions, and must be specified in the method's declaration in the interface (i.e. via a comment).
5. There will be a dedicated article on partial rendering.


## From the same series

1. [What's a BFF](/2022/06/10/backend-bff-intro.html)
2. [Handling API failures in a gateway](/2022/08/12/backend-fallbacks.html)
3. [What's an error, and handling connection to multiple APIs](/2022/08/25/backend-errors-connections.html)
4. [Using a circuit breaker](/2022/09/02/backend-circuit-breaker.html)

---
In the meantime, feel free to have a look at other articles available on this blog:

- 🇺🇸 [Encrypt AWS AMIs: one way to do it wrong](/2022/07/08/encrypt-aws-amis.html)
- 🇫🇷 [Bedrock à la kubecon 2022 (4 articles)](/2022/06/13/kubecon-2022-part-1.html)
