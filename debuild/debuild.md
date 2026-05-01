# debuild: Build debian package

## Alias

```bash
debuild-simple
```

## Build

```bash
dpkg-buildpackage -b -us -uc # Use this for colored output

debuild -b -uc -us
```

## Clean

```bash
debclean

[or]

debuild -- clean

[or]

dpkg-buildpackage --rules-target clean -us -uc -ui
```

## Quick_rebuild

- Compile the source code

    `fakeroot debian/rules build`

- Build `.deb` file without rebuilding the upstream sources

    `fakeroot debian/rules binary`

## Reference

<https://www.debian.org/doc/manuals/maint-guide/build.en.html>
