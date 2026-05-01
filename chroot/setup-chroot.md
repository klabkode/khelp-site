# Setup Chroot Environment

## Chroot Setup in Debian Systems

### Install dependencies

```bash
sudo apt-get install debootstrap
```

### Create directory were to install chroot

```bash
mkdir ./chroot
```

### Create chroot environment

```bash
sudo debootstrap focal ./chroot/
```

### Mount required filesystems based on the requirements

```bash
sudo mount --bind /sys  ./chroot/sys/
sudo mount --bind /dev  ./chroot/dev/
sudo mount --bind /proc ./chroot/proc/
```

> Unmount this files after usage

### Run Chroot

```bash
sudo chroot ./chroot/
sudo chroot ./chroot/ <program>
```

Example:

```bash
sudo chroot ./chroot/ bash
```

## Other stuffs

### Copy host file to access internet

```bash
cat /etc/os-release
cp /etc/hosts ~/chroot/ubuntu/bionic/etc/
```

### Add below prompt in `.bashrc`

```bash
CHROOT_NAME=trusty-chroot
export PS1="\e[0;32m\u@$CHROOT_NAME:\[\e[1;34m\]\w\[\e[00m\]$ "
cd $HOME
```

### Add new user

```bash
adduser chroot --home /home/chroot/ --shell /bin/bash
```

### Give root access

```bash
sudo usermod -aG sudo $USER
```

Else,

Added below line in suders file by 'sudo visudo' (to run command as sudo)

```bash
chroot ALL=(ALL) NOPASSWD: ALL
```
