# EFI_Boot_manager

## Change boot order

```bash
efibootmgr -o 0002,0001,0000,0010,0011
```

## List EFI entries

```bash
efibootmgr
```

## Sample output

```bash
$ efibootmgr
BootCurrent: 0001
Timeout: 0 seconds
BootOrder: 0001,0002,0000,0010,0011
Boot0000* Windows Boot Manager
Boot0001* ubuntu
Boot0002* debian
Boot0010  Setup
Boot0011  Boot Menu
```
