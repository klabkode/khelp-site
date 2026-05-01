# Set `PREFIX` Variable if Not Already Set

## In Bash

```bash
PREFIX=${PREFIX:=/usr/local}
```

## In Makefile

```makefile
PREFIX ?= /usr/local
```
