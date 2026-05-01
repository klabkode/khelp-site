# Traverse over Git commits

```bash
#!/bin/bash

# Check if argument is provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 <short_commit_hash>"
    exit 1
fi

# Get the short commit hash
short_commit_hash=$1

# Get the full commit hash
full_commit_hash=$(git rev-parse $short_commit_hash)

# Check if the short commit hash is valid
if [ -z "$full_commit_hash" ]; then
    echo "Invalid commit hash: $short_commit_hash"
    exit 1
fi

# Get the list of commits from the given commit to HEAD
commits=$(git rev-list --reverse $full_commit_hash^...HEAD)

# Iterate over each commit
for commit in $commits; do
    echo "Commit: $commit"
    git diff --shortstat $commit^ $commit
    echo
done
```
