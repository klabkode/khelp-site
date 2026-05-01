# Static Flag Usage

The `-static` option is typically used during linking to create a statically linked executable.

Therefore, it should be included in the `LDFLAGS` (Linker Flags) variable in the Makefile.

It is not needed in `CFLAGS` (Compiler Flags) because it is not a compiler option.

## Makefile

```make
CC      =  gcc
CFLAGS  = -Wall
LDFLAGS = -static

all: program

program: main.o util.o
    $(CC) $(LDFLAGS) -o $@ $^

main.o: main.c
    $(CC) $(CFLAGS) -c -o $@ $<

util.o: util.c
    $(CC) $(CFLAGS) -c -o $@ $<

clean:
    rm -f program *.o
```
