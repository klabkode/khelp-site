# Comments in Bash

```bash
#!/bin/bash

: <<'COMMENT'
This is a multi-line comment.
You can write as many lines as you want here.
This comment block will be ignored by the interpreter.
COMMENT

echo "This is not a comment."
```

## Explanation

- Use `#` for single-line comments.
- The `: <<'COMMENT' ... COMMENT` syntax creates a multi-line comment block (using a here-document ignored by the shell).
