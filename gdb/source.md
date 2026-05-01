# Source GDB symbols on startup and inside the GDB prompt

1. Create the `.gdbinit` file and add below lines

    ```bash
    file <executable>
    symbol-file <executable>
    ```

2. Start the GDB. GDB will automatically load the binaries and symbols mentioned in the init file.

3. If the symbols are modified on build process, just run the below command to reload the symbols again.

    ```bash
    source ./.gdbinit
    ```

4. Added below entries in `.gdbinit` for further customization. Added `pull` alias to do easily

    ```bash
   $ cat .gdbinit
   file <executable>
    ```

   **Alias to reload symbols:**

   ```bash
   define pull
      file <executable>
   end
   ```
