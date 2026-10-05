---
layout: post
title: "Migrating the blog from Jekyll to Astro"
author: [j_poissonnet]
language: en
date: 2026-10-05
permalink: /2026/10/05/migrating-the-blog-from-jekyll-to-astro.html
topics: [architecture]
---

The blog moved from Jekyll to Astro in pull requests small enough to revert. Two earlier attempts tried to land the same move as one change.

## Jekyll still published. Nobody could own it.

The first posts are from May 2012. People kept shipping articles. The blog had readers. It did not have an owner for the Ruby toolchain under them, and a local setup was hard to reproduce.

The theme could not take an upstream fix. `type-on-strap.gemspec` pinned Type on Strap 2.4.0, `_config.yml` set `remote_theme` to the same project, and the layouts, includes, and stylesheets in the repo already overrode it.

Tags were not a way to browse. On 28 August 2026 the repo had 333 distinct tags, and 196 of them were used once. `php`, `PHP`, and `Php` were three tags.

Every page loaded scripts almost nobody used. The figures are from the inventory in [RFC 0001](https://github.com/BedrockStreaming/tech.bedrockstreaming.com/blob/master/docs/rfcs/0001-replace-the-jekyll-stack.md){:target="_blank"}, measured that day.

| Script | Size | Posts that used it |
| --- | --- | --- |
| Mermaid | 2.5 MB | 2 |
| KaTeX | 264 KB | 0 |

The RFC ends on a question it leaves open. Phase 0 was planned as ten pull requests. Who champions them?

## Two attempts, one pull request each

In November 2024, [pull request 457](https://github.com/BedrockStreaming/tech.bedrockstreaming.com/pull/457){:target="_blank"} moved the whole blog to Astro in one change. It asked for feedback rather than a merge, and this repository had no preview for it. A fork on Vercel was the preview. The first comment was "No preview?"

The comments that stalled it arrived in March 2025. Mermaid diagrams did not render. URLs had dropped the `.html` suffix, with no redirect. Last Friday Talk pages overlapped the header. Replay links in the meetup section returned 404. I closed the pull request on 28 August 2026. It was too old to rebase, and a single cutover is not how we migrate a site that has to stay up.

In May 2026, [pull request 484](https://github.com/BedrockStreaming/tech.bedrockstreaming.com/pull/484){:target="_blank"} tried again. Thirteen commits, one pull request against `master`, keeping the URLs and the old design. Those constraints were right. The pull request is still open, and it has no approving review.

## Phase 0 stayed on Jekyll

I opened [RFC 0001](https://github.com/BedrockStreaming/tech.bedrockstreaming.com/pull/488){:target="_blank"} the day I closed pull request 457. The RFC records the inventory, the decisions, and three phases. It does not ship the new site.

We treated the blog the way we treat an application that already has users. Phase 0 prepares the live Jekyll site so the later cut is small. Astro is not required for that work. Writers kept publishing while it landed.

Six pull requests merged on 28 September 2026.

1. [490](https://github.com/BedrockStreaming/tech.bedrockstreaming.com/pull/490){:target="_blank"} dropped features that never rendered, including KaTeX, the share buttons, and jQuery.
2. [491](https://github.com/BedrockStreaming/tech.bedrockstreaming.com/pull/491){:target="_blank"} replaced Liquid `{% highlight %}` and `{% post_url %}` with Markdown.
3. [493](https://github.com/BedrockStreaming/tech.bedrockstreaming.com/pull/493){:target="_blank"} split posts into Article and Talk collections.
4. [494](https://github.com/BedrockStreaming/tech.bedrockstreaming.com/pull/494){:target="_blank"} backfilled `language`.
5. [495](https://github.com/BedrockStreaming/tech.bedrockstreaming.com/pull/495){:target="_blank"} mapped the 333 tags onto a closed topic list.
6. [496](https://github.com/BedrockStreaming/tech.bedrockstreaming.com/pull/496){:target="_blank"} validated front matter in CI, so a new article could not invent a tag or skip `language`.

The RFC also listed Amplify previews, a new URL scheme, image optimisation, and Pagefind as Phase 0 work. Those four did not land as Jekyll changes. The URLs stayed. Pagefind and the Astro previews came in the next phase.

## The cutover was a stack

Astro was bootstrapped beside Jekyll. Jekyll stayed the source of truth until the last step. Each box is one pull request. The arrow means the child branch targeted the parent branch.

<div class="mermaid">
flowchart TD
    S[497 Scaffold Astro] --> P[498 Article and talk pages]
    P --> L[499 Listings, 404, and feed]
    L --> M[501 Shiki, Mermaid, and Pagefind]
</div>

Three further pull requests targeted `master`, each small enough to revert on its own.

- [504](https://github.com/BedrockStreaming/tech.bedrockstreaming.com/pull/504){:target="_blank"} built the Amplify previews with Astro, so a review could compare a preview with production.
- [502](https://github.com/BedrockStreaming/tech.bedrockstreaming.com/pull/502){:target="_blank"} deployed the Astro build to GitHub Pages.
- [503](https://github.com/BedrockStreaming/tech.bedrockstreaming.com/pull/503){:target="_blank"} gave the repo an Astro shape and removed Jekyll. It merged on 2 October 2026.

## An agent could take one phase

The inventory and the split are what made an agent useful. I could point it at one pull request and at the RFC. It did not have to rediscover that KaTeX was unused, or that a tag used once is not navigation.

The review question became whether this step matched the RFC.

## The redesign needs the team

Phase 2 is the restyle you are reading. The cutover kept the old look on purpose. This phase is the user-facing one. The team has to decide what to keep and what to add. The machinery can stay in the pull requests. The value of the blog is the writing.
