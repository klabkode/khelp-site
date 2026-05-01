# Kill Processes in Bash

## Kill the Process with the Specified PID

```bash
kill -TERM $PID
```

## Kill All Child Processes of the Specified Parent PID

```bash
pkill -TERM -P $PPID
```
