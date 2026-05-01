# Xstartup file for VNC server

## VNC Server Installations

```bash
apt install tigervnc-standalone-server dbus-x11

(or)

apt install --no-install-recommends tigervnc-standalone-server tigervnc-common dbus-x11
```

## System Utilities

```bash
gnome-settings-daemon
gnome-system-monitor
gnome-terminal
gnome-tweaks
nautilus
yaru-theme-gtk yaru-theme-icon yaru-theme-sound ubuntu-wallpapers
xterm
x11-apps
```

### Indicators

```bash
apt install \
  gnome-settings-daemon \
  indicator-application \
  indicator-datetime \
  indicator-power \
  indicator-session \
  indicator-sound
```
---

## GNOME Flashback Flat Model

```bash
#!/bin/bash

unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS

export XDG_SESSION_TYPE=x11

gnome-panel &
#metacity &
xeyes &
nautilus &
gnome-terminal &

exec gnome-session --session=gnome-flashback-metacity &
```

---

## GNOME Flashback Session

```bash
apt install --no-install-recommends \
    gnome-session-flashback gnome-panel metacity
```

```bash
#!/bin/bash

unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS

export XDG_SESSION_TYPE=x11
export XDG_CURRENT_DESKTOP=GNOME-Flashback:GNOME # GNOME-Flashback:Unity

exec dbus-launch --exit-with-session \
    gnome-session --session=gnome-flashback-metacity

wait
```

---

## Vanilla GNOME Session

```bash
#!/bin/bash

unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS

export XDG_SESSION_TYPE=x11

dbus-launch --exit-with-session gnome-session &
```

---

## Ubuntu GNOME Session (KLAB)

```bash
apt install --no-install-recommends ubuntu-desktop-minimal
```

```bash
#!/bin/bash

unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS

export XDG_SESSION_TYPE=x11

exec dbus-launch --exit-with-session gnome-session --session=ubuntu

wait
```

---

## XFCE4 Session

```bash
apt install --no-install-recommends xfce4 xfce4-goodies
```

```bash
#!/bin/bash

# Set environment
unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS

export XDG_SESSION_TYPE=x11
export XDG_CURRENT_DESKTOP=XFCE

# Start XFCE session
exec dbus-launch --exit-with-session startxfce4 &

# Keep script running
wait
```

---

## Openbox Session

```bash
apt install --no-install-recommends openbox tint2 (gnome-panel)
```

```bash
#!/bin/bash
unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS

# Load X resources
[ -r "$HOME/.Xresources" ] && xrdb "$HOME/.Xresources"

# Panel
tint2 &

# Start Openbox session
exec openbox-session

wait
```

---

## More Combinations

```bash
#!/bin/bash

unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS

export XDG_SESSION_TYPE=x11

# Load X resources (optional but harmless)
[ -f "$HOME/.Xresources" ] && xrdb "$HOME/.Xresources"

# Start GNOME settings daemon (REQUIRED for most indicators)
gnome-settings-daemon &

# Start desktop session
# i3 &                                                                 # i3 session
# gnome-session --session=ubuntu &                                     # Ubuntu session
# exec dbus-launch --exit-with-session gnome-session                   # GNOME  session
# exec dbus-run-session -- gnome-session --session=ubuntu              # Ubuntu session
# exec dbus-launch --exit-with-session gnome-session --session=ubuntu  # Ubuntu session (prefer)
# exec dbus-launch --exit-with-session \
    gnome-session --session=gnome-flashback-metacity                   # Ubuntu GNOME Flashback

wait
```

