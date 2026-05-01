# Time command implementaion

## Method 1

```bash
#!/bin/sh

# Start time in seconds
start=$(date +%s)

# Execute the command
"$@"

# End time in seconds
end=$(date +%s)

# Calculate elapsed time in seconds
ELAPSED=$((end - start))

# Print the elapsed time in seconds
echo "Elapsed time: $ELAPSED seconds"```

## Method 2:
```#!/bin/sh

# Start time
start=$(date +%s.%N)

# Execute the command
"$@"

# End time
end=$(date +%s.%N)

# Calculate elapsed time
ELAPSED=$(echo "$end" "$start" | awk '{printf "%.6f", $1 - $2}')

# Print the elapsed time
echo "Elapsed time: $ELAPSED seconds"
```
