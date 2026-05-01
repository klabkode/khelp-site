# Sudoer Mangement

## Add a user to the @sudo group

```bash
usermod -aG sudo <user-name>
```

## Allow user to run all sudoer commands

```bash
echo "${USER} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers`

(or)

echo "${USER} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/${USER}
```

## Allow user to run specific sudoer commands

```bash
${USER} ALL=(ALL) NOPASSWD: /sbin/reboot
```

## Note

Remember, always use `sudo visudo` or `sudo visudo -f /path/to/file` to edit
sudo configuration files to ensure proper syntax checking.

## Verify running configuration

```bash
sudo -l
```
