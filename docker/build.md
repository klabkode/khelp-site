# Build command usage

```bash
docker build -t <image-name>:<tag-name> .
docker build -t <image-name>:<tag-name> <docker-file>
```

## Specific Docker file

```bash
docker build -t <image-name>:<tag-name> -f <path/to/docker-file> .
```

## Set build-time variables

```bash
docker build --build-arg VAR_NAME=value -t <image-name>:<tag-name> -f <path/to/docker-file> .
```

## Build the image without using the cache

```bash
docker build --no-cache -t <image-name>:<tag-name> .
```
