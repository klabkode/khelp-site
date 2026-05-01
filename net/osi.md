# OSI Layer Breakdown

## OSI Model

| Layer | Name            | Common Protocols                                                                 | Network Devices                                                                    | Function                                                      |
|-------|-----------------|----------------------------------------------------------------------------------|------------------------------------------------------------------------------------|---------------------------------------------------------------|
| 7     | Application     | HTTP, HTTPS, FTP, SSH, DNS, DHCP, SNMP, Telnet, NFS, SMTP, POP3, IMAP            | Application Servers, Proxies, Gateways                                             | User interface, network services to applications              |
| 6     | Presentation    | TLS/SSL, MIME, JPEG, MPEG, ASCII, EBCDIC, HTML, XML                              | (Handled in software - no physical devices)                                        | Data translation, encryption/decryption, compression          |
| 5     | Session         | NetBIOS, RPC, PPTP, SMB, SAP                                                     | (Handled in software - no physical devices)                                        | Session management, connection establishment and teardown     |
| 4     | Transport       | TCP, UDP, SCTP, DCCP                                                             | Load Balancers, WAN Optimizers                                                     | Reliable/Unreliable delivery, segmentation, flow/error control|
| 3     | Network         | IP (IPv4/IPv6), ICMP, IPsec, IGMP, RIP, OSPF, BGP, EIGRP                         | Routers, Layer 3 Switches, Firewalls                                               | Routing, logical addressing, packet forwarding                |
| 2     | Data Link       | Ethernet (IEEE 802.3), PPP, ARP, HDLC, STP, VLAN, LACP                           | Switches, Bridges, NICs, Wireless Access Points (WAPs)                             | MAC addressing, error detection, frame sequencing             |
| 1     | Physical        | Ethernet (PHY), DSL, ISDN, RS-232, V.35, Fiber, Wi-Fi (PHY), Bluetooth (PHY), USB| Hubs, Cables, Repeaters, Patch Panels, Connectors, Transceivers                    | Bit transmission, signal transmission over physical medium    |

## TCP Model

| **TCP/IP Model** | **OSI Model** | **Data Unit**     | **Devices**                 | **Protocols**                                           | **Operations**                                            |
|------------------|---------------|-------------------|-----------------------------|---------------------------------------------------------|-----------------------------------------------------------|
| Application      | Application   |        Data       | Softwares                   | SMTP, HTTP, FTP, POP3, SNMP, Telnet                     | Software Applications                                     |
|     "            | Presentation  |         "         |  "                          | SSL, TLS                                                | Translate, encrypt and compress dat                       |
|     "            | Session       |         "         | Gateway                     | Sockets(TCP, RTP)                                       | Establish, manage, and terminate the session              |
| Transport        | Transport     | Segment, Datagram | Firewall                    | TCP, UDP                                                |                                                           |
| Network          | Network       |       Packet      | Router                      | IPV4, IPV6, ICMP, IPSEC, ARP, MPLS                      | Move packets from source to destination                   |
| Datalink         | Datalink      |       Frame       | Switch, Bridge              | PPP, Frame Relay, ATM, IEEE 802.3, NDP, LLDP, STP, VLAN | Organize bits into frames. To provide hop-to-hop delivery |
| Physical         | Physical      |        Bit        | Hub, Repeater, Modem, Cable | RS232, 100BaseTX, ISDN, RJ45, Token Rings               | Transmit bits over a medium                               |

## Security Notes

- **Layer 3 and 4** are critical for **routing and traffic control**
- **Layer 7** devices are essential in **application-aware firewalls (WAF)** and **deep packet inspection (DPI)**
- **Layer 2** is often **where vulnerabilities like MAC spoofing and VLAN hopping** can occur — use **Port Security, 802.1X, and STP** wisely.

