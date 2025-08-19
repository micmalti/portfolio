---
title: Getting to know Git a question at a time
updated: 2025-06-13 08:52:13Z
created: 2021-06-11 10:51:00Z
latitude: 35.89547060
longitude: 14.46650720
altitude: 0.0000
---

For a long time, Git always felt like a stranger to me, having to search all the time the commands to do even the most basic of tasks, and failing to properly integrate it in my workflow. After losing all my untracked files when I failed to use the `-u` flag with stashing, I finally realised that a basic understanding of Git wasn't cutting it. So, I turned to arguably the most authoritative book ever written about Git to overcome this pain point once and for all.

The following are my book notes for _Pro Git_, at least the parts which were of interest to me and which I considered to be fundamental, though I still highly recommend that you read it for yourself afterwards. The notes purposefully include questions which may come up to someone new to Git, accompanied by procedural answers, meant primarily for those who wish to use the terminal to interact with Git and upload their code on GitHub.

## Getting started

### What is Git?

Git is a _distributed_ version control system, meaning that clients don't just check out the latest snapshot of the files like in Subversion, which is a centralised VCS, but rather fully mirror the repository, including its full history - thus, every clone is really a full backup of all the data, granting redundacy, offline functionality to nearly every operation, and allows different groups of people to collaborate in different ways simultaneously within the same project (given support of several remote repositories they can work with)

Upon every commit (or, put differently, each time the project state is saved), Git takes a _snapshot_ of how all files look like at that moment and stores a reference to it - for unchanged files, Git won’t store the file again, instead creating a link to the previous identical file it has already stored - contrast this to other systems like Subversion which think of the information they store as a set of files and the changes made to each file over time (described as delta-based version control).

everything _checksummed_ before it gets stored in Git database so as to be referred to by that checksum, a SHA-1 hash of the contents of a file or directory structure, where its first two characters used as folder name, the remainder as filename - this is done because some file systems perform poorly having millions of files in same directory

:::note checksumming done to verify data integrity, by detecting errors that may have been introduced during data transmission or storage - checksums inept for password hashing because they are generally shorter and more prone to collisions, meaning that you can try random passwords and have a chance that your input has the same checksum as the original password :::

Git creates a graph whose data structure is a linked list, so with starting off from the end i.e. `HEAD`, or a unique identifier and `^`, you can go a step prior or use `~` followed by an integer $n$ to go $n$ steps prior - this works with symbolic words like and branch names.

at its core, git involves just two actions:

```bash
git add hello.txt
```

which takes content of `hello.txt`, run in through a hash function, compress it, then save output to a file, and

```bash
git commit -m "First hello"
```

which creates two files, one that preserves the file directory structure of the hashed content and another to store commit metadata

git considers that to be same file since filename of hashed content doesn't feature filename of unhashed content - the second created file responsible for creating pointers to hashed files

### How do I get started with Git?

Visit [here](https://git-scm.com/downloads) to download the version compatible with your machine. For Arch-based distros:

```plaintext
pacman -S git
```

### I signed up for a new GitHub account. How can I set up GitHub access from the terminal?

Traditionally, remote repos were accessed via HTTPS. However, it is recommended that you connect to GitHub using the Secure Shell Protocol (SSH), which provides a secure channel over an unsecured network, although this requires an SSH key. To check if existing SSH keys are present on your machine, type:

```bash
ls -l ~/.ssh
```

The default filenames of supported public keys for GitHub are: id_rsa.pub id_ecdsa.pub id_ed25519.pub

If you don't have a supported SSH key, you must generate a new one to use for authentication:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

By entering a strong passphrase when prompted, you will prevent an attacker with access to your computer from also having access to every system which uses that key. `ssh-agent` can securely save your passphrase so you don't have to re-enter it every time you need to use the key, although you have to do this for each new session:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

To force the key file to be kept permanently, add it in `~/.ssh/config` (may need to be created with `600` permissions):

```bash
IdentityFile ~/.ssh/id_ed25519
```

If you want to set the key specific to one host, type this into the file instead:

```plaintext
Host github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
```

You can change the passphrase for an existing private key without regenerating the keypair by typing:

```bash
ssh-keygen -p -f ~/.ssh/id_ed25519
```

Copy the contents of the public key that you just generated and add the new SSH key to your [GitHub account](https://github.com/settings/ssh/new). Alternatively, you may use the GitHub CLI:

```bash
gh ssh-key add ~/.ssh/id_ed25519.pub --title "personal laptop"
```

To verify that your key works, connect to GitHub using SSH:

```bash
ssh -T git@github.com
```

Since the release of Git 2.34, it is now possible to [sign arbitrary data with your SSH keys](https://www.agwa.name/blog/post/ssh_signatures?s=09), including Git commits.

### How to configure Git?

Git configuration settings, issued via `git config`, may apply:

- system-wide with `--system`, stored in `/etc/gitconfig`
- specifically to current user with `--global`, stored in ` ~/.gitconfig`, or
- specifically to current Git repository with `--local`, stored in `.git/config`

while Git will read the same key from different files:

```bash
git config --list --show-origin
```

settings from a more restricted level override those in a previous level

aliases may be created for specific functionality:

```bash
git config --global alias.last 'log -1 HEAD'
```

refer to `git help config` for a list of available keys

To view the current user credentials

```bash
git config --list
```

`~/.gitconfig` or `~/.config/git/config` applies settings to a single user. To make changes to this file, use the --global option with the git config command.

### Switch between profiles

### How to set up my .gitignore file?

==Setting up a .gitignore file for your new repository before you get going is generally a good idea so you don’t accidentally commit files that you really don’t want in your Git repository.== There is no need to start one afresh, though. As a starting point, check out this [collection](https://github.com/github/gitignore) of .gitignore templates.

Patterns with a forward slash (/) avoid recursivity, while patterns ending with a forward slash (/) specify a directory.

Any nested `.gitignore` files will apply only to the files under the directory where they are located.

## Managing repositories

### How do I enable Git version control for an existing code project stored locally?

First, create the central repository on a server by initializing a bare repository:

```bash
ssh user@host git init --bare /path/to/repo.git
```

For third-party hosting services like GitHub, this will be handled behind the scenes, returning an address for the central repository to access from your local repository.

Next, clone the repository to create a local copy of the entire project. Git will automatically add an `origin` that points back to the parent repository.

:::note The .git extension is conventionally appended to the repository name to indicate that it is a bare repository. :::

Then, within your root project directory, create a local Git repo (defaults to naming master branch `main`, unless `-b` flag is specified):

```bash
git init
```

Make sure to use an SSH remote URL to link your local repo with a remote GitHub repo:

```bash
git remote add origin git@github.com:<user>/<repo>.git
git remote -v
git branch -M master
git push -u origin master
```

!!! note `-u` flag sets `<remote>` as the upstream remote in your git config, which is useful if you don't want to manually specify the remote every time you run git push or git pull !!!

If you had added a README or a license file, you also need to perform these additional steps before pushing changes to the remote repository: **MISSING**

To fetch a branch from the remote repository:

```bash
git fetch <origin> <branch>:<branch>
```

A `git pull` brings a local branch up-to-date with its remote version, including updates to the other remote-tracking branches. In its default mode, the command is the same as running git fetch followed by git merge `FETCH_HEAD`:

```bash
git pull upstream master
```

If changes to the codebase are being made by different collaborators, these steps need to be performed regularly to ensure that your local repository stays up-to-date:

```bash
git checkout master
git pull origin master
git checkout <branch>
```

### How can I start committing code to the remote repository?

It's helpful to think about the next few commands in terms of their effect on the three state management mechanisms ("trees") of a Git repository: the working directory, the staged snapshot, and the commit history.

```bash
git status      # view current branch and any (un)staged changes
git add .
git commit -m 'Commit message'
git log         # view commits
git stash
git stash pop   # get back unstaged changes
```

With `git stash` the rest of the unstaged changes in current branch are saved, enabling you to switch to a different branch or update a previous commit.

A `.gitignore` file will prevent certain files and directories from being accidentally committed to the Git repo when executing `git add .`.

Passing `git commit` without a commit message opens Vim. The conventional way of doing it is to type the subject of your commit on the first line (not more than 50 characters) then leave a blank line after to write a detailed description of what happened in the committed change (optional). You can use multiple paragraphs and bullet points to give a detailed breakdown. Wrap text at 72 characters.

[How to Write a Git Commit Message](https://cbea.ms/git-commit/)

To modify the latest commit:

```bash
git commit --amend
```

Until you push your changes to a remote repository, any changes made in Git are only reflected in your local development environment. To unstage staged changes:

```bash
git reset /path/to/file
git reset                               # unstage all changes
git reset <commit-sha>                  # point the HEAD of your current branch to that commit
git reset <commit-sha> /path/to/file    # updates the staged snapshot to match the version from the specified commit
git reset --soft HEAD~1                 # undo last commit
```

Note that, by default, a reset operation leaves the working directory unaltered while resetting the other two "trees" to match the state of the repository at that specified commit, while unstaging any committed changes that followed it. Its behaviour may be changed by including a flag (default is `--mixed`):

- `--soft` doesn't alter the working directory and staged snapshot
- `--hard` updates the working directory and staged snapshot to match the commit

This command should be reserved for undoing local changes since it creates orphaned commits which will be deleted the next time Git performs a garbage collection.

To stage the removal of file(s) from the remote repo (assuming they was already committed before):

```bash
git rm --cached /path/to/file
```

That said, if you use this command on a new file that is staged, it would look as if you just unstaged it. The end result is the same: untracked file(s).

A similar command is used to stage the removal of file(s) both locally and from the remote repository:

```bash
git rm -r path/to/dir
```

### Let's say I want to remove an entire local repository. How do I accomplish this?

```bash
rm -rf .git
```

## Tracking changes

**working tree** - a single checkout of one version of the project - corresponding files pulled out of compressed database in **Git directory** (what is copied when cloning a repository from another computer), which stores the metadata and object database for your project, and placed on disk for you to use/modify - **staging area** is a file, generally contained in your Git directory, that stores information about what will go into next commit - once a particular version of a file is in Git directory, it is considered committed - nearly all actions in Git add data to Git directory, making it very difficult to lose data

each file in working tree either tracked or untracked, referring to any files in working directory that were not in a previous snapshot and not yet staged - tracked files are the only files that Git knows about:

```bash
git status
```

`git add` stages (tracked) files and tracks new ones, besides other stuff - any further changes made won't be reflected in a later commit, thereby allowing for possibility of the status of working tree and staging area to be different, unless command run again - `git diff`compares unstaged changes in working directory with staged changes

staging files means a checksum computed for each one, those file versions (blobs) are stored in Git repository, and their checksum added to the staging area

### Remove files

if file committed by mistake and should have instead be untracked:

```bash
git rm --cache <FILE>
```

running `git rm` on a removed file from working directory (will remove file if haven't been removed yet) stages its removal and won't be tracked anymore after subsequent commit - include `-f` option if file had already been added to staging area

### Rename files

Git still able to detect file movement after the fact even though no metadata stored telling it about renamed files - using `git mv` saves you the trouble of having to run `mv` then stage change with `git rm <old file>` and `git add <new file>`

### I've made a mistake and wish to revert back to an older commit. How can I do that?

```bash
git reflog         # find the commit you want to return to
git revert --no-commit <commit-sha>..HEAD
git commit         # commit the current tree
```

The `--no-commit` flag lets git revert all the commits at once - otherwise you'll be prompted for a message for each commit in the range, littering your history with unnecessary new commits.

A revert is an operation commonly used within a public branch that takes a specified commit and creates a new commit which inverses the specified commit. Unlike a reset, it doesn't overwrite history remote team members may be dependent on. The operation will not proceed if there are uncommited changes.

Unfortunately, commits may contain incomplete work or relate to more than a single change, which makes reverting quite risky.

To delete an older commit, say 5 lines prior:

```bash
git rebase -i HEAD~5
git push origin +master
```

### How can I ensure that each commit neatly relates to only one change before pushing my changes?

Rather than fight the natural tendancy to work on different parts of the codebase at the same time, in the hopes of producing a focused PR, just accept the fact that commits won't be linear when they are first made, but [they can become when submitted for review](https://render.com/blog/git-organized-a-better-git-flow). The idea is fairly simple: make `WIP` commits until you finish making your changes, then reset to the latest commit on the remote branch:

```bash
git reset origin/master
```

This will look as if you did all the work but never made any commits. Now, using your best judgment, identify logical groups within the changed files to add to your staging area, and make a commit for each, describing the changes made. The key principle here is the separation of the engineering work from commit writing.

It is worthwhile mentioning how useful it is to follow a [style guide for commit messages](https://udacity.github.io/git-styleguide/index.html).

## Making checkpoints

A given commit can _either_ refactor (in which case your tests do not change) _or_ change functionality (in which case your tests demonstrate the change in expectations). Never do both at the same time.

`git commit` launches editor of choice to type commit message and once exited Git creates commit with that commit message (with the comments and diff stripped out) - every time commit performed, a snapshot of your project recorded that you can revert to or compare to later

### Review commit history

To quickly browse what happened during a series of commits, use `git log` with appropriate filter and output format, for instance:

```bash
git log --pretty=format:"%h - %an, %ar : %s" -- <file>
```

### Reverting commits

However, instead of reverting commits, first consider "rolling forward" by [fixing the issue in-place](https://artsy.github.io/blog/2017/10/26/Git-Reverts/), disabling the problematic functionality if it is already in production.

### Redo commit

to overwrite a previous _local_ commit:

```bash
 git commit --amend
```

which takes whatever has been staged at that moment (missing files) for next commit, offering possibility to set a new commit message as well

to amend an older commit

to remove stuff from a commit

### Discard changes

to discard changes made since last commit:

```bash
git restore <file>
```

whereas to unstage file (or more accurately, revert back to last staged version), add `--staged` option

### Skip staging for tracked files

```bash
git commit -a -m <message>
```

view last commit on branches that are yet to be merged in current branch (unless a branch specified):

```bash
git branch -v --no-merged <branch>
```

to list what each local branch is tracking and whether it is _ahead_ (if there are local commits not yet pushed), _behind_ (if there are commits on the server not yet merged in) or both, since last time you fetched from server:

```bash
git fetch --all; git branch -vv
```

## Tagging

similar to how `git commit` creates a file for commit metadata, with a pointer to the root tree (and another that lists the contents of the directory and specifies which file names are stored as which blobs),

```bash
git tag -a release-v4.1 <commit hash>
```

creates a file containing tagger name, email, date and tagging message - this is useful to tag specific points in a repository’s history as release points (last commit tagged unless abbreviated commit hash specified) - another option is to just create a soft link to a specific commit without any metadata (known as lightweight tag), but this isn't recommended

by default, `git push` doesn’t transfer tags to remote servers, but will with `--tags` option - to remove a tag:

```bash
git push <remote> --delete <tag>
```

you can switch to a particular tag version with `git checkout <tag>` but this puts repository in “detached HEAD” state, meaning any new commits from here won’t belong to any branch and will be unreachable, except by the exact commit hash - hence, just create a branch from the outset:

```bash
git checkout -b <new branch> <tag>
```

## Rewriting history

Rewriting public history (via rebase, filter-branch, amend, etc.) is considered to be a bad practice since it inhibits collaboration.

Once a PR is approved, a squash commit is usually made to reduce all the commits in the feature branch to a single commit on `main`. While this simplifies the commit history, as only the completed work needs to be documented, it also loses granularity in your commits, making it more difficult to debug.

### What if I want to commit in the past?

Step 1: Initialize both a local and remote Git repository but do not push anything Step 2: After the initial commit, run:

```bash
git rebase -i --root
```

Change `pick` to `edit`, save and close. Now, run:

```python
git commit --amend --no-edit --date="Thu Jan 13 11:00:37 2022 +0100"
git rebase --continue
```

Step 3: Repeat step 2 for each of the other commits, but replace `--root`:

```python
git rebase -i HEAD~1
```

Step 4: Push changes:

```python
git push -u origin master
```

In case you have already pushed changes with an incorrect commit date, use instead:

```python
git push origin master --force
```

## Working with remotes

`git clone` implicitly adds `origin` remote, the default name Git gives to server you cloned from - to add a remote Git repository as a shortname you can reference easily:

```bash
git remote add <shortname> <url>
```

command on its own displays list of remote repositories from which to pull contributions and push, if given permission, but more importantly, can reveal information about a particular remote:

```bash
git remote show <remote>
```

showing local branches that are missing from remote server because they have been removed or haven't been pushed yet, and which remote branches have never been pulled yet

to removing a remote, along with all remote-tracking branches and configuration settings associated with it:

```bash
git remote remove <remote>
```

### Pushing changes

to push local commits to remote branch (which may not exist yet, as in the case of a new GitHub repository):

```bash
git push <remote> <branch>
```

this will fail when local branch behind its remote counterpart, requiring a prior `git pull` to merge remote changes

:::note `push.default` defines action `git push` should take if no refspec is given - for new branches to be pushed to default remote by default (like behaviour of `push.default=current`), set:

```bash
git config --global push.autoSetupRemote=true
```

however, recommendation is to take cautionary measure and be explicit :::

### Merging

`git fetch` updates your remote-tracking branches under `refs/remotes/<remote>/`, bringing the local copy of the remote repository in `.git/` up-to-date, while leaving your local branches under `refs/heads` unchanged. To integrate the commits into your current branch, you must then use `git merge` afterwards.

`git pull` does both: it pulls the entire upstream commit history into the local repository then tries to merge those changes into your currently active branch by calling either `git rebase` or `git merge` to reconcile diverging branches, without letting you review them first:

```bash
git pull <remote> <branch>
```

Adding the `--rebase` option will skip the superfluous merge commit, unless there is a merge conflict.

The benefit of doing a rebase lies in each local commit being transferred to the remote branch one at a time, allowing merge conflicts to be caught on a commit-by-commit basis rather than having to resolve all of them at once in a single, massive merge commit:

```bash
git status      # see conflicted files
git add <file>  # resolve conflict
git rebase --continue
```

To cancel the rebasing procedure:

```bash
git rebase --abort
```

to merge a branch (or several) into the current working branch (say, `master`):

```bash
git merge feature-splash
```

which is shorthand for:

```bash
git merge-base master feature-splash
```

this walks back the paths on all branches given until a common ancestor found for all of them - merge known as a **fast-forward** when changes do not cause branches to diverge (like when changes made to a single branch)

Only after fully syncing with the central repository can your local changes be pushed successfully.

## Pull requests

Code review in GitHub is called “pull request”, and each feature has a pull request.

### How can I contribute to an open-source project?

A CODEOWNER file maps paths to GitHub handles. When a Pull Request is created and if appropriately configured, GitHub will go over the list of paths changed by the PR, and for each of these paths, find the matching GitHub handle. Then, it adds the handle to the list of reviewers of the Pull Request, thereby removing the need for PR authors to manually select the reviewers.

A fork creates an exact replica of a repository into your account with a link back to the original. To make changes to this copy, you need to clone it to your local system:

```bash
git clone <repo URL> <dirname>
```

This will create a directory named `<dirname>` (which defaults to the remote repo name if excluded), and within it pulls down all data for that repository, initializes a `.git` directory, and checks out a working copy of the latest version.

Git will also add the 'origin' remote to the local copy that points back to the forked repository in your account. This is an issue if your real goal is to contribute back to the original repository, or want to mirror changes made in the original repository locally. The solution is to add a Git remote pointing back to the original:

```bash
git remote add upstream <repo URL>
```

Without the required permissions, push changes to the original repo will fail. Instead, you need to issue a pull request so that the changes are discussed and reviewed by collaborators (likely with some follow-up commits) before your changes are merged into the base branch. Note that some projects have specific requirements around branch names for pull requests, so be aware of any such guidelines.

To contribute to an open-source project, fork the project i.e. create your own public clone, and push your changes to it. Then, you can send a request to the project maintainer to pull in your changes. The maintainer can then add your repository as a remote, test your changes locally, merge them into their branch, and push back to their repository.

## Stashing

## Branching

### So I've heard about Git branches. What are they exactly?

Git branches are a way of creating separate lines of changes, independent from `main`, the default branch that is created when initialising a Git repository. A good rule of thumb is to limit a branch to a specific feature.

The `git checkout` command can be used to switch to a different branch or to a specific commit, which will change the file contents to those of the selected commit. When you use the git checkout command with a branch name, it will switch to that branch and make its commit the `HEAD` commit:

```bash
git checkout -b <new branch name>
```

The `-b` flag is only necessary to create the branch.

Changes in the `dev` branch undergo reviews and, after testing, get merged with the `master` branch. `test` contains all the code for QA testing and automation testing of all changes implemented

Consider the following guidelines for naming temporary branches:

1. Begin by specifying the branch type e.g. bug, feature
2. Use a / to separate the branch type from the main branch name and - as separators for the latter e.g. bug/side-panel
3. (Optional) Open a GitHub issue related to that branch and include its ID To retrieve the ID of an open issue, you need to make an authenticated request to the GitHub API with a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token):

```bash
echo GH_TOKEN
curl -u <user>:<github_token> https://api.github.com/repos/<user>/<repo>/issues
```

Storing the PAT in `~/.bashrc` as an environment variable ensures that it won't get lost, and if specified as `GITHUB_TOKEN` or `GH_TOKEN`, it will also be used by the GitHub CLI package for authentication purposes (more on this later on).

If you wish to know what else can you retrieve using this syntax, view the [GitHub REST API documentation](https://docs.github.com/en/rest/reference/issues). Some tasks may also be achieved by using the GitHub CLI.

As long as you'll maintain consistency across your code projects, you can follow whichever naming rules you want.

Thus, in order to keep the master node with a working version at all times, changes should be made on separate branches:

```bash
git checkout <branch>
git branch                          # view local branches
git branch <old> <new>              # change branch name

git checkout master
git merge <branch>                  # merge changes on local branch
git push origin master              # push changes
```

If your branch is no longer directly based off of the branch you're trying to merge it into e.g. another commit was added to the destination branch that isn't in your branch, Git won't let you push changes. A fast-forward merge in the destination repository requires your branch to completely contain the destination branch.

Once you're ready from a temporary branch, you can delete it both locally and remotely:

```bash
git branch -d <branch>
git push origin --delete <branch>
```

The `-d` option will delete the branch only if it has already been pushed and merged with the remote branch. The `-D` flag will force branch deletion regardless.

Git's 3-way merge does not track individual commits, only the merge base and branch tips

resolving merge conflict in VS Code superior owing to ease of comparison between conflicting parts

renaming branches (especially remotely) likely to break existing CI/CD configs, so avoid it as much as possible:

```bash
git branch --move <old branch> <new branch>
git push --set-upstream <remote> <new branch>
git push <remote> --delete <old branch>
```

```bash
git branch -u <remote>/<branch>
```

### How do I manage branches?

It is cheap to create branches in Git, because, unlike other VCS tools, the entire codebase doesn’t need to be copied over to the new branch, involving instead the creation of a pointer to the latest commit. ==But eventually these branches have to be merged back together, and many maintainers spend an inordinate amount of time coping with their tangled thicket of branches.==

A branching strategy comprises a set of rules that stipulate how developers should interact with a codebase, when writing, merging and deploying code using a version control system like Git. In collaborative projects, this helps reduce the number of merge conflicts and maintain an efficient release cycle, but adopting one as the sole maintainer on a project is equally beneficial since it forces you to work on just a single feature in each branch, which makes for a cleaner commit history, and to test out code without running the risk of breaking the mainline branch.

[GitFlow](https://nvie.com/posts/a-successful-git-branching-model/), a popular strategy from 2010, consists of five types of branches: `feat` branches are created and merged into `dev`, from which `rel` branches are created to coordinate each new production release. These only receive merges from `fix` branches, which arise from bugs discovered in `main` that must be quickly resolved and merged back. Bugfixes from `rel` may be continuously merged back into `dev`, prior to the actual merge into `main`.

[Git Organized: A Better Git Flow | Render Blog](https://render.com/blog/git-organized-a-better-git-flow)

[Trunk-based development](https://trunkbaseddevelopment.com/) reflects good CI/CD practices since it promotes the idea of making smaller changes more frequently, often multiple times a day, directly into `main`, which allows features to be released much faster.

Feature flags play a crucial role here by allowing teams to _integrate their changes quickly_ for better visibility, preventing the need for long-lived branches and reducing merge conflicts, while not affecting production behaviour (in the case of incomplete or experimental features). This ensures `main` remains in a deployable state and automated CI tests pass even when incomplete features are present. Once a feature is fully developed and tested, the flag can be toggled on, ensuring a seamless release without requiring additional deployments.

:::note Feature flags are also useful in Continuous Delivery for controlled feature rollouts and real-time monitoring in production. :::

A pre-integration build check (preceeded by pulling the latest changes) will verify that the changes made won't break the build when they are pushed. Since, unlike GitFlow, changes will be integrated directly into `main`, this means that the _testing has to be more rigourous_ to reduce the likelihood of bugs in the production code, which makes TBD less of an ideal approach for inexperienced developers.

GitHub Flow lies somewhere in the middle, as it can be viewed either as trunk-based development with an explicit PR process, or a more streamlined approach to GitFlow, where feature branches stem directly from `main` and are then merged back into it. Larger teams may use short-lived feature branches where “short” means no more than a couple of days; the only way to avoid lengthy feature branches is to have a _granular task definition_.

While some teams may consider code which was pair programmed as to not warrant additional review, the conventional way to integrate commits into the mainline branch is through a pull request that is visible to the team. The longer a branch exists, the more likely it is to drift from `main`, increasing the risk of merge conflicts, which is why code review branches should be deleted after the review is complete and be very short-lived.

Unless multiple versions need to be maintained, there is no need for release branches, and releases can simply be tagged directly on `main`. Although the bug fixes being added to a feature branch will likely be smaller than new feature code which continues to be added on `main`, conflicts can still arise as the code evolves. To avoid these issues, some teams prefer to first apply fixes directly to `main`, ensuring they work in the latest version of the code. Once verified, they cherry-pick the changes into the release branch if an immediate patch is needed.

:::note ==A cherry-pick is when a commit is copied from one branch to another, but the branches aren't merged. That is, only the one commit is copied over, not the previous commits since the branch point.== :::

Ultimately, the choice of strategy hinges on the size and experience of the team that is working on the project, as well as the nature of the project itself. There isn't even the need to stick with one strategy religiously but can mix and match aspects from different workflows to suit your individual needs, provided that you implement best practices, namely having small, frequent commits, to avoid cherry-picking changes between branches or to reduce the chances that a locally passing build will fail to get merged due to a race condition.

For further reading on this topic, check out this [blog post](https://martinfowler.com/articles/branching-patterns.html) by Martin Fowler.

### How do I name branches?

==It’s also useful to adopt a coherent and shared naming convention for branches in order to leverage automation and also clearly communicate to others what is the purpose and scope of a branch==

[](https://mooltiverse.github.io/nyx/guide/user/best-practice/branching-models/)

## Merging

When all the work in your topic branch is ready to be integrated into a more mainline branch, merge it into develop; then, when you tag a release, you fast-forward master to wherever the now-stable develop branch is.

## Submodules

Submodules allow you to keep a Git repository as a subdirectory of another Git repository. This lets you clone another repository into your project and keep your commits separate.

### I want to fork a project and make some changes to it while still be able to receive new pull requests from the original project, should there be any.

### I was asked to load a repository as a sub-module. What is that?

Submodules allow foreign repositories to be embedded within a dedicated subdirectory of the source tree, always pointed at a particular commit. See [here](https://stackoverflow.com/questions/47008290/git-how-to-make-outer-repository-and-embedded-repository-work-as-common-standal).

Hugo themes, for instance, are [loaded as sub-modules](https://tangenttechnologies.ca/blog/hugo-themes/).

## Debugging

In large codebases, it can be difficult to manually locate the source of a problem using print statements or breakpoints, forcing the developer to have to search through the commit history to find the commit where the bug was introduced. With `git bisect`, this process can be automated by providing two control points: a commit where the bug is absent, and a commit where the bug is present:

```bash
git bisect start
git bisect bad    # assumes HEAD is bad commit
git bisect good <hash>
```

Git will perform a binary search, and at each step expects that you run your tests against the halfway commit to respond whether the issue still exists. To fully automate the process, you can have a script which runs the tests that will exit 0 if the project is good, otherwise 1:

```bash
git bisect run test-error.sh
```

Once finished, remember to reset the HEAD to where you were before you started:

```bash
git bisect reset
```

## Managing hooks

[Complete guide to Git hooks](https://www.youtube.com/watch?v=ObksvAZyWdo)

[](https://github.com/dictcp/awesome-git?tab=readme-ov-file#hook-management)

Typically, how exactly should the file be written is specified in the formatter docs.

Specific tools exist like `pre-commit` eliminate the steps needed to create a Git hook entirely, in favour of a config file with preset instructions on the version of the tools used, which helps to introduce consistency across different environments.

Formatting tools modify the code according to preset rules, whereas linters catch potential bugs. In general, I'm wary of formatting tools and prefer to be notified of the issues in the IDE to decide whether to fix them, or not.

### How can I automate my workflow using GitHub Actions?

GitHub Actions is used in Continuous Integration to verify the quality of a pull request before merging and in Continuous Delivery to automate rebuilds and deployments triggered by changes in the codebase.

This requires the creation of a GitHub access token from your profile's Developer Settings. Make sure you allow system-wide access to the token (for use by code editors):

```bash
git config --global credential.helper <token>
```

[GitHub CLI](https://cli.github.com/manual/) is a package that needs to be installed and configured separately. It comes pre-installed in all GitHub-hosted runners which are VMs hosted by GitHub with the GitHub Actions runner application installed. In fact, this tool is primary geared towards improving interaction with automation workflows. GitHub Actions usage is free for both public repositories and self-hosted runners.

```bash
yay -S community/github-cli
```

Use `act` to run your workflow locally, to reduce the feedback waiting time while debugging the build pipeline, and to ensure it is configured correctly before consuming CI minutes unnecesarily. `act` doesn't have feature parity with GitHub Actions. Refer to [this](https://nektosact.com/not_supported.html) list of features that is (yet) to be implemented or is decided as not going to be worked on by its maintainers.

Protect the entire pipeline from running too long by using `timeout-minutes`.

## Tooling

Although much of Git has been abstracted away, for the most part, by the IDE, I still believe that having a sound knowledge of the actual Git commands will be less taxing to users who face UI only for that to change and be unable to use such a powerful piece of software. If certain functionality is improved, then it makes sense to switch to a UI-based solution, but not forget the underlying commands being invoked, so there won't be any nasty surprises.

In my opinion, VS Code already does enough to simplify certain Git functionality out-of-the-box without having to rely on features provided by extensions. Two in particular are:

- staging hunks from the Git panel (alternative to `git diff --staged`), and
- comparing changes in an active file with an older commit, or between any two commits on a file, by selecting the commits from the Timeline section of the Explorer pane, which also displays the local checkpoints, unless filtered

For merge conflicts, VSCode's merge editor is fine.

If I'm interested in analysing past commits, I'd prefer using the GitHub UI, rather than having to rely on extensions or use the CLI. Keeping my editor as much minimalistic as possible and not having to worry about toggling off uneccessary features is more productive.

Case in point is Git Graph which offers pretty much the same commit history as `git log -p` Another one, Git Blame to view the last commit which introduced a change in the current line is quicker than issuing:

```bash
git blame -w -L <line num> -- <file>
```

But here's a limitation of not using the CLI. Let's say the change made doesn't address what we wanted to know and we wish to view the previous commit. This cannot be achieved directly by the extension and is better handled from GitHub's UI.

One popular extension, GitLens, comes with many features that are intended to improve the viewing experience and accessibility of some common Git actions. Personally, I find the extension overbloated, with features that require integration to GitHub to work which I won't be doing, since which pose a security risk as you will be giving them read access to both public and private repositories.

For doing actual work (commits, merges, rebasing), I stick with the CLI and enhance its usage with this curated list:

- [hub](https://github.com/mislav/hub): Git wrapper with extra features and commands that make working with GitHub easier
- [gitsome](https://github.com/donnemartin/gitsome): Improved Git CLI with GitHub integrated commands and autocompletion
- [legit](https://github.com/frostming/legit): Git client
- [git-extra-commands](https://github.com/unixorn/git-extra-commands): ZSH plugin that packages some Git helper scripts
- [git-revise](https://github.com/mystor/git-revise): ==Git sub-command to efficiently update, split, and rearrange commits==
- [git-interactive-rebase-tool](https://github.com/MitMaro/git-interactive-rebase-tool): ==Enhanced rebase==
- [git-filter-repo](https://github.com/newren/git-filter-repo): ==Rewrite history==
- [git-jump](https://github.com/mykolaharmash/git-jump): Fuzzy search for improved navigation between Git branches
- [git-spend](https://github.com/Goutte/git-spend): Sum time-tracking directives in git commit messages
- [git-hound](https://github.com/ezekg/git-hound); [git-secrets](https://github.com/awslabs/git-secrets): Prevent sensitive data from being committed
- [git-recall](https://github.com/Fakerr/git-recall): Enhanced git history navigation
- [git-standup](https://github.com/kamranahmedse/git-standup): Recall what you did on the last working day
- [cz-cli](https://github.com/commitizen/cz-cli): Enforce a commit format
- [git-town](https://github.com/git-town/git-town): Additional Git commands to simplify Git branching
- [git-secret](https://github.com/sobolevn/git-secret), git-crypt, [sops](https://github.com/getsops/sops): Store private data inside a Git repository
- [git-issue](https://github.com/dspinellis/git-issue): Git-based, decentralised issue management with optional integration with GitHub and GitLab
- [git-lfs](https://github.com/git-lfs/git-lfs?tab=readme-ov-file): Manage large files with Git
- [multi-gitter](https://github.com/lindell/multi-gitter): Make changes in multiple repositories simultaneously
- [git-follow](https://github.com/nickolasburr/git-follow): Display commits of a pathspec in Git
- [git-absorb](https://github.com/tummychow/git-absorb): Apply bug fixes to uncommitted modifications
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog): Generate a CHANGELOG from a project's commit messages and metadata
- [release-it](https://github.com/release-it/release-it): Automate versioning and package publishing-related tasks
- [gickup](https://github.com/cooperspencer/gickup): Clone/mirror repositories from one host to another
- [ghq](https://github.com/x-motemen/ghq): Enforce an organized directory structure for cloned Git repositories
