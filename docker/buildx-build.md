# Build Docker image with Build-X

## Installation

Refer `kh docker install` for installation.

## Set up the builder with the desired platforms

```bash
docker buildx create --use --name mybuilder
docker buildx inspect mybuilder --bootstrap
```

This creates a builder named `mybuilder` and sets it as the active builder.

The `--bootstrap` flag sets up the builder with a default set of worker nodes supporting common architectures.

## Build the multi-architecture image

```bash
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t <user-name>/<image-name>:<tag-name>
```

## Push the multi-architecture image to Docker Hub

```bash
docker login
docker buildx create --use
docker buildx inspect mybuilder --bootstrap
docker buildx build --push --platform linux/amd64,linux/arm64,linux/arm/v7 -t <user-name>/<image-name>:<tag-name> .
```

## Inspect the image

```bash
docker buildx imagetools inspect <user-name>/<image-name>:<tag-name>
```
