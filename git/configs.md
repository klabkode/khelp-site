# Git Configurations

## Git Global Configurations

### Add Username and Email

```bash
git config --global user.name  "$GITHUB_USERNAME"

git config --global user.email "$GITHUB_USEREMAIL"
```

### Set Vim as default editor for Git

```bash
git config --global core.editor "vim"
```

### Configure file mode

Determines whether Git should consider the executable bit of files when performing operations like comparing files or checking for changes.

By default, Git doesn't consider the executable bit when determining whether files have changed.

However, on some systems or in certain workflows, preserving the executable bit may be important.

```bash
git config --global core.fileMode false # Ignore the file mode changes

git config --global core.fileMode true  # Consider the file mode changes
```

### Always rebase on Git Pull

```bash
git config --global pull.rebase true

git config --global pull.rebase false # This will do merge on Git Pull

git config --global pull.ff only      # fast-forward only
```

### Push configs

```bash
git config --global push.default simple   # Only pushes the current branch to the remote

git config --global push.default current  # Pushes the current branch to the remote branch with the same name

git config --global push.default upstream # Pushes the current branch to the upstream branch

git config --global push.default matching # Pushes all local branches to the remote branches with the same name

git config --global push.default nothing`  # Disables the default behavior, so you must specify the branch explicitly when pushing
```

### Default branch name

```bash
git config --global init.defaultBranch <branch_name>
```

Example:

```bash
git config --global init.defaultBranch master
```

### Configure Vimdiff as the difftool

```bash
git config --global diff.tool vimdiff

git config --global difftool.prompt false
```

If you prefer to use Vimdiff only in certain situations or for specific file types, you can configure Git to use it selectively.

Here's how you can do that:

```bash
git config --global diff.<driver>.cmd 'vimdiff "$LOCAL" "$REMOTE"'
```

Replace `<driver>` with the name of the file type or a specific driver you want to use Vimdiff.

Ror example, if you want to use Vimdiff only for Python files:

```bash
git config --global diff.python.cmd 'vimdiff "$LOCAL" "$REMOTE"'`
```

Remember, these configurations are set globally (--global flag).

If you want to set these configurations only for a specific repository, you can omit the `--global` flag and run these commands within the repository.

### Configure Vimdiff as the merge tool

```bash
git config --global merge.tool vimdiff

git config --global mergetool.prompt false
```

If you want to set Vimdiff only for specific file types or drivers during merges,
you can use a similar approach as with diff:

```bash
git config --global merge.<driver>.cmd 'vimdiff "$LOCAL" "$REMOTE" "$BASE" "$MERGED"'
```

Replace `<driver>` with the name of the file type or a specific driver you want to use Vimdiff for during merges.

For example, to use Vimdiff only for Python files during merges:

```bash
git config --global merge.python.cmd 'vimdiff "$LOCAL" "$REMOTE" "$BASE" "$MERGED"'
```

## Meld as your difftool and mergetool

### Set Meld as the difftool

```bash
git config --global diff.tool meld
git config --global difftool.prompt false
```

### Set Meld as the mergetool

```bash
git config --global merge.tool meld
git config --global mergetool.prompt false
```

If you want to use Meld selectively for specific file types or drivers:

### Set Meld as the difftool for specific file types or drivers

```bash
git config --global diff.<driver>.cmd 'meld "$LOCAL" "$REMOTE"'
```

### Set Meld as the mergetool for specific file types or drivers

```bash
git config --global merge.<driver>.cmd 'meld "$LOCAL" "$REMOTE" "$BASE" "$MERGED"'
```

For example, to use Meld only for Python files during diffs and merges:

```bash
git config --global diff.python.cmd 'meld "$LOCAL" "$REMOTE"'
git config --global merge.python.cmd 'meld "$LOCAL" "$REMOTE" "$BASE" "$MERGED"'
```

### Aliases

```bash
git config --global alias.co checkout

git config --global alias.br branch

git config --global alias.ci commit

git config --global alias.st status
```

### Enable colored output

```bash
git config --global color.ui auto
```

### Handling of line endings on Windows systems

```bash
git config --global core.autocrlf true` # Convert line endings to CRLF on checkout and to LF on commit
```
