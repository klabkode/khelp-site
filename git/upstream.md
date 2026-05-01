# Git Upstream Usage

The term `upstream` refers to the main Git repository from which your local repository was cloned or forked.

When you clone a repository, Git automatically sets up a remote called `origin` that points to the repository you cloned from.

The branch on your local repository that corresponds to the branch on the remote repository is typically referred to as the `upstream` branch.

## Adding an Upstream Remote

Fetch changes from the original repository that you forked from.

In this case, you can add the original repository as a remote and name it `upstream`:

```bash
git remote add upstream <original_repository_url>
```

## Syncing with Upstream

After adding the upstream remote, you can `fetch` changes from it and `merge` them into your local branch
to keep your repository up-to-date with the original repository:

```bash
git fetch upstream
git merge upstream/main
```

## Setting Upstream Branch

When pushing a branch to a remote repository for the first time, you might want to set the upstream branch so that Git knows where to push future changes.

This establishes a tracking relationship between your local
branch and the corresponding branch in the remote repository:

Allows you to use commands like `'git push'` and `'git pull'` without explicitly specifying the remote and branch every time.

```bash
git branch --set-upstream-to=origin/<branch-name> <local-branch-name>`
```

**Example:**

```bash
git branch --set-upstream-to=origin/master master
```

## Push Upstream

This establishes a tracking relationship between your local branch and the remote branch.

```bash
git push -u <remote-name> <branch-name>
```

**Example:**

```bash
git push -u origin master` (or) `git push --set-upstream origin master
```

After this, you can simply use `'git push'` and `'git pull'` without specifying the remote and branch names, and
Git will automatically refer to the upstream branch you've set.

## Pulling Changes from Upstream

To update your local repository with changes from the upstream repository, you can pull changes from the upstream branch into your local branch:

```bash
git pull upstream main
```
