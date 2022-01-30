---
layout: post
title: "How AWS Cloudfront is helping us deliver our Web streaming platform ? - Part 1"
description: "What is a CDN, how is it useful for us? Feedback on the use of the AWS Cloudfront service for the deployment of high traffic web applications. Configuration example, best practices."
author:
    name: Antoine Caron
avatar:
email:
twitter: Slashgear_
github: Slashgear
category:
tags: [cloudfront, aws, cdn, node.js, react, javascript, frontend]
comments: true
image:
  feature: posts/2022-01-03-cloudfront-web-streaming-platform/hero.jpeg
language: en
---

- [Part 1 - What is a CDN, how is it useful for us?](/)
- [Part 2 - How do we use a CDN to improve our service? Some examples and patterns (in construction 🚧)](#)

## A bit of context

The web is a major platform for the distribution of our customers' content at Bedrock.
Millions of users connect every year to watch their live, replay or directly the series and movies of their choice.
The broadcasting of sports events such as the Euro 2020 soccer tournament represents a real technical challenge when it comes to maintaining the stability and performance of such a platform.

The web application works today in SSR (Server Side Rendering) mode.
This means that in production today we have NodeJS Express servers running in production to return pre-rendered HTML pages on the server side.
We made [this choice several years ago](https://tech.bedrockstreaming.com/spa-mode-isomorphism-js/), for two reasons: SEO and to improve the first display time on slow devices.
In addition to the HTML pages, the web platform is also a huge collection of assets that allow the website to function: Javascript bundles, CSS, images, manifests.

![Schema of our cloudfront origin architecture simplified](/images/posts/2022-01-31-cloudfront-web-streaming-platform/web-archi.png)

Today our customers have users distributed over a large part of the globe.

**To answer these problems, the use of a CDN seemed necessary to us.**

## What is a CDN then ?

CDN for Content Delevery Network is a service allowing the delivery of content to users across the internet (here our HTML pages and assets).
Wherever the user is in the world.
To all users, even if they are very numerous.

Cloudfront is the CDN service of AWS.
By making available a large number of Pops around the world, it allows us to provide a response to a user as close as possible to their location.
This allows us to significantly reduce the time to first byte of our responses.
Different [price classes](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html) allow you to choose the global "zone" in which your application should be available in order to achieve savings.

![Worldmap of AWS cloudfront edges](/images/posts/2022-01-31-cloudfront-web-streaming-platform/edges.png)

Being in Lyon, we sometimes get answers from the Pop de Milan.
Indeed, Milan is relatively much closer than Paris.

Note that it is very easy to know which cloudfront pop answered you (default setting).
Each pop is identified by a three letter code that corresponds to the code of the nearest international airport (here: CDG corresponds to Paris Charles de Gaulle airport).

```
x-amz-cf-pop: CDG50-C1
```

Delivering content as close to the user as possible is great, it theoretically reduces waiting time but it does not solve the problem of heavy load.

The best solution for load problems is the cache.

> You put 1 second of cache-control, and you already won!
>
> [Y. Verry, our Head of Infrastructure and Ops](https://twitter.com/yverry)


Cloudfront service makes it easy to cache responses at the server edge.
If we take the example of sports broadcasting, users arrive in large numbers in a very short period of time.
Caching (telling Cloudfront to cache a web page) takes a lot of the load off our node servers because they are not called.

Caching objects in Cloudfront is also about improving response times.
No need to wait for our servers, the user receives the cached object directly.
Cloudfront even takes advantage of this to apply more powerful compression algorithms like Brotli on these cached objects.
These compressions, performed directly by the CDN, allow you to drastically reduce the size of your objects on the network.

Cloudfront also allows you to do "Edge computing": run code directly in Amazon edges and pops instead of doing it in our applications.
Lambda at edge (on regional edges servers), Cloudfront function (function that runs on pop servers)), Web Application Firewall, here are some very cool features that will allow you to do usual manipulations on your requests/responses.

Finally, by using regional Edge, hundreds of end server edges do not contact your origin (your application) when the cache is invalidated or exceeded.
You can even activate the [Origin Shield](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html) feature that allows you to further limit the load on your origins.

![regional edge usage with Cloudfront](/images/posts/2022-01-31-cloudfront-web-streaming-platform/regional.png)

Good per-level cache management even allowed us to completely invalidate the cache of a Cloudfront distribution a few minutes before the start of an event without generating huge traffic on our servers.

---

And that's it for this first article, in the next part (and normally the last one) you will be able to find some patterns and examples of how to use Cloudfront to distribute a high traffic web site.

In the meantime, feel free to have a look at other articles available on this blog:

- [More efficient Load Balancing and Caching at AWS, using Consistent Hashing and HAProxy](https://tech.bedrockstreaming.com/hsdo/)
- [Scaling Bedrock video delivery to 50 million users](https://tech.bedrockstreaming.com/scaling-bedrock-video-delivery-to-50-million-users/)