# Git clean usage

The `git clean` command is used to remove untracked files from the working directory.

## Usage

```bash
git clean -xdf .
```

## Description

`-x`: This flag specifies that Git should not use the default ignore rules when cleaning.

By default, Git ignores certain files and directories specified in the `.gitignore` file.

The `-x` flag ensures that even these ignored files are considered for removal.

`-d`: This flag tells Git to also remove untracked directories.
      Without this flag, git clean only removes untracked files.

`-f`: This flag stands for "force", and it is required to actually perform the clean operation.

Without it, git clean will only show you what it would remove without actually removing anything.
