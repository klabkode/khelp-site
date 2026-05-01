# How to use GDB server

1. Start GDB server on the target machine

    ```bash
    gdbserver --attach <ip>:<port-no> <pid>

    gdbserver localhost:10000 <program> <args>
    ```

2. Run the GDB client on host machine

    ```bash
    $ gdb
    (gdb) file <program> <<<< Load the symbols from your unstripped copy of the binary (if required)

    (gdb) target remote <target_host>:<port>
    ```

## Example

### Target

```bash
gdbserver --attach :8080 1234
```

### Client

```bash
(gdb) target remote 192.168.1.100:12345
```
