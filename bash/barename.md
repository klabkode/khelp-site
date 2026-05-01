# Get Barename from Basename of a file

```bash
BASENAME="$(basename name.txt)"
EXTENSION="${BASENAME##*.}"
BARENAME="${BASENAME%.*}"

echo $BASENAME $BARENAME $EXTENSION
```
