# Handling Windows-style Carriage Returns (`^M`) in Unix/Linux

Windows uses **CRLF (`\r\n`)** for newlines, while Unix/Linux uses **LF (`\n`)**.

This mismatch causes `^M` characters to appear in files when opened or processed in Unix tools like `vim`, `cat`, `grep`, etc.

## What is `^M`?

`^M` represents the carriage return character (`\r`, ASCII 13). It appears when:

- A file was created/edited in Windows (e.g., Notepad, VSCode with CRLF)
- You open it in Unix/Linux terminal tools or editors

## How to Detect `^M` Lines

```bash
cat -v filename     # Shows ^M as literal
grep -P '\r' file   # Detects \r characters
```

## How to Fix It

### 1. Using `dos2unix` (Recommended)

```bash
dos2unix filename
```

Install with:

```bash
sudo apt install dos2unix
```

### 2. Using `vim`

```bash
vim filename
:set fileformat=unix
:wq
```

### 3. Using `sed` (inline fix)

```bash
sed -i 's/\r$//' filename
```

### 4. Using `tr`

```bash
tr -d '\r' < input.txt > output.txt
```

---

## Convert All Files Recursively

```bash
find . -type f -exec dos2unix {} +
```

## Git Settings to Avoid CRLF Issues

### Convert to LF on commit

```bash
git config --global core.autocrlf input
```

### Force LF in repo with `.gitattributes`

```text
*.sh text eol=lf
*.py text eol=lf
```

## Editor Config (VSCode)

- Set bottom-right to **LF**
- Or add to `settings.json`:

```json
"files.eol": "\n"
```

## Summary

| OS      | Line Ending | Characters |
|---------|-------------|------------|
| Windows | CRLF        | `\r\n`     |
| Unix    | LF          | `\n`       |

**Always prefer `LF` for scripts and code in Unix/Linux.**
