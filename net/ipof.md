# Template to convert ip address from binary to string format (ipaddr.s_addr)

## Structure format

```c
struct sockaddr_in {
    short            sin_family;   // e.g. AF_INET
    unsigned short   sin_port;     // e.g. htons(3490)
    struct in_addr   sin_addr;     // see struct in_addr, below
    char             sin_zero[8];  // zero this if you want to
};

struct in_addr {
    unsigned long s_addr;  // load with inet_aton()
};
```

## C Code

```c
struct in_addr ipaddr;
uint32_t dec_ip = 16885952;
char ipstr[INET_ADDRSTRLEN] = {0};

ipaddr.s_addr = htonl(dec_ip);

/* Convert binary to string and print the ip address */
inet_ntop(AF_INET, &(ipaddr.s_addr), ipstr, INET_ADDRSTRLEN);
printf("IP Address: %s\n", ipstr);
```

## Bash script

```bash
IP="";
DECIP=16885952;

for ((i = 0; i < 4; ++i))
do
    OCTET=$(((DECIP >> (24 - i * 8)) & 255));
    IP+="$OCTET";

    [ $i -lt 3 ] && IP+=".";
done;

echo "$IP"
```
