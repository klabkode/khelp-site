# Vim `:sort` Command Usage

In Vim `:sort` command is used to organize lines in a file.

## Basic Usage

- `:sort`   — Sorts all lines alphabetically (case-sensitive).
- `:sort i` — Sorts lines case-insensitively.
- `:sort!`  — Sorts in reverse order.
- `:sort n` — Sorts numerically.
- `:sort u` — Removes duplicate lines after sorting.

## Sorting a Range of Lines

You can specify a range of lines to sort:

- `:10,20sort` — Sorts lines 10 through 20.
- `:'a,'bsort` — Sorts lines between marks `a` and `b`.

## Sorting by Patterns

Sort lines based on specific patterns using regular expressions:

- `:sort /pattern/` — Sorts by a regex pattern.
- Example: `:sort /^\\S\\+\\s\\+\\S\\+/` — Sorts by the second word in each line.

## Example Using `file.txt`

Use the following sample file to experiment with sorting:

```txt
Apple Pie 42
banana split 123
Zebra crossing 7
apple pie 42
Antelope run 88
Banana Split 123
42 is the answer
apple Pie 42
zebra Crossing 7
Antelope Run 88
```

