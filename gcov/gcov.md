# gcov: Generate GCC code coverage reports

## Flow

```bash
cc --> run-exe --> gcov --> lcov --> genhtml
```

Use `GCOVR` for user friendly

## Procedure

### 1. Compile the source code with GCC flags mentioned below to generate the `.gcno` file

The `.gcno` record file is generated after adding the GCC compile option `-ftest-coverage`, which contains information for reconstructing the base block map and assigning source line numbers to blocks during the compilation process.

```bash
CFLAGS: --coverage [or] -fprofile-arcs -ftest-coverage
```

**Example:**

```bash
gcc hello.c -o hello --coverage

[or]

gcc hello.c -o hello -fprofile-arcs -ftest-coverage
```

### 2. Run the user program `./hello` to generate coverage data counts

This will generate the `.gcda` data file.

### 3. Run `gcov` tool `gcov hello.c` to convert this `.gcda` data into human readable file

This will generate the `.gcov` text file

Provide the `-b` option to `gcov` so that it will also report on the number of times various branches are taken.

The `.gcov` file contain the `:` separated fields along with program source code in the format of `<execution_count>:<line_number>:<source line text>`.

1. A count of the number of times the given line was executed

   - `-` indicates a line with no executable code (e.g. a declaration)

   - `#####` for lines which were never executed

2. The line number

3. The source code

### 4. Generating HTML reports

1. Generate the `coverage.info` data file

   ```bash
   lcov --capture --directory . --output-file coverage.info
   ```

2. Generate a report from this data file

   ```bash
   genhtml coverage.info --output-directory __html
   ```

## Reference

<http://twoerner.github.io/gcov2html-check/gcov.html>

<https://shenxianpeng.github.io/2021/07/gcov-example>

<https://gcc.gnu.org/onlinedocs/gcc/Gcov.html>
