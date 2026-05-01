# Manage Interactive Login

## Return if Non-Interactive

### Method 1

**/etc/bash.bashrc:**

```bash
[ -z "$PS1" ] && return

# or

if [ -z "$PS1" ]; then
    return
fi
```

### Method 2

**~/.bashrc:**

```bash
case $- in
    *i*) ;;
      *) return;;
esac
```
