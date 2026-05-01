# Explore ELF Symbols

## Using `readelf`

```bash
readelf -s <your-elf-file>
readelf -s <your-executable> | grep 'my_fun'
```

## Using `nm`

```bash
nm <your-executable> | grep 'my_fun'
```

## Using `objdump`

```bash
objdump -t <your-executable> | grep 'my_fun'
```
