# Git `rev-parse` Usage

It is used to parse various information related to revisions and objects.

## Sample usage

### Print just the current Git branch

```bash
git rev-parse --abbrev-ref HEAD
```

### Print the current working directory of a Git repository

```bash
git rev-parse --show-toplevel
```

### Print the entire path from the top-level directory of the Git repository

```bash
git rev-parse --show-prefix
```

### Print the upstream repository and branch for a Git repository

```bash
git rev-parse --abbrev-ref --symbolic-full-name @{u}
```

If you only want to print the remote, you can use

```bash
git rev-parse --symbolic-full-name --abbrev-ref @{u} | sed 's/\/.*//'
```

## Some other use cases

### Branch/Tag Name to Commit Hash

Get the commit hash of a specific branch or tag

```bash
git rev-parse <branch_or_tag_name>
```

### Commit Hash to Short Hash

Get the short commit hash from a full commit hash

```bash
git rev-parse --short <commit_hash>
```

### Commit Hash to Full Hash

Get the full commit hash from a short or full commit hash

```bash
git rev-parse <commit_hash>
```

### HEAD Reference

Get the commit hash of the current commit that HEAD points to:

```bash
git rev-parse HEAD
```

### Symbolic Ref to Commit Hash

Get the commit hash that a symbolic reference (like a branch) points to

```bash
git rev-parse <symbolic_ref>
```

### Shorten Refs

Get the short commit hash of a specific branch or tag

```bash
git rev-parse --short <branch_or_tag_name>
```

### HEAD to Branch Name

Get the current branch name

```bash
git rev-parse --abbrev-ref HEAD
```

### Ref to Full Path

Get the top-level directory of the current Git repository

```bash
git rev-parse --show-toplevel
```

### Ref to Path Relative to Top Level

Get the path from the top-level directory of the repository to the current directory

```bash
git rev-parse --show-prefix
```

### Object Type

Get the type of a Git object (e.g., commit, tree, blob)

```bash
git rev-parse --object-type <object>
```

### Verify if Object Exists

Check if a Git object exists and print its hash.

```bash
git rev-parse --verify <object>
```
