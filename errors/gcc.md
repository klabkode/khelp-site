# gcc-errors: GCC errors and its fixes

## Case 1

### Error

Deprecated conversion from string constant to `char*`.

### Fix

Change the `char *` to `const char *`.

### Description

Most programmers assign all string literals to a pointer of type const `char *`, which ensures that they cannot be accidentally written to.

### Reference

<https://en.wikibooks.org/wiki/GCC_Debugging/g%2B%2B/Warnings/deprecated_conversion_from_string_constant>
