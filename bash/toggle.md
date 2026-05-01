# Bash funtion to toggle prompt

### Bash alias to toggle the PS1 prompt based on whether a certain variable is set

```bash
# Add these lines to your ~/.bashrc or ~/.bash_profile

# Set initial value for the toggle variable
GIT_SH_PROMPT_ENABLED=false

# Function to toggle the PS1 prompt
toggle_git_sh_prompt() {
    if [ "$GIT_SH_PROMPT_ENABLED" = false ]; then
        export GIT_SH_PROMPT_ENABLED=true
        PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]$(git branch 2>/dev/null | grep \* | sed "s/* //")\$ '
    else
        export GIT_SH_PROMPT_ENABLED=false
        PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
    fi
}

# Alias to toggle the PS1 prompt
alias git-sh='toggle_git_sh_prompt'
```

### Bash script to toggles between enabling and disabling action

```bash
#!/bin/bash

# Check if an argument is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 enable|disable"
    exit 1
fi

ACTION=$1

case "$ACTION" in
    enable)
        echo "Enabling ..."
        ;;
    disable)
        echo "Disabling ..."
        ;;
    *)
        echo "Invalid option: $ACTION"
        echo "Usage: $0 enable|disable"
        exit 1
        ;;
esac
```
