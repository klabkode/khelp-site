# Docker command line usage

## Build

Build Docker image in `$PATH_NAME`

```bash
docker build [OPTIONS] PATH | URL | -
```

```bash
docker build -a -t <image-name>:<tag> $PATH_NAME
```

## Build with Dockerfile

```bash
docker build -f Dockerfile.debug .
```

### Build Output

```bash
docker build -o out .
```

### Specify Output Build Type

```bash
docker build --output type=local,dest=out .
docker build --output type=tar,dest=out.tar .
```

## PS Command Output Format

```bash
docker ps --format '{{.ID}}'
docker ps --format '{{.Names}}'
docker ps --format '{{.Image}}'
docker ps --format '{{.Command}}'
docker ps --format '{{.RunningFor}}'
docker ps --format '{{.Status}}'
docker ps --format '{{.Ports}}'
```

**Example:**

```bash
docker ps --format "table {{.Image}}\t{{.Ports}}\t{{.Names}}"
docker ps --format "\nDocker Details \nID:{{.ID}} \nNames: {{.Names}} \nSize: {{.Size}} "
```

### Weblinks

<https://docs.docker.com/engine/reference/commandline/ps/#formatting>

## Remove

```bash
docker rm <container-id>    # Remove container
docker rm -f <container-id> # Force remove running container
docker rmi <image-id>       # Remove image
```

### Delete all containers

```bash
docker rm -f $(docker ps -a -q)
```

## Delete dangling docker images

```bash
docker rmi $(docker images -f 'dangling=true' -q)
```

## Rename

Rename Docker Image

```bash
docker tag <image-id> <new-image-name:tag>
```

## Load

Load Docker image from an archive

```bash
docker load --input <docker-image-archive>
```

## Save

Save Docker image to an archive

```bash
docker save <image-id>:<tag>                         # Write image to stdout
docker save -o <archive-name> <image-id>:<tag>       # Write image to Tarball
docker save <image-id>:<tag> | gzip > <archive-name> # Write image to TGZ archive
```

## Commit

Committing running container changes to new Docker Image

```bash
docker commit <container-id> <new-image-name>
```

**Example:**

```bash
docker commit deddd39fa163 ubuntu-new
```

## Port Forwarding

```bash
docker run -p 9000:8080 -it <image-id>:<tag> <command>
```
