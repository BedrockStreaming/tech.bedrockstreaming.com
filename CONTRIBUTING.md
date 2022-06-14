# Contributing

## How to install the project?

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
layout: post
title: Title of your article
description: Description of your article visible in search page results
author: author_of_your_article 
tags: [example, of, tags]
color: rgb(251,87,66) # this is Bedrock color here
---
```

We are using a community theme for Jekyll for this blog, you may find some usefull examples here:
- [How to add Table of content for your blog post ?](https://sylhare.github.io/Type-on-Strap/2013/12/12/Generate-a-table-of-content.html)
- [How to customize the color used on a post page ?](https://sylhare.github.io/Type-on-Strap/2019/05/18/color-post.html)
- [How to use images in your post ?](https://sylhare.github.io/Type-on-Strap/2014/11/29/feature-images.html)
  You can store your images in _images/post_ folder of this repository.  
  Don't forget to compress them for performances with tools like [TinyPNG](https://tinypng.com/)
- [How to add code examples ?](https://sylhare.github.io/Type-on-Strap/2014/08/08/Markup-Syntax-Highlighting.html)
- [How to add simple Diagrams with _Mermaids_?](https://sylhare.github.io/Type-on-Strap/2013/11/02/Tech-stuff-example.html#Mermaid)
  Mermaid is a really powerful tool to generate Diagram dynamically with some text.
  Check [Mermaid documentation](https://mermaid-js.github.io/mermaid/#/).
- How to add an author ? 
  Edit `_data/authors.yml` file to add an author directly in the Yaml file.
  Author could have a name, an URL and an avatar (which could be a distant file or an image hosted in _images/author_ directory).
  Then use the author id in the post frontmatter configuration key named `author`.

In order to add a new article, you should open a Pull Request on this repository.
A preview will automatically be deployed on AWS thanks to AWS Amplify service.

Don't hesitate to share your new post of **#proj-blog-tech-bedrock** slack room to ask for reviews from Bedrockers.
When you have 2 approves and no change requested, you can merge your Pull Request.


## How to add the replay of your conference, meetup or LFT ? 


1. Create a file in `__post` folder name matching this format `YYYY-MM-DD-slug-of-your-article.md`
   Use the date the talk was first given in public.
2. Add the configuration of metadatas at the begining of this file

> :warning: **If you want to make your video visible in the `Meetup & Conferences` page, usage of tag `conference` is mandatory.**

```markdown
---
layout: video
# Unique Id of the youtube video clip
youtubeId: $$$$$$$ 
# Title of the article
title: Title of your article
# Description of the page (for SEO and context purpose
description: Description of your article visible in search page results
author: author_of_your_article 
# Use tags for grouping content in the blog. Use at least `lft` to group with other lft talks or `conference` for meetup or conferences
tags: [example, of, tags]
# this is Bedrock color here
color: rgb(251,87,66) 
---
```

3. Add content to the markdown file in order to add context to the video you are sharing.



