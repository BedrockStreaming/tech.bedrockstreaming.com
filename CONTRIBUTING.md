# Contributing

The blog is built with [Astro](https://astro.build/). The Astro project is at the root of the repository, and the content lives in these folders:

- `_articles/`: the Articles, one Markdown file each.
- `_talks/`: the Talks (Last Friday Talks, meetups and conferences), one Markdown file each.
- `_data/authors.yml`: the Authors and Speakers.
- `_data/topics.yml`: the closed list of Topics.
- `images/` and `assets/`: static files, copied as is to the root of the site (`/images/...`, `/assets/...`).

## How to run the blog locally?

You need [Node.js](https://nodejs.org/) 22.12 or later (the CI and the previews use Node.js 26).

```shell
git clone https://github.com/BedrockStreaming/tech.bedrockstreaming.com.git
cd tech.bedrockstreaming.com
npm ci
```

Then run this command to start a dev server with live reload:

```shell
npm run dev
```

Open your browser on `http://localhost:4321` to see the blog.

:warning: The dev server does not serve `images/` and `assets/`: they are only copied when the site is built. To check your images, build the site and serve the result:

```shell
npm run build
npm run preview
```

The built site is written to `dist`.

Entries dated in the future are hidden. To show them, as the pull request previews do, set `SITE_PREVIEW=true`:

```shell
SITE_PREVIEW=true npm run dev
```

## How to add an article to the blog?

All articles are listed in the `_articles` folder.
Each article is a Markdown file named like this `YYYY-MM-DD-article-slug.md` where date is the date of publication.
Set `date` and `permalink` in the front matter: the publication date and the URL are not taken from the filename.

:information_source: If you put a future date of publication, your article won't be visible until this date is passed (and the site is rebuilt). It is visible in the pull request preview.

Complete the _front matter_ of your Markdown file with at least those attributes:

```markdown
---
layout: post
title: "Title of your article"
description: "Description of your article visible in search engine results"
author: [author_of_your_article]
language: en
date: 1970-01-01
permalink: /1970/01/01/article-slug.html
topics: [frontend]
---
```

- `layout` must be `post`.
- `language` is `fr` or `en`.
- `author` is an author ID from `_data/authors.yml`, or a list of IDs: `[first_author, second_author]`.
- `topics` is a list of keys of `_data/topics.yml`. It can be empty: `topics: []`.
- `permalink` is the URL of the article. By convention, use `/YYYY/MM/DD/article-slug.html`.

The front matter is checked when the site is built: a missing required attribute, an unknown attribute, a misspelled attribute or a Topic that is not in `_data/topics.yml` makes the build fail with an explicit error.

These optional attributes are also allowed:

```markdown
# Large image used when the article is shared on social networks
thumbnail: /images/posts/1970-01-01-article-slug/thumbnail.png
# Image displayed as the background of the article header
feature-img: /images/posts/1970-01-01-article-slug/header.jpg
# Old URLs that should redirect to this article
redirect_from:
  - /an-old-url/
# URL of the original article, if it was first published elsewhere
canonical: https://example.com/original-article
# Text displayed on the homepage instead of the first paragraph
excerpt: "A short introduction to the article."
# Marker ending the excerpt, if it should be longer than the first paragraph
excerpt_separator: <!--more-->
```

### Excerpt

The homepage shows an excerpt of each article: the `excerpt` attribute if it is set, otherwise the first paragraph of the article.
To show more than the first paragraph, set `excerpt_separator: <!--more-->` and put `<!--more-->` where the excerpt should stop.

### Images

Store the images of your article in `images/posts/YYYY-MM-DD-article-slug/` and link them with an absolute URL:

```markdown
![Description of the image](/images/posts/1970-01-01-article-slug/diagram.png)
```

Don't forget to compress them for performances with tools like [TinyPNG](https://tinypng.com/).

### Code examples

Use fenced code blocks with the name of the language, they are highlighted when the site is built:

````markdown
```javascript
console.log('Hello Bedrock');
```
````

### Diagrams with Mermaid

[Mermaid](https://mermaid.js.org/) generates diagrams from text.
Write the diagram in a `<div class="mermaid">`, without any blank line inside the `div` (a blank line ends the HTML block and the rest is read as Markdown):

```html
<div class="mermaid">
flowchart LR
    A[Source] --> B[Build] --> C[Site]
</div>
```

The Mermaid script is only loaded on pages that contain such a `div`.

### Table of contents

Put these lines where the table of contents should be displayed. It lists the headings of the article:

```markdown
* TOC
{:toc}
```

### Markdown syntax

Articles are written in [CommonMark](https://commonmark.org/help/) with the GitHub extensions (tables, strikethrough, task lists, autolinks). Some habits from other Markdown flavors don't work the same way:

- A line of raw HTML (such as `<br>`, `<hr>` or `</figure>`) starts an HTML block that runs until the next blank line: add a blank line after it before writing Markdown again.
- Put a single space after a list marker: `- item`, `1. item`.
- Tables need a header row, followed by the `| --- |` separator row.
- To open a link in a new tab, add `{:target="_blank"}` right after the link: `[Bedrock](https://www.bedrockstreaming.com/){:target="_blank"}`.
- `--` is rendered as an en dash (–) and `---` as an em dash (—).

### Publish your article

In order to add a new article, you should open a Pull Request on this repository.
The CI builds the site, and a preview (including future-dated entries) is automatically deployed on AWS thanks to AWS Amplify service.

Don't hesitate to share your new post of **#proj-blog-tech-bedrock** slack room to ask for reviews from Bedrockers.
When you have 2 approves and no change requested, you can merge your Pull Request.
Once merged on `master`, the site is built and deployed to GitHub Pages automatically.

## Add an author

Edit `_data/authors.yml` to add an author (authors are sorted alphabetically). The key is the author ID, usually the first letter of the first name and the last name:

```yaml
j_doe:
  name: Jane Doe
  avatar: /images/avatar/j_doe.jpg
  url: https://www.linkedin.com/in/jane-doe/
```

`name` is required. `avatar` (a distant file or an image hosted in the `images/avatar` directory) and `url` are optional.

Then you will be able to use the author ID in the `author` key of the front matter of your articles and talks.

## Add a topic

Topics are a small, closed list: prefer an existing topic from `_data/topics.yml`.
If a new one is really needed, add it to `_data/topics.yml` as `key: Label`, then use the key in the `topics` of the front matter.

## Add a LFT replay

1. Create a file in the `_talks` folder named `YYYY-MM-DD-slug-of-your-talk.md`.
    Use the date the talk was first given in public.
2. Add the configuration of metadata at the beginning of this file
    > :warning: **To make your video appear on the Last Friday Talks page, set `eventName: Last Friday Talks` and a `youtubeId`.**
    ```markdown
    ---
    layout: video
    # Unique ID of the Youtube video clip
    youtubeId: $$$$$$$
    # Title of the talk
    title: "Title of your talk"
    # Description (for SEO and context purpose)
    description: "Description of your talk visible in search engine results"
    # Speakers of the talk (can also be a list: [first_speaker, second_speaker])
    # The complete list of valid author IDs is in `_data/authors.yml`
    author: speaker_of_your_talk
    language: fr
    eventName: Last Friday Talks
    date: 1970-01-01
    permalink: /1970/01/01/slug-of-your-talk.html
    # Topics from _data/topics.yml
    topics: [frontend]
    ---
    ```
3. Add content to the markdown file in order to add context to the video you are sharing.

## Add a conference

There are two ways to publish a conference where you were a speaker.
Please note that adding some content is more likely to help our external communication.

All talks whose `eventName` is not `Last Friday Talks` are displayed in the "Meetups & Conferences" page.
If there is a `youtubeId` key, the video is also added to the "Replay" section.

### Publish information about the conference

If you just want the talk listed, add a Markdown file in `_talks` named `YYYY-MM-DD-slug.md`. The body can be empty.

```markdown
---
layout: conference
title: "Title of the conference"
date: 1970-01-01
author: conference_speaker
language: fr
eventName: "Name of the event"
eventUrl: https://example.com/event
permalink: /1970/01/01/title-of-the-conference.html
topics: []
---
```

That's all folks! Your conference will be displayed in "Meetups & Conferences" page.

### Create a post to present the conference

1. Create a file in the `_talks` folder named `YYYY-MM-DD-slug-of-your-talk.md`.
    Use the date the talk was first given in public.
2. Add the configuration of metadata at the beginning of this file:
    ```markdown
    ---
    layout: conference

    # Title of the conference
    title: "Title of your conference"
    # Description of the page (for SEO and context purpose)
    description: "Description of your talk visible in search engine results"
    # from _data/authors.yml
    author: conference_speaker
    language: fr
    # Public event name
    eventName: "Name of the event"
    # Url to redirect to the event site (optional)
    eventUrl: https://example.com/event
    # Youtube video id (optional)
    youtubeId: ******
    # Slideshare presentation key (from iframe integration) (optional)
    slideshareKey: ******
    # Link to the conference page (optional)
    conferenceUrl: https://example.com/event/talk
    # Bedrock sponsored the event? (default: false)
    sponsored: true
    # Bedrock hosted the event? (default: false)
    hosted: true

    # Topics from _data/topics.yml
    topics: [backend]
    date: 1970-01-01
    permalink: /1970/01/01/slug-of-your-talk.html
    ---
    ```
3. Add content to the markdown file in order to add context to the presentation you are sharing.

The Slides (`slideshareKey`) and the conference link (`conferenceUrl`) are only displayed with `layout: conference`.

## Redirect an old URL

To keep an old URL working after changing a `permalink`, list the old URLs in `redirect_from`, in the front matter of the article or talk:

```markdown
redirect_from:
  - /an-old-url/
  - /2019/01/01/an-older-url.html
```

Each old URL serves a small page that redirects to the new one.
