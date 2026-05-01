# TCP Dump Options

```bash
Option Description
-i -- Listen on the specified interface.
-n -- Don’t resolve hostnames. You can use -nn to don’t resolve hostnames or port names.
-t -- Print human-readable timestamp on each dump line, -tttt: Give maximally human-readable timestamp output.
-X -- Show the packet’s contents in both hex and ascii.
-v, -vv, -vvv enables verbose logging/details (which among other things will give us a running total on how many packets are captured
-c N Only get N number of packets and then stop.
-s Define the snaplength (size) of the capture in bytes. Use -s0 to get everything, unless you are intentionally capturing less.
-S Print absolute sequence numbers.
-q Show less protocol information.
-w Write the raw packets to file
-C file_size(M) tells tcpdump to store up to x MB of packet data per file.
-G rotate_seconds

-c: Exit after receiving count packets
-i: All interfaces
-n: Don't resolve hostnames
-r: Read from a file instead of from the network
-w: Write the captured packets to a file
-s: Capture the specified number of bytes from each packet
```
