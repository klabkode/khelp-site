# Datatypes and it's sizes

## Basic Data Types

```bash
char  : 1 byte
int   : 4 bytes
float : 4 bytes
double: 8 bytes
```

## Modifiers

```bash
short : 2 bytes
long  : 4 bytes
```

## Qualifiers

Signed and Unsigned are used with integer types.

By default, int is considered as signed int.

## Derived Data Types

- **Arrays**     : Size is the number of elements multiplied by the size of one element.
- **Structures** : Size is the sum of the sizes of its members. Padding may be added for alignment purposes.
- **Union**      : Size is the size of the largest member.
- **Enums**      : Size is implementation-dependent but is often the same as int.

## Pointers

Size of a pointer is typically 4 or 8 bytes, depending on the system architecture (32-bit or 64-bit).

## Bytes Type

```bash
 1  - char

 2  - short
 2  - short int

 4  - int
 4  - unsigned
 4  - float

 8  - long
 8  - long int
 8  - long long int
 8  - unsigned long

 8  - double

 16 - long double

 1  - uint8_t
 1  - u_int8_t
 2  - uint16_t
 2  - u_int16_t
 4  - uint32_t
 4  - u_int32_t
 8  - uint64_t
 8  - u_int64_t
 8  - size_t
 8  - ssize_t

 255  - MAX_INPUT
 255  - NAME_MAX
 255  - MAXNAMLEN
 4096 - PATH_MAX
 4096 - PIPE_BUF
 4096 - FILENAME_MAX
 8192 - BUFSIZ
```

### Pointer sizes

```bash
 8 - sizeof int*
 8 - sizeof char*
 8 - sizeof struct*
```
