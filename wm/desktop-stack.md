# Linux Graphical Stack

## Stack

```bash
[ Hardware ]
(GPU, CPU, Keyboard, Mouse, Monitor)
        ↓
[ Display Server ]
(Xorg, Wayland)
        ↓
[ Display Manager / Login Manager ] - can be start using startx
(GDM, SDDM, LightDM, XDM)
        ↓
[ Session Manager ] - part of DE
(gnome-session, ksmserver, lxsession)
        ↓
[ Window Manager ] - either standalone or part of DE
(Mutter, KWin, i3, Openbox)
        ↓
[ Compositor ]
(Compiz, Mutter/KWin built-in, Picom)
        ↓
[ Desktop Environment ]
(GNOME, KDE Plasma, XFCE, Cinnamon, MATE)
        ↓
[ Panel / Dock / Taskbar ] - usually part of DE, optional standalone
(GNOME Dash, Plasma Panel, XFCE Panel, Tint2, Plank)
        ↓
[ User Applications ]
(File manager, Web browser, Office apps, Media players)
```

## Overview

Hardware → Display server → DM → Login → Session → DE

---
