# Scan available hosts in the network

## Use `nmap` to scan the network for connected hosts

```bash
nmap -sn 192.168.1.1-254
```

## Identify Open Ports

```bash
nmap 192.168.1.10

(or)

nmap -p- 192.168.1.10
```

## Deep Scan

```bash
nmap -vvv -p- -A localhost
```
