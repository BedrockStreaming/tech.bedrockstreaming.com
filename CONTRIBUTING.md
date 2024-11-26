# Contributing

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)

## 🔧 How to install the project?

```shell
git clone https://github.com/BedrockStreaming/tech.bedrockstreaming.com.git
cd tech.bedrockstreaming.com
pnpm install
```

Then run this command to run a dev server locally.

```shell
pnpm dev
```

## 📝 How to add an article to the blog?

All articles are listed in the `src/content/posts/YYYY/MM/DD` folder structure where date is the date of publication.

Make sure to complete the _frontmatter_ part of your Markdown file in order to define at least those attributes:

```markdown
---
layout: ../../../../../layouts/post.astro
title: Title of your article
description: Description of your article visible in search page results
author: author_of_your_article 
tags: [example, of, tags]
---
```

The _frontmatter_ is configured through a [Zod](https://zod.dev/) schema in `src/content/config.ts`.

In order to add a new article, you should open a Pull Request on this repository.
A preview will automatically be deployed on AWS thanks to AWS Amplify service.

Don't hesitate to share your new post of **#proj-blog-tech-bedrock** slack room to ask for reviews from Bedrockers.
When you have 2 approves and no change requested, you can merge your Pull Request.

## ✍️ Add an author

Add a `<author_id>.json` file in `src/content/authors` folder. You can check the `src/content/authors/bedrock.json` file
as an example. You can add the avatar image in the same folder for it to be referenced like `./<images>.jpg` in the author json file.

Authors could have a `name`, a `url` and an `avatar` (which could be a distant file or an image hosted in the directory).

Then you will be able to use the author ID in the frontmatter post configuration key named `author`.

ℹ️ the site will keep you from building if you use an author ID that does not exist.

## ↩️ Add a LFT replay

Similar to adding an article, you can add a Last Friday Talk replay to the blog by adding a markdown file in the `src/content/lfts/YYYY/MM/DD` folder structure.
The most different parts are: 
- that you should use the `lft.astro` layout instead of the `post.astro` layout.
- you should add a `youtubeId` key in the frontmatter to embed the video in the page and get the thumbnail.

Here is an example of an LFT frontmatter
```markdown
---
layout: ../../../../../layouts/video.astro
title: "Le LFT du LFT - PUB LFT #LFT 02/02/24"
description: ""
author: team_lft
tags: [lft, tech]
color: rgb(251,87,66)
youtubeId: UgOFZmOJOmo
```

## 🎤 Add a conference

Similar to adding an article, you can add a conference to the blog by adding a markdown file in the `src/content/conferences/YYYY/MM/DD` folder structure.
Here is an example of a conference frontmatter
```markdown
---
title: "Projet XState"
author: m_blanc
description: "La gestion d'état applicative est une notion complexe et fondamentale (donc passionnante) des applications web modernes. Pour garder le contrôle de votre application, venez découvrir XState, un moteur d'états reposant sur le concept de machines à états finis."

eventName: LyonJS Meetup
eventUrl: https://www.meetup.com/fr-FR/lyonjs/events/290762638/
youtubeId: HWRQp2Y1rbw
sponsored: true
hosted: true

tags: [xstate, lyonjs, meetup, react, javascript, conference]
comments: true
color: rgb(251,87,66)
language: fr
---
```

Your conference will be displayed in "Meetups & Conferences" page.