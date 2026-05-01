# Vim functions

## Debug message

```vim
echo "The value of myvar is: " . myvar
echom "The value of myvar is: " . myvar
```

## Time format

```vim
strftime("%Y-%m-%d %H:%M:%S")
```

## Assign variable

```vim
let l:backup_root = $HOME . '/.vim/backup' (or)
let l:backup_root = expand("~/.vim/backup")
```

## Check directory

```vim
if !isdirectory('.git')
  silent! !git init > /dev/null
endif
```

## Run system command

```vim
execute 'silent! !mkdir -p ' . backup_path
```

## Call the GitBackup function on save

```vim
autocmd BufWritePost * call GitBackup()
```
