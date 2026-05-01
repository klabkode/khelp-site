# Git Stash

Git stash allows you to temporarily save changes that you have made to your working directory but do not want to commit at the moment.

It's a way to store changes on a `stack` and revert your working directory to a clean state.

## Simple example

### Stash changes

```bash
git stash save "My stash message"
```

### List stashes

```bash
git stash list
```

### Apply changes from stash

```bash
git stash apply
```

### Apply a specific stash

```bash
git stash apply stash@{n}
```

### Discard latest stash

```bash
git stash drop
```

### Discard specific stash

```bash
git stash drop stash@{n}
```

### View stash changes

```bash
git stash show
```

### View stash changes with diff

```bash
git stash show -p
```

### Creating a branch from a stash

```bash
git stash branch <branch-name>
```

### Clear all stashes

```bash
git stash clear
```

## Usage

### Switching Branches

If you have changes in your working directory and want to switch to another branch, `git stash` can be used to save your changes temporarily before switching branches.

```bash
git stash
git checkout other-branch
git stash apply
```

### Pulling Changes

If you need to pull changes from a remote repository but have local changes that you don't want to commit, you can stash the changes, pull the new changes, and then apply your stashed changes.

```bash
git stash
git pull
git stash apply
```

### Temporary Changes

When you're working on a specific feature but need to quickly fix a bug on another branch, you can stash your changes on the current branch, switch to the other branch, and then come back to continue your work.

```bash
git stash

# Switch to another branch, make changes, and switch back

git stash apply
```

### Cleaning Working Directory

Stashing changes can also be useful when you want to clean your working directory and test something without your local changes affecting the tests.

```bash
git stash

# Test or experiment

git stash apply
```
