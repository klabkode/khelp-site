# Colorizing Bash Scripts

## Usage

```bash
echo -e "\e[COLORmSample Text\e[0m"
```

## Quick Notes

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
```

## Functions

```bash
echo_info() {
    echo -e "${FMTBYLW}$@${FMTNC}"
}

echo_error() {
    echo -e "${FMTBRED}$@${FMTNC}"
}
```

## Description

- `-e`      -- Enable interpretation of backslash escapes
- `\e[`     -- Begin the color modifications
- `COLORm`  -- Color Code + ‘m’ at the end
- `\e[0m`   -- End the color modifications

## ANSI Color Codes

| Color         | Foreground | Background |
|---------------|------------|------------|
| Black         | 30         | 40         |
| Red           | 31         | 41         |
| Green         | 32         | 42         |
| Yellow        | 33         | 43         |
| Blue          | 34         | 44         |
| Magenta       | 35         | 45         |
| Cyan          | 36         | 46         |
| Light Gray    | 37         | 47         |
| Gray          | 90         | 100        |
| Light Red     | 91         | 101        |
| Light Green   | 92         | 102        |
| Light Yellow  | 93         | 103        |
| Light Blue    | 94         | 104        |
| Light Magenta | 95         | 105        |
| Light Cyan    | 96         | 106        |
| White         | 97         | 107        |

## Code Descriptions

| Code | Description           |
|------|-----------------------|
| 0    | Reset/Normal          |
| 1    | Bold text             |
| 2    | Faint text            |
| 3    | Italics               |
| 4    | Underlined text       |
| 5    | Blinking Characters   |
| 7    | Reverse video         |

## Color Codes

```bash
NOCOLOR='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
LIGHTGRAY='\033[0;37m'
DARKGRAY='\033[1;30m'
LIGHTRED='\033[1;31m'
LIGHTGREEN='\033[1;32m'
YELLOW='\033[1;33m'
LIGHTBLUE='\033[1;34m'
LIGHTPURPLE='\033[1;35m'
LIGHTCYAN='\033[1;36m'
WHITE='\033[1;37m'
```

## Bash Script to Print Color Codes

```bash
for x in {0..8}; do
    for i in {30..37}; do
        for a in {40..47}; do
            echo -ne "\e[$x;$i;$a""m\\\e[$x;$i;$a""m\e[0;37;40m "
        done
        echo
    done
done
```

## References

- <https://www.codegrepper.com/tpc/bash+colors>
- <https://dev.to/ifenna__/adding-colors-to-bash-scripts-48g4>
- <https://misc.flogisoft.com/bash/tip_colors_and_formatting>
- <https://gist.github.com/JBlond/2fea43a3049b38287e5e9cefc87b2124>
- <https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux>
- <https://www.cyberciti.biz/faq/bash-shell-change-the-color-of-my-shell-prompt-under-linux-or-unix>
