---
layout: ../../layouts/post.astro
title: "How AWS Cloudfront is helping us deliver our Web streaming platform? - Part 1"
description: "What is a CDN, how is it useful for us? Feedback on the use of the AWS Cloudfront service for the deployment of high traffic web applications. Configuration example, best practices."
author: a_caron
tags: [cloudfront, aws, cdn, node.js, react, javascript, frontend]
comments: true
color: rgb(255,99,71)
language: en
---

## A bit of context

The web is a major platform for the distribution of our customers' content at [Bedrock](https://www.bedrockstreaming.com/).
Millions of users connect every month to watch their live, replay or the series and movies of their choice.
The broadcasting of sports events such as the Euro 2020 soccer tournament represents a real technical challenge when it comes to maintaining the stability and performance of such a platform.

The web application works in SSR (Server Side Rendering) mode: we have NodeJS Express servers returning pre-rendered HTML pages.
We made [this choice several years ago](/2017/05/17/spa-mode-isomorphism-js), for two reasons: SEO and to improve the first display time on slow devices.
In addition to the HTML pages, the web platform is also a huge collection of assets that allow the website to function: Javascript bundles, CSS, images, manifests.

Today our customers have users distributed over a large part of the globe.

**To meet these challenges, a CDN is a very good solution.**

## What is a CDN then ?

CDN for Content Delivery Network is a service delivering content to users across the internet (here our HTML pages and assets).
Wherever the user is in the world.
To all users, even if they are many.

Cloudfront is the CDN service of AWS.
With a large number of POPs (Point Of Presence) around the world, it helps us provide a response to each user as close as possible to their location.
This allows us to significantly reduce the time to first byte of our responses.
Different [price classes](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html) allow you to choose the global "area" in which your application should be available in order to achieve savings.

![Worldmap of AWS cloudfront edges from Cloudfront official documentation](../../../../images/posts/cloudfront-web-streaming-platform/edges.png)

Being in Lyon (France), we sometimes get answers from the POP of Milan (Italia).
Indeed, Lyon ↔ Milan is almost as closer as Lyon ↔ Paris.

Note that it is very easy to know which Cloudfront POP answered you.
Each POP is identified by a three letter code that corresponds to the code of the nearest international airport (here: CDG corresponds to Paris Charles de Gaulle airport).

```
x-amz-cf-pop: CDG50-C1
```

Delivering content as close to the user as possible is great, it theoretically reduces waiting time but it does not solve the problem of heavy load.

The best solution for load problems is caching.

> You put 1 second of cache-control, and you already won!
>
> [Y. Verry, our Head of Infrastructure and Ops](https://twitter.com/yverry)


Cloudfront service makes it easy to cache responses at the edge servers.
If we take the example of sports broadcasting, users arrive in large numbers in a very short period of time.
Caching (telling Cloudfront to cache a web page) takes a lot of the load off our Node servers because they are not called.

Caching objects in Cloudfront is also about improving response times.
No need to wait for our servers, the user receives the cached object directly.
Cloudfront even takes advantage of this to apply more powerful compression algorithms like Brotli on these cached objects.
These compressions, performed directly by the CDN, allow you to drastically reduce the size of your objects on the network.
Reducing objects size make our applications load even faster for our users.

**Here is our _Cache hit ratio_ in production on 6play.fr website.**

![cache hit ratio graph showing that we have 99.10% of cache hit rate for our main website](../../../../images/posts/cloudfront-web-streaming-platform/cache-hit-ratio.png)

Cloudfront also allows us to do "Edge computing": run code directly in Amazon edges and POPs instead of doing it in our applications.

Lambda at edge (on regional edges servers), Cloudfront function (function that runs on POP servers), Web Application Firewall, here are some very cool features that will allow you to do usual manipulations on your requests/responses.

Finally, by using regional Pop, hundreds of end server edges do not contact your origin (your application) when the cache is invalidated or exceeded.
You can even activate the [Origin Shield](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html) feature that allows you to further limit the load on your origins.

[![regional edge usage with Cloudfront](../../../../images/posts/cloudfront-web-streaming-platform/regional.png)](../../../../images/posts/cloudfront-web-streaming-platform/regional.png)

Good per-level cache management even allowed us to completely invalidate the cache of a Cloudfront distribution a few minutes before the start of an event without generating huge traffic on our servers.

---

And that's it for this first article, in the next part (and normally the last one) you will discover how we have implemented some patterns on our sites.

In the meantime, feel free to have a look at other articles available on this blog:

- [More efficient Load Balancing and Caching at AWS, using Consistent Hashing and HAProxy](/2021/11/18/hsdo)
- [Scaling Bedrock video delivery to 50 million users](/2021/12/15/scaling-bedrock-video-delivery-to-50-million-users)
