---
layout: post
title: "Babitch, the story behind our table soccer web application"
description: "Babitch, the story behind our table soccer/foosball web application"
author:
  name:           M6Web
  avatar:         m6web.jpg
  email:
  twitter:  techm6web
  facebook:
  github: M6Web
category:
tags: [opensource, babyfoot]
image:
  feature:
  credit: 
  creditlink:
comments: true
---

At M6Web, we love playing foosball !.
We have one old (incredibly strong) soccer table in our « fun room », and at lunch time, a part of us, enjoying playing it in a 2 vs 2 way.

The soccer table in enterprise is awesome for a lot of things :

* Team building between each players
* Don’t think about work (almost) when we are playing
* Fun ! a lot of !
* …

So, as programmers, we tend to have software ideas for each questions in our life ! and the questions we had with foosball was :

* Who is the best player ?
* How many goals i did
* Who won most games ?
* …

So, we begin to talk several month ago about a foosball apps, allowing us to record each games, and each goals, to compute lot of stats about our games.
Everyone had good ideas about it, but someone have many more than us. Even more that it ruins all motivation of the other folks wanting to do work on this webapps, because the firsts step to begin the apps with all the features we have in mind was too big for all of us …

So before having start the project, it was over !

Few month later, an other part of the team, began in a « ghost » way to develop the most simple stupid foosball application. it just allow to select 4 players, and to do match by telling who score and what kind of goal (normal or own goal).
This was ugly as possible, but it works ! and was an awesome start for improving it and give back all motivation developpers had loosing before !

Babitch was born :)

# Architecture

At the beggining, there was only one project, with the server Api, and the client part.
This was bad. It was a good way to start fast, but a bad way to allow each project to evolve in his side.
So we decided to divide the Babitch Project into two parts, Babitch, the server Api, and BabitchClient, a client to consume Babitch Api data.

# Babitch, the Api

# Babitch Client