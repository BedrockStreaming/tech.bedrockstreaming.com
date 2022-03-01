---
layout: post
title: "How to boost the speed of your webpack build?"
description: "A story of performance optimization and application of the Pareto principle to a webpack build that has become far too long."
author: a_caron
category:
tags: [js, webpack]
feature-img: "images/posts/hunting-webpack-performances/julian-hochgesang-0Y_YNPW5qds-unsplash.jpg"
comments: true
canonical: "https://slashgear.github.io/hunting-webpack-performances/"
language: en
---

## How did I cut in half my project's webpack build time ?

Who never complained about the infinite duration of a webpack build on a project ?
I'm currently working on a big web application coded in React/Redux with server side rendering.
The application exists since 2015 and it has evolved a lot since then

![6play screenshot](/images/posts/hunting-webpack-performances/6play.png)

## TLDR;

> Never, ever, ever, ever work on performance improvements or optimization without monitoring!

If you want to optimize the duration of a job, **you have to monitor precisely** the duration of it and all its sub-steps.
By doing that, you can really focus on the most expensive task.
This will save you from wasting time on optimizations that will have little impact on the system as a whole.
**Use existing monitoring tools! Create them if they don't exist!**

## What was the problem with webpack ?

For several weeks/months my colleagues had been complaining about the duration of our `yarn build` command. 
The purpose of this command is to build the distributable package of our application in a production target with _webpack_.

I even heard:
* "This command, I don't run it locally anymore, it takes too much time."
* "My computer starts ventilating heavily every time I run this command. There's nothing else I can do!"

Depending on the machine on which the build was launched, it took **between 5 and 12 minutes**.
It is not possible to have a build that takes so long.
`webpack` is not a slow bundler. 
It is our use of `webpack` that makes it slow.

## Focus error, a morning lost

Since this command launches a webpack build in `production` mode, I figured out that the culprit was webpack config itself.
Given that I've dug deep into webpack, I thought it would be interesting to focus on this performance concern.
I have indeed open sourced a set of workshop to learn how to use webpack from scratch (https://webpack-workshop.netlify.com).
So at the end of January I took one day to improve the situation.

I had my own idea of the task that would take the most. So I tried to improve it, spending my entire morning on it. 
I just managed to **gain 17 seconds**.

I'm not going to lie, I was very disappointed with what I achieved.

The concern in my strategy was however obvious. 
I started off with a preconceived idea _"This is definitely the stage that takes the longest."_

Nothing was objective in my analysis.
To improve the performance of an application it is necessary to focus on objective facts.

## Successful afternoon

When I came back from my lunch break, I was motivated to win more than those poor 17 seconds.
Then I remembered the Pareto principle. 

> The Pareto principle (also known as the 80/20 rule, the law of the vital few, or the principle of factor sparsity) states that, for many events, roughly 80% of the effects come from 20% of the causes.
> [Wikipedia](https://en.wikipedia.org/wiki/Pareto_principle) 

There is probably one step that takes up most of the webpack build time.
Pareto principle adapted to webpack could mean _"80% of the build time is caused by 20% of the config"_

*Let's find the culprit ! 🎉*

I had to determine the build time of each loader, of each plugin.
I was very lucky, the webpack community has already proposed a plugin that allows to measure everything.
And it is very easy to install. ♥️

[Speed Measure Plugin](https://www.npmjs.com/package/speed-measure-webpack-plugin)

Here are the results I got:

```text
SMP  ⏱  
General output time took 4 mins, 5.68 secs

 SMP  ⏱  Plugins
IgnorePlugin took 57.73 secs
TerserPlugin took 39.022 secs
ExtractCssChunksPlugin took 3.13 secs
OptimizeCssAssetsWebpackPlugin took 1.6 secs
ManifestPlugin took 1.55 secs
WebpackPwaManifest took 0.326 secs
ContextReplacementPlugin took 0.129 secs
HashedModuleIdsPlugin took 0.127 secs
GenerateSW took 0.059 secs
DefinePlugin took 0.047 secs
EnvironmentPlugin took 0.04 secs
LoadablePlugin took 0.033 secs
Object took 0.024 secs

 SMP  ⏱  Loaders
babel-loader, and 
rev-replace-loader took 2 mins, 11.99 secs
  module count = 2222
modules with no loaders took 1 min, 57.86 secs
  module count = 2071
extract-css-chunks-webpack-plugin, and 
css-loader, and 
postcss-loader, and 
sass-loader took 1 min, 43.74 secs
  module count = 95
css-loader, and 
postcss-loader, and 
sass-loader took 1 min, 43.61 secs
  module count = 95
file-loader, and 
rev-replace-loader took 4.86 secs
  module count = 43
file-loader took 2.67 secs
  module count = 32
raw-loader took 0.446 secs
  module count = 1
@bedrock/package-json-loader took 0.005 secs
  module count = 1
script-loader took 0.003 secs
  module count = 1
```

As expected, it's not great! 
But at least I'm starting to get who the culprits are.
We can see that for 2222 Javascript modules takes up 2mins **but** for only 95 Sass files 1min43 🤣.

<iframe src="https://giphy.com/embed/PjNx7g5jtLyJtvDohb" width="480" height="218" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

### Damn node-sass

Once the migration from `node-sass` to `sass` (new Sass re-implementation) and the update of `sass-loader`, I was shocked!
It took me about 10 minutes because there were few breaking changes and I **gained more than 1min30** on the build time.

`sass-loader` made big improvements on performances, you should definitely make sure you use the last version.

**I lost a morning on gaining 17 seconds and I spent 10 minutes to win 1min30.🤣**

### IgnorePlugin, TerserPlugin

- `TerserPlugin` is used to uglify the javascript code in order to reduce its size and readability. It's a relatively long process, but *39 seconds* is too much.
Just by updating the version of TerserPlugin to use the one integrated in Webpack, I managed to **reduce by 20 seconds** the build time.

- `IgnorePlugin` is a core plugin that was used a lot in our application to avoid loading certain scripts in order to reduce the weight of the site.
It was necessary, but today with Webpack we can use much better than that. _Dynamic Import, ContextReplacement_, there are plenty of solutions. As a general rule, we should avoid compiling files and then not using them.

### Recommendations from the community

To improve the build perfs webpack provides a web page listing the actions to take to hunt what takes time.
I strongly advise to have a look at it.

https://webpack.js.org/guides/build-performance/

## Final Result

```text
    SMP  ⏱  
    General output time took 2 mins, 18.27 secs
```    

<iframe src="https://giphy.com/embed/3rUbeDiLFMtAOIBErf" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

Based on precise and concrete measures, I was able to drastically improve the webpack build of my application.
No more computers suffering just to compile a bit of JS and SASS.
I could have lost whole days on futile modifications if I had not measured precisely what penalized the build.

ℹ️
* Use `Speed Measure Plugin` to debug webpack build time
* Track your build time evolution to detect big evolution before merge
* Follow webpack performances recommandations
* Look at webpack 5 new caching strategies
* Keep your webpack config up to date
