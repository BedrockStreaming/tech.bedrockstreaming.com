---
layout: post
title: "TVJS: Stabilizing E2E Tests with Focus Assertions"
description: "REX on stabilising e2e tests for a focused base app, using Cypress."
tags: [TVJS, smartTV, javascript, react, web, frontend, e2e, testing]
author: [ m_bernier]
cover: 
color: rgb(251,87,66)
language: en
feature-img: ""
thumbnail: ""
---
This article explains how we worked to add explicit focus assertions around every navigation action restores determinism to LRUD tests, and how enforcing this pattern with a custom Gherkin lint rule ensures long-term consistency across the test suite.
---

## Context
At TVJS, we work on a Smart TV app. While it's a React webapp, it doesn’t behave like a typical desktop or mobile application. Instead, it uses LRUD (Left, Right, Up, Down) navigation: users interact exclusively through directional keys.

Cypress, our end-to-end testing tool of choice, includes several powerful mechanisms that make tests stable out of the box. When interacting with an application using a pointer, Cypress will automatically:

- Ensure the target element exists and is visible before interacting.
- Retry the action for a short period if the element isn’t ready yet, failing only after a timeout.

These features make Cypress tests naturally resilient against network delays, component rendering times, or asynchronous data fetching. They also make tests easier to write: when you know what behaviour to expect, Cypress handles the timing details, allowing you to focus on the feature test.

## The problem
The trouble starts when we stop using pointer interactions and start testing keyboard-based LRUD navigation. Cypress can easily simulate key presses, but it has no idea what’s currently focused on the page and focus is everything in LRUD. Every navigation step is relative: pressing the “right” key only makes sense if the correct item is focused before the key event.

In a simple navigation test like:
```gherkin
Given I am on a program page
When I press the right key twice
And I press the enter key
Then I should be on the clip n°3 page
```

A few things can go wrong:

- The page is displayed, but the navigation system hasn’t finished its own initialization, so nothing is focused when Cypress sends the first key.
- Everything is ready, but Cypress fires “Right, Right” so fast that the navigation handler only processes one of them before the Enter key arrives.


The outcome of a navigation action is entirely dependent on which element was focused at the moment the key event was dispatched.

A missing or incorrect focus leads to unpredictable navigation paths.

This created for us a bad case of flaky tests in our CI : the test only passes when the timing of network, rendering, and input perfectly aligns, which obviously is not a sustainable situation.



## The fix 
To solve this, we took inspiration from how Cypress stabilizes pointer interactions: before doing anything, confirm the app is in the expected state.

For LRUD, the equivalent of “the element exists” is “the correct element is focused.” So we added explicit focus assertions before and after every navigation step.

The same test now looks like this:
```gherkin
Given I am on a program page
Then Item 1 of block 1 should be focused

When I press the right key
Then Item 2 of block 1 should be focused

When I press the right key
Then Item 3 of block 1 should be focused

And I press the enter key
Then I should be on the clip n°3 page
```
These "X should be focused" assertions are implemented using [`cy.get()`](https://docs.cypress.io/api/commands/get), which brings Cypress's built-in retry and timeout mechanisms to our focus checks:


This gives us the same stability guarantees as standard pointer interactions: if the focus isn't there yet (e.g., during an animation), Cypress waits and retries until it passes or times out.


This version is massively more robust because:

- We never send a navigation key unless we’ve confirmed the app is ready for it.
- Every navigation step is validated, so if something goes wrong, we catch the error immediately instead of cascading into unrelated failures.

The test no longer relies on internal timing or initialization sequences — only on deterministic focus transitions. In practice, this eliminated nearly all flaky LRUD tests, but introduced a new complexity in test writing: developers had to know about this layer of assertions to add and remember to write tests this way. After the initial round of test stabilisation, flakiness returned with every test written by developers unaware of this quirkiness of LRUD app testing


## The next step

Since our Gherkin tests are ultimately just code, the obvious solution was the same as for any coding convention:
lint it.

We used [gherkin-lint](https://github.com/vsiakka/gherkin-lint). It's a tools used by other teams in the company and supports c Gherkin files linting. We wrote a custom rule to enforce our navigation discipline.

The rule is simple and strict: any step that triggers LRUD navigation (“I press the X key”) must be immediately followed by a focus assertion (“…should be focused”).

To implement this, the rule parses feature files line by line, keeps track of the last “effective step,” handles chaining with “And”, and flags any navigation step that isn’t followed by a matching assertion.

The work of clearing all lint errors and integrating the rule in our CI is still ongoing 

## Other focus assertions

The "should be focused" asserion, while to use and lint for, is quite wordy. We also introduced other stabilisation utils, such as 
- a "navigate X direction to X" action : extra precision of the end goal of the navigation help more precise actions. While it doesn't check for inital focus, it helps make sure that the action it self is successful, ensuring more stable tests.
- Other types of assertions than focus : while our app usage is focused based, there are other elements that are important to check for, espicially in a streaming app. We have assertion on player state and advancement after keyboard actions. The lint rule includes them as valid assertions after an action, and they help make sure that the action had the expected effect on the media player.


## Conclusion

Testing LRUD navigation with Cypress exposes a gap: Cypress is great at handling UI interactions that target DOM elements directly, but it has no built-in understanding of focus state or navigation flow. In a Smart TV app, where everything depends on which item is focused at each step, that gap becomes the main source of flaky tests.

By adding explicit focus assertions before and after every navigation action, we give Cypress the information it needs to stay in sync with the app. The tests become deterministic and failures point to real issues.

Enforcing this pattern with linting sealed the deal to get rid of tests derailing and give us confidence back in our tests.
