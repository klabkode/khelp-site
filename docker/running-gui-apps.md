# Running GUI applications inside Docker container

## For Ubuntu

1. Install Xhost package comes by default in Ubuntu OS.

2. Run `xhost +` to enable X11 connection

3. Lauch the docker container GUI applications

   ```bash
   docker run -it --rm  -e DISPLAY=:0 --net=host gns3/xeyes
   ```

   **Note:**

   The run option `--net=host` is equivalent to `-v /tmp/.X11-unix/:/tmp/.X11-unix/` to share host network.

   ```bash
   docker run -it --rm  -e DISPLAY=:0 -v /tmp/.X11-unix/:/tmp/.X11-unix/ gns3/xeyes
   ```

   **Xhost combinations:**

   ```bash
   xhost + # Allow X server connection
   xhost - # Disallow X server connection
   ```

   **Other combinations:**

   ```bash
   xhost +local:*
   xhost -local:*
   xhost HOST_IP:0
   ```

   If the docker has non-root user it does not require Xhost to start.

   **Dockerfile:**

   ```Dockerfile
   RUN useradd -m user --shell /bin/bash
   RUN usermod -aG sudo user
   RUN echo "user:password" | chpasswd
   USER user
   WORKDIR /home/user
   ```

## For MacOS

## Method 1

1. Install Xquartz and restart the login

   ```bash
   brew install xquartz
   ```

2. Open Xquartz and enable `Allow connections from network clients` in `Security` tab

3. Run `xhost +` to disable X11 access control (or)

   Run `xhost HOST_IP` Xquartz terminal.

4. Lauch the docker container GUI applications

   ```bash
   docker run -it --rm -e DISPLAY=192.168.1.101:0 gns3/xeyes
   ```

## Method 2: (with Socat)

1. Install Xquartz and restart the login

   ```bash
   brew install xquartz socat
   ```

2. Open Xquartz and enable `Allow connections from network clients` in `Security` tab

3. Run below `socat` command to enable X11 forward

   ```bash
   socat TCP-LISTEN:6000,reuseaddr,fork UNIX-CLIENT:\"$DISPLAY\"`
   ```

4. Lauch the docker container GUI applications

   ```bash
   docker run -it --rm -e DISPLAY=192.168.1.101:0 gns3/xeyes
   ```
