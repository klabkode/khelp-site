# Git Pull Usage

Fetch and integrate changes from a remote repository into your current branch.

## Basic pull

```bash
git pull
```

## Pull from a specific remote and branch

```bash
git pull <remote> <branch>
```

## Rebase instead of merge

Fetches the remote content but does not create a new merge commit.
This simply moves your local changes onto the top of what everybody else has already contributed.

```bash
git pull --rebase
```

```bash
git pull --rebase origin
```

## Pull with rebase from a specific remote and branch

```bash
git pull --rebase <remote> <branch>
```

## Pull forcefully

```bash
git pull --force
```

## Pull and prune remote-tracking branches

```bash
git pull --prune
```

## Pull without merging or rebasing

```bash
git pull --ff-only
```

## Verbose output

```bash
git pull --verbose
```

## Dry run

```bash
git pull --dry-run
```

## Revert Pull Changes

```bash
git reset --hard <commit-before-pull>
```
