# Push to Multiple Git Remotes

How to push the changes to multiple Git remotes?

### 1. Using a One-Liner

If you just want to do this quickly in the terminal:

```bash
git remote | xargs -L1 git push --all
git remote | xargs -L1 git push --tags
```

### 2. Using a Loop in Bash

If you have multiple remotes (e.g., `origin`, `backup`, etc.), you can push to all of them using:

```bash
for remote in $(git remote); do
    git push "$remote" --all
    git push "$remote" --tags
done
```

This will:

- Push all branches (`--all`).
- Push all tags (`--tags`).

### 3. Using a Git Alias

You can define a Git alias to push to all remotes automatically.

Run this command:

```bash
git config --global alias.pushall '!for remote in $(git remote); do git push "$remote" --all; git push "$remote" --tags; done'
```

Then, push to all remotes with:

```bash
git pushall
```

### 4. Pushing a Specific Branch

To push only the current branch to all remotes:

```bash
branch=$(git symbolic-ref --short HEAD)
for remote in $(git remote); do
    git push "$remote" "$branch"
done
```
