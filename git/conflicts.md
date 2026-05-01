# Resolve Git Apply Conflicts

## Preparation

### 0. Configure the mergetool

```bash
git config --global merge.tool vimdiff
git config --global mergetool.prompt false
```

### 1. Assuming the patch to be applied cause merge conflicts

```bash
$ git apply ../0001-Local-20240329042716.patch
  error: patch failed: hello.txt:1
  error: hello.txt: patch does not apply```
```

### 2. Do 3 way merge on Git Apply

```bash
$ git apply -3 ../0001-Local-20240329042716.patch
   error: patch failed: hello.txt:1
   Falling back to three-way merge...
   Applied patch to 'hello.txt' with conflicts.
   U hello.txt
```

### 3. Conflicting files list

```bash
$ git status
   # On branch master
   # Your branch is ahead of 'origin/master' by 1 commit.
   #   (use "git push" to publish your local commits)
   #
   # Unmerged paths:
   #   (use "git reset HEAD <file>..." to unstage)
   #   (use "git add <file>..." to mark resolution)
   #
   #       both modified:      hello.txt
   #
   no changes added to commit (use "git add" and/or "git commit -a")

   $ git diff
   diff --cc hello.txt
   index 19b7cf7,f7ce502..0000000
   --- a/hello.txt
   +++ b/hello.txt
   @@@ -1,3 -1,3 +1,7 @@@
     Hello world!
   ++<<<<<<< ours
    +Admin added this line
   ++=======
   + User added this line
   ++>>>>>>> theirs
     Working in Git
```

## 4. Now merge files

```bash
git mergetool
```

## Resolve Git merge conflicts with vim

To resolve a merge conflict always need to see:

- REMOTE
- LOCAL
- Two diffs:
  - diff BASE REMOTE
  - diff BASE LOCAL

Vimdiff does show `BASE`, `LOCAL` and `REMOTE` in the screen:

```bash
    +--------------------------------+
    | LOCAL  |     BASE     | REMOTE |
    +--------------------------------+
    |             MERGED             |
    +--------------------------------+
```

## Navigations

```bash
<Ctrl-W> + j : Navigate to the bottom buffer (merge result)
]c and [c    : Navigate to the next and previous conflicts
j (or) k     : Do the same as above
```

## Resolving the conflicts

```bash
:diffget LO : Get the changes from the local version
:diffget RE : Get the changes from remote version
:diffget BA : Get the changes from the base version
:wqa        : Save the merge result, and Quit all windows
:cquit      : To abort merging
```
