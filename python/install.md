# Python package installation

## Installation

```bash
python setup.py install
```

### Install the package for the current user

```bash
python setup.py install --user
```

This will install the package in the user-specific `site-packages` directory,
which is usually `~/.local/lib/python<version>/site-packages`.

### Install package to custom location

If you specifically want to install to a custom location, such as `~/.local`,
you can use the `--install-lib` option like this:

```bash
python setup.py install --install-lib=~/.local/lib/python<version>/site-packages
```

## List installed packages

```bash
pip(3) list
```

If you want to see more details about the installed packages:

```bash
pip(3) show <package-name>
pip(3) show --files <package-name>
```

## Uninstall the package

```bash
pip(3) uninstall <package-name>
```

### Note: Replace `python` to `py` for Windows

## Install from local archives

If you have a local copy of a Distribution Package’s archive (a zip, wheel, or tar file)
you can install it directly with `pip`:

```bash
python3 -m pip install requests-2.18.4.tar.gz
```

If you have a directory containing archives of multiple packages, you can tell
`pip` to look for packages there and not to use the Python Package Index (PyPI) at all:

```bash
python3 -m pip install --no-index --find-links=/local/dir/ <package-name>
```

## Install from other package indexes

If you want to download packages from a different index than the Python Package Index (PyPI),
you can use the `--index-url` flag:

```bash
python3 -m pip install --index-url http://index.example.com/simple/ SomeProject
```

If you want to allow packages from both the Python Package Index (PyPI) and a separate index,
you can use the `--extra-index-url` flag instead:

```bash
python3 -m pip install --extra-index-url http://index.example.com/simple/ SomeProject
```

## Upgrading packages

pip can upgrade packages in-place using the `--upgrade` flag. For example, to install
the latest version of `<package-name>` and all of its dependencies:

```bash
python3 -m pip install --upgrade <package-name>
```

## Install pacakage using a requirements file

Instead of installing packages individually, pip allows you to declare all dependencies in a Requirements File.
For example you could create a `requirements.txt` file containing:

```bash
requests==2.18.4
google-auth==1.1.0
```

And tell pip to install all of the packages in this file using the `-r` flag:

```bash
python3 -m pip install -r requirements.txt
```

## Installing from Wheels

Refer `pip` tag for more info.

```bash
python -m pip install SomePackage-1.0-py2.py3-none-any.whl
```

## Weblinks

<https://pip.pypa.io/en/latest/user_guide/#user-guide>
