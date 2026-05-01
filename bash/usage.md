# Bash scripts usage

## Check package installations

### Method-1

```bash
if [[ ! $(which doxygen 2>/dev/null) ]]; then
    echo -e "ERROR: Doxygen is not installed !!!"
    return 1
fi
```

### Method-2

```bash
if ! which doxygen &> /dev/null; then
    echo -e "ERROR: Doxygen is not installed !!!"
    return 1
fi
```

## Check package installations thru loop

```bash
_is_pkg_installed() {
    local pkgs=('pkg-x' 'pkg-y' 'pkg-z')

    for pkg in "${pkgs[@]}"; do
    if ! which "$pkg" &> /dev/null; then
        echo "Oops! '$pkg' is not installed."
        return 1
    fi
    done
}
```

## Set architecture

```bash
if [[ $(which dpkg 2>/dev/null) ]]; then
       DPKGARCH=$(dpkg --print-architecture)
    if [ "$DISTARCH" == "darwin-arm64" ] || [ "$DISTARCH" == "arm64" ]; then
        DISTARCH=arm64
    else
        DISTARCH=$DPKGARCH
    fi
fi
```

## Check UID

```bash
if [[ $(id -u) -eq 0 ]]; then
    APT="apt"
    SUDO=""
else
    APT="sudo apt"
    SUDO="sudo"
fi
```

## Find out process name with PID

```bash
ps -p "$PID"
ps -p "$PID" | awk 'NR>1' # Truncate the header line
```

## Get last field of line

```bash
git status --porcelain | awk '{print $NF}'
git status --porcelain | cut -d' ' -f3-
```

## Get last field of line using '\0' as a delimiter

```bash
git status --porcelain | awk -F '\0' '{print $NF}'
git status --porcelain | cut -z -f3-
```

## Export function

Export functions so that they are available to subshells or external commands executed within the current shell session.

```bash
foo() {
  # This is where you define what foo() does
  echo "Processing file: $1"
}

export -f foo```
```
