# Setting VirtualBox Shared Folder

## Steps

1. Add the host folder to share in VirtualBox settings.
2. Insert Guest Additions CD image to mount the ISO image.
3. Follow the steps as sudoer:

   ```bash
   sudo su
   apt install gcc make
   mkdir --parents /media/cdrom
   mount /dev/cdrom /media/cdrom
   /media/cdrom/VBoxLinuxAdditions.run
   reboot
   ```

4. After reboot:

   ```bash
   modinfo vboxguest
   sudo usermod --append --groups vboxsf -- $USER
   sudo adduser $USER vboxsf # optional
   cat /etc/group | grep $USER
   ```

5. Now the shared folder is available to the guest.
