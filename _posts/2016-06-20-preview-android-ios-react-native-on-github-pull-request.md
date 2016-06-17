---
layout: post
title: "Preview your Android & iOs React Native apps on your Github Pull Request"
description: "Staging environment for your Android and iOs React Native apps on your Github Pull Request with Jenkins, Fastlane & Appetize"
author:
  name:  Kenny Dits
  avatar:
  email:
  twitter:  kenny_dee
  facebook:
  github:
category:
tags: [reactnative, react, mobile, github, jenkins, fastlane, appetize]
image:
  feature: posts/reactnative/nighttrain.jpg
  credit: Sascha Haase
  creditlink: https://www.flickr.com/photos/100955334@N06/with/15991008931/
comments: true
language: en
---

We are playing since a few weeks with [React Native](https://facebook.github.io/react-native/) for a Proof Of Concept and wanted to have the same development workflow for mobile apps, as we have for the web.

Here is the workflow we use for web development:

* Branch ![allthethings](/images/posts/reactnative/allthethings.png) : every bugfix or feature is developed on a new git branch,
* Pull Request (PR) ![allthethings](/images/posts/reactnative/allthethings.png) : we make PR for each bugfix or feature to propose the modification to the « master » git branch,
* Code Review ![allthethings](/images/posts/reactnative/allthethings.png) : other teammates have to review each PR and add :+1: when they agree with the modification,
* Test ![allthethings](/images/posts/reactnative/allthethings.png) : a CI system ([Jenkins](https://jenkins.io/)) runs Unit and Integration tests, and Lint on each PR,
* Preview ![allthethings](/images/posts/reactnative/allthethings.png) : an internal tool (Github Hooker) is called with a Github webhook on each PR to create a staging environment.

When every step is ok, the PR is merged.

The « Branch step », « PR step » and « Code Review step » are mostly related to our CVS (Github Enterprise) and are not a problem.
The « Test step » is related to React Native, we’ll use, [Jest](https://facebook.github.io/jest/), [ESLint](http://eslint.org/) and we have to dig a little bit more for Integration test ([Appium](http://appium.io/) ?).

The « Preview step » is more interesting. It was not the most simple thing to do on our web project, but this is probably one of the most useful feature we have on our stack.
Having a staging environment for all open PR allows devs, PO, PM and scrum masters to play with this exact version of the code (on any browser they want), and really see if the bug is fixed, or if the feature correspond to the PO needs. It allows everyone to iterate and make feedbacks before the code lands on the master branch. It’s also a good way to be sure your app build didn’t fail.

So, what we want is to have on each of our React Native PR, a link to preview iOs and Android version of our app in a web browser, refreshed after every commit on the branch.

The goal of this blog post is just to show you, that it is something doable and really useful. If you are interested in, here are some more information, that maybe can help you.

## The stack

Concerning the CI, we already use Jenkins, so we will continue to. Beware that for building iOs apps,  a CI running on OSX is needed. In our case, we had added a Jenkins slave to our Jenkins pool. If you don’t have CI system internally, you should take a look at [Bitrise](https://www.bitrise.io/) or [CircleCi](https://circleci.com/) because they propose OSX CI systems.
Our CVS is Github Enterprise, but everything is also possible with Gitlab (or any other CVS).
We use [Fastlane.tools](https://fastlane.tools/) to automate build and credentials support. (Mostly because it was recommended by some of our iOs developer).

In order to preview iOs and Android app in a web browser, we use the amazing SAAS service [Appetize.io](https://appetize.io/) (free for 100min/month).

![Appetize](/images/posts/reactnative/appetize.png)

## How did we do ?

We had set up an Osx machine with a fresh Jenkins install, and created one job that triggers a build everytime a push is made on a PR, thanks to the "[Github Pull Request Builder](https://wiki.jenkins-ci.org/display/JENKINS/GitHub+pull+request+builder+plugin) » Jenkins plugin. There is also a lot of things to configure on this machine (Nodejs, Ruby, xCode …), and i recommend you to do some builds (iOs and Android) manually to be sure everything is ready.

Fastlane is an open-source automation toolset for iOs & Android. It lets you write « lane » to automate a lot of things. We set up a unique Fastlane at the root of our React Native project directory dealing with Android & iOs lanes.

To suit our needs, we created one lane « deployAppetize » for each platform: it does the corresponding build, uploads it to Appetize.io via their API, and updates the Github PR Statuses during the process.

I’m not a Ruby programmer, so please, don’t cry, and feel free to improve the code below if you want (on this [Github Gist](https://gist.github.com/kennydee/e5dbefb1b75eb79cf1de3b47b9fdf00a)).
This is not the state of the art, nor a beautiful open source thing, we just share what we did in case it helps someone :-)

Before doing anything, you’ll have to set some variables on Fastlane, so go to the `Fastfile` file in your `fastlane` folder:

{% highlight ruby %}
#3rd party lib to do some http calls
require 'httparty'

fastlane_version "1.95.0"
default_platform :ios

before_all do
  # put here your token and iOs scheme app
  ENV["GITHUB_TOKEN"] = "----"
  ENV["APPETIZE_TOKEN"] = "----"
  ENV["APP_IOS_SCHEME"] = "----"

  # get the last git commit information
  ENV["GIT_COMMIT"] = last_git_commit[:commit_hash]

  # Use ghprbSourceBranch env variable on CI, git_branch lane elsewhere
  if !ENV["ghprbSourceBranch"]
    ENV["ghprbSourceBranch"] = git_branch
  end

end
{% endhighlight %}

Create a private_lane to make the POST request to your Github statuses API to avoid DRY:

{% highlight ruby %}
# Update git statuses of your commit.
private_lane :githubStatusUpdate do |options|

  response = HTTParty.post(
    "https://<yourgithubenterprisedomain.tld>/api/v3/repos/<orga>/<repos>/statuses/#{ENV["GIT_COMMIT"]}?access_token=#{ENV["GITHUB_TOKEN"]}",
    :body => {
      :context => options[:context],
      :state => options[:state],
      :description => options[:description],
      :target_url => options[:url]
    }.to_json,
    :headers => { 'Content-Type' => 'application/json' }
  )
end
{% endhighlight %}

Appetize allows you to create different apps. We want one app per PR, and update the corresponding app when a new commit is made on a PR. For that, we keep track of the branch name by storing it on the “notes” field of the app on Appetize.io.

So here’s a little utility private lane to get back the public key of the corresponding app on Appetize.io to update the good one if it already exists.

{% highlight ruby %}
# get the publicKey of the appetizeApp corresponding to your git branch
private_lane :getAppetizePublicKey do |options|
  publicKey = ""

  response = HTTParty.get("https://#{ENV["APPETIZE_TOKEN"]}@api.appetize.io/v1/apps")
  json = JSON.parse(response.body)

  # Find branch name in notes
  json["data"].each do |value|
    if value["note"] == ENV["ghprbSourceBranch"] && value["platform"] == options[:platform]
      publicKey = value["publicKey"]
    end
  end

  publicKey
end
{% endhighlight %}

Now, we have everything ready to do the deployAppetize lane for iOs :


{% highlight ruby %}
platform :ios do

  desc "Deployment iOs lane"

     githubStatusUpdate(
        context: 'Appetize iOs',
        state: 'pending',
        url: "https://appetize.io/dashboard",
        description: 'iOs build in progress'
      )

      Dir.chdir "../ios" do
        tmp_path = "/tmp/fastlane_build"

        #seems not possible to use gym to do the simulator release ?
        xcodebuild_configs = {
          configuration: "Release",
          sdk: "iphonesimulator",
          derivedDataPath: tmp_path,
          xcargs: "CONFIGURATION_BUILD_DIR=" + tmp_path,
          scheme: "#{ENV["APP_IOS_SCHEME"]}"
        }

        Actions::XcodebuildAction.run(xcodebuild_configs)

        app_path = Dir[File.join(tmp_path, "**", "*.app")].last

        zipped_bundle = Actions::ZipAction.run(path: app_path, output_path: File.join(tmp_path, "Result.zip"))

        Actions::AppetizeAction.run(
          path: zipped_bundle,
          api_token: "#{ENV["APPETIZE_TOKEN"]}",
          platform: "ios",
          note: "#{ENV["ghprbSourceBranch"]}",
          public_key: getAppetizePublicKey({platform: "ios"})
        )

        FileUtils.rm_rf(tmp_path)

      end

      githubStatusUpdate(
        context: 'Appetize iOs',
        state: 'success',
        url: "#{lane_context[SharedValues::APPETIZE_APP_URL]}",
        description: 'iOs build succeed'
      )
  	end

  error do |lane, exception|
    case lane
      when /deployAppetize/
        githubStatusUpdate(
          context: 'Appetize iOs',
          state: 'failure',
          url: "https://appetize.io/dashboard",
          description: 'iOs build failed'
        )
    end
  end
end
{% endhighlight %}

For Android, this is almost the same things, except we have to do some small business logic to found the apk generated by Gradle, with this private lane :

{% highlight ruby %}
# find the path of the last apk build
private_lane :getLastAPKPath do
  apk_search_path = File.join('../android/', 'app', 'build', 'outputs', 'apk', '*.apk')
  new_apks = Dir[apk_search_path].reject { |path| path =~ /^.*-unaligned.apk$/i}
  new_apks = new_apks.map { |path| File.expand_path(path)}
  last_apk_path = new_apks.sort_by(&File.method(:mtime)).last

  last_apk_path
end
{% endhighlight %}

And now you should be able to also deploy to Appetize.io on Android :

{% highlight ruby %}
platform :android do

  desc "Deployment Android lane"

  	lane :deployAppetize do
      githubStatusUpdate(
        context: 'Appetize Android',
        state: 'pending',
        url: "https://appetize.io/dashboard",
        description: 'Android build in progress'
      )

      gradle(
        task: "assemble",
        build_type: "Release",
        project_dir: "android/"
      )

      Actions::AppetizeAction.run(
        path: getLastAPKPath,
        api_token: "#{ENV["APPETIZE_TOKEN"]}",
        platform: "android",
        note: "#{ENV["ghprbSourceBranch"]}",
        public_key: getAppetizePublicKey({platform: "android"})
      )

      githubStatusUpdate(
        context: 'Appetize Android',
        state: 'success',
        url: "#{lane_context[SharedValues::APPETIZE_APP_URL]}",
        description: 'Android build succeed'
      )
  end
  error do |lane, exception|
      case lane
        when /deployAppetize/
          githubStatusUpdate(
            context: 'Appetize Android',
            state: 'failure',
            url: "https://appetize.io/dashboard",
            description: 'Android build failed'
          )
    end

end
{% endhighlight %}

It’s over. You just have to add those commands to your CI to do the job :

```
npm install
Fastlane ios deployAppetize
Fastlane android deployAppetize
```

You have now two new checks on each PR with a link to the iOs or Android instance on Appetize.io.

![Github Pull Request with preview url](/images/posts/reactnative/githubpr.png)

The complete `Fastfile` on a Github Gist : [FastFile](https://gist.github.com/kennydee/e5dbefb1b75eb79cf1de3b47b9fdf00a)

P.s: you could also look at the [Fabric Blog post](https://fabric.io/blog/fastlane-updates-powerful-prs-enhanced-deployment) on the device grid for Fabric but with Danger commenting on the PR instead of Github Statuses, and iOs only.

P.s 2: You could also look at [Reploy.io](https://reploy.io), which try to improve this workflow with extra features and a more cleaner UX than Appetize.io, but it is very “alpha” for now.
