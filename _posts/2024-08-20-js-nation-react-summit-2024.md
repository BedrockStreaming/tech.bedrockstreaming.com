---
layout: post
title: JS Nation x React Summit 2024 highlights
description: "A few notes on the combo JS Nation x React Summit Amsterdam 2024 conferences"
author: [f_dubost, y_frommelt]
tags: [conference, frontend, react, javascript]
feature-img: "/images/posts/2024-08-20-js-nation-react-summit-2024/reactSummit.png"
thumbnail: "/images/posts/2024-08-20-js-nation-react-summit-2024/teamBedrock.jpg"
---

The Frontend Bedrock teams were present at the 2024 edition of the _JS Nation_ and _React Summit_ conferences in Amsterdam on 13 & 14 June. We would like to highlight and share some of the subjects we find relevant about our favourite language and framework 🙂 Feel free to explore them further if you are interested.

> 📹 You can watch all the video recordings of the [JS Nation](https://gitnation.com/events/jsnation-2024/talks) and the [React Summit](https://gitnation.com/events/react-summit-2024/talks) talks.

### Lessons for Building Resilient Codebases - Alex Moldovan

> 📹 Watch the [video](https://gitnation.com/contents/lessons-for-building-resilient-codebases)

One of my favourite types of presentation, with practical things that you can then apply in your daily life as a developer.

Alex sums up his speech in 5 points:

- **Accept imperfections** in your codebase: perfect is the enemy of good, shortcuts and exceptions can be taken if they are well documented.
- **[Colocating code](https://alexmoldovan.dev/code-bites/colocation-is-king)** according to concerns is a way of improving readability and therefore maintainability and efficiency.
- **Reusability** is not always the better choice vs **duplication**, you should find the right balance, abstraction should come when a piece of code is proven as a long term solution.
- **Readability and understandability** of the code is very important for the future developers that will maintain your code: leave comments, break conditions with more than 3 members using intermediate variables, etc.
- Use **Typescript** intensively and try to handle all the possible states of your data.

At Bedrock, we've always tried to apply a maximum of [best practices](https://tech.bedrockstreaming.com/2021/09/06/web-best-practices.html) including some addressed here by Alex, to ensure the maintainability of our web codebase. It seems to be working pretty good since this JS project is now 10 years old!

### Why Your Performance Work Is Not Seen - Vinicius Dallacqua

> 📹 Watch the [video](https://gitnation.com/contents/why-your-performance-work-is-not-seen)

Vinicius addresses an important subject for us, as frontend engineers. We are all concerned about performance and we want to deliver the most optimized product, but we often come up against major obstacles in this area. We already talked about this topic last year when [we attended the We Love Speed conference](https://tech.bedrockstreaming.com/2023/08/11/we-love-speed-2023.html).

To demonstrate the worth of working on performances, **Lab tools** (like [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview?hl=fr)) & **RUM** (Real User Monitoring) have to be used together. Collected data must be analyzed, optimized and framed to make connections with product concerns. Performance needs to **matter to engineering and product** for a sustainable governance model.

As in many areas, the key is to set realistic and achievable objectives and to proceed by iteration: **monitor, measure, report and repeat**.

### Install Nothing: App UIs With Native Browser APIs - Scott Tolinski

> 📹 Watch the [video](https://gitnation.com/contents/install-nothing-app-uis-with-native-browser-apis)

Scott reveals that we can use the browser's native APIs to build certain UI components easily, whereas we've sometimes been using complex JS to do this for years.

He shows for example:

- How to build modals with the [`<dialog>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/dialog) element
- How to easily create animated transitions with [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) or with [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)
- How to create a menu with the [`<popover>`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/popover) element
- How to build slideshows with [`scroll-snap`](https://developer.mozilla.org/fr/docs/Web/CSS/scroll-snap-align) CSS properties

Check all these tips out and much more besides on Scott's [site](https://tolin.ski/talks/install-nothing)!

### Testing: do more with less - Eugene Fidelin

> 📹 Watch the [video](https://gitnation.com/contents/testing-do-more-with-less)

Testing has been a guide and a real challenge since we began the JS web project at Bedrock in 2015. We are convinced that this is an important part of the sustainability and reliability of the codebase. As a result, we listened to Eugene's point of view with curiosity.

[DORA metrics](https://www.datadoghq.com/knowledge-center/dora-metrics/) should be adopted to measure how good your are for shipping software with **4 indicators**:

- Deployment frequency
- Lead time for changes
- Change failure rate
- Time to restore service

The first three are affected by the testing strategy. The _[Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)_ can help to write the right tests given the **return on investment** of the different forms.

![Testing Trophy: return on investment of the different forms of testing](/images/posts/2024-08-20-js-nation-react-summit-2024/testingTrophy.png)

Eugene describes the various steps to build a reliable testing strategy:

- step 0: enable **static** linters and **type** checks
- step 1: create **integration** tests for all happy and non-happy flows
- step 2: write **unit** tests for reusable parts and code without coverage
- step 3: write very few **e2e** tests only for the most business critical flows
- step 4: use **metrics, tracing, logging** to identify anomalies on production

[In Bedrock's frontend teams](https://tech.bedrockstreaming.com/2021/09/06/web-best-practices.html), we are aligned with these strategy:

- Static testing is a compulsory stage in any project start-up.
- We have a lot of unit and integration tests (which can be viewed as e2e tests, but we only test the frontend part with mocked backend and 3rd parties).
- A manual homologation phase before deploying any new release run e2e tests: this is a current project to automate most of these tests to save time in the process.
- Production monitoring is one of our mantras: our former boss used to say that _"a non-monitored project is not in production"_.

A [tweet](https://x.com/rauchg/status/807626710350839808) from [Guillermo Rauch](https://x.com/rauchg) can perfectly conclude this topic:

> Write tests. Not too many. Mostly integration.

### Facing Frontend's Existencial Crisis - Ryan Carniato

> 📹 Watch the [video](https://gitnation.com/contents/solidjs-tba)

Ryan shows why JS frameworks, especially React, have recently evolved using new concepts to reduce the runtime at page load.

The size of pages has been increasing over the years. In particular because [SPAs](https://en.wikipedia.org/wiki/Single-page_application) have gained ground in the web world. SPAs are costly because of:

- **code execution and evaluation**,
- **code bundle size**,
- **payload (HTML & data) size**.

At the same time, devices have improved their performance, but not all of them. As a result, we are faced with a real fact: an app with client-side rendering is slower to display and interact than an app with server-side rendering.

In order to reduce each of these three costly aspects, Ryan mentions three concepts that new versions of recent JS frameworks, such as React 19, are developing:

- **islands**: splitting the page in several blocks, and render those which never change on server-side only,
- **server components**: close to the island concept but with the ability to handle state persistence over the client navigation,
- **resumability**: the ability to defer the hydratation of components until an interaction is requested.

If you want more details about concepts developed by Ryan, you can read his [article](https://dev.to/this-is-learning/islands-server-components-resumability-oh-my-319d) on this subject.

### Invisible Hand of React Performance - Ivan Akulov

> 📹 Watch the [video](https://gitnation.com/contents/react-performance-past-and-future)

Like [Charlotte Isambert's explanation of how Suspense works](https://gitnation.com/contents/react-internals), this talk takes us into the inner workings of React. It is often interesting to understand how the library you are using works under the hood so that you can use it properly.

By comparing behaviors between the latest React versions, Ivan explains:

- How `useEffect` has optimized the browser layout and paint calculation flow comparing to `componentDidMount`
- How `setState` batching have been optimized in React 18
- Why the freeze experience if the user interacts during the hydratation phase is much better by using `Suspense`.

### Why You Should Use Redux in 2024 - Mark Erikson

> 📹 Watch the [video](https://gitnation.com/contents/why-you-should-use-redux-in-2024)

At Bedrock, [we have been using Redux since 2016](https://tech.bedrockstreaming.com/2016/07/04/migrate-smoothly-flux-isomorphic-app-to-redux.html), and we continue to use it. So Mark's arguments will certainly confirm our choice!

Mark is the creator of [Redux Toolkit](https://redux-toolkit.js.org/). He begins by detailing the pros and cons of using Redux in relation to various aspects:

- Flux-style indirection via dispatching actions instead of direct state mutations
- A single global centralized store
- State updates via reducers and slices

Then Mark presents the arguments why he thinks using Redux in 2024 is a good choice:

- Provides a consistent architecture pattern for apps
- Better understanding of what's happening in the app
- Widely used
- Well documented
- Better update behavior than React Context
- Redux Toolkit provides built-in tools standard use cases
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) data fetching and caching layer
- Works great with Typescript
- Designed to work with React but still UI-agnostic

Since 2016 we have been trying at Bedrock to streamline the way we use Redux in JS projects by applying [some best practices](https://tech.bedrockstreaming.com/2020/04/27/react-redux-pitfalls-and-best-pratices.html).
We also have been adopting [Redux Toolkit](https://tech.bedrockstreaming.com/2022/06/08/migration-progressive-vers-redux-toolkit.html) for some time with this in mind. And we are always open to new ways of managing state in apps. For example, we are currently testing [XState](https://tech.bedrockstreaming.com/2023/02/08/projet-xstate.html) to manage the state of our player.

### Case Study: Building Accessible Reusable React Components at GitHub - Siddharth Kshetrapal

> 📹 Watch the [video](https://gitnation.com/contents/case-study-building-accessible-reusable-react-components-at-github)

The talk by Sid focuses on building accessible React components, and emphasises on the importance of using the [correct HTML elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics) and [ARIA roles](https://www.w3.org/TR/wai-aria-1.2/) to enhance web accessibility.

Sid highlights specific examples, such as [navigating tab lists](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) and [handling conditional checkboxes](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/), explaining how ARIA roles and properties can make web interfaces more accessible, especially for screen reader users.

What we remember from this talk:

- Importance of using correct HTML elements and ARIA roles for accessibility
- Implementation of ARIA roles like `tablist`, `tab`, and `aria-selected`
- Significance of keyboard navigation and ARIA states/properties in accessibility
- Design considerations for accessibility, including using `aria-disabled` over `disabled`
