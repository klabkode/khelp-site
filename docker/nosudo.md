# nosudo: Manage Docker as a non-root user

Add user to `docker` group to access docker without sudo prefix.

1. Create the docker group (On some Linux distributions, the system automatically creates this group on dcoker install)

    ```bash
    sudo groupadd docker
    ```

2. Add your user to the docker group

    ```bash
    sudo usermod -aG docker $USER
    ```

3. Log out and log back in so that your group membership is re-evaluated.

    If you’re running Linux in a virtual machine, it may be necessary to restart the virtual machine for changes to take effect.

    Run the following command to activate the changes to groups:

    ```bash
    newgrp docker
    ```

4. Verify that you can run docker commands without sudo

    ```bash
    docker run hello-world
    ```

## Reference

<https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user>
