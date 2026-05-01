# Fastboot Usage

### List Devices

```bash
fastboot devices
```

### Reboot

```bash
fastboot reboot
fastboot reboot recovery
fastboot reboot bootloader
```

### Temporarily Boot into TWRP

fastboot boot twrp.img

### Unlock Bootloader

```bash
fastboot flashing unlock
fastboot oem unlock
```

### Flash Partitions

```bash
fastboot flash boot     boot.img
fastboot flash system   system.img
fastboot flash recovery recovery.img
fastboot flash vendor   vendor.img
fastboot flash userdata userdata.img
```

### Flash All at Once

```bash
fastboot flashall
fastboot update factory-image.zip
```

### Erase / Format

```bash
fastboot erase userdata
fastboot format system
```

### Get Device Info

```bash
fastboot getvar all
fastboot oem device-info
```
