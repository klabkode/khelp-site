# Working with Process IDs (PID) in Bash

## PID of the Current Process

```bash
PID=$$
```

## PID of the Last Background Command (Child)

```bash
command &
CHILD_PID=$!
```
