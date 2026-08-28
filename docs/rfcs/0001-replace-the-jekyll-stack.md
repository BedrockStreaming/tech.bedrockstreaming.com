# RFC 0001: Replace the Jekyll stack with Astro

- **Status:** Proposed
- **Author:** Jules Poissonnet (`j_poissonnet`)
- **Created:** 2026-08-28
- **Comments close:** 2026-09-25
- **Tracking issue:** #488

## 1. Summary

Move the blog from Jekyll to Astro, reshape the content into two collections (Article and Talk), replace free-form tags with a small curated list, and redesign the site. Old articles keep working because we normalise the existing markdown files once, in place, before switching build tools.

Three things drive this. Nobody on the team can maintain the Ruby toolchain. Local setup fights people. The site looks like the 2018 theme it is.

## 2. What changes if you write for the blog

The file convention does not change. You still add a markdown file, open a PR, get two approvals, merge. 
What changes is working locally is easier, front matter gets validated with a readable error instead of silently rendering wrong, and there are fewer keys to remember.

## 3. What exists today

### Types of posts

`_posts/` holds 311 files, in three shapes:

| `layout` | Count | Body size |
|---|---|---|
| `post` | 214 | full articles |
| `video` | 61 | 1 to 12 non-blank lines. 33 of them have exactly 2 |
| `conference` | 33 | mostly 1 to 6 lines |


### Conference data

`_data/conferences.yaml` holds another 27 talks. 
`_layouts/conference-list.liquid` concatenates it with the conference posts and treats both identically, reading the same fields off each. The only difference is that a post has a URL and a YAML row falls back to a YouTube link.

### Tags

Tags are not a taxonomy. 333 distinct values, 196 are used exactly once. `php`, `PHP` and `Php` are three different tags, as are `js`, `JS`, `javascript` and `JavaScript`. 
The three most common tags are `conference` (103), `lft` (70) and `video` (23), which encode the content type rather than the subject.

### I18n

Content is bilingual with no mechanism for it. 86 posts declare `language`, 19 declare `lang`, and roughly 200 declare nothing. There is exactly one translation pair, from 2015.

### Theme

The theme is forked and remote at the same time. `type-on-strap.gemspec` declares a local copy of Type on Strap 2.4.0 while `_config.yml` sets `remote_theme: sylhare/Type-on-Strap`. Every layout, include and stylesheet is overridden locally. Tracking upstream is not possible.

### Features

Three feature flags cost every visitor something:

- `mermaid: true` loads a 2.5 MB `mermaid.min.js` on every page. Two posts use Mermaid.
- `katex: true` loads a 264 KB `katex.min.js` on every page. No post uses KaTeX.
- Search builds one JSON file containing the HTML-stripped body of all 311 posts, downloaded whole by anyone who opens `/search/` and scanned with a substring match.

`jquery-1.9.1.min.js` is vendored in the repo. `images/` is 369 MB.

## 4. Goals

- Replace Ruby with easier-to-use toolchain.
- Keep every existing article readable, with its code, diagrams and embeds intact.
- Make the content model clearer, so `/talks/` and `/topics/` follow from the data instead of from tag conventions.
- Cut the payload. No 2.5 MB diagram library on pages with no diagrams.

## 5. Non-goals

- Changing the author experience
- Handling i18n better adding pages per-locale (`/fr/`, `/en/`)
- No move off GitHub Pages for production.

## 6. Decisions

Comment on the specific decision you disagree with rather than on the document as a whole.

### 6.1 Two collections: Article and Talk

An Article is written to be read. A Talk is a record of something that happened, and carries a required `event`. "Last Friday Talks" becomes an event value alongside "LyonJS Meetup" and "Devoxx France".

`video` and `conference` differ by exactly one field. All 61 video posts have a `youtubeId` and none has an `eventName`. 31 of 33 conference posts have both. That is a nullable field, not a second content type. And `lft` is not a reliable marker either: 12 full articles carry the tag without being talks.

This also removes the duplication with `_data/conferences.yaml`. A talk with no write-up is a Talk with an empty body, not a YAML row.

Rejected: keeping three kinds, on the grounds that the LFT page and the conference page have different owners and cadences. The coordination cost is real but smaller than maintaining two storage formats for one concept.

### 6.2 Curated Topic list instead of free-form tags

Roughly 10 to 15 Topics, validated at build time. An unknown Topic fails the build. The 333 existing tags get mapped onto the list during normalisation. Structural tags (`conference`, `lft`, `video`) and year tags (`2024`, `2019`) disappear with the model change.

A tag used once is not navigation, it is a keyword nobody will click. 196 of the 333 fall in that bucket.

The list itself is not settled. See section 10.

Rejected: normalising case and merging synonyms **while staying free-form**. It fixes the duplicates but leaves a 200-item long tail that still cannot be browsed.

### 6.3 Language is a required attribute, on one feed

Every Article and Talk declares `language: fr | en`. The roughly 200 undeclared posts get backfilled during normalisation. 

Site chrome stays English. Each page sets `<html lang>`, and listings show a visible language badge so readers are not surprised by a French article behind an English title.

No URL split, no language switcher, no translation pairs. This closes #366 by deciding the smaller version of it.

Rejected: full i18n with `/fr/` and `/en/` trees. Correct in principle, unjustifiable against one translation pair from 2015.

> [!NOTE]
> This might be the subject of a future RFC to discuss how we handle both French historic articles and English-as-default.

### 6.4 Bylines stay flat and display-only

`_data/authors.yml` keeps its current shape: `name`, optional `url`, optional `avatar`. 122 entries, 118 of them referenced by posts, including one company entry and four team entries.

60-odd contributors have written exactly one piece.

### 6.5 Articles are the front door, Talks are a section

The homepage lists Articles chronologically with a short recent-talks strip. `/talks/` becomes browsable by event and year, absorbing today's `/lft/` and `/meetup-conference/`. `/feed.xml` carries Articles, with a separate talks feed.

Today 121 two-line stubs share the homepage feed, the RSS feed and the search index with 214 real articles. That buries the writing, which is the point of the blog.

### 6.6 Normalise the legacy files once, in place

One migration commit rewrites the existing posts into a easier-to-migrate form. 

- `{% highlight lang %}` blocks become fenced code blocks
- `{% post_url %}` becomes a relative link
- iframes and gist `<script>` tags become components
- `<center>`, `<br>` and `<ins>` become semantic markup
- front matter keys are unified, empty `category` keys are dropped, and image references are rewritten.

After this the corpus is plain markdown plus a known component set. No compatibility shim has to understand Liquid forever.

Rejected: shipping shims for `{% highlight %}` and the legacy keys. It defers the work indefinitely and every future tooling change pays the tax again.

Rejected: snapshotting the old posts as frozen HTML. It makes 311 articles permanently unmaintainable.

### 6.7 A blessed component set, and no raw script in article bodies

Components for YouTube, Slides, Vimeo, Gist, Tweet, asciinema, Mermaid, Callout and Figure. The pipeline forbids raw `<script>` in content after normalisation.

The raw HTML in old posts is almost entirely embeds: 93 YouTube iframes, 26 SlideShare, 19 gist scripts, 6 Vimeo, 4 Twitter, 4 Google Docs, 2 asciinema. 

Several relative script paths (`scripts`, `bower_components`, `config.js`, `app.js`) are already broken on the live site and get removed.

Mermaid renders to inline SVG at build time. Two posts stop costing every visitor 2.5 MB.

### 6.8 Redesign URLs, 301 from everything

Adopt one coherent scheme and emit permanent redirects from all current URLs, including the 119 hand-written permalinks. Some of those are Tumblr-era paths like `/post/23664141031/lancement-du-blog-technique-dm6web`.

Preserving them forever means the new site inherits three URL generations. The scheme itself is not settled. See section 10.

### 6.9 Pagefind for search

Pagefind indexes the built HTML after the build and ships a sharded index, so a browser fetches only what a query needs. It is stack-agnostic, needs no server, and works with Jekyll too, which means we can adopt it before the port.

This replaces a single JSON file containing the full text of every post.

Rejected: a hosted service (Algolia, Typesense). Better relevance, but it adds cost, an external dependency, credential handling and an indexing step in CI

### 6.10 Images stay in git, optimised at build

Colocate images with their article and run them through Astro's image pipeline for responsive `srcset`, AVIF and WebP, lazy loading and explicit dimensions. Optimise the existing 369 MB during normalisation and fix the 3 broken references. Delete unreferenced files.

Keeping images in git keeps PR previews simple and adds no external dependency. If the repo becomes painful to clone later, moving to object storage is a reversible change.

### 6.11 Astro

Content Collections give the validated front matter this RFC asks for, with separate `articles` and `talks` schemas. MDX gives the component set. remark and rehype plugins do the normalisation and the build-time Mermaid rendering. Nothing ships to the browser by default, so the theme toggle is the only client-side island. Output is static, so GitHub Pages still works.

Rejected: Next.js. The team knows React and the ecosystem is stronger, but it ships a runtime for a static blog and static export needs care for no gain here. 
Rejected: Hugo, which is fast and has native taxonomies but has far less active community and less nice DX.
Rejected: Eleventy, mature and flexible but with no built-in schema validation and shortcodes instead of components.

### 6.12 GitHub Pages for production, Amplify for previews, both in Terraform

Production deployment stays as it is. PR previews go to AWS Amplify, defined in Terraform rather than configured in the console. `CONTRIBUTING.md` already claims Amplify previews exist and no workflow provides them, so this makes the documentation true.

### 6.13 Normalise inside Jekyll first, then port

Phase 0 does as much as possible against the live Jekyll site, in small reviewable PRs. Phase 1 swaps the build tool on already-clean content. Phase 2 redesigns.

Most of the target is expressible in Jekyll: collections, per-collection permalinks with `jekyll-redirect-from`, code fences, front matter changes, a CI validation script, and Pagefind. 
What is not: build-time Mermaid, the image pipeline, and typed validation with readable build errors.

We deliberately skip building Jekyll `_includes` for the embed components, because that work would be thrown away at the port.

### 6.14 Clean slate on visual design

> [!NOTE]
> This can be discussed in another RFC, but some visual features would benefit from being considered early in the process

Nothing in the current design is assumed to survive. Dark mode, parallax headers, per-post accent colour, hero images, share buttons, Font Awesome, the three competing image fields: each gets decided during design rather than carried forward by default.

### 6.15 Dropped features

- **Comments.** 192 posts set `comments: true` and no engine has ever been configured. The flag is dead.
- **Share buttons.** Mobile share sheets and copy-link cover this.
- **KaTeX.** Enabled, 264 KB per page, used by nothing.
- **Portfolio collection, image gallery, `citation` and `biblio.yaml`, `aligner`.** Unused by any post.
- **Per-post `color`.** 168 posts set it, all to the same value.
- **jQuery, fitvids, Modernizr, Masonry.**
- **`category`.** Present on 154 posts, empty on 149 of them, with 5 real values total.

Kept: `/feed.xml` (301 if the path moves), Matomo as configured, `/oss/`, `/jobs/`, and the `sponsored` and `hosted` flags on Talks, rendered as labels rather than as star and house emoji.

## 7. Domain model

Terms are defined in [`CONTEXT.md`](../../CONTEXT.md): Article, Talk, Event, Last Friday Talks, Recording, Slides, Topic, Language, Author, Speaker.

The vocabulary matters here because the current code mixes it. A talk is a "video" in one layout, a "conference" in another and a "replay" in a third, and `_data/conferences.yaml` calls the same thing a row.

## 8. Migration plan

### Phase 0, in Jekyll

Each item is a separate PR against the live site.

1. Amplify PR previews, defined in Terraform.
2. CI script validating front matter, so later PRs fail loudly.
3. `_articles` and `_talks` collections, absorbing `_data/conferences.yaml`.
4. Topic taxonomy: agree the list, then map the 333 tags onto it.
5. Backfill `language` on the undeclared posts, drop `lang` and `other_language`.
6. `{% highlight %}` to fenced blocks, `{% post_url %}` to relative links.
7. URL scheme with `jekyll-redirect-from` for the 301s.
8. Image optimisation and reference rewrite, including the 3 broken ones.
9. Pagefind replacing `simple-jekyll-search`.
10. Delete the dropped features from section 6.15.

### Phase 1, port to Astro

Content is already clean, so this is mostly templating: collection schemas, the component set, build-time Mermaid, the image pipeline, then delete Jekyll, the gemspec, the Gemfile, the Dockerfile and the devcontainer.

### Phase 2, redesign

Design and build the new visual identity.

## 9. Risks and accepted trade-offs

**No reference build survives the cutover.** We check normalisation and iterate after launch rather than build a content-fidelity diff harness against the current output. If a systematic bug in the rewrite surfaces in six months, Jekyll will be gone and git history is the only reference.

**301 redirects are hard to undo.** Once the redesigned URLs are live and indexed, reverting means a second round of redirects. Getting the scheme right before Phase 0 item 7 matters more than shipping it quickly.

**The normalisation touches nearly every file.** One commit rewriting 300 files is difficult to review closely. Splitting it by transformation type would help, and is worth reconsidering when we get there.

**Topic mapping is judgement, not mechanics.** Mapping 333 tags onto 15 Topics needs editorial opinion, and some articles will land in a Topic their author might not have picked.

**Two deployment targets.** Production on GitHub Pages and previews on Amplify means two things to keep working, and a preview that diverges from production is worse than no preview.

**369 MB stays in git history.** Optimising the files going forward does not shrink past commits. Every clone keeps paying.

## 10. Unresolved questions

1. **What are the Topics?** The closed list is agreed in principle and empty in practice. Needs a proposal and an argument.
2. **What is the new URL scheme?** Candidates include `/blog/<slug>/`, `/articles/<slug>/` and keeping a date segment. Undecided, and it blocks Phase 0 item 7.
3. **What happens to `/blog/page:num/`?** The IA change may remove pagination entirely in favour of a single browsable index.
4. **Does the talks feed exist?** Section 6.5 assumes one. Should we do so? 
5. **Who champions this? How do we manage this roadmap?** Phase 0 is ten PRs and needs an owner.

## Appendix: measured inventory

<summary>
All figures measured on the repository at 2026-08-28.
  <details>

### Front matter keys across 311 posts

    | Key | Count | Key | Count |
    |---|---|---|---|
    | `title` | 307 | `eventName` | 32 |
    | `tags` | 307 | `eventUrl` | 32 |
    | `layout` | 307 | `image` | 25 |
    | `author` | 306 | `lang` | 19 |
    | `description` | 296 | `redirect_from` | 18 |
    | `comments` | 196 | `sponsored` | 9 |
    | `color` | 168 | `hosted` | 4 |
    | `category` | 154 | `canonical` | 4 |
    | `permalink` | 119 | `slideshareKey` | 3 |
    | `thumbnail` | 114 | `conferenceUrl` | 3 |
    | `youtubeId` | 91 | `other_language` | 2 |
    | `language` | 86 | `excerpt` | 2 |
    | `feature-img` | 82 | `cover` | 1 |

    `comments: true` on 192 of the 196. `category` empty on 149 of the 154.

### Tags

    333 distinct values. 196 used once, 55 used twice, 49 used five times or more.

    Most common: `conference` 103, `lft` 70, `tech` 63, `php` 39, `afup` 33, `react` 28, `javascript` 28, `cloud` 26, `video` 23, `kubernetes` 22, `webperf` 20, `humour` 20, `devfacts` 20, `aws` 18.

    Case and synonym duplicates: `php`/`PHP`/`Php`, `js`/`JS`/`javascript`/`JavaScript`, `kubernetes`/`Kubernetes`/`k8s`, `symfony`/`Symfony`, `react`/`React`, `open-source`/`opensource`/`oss`/`OSS`, `kubecon`/`KubeCon`.

### Liquid in post bodies

    `{% highlight %}` 88 posts. `{% post_url %}` 4 posts. No `{% include %}`, no `{% twitter %}`, no kramdown attribute lists.

### Raw HTML in post bodies

    74 posts contain HTML. Tag counts: `<a>` 178, `<iframe>` 157, `<center>` 92, `<br>` 80, `<script>` 56, `<img>` 54, `<div>` 29, `<ins>` 23, `<blockquote>` 18, `<video>` 7, `<figure>` 4.

    iframe hosts: youtube.com 85, relative or empty 25, fr.slideshare.net 17, www.slideshare.net 9, youtube-nocookie.com 8, player.vimeo.com 6, docs.google.com 4, giphy.com 2, one Vercel-hosted Remotion player.

    script sources: relative or empty 23, gist.github.com 19, platform.twitter.com 4, `scripts` 2, `bower_components` 2, asciinema.org 2, `config.js` 1, `app.js` 1. No inline `<script>` without a `src`.

### Diagrams and maths

    Mermaid in 2 posts, all as `<div class="mermaid">`, using `flowchart` and `sequenceDiagram`. One file contains `$$`. `mermaid.min.js` is 2.5 MB and `katex.min.js` is 264 KB, both loaded site-wide.

### Data files

    `_data/authors.yml`: 122 entries, 45 with `url`, 42 with `avatar`, comprising one company entry, four team entries and the rest people. 118 distinct author IDs referenced by posts.

    `_data/conferences.yaml`: 27 entries, dated 2015-05-13 to 2025-04-30.

### Images

    `images/` is 369 MB across 886 files. Largest groups: `images/posts/imgob` 149 files (a Tumblr-era dump), `images/avatar` 41, `images/posts` 38. 3 absolute image references in posts point at files that do not exist.

### Build

    Jekyll 4.3.3, kramdown 2.4.0, Rouge 4.3.0. CI uses Ruby 3.3, the Dockerfile uses Ruby 3.1. Plugins: `jekyll-paginate`, `jekyll-seo-tag`, `jekyll-feed`, `jekyll-redirect-from`, `jekyll-twitter-plugin`. No sitemap plugin, so the site has no sitemap.

    `type-on-strap.gemspec` declares Type on Strap 2.4.0 locally while `_config.yml` sets `remote_theme: sylhare/Type-on-Strap`. 11 layouts and every include and stylesheet are overridden locally.

    Deployment: `JamesIves/github-pages-deploy-action@v4.3.4` on push to `master`. PR CI builds only. A PR size labeller runs on every PR. `paginate: 10`, `paginate_path: /blog/page:num`.

    `_posts/` is 2.8 MB of markdown. `assets/js/vendor/` includes `jquery-1.9.1.min.js`, `modernizr-2.6.2.custom.min.js`, `masonry.pkgd.min.js` and `simple-jekyll-search.min.js`.

  </details>
</summary>


