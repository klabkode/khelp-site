# Structure packing with GCC attributes

```c
typedef struct keyval_st {
    char key[256];
    char value[256];
} __attribute__((packed)) keyval_t, *keyval_p;
```
