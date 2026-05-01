# Vim configurations

## Set automatic indentation

```vim
set autoindent
```

## Use spaces for indenting

- The `expandtab` option used for indenting lines, even when you press the 'Tab' key
- The `tabstop` takes a numerical value. Let's say I typed set tabstop=2, this will insert 2 spaces for a line indent
- The `shiftwidth` manages the indentation when you use the `'>>'` or `'<<'` operators to add or remove indentation to an already existing line/block of code

```vim
set expandtab
set tabstop=<NUM OF SPACES>
set shiftwidth=<NUM OF SPACES>
```

## Use tabs for indentation

The `noexpandtab` option prevents the conversion of tabs to spaces.

```vim
set noexpandtab
set tabstop=4
set shiftwidth=4
```

## Call function on startup

  autocmd VimEnter * call VimFunction()

## Type ':RC' to opn '.vimrc' file

  command RC edit ~/.vimrc

## Map Ctrl-X Keypress

```vim
nnoremap <C-Left>  <C-w>2><CR>
nnoremap <C-Right> <C-w>2<><CR>
```

## Tab navigation

```vim
nnoremap <silent>    q  :tabnext<CR>
nnoremap <silent> <S-q> :tabprevious<CR>
```
