# Git Push Usage

## Syntax

```bash
git push <remote> <branch>
```

- `<remote>`: The name of the remote repository. This is typically named "origin" by default if you cloned the repository, but it can be any name
- `<branch>`: The name of the branch you want to push your changes to

**Example:**

```bash
git push origin master
```

**Options:**

- `--force` or `-f`: Force push, overwriting remote changes with your local changes.

  Be cautious with this option as it can overwrite changes made by others

- `--tags` : Push tags along with the branches
- `--all`  : Push all branches to the remote repository

## Upstream

The term `upstream` in Git refers to the main repository from which your local repository was cloned or forked.

When you clone a repository, Git automatically sets up a remote called `origin` that points to the repository you cloned from.

The branch on your local repository that corresponds to the branch on the remote repository is typically referred to as the `upstream` branch.

Setting the upstream branch is useful because it allows you to use commands like git push and git pull without explicitly specifying the remote and branch every time.

Here's how you can set the upstream branch:

```bash
git push -u <remote> <branch>
```

**Example:**

```bash
git push -u origin master
```

```bash
git push --force origin main # Force push changes
```

This command pushes your changes to the "master" branch of the "origin" remote and sets up the tracking relationship.

After setting the upstream branch, you can simply use git push and git pull without specifying the remote and branch names every time.

## Deleting a remote branch or tag

To fully delete a branch, it must be deleted locally and also remotely.

```bash
git branch -D <branch>
git push origin :<branch>
```

## Renaming branches

This pushes the `<local-branch>` name to your `<remote>`, but it is renamed to `<remote-branch>` name.

```bash
git push <remote> <local-branch>:<remote-branch>
```
