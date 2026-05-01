# Install Ubuntu in Docker Container

## Usage

```bash
docker run --mount type=bind,source=$HOME/Public,target=/data -it --name ubuntu -h ubuntu ubuntu:focal bash

docker start ubuntu

docker exec -it ubuntu bash
```

## Install

Install ubuntu from official repo.

```bash
docker run -it --name <container-name> -h <hostname> ubuntu:<tag-name> <command>
```

**Example:**

```bash
docker run -it --name ubuntu -h ubuntu ubuntu:latest bash
```

## Post_Install

Run `unminimize` command to get full experience.

Install base packages like vim gcc and etc.

## Start

Start and Login to the container.

```bash
docker start ubuntu
docker exec -it ubuntu bash
```

## Stop

```bash
docker stop ubuntu  # Stop running container
docker rm   ubuntu  # Remove container
docker rmi  ubuntu  # Remove docker image
```

## Commit

Create new docker image with the specified container changes.

```bash
docker commit <container-name> <new-image-name>
```

**Example:**

```bash
docker commit ubuntu ubuntu:new
```

## Rename

```bash
docker tag <image-id> <new-image-name:tag>
```

## Volume

Sharing `$HOST_PATH` of the Host to the container at `$CONTAINER_PATH`.

```bash
docker run --mount type=bind,source=$HOST_PATH,target=$CONTAINER_PATH -it --name <container-name> <docker-image>:<tag> <command>
```

## Official_Ubuntu_Tags

```bash
ubuntu:focal
ubuntu:bionic
```

## Weblinks

<https://stackoverflow.com/questions/40112083/can-i-use-docker-for-installing-ubuntu-on-a-mac>

<https://hub.docker.com/_/ubuntu>
