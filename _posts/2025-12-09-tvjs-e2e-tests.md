---
layout: post
title: "TVJS: Stabilizing E2E Tests with Focus Assertions"
description: "REX on stabilising e2e tests for a focused based app, using Cypress."
tags: [smartTV, javascript, react, web, frontend, e2e, testing]
color: rgb(251,87,66)
language: en
feature-img: ""
thumbnail: ""
---

## Context

At TVJS, we work on a Smart TV app. It's a React webapp, but the user doesn't interact with it in the same way they would on a typical desktop or mobile application. Instead, the app implements LRUD (Left, Right, Up, Down) navigation: users interact exclusively through directional keys.

For a while, the team had faced an issue: our E2E tests were filled with flaky feature tests, polluting CIs with false negatives, forcing us to rely on retries and relaunching CI jobs. This eroded trust in our test suite and slowed down development.

## The Challenge of Testing LRUD Navigation

### Cypress's built-in stability
[Cypress](https://docs.cypress.io/), our end-to-end testing tool of choice, includes powerful mechanisms that make tests stable out of the box. For pointer interactions, it automatically ensures the target element exists and is visible, and retries the action if the targeted element isn't ready.

These features make tests naturally resilient against network delays and rendering times, handling timing details so you can focus on the feature test. They also make tests 
easier to write: when you know what behaviour to expect, Cypress handles the 
timing details, allowing you to focus on the feature test.


### The challenge of LRUD navigation
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


The outcome of a navigation action is entirely dependent on which element was focused at the moment the key event was dispatched. A missing or incorrect focus leads to unpredictable navigation paths.

This created for us a bad case of flaky tests in our CI : the test only passes when the timings perfectly aligned, which obviously is not a sustainable situation.


### Explicit Focus Assertions 
To solve this, we took inspiration from how Cypress stabilizes pointer interactions: before doing anything, confirm the app is in the expected state.

For LRUD, the equivalent of “the element is ready” is “the correct element is focused.” So we added explicit focus assertions before and after every navigation step.

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
These "X should be focused" assertions are implemented using [`cy.get()`](https://docs.cypress.io/api/commands/get), which brings Cypress's built-in retry and timeout mechanisms to our focus checks. It gives us the same stability guarantees as standard pointer interactions: if the focus isn't ready yey, Cypress waits and retries until it is or times out.

This version is massively more robust because:

- We never send a navigation key unless we’ve confirmed the app is ready for it.
- Every navigation step is validated, so if something goes wrong, we catch the error immediately instead of cascading into unrelated failures.

The test no longer relies on internal timing or initialization sequences. Only on deterministic focus transitions. 

In practice, this eliminated nearly all flaky tests, but introduced a new complexity in test writing: developers had to know about this layer of assertions to add and remember to write tests this way.

## Enforcing Consistency with Linting
After the initial round of test stabilisation, flakiness returned with every test written by developers unaware of this quirkiness of LRUD app testing.
Since our Gherkin tests are ultimately just code, the obvious solution was the same as for any coding convention:
lint it.

We used [gherkin-lint](https://github.com/vsiakka/gherkin-lint). It's a tools used by other teams in the company and supports custom rules. We wrote a custom rule to enforce our navigation discipline.

The rule is simple and strict: any step that triggers LRUD navigation (“I press the X key”) must be immediately followed by a focus assertion (“X should be focused”).

To implement this, the rule parses feature files line by line, keeps track of the last “effective step,” handles chaining with “And”, and flags any navigation step that isn’t followed by a matching assertion.

## Beyond "Should be Focused"

The "should be focused" assertion is effective and easy to lint, but verbose. We also introduced other utilities to cover more scenarios:
- "Navigate X direction to X": This action combines the navigation step with the final focus check. By specifying the end goal, we ensure the action itself is successful. Although it doesn't validate the initial focus, it significantly improves stability by verifying the outcome of the action.
- Player state assertions: In a streaming app, focus isn't the only state that matters. We also validate player states (play/pause, playback progress, ...) after keyboard actions. Our lint rule accepts these as valid post-navigation assertions, ensuring that key presses have the expected effect on the media player.

## Conclusion

Testing LRUD navigation with Cypress exposes a gap: Cypress is great at handling UI interactions that target DOM elements directly, but it has no built-in understanding of focus state or navigation flow. In a Smart TV app, where everything depends on which item is focused at each step, that gap becomes the main source of flaky tests.

By adding explicit focus assertions before and after every navigation action, we give Cypress the information it needs to stay in sync with the app. The tests become deterministic and failures point to real issues. We now trust our tests, and while we still monitor stability with weekly "no-retry" runs, they are finally working for us, not against us.

Enforcing this pattern with linting sealed the deal to get rid of tests derailing and give us confidence back in our tests.
