# Makefile Commands and Execution Control

By default, if any command in a Makefile target fails, the entire target will be considered failed,
and execution will stop. If you want to run all commands in the sanity target regardless of whether
one of them fails, you can modify your Makefile like this:

```make
sanity:
    -shellcheck -x $(SRCDIR)/kdeploy.sh
    -shellcheck -x $(SRCSCRIPTS)/utils.sh
```
