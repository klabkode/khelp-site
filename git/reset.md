# Deleting the Last Commit

If you want to delete the last commit, you can use the following command.

```bash
git reset --hard HEAD^
```

## Undoing the Last Commit (Preserving Changes)

If you want to undo the last commit but keep the changes in your working directory.

```bash
git reset --soft HEAD^
```

## Interactive Rebase

If the commit you want to delete is not the most recent one, and you want more control over the process, you can use an interactive rebase:

```bash
git rebase -i HEAD~n
```

Replace `n` with the number of commits you want to go back. This command will open an interactive rebase window where you can choose to delete or edit commits.

In the interactive rebase window, change the word `pick` to `edit` next to the commit you want to delete.

Save and close the file.

Git will stop at the commit you want to delete.

```bash
git reset --hard HEAD^
```

This will delete the commit.

After that, you can use the below command to continue with the rebase.

```bash
git rebase --continue
```

## Force Push (Use with Caution)

If you have already pushed the commit to a remote repository, and you need to remove it from the remote history, you may need to force push:

Be cautious, rewrite the commit history and cause issues for others who have already pulled the changes.

```bash
git push origin HEAD --force
```
