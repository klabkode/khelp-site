# Bash script to recursively traverse the current directory

```bash
#!/bin/bash

traverse_recursively() {
    for ENTRY in "$1"/*; do
        echo "Looking ... '$ENTRY'"
        if [ -d "$ENTRY" ]; then
            cd "$ENTRY"
            echo -e "\nInside '$ENTRY' ..."
            cd ..
        fi
    done

    exit $?
}

#### Main procedure ####
traverse_recursively "$PWD"

exit $?
```
