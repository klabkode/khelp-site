# MMV Command Usage

## Rename Files with Extensions `.ab` and `.abc` to `.zip`

```bash
mmv "*.ab" "#1.zip"
mmv "*.abc" "#1.zip"
```

## Preview Changes to Ensure No File Overwrites (`-n` flag)

```bash
mmv -n "*.ab" "#1.zip"
mmv -n "*.abc" "#1.zip"
```

## Rename All Files with Any Extension to `.zip`

```bash
mmv '*.*' '#1.zip'
```
