# Getopt Usage

## Parsing Short Options

```bash
list() {
  local OPTIND opt

  while getopts "lh" opt; do
    case $opt in
      l) ls -l ;;
      h) ls -h ;;
      *) echo "Invalid option. Usage: list [-l] [-h] [file]" >&2; return 1 ;;
    esac
  done

  # Move the option pointer to the next argument
  shift $((OPTIND-1))

  if [ $# -eq 0 ]; then
    ls
  elif [ -e "$1" ]; then
    ls "$1"
  else
    echo "Invalid argument. Usage: list [-l] [-h] [file]" >&2
    return 1
  fi
}
```

## Parsing Long Options

```bash
list() {
  local OPTIND opt file

  # Define long options
  local LONGOPTS="help,list,file:"

  # Parse options
  if ! getopt --options=hl: --long="$LONGOPTS" --name "$(basename "$0")" -- "$@"; then
    return 1
  fi

  while true; do
    case "$1" in
      -h|--help) echo "Usage: list [--help] [--list] [--file <file>]"; return 0 ;;
      --list) ls ;;
      --file)
        file="$2"
        shift 2
        ;;
      --) shift; break ;;
      *) echo "Invalid option"; return 1 ;;
    esac
  done

  if [ -n "$file" ]; then
    ls "$file"
  fi
}
```
