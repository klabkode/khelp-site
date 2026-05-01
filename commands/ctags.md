# CTags

## Ctags Usage

### `ctags -R *`

This command will generate tags for all files and directories in the current directory,
but it will not include hidden files or directories (those starting with a dot `.`).

The `*` wildcard matches everything except hidden files and directories.

```bash
set tags=tags # VIM config
ctags -RV *
```

### `ctags -R .`

This command explicitly tells `ctags` to generate tags for all files and directories in the current directory,
including hidden files and directories indicated by dot `.`.

### Generate tag files at specified path

```bash
ctags -f ~/tags/tags -R *
```

### Ignoring build time files

```bash
ctags -R --exclude=.git --exclude="*.o" --exclude="*.d" --exclude="*.so" *
```

## CScope Usage

```bash
cscope -Rbv
cscope -d
```

## HTAG server

```bash
htags-server --retry 3 -b localhost 8888
```
