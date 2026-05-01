# Khelp: Display information about predefined topics

1. List all Khelp tags:

    ```bash
    $ khelp --tags
    Khelp: listing 3 tags ...
      -- apt
      -- bash
      -- docker
    ```

2. List all topics in the specified tag:

    ```bash
    $ khelp --list apt
    Khelp: listing 3 topics in 'apt' tag ...
      -- add-ppa
      -- force-delete
      -- release-info
    ```

3. List all topics in multiple tags

    ```bash
    $ khelp list apt bash
    Khelp: listing 3 topics in 'apt' tag ...
      -- add-ppa
      -- force-delete
      -- release-info
    Khelp: listing 2 topics in 'bash' tag ...
      -- array
      -- fun
    ```
