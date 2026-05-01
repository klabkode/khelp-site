# autostart: Configure Docker to start on boot with systemd

## Enable service on system boot

```bash
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

## Disable docker autostart

```bash
sudo systemctl disable docker.service
sudo systemctl disable containerd.service
```

### Reference

<https://docs.docker.com/engine/install/linux-postinstall/>
