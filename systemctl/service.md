# `systemctl` Usage

## Quick Notes

### Using service

```bash
sudo service ssh start
sudo service ssh stop
sudo service ssh status
```

### Using systemctl

```bash
sudo systemctl start  sshd.service
sudo systemctl enable sshd.service
sudo systemctl status sshd.service
```

## Status & Inspection

```bash
sudo systemctl status                 # overall system status
sudo systemctl status ssh.service     # single system service
systemctl --user status               # user session services
systemctl --user status pipewire.service
```

## Listing

```bash
sudo systemctl list-units --type=service
sudo systemctl list-units --type=service --all

systemctl --user list-units
systemctl --user list-units --type=service
systemctl --user list-units --type=service --state=running
systemctl --user list-units --type=service --state=failed
systemctl --user list-units --type=service --state=inactive

systemctl --user list-units --type=service --no-pager --no-legend
```

### Alphabetical list

```bash
systemctl --user list-units --type=service --no-legend | sort
```

## Enable / Disable (persistent)

```bash
sudo systemctl enable ssh.service
sudo systemctl disable ssh.service

systemctl --user enable tracker-miner-fs.service
systemctl --user disable tracker-miner-fs.service
```

## Start / Stop / Restart (runtime)

```bash
sudo systemctl start nginx.service
sudo systemctl stop nginx.service
sudo systemctl restart nginx.service

systemctl --user restart pipewire.service
```

## Mask (hard block)

```bash
sudo systemctl mask cups.service
systemctl --user mask tracker-store.service

systemctl --user unmask tracker-store.service
```

## Logs

```bash
sudo journalctl -u ssh.service
sudo journalctl -u ssh.service -f

journalctl --user -u pipewire.service
```

## Debug & Analysis

```bash
sudo systemctl --failed
systemctl --user --failed

systemd-analyze
systemd-analyze blame
systemd-analyze critical-chain
```

### CPU usage per user service

```bash
systemctl --user status
```

## Unit Internals

```bash
systemctl cat ssh.service
systemctl show ssh.service -p FragmentPath # Where the unit file lives
systemctl list-dependencies ssh.service
systemctl list-dependencies --reverse tracker-miner-fs.service
```

## GNOME FLASHBACK – PRACTICAL EXAMPLES

View only Flashback-relevant user services

```bash
systemctl --user list-units --type=service \
  | egrep 'gnome|tracker|evolution|indicator|pipewire'
```

Common Flashback trims

```bash
systemctl --user mask tracker-miner-fs.service
systemctl --user mask tracker-store.service
systemctl --user mask evolution-alarm-notify.service
systemctl --user mask goa-daemon.service
systemctl --user mask gnome-software.service
```

Verify Flashback still healthy

```bash
ps -ef | egrep 'gnome-panel|metacity|gnome-settings'
systemctl --user --failed
```

## systemctl ↔ service ↔ chkconfig mapping

| Task                  | systemctl (modern)          | service (SysV)        | chkconfig (SysV)     |
| --------------------- | --------------------------- | --------------------- | -------------------- |
| Service status        | `systemctl status ssh`      | `service ssh status`  | ❌                   |
| Start                 | `systemctl start ssh`       | `service ssh start`   | ❌                   |
| Stop                  | `systemctl stop ssh`        | `service ssh stop`    | ❌                   |
| Restart               | `systemctl restart ssh`     | `service ssh restart` | ❌                   |
| Enable at boot        | `systemctl enable ssh`      | ❌                    | `chkconfig ssh on`   |
| Disable at boot       | `systemctl disable ssh`     | ❌                    | `chkconfig ssh off`  |
| List startup services | `systemctl list-unit-files` | ❌                    | `chkconfig --list`   |
| Hard disable          | `systemctl mask ssh`        | ❌                    | ❌                   |
| Logs                  | `journalctl -u ssh`         | `/var/log/*`          | ❌                   |

---
