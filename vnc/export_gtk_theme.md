# Export GTK Theme

## Export GTK theme to VNC session

```bash
#!/bin/bash

unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS

# Theme
export GTK_THEME=Yaru-dark
export ICON_THEME=Yaru
export XCURSOR_THEME=Yaru
export XCURSOR_SIZE=24

# Fonts
export GTK_FONT_NAME="Ubuntu 11"
export GTK_MONOSPACE_FONT_NAME="Ubuntu Mono 13"

# Desktop hint
export XDG_SESSION_TYPE=x11

# Start Session
exec dbus-launch --exit-with-session gnome-session --session=ubuntu
```

