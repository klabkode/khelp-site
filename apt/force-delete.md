# Force Delete Corrupted Packages

Use these commands to forcefully remove corrupted or broken packages.

## Remove the package (force all)

```sh
sudo dpkg --remove --force-all <pkg-name>
```

## Remove package info files

```sh
sudo rm -i /var/lib/dpkg/info/<pkg-name>.*
```

## Remove package (force remove reinstreq)

```sh
sudo dpkg --remove --force-remove-reinstreq <pkg-name>
```

## Update package lists

```sh
sudo apt-get update
```
