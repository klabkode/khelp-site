# Find Command Usage

## List Files

```bash
find
# or
find .
```

## List Files with Realpath

```bash
find "$PWD"
# or
find "$(realpath .)"
```

## Find Files by Type

```bash
find -type f        # Find regular files
find -type d        # Find directories
find -executable    # Find executables and directories
```


## Find files and sort it

```bash
find . -name "*.h" -exec dirname {} \; | sort > sorted.txt
```

## Find files and run 'bashcov' command for each file

```bash
find /path/to/your/project -type f -name "*.sh" -exec bashcov {} \;
```

## Find and remove remove file (ignoring specified folder)

```bash
find . -type f -name tr181-firewall.odl ! -path "*/odl/*" -exec rm -v {}           # Method 1
find . -type f -name tr181-firewall.odl | grep -v '/odl/' | xargs -I {} rm -v {}   # Method 2
find . -type f -name tr181-firewall.odl ! -path "*/odl/*" -print0 | xargs -0 rm -v # Method 3
```

- `! -path "*/dir/*"` is a more direct way to exclude paths than using `grep -v`.

- `-print0 and xargs -0` handle filenames with spaces, newlines, or special characters safely.
