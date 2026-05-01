# Bash Loop Guide

Loops in Bash allow you to execute commands multiple times efficiently. There are several types of loops:

## 1. `for` Loop

Used to iterate over a list of values.

### Basic Syntax

```bash
for var in item1 item2 item3; do
    echo "Item: $var"
done
```

### Example: Loop through numbers

```bash
for i in {1..5}; do
    echo "Number: $i"
done
```

### Example: Loop with `seq`

```bash
for i in $(seq 1 5); do
    echo "Number: $i"
done
```

### Example: Loop through files

```bash
for file in *.txt; do
    echo "Processing $file"
done
```

---

## 2. `while` Loop

Repeats while a condition is true.

### Basic Syntax

```bash
while [ condition ]; do
    command
done
```

### Example: Count from 1 to 5

```bash
i=1
while [ $i -le 5 ]; do
    echo "Number: $i"
    ((i++))
done
```

### Example: Read a file line by line

```bash
while read line; do
    echo "Line: $line"
done < myfile.txt
```

---

## 3. `until` Loop

Repeats until a condition becomes true.

### Basic Syntax

```bash
until [ condition ]; do
    command
done
```

### Example: Count from 1 to 5

```bash
i=1
until [ $i -gt 5 ]; do
    echo "Number: $i"
    ((i++))
done
```

---

## 4. Infinite Loops

Useful for continuously running scripts.

### Example: Infinite `while` loop

```bash
while true; do
    echo "Running..."
    sleep 1
done
```

### Example: Infinite `for` loop

```bash
for ((;;)); do
    echo "Running..."
    sleep 1
done
```

---

## 5. Loop Control: `break` and `continue`

- **`break`** exits the loop.
- **`continue`** skips the rest of the loop iteration.

### Example: Using `break`

```bash
for i in {1..10}; do
    if [ $i -eq 5 ]; then
        break
    fi
    echo "Number: $i"
done
```

### Example: Using `continue`

```bash
for i in {1..5}; do
    if [ $i -eq 3 ]; then
        continue
    fi
    echo "Number: $i"
done
```

---

## 6. Nested Loops

Loops inside loops.

### Example: Nested `for` loops

```bash
for i in {1..3}; do
    for j in {a..c}; do
        echo "Outer: $i, Inner: $j"
    done
done
```

---

## 7. Loop Over Files (Handles Spaces)

To safely loop over filenames that contain spaces, use `IFS` (Internal Field Separator) or `find`.

### Example: Loop Over All Files (Safe)

```bash
IFS=$'\n'  # Set IFS to handle spaces in filenames
for file in $(ls -1); do
    echo "Processing: $file"
done
unset IFS  # Restore default IFS
```

### Example: Using `find` (More Robust)

```bash
find . -type f | while read -r file; do
    echo "Processing: $file"
done
```

---

## 8. Loop Over Specific File Pattern (`*.md`)

This loops over all Markdown (`.md`) files in the directory.

### Example: Using `for` Loop

```bash
for file in *.md; do
    [ -e "$file" ] || continue  # Skip if no match
    echo "Processing Markdown file: $file"
done
```

### Example: Using `find` for `.md` Files

```bash
find . -type f -name "*.md" | while read -r file; do
    echo "Markdown file: $file"
done
```

---

## 9. Loop Over Files With Spaces (Safely)

When looping over filenames with spaces, always use quotes.

```bash
for file in *; do
    [ -e "$file" ] || continue
    echo "Processing: \"$file\""
done
```
