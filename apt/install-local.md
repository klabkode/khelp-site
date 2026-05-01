# Install Package Binaries in a Custom Path

Download the source and install binaries to a custom directory:

```sh
sudo apt-get source <package-name>
cd <package-name-version>
sudo checkinstall -D --install=no --fstrans=yes --pakdir="$HOME/.local/" make install
```

## Install Package Files in a Custom Path (Not Binaries)

Install package files to a custom directory without installing binaries:

```sh
apt-get -o dir::cache="$HOME/.local/var/cache/apt" -o dir::state="$HOME/.local/var/lib/apt" update
apt-get -o dir::cache="$HOME/.local/var/cache/apt" -o dir::state="$HOME/.local/var/lib/apt" install <package-name>
```
