---
layout: ../../../../../layouts/post.astro
title: "How did we mock the backend developers?"
description: "Presentation of the superagent-mock library, a superagent plugin allowing to simulate HTTP calls by returning data fixtures based on the requested URL."
author: team_cytron
category:
tags: [javascript, superagent, mock, isomorphic, cytron, open-source]
feature-img: "../../../../../../../images/posts/cytron/superagent-mock.jpg"
thumbnail: "../../../../../../../images/posts/cytron/superagent-mock.jpg"
comments: true
permalink: how-did-we-mock-the-backend-developers
other_language: comment-a-t-on-bouchonne-les-developpeurs-backend
language: en
---


At M6Web we are currently working on a new version of a web site, with two separate teams: 
- the backend team providing data access through APIs;
- us, the frontend team, building an [isomorphic][isomorphic] SPA application using [React.JS][react-website] and the [flux pattern][flux-website].
  
# Develop the frontend before the APIs

Both teams started the project at the same time, meaning that at the beginning, we didn't have the web services needed for our application. We looked for the best way to develop it without waiting for those web services to become available.
  
# Interface
  
Our technical choices for the SPA has been guided by a deep thinking about isomorphic applications. This approach, with React, Flux and their surrounding environment, was at the time, totally unknown. Our first important task was to build the foundations of the web site architecture, demonstrate the feasibility of the project and document everything.
  
This resulting delay allowed the backend team to specify the output of the API. Based on those informations, we wrote fixtures. The idea was to have data from a nonexistent web service.
  
# Superagent and superagent-mock
  
To request the API we use the [superagent][superagent] library, an easily-extensible Javascript HTTP client. It is isomorphic, so it can be used both on server and client sides.
  
Then we developed [superagent-mock][superagent-mock], a superagent plugin dedicated to simulate HTTP requests returning fixtures data.

# Application
  
Like superagent, superagent-mock can be installed via npm, and be used by server or client side libraries. First, you need to add the library in your `package.json`.
  
{% highlight bash %}
npm install superagent-mock --save-dev
{% endhighlight %}  

Then, create the configuration file, where you will define which data will be mocked. Let's take for example a nonexistent API, the authors list on our technical blog: `https://tech.bedrockstreaming.com/api/authors`.

Here is the file structure we need: 

{% highlight javascript %}
// ./config.js file
module.exports = [
  {
    pattern: 'https://tech.bedrockstreaming.com/api/authors',
    fixtures: './authors.js',
    callback: function (match, data) {
      return { body : data };
    }
];
{% endhighlight %}

* The `pattern` attribute should be a regular expression, in case of a route containing variable parameters (ie: `https://tech.bedrockstreaming.com/api/authors/(\\d+)`).
* The `fixtures` attribute represents the link to a file or a callback.
* The `callback` attribute is a function with two arguments: `match` is the result of the regular expression and `data` the fixtures. `match` allows to use some call parameters (ie: the author id) to return relevant data (ie: the author in the fixture).

Next, you have to create the fixture file. This is a JS file exposing a function returning the mocked data.

{% highlight javascript %}
// ./authors.js file
module.exports = function () {
  return [
    {
      id: 1,
      name: "John Doe",
      description: "unidentified person"
    },
    ...
  ];
};
{% endhighlight %}

Finally, at the top of the file called by node, you have to patch [superagent][superagent] with [superagent-mock][superagent-mock] this way: 

{% highlight javascript %}
// ./server.js file
var request = require('superagent');
var config = require('./config.js');
require('superagent-mock')(request, config);
{% endhighlight %}

Those few lines allow us to overload some superagent methods to apply the configuration of the mocked requests (check the [source code][superagent-mock-source]).

# What's next 

With this tip, you can develop the frontend without access to any API. It's very useful in order to work locally on your computer, without the internet, or to make your functional tests independent of any third party.

However it gets tricky when you connect your application with the real API... and you realize that the interface was not respected. We often have to fix our code at this stage, but the changes are usually minor and time saved by the mock isn't questioned. The tedious part is still to maintain fixtures with the API evolution, especially necessary if it's used with functional tests.

# Even more!

Our app build itself the URLs of images retrieved via the API: it provides us an id and we guess the final URL through a configuration setting. This isn't REST compliant but we have good reasons to do this. The URL generation uses the library [sprintf-js][sprintf-js]. To have a completely independent application of any external request, we also had to mock these calls to local images. With this in mind, we have developed [sprintf-mock][sprintf-mock] whose operating mode is curiously similar to that of superagent-mock.

Projects [superagent-mock][superagent-mock] and [sprintf-mock][sprintf-mock] are open source. Very easy to use, they allow us to parallelize our developments with the backend team and to make our functional tests autonomous. So don't wait API completion to start your frontend developments!

[react-website]: https://reactjs.org/
[flux-website]: https://facebook.github.io/flux/
[isomorphic]: https://isomorphic.net/javascript
[superagent]: https://visionmedia.github.io/superagent/
[superagent-mock]: https://github.com/BedrockStreaming/superagent-mock
[superagent-mock-source]: https://github.com/BedrockStreaming/superagent-mock/blob/master/superagent-mock.js
[sprintf-js]: https://github.com/alexei/sprintf.js
[sprintf-mock]: https://github.com/BedrockStreaming/sprintf-mock
