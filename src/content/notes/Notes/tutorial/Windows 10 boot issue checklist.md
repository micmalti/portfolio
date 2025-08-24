---
title: Windows 10 boot issue checklist
updated: 2025-07-17 14:03:28Z
created: 2023-03-08 15:25:00Z
tags:
  - troubleshooting
---

To proceed, you must first [download](https://www.microsoft.com/en-us/software-download/windows10ISO) the Windows 10 ISO and transfer it onto a USB drive with Ventoy installed (which sidesteps the use of the Windows Media Creation tool). Then, select the USB drive from the boot menu, and choose: Repair your computer > Advanced options > Troubleshoot.

## Use Startup Repair

Startup Repair is a Windows 10 tool which can automatically fix problems that are preventing your PC from starting correctly. To launch it, select 'Startup Repair' from the Advanced options menu.

## Fix corrupted MBR

If the MBR (Master Boot Record) of your system drive gets corrupted, it can cause the “No boot device available” error. Boot into a Windows installation media, go into the Advanced options and at the command prompt, enter:
```dos
bootrec /fixmbr
bootrec /fixboot
bootrec /scanos
bootrec /rebuildbcd
```

`bootrec` sometimes has problems finding the proper boot device and Windows installation to fix. When this happens, the last command returns the error:

> The requested system device cannot be found.

## Repair Windows file system

```dos
diskpart
sel disk 0
list vol
exit
```

Run `chkdsk` for all the identifed drives, like so:  
`chkdsk D: /f`

## Repair EFI bootloader

`bcdedit` can be used to manage BCD stores on a WIndows machine which describe boot applications and boot application settings. A broken EFI bootloader returns the following error message:

> The requested system device cannot be found.

Before proceeding with [this procedure](https://superuser.com/questions/460762/how-can-i-repair-the-windows-8-efi-bootloader), make sure that your EFI partition is formatted as FAT32.

With the EFI partition on `B:`, execute:
```dos
cd /d b:\EFI\Microsoft\Boot\
bootrec /fixboot
```

Delete or rename the BCD file:  
`ren BCD BCD.bak`

With the Windows partition on `C:`, recreate the BCD store:  
`bcdboot c:\Windows /l en-gb /s b: /f ALL`

The `/f ALL` parameter updates the BIOS settings (including UEFI firmware/NVRAM), and `/l` is included to specify a different locale other than the default US English.

See also this [thread](https://superuser.com/questions/1285268/cannot-boot-windows-10-bootrec-fixboot-gives-access-denied).

## Format EFI partition to FAT32

The procedure outlined in [this comment](https://screwlooseit.com.au/windows-10-bootrec-the-requested-system-device-cannot-be-found#comment-211 "https://screwlooseit.com.au/windows-10-bootrec-the-requested-system-device-cannot-be-found") is particularly known for fixing boot issues arising after [cloning to a larger SSD](https://www.youtube.com/watch?v=C1ILmeCGLYs), namely having the EFI partition being converted from FAT32 to NTFS. You may want to repeat the cloning process with different software, [just in case](https://answers.microsoft.com/en-us/windows/forum/all/boot-problem-after-ssd-clone-on-windows-10/70690b33-31be-424b-b158-ece095f3b1c4).

Enter `diskpart`.

Identify the EFI partition with `dir` command. There should be boot files but no EFI folder. If you are unable to read a particular volume, use `chkdsk` to repair its file structure and try again.

If necessary, assign a drive letter to the identified volume:
```dos
sel vol 3
assign letter=D:
```

Clean out the damaged partition and make it usable for EFI:  
`format D: /fs:FAT32`

With the Windows partition on `C:`, issue the command:  
`bcdboot C:\windows /s D:`

WARNING: Make sure you know what you’re doing and format the right EFI partition! Not your active C:\\Windows drive or any data drives! Anything over a couple hundred MB in size won’t be an EFI partition.

Finally, check that the boot option in the BIOS is set to `UEFI` and not `legacy`.

## Check the hardware

Seagate provides a [checklist](https://www.seagate.com/gb/en/support/kb/the-bios-does-not-detect-or-recognize-the-solid-state-drive-005707en/) for troubleshooting an internal SSD that is not detected in the BIOS.

Disk health monitoring utilities exist for both Windows and Linux, with popular ones being [CrystalDiskInfo](https://www.majorgeeks.com/files/details/crystaldiskinfo_portable.html) and `smartmontools`. Note that since SATA interface errors are reported distinctly from drive errors, the tests are primarly independant of the SATA cable. If you suspect a bad cable you should replace it. See [here](https://superuser.com/questions/641219/possibly-a-dying-hard-drive-but-reads-writes-work-unsure-about-log-entries/642771#642771) for further discussion on this topic.

Follow this [guide](https://www.lifewire.com/fix-computer-that-turns-on-but-displays-nothing-2624443) for an in-depth hardware check.

## Conclusion

Hopefully, you managed to resolve your issue using one of the solutions provided in this checklist. If not, my recommendation is to read [this article]( http://rakhesh.com/windows/notes-of-uefi-gpt-uefi-boot-process-disk-partitions-and-hyper-v-differencing-disks-with-a-generation-2-vm/) which begins with an in-depth explanation of GPT/UEFI boot, but then proceeds to lay out some details on how to create a proper disk layout for UEFI boot from a GPT disk.

Good luck.