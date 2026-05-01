# Bash and C: Read Config File with '=' Separated Key-Value Pairs

This example shows how to read a config file with `=` separated key-value pairs, skipping commented lines (`#`) and empty keys/values, in both Bash and C.

## Bash Example

```bash
#!/bin/bash

config_file=config_file.cfg

# Check if config file exists
if [[ ! -f $config_file ]]; then
    echo "Error: Config file does not exist '$config_file'."
    exit 1
fi

# Read config file and store it in an associative array
declare -A config_array
while IFS='=' read -r key value; do
    # Skip commented lines and empty keys and values
    if [[ "$key" == "#"* ]] || [[ -z "$key" ]] || [[ -z "$value" ]]; then
        continue
    fi
    # Store key-value pair in array
    config_array[$key]=$value
done < "$config_file"

# Accessing values in the array
echo "key1 = ${config_array[key1]}"
echo "key2 = ${config_array[key2]}"
```

## C Example

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
    char *line = NULL;
    size_t line_size = 0;
    const char *config_file = "config_file";
    FILE *fp = fopen(config_file, "r");

    if (fp == NULL) {
        perror("Error opening file");
        return -1;
    }

    while (getline(&line, &line_size, fp) != -1) {
        // Extract key and value by splitting the line at the '=' character
        char *key = strtok(line, "=");
        char *value = strtok(NULL, "=");

        // Skip commented lines and empty keys and values
        if (key == NULL || value == NULL || key[0] == '#' || value[0] == '\n') {
            continue;
        }

        // Print key-value pair
        printf("%s = %s", key, value);
    }

    free(line);
    fclose(fp);
    return 0;
}
```
