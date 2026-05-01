# Vim: Jump to Start and End of Quotes and Brackets

In Vim, you can quickly jump **inside** or **around** quotes and brackets using **text objects** and **motions**.
This guide explains how to move efficiently within quotes (`"` or `'`) and brackets (`(`, `{`, `[`).

## Quotes (`'` or `"`)

### Inside a Quote

- **Move to the _start_ of the quote**:

  ```vim
  vi"     "Visual inside double quote (selects content)
  o       "Move to other end of selection
  ```

  Or:

  ```vim
  F"      "Move to previous double quote (backward)
  T"      "Move just before the previous double quote
  ```

- **Move to the _end_ of the quote**:

  ```vim
  f"      "Move to next double quote (forward)
  t"      "Move just before next double quote
  ```

## Brackets and Braces (`()`, `{}`, `[]`)

### Jump Between Matching Pairs

- `%` → Jump between matching `(` `)`, `{` `}`, `[` `]`

### Move to Opening Bracket

- `[{` → Jump to start of current block
- `[(` → Jump to start of a parenthetical block

### Move to Closing Bracket

- `]}` → Jump to end of current block
- `])` → Jump to end of parenthesis

## Example

```c
if (a == "test") {
    printf("Hello");
}
```

- If cursor is inside `"test"`:
  - `F"` or `T"` → go to **start** of quote
  - `f"` or `t"` → go to **end** of quote
- If inside `()`:
  - `%` → jump between `(` and `)`
- If inside `{}`:
  - `%` again will jump between `{` and `}`

## Use Text Objects

Use Vim text objects to select contents easily:

- `vi"` → select **inside** double quotes
- `va"` → select **around** double quotes (includes the quotes)
- `vi'`, `va'`, `vi(`, `va{`, etc. also work similarly
