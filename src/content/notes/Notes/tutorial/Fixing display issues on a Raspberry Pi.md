---
title: Fixing display issues on a Raspberry Pi
updated: 2025-08-24 14:05:00Z
created: 2021-12-08 11:00:00Z
latitude: 35.86036400
longitude: 14.55678760
altitude: 0.0000
tags:
  - troubleshooting
---

There are two broad categories of display modes: CEA (TV style resolutions) and DMT (monitor style resolutions). The former is driven with HDMI signalling which supports audio, the latter with DVI signalling which doesn't.

That being said, you *can* drive DMT modes with HDMI signalling and still have audio, but according to the spec, they don't have to support this, and may just report unsupported mode and give no picture. That is why this setting has to be enabled manually in `/boot/config.txt` (by default, sound will only work in CEA modes):
```plaintext
hdmi_drive=1    # default, DVI mode
# hdmi_drive=2  # forces HDMI mode rather than DVI
```
[Other settings](https://learn.adafruit.com/using-weird-displays-with-raspberry-pi/everything-else) may also need to be uncommented for the Pi to force an HDMI output when the monitor isn't being detected as HDMI-ready, like:
```plaintext
hdmi_force_hotplug=1
```
Having the option that gives video and no audio as the default one is safer than an option that may give no video. Many computer monitors don't support audio, so this shouldn't be an issue. However, there was a time when the EU imposed import tariffs on TVs, specifically 16:9 displays, so manufacturers fitted 16:10 panels (which would be DMT) to skirt them. Such models may be wrongly detected by the RPi which uses the EDID to determine what modes a display supports and prefers.[^1]

Valid modes can be found by generating a `edid.dat` file from which one can also find the preferred monitor resolution (included in `config.txt` as `hdmi_mode=<num>`):
```plaintext
tvservice -d edid.dat`
edidparser edid.dat
```
If you try to run `tvservice` and it throws an error about not being supported when using the vc4-kms-v3d driver, run:
```plaintext
run sudo raspi-config
```
then go to Advanced Options > GL Driver > Legacy, and try again.

If the display is flickering, then this option in `config.txt` will generate a stronger video signal:
```plaintext
config_hdmi_boost=4   # default is normally 2 or 5
```
For optimal performance, start with the lowest value and work up incrementally, rebooting after each change, to identify the lowest reliable setting. While the value can be increased up to 11, this is only recommended if you're using very long cables and experiencing persistent issues.

[^1]: If no `video` entry is present in `cmdline.txt`, then the Linux kernel (KMS driver) will read the EDID of the HDMI-connected monitor and automatically pick the best resolution supported by your display. To ignore the EDID negotiation, set the property `hdmi_ignore_edid=0xa5000080` .