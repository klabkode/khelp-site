# Update Makefile Variables Dynamically

Update the Makefile variables dynamically using a shell script. This allows you to set values for `PACKAGE`, `ELFNAME`, and `RELEASE` at runtime, which can be useful for different build configurations or environments.

## 1. Makefile

Declare variables as below. These variables will be replaced by the shell script with actual values before the Makefile is executed.

```make
PACKAGE  :=  @__PACKAGE__@
ELFNAME  :=  @__ELFNAME__@
RELEASE  :=  @__RELEASE__@
```

## 2. Shell script to update dynamically

Create a shell script that replaces the placeholders in the Makefile with actual values. This script will read the values from environment variables or command line arguments.

```bash
**preinstall.sh:**

```bash
sed -e "s#@__PACKAGE__@#$PACKAGE#g" \
    -e "s#@__ELFNAME__@#$ELFNAME#g" \
    -e "s#@__RELEASE__@#$RELEASE#g" \
       ./make/configs.mk.in > ./make/configs.mk
```
