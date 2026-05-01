# Ctags in Vim

## Tag Navigation

### Jump to Definition

Press:

```vim
Ctrl-]
```

### Return Back

Press:

```vim
Ctrl-T
```

## List Matching Tags

Type:

```vim
:ts   " (stands for tag-select)
```

Lists all matching tags if multiple definitions exist. Then press the number and hit Enter to jump.

## Tag Stack Navigation

Vim maintains a tag stack for navigation:

```vim
:tags        " shows the tag stack
:pop or Ctrl-T   " go back
:tag or Ctrl-]   " go forward
:pop 2      " Go back 2 tags
:tag 3      " Go forward to the 3rd tag in the stack
```

## Manually Search Tags

Type:

```vim
:tag TAGNAME
```

## Autocompletion with Tags

In insert mode, press:

```vim
<C-x><C-]>   " Ctrl-X Ctrl-]
```

## Use :tselect to pick from multiple matches

Type:

```vim
:tselect TAGNAME
```

Shows a list of locations (like function overloads). Pick the one you want.

## Use :tjump to jump to a specific match

Like :tselect, but jumps to first if only one match. Type:

```vim
:tjump TAGNAME
```

## Browse All Tags

You can open the tags file or use:
To open the tag in a split window, type:

```vim
:stag some_tag
```

## Auto-Generate Ctags on Save

Keeps tags up to date automatically.

Add to .vimrc (optional):

```vim
autocmd BufWritePost *.c,*.h silent! !ctags -R .
```

## Search manually for usages

- Press / (search)
  - n — next occurrence
  - N — previous occurrence

## Using VimGrep

### Use vimgrep to get all global references

This gives you a list of all matches in your project:

```vim
:vimgrep /TAGNAME/ **/*.c **/*.h
:copen # To open the quickfix window
:cnext / :cprev to jump through results
:cclose to close it
```

### Use vimgrep to get all local references

This gives you a list of all matches in your project:

```vim
:lvimgrep /TAGNAME/ **/*.c **/*.h
:copen
:lnext  — go to next match in location list
:lprev  — go to previous match
:lclose — close it
```

## Explore with Tagbar Plugin

## Summary

| Feature       | Quickfix List (:c*)     | Location List (:l*) |
|---------------|-------------------------|--------------------|
| Scope         | Global (all windows)    | Local (current window only) |
| Command       | `:cnext`, `:cprev`, etc | `:lnext`, `:lprev`, etc |
| Open list     | `:copen`                | `:lopen` |
| Populate with | `:vimgrep`, `:grep`     | `:lvimgrep`, `:lgrep` |
