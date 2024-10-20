---
layout: ../../layouts/post.astro
title: "Get your brownfield React Native app built on demand"
description: "Get your brownfield React Native app built on demand"
author: k_dits 
category:
tags: [mobile, github, ci, react-native]
feature-img: "../../../../images/posts/rn-brownfield/feature.jpg"
thumbnail: "../../../../images/posts/rn-brownfield/feature.jpg"
comments: true
language: en
---
As you may know, at M6Web we decided to embrace [React Native](https://facebook.github.io/react-native/) a few months ago.
It’s a really exciting piece of software that adds a lot of value in the mobile development ecosystem.

We already use it for a side project on a standalone app (not public yet, stay tuned!) to record table soccer games, that’s why, we (mostly [@ncuillery](https://twitter.com/ncuillery) 😏) decided to improve the upgrade process for apps made with the embedded generator. See Nicolas’ blog post on it: [Easier Upgrades with React Native](https://facebook.github.io/react-native/blog/2016/12/05/easier-upgrades.html).

As a result, we wanted to start using React Native for our most popular app: 6Play ([6play iOS](https://itunes.apple.com/app/6play/id369692259?mt=8), [6play Android](https://play.google.com/store/apps/details?id=fr.m6.m6replay)).
So they would become what [Leland Richardson from Airbnb calls "brownfield" apps](https://facebook.github.io/react-native/blog/2016/08/12/react-native-meetup-san-francisco.html#bridging-the-gap-using-react-native-in-existing-codebases).
6play is the [catchup TV](https://en.wikipedia.org/wiki/Video_on_demand#Catch-up_TV) platform for the French TV group M6. It offers live-streaming and full episodes for web, mobile and set-top box. Since the apps launched in 2016, there have been over 1.5 billion videos streamed. Our iOS (mostly Swift) and Android native applications, both important parts of the 6play platform, were exclusively developed externally until now.

We wanted to use React Native to develop this project in-house and to take advantage of the benefits this hybrid technology could bring into our native apps. Here are just some of the benefits we found when using React Native:

* **JavaScript development for mobile**. We have a lot of awesome JavaScript developers internally who develop the [6play website](https://www.6play.fr/) using React. We love React & Redux and want to mutualize this piece of technology we use on most of the frontends of the 6play platform.
* **Hot fixing with [CodePush](https://microsoft.github.io/code-push/)**. For our mobile apps, we want to accomplish the same continuous delivery process we have for the website. CodePush helps us to keep the same flexibility by allowing us to make deployments on a weekly or even daily basis.
* **Knowledge sharing**. We would like to be closer to the external development of our mobile apps, which was difficult without native knowledge and without any Android or Swift internal developers. React Native allows us to be part of that, we started working closely with the native team, sharing all developments between the two teams and bringing the best of both worlds (native and web) into the same project.
* **Code Sharing**. We also want to share major parts of the mobile code base between apps (Android & iOS). Today, the code bases for each app are completely separate and are managed by two separate teams. With React Native, we could have one common code base while being able to implement specificities for a particular platform if needed. We have also imagined some ways to share code with the 6play website.

As we mentioned in a previous [blog post](/2016/06/20/preview-android-ios-react-native-on-github-pull-request), we use Github pull requests extensively in our development process, especially for testing (automatically and manually) each new commits before merging them into the `master` branch.

In the past, we tried to use [Appetize](https://appetize.io/) to preview  our apps in the browser. It was a first shot, but the functionality was quite limited: animations felt janky, some features wouldn’t work (in-app purchase, video with DRM, …), user identification was painful. We needed a better solution, and as a result we decided to rethink the way we develop the 6play apps.

For the second iteration of our development process, we had a few simple requirements:

* Test each pull request in conditions as close to the reality as possible,
* Use the same testing workflow for both iOS and Android apps.

This post outlines our new mobile development process for the 6play apps. We’ll walk through how we manage the environment of a brownfield React Native app, our Git repository structure, our build and release workflows, and how we’ve created a CI environment that mirrors our production environment.

# Mono Repository / Multi Repositories?

The first thing we had to do, was to decide how we wanted to organize our Git repositories.

For this, we looked into how [the AirBnb team work with their brownfield app](https://youtu.be/tUfgQtmG3R0?t=109).

We soon realized we had two options here:

**Multi-repositories**:

* the iOS one
* the Android one
* and one for React Native code

**Mono-repository**:

* One giant repository that has iOS, Android, and React Native folders inside.

Let’s take a look at the pros and cons of both solutions.

## The Mono Repository

```
├── app-6play/
│   ├── app-android/
│   ├── app-ios/
│   ├── react-native-views/
```

At first glance, this solution seems like the Holy Grail:

* (+) Everything is in the same place
* (+) If a modification needs both native & React Native developments, changes can be contained in a unique pull request.
* (-) Code, Documentation, Setup, are more difficult at the beginning (For example, how can we keep Git history of each existing repository?).
* (-) For our workflow, we need to have everyone working the same way, with the same git workflow, and the same review process. Remember that our native team is an external team (in Belgium), the Android & iOS teams are two different teams (located in the same place) and the React Native one is an internal team (in France). If we succeed, we’ll have synchronous development between teams, this is a really positive point, but it may be difficult to reach.
* (-) Android, iOS and Javascript CI environments are very different (different tools, different needs), so it is really complex to setup.

Ultimately, the initial cost of setup and maintenance outweighed the benefits of a mono-repository.

## The Multi Repositories

```
├── app-android/
├── app-ios/
├── react-native-views/
```

* (+) Each team could have its own Git workflow, branching model, review process,
* (+) Each platform has its own CI, code conventions,
* (-) Building the native apps including the React Native bundle is complicated,
* (-) Three pull requests (one on each repository) are needed if the functionality includes a native bridge and React Native development.

Neither approach was perfect. So we decided to choose the safest one, and create multiple repositories. Also, this choice doesn’t forbid any change of direction toward the mono repository in the future... The reverse seems much more complicated.

# Development workflow

Each native developer is now forced to have the `react-native-views` to be able to work on the native app.
You need to know that the native apps need `node_modules` dependencies of the React Native project, because they also contain the native part of React Native, and maybe some native code for React Native 3rd party you use.
So, we will need to clone the native app and the React Native repository.

## For Android

{% highlight bash %}
git clone app-android
git clone react-native-views
{% endhighlight %}

So we will have two sibling folders:

```
├── app-android/
├── react-native-views/
```

We decided to use symlink to have a cleaner structure (and that will make the CI configuration easy later, see Continuous Integration), so the setup for the Android project will look like this:

{% highlight bash %}
cd app-android
ln -s ../react-native-views ./react-native-views
cd ../react-native-views
npm install
{% endhighlight %}

```
├── app-android/
│   ├── react-native-views -> ../react-native-views
├── react-native-views/
│   ├── node_modules/
│   ├── package.json
```

## For iOS

Similar steps to the Android process, but it seems that Xcode has difficulty following package with a symlink … so we have to be a little smarter:

{% highlight bash %}
git clone app-ios
git clone react-native-views

cd app-ios
mkdir -p react-native-views/node_modules
cd ../react-native-views
ln -s ../app-ios/react-native-views/node_modules ./node_modules
npm install
{% endhighlight %}

With this method, the `node_modules` files will be written in the symlink. So those files will be located in the source of the symlink, the `app-ios/react-native-views/node_modules` directory (This is pretty twisted, we had to admit).

```
├── app-ios/
│   ├── react-native-views/
│   │   ├── node_modules/
├── react-native-views/
│   ├── node_modules -> ../app-ios/react-native-views/node_modules
│   ├── package.json
```

## React Native

Now we can choose: JavaScript developers are able to develop on any native app with the React Native `packager` (`npm start` in the `react-native-views` directory) and native developers can develop either with the `packager` started or with a pre-built React Native bundle (if their developments don’t concern React Native) by switching a Scheme (iOS) or a flavour (Android).

# Continuous integration

The next step was to find a way to improve the mobile development workflow.
During our research, we found a SAAS tool named [buddybuild](https://www.buddybuild.com) that’s able to build the iOS & Android apps on each pull request. The setup for the native apps (before the React Native integration) or the React Native side project was really straightforward. It just magically works!

With the 3 Git repositories of our brownfield apps, it’s a bit more complicated than that. For this, buddybuild provides two useful hooks during the CI process. We just have to add a shell file in the repository:

* `buddybuild_postclone.sh`: This is the hook that happens just after the cloning of the current repository by buddybuild
* `buddybuild_prebuild.sh`: This hook is called after postclone and after buddybuild gets all dependencies (npm, Pod, Gradle …), but just before the build starts  

To allow our Product Owners to test the app’s functionality, whether it's related to React Native or not, we’d need:

* An iOS build on each pull request on the iOS repository
* An Android build on each pull request on the Android repository
* An iOS & Android build on each pull request on the React Native repository

To meet the specific needs of our app development, we required:

* For iOS & Android, we need a way to include the React Native code which lies in another repository.
* For the React Native repository, we need a way to build the iOS & Android apps which lie in other repositories as well, and including the React Native code in it.
* Our iOS and Android apps up-to-date with both the master branch of the native app, and the master branch of the React Native repository.
* If a feature needs modifications on both the native code and the React Native code (multiple pull requests, one on each concerned repositories), we want an app synchronized with all repositories.

So let’s dig in these 4 points.

## Build the iOS & Android apps including the React Native bundle

The key here is to clone the React Native repository in the `postclone` buddybuild hook and reproduce the directory structure we have in development mode.

### for iOS

buddybuild_postclone.sh:

{% highlight bash %}
git clone react-native-views

# Create the symbolic link of the package.json at the root to make buddybuild triggering the `npm install`
ln -s react-native-views/package.json package.json
# Make Xcode able to access to the node dependencies
ln -s react-native-views/node_modules node_modules
{% endhighlight %}

buddybuild_prebuild.sh:

{% highlight bash %}
# export React Native bundle:
node_modules/.bin/react-native bundle --platform ios --entry-file index.ios.js --bundle-output ../<appFolder>/main.ios.jsbundle --dev false
{% endhighlight %}

```
├── buddybuild workspace/ (app-ios inside)
│   ├── react-native-views/
│   │   ├── package.json
│   │   ├── node_modules/
│   ├── package.json -> react-native-views/package.json
│   ├── node_modules -> react-native-views/node_modules
```

### for Android

buddybuild_postclone.sh:

{% highlight bash %}
git clone react-native-views

# Create the symbolic link of the package.json at the root to make buddybuild triggering the `npm install`
ln -s react-native-views/package.json package.json
# When buddybuild will run `npm install`, the node dependencies will be at the right place
ln -s react-native-views/node_modules node_modules
{% endhighlight %}

buddybuild_prebuild.sh:

{% highlight bash %}
# export React Native bundle:
node_modules/.bin/react-native bundle --platform android --entry-file index.android.js --bundle-output ../<appFolder>/main.android.jsbundle --dev false
{% endhighlight %}

```
├── buddybuild workspace/ (app-android inside)
│   ├── react-native-views/
│   │   ├── package.json
│   │   ├── node_modules/
│   ├── package.json -> react-native-views/package.json
│   ├── node_modules -> react-native-views/node_modules
```

The only thing you have to do in the buddybuild dashboard is to create the app for each platform and activate the build on pull request only (see screenshot below). Buddybuild will automatically trigger an iOS & Android build on each pull request for the native repositories.

![buddybuild branch configuration](/images/posts/rn-brownfield/buddybuild-branch.png)

## Build the iOS & Android apps on each pull request from the React Native repository

Now, we’d like to easily test each `react-native-views` pull request on both iOS and Android apps.

For that purpose, we used the buddybuild hook again. Here is the `buddybuild_postclone.sh`:

{% highlight bash %}
# Create a react-native-views folder
mkdir react-native-views
# Move everything in it
mv * react-native-views

# The postclone hook is ran by buddybuild for both iOS and Android builds. We distinguish the platform here, thanks to the env variable BUDDYBUILD_APP_ID (set by buddybuild)..
if [ "$BUDDYBUILD_APP_ID" = "<buddybuildAndroidAppID>" ]; then
git clone app-android
cd app-android
else
git clone app-ios
cd app-ios
fi

# Move the native app to the root of the workspace
mv * ..
cd ..

# Create the future node_modules location folder
mkdir -p react-native-views/node_modules
# Create the symbolic link for the app to be able to found the node_modules at the good place
ln -s react-native-views/node_modules node_modules
# Create the symbolic link of the package.json at the root to make buddybuild triggering the `npm install`
ln -s react-native-views/package.json package.json
{% endhighlight %}

For iOS, you’ll have:

```
├── buddybuild workspace/ (app-ios inside)
│   ├── react-native-views/
│   │   ├── package.json
│   │   ├── node_modules/
│   ├── package.json -> react-native-views/package.json
│   ├── node_modules -> react-native-views/node_modules
```

For Android, you’ll have:

```
├── buddybuild workspace/ (app-android inside)
│   ├── react-native-views/
│   │   ├── package.json
│   │   ├── node_modules/
│   ├── package.json -> react-native-views/package.json
│   ├── node_modules -> react-native-views/node_modules
```

By doing that, buddybuild will automatically install the npm dependencies, then launch the same `prebuild` hook as the native repository to build the React Native bundle.

Using buddybuild, you can create the app for each platform, and trigger new builds only when pull requests are opened, or when commits are added to existing pull requests. Buddybuild also builds both apps when React Native pull requests are opened as well.

## When master of React Native change, update the master iOS & Android apps

Buddybuild makes it very easy to trigger a build programmatically via the API. We also use Jenkins for unit tests and lint, so we have a job triggered every time a push is made on the `master` branch of `react-native-views`. We have reused this job and append the following:

{% highlight bash %}
# Our credentials
ACCESS_TOKEN_BB=<AccessToken>
APP_ID_BB_IOS=<buddybuildiOSAppID>
APP_ID_BB_ANDROID=<buddybuildAndroidAppID>

# Build iOS
curl -X POST -H  'Authorization: Bearer '$ACCESS_TOKEN_BB” -d 'branch=master’ 'https://api.buddybuild.com/v1/apps/'$APP_ID_BB_IOS'/build'

# Build Android
curl -X POST -H  'Authorization: Bearer '$ACCESS_TOKEN_BB” -d 'branch=master’ 'https://api.buddybuild.com/v1/apps/'$APP_ID_BB_ANDROID'/build'
{% endhighlight %}

Now, you can activate the `master` build on the native iOS & Android buddybuild build, and you’ll have those apps up-to-date with the master branch.

![buddybuild master configuration](/images/posts/rn-brownfield/buddybuild-master.png)

## Cross platform feature (both native & React Native)

At this point, this is not enough, because if you develop a feature that needs native and React Native modifications, you will not have the corresponding app before merging everything.

We have decided here to add a rule: for a “cross platform feature” (like a bridge for a native component for example), we have to define the same name for the branches in each repositories.

A bridge for a native component (the authentication bridge as an example) would have three Git branches with the same name, and three pull requests (one on each repository).

By following this convention, we only have to checkout that branch when we clone the external repository in our `postclone` hooks:

{% highlight bash %}
{
  # Detect with the env variable BUDDYBUILD_BRANCH (given by buddybuild) the branch we are on.
  echo "Git checkout branch: $BUDDYBUILD_BRANCH"
  git checkout $BUDDYBUILD_BRANCH
} || {
  echo "Git default branch: master"
  git checkout master # if master is the name of your default branch
}
{% endhighlight %}

We do that branch name checking on the three repositories. This way, the four buddybuild projects (app-ios, app-android, react-native-views-ios, and react-native-views-android) can build native applications with modification on both sides.

# Conclusion

Thanks to React Native and buddybuild, we now have a complete workflow as powerful as we have on the website. Being able to review either React Native or native code, and testing a real app before the code lands on the `master` branch is a big improvement for code quality and a huge step forward towards more agility.

Big up to [Tapptic Team](https://tapptic.com/), M6Web React Native team for this work, to the buddybuild support team for the help when needed.

Special thanks to Nicolas Cuillery and Alysha for their proofreading!
