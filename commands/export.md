# Export Variables in Bash

## Usage 1

```bash
export USERNAME='atom'
```

## Usage 2

```bash
HOST_IP=$(hostname -I | cut -d' ' -f1)
export HOST_IP
```
