# Logit Callback Model

### Caller

```c
retval = init_logit(logfile, "w", LOGIT_DEBUG, LOGIT_SET_COMP, LOGIT_SET_CONSOLE, logit_cb);
```

### Callback

```c
int logit_cb(void)
{
  logit_printf("user callback called !!!");
  return 0;
}
```

### Prototype

```c
int init_logit(const char *logfile, const char *mode, const int level, int flags, const int console, int (*attr)(void));
```

### Definition

```c
int init_logit(const char *logfile, const char *mode, const int level, int flags, const int console, int (*attr)(void))
{
  if (attr != NULL) {
    /* Calling callback */
    retval = attr();
  }

  return retval;
}
```
