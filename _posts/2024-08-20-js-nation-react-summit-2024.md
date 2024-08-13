---
layout: post
title: JS Nation x React Summit 2024 highlights
description: "A few notes on the combo JS Nation x React Summit Amsterdam 2024 conferences"
author: team_frontend
tags: [conference, frontend, react, javascript]
color: rgb(251,87,66)
thumbnail: "/images/posts/2024-08-20-js-nation-react-summit-2024/teamBedrock.jpg"
---

The Frontend Bedrock teams were present at the 2024 edition of the _JS Nation_ and _React Summit_ conferences in Amsterdam on 13 & 14 June. We would like to highlight and share some of the subjects we find relevant about our favourite language and framework 🙂 Feel free to explore them further if you are interested.

> 📹 You can watch all the video recording of the [JS Nation](https://gitnation.com/events/jsnation-2024/talks) and the [React Summit](https://gitnation.com/events/react-summit-2024/talks) talks.

### Lessons for Building Resilient Codebases - Alex Moldovan

> 📹 Watch the [video](https://gitnation.com/contents/lessons-for-building-resilient-codebases)

One of my favourite types of presentation, with concrete things that you can then apply in your daily life as a developer.

Alex sumed up his speech in 5 points:

- **Accept imperfections** in your codebase: perfect is the ennemy of good, shortcuts and exceptions can be taken if they are well documented.
- **[Colocate code](https://alexmoldovan.dev/code-bites/colocation-is-king)** according to concerns is a way of improving readability and therefore maintainability and efficiency.
- **Reusability** is not always the better choice vs **duplication**, you should find the right balance, abstraction should come when a piece of code is proven as a long term solution.
- **Readability and understandability** of the code is very important for the future developpers, leaves comments, break conditions with more than 3 members using intermediate variables.
- Use **Typescript** intensively and try to handle all the possible states of your data.

At Bedrock, we've always tried to apply a maximum of [best practices](https://tech.bedrockstreaming.com/2021/09/01/bonnes-pratiques-web.html) 🇫🇷 including some developped here by Alex, to ensure the maintenability of our web codebase. It seems to be working pretty good since this JS project is now 10 years old!

### Why Your Performance Work Is Not Seen - Vinicius Dallacqua

> 📹 Watch the [video](https://gitnation.com/contents/why-your-performance-work-is-not-seen)

Vinicius addressed an important subject for us, as frontend engineers. We all are concerned about performance and we want to deliver the most optimized product, but we often come up against major obstacles in this area. We already talked about this topic last year when [we attended the We Love Speed conference](https://tech.bedrockstreaming.com/2023/08/11/we-love-speed-2023.html).

To prove values of performance work, **Lab tools** (like [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview?hl=fr)) & **RUM** (Real User Monitoring) has to been used together. Data collected must be analysed, optimised and framed to make connections with product concerns. Performance needs to **matter to engineering and product** for a sustainable governance model.

As in many areas, the key is to set realistic and achievable objectives and to proceed by iteration: **monitor, measure, report and repeat**.

### Install Nothing: App UIs With Native Browser APIs - Scott Tolinski

> 📹 Watch the [video](https://gitnation.com/contents/install-nothing-app-uis-with-native-browser-apis)

Scott revealed that we can use the browser's native APIs to build certain UI components easily, whereas we've been using sometimes complex JS to do this for years.

He showed for example:

- how to build modals with [`<dialog>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/dialog) element,
- how to easily create animated transitions with [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) or with [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style),
- how to create menu with [`<popover>`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/popover) element,
- how to build slideshows with [`scroll-snap`](https://developer.mozilla.org/fr/docs/Web/CSS/scroll-snap-align) CSS properties.

And much more besides, check out all Scott's tips on this [site](https://tolin.ski/talks/install-nothing).

### Testing: do more with less - Eugene Fidelin

### Facing Frontend's Existencial Crisis - Ryan Carniato

### Invisible Hand of React Performance - Ivan Akulov

### The Suspense Quest - Inside React's Magic - Charlotte Isambert

### Why You Should Use Redux in 2024 - Mark Erikson

### Case Study: Building Accessible Reusable React Components at GitHub - Siddharth Kshetrapal

> 📹 Watch the [video](https://gitnation.com/contents/case-study-building-accessible-reusable-react-components-at-github)

The talk by Sid focuses on building accessible React components, emphasizing the importance of using the correct HTML elements and [ARIA roles](https://www.w3.org/TR/wai-aria-1.2/) to enhance web accessibility.

Sid highlights practical examples, such as [navigating tab lists](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) and [handling conditional checkboxes](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/), explaining how ARIA roles and properties can make web interfaces more accessible, particularly for screen reader users. 

What we will remember from this talk:
- importance of using correct HTML elements and ARIA roles for accessibility.
- implementation of ARIA roles like `tablist`, `tab`, and `aria-selected`.
- significance of keyboard navigation and ARIA states/properties in accessibility.
- design considerations for accessibility, including using `aria-disabled` over `disabled`.