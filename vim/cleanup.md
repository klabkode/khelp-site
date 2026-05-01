# Vim Cleanup Commands

Use these tips to maintain clean code and avoid unwanted whitespace issues in version control systems like Git.

| Command       | Description                                |
| ------------- | ------------------------------------------ |
| `%s/\s\+$//g` | Remove trailing whitespace from every line |
| `%s/^\n\+//g` | Remove leading empty lines (limited use)   |
| `:g/^\s*$/d`  | Remove all blank or whitespace-only lines  |

## 1. Remove Trailing Whitespace

 Deletes any spaces or tabs at the end of each line.

 ```vim
 :%s/\s\+$//cg
 ```

## 2. Remove Blank or Whitespace-Only Lines

 Deletes lines that are completely empty or contain only whitespace.

 ```vim
 :g/^\s*$/d
 ```

## 3. Convert Tabs to Spaces

Replaces all tab characters with spaces based on expandtab and tabstop settings.

```vim
:retab
```

Make sure to set:

```vim
:set expandtab tabstop=4 shiftwidth=4
```

## 4. Convert Spaces to Tabs

Use this if your coding standard requires tabs instead of spaces.

```vim
:set noexpandtab
:retab!
```

## 5. Remove Trailing Blank Lines at End of File

Removes unnecessary empty lines at the end of the file.

```vim
:while getline('$') =~ '^\s*$' | exec '$delete' | endwhile
```

## 6. Ensure File Ends with a Single Newline

Ensures that the last line ends cleanly.

```vim
call setline('$', substitute(getline('$'), '\s*$', '', ''))
```

## 7. Remove Duplicate Lines

Sorts all lines and removes duplicates.

```vim
:sort u
```

## 8. Remove Leading Whitespace

Removes unnecessary indentation or accidental spaces at the beginning of lines.

```vim
:%s/^\s\+//g
```

## Create a `:CleanUp` Custom Command

```vim
command! CleanUp execute "%s/\\s\\+$//g" | g/^\\s*$/d | while getline('$') =~ '^\\s*$' | exec '$delete' | endwhile
```

Then use:

```vim
:CleanUp
```

## Recommended Settings for `.vimrc`

```vim
set expandtab
set tabstop=4
set shiftwidth=4
set autoindent
set smartindent
set fileformat=unix
```

## Recursively trim trailing whitespace from all files in current directory

```bash
find . -type f -exec vim -c ':%s/\s\+$//g' -c 'wq' {} \;
```

### Optional Filters

```bash
find . -type f \( -name "*.c" -o -name "*.h" -o -name "*.sh" \) -exec vim -c ':%s/\s\+$//g' -c 'wq' {} \;
```

## Highlight trailing whitespace and consecutive empty lines

```vim
" Highlight groups
highlight ExtraWhitespace ctermbg=red guibg=red
highlight ExtraEmptyLines ctermbg=darkred guibg=darkred

" Initial highlight on file read or creation
autocmd BufReadPost,BufNewFile * call matchadd('ExtraWhitespace', '\s\+$')
autocmd BufReadPost,BufNewFile * call matchadd('ExtraEmptyLines', '^\(\s*$\n\)\{2,}')
```

