---
layout: post
title: "Making Chromecast one of our sexiest project"
description: Chromecast used to be a nightmare for our clients and our teams, here is the story of how we made it one of our most interesting and modern project while dramaticaly improving performences.
author: [a_gaudard]
tags: [chromecast, TV, web, javascript, frontend, player, video, performences]
color: rgb(251,87,66)
language: en
---

Chromecast can be a nightmare of a device to handle. The device evolved a lot during the years and early versions are now easily overloaded compare to recent models that perform very well.
In addition of those constrains we also add a lot of issues in our project. The Chromecast project at Bedrock was a route within the main web project. It made sense at that time to build it inside the web project and it was working fine for a while. However with the project growing a lot and fast, we realised we had new challenges to handle on our side.

# Troubles

Our clients were **not satisfied with the performences** of the Chromecast project.
One of our client has a lot of traffic on Chromecast and the user experience was not following our and their standards so we had to find solutions.

Our team members were often **worried when seeing a Chromecast ticket** in the sprint because it was most of the time synonym of a long task and a painful sprint.

# Challenges

We can't really impact the devices ressources, therefore we obviousely focused on our project.

Here are a couple aspect we identified as very troublesome and where we wanted to improve.

- Reducing code dependencies
  We realise that the Chromecast project was quite massive.
  After some digging we found out that we where loading a tone of useless Javascript.
  Why ? Because since the Chromecast was within the web project we were loading some of the web site part that were irrelevant for this platform.

- Dev experience
  The developer experience really improved over the year on this project.
  For example, we created some tools to simulate the device so we can work localy which improved a lot the velocity of our features.
  However, even we those improvment, the project had ways of improvement espacially around builds and deployments. Those two point were again linked to the web project and so it had to follow the same process.

# Chromecast standalone

At Bedrock we almost always do a Request For Comment every time we have a new project that could imply some architecture updates.
Here we started to look into multiple things :

- Keep in the repo VS New repo ?

- Which tech to use ?

After a deep study of the possibilities by our tech lead we decided to build a new project outside the web reprository.

This solution was super existing for many reasons :

- Adopting a more **modern tech stack**.

- **Rebuild parts** of the project that needed some deep refactoring.

- Improve project **developer experience**.

- **Drop some code** that could be handled directly by the Chromecast SDK.

To confirm our thoughts on this project we created a POC.
It was a very simplified version of what would become the Chromecast Standalone, however it was clear that it would dramatically lighter.

With all those elements we convinced everyone that it was the way to go.

# Project KPIs

## Time

The project took

## Performances

The results have exceeded our expectations! Our key metric for this project was the video join time, and we're excited to announce that we've divided the value by two, meaning a dramatic improvement in performance.
This is even better than our initial projections!

- We went from **~5,8s** to **~2,8s** on this metric.

- We also witness a lot less critical variations which makes the metric is much more stable.
  Although keep in mind that we are still migrating and there is still a lot of people on the "old" Chromecast so we need to keep an eye on it.

- Time to paring or display the IDLE page went from **~7s** to **~4s**

<!-- Add screenshot of NPAW metrics -->

# Lessons learned

This project was a huge success for the company and the team.

The deep study on the project helped us analyze the situation as well as specify the different solutions.

The project went from _slow_, _difficult_, _boring_, _legacy_ to **fast**, **documented**, **exciting**, **modern**.

It is sometimes a good thing to take time to rebuild something deeply entangle.
It is probably not the good time, but to be honest, it is most likely never going to be the right time.

I can only recommend to spend time documenting :

- What are you pain point ?
- What can you do to overcome them ?
- How long will it take ?
- How much time (or money) will it safe at the end ?

With those quesitons you should be able to decide what to.
