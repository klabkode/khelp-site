# Removing broken packages in Ubuntu

1. Find your package in `/var/lib/dpkg/info`, for example using:

    ```bash
    ls -l /var/lib/dpkg/info | grep <package>
    ```

2. Move your broken packages to `/tmp` directory

    ```bash
    sudo mv /var/lib/dpkg/info/<package>.* /tmp/
    ```

3. Run the following command:

    ```bash
    sudo dpkg --remove --force-remove-reinstreq <package>
    ```

## Weblinks

<https://stackoverflow.com/questions/48431372/removing-broken-packages-in-ubuntu>
