# UFW: Uncomplicated Firewall Usage

## Installation

```bash
apt install ufw
```

## Enable UFW

```bash
ufw enable
```

## Check status

```bash
ufw status
```

## Default policies

```bash
ufw default deny incoming
ufw default allow outgoing
```

## Open Internal Port

```bash
ufw allow <port-no>/<protocol-name>
```

**Example:**

```bash
ufw allow 22   # SSH
ufw allow 80   # HTTP
ufw allow 443  # HTTPS
```

## Allow specific ports

```bash
ufw allow 8080/udp
ufw allow 8080/udp
```

## Allow access with protocol names

```bash
ufw allow http
ufw allow https
ufw allow OpenSSH
```

## Other Tools

- firewald
- iptables

## Usage Cases

### Allow specific IP range

If you want to be more specific about the source IP range for the external rule,
you can add the source IP address or subnet.

**For example:**

```bash
ufw allow from <external-ip> to any port 80
```

### Open Port 8080 Both Internally and Externally

```bash
ufw allow 8080
```

This command allows incoming traffic on port 8080 from both internal (local network) and external sources.
It opens the port for all incoming connections.

### Open Port 8081 Internally and Block Externally

```bash
ufw allow 8081  # Allow internal traffic on port 8081
ufw deny  8081  # Block external traffic on port 8081
```

- The first command allows incoming traffic on port 8081 for devices within the local network.
- The second command explicitly denies incoming traffic on port 8081 from external sources.
  This overrides the previous rule for external traffic on this port.

### Open Port 8082 Externally and Block Internally

```bash
ufw allow 8082 # Allow external traffic on port 8082
ufw deny from any to any port 8082
```

- The first command allows incoming traffic on port 8082 from external sources.
- The second command explicitly denies incoming traffic on port 8082 from any internal source.
- If you need to allow UDP traffic, you can specify the protocol explicitly
  **Ex:** `ufw allow 8080/udp`
