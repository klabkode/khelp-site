# Setting flags using bitwise in C

## Initialise the Mask value

```c
int mask = 0;
```

## Define Flags

```c
#define FLAG_TYPE_1   (1 << 1)
#define FLAG_TYPE_2   (1 << 2)
#define FLAG_TYPE_3   (1 << 3)
```

## Set Flags with bitwise operation

```c
mask |= FLAG_TYPE_1;
mask |= FLAG_TYPE_2;
mask |= FLAG_TYPE_3;
```

## Another way: Setting flags on function calls

```c
func(FLAG_TYPE_1|FLAG_TYPE_2|FLAG_TYPE_3, ...);

In definition: set all flags in one shot:
mask |= user_flags
```

## Doing the tasks based on the Flags

```c
if (mask & FLAG_TYPE_1)
    /* Task 1 */
else if (mask & FLAG_TYPE_2)
    /* Task 2 */
else if (mask & FLAG_TYPE_3)
    /* Task 3 */
```

## Macros to Set or Check flags

```c
#define SET_FLAG(mask, flag)    (mask | flag)
#define IS_FLAG_SET(mask, flag) (mask & flag)
```

## Print Flags

```c
printf("Flags: PID PPID DATE\n");
printf("-------%d---%d---%d-\n", IS_FLAG_SET(mask, FLAG_TYPE_1),
                                 IS_FLAG_SET(mask, FLAG_TYPE_2),
                                 IS_FLAG_SET(mask, FLAG_TYPE_3));
```

## Quick note by ChatGPT

```c
#define FLAG_A (1 << 0)
#define FLAG_B (1 << 1)
#define FLAG_C (1 << 2)

int flags = 0;

/* Set flags A and C */
flags |= FLAG_A | FLAG_C;

/* Check if flags A and C are set */
if ((flags & FLAG_A) && (flags & FLAG_C)) {
  // Flags A and C are set
}

/* Clear flags A and C */
flags &= ~(FLAG_A | FLAG_C);

/* Check if flags A and C are not set */
if (!(flags & (FLAG_A | FLAG_C))) {
  // Flags A and C are not set
}
```

> See liblogit for use case
