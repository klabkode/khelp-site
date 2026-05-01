# Git Apply Usage

## SYNOPSIS

```bash
git apply [--stat] [--numstat] [--summary] [--check] [--index] [--3way]
          [--apply] [--no-add] [--build-fake-ancestor=<file>] [-R | --reverse]
          [--allow-binary-replacement | --binary] [--reject] [-z]
          [-p<n>] [-C<n>] [--inaccurate-eof] [--recount] [--cached]
          [--ignore-space-change | --ignore-whitespace ]
          [--whitespace=(nowarn|warn|fix|error|error-all)]
          [--exclude=<path>] [--include=<path>] [--directory=<root>]
          [--verbose] [--unsafe-paths] [<patch>...]
```

## Applying Patch Files

```bash
git apply <patch-file>
```

## Reviewing Changes

```bash
git apply --check <patch-file>
```

## Reverting Changes

```bash
git apply --reverse <patch-file>
```

## Apply changes and commit them directly

```bash
git am <patch-file>
```

## If git apply fails with "patch does not apply" error

The `--reject` option will instruct git to not fail if it cannot determine how to apply a patch, but instead to apply the individual hunks it can apply and create reject files (.rej) for hunks it cannot apply.

```bash
git apply --reject <patch-file>
```

Wiggle can apply [these] rejected patches and perform word-wise diffs.

Additionally, `--whitespace=fix` will warn about whitespace errors and try to fix them, rather than refusing to apply an otherwise applicable hunk.

```bash
git apply --reject --whitespace=fix <patch-file>
```
