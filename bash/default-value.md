# Assign Conditional Values in Bash

## Usage

Check if `PREFIX` is set; if not, set it to `/usr/local`:

```bash
PREFIX=${PREFIX:=/usr/local}
```

In Bash, `:-` and `:=` are two different operators used in variable expansion and assignment.

---

## Operator `:-`

**Syntax:** `${variable:-default}`

- The `:-` operator is used for default value assignment.
- It substitutes the default value if the variable is unset or null, but does **not** assign it.
- The variable itself remains unchanged unless used with assignment.

**Example:**

```bash
echo ${FOO:-default_value} # If FOO is unset or null, prints "default_value"
```

---

## Operator `:=`

**Syntax:** `${variable:=value}`

- The `:=` operator assigns a value to a variable only if the variable is unset or null.
- If the variable is unset or null, it will be assigned the value.

**Example:**

```bash
echo ${BAR:=new_value} # If BAR is unset or null, sets BAR to "new_value" and prints it
```

---

## In Summary

- `${variable:-default}` substitutes a default value if the variable is unset or null (does not assign).
- `${variable:=value}` assigns a value if the variable is unset or null.
