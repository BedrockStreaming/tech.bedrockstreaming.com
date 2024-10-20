# Contributing

## How to install the project?

### Using Visual Studio Code

1. Install Docker or Podman on your machine
2. Open the project in Visual Studio Code
3. Install the recommended [Remote Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension
4. When VS code prompts you, agree to "Reopen in Container"
5. The blog should be built, refreshed and opened in a preview tab automagically. ✨
    - If not, you can run the "Jekyll Serve" VS Code task manually.

### With Ruby and Gem

```shell
git clone https://github.com/BedrockStreaming/tech.bedrockstreaming.com.git
cd tech.bedrockstreaming.com
sudo gem install jekyll bundler
bundle install
```

Then run this command to run a dev server locally.
```shell
bundle exec jekyll serve
```

:warning: There are some issues to run this project on M1 archi for now.

### With docker

You can use docker to run the tech blog locally.

```shell
docker build -t tech-blog .
docker run -p 8080:8080 tech-blog 
```

## How to add an article to the blog?
 
All articles are listed in the `_posts` folder.
Each article is a Markdown file named like this `YYYY-MM-DD-article-slug.md` where date is the date of publication.
:information: If you put a future date of publication, your article won't be visible until this date is passed.

Make sure to complete the _frontmatter_ part of your Markdown file in order to define at least those attributes:

```markdown
---
layout: ../../../../../layouts/post.astro
title: Title of your article
description: Description of your article visible in search page results
author: author_of_your_article 
tags: [example, of, tags]
color: rgb(251,87,66) # this is Bedrock color here
---
```

We are using a community theme for Jekyll for this blog, you may find some useful examples here:
- [How to add Table of content for your blog post ?](https://sylhare.github.io/Type-on-Strap/2014/11/28/markdown-and-html.html)
- [How to customize the color used on a post page ?](https://sylhare.github.io/Type-on-Strap/2019/05/18/color-post.html)
- [How to use images in your post ?](https://sylhare.github.io/Type-on-Strap/2018/10/29/feature-images.html)
  You can store your images in _images/post_ folder of this repository.  
  Don't forget to compress them for performances with tools like [TinyPNG](https://tinypng.com/)
- [How to add code examples ?](https://sylhare.github.io/Type-on-Strap/2014/08/08/Markup-Syntax-Highlighting.html)
- [How to add simple Diagrams with _Mermaids_?](https://sylhare.github.io/Type-on-Strap/2019/11/02/Tech-stuff-example.html#mermaid)
  Mermaid is a really powerful tool to generate Diagram dynamically with some text.
  Check [Mermaid documentation](https://mermaid-js.github.io/mermaid/#/).

In order to add a new article, you should open a Pull Request on this repository.
A preview will automatically be deployed on AWS thanks to AWS Amplify service.

Don't hesitate to share your new post of **#proj-blog-tech-bedrock** slack room to ask for reviews from Bedrockers.
When you have 2 approves and no change requested, you can merge your Pull Request.

## Add an author

Edit `_data/authors.yml` to add an author (authors are sorted alphabetically).

Authors could have a `name`, a `url` and an `avatar` (which could be a distant file or an image hosted in the `images/avatar` directory).

Then you will be able to use the author ID in the frontmatter post configuration key named `author`.

## Add a LFT replay

1. Create a file in the `__post` folder name matching this format `YYYY-MM-DD-slug-of-your-article.md`
    Use the date the talk was first given in public.
2. Add the configuration of metadata at the beginning of this file
    > :warning: **To make your videos appear in either `Last Friday Talks`page, tag your post with `lft`.**
    ```markdown
    ---
    layout: ../../../../../layouts/video.astro
    # Unique ID of the Youtube video clip
    youtubeId: $$$$$$$ 
    # Title of the article
    title: Title of your article
    # Description (for SEO and context purpose)
    description: Description of your article visible in search page results
    # Authors of the article (can also be a list of authors such as: [first_author, second_author, third_author])
    # The complete list of valid author IDs is in `_data/authors.yml`
    author: author_of_your_article
    # Use tags for grouping content in the blog
    # Add `lft` to group with other LFT talks
    tags: [lft, and, other, tags]
    # Bedrock color
    color: rgb(251,87,66) 
    ---
    ```
3. Add content to the markdown file in order to add context to the video you are sharing.


## Add a conference

There are two ways to publish a conference where you were a speaker.
Please note that creating a post is more likely to help our external communication.

### Publish information about the conference

If you just want to add a conference presentation to the listed ones, you can add your presentation in `_data/conferences.yaml`.

List of the metadata allowed to add a new conference:

```markdown
- title: "Title of the conference"
  # Conference date
  date: 1970-01-01
  # from _data/authors.yaml
  author: conference_speaker 
  # Public event name
  eventName: ******
  # Url to redirect to the event site (optional)
  eventUrl: ******
  # Youtube video id (optional)
  youtubeId: ******
  # Slideshare presentation key (from iframe integration) (optional)
  slideshareKey: ******
  # Bedrock sponsored the event? (default: false)
  sponsored: true
  # Bedrock hosted the event? (default: false)
  hosted: true
```

That's all folks! Your conference will be displayed in "Meetups & Conferences" page. 
If there is a `youtubeId` key, the video will also be added to the "Replay" section.


### Create a post to present the conference

1. Create a file in `__post` folder name matching this format `YYYY-MM-DD-slug-of-your-article.md`
    Use the date the talk was first given in public.
2. Add the configuration of metadata at the beginning of this file:
    ```markdown
    ---
    layout: ../../../../../layouts/conference.astro
    
    # Title of the conference
    title: Title of your conference
    # Description of the page (for SEO and context purpose)
    description: Description of your article visible in search page results
    # from _data/authors.yaml
    author: conference_speaker
    # Public event name
    eventName: ******
    # Url to redirect to the event site (optional)
    eventUrl: ******
    # Youtube video id (optional)
    youtubeId: ******
    # Slideshare presentation key (from iframe integration) (optional)
    slideshareKey: ******
    # Bedrock sponsored the event? (default: false)
    sponsored: true
    # Bedrock hosted the event? (default: false)
    hosted: true
    
    # Use tags for grouping content in the blog.
    tags: [example, of, tags]
    # this is Bedrock color here
    color: rgb(251,87,66)
    ---
    ```
3. Add content to the markdown file in order to add context to the presentation you are sharing.
