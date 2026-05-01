# GDM

GDM3 stands for GNOME Display Manager (version 3).

It is the login manager responsible for:

Showing the graphical login screen

Starting your desktop session after login

Managing Wayland vs X11

Handling user switching, locking, and session selection

## In short

gdm3 is the program that starts GNOME itself.

```bash
Linux kernel
  ↓
systemd
  ↓
gdm3  ← (login screen)
  ↓
gnome-session
  ↓
gnome-shell + mutter
```

---

```bash
gdm3 = doorman (login screen)

gnome-session = house manager

mutter = window traffic controller

gnome-shell = furniture + UI
```

---
