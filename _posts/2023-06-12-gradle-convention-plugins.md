---
layout: post
title: Writing custom Gradle plugins for custom Gradle needs
description: Convention plugins are the recommended way to modularize your builds. Let's see how to write one.
author: b_candellier
tags: [android, gradle, plugin]
color: rgb(251,87,66)
---
In the last couple of years, Gradle has been encouraging developers to work towards modularizing their projects. Of course, when implemented effectively, this approach offers several advantages, with build parallelization being a significant factor.

But splitting your Android project into many, many modules has a major drawback, at first: you need to write a build file for each of them.

## The naive approach

One might be tempted to create "common" Groovy files (also known as "script plugins") and import them into each module. We can also define some properties in the root project, which can then be used in each subproject.

```groovy
apply plugin: 'com.android.library'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-kapt'

// This imports a Gradle file which we can use everywhere
apply from: rootDir.path + '/lib-common.gradle'

android {
    // compileSdkVersion is defined in the root project
    compileSdkVersion rootProject.ext.compileSdkVersion

    defaultConfig {
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion

        consumerProguardFiles 'proguard-rules.pro'
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    compileOptions {
        sourceCompatibility rootProject.ext.sourceCompatibility
        targetCompatibility rootProject.ext.targetCompatibility
    }

    kotlinOptions {
        jvmTarget = rootProject.ext.kotlinJvmTarget
        freeCompilerArgs += rootProject.ext.kotlinCompilerArgs
    }
}

dependencies {
    // Dependencies are defined in a map in the root project
    def dep = rootProject.ext.dependencies
    implementation dep.'androidx.core:core-ktx'
    implementation dep.'androidx.paging:paging-runtime-ktx'
    implementation dep.'com.squareup.okhttp3:okhttp'

    rootProject.applyTestDependenciesOn(dependencies)
    rootProject.applyToothpickDependenciesOn(dependencies)
}
```

This is the approach we were using before moving to a better system. It has some drawbacks which make this approach obsolete and not recommended by the Gradle maintainers.

- Script plugins need to be imported **individually** for each module in your project. This means that your heap will grow a lot, and this approach will scale terribly on a project with many modules.
- Relying on the `rootProject` in your modules−or relying on `subprojects` from your root project, for that matter−will add unwanted dependencies between your modules, which will in turn defeat optimization mechanisms designed by Gradle, such as [configuration-on-demand](https://docs.gradle.org/current/userguide/multi_project_configuration_and_execution.html#sec:configuration_on_demand) or [configuration cache](https://gradle.github.io/configuration-cache/). These are made to help bring down the time Gradle spends configuring your project (i.e. reading the configuration and building the task graph) each time you build; it goes without saying that getting this time to decrease will make for happier and more productive developers.

In addition to these issues, we wanted to start modularizing much of our project. We already had about 150 modules, but we planned on making many more soon, so this would be a good time to find a future-proof architecture. Plus, this was a good opportunity to clear some tech debt: cleaning unused dependencies, moving to a version catalog…

## Modern problems call for modern solutions

### Centralizing version management

A significant challenge we faced, which is also common in the industry, is managing dependencies and versions across the entire project. Hard-coding the version of okhttp for every module is not recommended, as it can be tedious and error-prone.

There are several known solutions to this problem, such as storing versions in the root project or using a `buildSrc` script. But not only are some solutions bad for your build performance (see: reliance on the root project), almost all of them share an insoluble issue: tooling support.

If you want to know when your dependencies can be upgraded, you probably either rely on your IDE to highlight your outdated dependencies, which it does by trying to look for some string that… looks like a Gradle dependency, or you rely on a tool like Renovate, which does the same thing on your CI. In either case, you probably could use a standard solution, where there is some kind of standard to declare your centralized dependencies, which both humans and machines can rely on consistently. That's why Gradle introduced the version catalog:

```toml
[versions]
androidCompileSdk = "33"
androidGradlePlugin = "7.4.2"
jvm = "17"

[libraries]
android-billingclient-core = { module = "com.android.billingclient:billing", version.ref = "billing" }
android-billingclient-ktx = { module = "com.android.billingclient:billing-ktx", version.ref = "billing" }
android-gradle = { module = "com.android.tools.build:gradle", version.ref = "androidGradlePlugin" }
android-installreferrer = { module = "com.android.installreferrer:installreferrer", version = "2.2" }
android-tools-desugar-jdk-libs = { module = "com.android.tools:desugar_jdk_libs", version = "1.1.5" }
android-tools-lint-api = { module = "com.android.tools.lint:lint-api", version.ref = "lint" }

[plugins]
android-app = { id = "com.android.application", version.ref = "androidGradlePlugin" }
android-library = { id = "com.android.library", version.ref = "androidGradlePlugin" }
```

This format has been great, even for a project as big as ours. It's flexible: you can now store library versions, but plugin versions as well, and even just plain versions, which you can get from your custom plugin later on!

And it's a standard format, so it works out of the box with tools like Renovate or Android Studio.

```groovy
dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.collection.ktx)
    implementation(libs.bundles.androidx.lifecycle)
}
```

### Code reuse

The direction of the industry's Gradle best practices is evident, with numerous talks and blog posts from big tech companies and even Gradle itself emphasizing the use of convention plugins.

While the name may sound intimidating, convention plugins are actually pretty straightforward. They are Gradle plugins that can be applied to each module, ensuring consistent configuration across all of them.

Convention plugins offer the advantages of build scripts and the elimination of duplicate configuration, all without the need for a dependency on the root project. The convention plugin is an isolated project, which could be stored in your monorepo, but could very well be stored in a completely different place. Unlike build scripts, it's compiled and instantiated only once, and is then *called* once for each module.

Creating a convention plugin is similar to creating any custom Gradle plugin. If you haven't had to do this yet, it looks like this:

```groovy
// settings.gradle
// …
includeBuild 'gradle-plugins/convention-plugin'
```

This will include your convention plugin alongside your main project at build time, so you will be able to use its result for your main project's build system.

You'll need a simple `settings.gradle(.kts)` file for your plugin. If your plugin is located in your monorepo, it will be very useful to be able to access its Version Catalog, so you can even share your dependency versions in the build files of your plugin.

```groovy
dependencyResolutionManagement {
    versionCatalogs {
        libs {
            from(files("../../gradle/libs.versions.toml"))
        }
    }

    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

rootProject.name = 'gradle-plugin-convention'
```

Then, you need a `build.gradle(.kts)` configuration script for your custom plugin. The trick is that to configure *other* modules with the Android Gradle Plugin (AGP), for example, you will need access to the AGP's classpath *at build time* in your plugin. You might be tempted to apply the AGP as a plugin, but you actually need to import it as an *implementation*.

```kotlin
group = "com.bedrockstreaming"
version = "1.0-SNAPSHOT"

plugins {
    // This is a Gradle plugin written in Kotlin, import the Gradle Kotlin DSL
    `kotlin-dsl`
}

java {
    toolchain {
        // This sets the JVM version needed to build this project.
        // Notice that we set this version in the Version Catalog, and we can use it here!
        languageVersion.set(JavaLanguageVersion.of(libs.versions.jvm.get()))
    }
}

gradlePlugin {
    plugins {
        // Your custom plugin's module can actually contain many plugins.
        // Create as many as you need - if you have multiple application modules, 
        // it might be useful to at least create one for library modules,
        // and one for application modules.

        create("androidMobileAppPlugin") {
            id = "com.bedrockstreaming.convention.application.mobile"
            implementationClass = "com.bedrockstreaming.gradle.convention.android.application.AndroidMobileApplicationPlugin"
        }

        create("androidLibraryPlugin") {
            id = "com.bedrockstreaming.convention.library.android"
            implementationClass = "com.bedrockstreaming.gradle.convention.android.library.AndroidLibraryPlugin"
        }

        create("jvmLibraryPlugin") {
            id = "com.bedrockstreaming.convention.library.jvm"
            implementationClass = "com.bedrockstreaming.gradle.convention.jvm.JvmLibraryPlugin"
        }
    }
}

dependencies {
    // Note that we add the AGP and Kotlin plugin as implementations, which is unusual.
    implementation(libs.android.gradle)
    implementation(libs.kotlin.gradle)
}
```

Then, you'll need an *extension*, which is Gradle speak to describe a configuration interface. Each option you will add to your extension will be usable from your module's `build.gradle(.kts)`, which is one of the most powerful advantages of custom plugins: you can reuse code and still make it configurable!

```kotlin
abstract class BaseConventionPluginExtension {

    internal abstract val enableCompose: Property<Boolean>

    /**
     * Enable Jetpack Compose on this module, and add core libraries.
     */
    fun composeToolkit() {
        enableCompose.set(true)
    }

    // …
}
```

Here's how that will look like when applying it to a simple library module:

```groovy
plugins {
    alias(libs.plugins.bedrock.library.android)
    alias(libs.plugins.kotlin.parcelize)
}

bedrock {
    enableCompose()
}

dependencies {
    // …
}
```

Then, it's time to create the actual plugin class, the entry point for Gradle (specified in `implementationClass` above).

```kotlin
package com.bedrockstreaming.gradle.convention.android.library

import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.kotlin.dsl.create

class AndroidLibraryPlugin : Plugin<Project> {

    override fun apply(target: Project) {
        // This is where we declare that our extension will be available in a bedrock {} block.
        val extension = target.extensions.create<AndroidLibraryExtension>("bedrock")
        // …
    }
}
```

That's it for boilerplate! You're free to architect the internals of your Gradle plugin however you want, but this `Plugin::apply` method will be the entry point for you to apply your configuration to each module on which your plugin has been applied.

For example, here's how you might apply the `com.android.library` plugin to your module, and configure it: 

```kotlin
fun apply(target: Project) = with(target) {
    // getPluginId is an extension function that reads the plugin ID from the version catalog
    apply(plugin = getPluginId("android.library"))

    configure<LibraryExtension> {
        compileSdk = getVersion("androidCompileSdk").toInt()
    }

    androidComponents.finalizeDsl {
        configure<LibraryExtension> {
            defaultConfig {
                minSdk = getVersion("androidMinSdk").toInt()
                consumerProguardFiles("proguard-rules.pro")
            }
        }
    }
}
```

You can reuse this principle and apply it to all your common configuration. You can automatically add dependencies, add some unit testing configuration, set the correct JDK toolchain, build flags, and even configure other third-party plugins with the same mechanism. The sky's the limit!

## In summary

The scalability of our project has been significantly improved through the migration from included build scripts and root project dependencies. Although writing custom Gradle plugins can initially pose challenges due to the potential for frustrating errors resulting from a minor misunderstanding of the Gradle API, once you are set up, the maintenance becomes much easier. It feels more rewarding to work in harmony with Gradle, rather than working against the optimizations introduced with each Gradle update, knowing that we can automatically benefit from them. The version catalogs provide a convenient method for organizing dependencies, and the fact that our tooling recognizes the format is a significant advantage.

In conclusion, for developers working on medium-to-large Gradle projects, whether in the Android realm or elsewhere, I highly recommend exploring the use of convention plugins. Mastering them is not as difficult as it may seem, and they provide effective solutions to address real challenges that we all face day-to-day.
