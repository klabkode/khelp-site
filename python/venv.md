# Virtual Environments

A virtual environment in Python is a self-contained directory that contains a specific
Python interpreter and its associated standard library, as well as additional packages and modules.

It creats a virtual isloated environment to a Python project and its dependencies
from the system-wide Python interpreter and other projects.

This helps manage dependencies, avoid conflicts between different projects, and
maintain a clean and reproducible development environment.

## Create a new virtual environment

To create a virtual environment, go to your project’s directory and run the following command.
This will create a new virtual environment in a local folder named `.venv`:

The second argument is the location to create the virtual environment.

Generally, you can just create this in your project and call it `.venv`.

The `venv` will create a virtual Python installation in the `.venv` folder.

```bash
python3 -m venv .venv  # Unix
py -m venv .venv       # Windows
```

## Activate a virtual environment

Before you can start installing or using packages in your virtual environment you’ll need to activate it.

Activating a virtual environment will put the virtual environment-specific python and pip executables
into your shell’s `PATH`.

```bash
source .venv/bin/activate  # Unix
.venv\Scripts\activate     # Windows
```

To confirm the virtual environment is activated, check the location of your Python interpreter:

```bash
which python  # Unix
where python  # Windows
```

While the virtual environment is active, the above command will output a filepath that
includes the `.venv` directory, by ending with the following:

```bash
.venv/bin/python      # Unix
.venv\Scripts\python  # Windows
```

## Deactivate a virtual environment

If you want to switch projects or leave your virtual environment, `deactivate` the environment:

```bash
deactivate
```
