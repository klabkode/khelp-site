# docker-compose

## Usage

```bash
docker-compose up -d
```

**Example:**

```bash
version: "3"

services:
  opengrok:
    container_name: opengrok
    image: opengrok/docker:latest            # pull the latest docker image from the cloud
    ports:
      - "9090:8080/tcp"                      # forward the container traffics at the port 8080 to the
    environment:                             # - host machine to the port 9090
      SYNC_PERIOD_MINUTES: '10'              # sync repo for every one minutes
    volumes:                                 # volumes store your data between container upgrades
       - '~/opengrok/src/:/opengrok/src/'    # source code
       - '~/opengrok/etc/:/opengrok/etc/'    # folder contains configuration.xml
       - '~/opengrok/data/:/opengrok/data/'  # index and other things for source code
```
