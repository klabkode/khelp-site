# C Macro Usages

Preprocessor directive to include a meaningful error message that will stop the build when STANDALONE is defined.

```c
#if defined(FALG_A)
#error "FALG_A is defined. Build stopped."
#endif
```
