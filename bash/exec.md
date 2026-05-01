# Bash `exec` Command Usage

## Bash Exec Wrapper for Colors and Verbosity

```bash
FMTNC='\e[0m'
FMTBOLD='\e[1m'
FMTGRN='\e[0;32m'
FMTBGRN='\e[1;32m'
FMTRED='\e[0;31m'
FMTBRED='\e[1;31m'
FMTYLW='\e[0;33m'
FMTBYLW='\e[1;33m'
FMTBLUE='\e[0;34m'
FMTBBLUE='\e[1;34m'
FMTMGTA='\e[0;35m'
FMTBMGTA='\e[1;35m'
FMTCYAN='\e[0;36m'
FMTBCYAN='\e[1;36m'

echo_info() {
    echo -e "${FMTBYLW}$@${FMTNC}"
}

echo_error() {
    echo -e "${FMTBRED}$@${FMTNC}"
}

execv() {
    set -v
    eval $@
    EVAL=$?
    set +v
    return $EVAL
}

execit() {
    echo_info "$@"
    eval $@
    EVAL=$?
    return $EVAL
}
```

## Usage

```bash
execit "<shell-command>"
```

## Run Shell Command in New Instance

```bash
sh -c <shell-command>
```

## Example: Custom Interactive Shell

```bash
sh --rcfile <(echo "source ~/.bashrc; PS1='\$(_git_prompt)$ '") -i
```
