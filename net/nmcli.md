# NMcli Usage

## List available Wi-Fi networks

```bash
nmcli device wifi list
```

## Connect to a Wi-Fi network

```bash
nmcli device wifi connect <wifi-ssid> password <wifi-password>
```

## Wifi network status

```bash
nmcli connection show
```

## Wi-Fi Adapter Status

```bash
nmcli device
```

## Reconfigure Wi-Fi Connection

```bash
nmcli connection delete <wifi-ssid>
```
