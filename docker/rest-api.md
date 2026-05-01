# Docker REST API reference

## List all images (docker image)

```bash
curl --unix-socket /var/run/docker.sock http://localhost/v1.41/images/json
```

## List containers (docker ps)

```bash
curl --unix-socket /var/run/docker.sock http://localhost/v1.41/containers/json
```
