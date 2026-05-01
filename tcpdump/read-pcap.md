# Read PCAP Binary File

```bash
tcpdump -r capture.pcap -n -tttt > capture.txt
```

## Breakouts

```bash
- `-r capture.pcap` : Specifies the input pcap file.
-              `-n` : Don't resolve hostnames.
-           `-tttt` : Print the timestamp of each packet in a human-readable format.
-   `> capture.txt` : Redirects the output to a text file named "capture.txt".
```
