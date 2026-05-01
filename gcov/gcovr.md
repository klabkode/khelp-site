# gcovr: Generate GCC code coverage reports

## Flow

```bash
cc --> run-exe --> gcovr
```

## Procedure

1. Compile the source code with GCC flags mentioned below to generate the '.gcno' file.

    The '.gcno' record file is generated after adding the GCC compile option '-ftest-coverage', which contains information for reconstructing the base block map and assigning source line numbers to blocks during the compilation process.

    ```bash
    CFLAGS: --coverage [or] -fprofile-arcs -ftest-coverage
    ```

    **Example:**

    ```bash
    gcc hello.c -o hello --coverage                [or]
    gcc hello.c -o hello -fprofile-arcs -ftest-coverage
    ```

2. Run the user program './hello' to generate coverage data counts.

    This will generate the '.gcda' data file.

3. Run 'gcovr' to print a tabular report on the console.

4. You can also generate detailed HTML reports

    ```bash
    gcovr --html-details coverage.html
    ```

## Reference

<https://gcovr.com/en/5.1/guide/compiling.html>
