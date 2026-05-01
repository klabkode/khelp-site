# Python package manager

## Highlights

### Ubuntu

```bash
cd ~/Projects/Package
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

If you want the venv activated automatically in this project, you can add a `.envrc` (if using `direnv`) or just remember to source `.venv/bin/activate` each session.

### Windows

```bash
cd C:\Users\UserName\Projects\Package
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

To deactivate later: `deactivate`

## What is PIP

`pip` is the reference Python package manager. It’s used to install and update packages into a virtual environment.

The Python installers for Windows and MacOS include pip.

```bash
python -m pip install --upgrade pip  # Unix
python -m pip --version              # Windows
```

## Install packages using pip

```bash
python -m pip install <package-name>  # Unix
py -m pip install <package-name>      # Windows
```

**Note:** Replace `python` to `py` for Windows.

The most common scenario is to install from PyPI using Requirement Specifiers:

```bash
python -m pip install  SomePackage          # Latest version
python -m pip install  SomePackage==1.0.4   # Specific version
python -m pip install 'SomePackage>=1.0.4'  # Minimum version
```

### Force install

```bash
python3 -m pip install --force-reinstall Pillow
```

## Upgrading packages

`python -m pip install --upgrade <package-name>`

## List installed packages

```bash
pip(3) list
```

If you want to see more details about the installed packages:

```bash
pip(3) show <package-name>
pip(3) show --files <package-name>
```

## Installing from Wheels

`Wheel` is a built, archive format that can greatly speed installation compared to building and installing from source archives.

Pip prefers Wheels where they are available. To disable this, use the `--no-binary` flag for pip install.

If no satisfactory wheels are found, pip will default to finding source archives.

To install directly from a wheel archive:

```bash
python -m pip install SomePackage-1.0-py2.py3-none-any.whl
```

For the cases where wheels are not available, pip offers pip wheel as a convenience, to build wheels for all your requirements and dependencies.

Pip wheel requires the wheel package to be installed, which provides the `bdist_wheel` setuptools extension that it uses.

To build wheels for your requirements and all their dependencies to a local directory:

```bash
python -m pip install wheel
python -m pip wheel --wheel-dir=/local/wheels -r requirements.txt
```

And then to install those requirements just using your local directory of wheels (and not from PyPI):

```bash
python -m pip install --no-index --find-links=/local/wheels -r requirements.txt
```

## Install packages using a requirements file

Instead of installing packages individually, pip allows you to declare all dependencies

in a Requirements File. For example you could create a `requirements.txt` file containing:

**requirements.txt:**

```bash
requests==2.18.4
google-auth==1.1.0

python -m pip install -r requirements.txt
```

## Freezing dependencies

Pip can export a list of all installed packages and their versions using the freeze command:

```bash
python -m pip freeze
```

Which will output a list of package specifiers such as:

```bash
cachetools==2.0.1
certifi==2017.7.27.1
chardet==3.0.4
google-auth==1.1.1
idna==2.6
pyasn1==0.3.6
pyasn1-modules==0.1.4
requests==2.18.4
rsa==3.4.2
six==1.11.0
urllib3==1.22
```

The pip freeze command is useful for creating Requirements Files that can re-create the exact versions of all packages installed in an environment.

## Create Requirements Files

`Requirements files` are files containing a list of items to be installed using pip install like so:

```bash
python -m pip install -r requirements.txt
```

### Use cases

1. Requirements files are used to hold the result from pip freeze for the purpose of achieving Repeatable Installs.

   ```bash
   python -m pip freeze > requirements.txt
   python -m pip install -r requirements.txt
   ```

2. Requirements files are used to force pip to properly resolve dependencies
3. Requirements files are used to force pip to install an alternate version of a sub-dependency.
4. Requirements files are used to override a dependency with a local patch that lives in version control.

## Listing Packages

```bash
python -m pip list
```

## Searching for Packages

```bash
python -m pip search "query"
```

## Command Completion

To setup for bash:

```bash
python -m pip completion --bash >> ~/.profile
```

## Bypasses Debian's protection

```bash
pip install -r requirements.txt --break-system-packages
```

This bypasses Debian's protection that prevents pip from conflicting with system-managed packages.
It's generally safe for a single-package project like this (jinja2), but the virtual environment approach is safer for production use.

## Weblinks

<https://pip.pypa.io/en/latest/user_guide/#requirements-files>
