---
layout: ../../layouts/post.astro
title: Android 14 is out
description: "Android 14 changes impacts"
author: [c_goffoy]
tags: [android, mobile, google, "14"]
color: rgb(254,91,73)
language: en
thumbnail: "../../../../images/posts/2023-12-05-android-14/header.png"
---
Here’s what it means for users and developers.

With each new OS version, new things, upgrades, deprecations and changes are introduced, affecting the way we use and develop our apps.
Google keeps going in the direction of more privacy, more accessibility and more control over what the apps can do to maximize security and integrity.
Android 14 is no exception and here’s what I compiled on different topics that I will try to vulgarize to keep everyone on board.

### Technical

Technical changes build over features and APIs already introduced in previous versions, mostly Android 12 and 13.
They tend to modernize tools by catching up with some Java features and semantics, helping manufacturers and improving the developers' IDE to embrace those changes.
Due to the nature of the changes, this is the topic that has to remain...technical, sorry for that.

* Mobile screens are getting bigger with more ratios to support, we’re moving further and further away from the binary world of phone vs tablet. To ensure the best experience on this wide range of devices, Android 14 introduces the `Large Screen Compatibility Mode` to help manufacturers improve the experience on their devices.
* Updates to OpenJDK17 may require a bit of attention from apps using `Regex` that are not close enough to openJDK's new semantics, throwing exceptions when confronted to an invalid groupe reference.
* Generating a `UUID` from a string sees the validation become stricter and will now lead to exceptions due to deserialization issues. More than ever, it’s time to unit test UUID generation.
* A bit of additional ruling may be needed to fix Proguard issues when shrinking / obfuscating code involving the `ClassValue` class coming with `API34`.
* The new `Back APIs` are now strengthened by built-in animations and support for custom ones.
* Making the `ForegroundService` type explicit is now mandatory, if the implementation was already properly done back in the Android 10 days when it was introduced, congratulations, nothing to do here.
* Foreground services are also encouraged to be migrated to user-initiated jobs. A new `RUN_USER_INITIATED_JOBS` permission is introduced and new methods on the `JobInfo` builder allow to set the `userInitiated()` status along with the estimated amount of bytes the job will expect from the network. Scheduling the job is now done with the app foregrounded and the notification icon system remains the same so the user knows something is going on even if the app is backgrounded post launch.

### Battery and performance

Without a single ounce of surprise, Google continues its effort to improve battery life and takes steps towards sanctioning bad actors that publish battery-draining or unstable apps.
Today, not crashing is no longer enough, developers should take steps to push their app to their full potential and that means power management and performance monitoring.

* Bad behaviours like `ANRs (screen freezes)` or `background crashes` now more aggressively flag the guilty apps and put them at the bottom of the priority list where apps are fighting for resources, meaning they’ll also be the first to go if the system needs some. No more filtering out `ANRs` and non-fatal crashes on Crashlytics, everything matters now.
* While on the subject of fighting for resources, let’s also note that now, `context-registered broadcasts` are now queued when the app is backgrounded and the system will deliver them when the app is awake or system conditions allow it.
* Another change to the cached state (aka when the app is backgrounded) impacts background tasks that can no longer be triggered unless one of the app components is awake. This change pushes devs to use framework's `JobScheduler` and `WorkManager` more as they aren’t impacted by this change.
* Still with `Jobscheduler`, jobs don’t just fail silently anymore if they don’t respond in time but trigger an `ANR`, it is advised to move to `WorkManager` with its out of the box async support.
* If a job requires a special network state to be triggered, the `ACCESS_NETWORK_STATE` permission is now mandatory. Without it, a `SecurityException` will be raised.
* `Intents` keep getting more and more headache prone as the implicit and pending intents now can only be delivered to exported components. If you need to reach an unexported component, explicit intent is your go-to solution. Note that mutable pending intents now need to specify a component or it will throw an exception.

### Notifications

Finding the right balance between informative presence and in-your-face nuisance has always been a challenge for notifications and it seems Google keeps pushing to make them less invasive and easier for the user to dismiss or delay them.

* The `Fullscreen Intent` notifications that we see when our clock rings or when we receive a phone call are luckily already rarely used.
They are now more restricted and available only to apps declaring `Call` or `Alarm` features, meaning we shouldn’t see bad actors abusing this feature that would allow them to bypass the lock screen amongst other things.
* Non-dismissible `foreground notifications` are now dismissible in some cases but will remain non-dismissible 
    - on top of the `Lock Screen` to prevent it from being swiped by anyone accessing a device behind the owner's back.
    - from the `Clear all` feature to prevent misclicks.

### Privacy and security

This is, once again without surprise, where a lot of the changes happen and it is aligned with Google’s vision and goals when it comes to give users back the control of their data and permissions.
Some of them seem so obvious that it’s surprising to see them in action only now. Maybe the EU pressure with GDPR starts to pay off? Maybe…

* Android 14 introduces new places where the data sharing purposes are displayed. Until now, we could only check them from the PlayStore app page. 
Now, it will also be displayed in the `runtime permission popups`, starting with those related to location to remind why the data is necessary and with whom it will be shared.
* It will now be impossible to install apps that don’t target at least the `API 23` to prevent bad actors from exploiting security breaches discovered inside older Android versions.
Be aware that installed apps won’t be removed and the system won’t warn you when starting one of those apps, maybe a new feature for Android 15?
* `Dynamic Code Loading` now requires to flag the file as read-only to avoid any tampering or code injection. In any case, DCL should be avoided when possible and only trusted files should obviously be loaded this way.
* When saving a file inside the app storage, the system attributes to the file an owner id, this id being the app package name that saved it. 
This feature allows apps to know which file they can open without requesting the external read permission. The issue was that by querying this id, other apps could access the owner ids that weren’t them and deducting the owner's installed apps list. 
To fix this, the name is now redacted, increasing again a little bit the user data protection, the list of the installed apps being considered a sensitive data by Google.
* If an app features `screen` or `audio recording`, it is now required to be granted the user consent to do so before each session start and therefore be able to handle permission denied scenarios.
* Zip files are also impacted as a fixed vulnerability with the `path transversal reading` now triggers an exception if some characters are found inside it. (Contains `..` Or starts with `/`)
* Even though already required, the `BLUETOOTH_CONNECT` permission was not yet enforced to access the profile state, it is now the case.
* Users are no more required to grant access to all `images` or `videos` to share or display a single media, Android 14 now upgrades the permission popup with an option to select only the media the app is allowed to access.
* Apps can now react to a user `screenshot` event, they can’t manipulate the content but developers can now add a callback bound to the activity lifecycle. 
Sensitive screens should still be protected with the secure flag.
* Starting activities from the background with a `pending intent` or through another app in the foreground now requires the app to opt-in to this feature inside said activity and is no longer a default behaviour.

### Accessibility

It is no secret that mobile devices are now owned by more and more people every year, which includes people with a range of disabilities or personalities that may make an app usage more challenging.
Android 14 helps them with new and upgraded features to ease their journey with a mobile device.

* A step is taken towards low-vision users’ direction, the changes and impacts to the `font scaling` should be negligible to developers already properly using `SP` as their size units but a full testing pass with the scaling enabled should be scheduled to be safe and tweak improvable screens.
* New tools inside Android studio are added to help developers handling `per-app language` more efficiently and easily.
* `Grammatical Inflection API` is introduced, offering developers working on apps with gendered languages new tools. It adds a layer of complexity to the strings files by having three gender-files by gendered language. In those files are added only the strings affected by gender inflections like `Vous êtes déconnecté` for masculine, `Vous êtes déconnectée` for feminine or `La déconnection est effective` for neutral in french. More work for developers and translators but an overall better experience for users.

---

All in all, Android 14 is an update faithful to the Google roadmap. 
Users today are very different than users 10 years ago. They care more about their data and their privacy; the Mobile ecosystem and business is also a lot more professional.
It's important for us developers to be aware of those changes in order to continuously improve the experience, be it related to our core business or simply to keep the user engaged in a safe environment.

When this article is released, Android 14 should be freshly out and developer teams hands deep in the migration tasks.
I hope you enjoyed the information and see you soon for more Android related articles!





* [Changes potentially affecting all apps](https://developer.android.com/about/versions/14/behavior-changes-all)
* [Changes affecting apps targetting Android 14](https://developer.android.com/about/versions/14/behavior-changes-14)
* [New features introduced by Android 14](https://developer.android.com/about/versions/14/features)
* [APIs changelog](https://developer.android.com/sdk/api_diff/34/changes)
* [Overview](https://developer.android.com/about/versions/14/summary)
