# Bash command to print user name

```bash
getent passwd $USER | cut -d: -f5 | cut -d, -f1
```
