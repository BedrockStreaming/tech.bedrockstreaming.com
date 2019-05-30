---
layout: post
title: "React europe 2019"
description: "Nos retours sur le PHP DAY 2019 à LYON"
author:
  name: Florent Dubost, Nicolas Afresne, Antoine Caron
  avatar:
  email:
  twitter:
  facebook:
  github:
category:
tags: [React, JS, 6play, Conference, 2019]
image:
  feature: 
  credit: 
  creditlink: 
comments: true
language: en
---

WIP :construction:

# Intro - Flo

# Keynote - Flo

# Animation /React spring - Nico & Antoine

# Test - Flo

# GraphQL

One of the main themes of the conference was also `GraphQL`. 
This data exchange paradigm now seems to have its place among many users.
For more than a year now, we have been using `GraphQL` on our BackOffice and we are already seeing a lot of benefits.

- A Front/Back exchange contract materialized in a schema
- Easy consumption thanks to queries
- Cache management provided by Apollo (also providing a collection of great tools for `GraphQL`)

[Kenny already talked about it in 2015](https://tech.m6web.fr/immutablejs-relay-graphql-react-native/) but now we use it for 6play.

# Workflow - Nico

# a11y

Several very inspiring talks on accessibility seem to show that this issue finally appears to be considered by web actors. In particular Facebook, which has distinguished itself by showing its assistant to detect accessibility errors in the development of its new version. However, it is regrettable that this toolkit is not accessible to the community because it could be a great help to avoid putting people with disabilities on our platforms.

It is clear that 6play is not yet very accessible but we are working to correct this error, especially on the new screens we have been integrating for several months. 

# Yarn 2

We were waiting for it at M6, the new `yarn` release named `berry` offers almost everything we were missing in our favorite package manager.
Indeed, by using `yarn` in _monorepo_ mode for the 6play project, we were confronted with several problems that had to be overcome with in-house tools.Example here with our[monorepo-dependencies-check] tool (https://github.com/M6Web/monorepo-dependencies-check) which is now becoming obsolete thanks to `Constraints`.

We are also delighted with the functionality of Zero install. But what we expected most was about the _workspaces_. We will finally have a management of the publication of these.

Take a look at [this repository](https://github.com/yarnpkg/berry) for more information.

# Next.js & Code Sandbox

Even if these two tools are not used for the development of our applications, the new features of NextJS and Code Sandbox are clearly very interesting. 

As for Next.js, the 6play project has its own configuration of `server side rendering` (Florent explains it in ['Last night isomorphic JS saved our life!'] (https://tech.m6web.fr/spa-mode-isomorphism-js/)). However, NextJS is a great project that we use for many of our side projects. AMP support, client-only pages and API endpoints are clearly welcome.

As for Code Sandbox, Ives van Hoorne told us his personal story and that of his project. In addition to the great tool that is CodeSandbox, we have seen that the use of WebAssembly seems to have solved a lot of performance and implementation problems. For example, he cites the coloring of the code based on _TextMate_ only available in C could not have been ported to the browser without going through WebAssembly.
