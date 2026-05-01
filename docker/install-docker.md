# Install Docker

## Macbook

1. `brew install --cask docker virtualbox`

2. `brew install docker-machine`

3. `docker-machine create --driver virtualbox default`

4. `docker-machine restart`

5. `eval "$(docker-machine env default)"` # This might throw an TSI connection error. In that case run docker-machine regenerate-certs default

6. `docker-machine restart` # maybe needed

7. `docker run hello-world`

## Weblinks

<https://apple.stackexchange.com/questions/373888/how-do-i-start-the-docker-daemon-on-macos>
