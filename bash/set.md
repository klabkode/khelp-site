# Bash set options

```bash
set -n : Read commands but do not execute them
set -e : Exit the script if any command exits with a non-zero status
set -v : Print shell input lines as they are read
set -x : Print each command to the standard error output (stderr) before executing it
set -u : Exit the script if any variables are not initialized
set -E : Causes the ERR trap to be inherited by shell functions

set -o <option> : Set or unset various options. For example refer below:
set -o nounset  : Similar to set -u, this option causes the script to exit if any variables are used before being set
set -o pipefail : Causes a pipeline to produce a non-zero status if any command in the pipeline fails, rather than just the last one. This can be useful for detecting failures in any part of a pipeline
```
