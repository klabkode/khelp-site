# Line Feed

What is LF?

**LF (Line Feed)** is the Unix/Linux line-ending character.

- Name: Line Feed
- ASCII: `0x0A`
- Escape sequence: `\n`

Linux and Unix systems use **LF** to indicate the end of a line.

## Line Endings by Operating System

| OS / Environment  | Line Ending | Characters | Meaning                     |
| ----------------- | ----------- | ---------- | --------------------------- |
| Linux / Unix      | LF          | `\n`       | Line Feed only              |
| Windows           | CRLF        | `\r\n`     | Carriage Return + Line Feed |
| Old macOS (pre-X) | CR          | `\r`       | Carriage Return             |

Why this matters:

- Linux tools treat `\r` as a **real character**
- CRLF causes `^M` issues in scripts and patches

### Why LF matters (especially for Linux / C / embedded devs)

Linux tools (gcc, make, bash, sh) expect LF

CRLF can cause:

- ^M errors in shell scripts
- bad interpreter: /bin/sh^M
- Patch failures
- Noisy Git diffs

### Visual example

Example of a broken script on Linux:

```bash
#!/bin/sh^M
```

File with LF:

```c
int main() {
    return 0;
}
```

File with CRLF (Windows):

```c
int main() {\r\n
    return 0;\r\n
}\r\n
```

Linux sees \r as a real character, not whitespace.

### Simple analogy

- CR → “Move cursor to start of line”
- LF → “Go down to next line”

Linux says:

Just go to next line (LF). No need to reset the carriage.

## Detecting LF vs CRLF

### Vim

#### Check file format

```vim
:set ff?
```

- `unix` → LF
- `dos` → CRLF

#### Show CR characters

```vim
:set list
```

Look for `^M` at line endings.

#### Force LF and save

```vim
:set ff=unix
:w
```

#### Statusline indicator

Add to `.vimrc`:

```vim
set statusline+=\ [%{&ff}]
```

### Cat file

```bash
$ printf "line one\r\nline two\r\nline three\r\n" > crlf_test.txt # Create file with \r

$ cat -v crlf_test.txt
line one^M
line two^M
line three^M
```

### VS Code

#### Status bar

Bottom-right corner shows:

- `LF`
- `CRLF`

Click to change instantly.

#### Command Palette

```bash
Ctrl + Shift + P
Change End of Line Sequence
```

#### Enforce LF globally

```json
settings.json:
{
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true
}
```

#### Render CR visually

```json
{
  "editor.renderControlCharacters": true
}
```

## Converting CRLF → LF (Safely)

### `dos2unix` (Recommended)

```bash
dos2unix filename
```

Recursive:

```bash
find . -type f -name "*.sh" -exec dos2unix {} +
```

### `sed` (Portable)

```bash
sed -i 's/\r$//' filename
```

Recursive:

```bash
find . -type f -exec sed -i 's/\r$//' {} +
```

### Vim (Precise & Safe)

```bash
vim +'set ff=unix' +wq filename
```

### Git-Aware Normalization (Best for repos)

```bash
git add --renormalize .
git commit -m "Normalize line endings to LF"
```

## Git Configuration for LF Only (Windows/Linux)

```bash
git config --global core.autocrlf false  # Force Git to use LF only and never auto-convert (Safest when you work across Linux / embedded / CI systems)
git config --global core.eol lf          # Explicitly tell Git your preferred EOL is LF (Files added to Git are stored with LF)
git config --global core.safecrlf true   # Reject CRLF in commits (Prevents accidental commits with mixed or wrong EOLs)
```

Expected Global Config:

```text
git config --global --list

core.autocrlf=false
core.eol=lf
core.safecrlf=true
```

## Enforcing LF via `.gitattributes`

Create .gitattributes:

```gitattributes
* text eol=lf
```

For scripts (extra strict):

```gitattributes
*.sh  text eol=lf
*.c   text eol=lf
*.h   text eol=lf
*.py  text eol=lf
```

If Repo Already Has CRLF Files

After fixing config, normalize once:

```bash
git add --renormalize .
git commit -m "Normalize line endings to LF"
```

## What NOT to Do

- ❌ Convert binaries
- ❌ Use `sed 's/\r//g'`
- ❌ Mix EOL styles in same repo

## Best Practices (Senior Developer Rule)

- Always use **LF** for Linux, C, embedded, CI
- Enforce at **Git + Editor + Repo** levels
- Normalize once, then lock it down

## Quick Reference

| Tool    | Detect           | Convert         |
| ------- | ---------------- | --------------- |
| Vim     | `:set ff?`       | `:set ff=unix`  |
| VS Code | Status bar       | Change EOL      |
| Shell   | `cat -v`         | `dos2unix`      |
| Git     | `.gitattributes` | `--renormalize` |

---

