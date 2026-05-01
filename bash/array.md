# Bash Array Usage

### Syntax

```bash
ARR=("element-1" "element-2" "element-3")
```

### Usage

```bash
for VAR in "${ARR[@]}"; do
  echo "Array element: '$VAR'"
done
```

### Examples

```bash
a=(one two three)   # array definition
echo "${a[0]}"      # print first element of array a
echo "${a[1]}"      # print second element of array a
echo "${#a[@]}"     # print number of elements in array a
```

> If you put a single variable in an array, then you just have an array with a single element.

## Bash Parentheses Usage

There are many situations in bash where parentheses and similar characters are used:

- **Command substitution:** `$()`
- **Process substitution:** `<()` and `>()`
- **Subshell:** `(command)`
- **Arithmetic evaluation:** `(( ))`
- **Function definition:** `fun () { echo x; }`
- **Pattern list in glob (if extglob is enabled):** `?()`, `*()`, `+()`, `@()`, `!()`

### Example usages

```bash
# Command substitution
result=$(echo "hello")

# Process substitution
diff <(ls dir1) <(ls dir2)

# Subshell
(cd /tmp && ls)

# Arithmetic evaluation
((count++))

# Function definition
myfun () { echo "Hello"; }

# Pattern list in glob (with extglob enabled)
shopt -s extglob
ls +(*.txt)
```
