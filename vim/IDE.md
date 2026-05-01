# Setup IDE in Vim editor

## Prerequisites

Create required directories to put the Vim plugins and they'll automatically load when you launch Vim.

```bash
mkdir -p ~/.vim/pack/vendor/start
```

## Install NERDTree

1. Git to clone the NERDTree repository

   ```bash
   git clone --depth 1 https://github.com/preservim/nerdtree.git ~/.vim/pack/vendor/start/nerdtree
   ```

2. Launch Vim and type `:NERDTree` to open Tree view

3. Update the window width in `NERD_tree.vim` file

   ```vim
   let g:NERDTreeWinSize = get(g:, 'NERDTreeWinSize', 20)
   ```

4. Added below snippets in `~/.vimrc`

   ```vim
   "-------------------------
   " NERDTree configs
   "-------------------------

   " Open or Close NERDTree with 'E' key
   nnoremap E :NERDTreeToggle<CR>

   " Navigate NERDTree tabs
   nnoremap q :execute "normal! gt"<CR>
   nnoremap Q :execute "normal! gT"<CR>

   let NERDTreeShowHidden = 1
   "let NERDTreeShowBookmarks = 1

   " Start NERDTree when Vim is started without file arguments.
   autocmd StdinReadPre * let s:std_in=1
   autocmd VimEnter * if argc() == 0 && !exists('s:std_in') | set mouse=a | NERDTree | wincmd p | Tagbar | endif
   ```

## Install Tagbar

1. Git to clone the Tagbar repository

   ```bash
   git clone --depth 1 https://github.com/preservim/tagbar.git ~/.vim/pack/vendor/start/tagbar
   ```

2. Launch Vim and type `:Tagbar` to open Tagbar

3. Updated the window width in `tagbar.vim` file

   ```vim
   > ['width', 20]
   ```

## Weblinks

<https://opensource.com/article/20/2/how-install-vim-plugins>
