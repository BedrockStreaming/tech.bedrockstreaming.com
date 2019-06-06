---
layout: post
title: "React Europe 2019"
description: "Our feedbacks about the European React Conference 2019"
author:
  name: Florent Dubost, Nicolas Afresne, Antoine Caron
  avatar: front.png
category:
tags: [React, JS, 6play, Conference, 2019]
image:
  feature: posts/react-europe-2019/brendan-church-182747-unsplash.jpg
  credit: Brendan Church
  creditlink: 
comments: true
language: en
---

The M6 Distribution's (M6 Web's new name!) front team haven't posted since a long time. We took part as listeners of the 5th European React Conference in Paris on May 24th and 25th. It's an opportunity to talk about what are the last moves in the React community and at M6.

As usual, we were waiting a lot of announcements in this conference and a lot of new tools or new library. There has been no big declaration, no surprise. But many subjects have been interesting and several talks had confirmed the way we have taken over the last few years. 

## Hooks, more hooks and suspense

During the keynote, Jared Palmer put the emphasis on _[hooks](https://reactjs.org/docs/hooks-overview.html)_ through an example to simplify the use of GraphQL queries. At M6 Distribution, **we use hooks since the beginning of the year and many are in production**. That has changed the way we write component. We already used functionnal components before, but using hooks simplify the readability and the evolutivity of old class component. The bad point is testing... Because we use Enzyme, testing hooks is painful for now. Until Enzyme fully supports hooks, we have implemented custom mocks.

Jared Palmer also showed us the interest of React Suspense to manage a main loading state in an app instead of many spinners that not offer a good user experience. We can't use Suspense for our app because of the [SSR](https://tech.m6web.fr/spa-mode-isomorphism-js/). As it is [recommended by the React team](https://reactjs.org/docs/code-splitting.html#reactlazy), we use [Loadable Components](https://github.com/smooth-code/loadable-components) instead. Jared  announced that a new asynchronous server renderer is in progress and could be released in 2019 supporting Suspense. Suspense will also include [data fetching](https://reactjs.org/blog/2018/11/27/react-16-roadmap.html#react-16x-mid-2019-the-one-with-suspense-for-data-fetching).

Others features or refactoring will come in the future, but there is very limited information:
- [React Fire](https://github.com/facebook/react/issues/13525)
- React Fusion (?)
- [React Native Fabric](https://github.com/react-native-community/discussions-and-proposals/issues/4)
- [React Flare](https://github.com/facebook/react/issues/15257)

## Animation /React spring - Nico & Antoine

## Make tests but make good tests

[Lisa Gagarina](https://twitter.com/lisa_gagarina) gave us some tips to better testing the code. If we have been using ESLint and Prettier for a long time in our JS projects, we have chosen not to implement static typing for the moment. Indeed, we think that it is a huge step, it has a big impact on the code and it can make the onboarding of new developpers more complex. For now, we just use the React proptypes well.

Lisa also advices to **better use Jest snapshots**. They are often too many, too big, not clear, hard to review. And we have experienced it too. A best pratice can be to reduce snapshots size and inline it in the test file. The readability of a test is indeed very important and it is not recommended to refer to other files than the test file (this is valid for snapshots but also for fixtures). There are some ESLint rules to ensure this: jest/no-large-snapshots, jest/prefer-inline-snapshots. [`snapshot-diff`](https://github.com/jest-community/snapshot-diff) can also help by making a diff between the nominal case and the tested case of a component rendering.

A difficult thing is to **keep test agnostic to implementation details**. We should consider the code as a black-box and only test the user interaction of the components, otherwise any refactoring of code will be painful and discourage developers from writing tests.

E2E tests are also complex to setup, write and debug but are **absolutely necessary**. For the back office app, unlike our front app where [we use a custom stack](https://tech.m6web.fr/tests-fonctionnels-app-js/), we choose [Cypress](https://www.cypress.io/) a complete E2E framework that has saved us a lot of time.

Lisa concluded her very interesting lightning talk by saying that there is no such thing as a one-size-fits-all approach, the way of testing has to be adapted to the team and the project. For example on our 6play project, we have more than 3000 unit tests performed by Jest in less than 4 minutes and 450 E2E scenarios that save your life every day!

## Finally a little GraphQL in our projects

One of the main themes of the conference was also `GraphQL`. 
This data exchange paradigm now seems to have its place among many users.
For more than a year now, we have been using `GraphQL` on our back office and we are already seeing a lot of benefits:

- a front/back exchange contract materialized in a schema,
- easy consumption thanks to queries,
- cache management provided by Apollo (also providing a collection of great tools for `GraphQL`).

[Kenny already talked about it in 2015](https://tech.m6web.fr/immutablejs-relay-graphql-react-native/) but now we use it!

## Workflow

One of the most interesting conferences in my opinion was about the need to optimize the development workflow. This is an element that is too often ignored but is very important in the life of a project.  Paul Amstrong presents us here an analysis of the workflow of his team in charge of the development of the Twitter Lite application and these conclusions and solutions implemented. In a standard development workflow there are 3 points that allow a significant margin of progress:
- increased developer confidence and delivery speed,
- automate the PR process to maximum,
- detect errors as early as possible.

These words echo our own questions on the subject and these conclusions confirm our decisions. 
It is important to have the shortest and most automated workflow possible between the developer and the user without sacrificing the developer's experience because it goes hand in hand with all the other aspects of a project

At M6, we use most of the tools presented, but two in particular caught our attention

The first, **React Component Benchmark**, is of particular interest to us because in the past we had started to investigate the subject and used tools that are depreciated today.

The second, **Build Tracker**, which allows us to test the evolution of bundle size, will allow us to replace an equivalent tool developed internally while providing a more detailed analysis in order to work more accurately on these issues.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ikn_dBSski8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## a11y is our new challenge

Several very inspiring talks on accessibility seem to show that this issue finally appears to be considered by web actors. In particular Facebook, which has distinguished itself by showing its assistant to detect accessibility errors in the development of its new version. However, it is regrettable that this toolkit is not accessible to the community because it could be a great help to avoid putting people with disabilities on our platforms.

It is clear that 6play is not yet very accessible but we are working to correct this error, especially on the new screens we have been integrating for several months. 

## Our expectations on Yarn finally fulfilled

We were waiting for it at M6, the new `yarn` release named `berry` offers almost everything we were missing in our favorite package manager.
Indeed, by using `yarn` in _monorepo_ mode for the 6play project, we were confronted with several problems that had to be overcome with in-house tools.Example here with our[monorepo-dependencies-check] tool (https://github.com/M6Web/monorepo-dependencies-check) which is now becoming obsolete thanks to `Constraints`.

We are also delighted with the functionality of Zero install. But what we expected most was about the _workspaces_. We will finally have a management of the publication of these.

Take a look at [this repository](https://github.com/yarnpkg/berry) for more information.

## Some projects that interest us a lot: Next.js & Code Sandbox

Even if these two tools are not used for the development of our applications, the new features of NextJS and Code Sandbox are clearly very interesting. 

As for Next.js, the 6play project has its own configuration of `server side rendering` (Florent explains it in ['Last night isomorphic JS saved our life!'](https://tech.m6web.fr/spa-mode-isomorphism-js/)). However, NextJS is a great project that we use for many of our side projects. **AMP support, client-only pages and API endpoints** are clearly welcome.

As for Code Sandbox, Ives van Hoorne told us his personal story and that of his project. In addition to **the great tool that is CodeSandbox**, we have seen that the use of WebAssembly seems to have solved a lot of performance and implementation problems. For example, he cites the coloring of the code based on _TextMate_ only available in C could not have been ported to the browser without going through WebAssembly.
