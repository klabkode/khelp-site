# VNC Commands

## VNC Commands

```bash
vncserver -kill :1 && vncserver :1

vncserver -kill :1 && vncserver :1 -localhost no

vncserver -kill :1 && vncserver :1 -localhost no -geometry 1368x768
```

## X11 Commands

```bash
xrdb $HOME/.Xresources 2>/dev/null

xsetroot -solid grey
xsetroot -solid "#2f343f"

autocutsel -fork

x-window-manager &
```

## Apps

```bash
x-terminal-emulator -geometry 80x24+10+10 -ls -title "$VNCDESKTOP Desktop" &
```

## DBUS (dbus-x11) Commands

### Usage 1

```bash
eval "$(dbus-launch --sh-syntax --exit-with-session)"
exec gnome-session --session=gnome-flashback-metacity &
```

### Usage 2

```bash
exec dbus-launch --exit-with-session gnome-session      # GNOME  session
```

### Usage 3

```bash
exec dbus-run-session -- gnome-session --session=ubuntu # Ubuntu session
```

### Usage 4

```bash
exec dbus-launch --exit-with-session \
    gnome-session --session=ubuntu                    # Ubuntu session

exec dbus-launch --exit-with-session \
    gnome-session --session=gnome-flashback-metacity  # Ubuntu GNOME flashback
```

