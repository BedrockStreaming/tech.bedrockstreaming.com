---
layout: post
title: "Last night isomorphic JS saved our life!"
description: "How we use isomorphism to ensure a high availability of our app."
author:
  name:  Florent DUBOST
  avatar: florent.jpg
  email:
  twitter:  fooragnak
  facebook:
  github:
category:
tags: [SPA, SSR, isomorphic, javascript, node.js, high availability]
image:
  feature: posts/spamode/spamode.jpg
  credit: TREES-asso
  creditlink: https://www.flickr.com/photos/trees-asso/30942363902/
comments: true
language: en
---

Since more a year and a half, we use [Node.js](https://nodejs.org/en/) and [React](https://facebook.github.io/react/) together to make the best app as possible for our users. This 2 technologies are complementary to write one time only the code that is executed on the server and the client: that’s the isomorphic way! This approach helped us to develop a reliable app with [a fast first render and SEO friendly](/isomorphic-single-page-app-parfaite-react-flux/).

## SSR caching

Here is the architecture we use for the 6play web app.

![6play server architecture](/images/posts/spamode/archi.png)

You can see that Node.js server response is cached with [Varnish](https://varnish-cache.org/). Indeed, React is not efficient for server side rendering because it has just not been designed for that. The React `renderToString` method blocks the event loop. Consequently the server can not process an acceptable responses rate for a service like 6play that can reach a lot of requests per second. Particularly when the European Football Championship final bring together France and Portugal and is live or when the last episode of « Les Marseillais », one of the teenagers favorite programs, has just been released on the platform. So caching server responses, with a quite low caching time, is required for our application life!

## SPA mode

Isomorphism enable search engines to parse our website without executing any line of JavaScript, only using the server side rendering. We have thought that the opposite could be useful too. Imagine our Node servers are down, for various reasons, our Varnish servers continue to deliver the application pages but only for the cache time. After, the user get an error… or not!

In this case, we switch to a [Nginx](https://nginx.org/en/) server that simply delivers a blank page with the client JavaScript code and the user browser renders the page: our application become a simple SPA. And this is almost imperceptible for the user, the first render is just a little longer. This way secures the availability of our service.

![SPA mode](/images/posts/spamode/fallback.png)

The Varnish servers check the status of the Node ones via a specific route, and when all instances are down, they route all requests to a static HTML file on the Nginx server.

## Really useful ?

Yes! It is not used until it is! Some months ago we went through a memory leak. Consequences? After some time, we saw an increase in CPU usage, then the servers fell down and SPA mode were enabled. We didn’t noticed the memory leak immediately because we often deploy new versions of our app and it resets the memory. When we detected the problem, it was too late to rollback because the incriminated version was probably some weeks or months old.

You certainly know how difficult it is to find the code responsible for a memory leak in Node.js. It is often not a matter of hours but of days or weeks. With our SPA mode, we could debug our code with serenity. When the Node servers were down, the SPA mode took the reins and we simply restart the server to restore the nominal state when we were alerted (sometimes immediately, sometimes several hours after because it happened in the night). This situation went on some weeks. And we finally fixed the memory leak. No user has been affected and we have seen no effect on SEO. For us, this SPA mode is a significant safety for the high availability of our app.