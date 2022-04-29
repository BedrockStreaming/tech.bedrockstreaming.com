---
layout: post
title: "Debugging low-level Android app issues with apktool"
description: "How decompiling your Android app using apktool can help you find the source of instrumentation issues at the bytecode level."
author: b_candellier
category:
color: rgb(143,212,143)
tags: [android, apktool, instrumentation, debugging, productivity]
comments: true
language: en
---

If you maintain an Android application, you might be relying on performance monitoring SDKs like Firebase Performance or New Relic, to name a couple.

These plugins usually have a light setup process, and manage to collect statistics about every network call and database query in your app automatically. If you have ever wondered how this is achieved and, most importantly, how to debug the issues this might be causing—read on!

# Diving into the Android build process

To understand what instrumentation really is and how it works, we first need to know a little about the Android app build process. Don't worry, we'll only need to cover the basics.

To put it simply, your source files (Kotlin and Java) are compiled to Dalvik bytecode, into `.dex` files. These files are then packaged into an APK file, which is basically just a ZIP file with all your code and resources.

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

The Android Gradle Plugin (AGP) offers APIs to do this, so SDK vendors can just provide a Gradle plugin and ta-da! Your app is instrumented.

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

## Reverse-engineering a built APK

## Understanding Dalvik bytecode

https://source.android.com/devices/tech/dalvik/dalvik-bytecode

# Using a decompiled APK as a debugging tool

## Inspecting suspicious code

## Debugging by iteration

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

Looking forward, we know that we need to be careful with Gradle plugins that rewrite our code to add their own hooks.
Diffing our APKs before and after applying an update to a plugin, or adding a new plugin, seems to be a good way to review what that plugin actually does and the possible impacts on production. This can give our QA process the opportunity to focus on flows we might identify as more likely to be affected, or to give us the assurance that no code was actually affected, in the event of a minor update.
