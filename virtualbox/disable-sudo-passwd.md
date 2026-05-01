# Disable sudo password prompt for SUDO_USER

Follow the below steps in root prompt.

```bash
echo "$SUDO_USER ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$SUDO_USER
chmod 0440 /etc/sudoers.d/$SUDO_USER
```
