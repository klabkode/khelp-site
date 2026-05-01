# Git Revert Commit

The `git revert` command is used to reverse a previous commit. It creates a new commit that undoes the changes made by a specific commit, effectively adding an opposite commit.
This is useful when you want to safely undo a commit without removing it from the project history.

Here's the basic syntax of the `git revert` command:

```bash
git revert <commit-hash>
```

## Reverting the Latest Commit

This command reverts the latest commit in the branch.

```bash
git revert HEAD
```

## Reverting a Specific Commit

```bash
git revert <commit-hash>
```

## Reverting a Range of Commits

This reverts all commits from `abc123` to `def456`, including both.

```bash
git revert abc123..def456
```

## Reverting a Merge Commit

```bash
git revert -m 1 abc123
```

If you're reverting a merge commit, you need to specify the parent number (in this case, 1) to indicate which parent should be considered the `mainline`.

After running `git revert`, Git opens your default text editor to allow you to modify the commit message for the new revert commit.
Save and close the editor to complete the process.

Keep in mind that `git revert` won't alter the existing commit history; instead, it adds a new commit that undoes the changes.

If you want to remove a commit completely from the history (not recommended if the commit has been pushed to a shared repository), you might consider using `git reset` or `git rebase`.

Always make sure to commit or stash any changes in your working directory before running `git revert` to avoid conflicts.
