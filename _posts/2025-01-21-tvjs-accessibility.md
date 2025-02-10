---
layout: post
title: TVJS accessibility score, from 43% to 61% 🚀
description: How we made our apps more accessible at TVJS 📺
author: [j_nginn]
tags: [TVJS, smartTV, javascript, react, web, frontend, accessibility, a11y]
color: rgb(251,87,66)
language: en
thumbnail: "images/posts/tvjs/tvjs_accessibility_scores.png"
---

Hi there! 👋 I'm Julie Nginn, the accessibility technical referent at TVJS. In this article, I'm going to share with you how we improved the accessibility of our apps from 43% to 61% in just a few months!
First of all, you need to know that I'm very passionate and engaged in accessibility. My main motivation is to make the streaming better for everyone, including people with disabilities 💪

## Background
### October 2022
During the R&D day at TVJS, with the previous TVJS POs we decided to investigate and see if it is possible to implement the audio guidance on our apps.
I decided to take the lead on this project and I started to implement it for the platform WebOS first (because it's the device I had at home).
At that time, the only documentation I found to implement the feature on WebOS is in using the [Luna Service API](https://webostv.developer.lge.com/develop/references/luna-service-introduction) to activate the audio guidance and call the method `voicereadout.readAlert()` in passing the text we want to read.
For the demonstration, I implement it in the pairing page. When we focus any button in this page, we can hear the text of the button.

Here is the result of this first POC (it's in French):
<div>
    <video width="320" height="240" controls>
        <source src="/images/posts/tvjs/tvjs_tts_webos.mp4" type="video/mp4">
    </video>
</div>

After this POC, unfortunately no initiative was taken because the accessibility was not a priority at that time, so this feature had been abandoned... 😭

### February 2024
Few months later, I decided to spend another R&D day to develop another feature for to improve the accessibility of our apps. This time, I wanted to do something especially for the dyslexic people, because I'm dyslexic myself, and I'm a big user of streaming platforms.
In accessibility, often we can see some features for the blind or the deaf people, but it's rare to see something for the dyslexic ones and even less on streaming platforms.
So, I started with a benchmark to see what is already done in the industry and at this time none our competitors has implemented a feature for the dyslexic people, except Canal+ for the video subtitles only.
After that, I put myself in the shoes of a user and imagine what could be useful for me to enjoy my experience on our apps. The project "Dyslexic mode" on TVJS was born! 🎉

The idea is to have a new entry called "Accessibility" in the user settings, where the user can activate the "Dyslexic mode", personalize the font and the size of the text etc.

<div style="display: flex">
    <img src="/images/posts/tvjs/tvjs_dys_settings.png" alt="tvjs_dys_entry" width="50%" style="margin-right: 10px" />
    <img src="/images/posts/tvjs/tvjs_dys_entry.png" alt="tvjs_dys_entry" width="50%" />
</div>

And then, the personalisation is applied on the whole application.
![tvjs_dys_program.png](../images/posts/tvjs/tvjs_dys_program.png)

Why is it interesting for the user to have this feature? Because it can help to reduce the reading time, the fatigue and the errors. It can also help to improve the comprehension and the concentration. The user experience is clearly better.
And what is the benefit for Bedrock Streaming? It's a competitive advantage, it's a way to show that we care about our users, and we want to make the streaming better for everyone.

As a user, this kind of feature is very important, especially on TV apps, because when we watch a movie or a series, we're on our sofa, which is often a long way from the TV, and we don't all have plasma screens. So, the text should be readable to keep the user on our platform.

## 2024 March: the first audit
![The score for TVJS with the first audit](/images/posts/tvjs/tvjs_accessibility_first_audit.png)

## 2024 October: the second audit
![The score for TVJS with the first audit](/images/posts/tvjs/tvjs_accessibility_scores.png)
