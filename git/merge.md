# Git Merge Usage

## Merge Conflicts

Git inserts special markers into the conflicted files to clearly indicate the conflicting changes.

These markers help you identify the conflicting sections and manually resolve the conflicts.

1. `<<<<<<<` : This marks the beginning of the section of code or content from the current branch

    (usually your local changes or the branch you were on before the merge).

2. `=======` : This marker separates the conflicting changes.

    Everything above this line is from the current branch, and everything below it is from the branch being merged in.

3. `>>>>>>>` : This marks the end of the section of code or content from the branch being merged in.

Once you've resolved the conflicts, you should mark the conflicted file as resolved using `git add <file>` and then commit the changes.

After resolving all conflicts and committing the changes, you can continue with the merge process.
