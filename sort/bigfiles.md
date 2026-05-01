# Find big files

```bash
# Find the top 20 largest files in the current directory and its subdirectories
find . -type f -exec du -h {} + | sort -rh | head -n 20 > top_files.txt

# Display the directory tree of the top 20 files
cat top_files.txt | cut -f 2- | xargs tree -h --noreport -o tree_structure.txt
```
