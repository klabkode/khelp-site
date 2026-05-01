# Switch case in Bash

```bash
#!/bin/bash

check_string() {
    case $1 in
        "stagged")
            echo "Processing 'stagged'..."
            ...
            ...
            ;;
        "unstagged")
            echo "Processing 'unstagged'..."
            ...
            ...
            ;;
        "history")
            echo "Processing 'history'..."
            ...
            ...
            ;;
        *)
            echo "Processing 'overview' (default)..."
            ...
            ...
            ;;
    esac
}

# Usage:
check_string "stagged"
check_string "unstagged"
check_string "history"
check_string "unknown"
```
