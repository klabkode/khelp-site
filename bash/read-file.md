# Read File in Bash

## Read a File Line by Line

```bash
while IFS= read -r line; do
    echo "Line: $line"
done < input.txt
```

- `IFS=`: Sets the Internal Field Separator to an empty string, preserving leading/trailing whitespace.
- `read -r`: Reads the line as-is, without interpreting backslashes.

## Convert Output to a Bash Array and Iterate Through Each Element

```bash
# Run pip list and store the output in a variable
pip_list_output=$(pip list)

# Convert the output to a bash array
IFS=$'\n' read -r -a pip_list_array <<< "$pip_list_output"

# Iterate through each element in the array using a for loop
for package_info in "${pip_list_array[@]}"; do
    # Print each package information
    echo "$package_info"
done
```

## Read the File from Bottom to Top

```bash
while IFS= read -r LINE; do
    # ... your code here ...
done < <(tac "<file-name>")
```
