---
layout: post
title: "Performance.now() 2025 - Pragmatic, Magical and Responsible Performance"
description: "Takeaways from the Performance.now() 2025 conference in Amsterdam - investigating runtime costs, modern DevTools and responsible performance."
tags: [performance, conference, webperf, javascript, react, web, frontend]
author: [f_dubost, m_bernier]
cover: /assets/images/perfnow-2025-cover.jpg
color: rgb(251,87,66)
language: en
feature-img: "/images/posts/2025-11-04-performance-now-2025/perfnow-2025-1.jpg"
thumbnail: "/images/posts/2025-11-04-performance-now-2025/perfnow-2025.jpg"
---

On October 30-31, the Bedrock Web & TV team attended **performance.now() 2025** in Amsterdam, one of the few conferences entirely dedicated to web frontend performance. Two intense days of real-world insights, browser deep-dives and discussions about what “fast” truly means in 2025.

---

## ⚡ Fast is Pragmagical

**Tammy Everts (SpeedCurve)**

The conference opened with a simple but essential question: [_“How fast is fast enough?”_](https://speakerdeck.com/tammyeverts/how-fast-is-fast-enough-perfnow-2025)

The answer depends on who you are trying to please:

- your **boss**, who cares about ROI and conversions
- **Google**, with its Core Web Vitals thresholds
- or your **users**, who expect instant, seamless experiences

Performance is not just numbers. Fast interfaces remove **cognitive friction**, keeping users focused and engaged. Tammy described performance as both **pragmatic** — measurable, business-driven — and **magical** — the kind of speed that feels effortless.

Core Web Vitals remain a useful baseline, but they are not the finish line. Every product should define its own thresholds based on its users, context and KPIs.

> “Fast eliminates cognitive friction, fast is magical. But fast also needs to be pragmatic.”

That balance — _pragmagical_ — became one of the recurring themes of the event.

---

## 🧩 Measure What Matters

**Harry Roberts (CSS Wizardry)**, **Michal Mocny (Google)**

Harry Roberts reminded everyone that [performance engineering is not a checklist, but a way of thinking](https://speakerdeck.com/csswizardry/how-to-think-like-a-performance-engineer). He emphasized that metrics only matter if they reflect real-world conditions.

Key takeaways:

- **Test realistically**: replicate actual network conditions, devices and cache states instead of relying on idealized lab setups. Tools like [WebPageTest](https://www.webpagetest.org/), [CrUX](https://developer.chrome.com/docs/crux) and [Treo](https://treo.sh/) help capture real-world performance data.
- **Don’t stop at P75**: optimizing for the 75th percentile hides real pain for the rest of your users.
- **Focus on enablers**: [TTFB](https://web.dev/articles/ttfb) and [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event) unlock good Core Web Vitals.

> “The numbers you see represent a huge array of experiences. Test the right thing under the right conditions.”

[Michal Mocny then introduced](https://docs.google.com/presentation/d/e/2PACX-1vQDP5p4UfOanwMC3hXryp4nVI2vKKbFAqmF8kei26BHjPYW-SfgV4__4ClnWf9deuETAWoSJ_U3Feb-/pub?slide=id.g39da923945f_1_0) the [**Soft Navigation API**](https://developer.chrome.com/docs/web-platform/soft-navigations-experiment), a long-awaited feature for SPA developers. It enables tracking **LCP (Largest Contentful Paint) on soft navigations**, not just on the first page load. Combined with INP (Interaction to Next Paint), this finally gives a complete picture of user experience in single-page apps. Still experimental, but already testable in Chrome.

At Bedrock, our Web & TV apps are SPAs and being able to natively measure the user's navigation experience within the application was something we were sorely lacking. We will quickly experiment with this API and set up monitoring for these metrics.

---

## 🕵️ Investigating Performance

**Andy Davies (SpeedCurve)**, **Umar Hansa (Independent developer)**

While measurement tells you _how fast_ things are, investigation tells you _why_. Two excellent talks focused on this detective work: **Andy Davies** on runtime analysis and **Umar Hansa** on modern DevTools workflows.

### LoAF – Making Sense of Long Animation Frames

Andy Davies explored how the browser renders frames, from JavaScript execution to style recalculation, layout, paint and compositing.

![Scripts execute during render phase too](/images/posts/2025-11-04-performance-now-2025/loaf.png)

[He introduced **LoAF (Long Animation Frames)**](https://noti.st/andydavies/9JOItx/making-sense-of-loaf), a method to detect frames taking more than 50 ms between start and paint. These “slow frames” often go unnoticed by the Long Tasks API but directly affect smoothness and interactivity.

LoAF provides much richer data than the Long Tasks API, enabling deeper performance analysis:

- **Complete script attribution**: Each LoAF entry includes a detailed list of scripts that executed during the frame, making it easy for developers to pinpoint the real causes of jank and delayed input. Unlike Long Tasks which only capture task execution, they also include the full rendering pipeline (style, layout, paint), showing scripts that execute during the render phase (mutation observers...).
- **Layout thrashing detection**: The `forcedStyleAndLayoutDuration` property reveals when code triggers multiple consecutive forced reflows, a common performance anti-pattern hard to detect in traditional profiling.
- **Pre-milestone analysis**: By filtering LoAF entries, you can identify which scripts run before critical milestones like FCP (First Contentful Paint) or LCP, helping prioritize optimization efforts.

LoAF helps answer key questions:

- Which scripts are blocking the main thread?
- Are long tasks tied to analytics, animations or specific components?
- How do these correlate with INP?
- What's causing layout thrashing in my app?

Andy released a DevTools extension that makes these insights easy to explore: [perf-timeline-to-devtools-profile](https://github.com/andydavies/perf-timeline-to-devtools-profile). For developers looking to implement LoAF monitoring, the [webperf-snippets collection](https://webperf-snippets.nucliweb.net/Interaction/Long-Animation-Frames-Helpers) provides ready-to-use helpers and the [web-vitals.js](https://github.com/GoogleChrome/web-vitals) library includes built-in LoAF support. We are eager to test these tools on our Web & TV apps to find areas for improvement!

### Modern Performance Workflows

Umar Hansa shared lesser-known DevTools features that help engineers explore, profile and monitor performance in everyday work. His philosophy was simple: **performance should be part of your daily workflow, not a quarterly audit**.

Highlights of useful features with Chrome devtools:

- [**LCP Request Discovery**](https://developer.chrome.com/docs/performance/insights/lcp-discovery) (in the "Performance" tab) pinpoints the exact resource behind your Largest Contentful Paint

![LCP Request Discovery on M6+](/images/posts/2025-11-04-performance-now-2025/LCP-request-discovery.png)

- **Lighthouse Timespan** runs over a full user flow, perfect for analyzing workflows or transitions
- [**Recorder Tab**](https://developer.chrome.com/docs/devtools/recorder/overview) captures interactions and replays them, useful to automate custom performance measures. It can also generate Playwright-compatible scripts, ideal for QA engineers. At Bedrock, this could reduce time spent manually documenting reproduction steps for bugs.
- [**Network overrides**](https://developer.chrome.com/docs/devtools/overrides) allow developers to intercept and modify network responses directly in DevTools, without needing a local proxy. At Bedrock, we often use this feature to streamline debugging or testing API responses without backend changes.
- **Per-URL throttling** and **network priority** (only by enabling the Chrome flag `#devtools-individual-request-throttling` in Canary/Dev version) simulate realistic various conditions without global settings

![Individual request throttling](/images/posts/2025-11-04-performance-now-2025/individual-request-throttling.png)

- [**Annotations**](https://developer.chrome.com/docs/devtools/performance/annotations) in the Performance tab make profiling more collaborative
- Finally, [**DevTools MCP**](https://developer.chrome.com/blog/chrome-devtools-mcp) brings AI assistance directly into debugging. By describing an issue, the AI can compare traces, identify anomalies, generate Lighthouse-style summaries or even produce scripts that can be used in CI pipelines for automated performance monitoring (e.g. based on your git diff) 🤯

Together, these tools turn DevTools into a true performance lab, fast to iterate, easy to share and powered by AI and automation. A new area of play that we will try to address within our teams.

---

## 🎨 Rendering Efficiently

**Michael Hladky (PushBased)**, **Barry Pollard (Google)**, **Nadia Makarevich (Independent)**

### Big Data, Zero JS

[Michael Hladky’s talk](https://docs.google.com/presentation/d/1LZleUtEN3aMNlJsPh1LOrzG3vxifufkEKqOCbQU6j3c/edit?slide=id.p#slide=id.p) focused on optimizing rendering through modern CSS rather than JavaScript. He explained how understanding the **browser rendering pipeline** — recalculate styles, layout, paint, composite — helps identify where things slow down.

![Browser render waterfall](/images/posts/2025-11-04-performance-now-2025/browser-render-waterfall.png)

By using new CSS properties like [`contain`](https://docs.google.com/presentation/d/1LZleUtEN3aMNlJsPh1LOrzG3vxifufkEKqOCbQU6j3c/edit?slide=id.g11e3e1a882e_0_2475#slide=id.g11e3e1a882e_0_2475), [`content-visibility` and `contain-intrinsic-size`](https://docs.google.com/presentation/d/1LZleUtEN3aMNlJsPh1LOrzG3vxifufkEKqOCbQU6j3c/edit?slide=id.g11a87b8eaef_0_22#slide=id.g11a87b8eaef_0_22), developers can isolate DOM sections and prevent unnecessary reflows or paints.

```css
.card {
  contain: layout;
  content-visibility: auto;
  contain-intrinsic-size: 400px;
}
```

These properties are now well-supported and can drastically improve performance for large DOM structures like catalogs or carousels. We already use `content-visibility` and `contain-intrinsic-size` on few components in our web apps, but we should definitively consider the potential gains from expanding the use of these properties.

For more detail, check [CSS Triggers](https://lmame-geek.com/css-triggers/) to understand which CSS properties trigger layout or paint.

### Speculations about webperf

On the other hand, [Barry Pollard introduced](https://docs.google.com/presentation/d/1YZR_Oay1nzE9ujHndF-1yNkjNx2bRXy3MRNY7P5ngZA/edit?slide=id.g38c479513fd_0_0#slide=id.g38c479513fd_0_0) the [**Speculation Rules API**](https://developer.chrome.com/docs/web-platform/implementing-speculation-rules), which allows browsers to prefetch or prerender future pages, reducing perceived latency in **multi-page apps** (MPA). Although caution should be exercised when using it, and although it is currently only available on Chrome (or almost!), it can have a big impact on user navigation, since the next page is prepared in advance.

Companies like [Etsy](https://www.etsy.com/codeascraft/search-prefetching-performance) and [Shopify](https://performance.shopify.com/blogs/blog/speculation-rules-at-shopify) have already implemented speculation rules in production and reported significant improvements in perceived performance. While not relevant for Bedrock's SPA-based apps, it perfectly illustrates a key idea: _efficiency is about making users wait less, not just doing less._

### React, Rendering & Performance

Finally, [Nadia Makarevich compared](https://drive.google.com/file/d/18MURNelPY6RJmw6ashsk3mfDgkDX8sf_/view) CSR, SSR and React Server Components using the same React app and metrics to measure their real impact on rendering speed and runtime cost. Her approach was [very scientific and interesting](https://www.developerway.com/posts/react-server-components-performance).

Key take-aways:

- **CSR (Client-Side Rendering)**: the simplest setup, but all HTML and data are generated client-side, which delays both LCP and hydration
- **SSR (Server-Side Rendering)**: brings immediate LCP improvement by sending pre-rendered HTML, but if user data is fetched on the client, it still causes visible delays and layout shifts
- **SSR + Suspense/Streaming**: progressively improves Time-to-Display and user perception, as data is streamed and hydrated chunk by chunk
- **RSC (React Server Components)**: theoretically reduces client JS and improves interactivity, but requires major architectural changes; the gains are limited (LCP is the same as "traditional" SSR).

Our web platform uses anonymous SSR (highly cached) and client-side fetches for personalization. Migrating to RSC would require major changes to our architecture, with uncertain short-term gains. We will monitor the technology, but it’s not a priority right now.

---

## 🌱 Responsible Performance

**Ines Akrap (Green Software Champion)**

Ines Akrap’s session _Fast, Green, Responsible_ looked at performance through an ethical and environmental lens. She shared a striking comparison:

> 80 petabytes of unused JavaScript shipped every month equals 54,000 tons of CO₂, roughly 37 million trees.

But the talk wasn’t just about carbon footprint. It was about **user respect**. A lighter, more efficient app benefits those on low-end devices or limited networks first. And the web already provides APIs to adapt experiences responsibly:

- user wants fewer or no animation (`prefers-reduced-motion`)
- user prefers dark or light mode (`prefers-color-scheme`)
- user has data-saving mode on
- connection speed (`navigator.connection.saveData`)
- the device is low on power (Battery API)

The principle is simple: a responsible and empathic web is often a faster one. See [Web Sustainability Guidelines (W3C)](https://www.w3.org/TR/web-sustainability-guidelines/) for more details.

---

## 🧠 Conclusion: Performance as a Mindset

After two days in Amsterdam, one clear message emerged: performance is no longer just a number. It’s a mindset.

- **Technical intent**: understanding how browsers work and what causes runtime costs
- **Cultural intent**: making performance a shared habit across teams
- **Responsible intent**: optimizing for both users and the planet

> “Fast is pragmatic. Fast is magical. And above all, fast is intentional.”
