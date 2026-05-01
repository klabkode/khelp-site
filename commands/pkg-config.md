# pkg-config Usage

## List All Available Packages

```bash
pkg-config --list-all
```

## Retrieve pkg-config Information for a Library

```bash
pkg-config --cflags --libs <package-name>
```

## Retrieve Static pkg-config Information for a Library

```bash
pkg-config --static --libs <package-name>
```

## Work Samples with Curl Package

## Print CFLAGS

```bash
pkg-config --cflags libcurl
# Output:
# -I/usr/include/x86_64-linux-gnu
```

## Print CFLAGS and LDFLAGS

```bash
pkg-config --cflags --libs libcurl
# Output:
# -I/usr/include/x86_64-linux-gnu -lcurl
```

## Print CFLAGS and LDFLAGS for Static Linking

```bash
pkg-config --cflags --libs --static libcurl
# Output:
# -I/usr/include/x86_64-linux-gnu -L/usr/lib/x86_64-linux-gnu/mit-krb5 -lcurl -lnghttp2 -lidn2 -lrtmp -lssh -lpsl -lssl -lcrypto -lssl -lcrypto -Wl,-Bsymbolic-functions -Wl,-z,relro -lgssapi_krb5 -lkrb5 -lk5crypto -lcom_err -llber -lldap -llber -lbrotlidec -lz
```

## PKG_CONFIG_PATH

Set the `PKG_CONFIG_PATH` environment variable to include the directory where the `.pc` files for the library are located.

```bash
export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/path/to/libexample/pkgconfig
```

## How to Use in Makefile

```makefile
CFLAGS  += $(shell pkg-config --cflags libexample)
LDFLAGS += $(shell pkg-config --libs   libexample)
```
