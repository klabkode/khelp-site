# Git Branch Usage

## List Local Branches

```bash
git branch
```

## List Remote Branches

```bash
git branch -r
```

## List All Branches (Local and Remote)

```bash
git branch -a
```

## Create a New Branch

```bash
git branch <branch_name>
```

## Switch to a Branch

```bash
git checkout <branch_name>

    (or)

git switch <branch_name>
```

## Create and Switch to a New Branch

```bash
git checkout -b <branch_name>

  (or)

git switch -c <branch_name>
```

## Rename a Branch

```bash
git branch -m <new_branch_name>
```

## Delete a Branch

```bash
git branch -d <branch_name>
```

## Force Delete a Branch

If the branch has unmerged changes, Git will prevent the deletion.

To force deletion, you can use `-D`.

```bash
git branch -D <branch_name>
```
