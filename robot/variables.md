# Variables

## Scalar Variable

```bash
${variablename}
```

## List Variable

```bash
@{variablename}
```

Suppose we have values A, B.
It will be referred in the test case as:

```bash
@{variablename}[0] // A
@{variablename}[1] // B
```

## Dictionary Variable

```bash
&{Variablename}
```

Suppose we are storing the values as key1=A, key2=B.
It will be referred in the test case as:

```bash
&{Variablename}[key1] // A
&{Variablename}[key2] // B
```
