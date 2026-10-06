---
layout: post
title: "Migrating the blog from Jekyll to Astro"
author: [j_poissonnet]
thumbnail: /images/posts/2026-10-05-migrating-the-blog-from-jekyll-to-astro/thumbnail.jpg
language: en
date: 2026-10-05
permalink: /2026/10/05/migrating-the-blog-from-jekyll-to-astro.html
topics: [architecture]
---

We moved the blog framework from Jekyll to Astro. It took a while and multiple attempts, but applying how we work at Bedrock when we do migration is what made it work.

## More than a decade of Jekyll.

People write articles on this blog since 2012 and still publish some articles from time to time. The problem is that Jekyll works with Ruby, which is a language that nobody uses daily in our teams. It became hard to maintain as the people who knew how it works were not here anymore. The developer experience of writing an article was hard for new-comers as it required to use docker and devcontainers to work locally. That made people rely on previews, with the configuration outside of the repo.

The theme we were using had not been updated since. We used `type-on-strap` , which started to look a bit dusty and not aligned with our brand anymore.

The posts had more than 300 distinct tags, and 200 of them were used once, which made them irrelevant for browsing. 

> `php`, `PHP`, and `Php` were three tags.

In conclusion, time had passed and it made some problems appear. The question to replace Jekyll with a framework more modern to enable a better developer experience, and a do some cleanup to have a better user experience starting to get popularity. 

## It was time to meet Astro

[Astro](https://astro.build) is a web framework made for content sites. For the people writing, it runs on JavaScript, the language some of our teams already use, so maintaining the blog no longer meant learning Ruby or opening a container just to reread a paragraph. Articles metadata are checked when the site builds, so a mistake in the metadata fails the build instead of showing up wrong on the page, and prevents from ending up with ~300 tags ;-)

That improvement stays on our side of the site. A reader still gets static HTML, the same way they did with Jekyll, and JavaScript is only sent on the pages that actually need it. The developer experience gets closer to the rest of our work. The page a visitor opens stays a page, with room afterwards to clean the tags and the theme.

## Two attempts, in vain

With the hope of migrating the blog and the will to learn about Astro, a first attempt was made in November 2024 in one go. At that time the previews were too mysterious to for the apprentice – me – to work. A fork on Vercel was the preview, hard to review, hard to consider merging... Obviouslly the first comment was **"No preview?"** A lot of things were missing or broken, and maintaining the fork on another repo, while people continued to write articles were really hard. The time dedicated to the blog being sparsed over the year, the first attempt was abandoned.

In May 2026, we [tried again](https://github.com/BedrockStreaming/tech.bedrockstreaming.com/pull/484). That time, another approach was taken: heavy AI-usage and the will to make the blog look identical to the Jekyll version. Thirteen commits, one pull request against `master`, keeping everything as it was. It faced similar problems of maintenance, and since it had no previews the reviews were hard to get and it never made it on production.

## Applying Bedrock methods

At Bedrock we have teams that are used to do technical migrations. We applied their method by opening the first Read For Comments (RFC) of the repository: [RFC 0001](https://github.com/BedrockStreaming/tech.bedrockstreaming.com/pull/488). The point was to make a plan that could be stopped by someone and started again by someone else.

We treated the blog the way we treat an application that already has users. We made what we call a Phase 0 to prepare the live Jekyll site so the later cut is as small as possible. By working on the current site to clean it, we enabled the possibility for people to continue contributing.

We started by cleaning features not needed or too coupled with Jekyll, we split posts into articles and talks, backfilled articles to have the right metadatas and clean the tags.

## The cutover was a stack

Astro was bootstrapped beside Jekyll so that the revert was easy to make. The first step was to make the previews work for Astro so that everything kept being readable. Jekyll stayed the source of truth until the last step and its assets and styles were used by Astro. 

Then we made another pull request to make the production Astro so that the impact of the end-user was contained in one commit and easy to undo.

The last step was to give the repo an Astro shape and remove Jekyll, concluding the technical modernisation.

## What made it work

The two attempts failed for the same reason. They tried to move the whole blog in one pull request, with no preview people could trust, while articles were still being written. A change that big is hard to review, and hard to leave and come back to.

What worked was the way we migrate anything else that already has users. A plan someone else can pick up, a cleanup on the live site so people could keep publishing, then a cutover in small steps that we could revert. Writers now work in JavaScript, with metadata checked at build time. Readers still open a static page. The technical move is done.

To wrap it up, let me quote the villain in John Wick 4

> how you do anything is how you do everything - Marquis de Gramont

And at Bedrock we make it work with method, and that's how the migration succeeded.