---
title: Resolving issues when upgrading Python on Linux
updated: 2025-07-17 14:53:40Z
created: 2023-08-06 17:58:57Z
tags:
  - python
  - troubleshooting
---

## Issue #1: Fix broken packages after a system upgrade

Each year, the Python interpreter gets a minor version upgrade. When that update ships to Manjaro users, Python packages in the system repositories will be automatically updated to match the newer interpreter version, yet non-system packages (from AUR, PyPI, GitHub, etc.) won't, which means that they would have to be manually re-installed.[^1]

Hence, after an upgrade, expect (1) `pipx` packages to point to the wrong interpreter version, and (2) [all the virtual environments to be broken](https://github.com/pypa/pipx/issues/146). For (1), a simple workaround would be to force `pipx` to re-create its shared virtual environment by manually deleting it and then reinstalling all `pipx` packages:
```plaintext
rm -rf ~/.local/pipx/shared/  
pipx reinstall-all
```
For (2), you must recreate each virtual environment from a `requirements.txt`. If you forgot to create the file before upgrading and you're using `pyenv` in conjunction `pyenv-virtualenv`, you can still salvage the package list by recreating the symlinks to point at a local Python version.

As a side note for `venv` and `virtualenv` users, if the virtual environment directory is stored within the project itself, it will also break every time the project location is changed, which is why some users prefer putting it under `~/.virtualenvs` with [virtualenvwrapper](https://github.com/python-virtualenvwrapper/virtualenvwrapper).

## Issue #2: Remove a manually installed Python version

In the event that you manually installed the latest Python version and didn't remove it prior to the upgrade -- [as advised](https://forum.manjaro.org/t/howto-remove-latest-aur-python-before-system-python-upgrade/142625) by the related announcement on the Manjaro forum -- you also need to remove the symlinks in `/usr/local/bin` [^2] that point to the old Python version, besides the Python installation itself. This command may prove useful for finding the ownership of certain files:
```plaintext
pacman -Qo /usr/lib/python3.x/site-packages
```
Note that this operation runs the risk of having breaking dependencies from the already installed `pip` packages. To view any manually installed packages, run:  
```plaintext
pip list --user
```
You also need to remove the local `pip` installation in `.local/bin` . As long as you do not run the command below with elevated privileges, only the non-system installed packages will be removed:
```plaintext
python -m pip uninstall pip setuptools wheel --break-system-packages
```
Once removed, replace it with `python-pip` to ensure it receives system updates:
```plaintext
pacman -Syu python-pip
```
Since Arch Linux (and Manjaro) are rolling releases, it's not recommended to do partial updates when installing or updating packages as they can break existing packages. What you should do instead is to refresh the package database (`-y`) and update any out-of-date packages on the local system (`u`).

## Issue #3: Update pip version

Note that every time you update `pip` with:
```plaintext
pip install --upgrade pip  
```
the standard `pip` command `/usr/local/bin/pip` is replaced with the updated version, which is problematic if multiple Python versions are present in your system (hence why you should use `pyenv`). To make sure you are running the correct `pip` version, always run it as an (executable) module:
```plaintext
python -m pip search <package>  
python -m pip install --upgrade pip 
```

## Issue #4: Install Python packages system-wide

Following PEP 668 that aims to avoid the possibility of user-installed Python packages breaking Python system dependencies, system-installed Python is now marked as “externally-managed” whenever `pip` is invoked to install packages, and the installation may only proceed if the command is repeated with the `--break-system-packages` flag included. Running `pip` with `sudo` privileges is strictly forbidden.

To install a Python package system-wide, search for it first in the official repositories, then in the AUR. If it's unavailable, use `pipx`, which creates an isolated environment for each package and its associated dependencies under  `~/.local/pipx/venvs/`, thus removing any risk to version conficts.
```plaintext
pipx install <package>
pipx run <package>      # for one-time use
```


[^1]: Although source code can be compatible across minor version changes, Python bytecode is minor-version-specific, and most packages contain bytecode, so Python packages have to be recompiled every year.
[^2]: `/usr/local/bin` is for normal user programs not managed by the distribution package manager, e.g. locally compiled packages. You should not install them into `/usr/bin` because future distribution upgrades may modify or delete them without warning. `/opt` is for monolithic non-distribution packages, generally reserved for large, poorly behaved third-party packages (from the likes of Microsoft).