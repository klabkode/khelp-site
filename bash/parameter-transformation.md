# Bash Parameter Transformation

In Bash, you can perform various transformations on variables using parameter expansion syntax. Here are some examples:

| Syntax                | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| `${var^}`             | Transform the first character of `var` to uppercase.                        |
| `${var^^}`            | Transform all characters in `var` to uppercase.                             |
| `${var,}`             | Transform the first character of `var` to lowercase.                        |
| `${var,,}`            | Transform all characters in `var` to lowercase.                             |
| `${var@operator}`     | Perform a shell operation on the value of `var` using the specified operator.|

### Common operators for `${var@operator}`

| Operator | Description                                                                 |
|----------|-----------------------------------------------------------------------------|
| `Q`      | Quote the value of `var` for safe shell input.                              |
| `E`      | Escape the value of `var` for safe use with `eval`.                         |
| `P`      | Perform pathname expansion on the value of `var`.                           |
| `A`      | Split the value of `var` into an array using whitespace as the delimiter.   |
| `a`      | Split the value of `var` into an array using the value of `IFS` as delimiter.|
