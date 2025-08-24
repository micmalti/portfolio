---
title: Configuring Firefox privacy settings
updated: 2025-08-24 16:10:00Z
created: 2024-04-01 19:11:00Z
latitude: 35.89547060
longitude: 14.46650720
altitude: 0.0000
tags:
  - tutorial
---

As Google moved forward with its plans to drop Manifest V2 support on its flagship browser, apparently in an effort to clamp down on ad-blocking extensions, some users started looking elsewhere. Firefox stands out from the bunch as a browser that prioritises user privacy from marketing efforts, [at least for now](https://blog.mozilla.org/en/firefox/update-on-terms-of-use/).

These options were recommended in the [2024 Firefox privacy guide](https://restoreprivacy.com/firefox-privacy/) by Restore Privacy. For a comprehensive `user.js` template, [refer to this project](https://github.com/arkenfox/user.js?tab=readme-ov-file).

## Fingerprinting protection

Since `privacy.resistFingerprinting` [may cause issues](https://librewolf.net/docs/faq/#what-are-the-most-common-downsides-of-rfp-resist-fingerprinting) if it's set to 'true', a more prudent action to have at least a minimum level of fingerprinting protection is to install [CanvasBlocker](https://addons.mozilla.org/en-US/firefox/addon/canvasblocker/) (though it also can prove problematic, at least from my own experience using it). To verify that the add-on is working properly, visit this [testing page](http://kkapsner.github.io/CanvasBlocker/test/detectionTest.html).

WebGL is a [potential security risk](https://security.stackexchange.com/questions/13799/is-webgl-a-security-concern) and one of the easiest ways for a site to fingerprint your device. However, be aware that enabling `webgl.disabled` (by setting it to 'false') will break most browser games and some other sites. The second best alternative is to have CanvasBlocker installed.

## Cookie management

`network.cookie.cookieBehavior` disables dynamic storage partitioning for all sites. When set to '5', it rejects (known) trackers and partitions third-party storage. See [here](https://developer.mozilla.org/en-US/docs/Web/Privacy/State_Partitioning) for details.

`network.cookie.lifetimePolicy`, which is currently unset on my browser, determines when cookies are deleted. With a value of '2', visited websites should work without any issues, but all cookies will be automatically deleted at the end of the session.

First Party Isolation (FPI) enhances privacy by effectively restricting third-party trackers. That is because such tracker will only have access to cookies from the site you're currently viewing, not the cookies they have placed across other sites which you may have already visited on the same device. This forces the trackers to create a separate user profile for each website you visit, preventing them from aggregating your browsing history into a single, comprehensive profile.

However, enabling FPI by setting `privacy.firstparty.isolate` to 'true' can cause browsing issues. A more practical alternative is to use Firefox's built-in Strict Enhanced Tracking Protection, which enables a more web-compatible form of this protection called dynamic First Party Isolation (dFPI). Note that manually enabling FPI will automatically disable dFPI.

## Device permissions

If `media.eme.enabled` is set to 'true', playback of DRM-controlled HTML5 content from sites such as Netflix will be disabled. See [here](https://support.mozilla.org/en-US/kb/enable-drm#w_opt-out-of-cdm-playback-uninstall-cdms-and-stop-all-cdm-downloads) for details.

By disabling `media.navigator.enabled`, websites will be blocked from requesting access to the camera and microphone of your device. The same outcome, albeit for geolocation tracking, applies if `geo.enabled` is disabled.

`dom.event.clipboardevents.enabled` and `dom.events.testing.asyncClipboard`, both set to 'true', prevent websites from knowing if you have copied something from, or pasted something into the page. A major benefit of doing this is the possibility of pasting text into the password field of websites that usually block such functionality. However, pasting into a Google Docs document will no longer work.