# Git bash prompt customization

## Method-1

```bash
print_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}

export PS1="\e[1;32m\u@\h:\e[1;34m\W\e[0;33m\$(print_git_branch)\e[00m$ "
```

## Method-2

```bash
export PS1="\w:\$(git branch 2>/dev/null | grep '^*' | colrm 1 2)$ "
```
