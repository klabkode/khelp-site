# Process stats

```bash
pidstat [options] [interval] [count]
```

## Examples

Display CPU utilization for all processes every 2 seconds for a total of 5 times

```bash
pidstat -u 2 5
```

Display process stats of the PID-2121 for every 1 seconds for a total of 3 times

```bash
pidstat -p 2121 -rud -h 1 3
```

CPU usage:

```bash
pidstat -u | sort -nr -k 8 | head -10
```

Memory usage:

```bash
pidstat -r | sort -nr -k 8 | head -10
```
