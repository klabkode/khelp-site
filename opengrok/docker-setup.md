# Opengrok Docker Setup

1. Pull base OpenGrok image

   ```bash
   docker pull opengrok/docker
   ```

2. Run and login to the OpenGrok console

   ```bash
   docker run -d --name opengrok-setup opengrok/docker:latest
   docker exec -it opengrok-setup bash
   ```

3. Now we can do our own customizations

   Add the indexer command as shown below.

   ```bash
   echo "/usr/local/bin/opengrok-indexer -a /opengrok/lib/opengrok.jar -- -s /opengrok/src -d /opengrok/data -c /usr/local/bin/ctags -W /opengrok/etc/configuration.xml -H -P -S -G -U http://localhost:8080" > /scripts/indexit.sh && chmod +x /scripts/indexit.sh
   ```

4. Clear bash histories and exit from the console

   ```bash
   > ~/.bash_history
   history -c
   ```

5. Commit the updated container to new image

   ```bash
   docker commit opengrok-setup remoteuser/opengrok
   ```

6. Run the new OpenGrok image

   ```bash
   docker run -d --name opengrok-setup -p 9090:8080/tcp -v /tmp/opengrok/src:/opengrok/src/ remoteuser/opengrok
   ```

7. Run the Indexer

   ```bash
   docker exec -it opengrok bash -v /scripts/indexit.sh
   ```

8. Explore the projects at <http://localhost:9090/source>

## Push the image to Docker Hub

1. Push the image to resgistry

   ```bash
   sudo docker push remoteuser/opengrok:amd64
   ```

2. Create manifest

   ```bash
   sudo docker manifest create remoteuser/opengrok:latest remoteuser/opengrok:amd64 #remoteuser/opengrok:arm64
   ```

3. Push the manifest to resgistry

   ```bash
   sudo docker manifest push remoteuser/opengrok:latest
   ```
