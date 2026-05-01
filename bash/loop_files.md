# Loop Through All .jpg and .jpeg Files in the Current Directory

```bash
shopt -s nullglob  # Prevent errors if no matching files are found
for img in *.jpg *.jpeg; do
    process_image "$img"
done
```

- `shopt -s nullglob` ensures the loop doesn't run if no files match the pattern.
- Replace `process_image` with your desired command or function.
