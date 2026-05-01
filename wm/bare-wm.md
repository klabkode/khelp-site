# Setting Up a Bare Window Manager in Ubuntu 20

**Platform:** Docker VNC server

## Steps

1. Install Ubuntu server

   ```bash
   docker pull ubuntu:focal
   ```

2. Install Xorg

   ```bash
   apt install xorg
   ```

3. Install X11 window managers

   ```bash
   apt install metacity blackbox openbox twm i3
   ```

4. Install VNC server and add the below line to start WM on VNC startup

   ```bash
   /etc/X11/Xsession blackbox
   ```

## Notes

You can run GUI apps without window managers directly with Xorg.

Install any GUI program and start it with Xsession:

1. Install Xterm

   ```bash
   apt install xterm
   ```

2. Update the VNC startup with

   ```bash
   /etc/X11/Xsession xterm
   ```

3. Now xterm will run on VNC startup
