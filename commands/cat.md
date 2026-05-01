# Concatenate log text with `cat`

1. Print to stdout

    ```bash
    cat <<-USAGE
    #!/bin/bash
    echo "Hello world!"
    exit 0
    USAGE
    ```

2. Print to file

    ```bash
    cat <<-USAGE > hello.sh
    #!/bin/bash
    echo "Hello world!"
    exit 0
    USAGE
    ```
