# Vim File Format

## Show special characters like `^M`, Tabs, Trailing spaces, etc.

```vim
set list
set listchars=tab:>-,trail:·,eol:$,extends:>,precedes:<
```

## Check the file format `(dos = CRLF, shows ^M)`

```vim
:set fileformat?
```

## Convert DOS (CRLF) to Unix (LF) and remove `^M`

```vim
:set fileformat=unix
```

