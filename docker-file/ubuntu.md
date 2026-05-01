# Docker file to pull and configure Ubuntu base image

```Dockerfile
# Base image
FROM ubuntu:focal

# About docker image
LABEL maintainer="username@email.com"
LABEL description="Ubuntu focal docker image"

# Disable user prompt
ENV DEBIAN_FRONTEND noninteractive

# Update and upgrade the system
RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends

# Install base packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends locales tzdata

# Setting timezone
RUN ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

# Setting locales
RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=en_US.UTF-8 && \
    locale-gen en_US.UTF-8

# Setting language
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Installing additional packages
RUN apt-get install -y --no-install-recommends cscope curl gcc gdb git global gpg make sudo tree universal-ctags vim wget

WORKDIR /root
```
