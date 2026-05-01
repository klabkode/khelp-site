# TCP Dump Filters

## Protocol filter

```bash
tcpdump -c 5 icmp
```

## Host filter

```bash
tcpdump -c 5 host 192.168.2.1
tcpdump -c 5 host 192.168.2.1 -i eth0
```

## Port filter

```bash
tcpdump -c 5 port 80
tcpdump -c 5 port 8000 -i any
```

## Advanced filter (host + port 443)

```bash
tcpdump -c 5 host 192.168.2.1 and port 443
```
