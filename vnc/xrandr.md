# Xrandr Usage

## 1: Identify your display name & resolution

```bash
$ xrandr
Screen 0: minimum 320 x 200, current 2140 x 1080, maximum 16384 x 16384
eDP-1 connected primary 1920x1080+220+0 (normal left inverted right x axis y axis) 309mm x 174mm panning 1920x1080+220+0
   1920x1080     60.00 +  59.97    59.96    59.93    48.00
   1680x1050     59.95    59.88
   1600x1024     60.17
   1400x1050     59.98
   1600x900      59.99    59.94    59.95    59.82
   1280x1024     60.02
```

## 2: Change screen width to predefined resolution

```bash
xrandr --output eDP-1 --mode 1680x1050
```

## Custom mode so that ~1 cm on the left is completely unused

### 1: Decide the new width

Native width: 1920

```bash
1 cm ≈ 40 px

1920 − 40 = 1880 px
```

Laptop panels prefer widths divisible by 8.

```bash
1872 × 1080
```

### 2: Generate the modeline

```bash
$ cvt 1872 1080
# 1872x1080 59.98 Hz (CVT) hsync: 67.18 kHz; pclk: 168.75 MHz
Modeline "1872x1080_60.00"  168.75  1872 2000 2192 2512  1080 1083 1093 1120 -hsync +vsync
```

### 3: Create the mode from above 'Modeline'

```bash
xrandr --newmode "1872x1080_60.00" 168.75 1872 1992 2184 2496 1080 1083 1088 1120 -hsync +vsync
```

### 4: Attach the mode to your display

Find your display name: `xrandr | grep connected`

```bash
$ xrandr | grep connected
eDP-1 connected primary 1920x1080+220+0 (normal left inverted right x axis y axis) 309mm x 174mm panning 1920x1080+220+0
DP-1 disconnected (normal left inverted right x axis y axis)
HDMI-1 disconnected (normal left inverted right x axis y axis)
HDMI-2 disconnected (normal left inverted right x axis y axis)
```

Assume it is eDP-1 (most laptops).

```bash
xrandr --addmode eDP-1 "1872x1080_60.00"
```

### 5: Apply the mode

```bash
xrandr --output eDP-1 --mode "1872x1080_60.00"
```

Done.

## Reset to original

```bash
xrandr --output eDP-1 --mode 1920x1080
```

## Add systemd service for auto start

### 1: Create service

```bash
mkdir -p ~/.config/systemd/user
vi ~/.config/systemd/user/fix-screen.service
```

Paste:

```bash
[Unit]
Description=Fix broken laptop screen
After=graphical-session.target

[Service]
Type=oneshot
ExecStart=/usr/bin/xrandr --output eDP-1 --panning 1920x1080+40+0

[Install]
WantedBy=default.target
```

Enable:

```bash
systemctl --user daemon-reload
systemctl --user enable fix-screen.service
```

How to verify it worked

```bash
andr | grep panning
eDP-1 connected primary 1920x1080+120+0 (normal left inverted right x axis y axis) 309mm x 174mm panning 1920x1080+120+0
```

### Troubleshoot

Check logs:

```bash
journalctl --user -u fix-screen.service --since today
```

Restart service:

```bash
systemctl --user start fix-screen.service

(or)

systemctl --user restart fix-screen.service
```

## Remove systemd service entry

### 1: Stop the service

```bash
systemctl --user stop fix-screen.service
```

### 2: Disable

```bash
systemctl --user disable fix-screen.service
```

### 3: Delete the service file

```bash
rm -f ~/.config/systemd/user/fix-screen.service
```

### 4. Reload systemd user manager

```bash
systemctl --user daemon-reload
```

### 5. Remove logs (cleanup)

journalctl --user --vacuum-time=1s

### 6. Verify it’s gone

```bash
systemctl --user list-unit-files | grep fix-screen
```

---
