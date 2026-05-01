# Update Makefile variables dynamically

## 1. Makefile

Declare variables as below.

```bash
PACKAGE  :=  @__PACKAGE__@
ELFNAME  :=  @__ELFNAME__@
RELEASE  :=  @__RELEASE__@
```

## 2. Shell script to update dynamically

**preinstall.sh:**

```bash
sed -e "s#@__PACKAGE__@#$PACKAGE#g" \
    -e "s#@__ELFNAME__@#$ELFNAME#g" \
    -e "s#@__RELEASE__@#$RELEASE#g" \
       ./make/configs.mk.in > ./make/configs.mk
```
