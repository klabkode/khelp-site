# File Test Flags in Bash

| Flag | Description | Example |
|------|-------------|---------|
| `-s` | File exists and has a size greater than zero | `if [ -s "$filename" ]; then ...` |
| `-e` | File exists | `if [ -e "$filename" ]; then ...` |
| `-f` | File exists and is a regular file (not a directory or device) | `if [ -f "$filename" ]; then ...` |
| `-d` | File exists and is a directory | `if [ -d "$dirname" ]; then ...` |
| `-r` | File exists and is readable | `if [ -r "$filename" ]; then ...` |
| `-w` | File exists and is writable | `if [ -w "$filename" ]; then ...` |
| `-x` | File exists and is executable | `if [ -x "$filename" ]; then ...` |
| `-L` | File exists and is a symbolic link | `if [ -L "$filename" ]; then ...` |

**Example Usage:**

```bash
if [ -e "$filename" ]; then
    echo "File exists"
fi
```
