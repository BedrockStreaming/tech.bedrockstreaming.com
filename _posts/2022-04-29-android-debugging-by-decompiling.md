---
layout: post
title: "Debugging low-level Android app issues with apktool"
description: "How decompiling your Android app using apktool can help you find the source of instrumentation issues at the bytecode level."
author: b_candellier
category:
color: rgb(19,174,19)
tags: [android, apktool, instrumentation, debugging, productivity]
comments: true
language: en
---

If you maintain an Android application, you might be relying on performance monitoring SDKs like [Firebase Performance](https://firebase.google.com/docs/perf-mon) or [New Relic](https://newrelic.com/products/mobile-monitoring), to name a couple. These plugins usually have a light setup process—just apply a Gradle plugin, and they provide the ability to collect statistics about every network call and database query in your app automatically.

To do this however, they use a very powerful feature of the Android Gradle Plugin. And with great power comes great responsibility; in our case, a simple bug-fix update caused a production bug that left one of our core features crippled.

To understand what was going on, what went wrong, how to fix it and how to take measures so that it never happens again, we had to do some investigation.

# Diving into the Android build process

To understand what instrumentation is and how it works, we first need to know a little about the Android app build process. Don't worry, we won't need to dive too deep into the details.

To put it simply, during the build process, your source files (Kotlin and Java) are compiled to Dalvik bytecode, which is stored in `.dex` files. These files are then packaged into an APK file, which is basically just a ZIP file with all your code and resources.

<div class="mermaid">
flowchart LR
    kt[.kt files] -- kotlinc --> dex[.dex files] --> packaging[[packaging]]
    java[.java files] -- javac --> dex
    res[resource files] -- aapt --> resc[compiled resource files] --> packaging --> APK
    subgraph APK
    direction TB
    dex1[.dex] -.- dex2[.dex] -.- dex3[.dex] -.- dex4[.dex]
    res1[res] -.- res2[res] -.- res3[res] -.- res4[res]
    signature -.- manifest
end
</div>

## Understanding bytecode instrumentation

Now, let's say you want to take an existing application with its untouched source code, and automatically inject calls to *your* SDK every time a network call is made, to log whether it was successful or not. How would you achieve this?

The easiest way is to plug yourself into the build, right after the code is compiled into bytecode, and **modify the bytecode** to your will.

<div class="mermaid">
flowchart LR
    kt[.kt files] -- kotlinc --> dex[.dex files] --> transform[[transform]] --> packaging[[packaging]]
    java[.java files] -- javac --> dex
    res[resource files] -- aapt --> resc[compiled resource files] --> packaging --> APK
    classDef transformed fill:#ff0000
    class transform transformed

    subgraph APK
    direction TB
    dex1[.dex] -.- dex2[.dex] -.- dex3[.dex] -.- dex4[.dex]
    res1[res] -.- res2[res] -.- res3[res] -.- res4[res]
    signature -.- manifest
    class dex1,dex2,dex3,dex4 transformed
end
</div>

The Android Gradle Plugin (AGP) offers APIs to do this, so SDK vendors can just provide a Gradle plugin and—ta-da! once you apply it, your app is automatically instrumented.

Note that there are other ways to achieve this without the AGP. Notably, Kotlin now uses an Intermediate Representation (IR), before it gets compiled down to a target-specific format. You can now write a Kotlin IR compiler plugin to transform the IR code and add your own hooks in an Android-agnostic way.

## Reverse-engineering a built APK

Now, this is great. But when you open an APK file, what do you get?

Let's unzip one and look inside.

![A list of files, containing classes.dex, classes2.dex, classes3.dex, classes4.dex](/images/posts/2022-04-29-android-debugging-by-decompiling/inside-an-apk.png)

A bunch of noise, and four interesting `.dex` files. That's where the app's code is stored, but unfortunately, these files are not human-readable.

To turn them into low-level but understandable code, some tooling will be necessary. The easiest to use for this task is [`apktool`](https://ibotpeaches.github.io/Apktool/), which is free and open-source.

Let's run `apktool` on our APK, and see what happens:

<script id="asciicast-76V1BUhMvoz2TAsBWHmmDAkpV" src="https://asciinema.org/a/76V1BUhMvoz2TAsBWHmmDAkpV.js" async></script>

<noscript>
<pre>
~/Downloads
❯ apktool d bedrock-sample-release.apk
I: Using Apktool 2.6.1 on bedrock-sample-release.apk
I: Loading resource table...
I: Decoding AndroidManifest.xml with resources...
I: Loading resource table from file: /Users/bcandellier/Library/apktool/framework/1.apk
I: Regular manifest package...
I: Decoding file-resources...
W: Cant find 9patch chunk in file: "drawable-xxhdpi-v4/common_google_signin_btn_icon_light_normal_background.9.png". Renaming it to *.png.
W: Cant find 9patch chunk in file: "drawable-mdpi-v4/common_google_signin_btn_icon_light_normal_background.9.png". Renaming it to *.png.
W: Cant find 9patch chunk in file: "drawable-mdpi-v4/common_google_signin_btn_text_light_normal_background.9.png". Renaming it to *.png.
W: Cant find 9patch chunk in file: "drawable-xhdpi-v4/common_google_signin_btn_text_dark_normal_background.9.png". Renaming it to *.png.
W: Cant find 9patch chunk in file: "drawable-xhdpi-v4/common_google_signin_btn_icon_dark_normal_background.9.png". Renaming it to *.png.
W: Cant find 9patch chunk in file: "drawable-xhdpi-v4/common_google_signin_btn_text_light_normal_background.9.png". Renaming it to *.png.
W: Cant find 9patch chunk in file: "drawable-xxhdpi-v4/common_google_signin_btn_text_light_normal_background.9.png". Renaming it to *.png.
W: Cant find 9patch chunk in file: "drawable-hdpi-v4/common_google_signin_btn_text_light_normal_background.9.png". Renaming it to *.png.
W: Cant find 9patch chunk in file: "drawable-xhdpi-v4/common_google_signin_btn_icon_light_normal_background.9.png". Renaming it to *.png.
W: Cant find 9patch chunk in file: "drawable-hdpi-v4/common_google_signin_btn_icon_light_normal_background.9.png". Renaming it to *.png.
W: Cant find 9patch chunk in file: "drawable-mdpi-v4/common_google_signin_btn_icon_dark_normal_background.9.png". Renaming it to *.png.
W: Cant find 9patch chunk in file: "drawable-xxhdpi-v4/common_google_signin_btn_text_dark_normal_background.9.png". Renaming it to *.png.
W: Cant find 9patch chunk in file: "drawable-xxhdpi-v4/common_google_signin_btn_icon_dark_normal_background.9.png". Renaming it to *.png.
W: Cant find 9patch chunk in file: "drawable-mdpi-v4/common_google_signin_btn_text_dark_normal_background.9.png". Renaming it to *.png.
W: Cant find 9patch chunk in file: "drawable-hdpi-v4/common_google_signin_btn_icon_dark_normal_background.9.png". Renaming it to *.png.
W: Cant find 9patch chunk in file: "drawable-hdpi-v4/common_google_signin_btn_text_dark_normal_background.9.png". Renaming it to *.png.
I: Decoding values */* XMLs...
I: Baksmaling classes.dex...
I: Baksmaling classes2.dex...
I: Baksmaling classes3.dex...
I: Baksmaling classes4.dex...
I: Copying assets and libs...
I: Copying unknown files...
I: Copying original files...
I: Copying META-INF/services directory
</pre>
</noscript>

There we go! In our case, we can ignore the warnings. `apktool` created a new directory with a bunch of `.smali` files, ordered by package name: one per class, containing their Dalvik bytecode.

If you see files with mangled names and contents, make sure that you run `apktool` on an APK with R8 obfuscation disabled, or you'll have a hard time figuring things out.

## Understanding Dalvik bytecode

Now, if you open one of these files, it will contain code that looks like the snippet below. It will look unfamiliar; that's normal. 

```
.method private final getContent()Lcom/bedrockstreaming/example/HomeViewModel$State$Content;

    .locals 2
    .line 119

    iget-object v0, p0, Lcom/bedrockstreaming/example/HomeViewModel;->state:Landroidx/lifecycle/LiveData;

    invoke-virtual {v0}, Landroidx/lifecycle/LiveData;->getValue()Ljava/lang/Object;

    move-result-object v0

    instance-of v1, v0, Lcom/bedrockstreaming/example/HomeViewModel$State$Content;

    if-eqz v1, :cond_0

    check-cast v0, Lcom/bedrockstreaming/example/HomeViewModel$State$Content;

    goto :goto_0

    :cond_0

    const/4 v0, 0x0

    :goto_0

    return-object v0
  
.end method
```

If you've ever worked with assembly code before, you might notice similarities in the way the code is written. Each line begins with an instruction, which can take comma-separated parameters. To work out what these instructions and their parameters mean, you **will** need to refer to the [Dalvik bytecode documentation](https://source.android.com/devices/tech/dalvik/dalvik-bytecode) provided by Google.

Let's take an example line from the snippet and decode it together. Looking at the table in the documentation, we can see deduce this:

```
# We'll decode this line:
invoke-virtual {v0}, Landroidx/lifecycle/LiveData;->getValue()Ljava/lang/Object;

invoke-virtual                                                                   # We're calling a virtual method
               {v0},                                                             # We're calling the method on the object referenced in register v0
                     Landroidx/lifecycle/LiveData;                               # The method we're calling is defined by androidx.lifecycle.LiveData
                                                  ->getValue()                   # We're calling a method called getValue()
                                                              Ljava/lang/Object; # This method returns an Object
```

With some determination and some deduction, we can guess figure out what the snippet does. Here, we're defining a `getContent()` method that tries to cast a `LiveData`'s value to `State.Content` and returns it, or null otherwise.

# Using a decompiled APK as a debugging tool

## Inspecting suspicious code

## Debugging by iteration

I haven't told you yet about `apktool`'s greatest strength: its ability to **recompile** an APK from the `smali` sources it has decompiled! This means we can effectively decompile an APK, make modifications to its low-level code, recompile and run it.

This proved really useful during our investigation. Since we have one directory with our APK in a bad state, and one directory with our APK in a good state, we can process by elimination to point out exactly which **single class**, when modified, causes our bug.

```sh
#!/bin/sh

# Inputs:
# DECOMPILED_APK_PATH: path to your previously decompiled APK directory
# ANDROID_SDK: path to the Android SDK
# KEYSTORE_PATH: path to your debug keystore
# KEYSTORE_PASSWORD: your debug keystore password

apktool --use-aapt2 b "$DECOMPILED_APK_PATH" \
    && "$ANDROID_SDK/build-tools/30.0.2/apksigner" sign -ks "$KEYSTORE_PATH" --ks-pass “pass:$KEYSTORE_PASSWORD" "$DECOMPILED_APK_PATH/dist/*.apk" \
    && adb install "$DECOMPILED_APK_PATH/dist/*.apk"
```

## Finding the right fix

# Conclusion

Looking forward, we know that we need to be careful with plugins that rewrite our code to add their own hooks.
Diffing our APKs before and after applying an update to a plugin, or adding a new plugin, seems to be a good way to review what that plugin actually does and the possible impacts on production. This can give our QA process the opportunity to focus on flows we might identify as more likely to be affected, or to give us the assurance that no code was actually affected, in the event of a minor update.
