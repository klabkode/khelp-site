# Vimdiff Commands

## Opening Files for Comparison

```bash
vimdiff file1 file2 file3
```

## Navigating Between Windows

```vim
Ctrl + W + W           " Switch between the split windows
Ctrl + W + <Arrow Key> " Move to the split window in the indicated direction
```

## Saving and Quitting

```vim
:wqa    " Save changes and quit all windows
:wqall  " Save changes and quit all windows
:qa!    " Quit all windows without saving changes
:qall!  " Quit all windows without saving changes
```

## Enable Diff Manually

```vim
:windo diffthis   " Enable vimdiff
:diffthis         " Run on both windows enables the vimdiff
:diffoff          " Turn off the diff
```

## Toggle Vim Folds

```vim
zo  " Open folds
zc  " Close folds
```

## Export Diff to HTML Web Page

```vim
:TOhtml | w ~/Desktop/diff.html
```

## Resolving Conflicts

```vim
]c  " Navigate to the next difference
[c  " Navigate to the previous difference
do  " Get changes from the other window into the current window
dp  " Put changes from the current window into the other window
```

## Viewing and Navigating Differences

```vim
:diffupdate   " Update the diff highlighting
:diffu        " Update the diff highlighting
:diffget      " Get changes for the whole file
:diffput      " Put changes for the whole file
:diffg RE     " Get changes from the RE (ours, theirs, base) window
:diffp RE     " Put changes to the RE (ours, theirs, base) window
```

## Resolve Git Merge Conflicts with Vim

```vim
]c            " Navigate to the next conflict
[c            " Navigate to the previous conflict
:diffget LO   " Get the changes from the local version
:diffget RE   " Get the changes from remote version
:diffget BA   " Get the changes from the base version
:cquit        " To abort merging
```
