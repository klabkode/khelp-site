# Docker script to setup VNC server

```Dockerfile
# Setting variables
ARG USERNAME=username
ARG DIRHOME=/home/$USERNAME
ARG DIRVNC=$DIRHOME/.vnc
ARG VNC_PASSWD=password
ARG USER_PASSWD=password

# Creating new user
RUN useradd -m $USERNAME -s /bin/bash
RUN usermod -aG sudo $USERNAME
RUN echo "$USERNAME:$USER_PASSWD" | chpasswd # Setting username password

# Setting VNC for user
RUN  mkdir -p $DIRVNC
COPY xstartvm /xstartvm
RUN  chmod a+x /xstartvm
COPY xstartup $DIRVNC/xstartup
RUN  touch $DIRHOME/.Xauthority
RUN  chmod a+x $DIRVNC/xstartup
RUN  chown -R $USERNAME:$USERNAME $DIRHOME/.Xauthority
RUN  echo "$VNC_PASSWD" | vncpasswd -f >> $DIRVNC/passwd && chmod 600 $DIRVNC/passwd
RUN  chown -R $USERNAME:$USERNAME $DIRVNC # Finally update the ownership to the user

# Setting environments
ENV USER  $USERNAME
ENV VNC_PORT   5901
ENV NOVNC_PORT 6901
ENV VNC_PASSWD=$VNC_PASSWD
ENV VNC_RESOLUTION 1376x720

# Setting entry point
USER    $USERNAME
WORKDIR $DIRHOME
EXPOSE  $VNC_PORT $NOVNC_PORT
```
