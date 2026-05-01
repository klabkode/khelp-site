# Bash Script to Run and Handle the Command Exit Status

## Method 1: Execute Command and Check the Exit Status Directly

```bash
if <command-line>; then
    echo "Command succeeded"
else
    echo "Command failed"
fi
```

## Method 2: Checking Failure Case

```bash
if ! <command-line>; then
    echo "Command failed"
fi
```
