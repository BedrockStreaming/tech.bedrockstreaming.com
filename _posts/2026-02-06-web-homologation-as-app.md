---
layout: post
title: "Building a Scalable, Multi-Tenant QA Automation Stack at Bedrock Streaming"
description: "We share here QA context, key takeaways and reveal the architecture of the Web homologation stack."
tags: [bdd, frontend, ownership, playwright, QA, web]
author: [m_bayard]
color: rgb(251,87,66)
language: en
thumbnail: "/images/posts/2026-02-06-web-homologation-as-app/homologation_qa_web_10.jpg"
---

At Bedrock Streaming, we create and operate full-scope streaming services for leading media companies with best-in-class user experience across AVOD, SVOD and hybrid business models.

Given that our application is multi-customer, scaling testing efforts becomes increasingly challenging and costly due to the requirement for extensive manual validation.

QA engineers are therefore a critical resource responsible for assessing product quality and ensuring high standards through continuous validation and _homologation_.

In our context, _homologation_ specifically involves the rigorous, final assessment of a release candidate (RC). This process entails fully testing the RC across a matrix of multi-client configurations (customer-specific data/settings) and multi-browser environments on an iso-production environment before deployment. _Homologation_ used to be a fully-manual process in the software release process.

To make sure this process follows a more and more speedy release cycle and scales at a limited cost, automated testing becomes a must have and critical tool to support even shorter release cycle in the future.

This article will cover the building foundation of our new homologation stack, dedicated to the validation of the frontend release candidates.

Disclaimer: the strategy is home-made but the stack we’re using is composed of various open-source tools. We want to share with the QA community our journey in the automation world and expose our approach. Bedrock is evolving fast and it’s only a snapshot of our current way of working.

---

## 🚀 Transforming Frontend Homologation

**The Challenge : Velocity meets Quality**

The Web team operates on a two-week release cycle, deploying major updates rapidly. This demanding pace places the QA engineers in a critical role, responsible for continuous validation and homologation to assure product quality.

However, relying heavily on traditional manual QA processes presented a scalability and cost challenge:

- Growing Feature Set: As the number of features increases, the time required for comprehensive manual testing grows linearly, threatening to delay major releases and negatively impacting Time-to-Market (TTM).

- Speed Constraint: To accommodate even shorter release cycles in the future, the homologation process needed to become faster, more reliable, and less expensive to execute repeatedly.

**The Goal:**

- Build a new, robust, and scalable homologation stack dedicated to validating frontend release candidates that can meet the current pace and future demands.
- On another hand, traditional and fully manual QA processes were a bit dusty compared to the evolving environment around QA and AI and representing a source of monotony in the QA engineers day-to-day. From “nice-to-have“, the automated testing shifted to critical need to sustain our evolution.

---

## ⚙️ Building Blocks of the New Homologation Stack

Our solution hinges on a deliberate choice of tools and methodologies designed for readability, maintainability, and future-proofing:

**Core Stack**

| Component                                                      | Role                      | Key Benefit                                                                                                                         |
| -------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [Playwright](https://playwright.dev/)                          | Browser Automation Engine | Speed and Reliability: Unified API for all major browsers (Chromium, Firefox, WebKit), mobile emulation, and excellent DX.          |
| [playwright-bdd](https://vitalets.github.io/playwright-bdd/#/) | BDD Framework (Gherkin)   | Collaboration and Readability: Enables tests to be written in a natural, shared language while managing Playwright test generation. |

> ℹ️ Our dictionary of steps is greatly inspired by [uuv](https://github.com/Orange-OpenSource/uuv) which aims to provides an ecosystem that simplifies the writing of End-to-End tests in a BDD approach and a user-centric way and accessibility-first selectors.

**Requirements and rationale behind**

- **Natural Language BDD (Gherkin)**: This is a key enabler for collaboration.

  - Easy Review: Allows QA Engineers, Product Owners (POs), and Developers (DEVs) to easily read, review, and contribute to the test specifications without needing deep coding knowledge.

- **Multi-Client / Multi-Platform Support**: Leveraging Playwright's power, our stack should inherently supports validation across:

  - Multiple Languages (leveraging our i18n packages).
  - Multiple Platforms (desktop and mobile browsers).
  - Multiple apps / projects.

- **Codebase Integration (the shift)**: The homologation application is part of the main Web codebase.

  - Better Context: QA engineers gain a better understanding of code changes and their impact.

  - Reduced Maintenance: We leverage the existing i18n language packages directly within the test environment, significantly limiting test maintenance when text strings change following editors update.

  - Leverage our CI environments and workflows for future integration with deployment.

  - But also higher responsability regarding the quality of the injected tests and code overall 🥐. The fear of breaking things is natural but approved reviews and a green CI are always keeping up the quality level.

## 🏗️ Homologation Architecture Overview

Today this architecture allows writing one test that runs across 4 customers × 2 platforms × multiple environments.
The architecture follows a clean layered separation between business requirements (Gherkin), test logic (steps), and implementation details (utils).

**1. Feature Files (BDD Layer)**

- Path: `features/@desktop/` & `features/@webview/`
- Purpose: Plain-language Gherkin files defining the test scenarios.
- Organization: Grouped by functional domains: `@core` (navigation), `@player` (VOD/Live/audio), and `@ulc` (accounts/payments).

**2. Step Definitions (Glue Layer)**

- Path: `features/steps/\*.steps.ts`
- Purpose: The bridge between Gherkin and code.
- Design: Standardized by action (When) or assertion (Then) to maximize reusability across different features.

**3. Utilities (Implementation Layer)**

- Path: `features/steps/utils/\*.utils.ts`
- Purpose: The "brains" of the framework.
- Responsibility: Instead of individual page objects, these shared utilities handle complex multi-tenant logic, video player interactions, and smart navigation.

**4. Configuration (Multi-Tenant Layer)**

- Path: `config/{customer}/`
- Purpose: Environment and client-specific data.
- Components: Holds the unique URLs, account information and localized strings (translations.config.ts) for each brand.

> ℹ️ We have not implemented the Page Object Model (POM) in favor of a Functional Utility-Based approach. This avoids the heavy overhead of maintaining an excessive amount of page-specific classes across multiple brands. Instead, we centralize logic in a shared implementation Layer, allowing us to update core behaviors (like the Video Player) in a single place for all tenants.

Finally the architecture looks like this:

```
apps/homologation/
├── features/                    # Gherkin feature files organized by platform
│   ├── @desktop/                # Desktop-specific test scenarios
│   ├── @webview/                # Mobile-specific test scenarios (same structure)
│   └── steps/                   # TypeScript step definitions
│       ├── authentification.steps.ts
│       ├── interactivity.steps.ts
│       ├── visibility.steps.ts
│       │── ...
│       └── utils/               # Utility functions for steps
├── config/                    # Customer-specific configuration
│   ├── config.ts              # Main config aggregator
│   ├── selectors.ts           # Main selectors aggregator
│   ├── clientA/               # client A specific config
│   ├── .../
│   ├── .../
│   └── clientN/                  # client N specific config
│       ├── datas.config.ts       # Test data
│       ├── urls.config.ts        # URL mappings
│       └── translations.config.ts # Merged translations from different source
```

**🔄 Data Flow Example: Multi-Tenant Magic**

When executing a test like:

```js
Then the user should see the text "translation.account.menu.logout"
```

- Step receives the abstract key `"translation.account.menu.logout"`.
- Step calls a utils fonction `getValue("translation.account.menu.logout")`.
- Config resolves to the specific customer's value (e.g., `"Kijelentkezés"` for one customer, `"Logout"` for another).
- Playwright locates the element with that specific text and validates visibility.

## ✦ The Future: AI Readiness and CI Integration

- **AI and BDD**: The structured, human-readable format of Gherkin makes it an ideal input for future AI agents.
- **CI/CD In Action**: Automated tests are integrated into our CI pipeline, ensuring quality gates are enforced before any release proceeds.
- **The Human Factor**: We’ve transformed the QA role. By transitioning to "Quality Architects," our engineers now own the automated patrimony, supported by targeted training to bridge the gap between manual testing and code.

## Next

All in all, this new stack is the backbone for delivering high-quality streaming experiences quickly.

The architecture and overall approach are confirmed to be successful, leading to a reduced and continuously improving homologation time as test coverage increases. We've implemented new rituals to thoroughly analyze results and maintain a strategic focus on both manual exploratory testing and executing more complex tests. Also, time to get a first feeback on the overall outcome and quality of each release has been highly reduced from days to minutes.

**Key takeaways for the QA community:**

- Embed tests in your codebase

- BDD approach is great to align teams on the “What” and is AI future-proof

- More automated testing means more time dedicated to valuable and strategic work from QA engineers (and less repetitive tasks)

**What's next:**

- More AI and bring the automated testing to the age of agentic.

- Align the testing approach with our developers, who already have an automated E2E testing stack for Pull Request validation (currently based on [WebdriverIO & CucumberJS](https://tech.bedrockstreaming.com/2021/09/06/web-best-practices.html#our-e2e-tests)).
