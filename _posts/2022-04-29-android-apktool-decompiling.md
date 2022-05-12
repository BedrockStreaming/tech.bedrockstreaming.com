---
layout: post
title: "Debugging and reviewing your Android dependencies with apktool"
description: "How decompiling your Android app using apktool can help you find the source of instrumentation issues at the bytecode level, as well as improve your review process."
author: b_candellier
category:
color: rgb(19,174,19)
tags: [android, apktool, instrumentation, debugging, productivity]
comments: true
language: en
---

If you maintain an Android application, you might be relying on performance monitoring SDKs like [Firebase Performance](https://firebase.google.com/docs/perf-mon) or [New Relic](https://newrelic.com/products/mobile-monitoring), to name a couple. These plugins usually have a light setup process—just apply a Gradle plugin, and they provide the ability to collect statistics about every network call and database query in your app automatically.

The usual way to achieve this is to rely on a process called **instrumentation**, which is supported *via* the Android Gradle Plugin's [Transform API](https://developer.android.com/reference/tools/gradle-api/7.2/com/android/build/api/transform/Transform), or its successor, the [Instrumentation API](https://developer.android.com/studio/releases/gradle-plugin-api-updates#transform-removed). This feature is very powerful, and potentially dangerous; in our case, a minor patch of one of these SDKs caused a production bug that left one of our core features crippled.

The visible cause of our bug, from a developer's point of view, was that the video player saw the network requests as always being extremely fast, no matter the network quality. Therefore, it assumed the device had access to a very high bandwidth, and tried loading video segments with a very high bit rate. This did **not** go well for users with slower network speeds.

To understand what was going on, what went wrong, how to fix it and how to take measures so that it never happens again, we had to do some investigation.

# Diving into the Android build process

Before we get to the topic of instrumentation, we first need to know a little about the Android app build process. Don't worry, we won't need to dive too deep into the details.

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

The Android Gradle Plugin (AGP) offers APIs to do this, so SDK vendors can just develop a Gradle plugin and ta-da! Once you apply it, your app is automatically instrumented.

Note that there are other ways to achieve this without the AGP. Notably, Kotlin now uses an Intermediate Representation (IR), before it gets compiled down to a target-specific format. [You can write a Kotlin IR compiler plugin](https://blog.bnorm.dev/writing-your-second-compiler-plugin-part-1) to transform the IR code and add your own hooks in an Android-agnostic way, although this API is still experimental at the time of writing.

## Reverse-engineering a built APK

Now, this is great. But when you open an APK file, what do you get?

Let's unzip one and look inside.

```
.
├── META-INF
├── assets
├── google
├── okhttp3
├── res
├── AndroidManifest.xml
├── classes.dex
├── classes2.dex
├── classes3.dex
├── classes4.dex
├── firebase-common.properties
├── firebase-crashlytics.properties
├── play-services-base.properties
├── ...
└── resources.arsc
```

A bunch of noise, and four interesting `.dex` files. That's where the app's code is stored, but unfortunately, these files are not human-readable.

To turn them into low-level but understandable code, some tooling will be necessary. The easiest to use for this task is [`apktool`](https://ibotpeaches.github.io/Apktool/), which is free and open-source.

Let's run `apktool` on our APK, and see what happens:

<script id="asciicast-1RozUUMJwPlMjS0ea1R6GNwuj" src="https://asciinema.org/a/1RozUUMJwPlMjS0ea1R6GNwuj.js" async></script>

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

There we go! In our case, we can ignore the warnings. `apktool` created a new directory with a bunch of `.smali` files, organized by package: one file per class, containing their Dalvik bytecode.

```
.
├── AndroidManifest.xml
├── res
│   ├── values
│   │   ├── strings.xml
│   │   └── ...
│   ├── layout
│   │   ├── layout_home.xml
│   │   └── ...
│   └── ...
├── smali
│   ├── com
│       ├── bedrockstreaming
│       │   ├── app
│       │   │   ├── mobile
│       │   │   │   ├── R$anim.smali
│       │   │   │   ├── R$layout.smali
│       │   │   │   ├── R$string.smali
│       │   │   │   ├── R$style.smali
│       │   │   │   └── ...
│       │   │   └── ...
│       │   └── ...
│       └── google
│           ├── android
│           │   ├── exoplayer2
│           │   │   ├── AbstractConcatenatedTimeline.smali
│           │   │   ├── AudioBecomingNoisyManager.smali
│           │   │   ├── AudioFocusManager$AudioFocusListener$$ExternalSyntheticLambda0.smali
│           │   │   ├── AudioFocusManager$AudioFocusListener.smali
│           │   │   ├── AudioFocusManager.smali
│           │   │   ├── BasePlayer.smali
│           │   │   ├── BaseRenderer.smali
│           │   │   ├── BuildConfig.smali
│           │   │   └── ...
│           │   └── ...
│           └── ...
├── smali_classes2
│   ├── com
│   │   └── bedrockstreaming
│   │       ├── app
│   │       │   ├── mobile
│   │       │   │   ├── MobileApplication.smali
│   │       │   │   └── ...
│   │       │   └── ...
│   │       └── ...
│   └── ...
└── ...
```

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

With some determination, we can figure out what the snippet does. Here, we're defining a `getContent()` method that tries to cast a `LiveData`'s value to `State.Content` and returns it, or `null` otherwise.

# Using a decompiled APK as a debugging tool

## Inspecting suspicious code

Before doing anything else, we can already start looking at the generated code to identify patterns that could cause issues. Problem is… there can be a *lot* of code to look through.

Before going this deep in the rabbit hole, we already figured our issue was, somehow, related to instrumentation: disabling it fixed this issue; downgrading to the previous release of the SDK also fixed it. This means that if we want to get a clear look at **what** needs to change to go from a working APK from a broken one, we could just compare an APK instrumented by the previous SDK version with an APK instrumented by the current one!

Of course, we want to do this on the human-readable `smali` files, not the raw `dex` files. We can generate a full diff with the help of the `diff` tool:

```sh
diff -bur normal/ instrumented/
```

In our case, it also proved useful to compare an APK that has been instrumented with one that hasn't, to understand what that instrumentation is meant to achieve. Most of it was to notify the SDK of every HTTP request, along with its result.

As a simple example, the snippet below shows a class belonging to Picasso. We can see the HTTP calls it makes are being intercepted by the SDK.

```diff
--- normal/smali/com/squareup/picasso/NetworkRequestHandler.smali	2022-01-05 11:09:22.000000000 +0100
+++ instrumented/smali/com/squareup/picasso/NetworkRequestHandler.smali	2022-01-05 11:08:34.000000000 +0100
@@ -128,10 +128,26 @@

     .line 103
     :cond_4
+    instance-of v2, v1, Lokhttp3/Request$Builder;
+
+    if-nez v2, :cond_5
+
     invoke-virtual {v1}, Lokhttp3/Request$Builder;->build()Lokhttp3/Request;

     move-result-object v2

+    goto :goto_1
+
+    :cond_5
+    move-object v2, v1
+
+    check-cast v2, Lokhttp3/Request$Builder;
+
+    invoke-static {v2}, Lcom/vendor/instrumentation/okhttp3/OkHttp3Instrumentation;->build(Lokhttp3/Request$Builder;)Lokhttp3/Request;
+
+    move-result-object v2
+
+    :goto_1
     return-object v2
 .end method
```

## Finding the source of the issue by iteration

We haven't talked about `apktool`'s greatest strength yet: its ability to **recompile** an APK from the `smali` sources it has decompiled! This means we can effectively decompile an APK, make modifications to its low-level code, recompile and run it.

This proved really useful during our investigation. Since we have one directory with our APK in a bad state, and one directory with our APK in a good state, we can process by elimination to point out exactly which **single class**, when modified, causes our bug. 

In our case, a useful workflow was to start with a suspect—let's say we think instrumenting the OkHttp classes might have caused the bug.

1. Copy the OkHttp classes from the "bad" APK, and only those, to our "good" APK.
2. Recompile and run the app.
3. Does the bug occur?
    - If it does, then that means it is caused by the instrumentation of at least one of the OkHttp classes. We can go through this process again, this time by selecting only a subset of OkHttp's classes, and check if the bug still occurs, etc.
    - If it doesn't, revert the OkHttp classes and try again with another suspect.

This process can be accelerated with a very simple script, to iterate faster. The recompilation step occurs incrementally, and so only takes a few seconds.

```sh
#!/bin/sh

# rebuild-and-run.sh
# Rebuild, sign and install an APK from its decompiled source.
# (c) 2022 Bedrock Streaming

# Inputs:
# DECOMPILED_APK_PATH: path to your previously decompiled APK directory
# KEYSTORE_PATH: path to your debug keystore
# KEYSTORE_PASSWORD: your debug keystore password

apktool --use-aapt2 b "$DECOMPILED_APK_PATH" \
    && apksigner sign -ks "$KEYSTORE_PATH" --ks-pass "pass:$KEYSTORE_PASSWORD" "$DECOMPILED_APK_PATH/dist/*.apk" \
    && adb install "$DECOMPILED_APK_PATH/dist/*.apk"
```

Here's what it looks like in action:

<script id="asciicast-HCdekIJOEwSdARnP2bUnWWipo" src="https://asciinema.org/a/HCdekIJOEwSdARnP2bUnWWipo.js" async></script>

<noscript>
<pre>
~/bytecode-playground
❯ ./rebuild-and-run.sh
I: Using Apktool 2.6.1
I: Checking whether sources has changed...
I: Checking whether sources has changed...
I: Checking whether sources has changed...
I: Checking whether sources has changed...
I: Checking whether sources has changed...
I: Checking whether sources has changed...
I: Checking whether sources has changed...
I: Checking whether sources has changed...
I: Checking whether sources has changed...
I: Checking whether sources has changed...
I: Checking whether sources has changed...
I: Checking whether resources has changed...
I: Building apk file...
I: Copying unknown files/dir...
I: Built apk...
Performing Incremental Install
Serving...
Success
Install command complete in 445 ms
</pre>
</noscript>

In our case, we narrowed down the issue to the instrumentation of a single class: `okhttp3.internal.http.CallServerInterceptor`: once it was reverted, the bug disappeared.

In fact, we narrowed it down to a very small patch with which the app runs fine:

```diff
 .../okhttp3/internal/http/CallServerInterceptor.smali         | 4 ++--
 1 file changed, 2 insertions(+), 2 deletions(-)

diff --git a/apk/smali_classes2/okhttp3/internal/http/CallServerInterceptor.smali b/apk/smali_classes2/okhttp3/internal/http/CallServerInterceptor.smali
index c916149f..c26eab15 100644
--- a/apk/smali_classes2/okhttp3/internal/http/CallServerInterceptor.smali
+++ b/apk/smali_classes2/okhttp3/internal/http/CallServerInterceptor.smali
@@ -510,7 +510,7 @@
 
     instance-of v8, v14, Lokhttp3/Response$Builder;
 
-    if-nez v8, :cond_b
+    #if-nez v8, :cond_b
 
     invoke-virtual {v14, v15}, Lokhttp3/Response$Builder;->body(Lokhttp3/ResponseBody;)Lokhttp3/Response$Builder;
 
@@ -574,7 +574,7 @@
 
     instance-of v15, v8, Lokhttp3/Response$Builder;
 
-    if-nez v15, :cond_e
+    #if-nez v15, :cond_e
 
     invoke-virtual {v8, v14}, Lokhttp3/Response$Builder;->body(Lokhttp3/ResponseBody;)Lokhttp3/Response$Builder;
 
-- 
```

Basically, when the code went through this `if` statement, our request got wrapped by `com.vendor.instrumentation.okhttp3.OkHttp3Instrumentation`:

```
invoke-static {v8, v14}, Lcom/vendor/instrumentation/okhttp3/OkHttp3Instrumentation;->body(Lokhttp3/Response$Builder;Lokhttp3/ResponseBody;)Lokhttp3/Response$Builder;
```

And what does this method do, you ask? Let's take a look at the decompiled source in Android Studio, so that it's a bit easier to read:

```java
public Builder body(ResponseBody body) {
    try {
        if (body != null) {
            BufferedSource source = body.source();
            Buffer buffer = new Buffer();
            source.readAll(buffer);
            return this.impl.body(ResponseBody.create(body.contentType(), buffer.size(), buffer));
        }
    } catch (IOException var4) {
        log.error("IOException reading from source: ", var4);
    } catch (IllegalStateException var5) {
        log.error("IllegalStateException reading from source: ", var5);
    }

    return this.impl.body(body);
}
```

The body is being read into memory!

```java
source.readAll(buffer);
```

When correlating this discovery with the source code from ExoPlayer, we could verify that, indeed, our player was expecting that the time it takes reading the response body would be the time it took to download the entire video segment. Here's what this flow looks like in a functional app:

<div class="mermaid">
sequenceDiagram
    participant exo as OkHttpDataSource
    participant nr as OkHttp3Instrumentation
    participant okhttp as OkHttpClient
    participant server as Server Endpoint

    exo->>nr: body()
    nr->>okhttp: body()
    activate server
    okhttp->>server: 
    server->>okhttp: 
    okhttp->>nr: ResponseBody (length=0)
    activate exo
    nr->>exo: ResponseBody (length=0)
    server->>exo: length=512
    server->>exo: length=1024
    server->>exo: length=1536
    server->>exo: length=2048
    server->>exo: length=2560
    note right of exo: OkHttpDataSource controls the body reads <br> and can measure the time it took <br> to read the whole response
    deactivate server
    deactivate exo
</div>

But with this bug in the SDK, since the HTTP response has been buffered into memory by some SDK, the read was always almost-instantaneous, no matter the speed of the connection. Additionally, it messed with the overall performance since requests were no longer properly streamed by their rightful users.

<div class="mermaid">
sequenceDiagram
    participant exo as OkHttpDataSource
    participant nr as OkHttp3Instrumentation
    participant okhttp as OkHttpClient
    participant server as Server Endpoint

    exo->>nr: body()
    nr->>okhttp: body()
    activate server
    okhttp->>server: 
    server->>okhttp: 
    activate nr
    okhttp->>nr: 
    server->>nr: length=512
    server->>nr: length=1024
    server->>nr: length=1536
    server->>nr: length=2048
    server->>nr: length=2560
    deactivate nr
    activate exo
    note right of exo: OkHttpDataSource is only notified <br> after everything is downloaded
    nr->>exo: ResponseBody (length=2560)
    deactivate server
    deactivate exo
</div>

# Using a decompiled APK as a review tool

It's no secret to developers in any software ecosystem that library updates can be a source of problems - security vulnerabilities, bugs, incompatibilities, and so on. It's hard to vet them properly, especially in compiled form, like libraries distributed in the Java ecosystem. Things get even harder when arbitrary Gradle plugins start rewriting our own code!

The tooling needed to decompile an APK is free, fast, and easy to automate. It's a really helpful tool to investigate obscure bugs in places your debugger won't let you place a breakpoint, and it's also really useful to be able to see a human-readable diff between two binaries.

Generating a diff of the effects of a library upgrade can seem overkill and hard to do in practice, but at least in the case of bug-fix releases with hopefully few changes, it can be very helpful to have an actual report of what changed. It's an accepted practice to review the code your team checks in; why not review the code of others, since it ends up in the exact same artifact?
