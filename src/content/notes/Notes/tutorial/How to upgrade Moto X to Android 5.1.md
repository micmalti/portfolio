---
title: How to upgrade Moto X to Android 5.1
updated: 2025-08-24 15:17:00Z
created: 2023-05-29 10:05:00Z
tags:
  - tutorial
---

In June 2023, WhatsApp announced that support for devices running Android 4.4 would be discontinued starting October 24, 2023. For 99.5% of Android users, this was a non-issue, but for me who was still using a Moto X (1st gen), it was. The decision to stick with such an old device, despite receiving zero security updates and owning two spare phones (a Pixel 1 and a Samsung Galaxy A40), was borne out of the fact that (a) it's just the right size for one-handed use, and (b) it fits nicely into my pocket trousers. So, before I conceded to the grim reality that the trend of small form-factor phones wasn't making a comeback, I wanted to try and find a way to upgrade the phone to a WhatsApp-supported Android version.

What follows is essentially an abridged version of a long [XDA thread](https://forum.xda-developers.com/t/rom-stock-5-1-stock-lollipop-flashable-zip.3155843/) on how to upgrade the XT1058 model to Android 5.1, which should extend support for WhatsApp by a few more years. And while it has little significance outside the very few users who are still running this particular model, the general specifics of manually flashing a custom ROM may be an interesting read for those who have never attempted it.

Unfortunately, all of my efforts were ultimately in vain since the bootloader couldn't be unlocked due to restrictions imposed by the carrier (thanks, AT&T).

## About the ROM

There's not much of a difference between the "stock" ROM and the official version, except that it is just convenient for anyone wanting to flash the ROM through recovery instead of fastboot. These ROMs are basically stock .xml builds tailored to be in zip format. The modded version already has Gapps package, with the apps removed being the same of the debloated one, and comes with the wave-to-wake feature (you may still need to enable Ambient display in Display Settings).

This flashable zip does not modify the bootloader and the modem files. It only flashes the system and boot partition i.e. `/system` and the kernel.

After the upgrade, you should be able to completely downgrade to Android Kitkat without any issues. However, flashing `motoboot.img` and `gpt.bin` will prevent a full downgrade, so to preserve this option, make sure to skip these files when installing the stock firmware.

## Backup

Flashing the ROM should not affect any of your data, therefore it will just seem like you've taken the OTA. All apps and its data should be preserved. Despite this, make a Nandroid backup just in case, which can be restored after flashing this ROM.

## TWRP

It seems that TWRP 2.8.7.0 can't install the update. One user reported success with using [version 2.8.6.0](https://twrp.me/motorola/motorolamotox2013.html). He also suggested a different solution by doing the following in TWRP:

1.  Wipe > format data > yes
2.  Reboot, replug USB
3.  Copy zip and then flash

## Modem firmware

It shouldn't be necessary to flash the old modem version from Jellybean or Kitkat after flashing this ROM, unless you are faced with these issues:
   -   Security settings force closing
   -   Problems with voice, data, etc.
   -   Speakerphone bug

The modem files are `fsg.mbn` and `NON-HLOS.bin`, located in the [full firmware](https://www.androidfilehost.com/?fid=24269982087012857) for your model. The former enables the cellular part of the phone, while the latter handles the non-high-level operating system that enables encryption, encoding, etc. Once they are extracted, do the following steps (as explained [here](https://xdaforums.com/t/rom-stock-5-1-stock-lollipop-flashable-zip.3155843/post-63739588)):
```plaintext
fastboot flash modem NON-HLOS.bin  
fastboot erase modemst1  
fastboot erase modemst2
fastboot flash fsg fsg.mbn  
fastboot reboot
```
It is a recommended practice to wipe the `modemst1` and `modemst2` partitions when flashing a newer radio firmware since they are storage partitions for radio firmware. However, this step may cause the SIM to be locked. In that case, flash the stock image, after which unlock your SIM, then superSU and recovery. Follow [this thread](http://xdaforums.com/moto-x/general/guide-unlock-sim-flash-retail-lollipop-t3236783) or [this one](http://xdaforums.com/moto-x/general/guide-success-sim-unlock-sprint-xt1056-t2825155) for details.

You have to update the bootloader too if, when flashing the modem from fastboot, it doesn't go past the `WARNING BOOTLOADER UNLOCKED` screen and just loops that screen. Note that you cannot downgrade your Android version once the bootloader or gpt.bin have been updated, at least not without the possibility of bricking the device. These firmwares should be flashed to avoid unintended bugs, like the speakerphone bug.

You have to be on the 5.0+ (ATT 5.1 30.BE) bootloader before flashing the 5.1.1 modem, but you won't brick your device if you're not.

Reproduce the steps mentioned in [this thread](https://xdaforums.com/t/rom-stock-5-1-stock-lollipop-flashable-zip.3155843/post-65061860) if, after the first boot, it hangs at the red Verizon screen, then on the second boot, it goes all the way to setup but stops at the Verizon contact backup and won't go any farther,.

Alternatively, you may choose to flash the whole retail.brazil.5.1.xml (lastest release is LPA23.12.21.7).

The modem firmware is not supposed to be flashed in recovery.

The modded ROM should be installed in this order:

   1.  Flash the firmware (motoboot, gpt, fsg, and NON-HLOS)
   2.  Flash the ROM
   3.  Flash SuperSU, Xposed, etc.
   4.  Factory reset

If the latest radio firmware doesn't work well, you can always flash the old ones from 4.4.4.

### Safer option

Instead of changing radios, do the following using either X-plore File Manager or Root Explorer:

1.  Locate build.prop
2.  `mount -o rw,remount /system`
3.  `cp build.prop build.prop.orig`
4.  Edit build.prop and add these lines under `# ADDITIONAL_BUILD_PROPERTIES`:  
    `ro.telephony.default_network=10`  
    `telephony.lteOnCdmaDevice=1`
5.  `mount -o rw,remount /system`
6.  Check that it was added.
7.  Reboot

The above worked for one particular user on XT1060. After the factory reset in TWRP, it did time-out during setup (he skipped everything) during the part of establishing a connection. After setup finished, he let it set 5 minutes, rebooted and then got it running fine.

If the build.prop file has been "restored", confirm you flashed SuperSU after the ROM reflash. Perhaps that got lost and without root you can't save the changes.

## Bootloader

You cannot flash a custom rom when the bootloader is still locked[^1], so make sure the [bootloader is unlocked](https://xdaforums.com/t/unlocking-bootloader-and-or-checking-status.3588309/) first:
```bash
adb reboot bootloader
fastboot getvar all
```
There is a [fix](https://bbs.archlinux.org/viewtopic.php?id=238206) to resolve the `<Waiting for a device>` error by editing /etc/udev/rules.d/51-android.rules. For the changes to take effect:  
`sudo udevadm control --reload && sudo udevadm trigger`

If the bootloader is locked, do the following:

1.  `fastbook oem get_unlock_data`
2.  Concatenate the output into one continuous string without "bootloader" or whitespaces, then paste it [here](https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-b) to verify that your device is unlockable and request an unlock key (my [request](https://forums.lenovo.com/topic/anonymous/preview/1734/sTYM5nWeVLs) for one).
3.  `fastboot oem unlock <UNIQUE_KEY>`

Note that GSM lock and bootloader lock are completely unrelated. If the unlock page says you don't qualify, then your phone cannot be unlocked without using a particular [exploit](http://theroot.ninja/), which won't work at all if you've upgraded to or past 4.4.4.

Rooting grants the ability to perform certain actions which are otherwise blocked by default, like accessing system folders for the purpose of creating backups, and unlocking the bootloader.

## Flashing

After unlocking the bootloader, you can directly boot into TWRP and flash the ROM:

1.  `adb reboot bootloader`
2.  `fastboot flash recovery /path/to/twrp.img`
3.  `fastboot reboot`  
    To prevent the device from replacing your custom recovery automatically during first boot, after typing `fastboot reboot`, hold the key combo and boot to TWRP. Once TWRP is booted, it will patch the stock ROM to prevent the stock ROM from replacing TWRP. If you do not follow this step, you will have to repeat the install.
4.  Wipe data (optional):
    ```plaintext
    fastboot erase cache
    fastboot erase userdata
    ```
    With the above commands, the device is wiped clean of all the partitions mentioned including all data, and thus getting ready for flashing a new ROM on the cleanest manner possible as opposed to a *dirty* flash which has remnants of earlier ROM affecting performance.
5.  `adb push path/to/.zip /sdcard`
6.  Boot into TWRP recovery:  
    `adb reboot-recovery`  
    Do not format the system in TWRP. Doing a system/data wipe prior to flashing the ROM is not advised because if the files to be symlinked are not in the data folder, then it will be impossible to create links to them. If you do, then reboot to recovery again and flash immediately.
7.  Flash the zip located at `/sdcard`. Remember to turn off any verification.
8.  Reboot (and flash SuperSU)  
    TWRP should prompt you about installing SuperSU upon reboot, to which you accept (but doesn't actually give you root). According to one user, flashing SU after flashing these zip files helps as well.
9.  Flash busybox and Xposed (optional)
10. Wipe data and reboot (optional)
11. Flash `NON-HLOS.bin` and `fsg.mbn` (optional)
12. Edit `Build.prop`
13. `adb reboot-recovery`
14. Factory reset  
    Flash the ROM and only after that perform a factory reset. One user did it 3x before rebooting (without wiping `/system` before flashing the ROM) to regain root access.
15. Reboot
    
Coming from stock 4.4.4 should be fine, although if you do encounter any problems, a factory reset may be necessary. If issues arise, clear the dalvik cache after updating (step 4b and 9b), and try to factory reset (without system wipe) afterwards:
```plaintext
adb shell  
su system  
rm -r /data/dalvik-cache/  
rm -r /cache/
reboot
```
The initial boot takes about 8 minutes and Xposed's first boot (if enabled) takes about 20 minutes.

Some user's experience:

> Userdata not only can but usually is a problem on OS upgrades. What are the chances it's compatible? Not much from 4.4.3 to 5.1. I did run into nearly every problem I've read about (speakerphone, tethering, etc), so within a few weeks of 5.1, I had gone back and installed a) the radio (unzip radio.zip for your phone, follow the README), and b) same file, but the bootloader stuff at the end of README. To come full circle and get a completely working ROM, I blew away userdata (recovery/wipe/data) and let it rebuild.

## Issues

For the purpose of debugging, logs can be stored by running:  
`adb logcat -d > logs.txt`

### Inaccessible TWRP directory

After flashing the ROM, access to the TWRP folder on ES File Explorer may not be possible even though the folder is there. That's a sign that the TWRP directory has different permisiions than the other folders.  

To resolve, simply change the ownership of the directory by booting into TWRP recovery and using the command terminal to reset the permissions to `sdcard_rw`, like the other folders:  
```bash
cd /sdcard`  
chown -R sdcard_rw:sdcard_rw TWRP
```  

### Verification failed

Some user was trying to update from 4.4.4 on an unlocked XT1053. When selecting the zip file, it tried to verify, then failed.

To resolve, he was told to boot into TWRP recovery mode and flash the latest stable SuperSU zip *before* flashing the zip of the ROM. Someone else recommended him to flash the stock 5.1 firmware with RSD Lite first, then recovery and this ROM.

### Pass SafetyNet

SELinux is set to permissive on the modded versions (which fails SafetyNet). However, you may be able to flash the stock boot.img in fastboot mode to re-enable it.

### Fix tethering

1.  Use Root Explorer (or equivalent) to navigate to /system
2.  `mount -o rw,remount /system`
3.  `cp build.prop build.prop.orig`
4.  Edit build.prop (via root explorer) and add this line at the end:  
    `net.tethering.noprovisioning=true`
5.  Save the file and verify that the line is in it.
6.  `mount -o rw,remount /system`
7.  Reboot and test tethering.  
    You could also do that process through adb commands as well, but it'll be a slightly different way of doing the mounts rw and editing.

If this doesn't work out, run Xposed.

### Cellular data bug

Use tasker to disable cellular data when connected to WiFi. Of course, you need working WiFi to do so which is a problem on this ROM.

## Xposed

In the modded version of the ROM, the Xposed add-on that you flash is just the framework; you still have to install the Xposed Installer to use modules (`xposed-v79-sdk22-arm.zip`). According to one user, both v79 and v80 cause slow downs after a while followed by a non-responsive system. He recommends v78 or v75.

## OTA updates

OTA only works on stock ROMs and recovery, though some ROMs have OTA of their own. This ROM in particular had no OTA functionality as it was difficult to code and one had to set up a server for hosting files. This meant that any patches or new versions had to be manually flashed when they became available, like this [patch](https://xdaforums.com/t/rom-stock-5-1-stock-lollipop-flashable-zip.3155843/post-65955753) which only worked if one's system version was 222.27.5.ghost\_row.Retail.en.US.

To disable OTA, see this [post](https://xdaforums.com/t/rom-stock-5-1-stock-lollipop-flashable-zip.3155843/post-63142888). Note that Motorola Update Service can only be disabled for temporary relief; use Titanium Backup to freeze the service for long-term relief.

## Revert changes

The easiest way to [flash back to stock](https://xdaforums.com/t/guide-video-moto-x-return-to-100-stock-using-rsd-lite-or-manual-flash.2446515/) is to use RSD lite (6.2.4). You might have to download the [stock ROM](https://androidfilehost.com/?fid=24269982087012859) (`ATT_XT1058_4.4.4-KXA21.12-L1.26_CFC_1FF.xml.zip`) but the software should walk you through it:
1.  Fastboot flash the latest TWRP.
2.  Format the cache and data partitions. If you have issues with TWRP flashing the zip, where it can't read or mount a partition, you will have to format it to an ext4 filesystem. This can be done through TWRP.
3.  Flash the old recovery.
4.  Reboot.
5.  Flash the stock recovery.
6.  Do a factory reset, which will take about 5 to 10 minutes to complete.

## Bonus: Upgrade for XT1060

To upgrade using this ROM, you have to find a copy first. Then, follow either [this](https://xdaforums.com/t/rom-stock-5-1-stock-lollipop-flashable-zip.3155843/page-7#post-61945166) or [this](https://xdaforums.com/t/rom-stock-5-1-stock-lollipop-flashable-zip.3155843/post-62917920) thread. In case you get stuck, see [here](https://xdaforums.com/t/rom-stock-5-1-stock-lollipop-flashable-zip.3155843/post-65061860).

You may instead wish to follow [this tutorial](https://nerdschalk.com/download-verizon-moto-x-android-5-1-update-fxz-firmware/), though the ROM download link is broken.

It looks like the wave-to-wake feature is missing in the modded ROM. Flashing with the XT1053 ROM instead seems to be working, though a safer option is to achieve similar functionality by using [this app](https://f-droid.org/packages/com.jarsilio.android.waveup/).


[^1]: If the bootloader is locked, it may be still possible to flash the modded zip using [flashfire](https://apkpure.com/root-flashfire/eu.chainfire.flash/download/0.53), though the app clearly states that no development or compatibility testing has been done specifically for Motorola devices.