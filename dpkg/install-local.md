# Install Debian Package Locally

## Install Debian package for the local user

```bash
dpkg --root=$HOME/.local -i package.deb

[or]

dpkg --instdir=$HOME/.local --admindir=$HOME/.local/var/lib/dpkg -i example.deb
```

## With `checkinstall` command

```bash
sudo checkinstall --install=no --fstrans=no --pkgname=example --pkgversion=1.0 \
                  --pkgarch=x86_64 --maintainer=you@example.com --pkggroup=example \
                  --pkgsource=https://example.com/example-1.0.tar.gz --pkglicense=GPL \
                    make install DESTDIR=~/.local
```

## Required Filesystem

```bash
mkdir -p $HOME/.local/var/lib/dpkg
mkdir -p $HOME/.local/var/lib/dpkg/info
touch $HOME/.local/var/lib/dpkg/status
touch $HOME/.local/var/lib/dpkg/available
touch $HOME/.local/var/lib/dpkg/updates
touch $HOME/.local/var/lib/dpkg/diversions
```

## Other Ways

```bash
dpkg-buildpackage --instdir=~/.local/
```

Alternatively, you can also set the `DESTDIR` environment variable in the `rules` file.

```make
override_dh_auto_build:
    DESTDIR=~/.local/ dh_auto_build
```
