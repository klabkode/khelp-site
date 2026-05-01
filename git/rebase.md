# Git Pull Latest Changes with Rebase

To pull the latest changes from a remote branch with rebase:

```bash
git pull --rebase origin <branch-name>
```

> Replace `<branch-name>` with the actual branch you're working on.

## In Case Error: "cannot pull with rebase: You have unstaged changes"

This means you have local changes that must be handled before pulling. Choose one of the following solutions:

### Option 1: Stash Your Changes (Recommended)

```bash
git stash push -m "WIP before rebase"
git pull --rebase origin <branch-name>
git stash pop
```

This saves your changes, rebases cleanly, then reapplies your work.

### Option 2: Commit Your Changes

```bash
git add .
git commit -m "WIP: before rebase"
git pull --rebase origin <branch-name>
```

Use this if your changes are ready to be committed.

### Option 3: Discard Your Changes (Destructive)

```bash
git reset --hard
git pull --rebase origin <branch-name>
```

**Warning**: This permanently deletes your uncommitted changes.

---

