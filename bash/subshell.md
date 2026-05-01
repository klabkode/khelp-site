# Bash Subshell

A subshell is a child process launched by a shell (or shell script).

## Running process in subshell

```bash
(cd $HTTP_ROOT && /usr/bin/python3 -m http.server --cgi 9002)
```

## Running parallel processes in subshells

```bash
(cat list1 list2 list3 | sort | uniq > list123) &
(cat list4 list5 list6 | sort | uniq > list456) &
```

## Execute commands in a subshell

### 1. `Subshell ( ... )`

- The subshell ( ... ) is used to group and isolate commands.
- This creates a new subshell environment, similar to what bash -c does, but without invoking a new Bash process explicitly.

  **Example:**

  ```bash
  (echo "Hello, World!")
  (cd '$HTTP_ROOT'; python3 -m http.server --cgi 9000 &> /tmp/http_server.log)   # This will return exit_val to the parent shell
  (cd '$HTTP_ROOT'; python3 -m http.server --cgi 9000 &> /tmp/http_server.log &) # This is always return 0   to the parent shell
  ```

### 2. `bash -c`

- Invokes a new instance of the Bash shell explicitly.
- Takes a string as an argument that contains the command to be executed.
- Executes the command in a new shell process.

  **Example:**

  ```bash
  bash -c 'echo "Hello, World!"'
  bash -c "(cd '$HTTP_ROOT'; python3 -m http.server --cgi 9000 &> /tmp/http_server.log)"   # This will return exit_val to the parent shell
  bash -c "(cd '$HTTP_ROOT'; python3 -m http.server --cgi 9000 &> /tmp/http_server.log &)" # This is always return 0   to the parent shell
  ```

### 3. `eval`

- Evaluates and executes the provided arguments as a shell command.
- Takes the arguments directly, without creating a new shell instance.
- Useful for evaluating and executing dynamic commands constructed at runtime.

  **Example:**

  ```bash
  eval 'echo "Hello, World!"'
  ```
