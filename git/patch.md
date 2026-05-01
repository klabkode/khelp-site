# Git Patch Usage

## Git ptach Command Line Usage

### `git format-patch -n`

Prepare patches from the topmost `<n>` commits.

### `git format-patch <commit-hash>`

Prepare patches from the topmost to the specified commits excluding the `@commit-hash`.

Add (^) to include the @commit-hash.

### `git format-patch -1 <commit-hash>`

Prepare patch file of the top of the specified commit.

### `git format-patch -1 <commit-hash>^`

Prepare patch file of the specified commit.

### `git format-patch <commit-1>...<commit-x>`

Prepare patch files of the specified commit range.

Example:

```bash
git format-patch HEAD...3df73b8^
```

### `-o <dir>`, `--output-directory <dir>`

Use `<dir>` to store the resulting files.
