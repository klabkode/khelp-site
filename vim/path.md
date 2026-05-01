# Vim Runtime Path

Open Vim and type:

```vim
:echo &runtimepath
```

This will show a list of directories where Vim looks for plugins.

```bash
# ~/.vim
    ├── colors
    ├── pack
    │   └── vendor
    │       └── start
    │           ├── nerdtree
    │           └── tagbar
    └── timeline
```

```bash
# /etc/vim/
    ├── vimrc
    └── vimrc.tiny
```

```bash
# /usr/share/vim/
    ├── addons
    │   ├── ftdetect
    │   ├── ftplugin
    │   ├── indent
    │   ├── plugin
    │   └── syntax
    ├── registry
    └── vim81
        ├── autoload
        │   ├── dist
        │   └── xml
        ├── colors
        │   └── tools
        ├── compiler
        ├── doc
        ├── ftplugin
        ├── indent
        ├── keymap
        ├── lang
        │   └── zh_TW.UTF-8
        │       └── LC_MESSAGES
        ├── macros
        │   ├── hanoi
        │   ├── life
        │   ├── maze
        │   └── urm
        ├── pack
        │   └── dist
        │       └── opt
        │           ├── cfilter
        │           │   └── plugin
        │           ├── dvorak
        │           │   ├── dvorak
        │           │   └── plugin
        │           ├── editexisting
        │           │   └── plugin
        │           ├── justify
        │           │   └── plugin
        │           ├── matchit
        │           │   ├── autoload
        │           │   ├── doc
        │           │   └── plugin
        │           ├── shellmenu
        │           │   └── plugin
        │           ├── swapmouse
        │           │   └── plugin
        │           └── termdebug
        │               └── plugin
        ├── plugin
        ├── print
        ├── spell
        ├── syntax
        └── tutor
```
