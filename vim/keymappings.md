# VIM Key Mappings

## Method-1

Map `T` to run `:term` command in ESC mode.

```vim
nnoremap T :term<CR>
```

## Method-2

Map `Tree` to run `NERDTree` command.

The first character should be CAPS.

```vim
command! Tree NERDTree
```

## Method-3

Maps `\E` key to run `NERDTreeToggle` command in `ESC` mode.

```vim
nnoremap <silent> <Leader>E :NERDTreeToggle<CR>
```

## Method-4

Mapping one command to another command.

Map `gt` to `q` in `ESC` mode:

```vim
nnoremap q :execute "normal! gt"<CR>
```

## Diff Mode Mappings

```vim
nnoremap ]g :diffget<CR> # ']dg'
nnoremap ]p :diffput<CR> # ']dp'
```

## Quickfix Navigation (Ctags)

```vim
nnoremap ]n :cnext<CR> # Alias ']tn'
nnoremap ]p :cprev<CR> # Alias ']tp'
```

## Custom command to grep in `*.c` and `*.h` using built-in `vimgrep`

```vim
command! -nargs=1 KGrep vimgrep /<args>/j **/*.c **/*.h | copen
```

## Vim Command to Search Multiple File Extensions

```vim
command! -nargs=1 KGrep vimgrep /<args>/j **/*.c **/*.h **/*.cpp **/*.hpp **/*.py **/*.sh | copen
```
