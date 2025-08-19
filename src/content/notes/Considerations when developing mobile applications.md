---
title: "Considerations when developing mobile applications"
updated: 2025-06-13 08:52:13Z
created: 2021-06-11 10:51:00Z
latitude: 35.89547060
longitude: 14.46650720
altitude: 0.0000
---

## Going native

By and large, Kotlin's advantages over Java are mostly incremental. Coroutines are the only thing that can't easily be translated to Java. But when you add up all those incremental advantages, it does come out ahead, striking a good balance between solid fundamentals and pragmatism.

Kotlin compilation is horribly slow at this moment, roughly 2x slower than a comparable amount of Java lines. This will mostly be solved when the K2 compiler hits, which improves a big part of the compilation process.

Since JetBrains designed Kotlin, it's pretty much only useful to write in a JetBrains IDE and toolset.

## React Native or Flutter?

Flutter is a Google-sponsored project whereas React Native is supported by Meta. Given Google's [poor track record](https://killedbygoogle.com/) towards supporting its projects in the long-term, having the same company actively involved in Flutter's development may be enough of a justification to choose React Native. A quick look at the project's issue tracker on GitHub doesn't improve its case, with 418 different labels and more than 12K open issues, as opposed to React Native's (less, yet still too many) 213 labels and 600+ open issues.

That being said, Flutter is more starred on GitHub, which is surprising, given that it was released more than two years after React Native's initial release.

If you're still undecided, there are two other factors which are both favourable to React Native: it's written in a more popular language (C++ as opposed to Dart), and Expo.

[Expo](https://expo.dev/) allows users to build React Native apps without ever (or rarely ever) having to open Xcode.

## Why not a PWA?

Back in mid-2019, I entertained the idea of [building a PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable) for a startup that I was working in. Despite the technology's potential to revolutionize web and mobile experiences by bridging the gap between websites and native apps, Apple, in particular, has been slow to adopt this open standard fully. This reluctance stems mainly from its desire to maintain control over the iOS ecosystem and continue generating revenue through the App Store.

Similarly, while Google has generally shown [more enthusiasm towards PWAs](https://medium.com/@firt/google-play-store-now-open-for-progressive-web-apps-ec6f3c6ff3cc), going so far as to launch [Workbox](https://github.com/GoogleChrome/workbox), a collection of JS libraries for PWAs, there are still some constraints that hinder their full potential on Android devices. For instance, not all device features are accessible via PWAs, which may result in sub-optimal performance or limited functionalities compared to native apps available on the Play Store.

Additionally, discoverability remains an obstacle since search engines do not yet prioritize PWA results as they would for traditional websites or native apps within each platform's store.

As a result, PWAs face several limitations, including restricted access to specific hardware capabilities, inconsistent implementation across different platforms, and challenges related to discoverability and distribution.

## Compatibility

It is recommended to set `targetSdkVersion` to the latest SDK in order to make use of the latest support library releases. Conversely, `minSdkVersion` must be at least as high as the dependencies’ minimum supported SDK version; deciding how high it ought to be depends mostly on [global usage trends](https://www.reddit.com/r/Android/comments/17k4yh8/android_version_distribution_statistics_have_been/). For a React Native project, these settings are specified in the `android/build.gradle` file.

Therefore, the app should be able run on all Android versions from `minSdkVersion` to `targetSdkVersion` with no compatibility issues.

## Publishling to app stores

If you're using Expo, the project website has a [best practices guide](https://docs.expo.dev/distribution/app-stores/) for submitting your app to the app stores.

## Testing

Alpha testing is when you test your product in a closed group, often on-site and in very controlled conditions. Organising a good beta test requires getting a sample of your target audience to install the app and go about using it. During a beta test, make sure that analytics show both the functionality of the app (things like uptime, how quickly it loads, etc.) and how users interact with the app. Updates should always be done through a staged rollout.
