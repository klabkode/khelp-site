# Vim Autocomplete Commands

```bash
- Whole lines                                    |i CTRL-X CTRL-L|
- Keywords in the current file                   |i CTRL-X CTRL-N|
- Keywords in 'dictionary'                       |i CTRL-X CTRL-K|
- Keywords in 'thesaurus', thesaurus-style       |i CTRL-X CTRL-T|
- Keywords in the current and included files     |i CTRL-X CTRL-I|
- Tags                                           |i CTRL-X CTRL-]|
- File names                                     |i CTRL-X CTRL-F|
- Definitions or macros                          |i CTRL-X CTRL-D|
- Vim command-line                               |i CTRL-X CTRL-V|
- User defined completion                        |i CTRL-X CTRL-U|
- Omni completion                                |i CTRL-X CTRL-O|
- Spelling suggestions                           |i CTRL-X s     |
- Keywords in 'complete'                         |i CTRL-N       |
```

This configs rely on

```vim
filetype plugin on
set omnifunc=ccomplete#Complete
```
