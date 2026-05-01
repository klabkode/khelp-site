# screen: Launch Multiple Shell Sessions

## Operations

### Create new session

```bash
screen -S session_name
```

### Resume detached session

```bash
screen -r session_name
```

### List screen sessions

```bash
screen -ls
```

## Keybindings

### Session Management

| Keybinding     | Action | Use Case |
|----------------|--------|----------|
| `Ctrl+a d`     | Detach from session | Leave session running in background, reconnect later |
| `Ctrl+a D D`   | Detach and logout | Cleanly exit session and close terminal |
| `Ctrl+a :quit` | Quit screen session | Terminate all windows and exit screen |

### Window Management

| Keybinding | Action | Use Case |
|------------|--------|----------|
| `Ctrl+a c` | Create new window | Start fresh shell or run different program |
| `Ctrl+a "` | List all windows | See overview of all open windows |
| `Ctrl+a w` | Show window bar | Quick view of window numbers and names |
| `Ctrl+a 0-9` | Switch to window N | Jump directly to specific window |
| `Ctrl+a n` | Next window | Cycle forward through windows |
| `Ctrl+a p` | Previous window | Cycle backward through windows |
| `Ctrl+a Ctrl+a` | Toggle between current/previous | Quick switch between two windows |
| `Ctrl+a A` | Rename current window | Give descriptive names to windows |
| `Ctrl+a k` | Kill current window | Close window and terminate its process |

### Region/Split Management

| Keybinding   | Action | Use Case |
|--------------|--------|----------|
| `Ctrl+a S`   | Split horizontally | Create horizontal split panes |
| `Ctrl+a \|`  | Split vertically | Create vertical split panes |
| `Ctrl+a Tab` | Switch to next region | Navigate between split panes |
| `Ctrl+a Q`   | Close all regions except current | Return to single pane view |
| `Ctrl+a X`   | Close current region | Remove one split pane |
| `Ctrl+a :resize` | Resize region | Adjust split pane sizes |

### Navigation & Information

| Keybinding | Action | Use Case |
|------------|--------|----------|
| `Ctrl+a ?` | Show help/key bindings | Quick reference for commands |
| `Ctrl+a :` | Enter command mode | Execute screen commands directly |
| `Ctrl+a H` | Toggle logging | Record session output to file |
| `Ctrl+a [` | Enter copy mode | Scroll back through terminal history |
| `Ctrl+a ]` | Paste from buffer | Insert previously copied text |

### Advanced Features

| Keybinding | Action | Use Case |
|------------|--------|----------|
| `Ctrl+a x` | Lock screen session | Password protect your session |
| `Ctrl+a M` | Monitor window for activity | Get notified when window has output |
| `Ctrl+a _` | Monitor window for silence | Get notified when window goes quiet |
| `Ctrl+a f` | Toggle flow control | Enable/disable Ctrl+s/Ctrl+q flow control |
