# Khelp: Display information about predefined topics

1. Display info about `array` in `bash` tag

    ```bash
    $ khelp bash array
    bash-array: Array in bash script

    SYNTAX:
        ARR=( "element-1" "element-2" "element-3" )

    USAGE:
        for VAR in ${ARR[@]}; do
            echo "Array element: '$VAR'"
        done
    ```

2. Display multiple help contents of `bash` tag

    ```bash
    $ khelp bash array fun
    bash-array: Array in bash script

    SYNTAX:
        ARR=( "element-1" "element-2" "element-3" )

    USAGE:
        for VAR in ${ARR[@]}; do
            echo "Array element: '$VAR'"
        done

    fun: function in bash script

    USAGE:
        function()
        {
            # Parameter validation
            if [ $# -lt 1 ]; then
                echo "${FUNCNAME[0]}: invalid arguments !!!"
                echo "Usage: ${FUNCNAME[0]} [FILE]..."
                echo "       Write description here."
                return 1
            fi


            #
            # Functionality
            #
        }
    ```
