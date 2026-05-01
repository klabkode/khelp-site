# Print Debug On the Go

```c
#define KK_PRINT_DEBUG(...) do { \
    FILE *dbgfp = fopen("/var/log/kk_debug.log", "a+"); \
    if (dbgfp) { \
        fprintf(dbgfp, " %s:%d  %s() :: ", __FILE__, __LINE__, __FUNCTION__); \
        fprintf(dbgfp, __VA_ARGS__); \
        fprintf(dbgfp, "\n"); \
        fclose(dbgfp); \
    } \
} while(0);

#define KK_PRINT_MAC(mac_addr) do { \
    int i = 0; \
    uint8_t *baseMacAddr = NULL; \
    FILE *dbgfp = fopen("/var/log/kk_debug.log", "a+"); \
    baseMacAddr = (uint8_t *)mac_addr; \
    if (dbgfp) { \
        fprintf(dbgfp, " %s:%d  %s() :: MAC = ", __FILE__, __LINE__, __FUNCTION__); \
        for (i = 0; i < ETH_ALEN; i++) { \
            fprintf(dbgfp, ":%02X", *baseMacAddr++); \
        } \
        fprintf(dbgfp, "\n"); \
        fclose(dbgfp); \
    } else {\
        perror("fopen failed"); \
    } \
} while(0);
```
