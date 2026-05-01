# Download `.deb` Files with apt-get

### Download the `.deb` file of a package to the current directory

```sh
sudo apt-get download <package-name>
```

### Download the `.deb` file to a specific directory

```sh
sudo apt-get -o dir::cache="$HOME/.local/" download <package-name>
```
