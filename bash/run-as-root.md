# Check whether the script is being run by the root user

```bash
#!/bin/bash

# Check if the script is run as root
if [ "$EUID" -ne 0 ]; then
    echo "Run script as root. Exiting."
    exit 1
fi

# Your script logic goes here

echo "Script is running with root privileges."

# Rest of your script...

# End of script
```
