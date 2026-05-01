# Bash Parameter Expansion

Parameter expansion is a feature in Bash that allows you to manipulate variables in various ways.

Here are some other combinations you can use:

```bash
${var}          : The value of the variable var.
${#var}         : The length of the value of var.
${var:offset}   : The substring of the value of var, starting at offset.
${var:offset:length} : The substring of the value of var, starting at offset and with length characters.
${var:-default} : The value of the variable var, or default if it is not set.
${var:=default} : The value of the variable var, or default if it is not set. Also, set the variable to default.
${var:+word}    : If the variable var is set, return word. Otherwise, return an empty string.
${var:?message} : If the variable var is set, return its value. Otherwise, print message to standard error and exit the script with a non-zero status.
${var%pattern}  : Remove the shortest matching suffix pattern from the value of var.
${var%%pattern} : Remove the longest matching suffix pattern from the value of var.
${var#pattern}  : Remove the shortest matching prefix pattern from the value of var.
${var##pattern} : Remove the longest matching prefix pattern from the value of var.
${var/pattern/replacement}  : Replace the first matching occurrence of pattern with replacement in the value of var.
${var//pattern/replacement} : Replace all matching occurrences of pattern with replacement in the value of var.
${var/#pattern/string} : If the value of var starts with pattern, replace it with string.
${var/%pattern/string} : If the value of var ends with pattern, replace it with string.
```
