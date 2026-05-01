# Macros Logger

```c
/* print debug with macros */
#define print_debug(fmt, args...) (fprintf(stderr, fmt, ##args))

/* print_debug with file, line and caller with alignments */
#define print_debug(fmt, args...) (fprintf(stderr, "%17s:%-4d %17s: " fmt "\n", __FILE__, __LINE__, __func__, ##args))

/* print_debug with pid, file, line and caller without alignments */
#define print_debug(fmt, args...) (fprintf(stderr, "%d %s:%d %s(): " fmt "\n", getpid(), __FILE__, __LINE__, __func__, ##args))

/* Other useful patterns */
#define print_debug(fmt, args...) (fprintf(stderr, "\rKKDEBUG: %s:%d %s(): " fmt "\n", __FILE__, __LINE__, __func__, ##args))
#define print_debug(fmt, args...) (fprintf(stderr, "\rKKDEBUG: %d %s:%d %s(): " fmt "\n", getpid(), __FILE__, __LINE__, __func__, ##args))

/* ISO C standard variadic macro */
#define print_debug(fmt, ...) (fprintf(stderr, "\rKKDEBUG: %d %s:%d %s(): " fmt "\n", getpid(), __FILE__, __LINE__, __func__, __VA_ARGS__))
```

## Macro to adjust arguments

```c
#define print_debug_wrapper(MOD, ...) print_debug(__VA_ARGS__)

/* Example usage: */
print_debug_wrapper("DEBUG", "This is a debug message: %d", 42);
```
