---
layout: post
title: "Streaming recommendations at Bedrock"
description: "The first streaming recommendations with machine learning at Bedrock"
author: n_saby
twitter: Bedrock_Tech
category:
tags: [recommender systems, machine learning, data, data science]
feature-img: "images/posts/2022-02-27-streaming-recommendation/header.png"
thumbnail: "images/posts/2022-02-27-streaming-recommendation/header.png"
language: en
---

Personalised recommendations are everywhere. No exception for the streaming world. To improve user experience, recommender systems with machine learning are uplifting.
At Bedrock, until recently, there was no recommendation shaped this way.   

**But we are writing a new story.**

## A quick win solution

We wanted to find a way to get a solution that would be quick to integrate.

**We chose to use Amazon Personalize. This service aims to construct recommender systems with machine learning. The promise is to *Create real-time personalized user experiences faster at scale*. Perfect! It was exactly what we were looking for.**

Rapidly, we encountered an obstacle. You can’t deploy Personalize with Terraform. Yet, Terraform is the tool we use to manage our infrastructure.

## How to deploy Amazon Personalize?

As Personalize is supposed to be a temporary solution in our stack, for once, we accepted not using Terraform. We developed a Python script to interact with Personalize. Apache Airflow schedules and monitors the script.

Personalize is a black box. You can’t have access to explanations about the generated models. But, with Personalize, you have different ways to evaluate your recommendations. 

**With recommender systems, using the offline metrics to judge your model is not enough. It’s better than nothing! But to check that a recommender system works, you need to evaluate it online with real users.** 

We have millions of users. Releasing a recommender system to all our users is definitely not the best idea ever.

## How to release a recommender system?

First of all, check offline metrics. They’re still a valuable hint. Then, analyse the recommendations with people from the editorialist team.

*Note that this kind of analysis is very subjective.*

Finally, deliver the functionality to a small portion of your users.

**We configured an AB test that gives recommendations to 5% of users. With dashboards, we study the impacts.**

Perfect! We have a way to check the success of a full broadcast.

But how to be sure that the new product will support the load? We have millions of users. It means that 5% of users still represent a lot of people.

## How to assess the performance of a recommender system?

**Launch load tests. Today you have a myriad of tools to do that. At Bedrock, we use Artillery.** 

During the load tests, we had a bug. We discovered that by default, the limit of requests per second with Personalize is 500. In our context, that’s not acceptable.

We asked Amazon to help us and they changed the option for us.

## The results

If you're a big fan of reality TV shows, you will see that:

![recommendations of reality TV shows](/images/posts/2022-02-27-streaming-recommendation/tv_reality_show.png)

If you prefer reports, you will see that instead:

![recommendations of reports](/images/posts/2022-02-27-streaming-recommendation/header.png)

## What now?

We’ve deployed an AB test for our first recommender system built with machine learning. 

We don't have the results of the AB test yet. But, we've noticed that many users interact with the recommendations.

**After different challenges, we nailed it.** 

But, Personalize is expensive and a black box that we can’t integrate with Terraform easily (we'll have to develop something for that, at least). It doesn’t suit our context. That’s why we’ve started to develop our first models.
