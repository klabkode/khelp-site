# tmux: terminal multiplexer

## Sessions

### Create new session

```bash
tmux new -s session-name
```

### Kill new session

```bash
tmux kill-session -t session-name
```

### Attach detached session

```bash
tmux a -t session-name
```

### List screen sessions

```bash
tmux ls
```

## Keybindings

**Default Prefix Key:** `Ctrl + b` (can be customized)

### Window Management

| Keybinding | Action | Description |
|------------|--------|-------------|
| `Ctrl + b c` | Create window | Creates a new window in current session |
| `Ctrl + b ,` | Rename window | Rename the current window |
| `Ctrl + b &` | Kill window | Close current window (with confirmation) |
| `Ctrl + b p` | Previous window | Switch to previous window |
| `Ctrl + b n` | Next window | Switch to next window |
| `Ctrl + b l` | Last window | Toggle between current and last active window |
| `Ctrl + b 0-9` | Select window | Switch to window by number (0-9) |
| `Ctrl + b w` | Window list | Show interactive window list |
| `Ctrl + b f` | Find window | Search for window by name |

### Pane Management

| Keybinding | Action | Description |
|------------|--------|-------------|
| `Ctrl + b %` | Split horizontal | Split current pane horizontally (left/right) |
| `Ctrl + b "` | Split vertical | Split current pane vertically (top/bottom) |
| `Ctrl + b x` | Kill pane | Close current pane (with confirmation) |
| `Ctrl + b ;` | Last pane | Switch to last active pane |
| `Ctrl + b o` | Next pane | Cycle through panes |
| `Ctrl + b q` | Show pane numbers | Display pane numbers briefly |
| `Ctrl + b z` | Zoom pane | Toggle pane zoom (fullscreen) |
| `Ctrl + b !` | Break pane | Move pane to new window |

### Pane Navigation

| Keybinding | Action | Description |
|------------|--------|-------------|
| `Ctrl + b ←` | Move left | Switch to pane on the left |
| `Ctrl + b →` | Move right | Switch to pane on the right |
| `Ctrl + b ↑` | Move up | Switch to pane above |
| `Ctrl + b ↓` | Move down | Switch to pane below |
| `Ctrl + b {` | Swap left | Swap current pane with previous |
| `Ctrl + b }` | Swap right | Swap current pane with next |

### Pane Resizing

| Keybinding | Action | Description |
|------------|--------|-------------|
| `Ctrl + b Ctrl + ←` | Resize left | Decrease pane width |
| `Ctrl + b Ctrl + →` | Resize right | Increase pane width |
| `Ctrl + b Ctrl + ↑` | Resize up | Decrease pane height |
| `Ctrl + b Ctrl + ↓` | Resize down | Increase pane height |
| `Ctrl + b Alt + ←` | Resize left (5) | Resize by 5 cells left |
| `Ctrl + b Alt + →` | Resize right (5) | Resize by 5 cells right |
| `Ctrl + b Alt + ↑` | Resize up (5) | Resize by 5 cells up |
| `Ctrl + b Alt + ↓` | Resize down (5) | Resize by 5 cells down |

### Session Management

| Keybinding | Action | Description |
|------------|--------|-------------|
| `Ctrl + b d` | Detach session | Detach from current session |
| `Ctrl + b D` | Choose detach | Choose which session to detach |
| `Ctrl + b s` | Session list | Show interactive session list |
| `Ctrl + b $` | Rename session | Rename current session |

### System Commands

| Keybinding | Action | Description |
|------------|--------|-------------|
| `Ctrl + b :` | Command prompt | Enter tmux command mode |
| `Ctrl + b ?` | Help | Show all keybindings |
| `Ctrl + b r` | Reload config | Reload tmux configuration |
| `Ctrl + b t` | Clock | Show clock in current pane |

### Copy Mode (Scrollback)

| Keybinding | Action | Description |
|------------|--------|-------------|
| `Ctrl + b [` | Enter copy mode | Enter scrollback/copy mode |
| `Space` | Start selection | Begin text selection (in copy mode) |
| `Enter` | Copy selection | Copy selected text and exit copy mode |
| `Ctrl + b ]` | Paste | Paste copied text |
| `q` | Exit copy mode | Exit copy mode without copying |
| `g` | Go to top | Jump to beginning of buffer |
| `G` | Go to bottom | Jump to end of buffer |
| `/` | Search forward | Search for text forward |
| `?` | Search backward | Search for text backward |
| `n` | Next match | Go to next search match |
| `N` | Previous match | Go to previous search match |

### Advanced Pane Operations

| Keybinding | Action | Description |
|------------|--------|-------------|
| `Ctrl + b Space` | Next layout | Cycle through pane layouts |
| `Ctrl + b Alt + 1` | Even horizontal | Arrange panes in even horizontal layout |
| `Ctrl + b Alt + 2` | Even vertical | Arrange panes in even vertical layout |
| `Ctrl + b Alt + 3` | Main horizontal | Main pane on top, others below |
| `Ctrl + b Alt + 4` | Main vertical | Main pane on left, others on right |
| `Ctrl + b Alt + 5` | Tiled | Arrange panes in tiled layout |

### Command Line Shortcuts

| Command | Action | Description |
|---------|--------|-------------|
| `tmux new -s name` | New session | Create named session |
| `tmux attach -t name` | Attach session | Attach to named session |
| `tmux list-sessions` | List sessions | Show all sessions |
| `tmux kill-session -t name` | Kill session | Terminate named session |
| `tmux rename-session -t old new` | Rename session | Rename session |
| `tmux has-session -t name` | Check session | Check if session exists |

## Best Practices

### Workflow Optimization

| Practice | Benefit | Implementation |
|----------|---------|----------------|
| Use named sessions | Easy identification and attachment | `tmux new -s project-name` |
| Create project-specific sessions | Organized workspace per project | One session per development project |
| Use descriptive window names | Quick navigation and context | `Ctrl + b ,` to rename windows |
| Leverage pane layouts | Consistent workspace setup | `Ctrl + b Space` to cycle layouts |
| Master copy mode | Efficient text manipulation | `Ctrl + b [` for scrollback navigation |

### Performance Tips

| Tip | Description | Command/Setting |
|-----|-------------|-----------------|
| Limit scrollback buffer | Reduce memory usage | `set-option -g history-limit 10000` |
| Use mouse support | Faster pane selection | `set -g mouse on` |
| Enable vi mode | Familiar navigation | `set-window-option -g mode-keys vi` |
| Optimize status bar | Reduce visual clutter | Customize status-left and status-right |
| Use session groups | Share windows between sessions | `tmux new -s group -t existing` |

### Common Workflows

| Workflow | Steps | Use Case |
|----------|-------|----------|
| Development Setup | 1. Create session<br>2. Split into editor/terminal<br>3. Open additional windows for logs/tests | Full-stack development |
| System Monitoring | 1. Create monitoring session<br>2. Multiple panes for different tools<br>3. Use layouts for organization | Server administration |
| Remote Work | 1. SSH into server<br>2. Create persistent session<br>3. Detach when disconnecting | Remote development |

## Troubleshooting

### Common Issues and Solutions

| Problem | Symptoms | Solution | Prevention |
|---------|----------|----------|------------|
| Session not found | `no sessions` error | Check with `tmux ls` | Use consistent session names |
| Keybindings not working | Commands don't respond | Check prefix key with `Ctrl + b ?` | Verify tmux.conf syntax |
| Pane resize not working | Arrow keys don't resize | Use `Ctrl + b Ctrl + arrows` | Hold Ctrl for resize mode |
| Copy mode issues | Can't scroll or select text | Enter copy mode with `Ctrl + b [` | Learn vi-mode navigation |
| Session persistence | Sessions disappear after reboot | Use tmux plugins like resurrect | Set up automatic session saving |
| Mouse not working | Can't click to select panes | Enable with `set -g mouse on` | Add to tmux.conf |
| Colors look wrong | Terminal colors incorrect | Set `TERM=screen-256color` | Configure terminal properly |

### Error Recovery

| Scenario | Recovery Steps | Alternative Method |
|----------|---------------|-------------------|
| Frozen session | 1. `Ctrl + b :` <br>2. `kill-session` | Force kill: `tmux kill-session -t name` |
| Corrupted config | 1. Backup current config<br>2. Reset to defaults<br>3. Reload | Start with minimal config |
| Lost session | 1. `tmux ls` to check<br>2. `tmux attach` to reconnect | Create new session if needed |
| Unresponsive pane | 1. `Ctrl + b x` to kill pane<br>2. Create new pane | Switch to different pane first |

### Debugging Commands

| Command | Purpose | Usage Example |
|---------|---------|---------------|
| `tmux info` | Show tmux information | Debug configuration issues |
| `tmux list-keys` | List all keybindings | Verify custom bindings |
| `tmux show-options -g` | Show global options | Check configuration values |
| `tmux display-message` | Show status messages | Debug scripting issues |
| `tmux source-file ~/.tmux.conf` | Reload configuration | Apply config changes |

## Customization

### Essential Configuration Options

| Setting | Purpose | Example | Benefit |
|---------|---------|---------|---------|
| Prefix key | Change default prefix | `set -g prefix C-a` | More ergonomic than Ctrl+b |
| Mouse support | Enable mouse interaction | `set -g mouse on` | Click to select panes/windows |
| Vi mode | Use vi-style navigation | `setw -g mode-keys vi` | Familiar for vi/vim users |
| Status bar | Customize status display | `set -g status-position top` | Better visibility |
| Colors | Set color scheme | `set -g default-terminal "screen-256color"` | Better color support |
| History | Increase scrollback | `set -g history-limit 50000` | More scrollback buffer |

### Popular Keybinding Customizations

| Custom Binding | Command | Purpose |
|----------------|---------|---------|
| `bind r source-file ~/.tmux.conf` | Reload config | Quick config reload |
| `bind | split-window -h` | Vertical split | More intuitive split |
| `bind - split-window -v` | Horizontal split | More intuitive split |
| `bind h select-pane -L` | Move left | Vi-style navigation |
| `bind j select-pane -D` | Move down | Vi-style navigation |
| `bind k select-pane -U` | Move up | Vi-style navigation |
| `bind l select-pane -R` | Move right | Vi-style navigation |

### Sample ~/.tmux.conf

| Section | Configuration | Description |
|---------|---------------|-------------|
| Basic Settings | `set -g prefix C-a`<br>`unbind C-b`<br>`set -g mouse on` | Change prefix and enable mouse |
| Visual | `set -g status-bg colour235`<br>`set -g status-fg colour136`<br>`set -g status-position top` | Customize status bar appearance |
| Pane Borders | `set -g pane-border-style fg=colour238`<br>`set -g pane-active-border-style fg=colour208` | Highlight active pane |
| Copy Mode | `setw -g mode-keys vi`<br>`bind-key -T copy-mode-vi v send-keys -X begin-selection` | Vi-style copy mode |

### Plugin Recommendations

| Plugin | Purpose | Installation | Key Features |
|--------|---------|--------------|--------------|
| TPM | Plugin manager | `git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm` | Manage other plugins |
| tmux-resurrect | Session persistence | Add to plugins list | Save/restore sessions |
| tmux-continuum | Auto-save sessions | Works with resurrect | Automatic session saving |
| tmux-yank | Better copying | System clipboard integration | Copy to system clipboard |
| tmux-pain-control | Better navigation | Improved pane controls | Enhanced pane management |
