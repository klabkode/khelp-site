# Manage Bash Command History

## HISTCONTROL

The `HISTCONTROL` variable in Bash allows for efficient storage of command history.
It can be set to different options to control how commands are saved in the history list.

### Key Options

- `ignoredups`
  Prevents storage of commands that are the same as the immediate previous command.

- `ignorespace`
  Commands that begin with a white space character are not included in the history list.

- `ignoreboth`
  Combines `ignorespace` and `ignoredups`, ensuring that commands with leading white space characters and duplicates are not stored.

- `erasedups`
  All previous lines matching the current line are removed from the history list before saving it, preventing duplicates.

By setting `HISTCONTROL` to one of these options in your `~/.bashrc` file, you can control which commands are saved in your Bash history efficiently.

### Example: `~/.bashrc`

```bash
export HISTCONTROL=ignoredups
export HISTCONTROL=ignoreboth:erasedups
```
