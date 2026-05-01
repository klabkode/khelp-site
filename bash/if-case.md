# If-Else Usage in Bash

## Setting Flags

```bash
flag_a=true
flag_b=false
```

or

```bash
flag_a=1
flag_b=0
```

## Using `-a` and `-o`

```bash
if [ "$flag_a" = true -a "$flag_b" = true ]; then
    # Statements if both flag_a and flag_b are true
elif [ "$flag_a" = true -o "$flag_b" = true ]; then
    # Statements if either flag_a or flag_b is true
else
    # Statements if neither flag_a nor flag_b is true
fi
```

## Using `&&` and `||`

```bash
if [ "$flag_a" = true ] && [ "$flag_b" = true ]; then
    # Statements if both flag_a and flag_b are true
elif [ "$flag_a" = true ] || [ "$flag_b" = true ]; then
    # Statements if either flag_a or flag_b is true
else
    # Statements if neither flag_a nor flag_b is true
fi
```

## Testing Conditions in Bash

| Flag/Operator | Description | Example |
|---------------|-------------|---------|
| `-x` | Enable debugging; prints each command to stderr with PS4 prompt | `bash -x script.sh` |
| `-n` | String is not empty | `[ -n "$var" ]` |
| `-z` | String is empty | `[ -z "$var" ]` |
| `-eq` | Integers are equal | `[ "$a" -eq "$b" ]` |
| `-ne` | Integers are not equal | `[ "$a" -ne "$b" ]` |
| `-lt` | First integer is less than second | `[ "$a" -lt "$b" ]` |
| `-le` | First integer is less than or equal to second | `[ "$a" -le "$b" ]` |
| `-gt` | First integer is greater than second | `[ "$a" -gt "$b" ]` |
| `-ge` | First integer is greater than or equal to second | `[ "$a" -ge "$b" ]` |
| `<` / `>` | String comparison (must be escaped or quoted) | `[ "$s1" \< "$s2" ]` |
| `=` / `!=` | String comparison | `[ "$s1" = "$s2" ]` |

- Use single brackets `[ ]` for basic tests.
- Use double brackets `[[ ]]` for advanced expressions.

## File Test Flags in Bash

| Flag | Description | Example |
|------|-------------|---------|
| `-s` | File exists and has size > 0 | `[ -s "$filename" ]` |
| `-e` | File exists | `[ -e "$filename" ]` |
| `-f` | File exists and is a regular file | `[ -f "$filename" ]` |
| `-d` | File exists and is a directory | `[ -d "$dirname" ]` |
| `-r` | File exists and is readable | `[ -r "$filename" ]` |
| `-w` | File exists and is writable | `[ -w "$filename" ]` |
| `-x` | File exists and is executable | `[ -x "$filename" ]` |
| `-L` | File exists and is a symbolic link | `[ -L "$filename" ]` |
