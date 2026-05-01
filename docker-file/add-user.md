# Docker script to add non-sudo user

```Dockerfile
# Create local user

ARG USER=user
RUN useradd -m ${USER} -s /bin/bash && \
    usermod -aG sudo ${USER} && \
    echo "${USER} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/${USER} && \
    chmod 0440 /etc/sudoers.d/${USER}

# Create local user and password

ARG USER=user
ARG USER_PASSWD=password
RUN useradd -m ${USER} -s /bin/bash && \
    usermod -aG sudo ${USER} && \
    echo "${USER}:${USER_PASSWD}" | chpasswd && \
    echo "${USER} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/${USER} && \
    chmod 0440 /etc/sudoers.d/${USER}

# Setup user login

USER ${USER}
WORKDIR /home/${USER}
```

## See

Implications creating system accounts

Understanding how uid and gid work in Docker containers
