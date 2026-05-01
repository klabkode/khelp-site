# shlibdeps: Shared library dependencies

### List deps

```bash
objdump -p ./app.out | grep NEEDED
dpkg-shlibdeps -O ./app.out (it requires debian/control)
```

### Create_deps_file: Create debian/substvars deps file

```bash
dpkg-shlibdeps -e ./app.out (it requires debian/control)
```
