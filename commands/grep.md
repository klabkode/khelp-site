# Grep Usage

## Grep for a String Only in Regular Files

```bash
grep -r "STRING" . | while IFS=: read -r file _; do
    file "$file" | grep -q "text" && echo "$file"
done
```

- This command recursively searches for `"STRING"` in the current directory.
- It filters results to show only regular text files containing the string.
