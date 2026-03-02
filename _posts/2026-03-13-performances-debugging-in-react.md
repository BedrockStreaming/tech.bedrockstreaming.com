---
layout: post
title: "The 101 of Performance Debugging in React !"
description: "Some basic tips & tricks for React performances, to always have a faster Web App !"
tags: [performance, cytron, quality, frontend, ownership, web, tech]
author: [e_doyon]
color: rgb(251,87,66)
language: en
thumbnail: "/images/posts/2026-02-06-web-homologation-as-app/homologation_qa_web_10.jpg"
---

The web is a very vast place, composed of tons and tons of different websites. It is probably not a lie to say that a website exists for literally anything you can think of: From religions about flying spaghettis, to voting contests of the sexiest bird, you can literally find anything. However, it also means one thing: Whatever your website has, another has too.

Therefore, nowadays on the internet, it is vital to have a website that is the best it can be: Easy to use, easy to find, easy to navigate.... But also fast to load. And that's where this article comes in! 

Everyone deserves the chance to see the program they want to, from those who have a custom-built computer capable of lightning loading speeds, to that user who never changed their phone since the year 2000 but still wishes to go on the internet. But how do we make sure that everyone can see and use the content that they want ?

In this article, we'll talk about performances on the web and in React: Why does it matter now more than ever, a couple of easy ways to improve performances on your website without bothering too much, as well as some more advanced tips & tricks to track even the most nasty issues. 

---

## 🚄 Performance is key 

At Bedrock, Streaming we have always fostered a place of choice for performances topics. That's why we go to conferences about this topic (Such are [Performance.now()](https://tech.bedrockstreaming.com/2025/11/18/performance-now-2025.html), or [We Love Speed](https://tech.bedrockstreaming.com/2024/10/29/we-love-speed-2024.html)), and often publish about [the work we do on this topic](https://tech.bedrockstreaming.com/2024/11/22/tvjs-scroll-performance-enhancement.html). But why is performance so crucial?

First and foremost, it matters to users. The longer a website takes to load and to respond to an user's input, and the higher is the likelihood that this user will leave the page: [Mozilla talks about the "Under a second rule"](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_long_is_too_long), while Google says that on mobile [53% of users leave if the website takes more than 3 seconds to load](https://blog.google/products/adsense/the-ultimate-mobile-page-speed-infographic/).

Speaking of Google, we can also mention the importance of performances on _Search Engine Optimization_, or SEO! Mentioned as [one of the keys to improve your results in the Google Search algorithm](https://search.google.com/search-console/about), famous under the name of _Core Web Vitals_, it's one of the keys to measure the speed & responsiveness of a website and it has heavy impacts on the indexation on your website. Do you want the product of your work to be easily found online? Then you **NEED** to take care of your performance.

###### --- TODO: PARLER DE ECOCONCEPTION ---

But how ?

---

## 💡 Some easy ways to improve performances

One bad thing about performance is that every little thing adds up. Every time you add a new image to your page, every new block of text you display, adds up a tiny little bit to your loading time, adding up a new URL for the browser to contact, a little bit of content to download before the page can be displayed...

However, one good thing about performance, is that every little thing adds up! Every time you fix a little brick in your code, the performance of your application improves, the overall experience gets better and your users will be happier. We will talk in this first part about a few ways to easily earn some points on your _Core Web Vital_ scores, with overall minimum efforts while still achieving improvements!

### 🖼️ Image-ine a faster website...

First and foremast, let's talk about the elephant in the room... Literally. More often than not, when checking what is the biggest content on website, images will win by very, very far. It's why it's important to check what can we do to improve on this side!

Now, there are multiple ways to go around it, and we'll talk about a few of them:
- Using the HTML attribute `loading="lazy"` on a `<img />` element will make it so that a browser knows that the image is not important, and will delay its priority, making sure that the network can first focus on downloading what actually matters
  - Do mind however not to abuse that property! If everything is lazy, then nothing will be anymore, as the browser won't know what to prioritize. Make sure to only apply lazy-loading to content that you actually want to delay!
- In the opposite way, you can also use the property `fetchpriority="high"` to indicate that a given resource of your website is very important, and should be loaded as soon as possible. This can be useful to quickly download & display what you need as fast as possible!
  - However, here again, use this with parsimony. Having too many prioritized things can actually slow down the network, preventing it from downloading other stuff that it might actually need.
- Use accurate image sizes. I recently saw a website where a little heart ❤️ emoji was actually downloaded as a 300x300 image. If you're not planning to display your image very big, do not download it very big either!
  - Here again, don't overdo it! Make sure to download the size you will actually need, but don't aim for too small, otherwise your images might appear pixelated for your end users.
- Have your images in the best format possible, such as `svg` for icons or images with not a lot of details, and `webp` for others. 
  - Do keep in mind however, the never-ending topic of backward compatibility! For example, Internet Explorer does not support `webp` images; So if your website needs to cater to its need, you will need to find alternatives!

Lazy-loading of images & contents (Infinite-like scrolling for catalog apps)
fetch priority for images

### 🤖 Better, faster, smaller?

Despite trying to display your images and your content more efficiently, one solution still remains: Not having to display them at all. 

At Bedrock Streaming, we build streaming websites, so often a single page can contain a lot of content: Rows upon rows of programs, with each their own metadata, image, buttons and options. But do we really have to display them all at the same time, as soon as the user opens the website? This is where Vertical Pagination comes in!

The idea is actually quite simple: No user sees the whole page at the same time, therefore we shouldn't retrieve & display everything at the same time either. What we do instead, is watch for the scroll position of the user within the page instead. While they scroll down the page, looking for their next program, we silently load the content that will be displayed below what they're seeing: This way, quite similar to "Infinite scrolling algorithm", the user is always seeing something new (Although our pages aren't exactly infinite, and will eventually run out of content to load).

However, this solution also has some caveats:
- Since the whole page isn't loaded, then an user who already knows what they're looking for might search within the page using Ctrl+F (Or Cmd+F on iOS). But since the content might not be loaded yet, the content might not be found within their page yet!
  - A potential solution would be to either have an easy-to-access Search Page, or a good enough SEO that the user would find the program directly from their Google search!
- Another issue might arise with Server-Side Rendering and Google crawlers, who do not have Javascript enabled. Without JS, they will not be able to load more and more content as they go further down, thus reducing the discoverability of your content!
  - The solution is highly differing based on the type of content you serve. Maybe you want to display everything on Server-Side but not on Client-Side (But it would then bloat your Server response)? Maybe you want to watch out and display everything for google bots only (Which isn't recommended by Google itself)?

The content itself is not the only thing that you can reduce the amount of, in order to improve performances. API calls can also be regarded in such a manner: Can you reduce the amount of different APIs you call, how often or how many calls you send?

As an example for this last suggestion, we at Bedrock Streaming use an API on our side to determine what possible A/B tests a given user is following. A/B tests can be set up to run on 3 different levels: Per device, per user, and per profile; As a result, we used to have 3 different calls in order to retrieve each of these A/B tests. We recently decided to fuse them together instead, only calling this API endpoint once to retrieve everything at a time when we can. This is the kind of little improvements that can quickly add up!

---

## Deeper down the rabbit hole

- Rerenders, analyzing & debugging with React Debugger tools.
- Bundling to reduce the size of code downloaded by the client in large projects
