# Add New User

```bash
useradd <username>    # Create only the user enrty
useradd <username> -m # Create user and home directory
adduser <username> --home /home/<username> --shell /bin/bash
useradd <username> -m -d /home/<username> -s /bin/bash <username>
```

**Examples:**

```bash
adduser username
adduser username --home /home/username --shell /bin/bash

useradd options (see: man useradd):
    -r, --system Create a system account
    -m, --create-home Create the user's home directory
    -d, --home-dir HOME_DIR Home directory of the new account
    -s, --shell SHELL Login shell of the new account
    -g, --gid GROUP Name or ID of the primary group
    -G, --groups GROUPS List of supplementary groups
    -p, --password PASSWORD Encrypted password of the new account
    -u, --uid UID Specify user ID
```

## Delete a user

```bash
deluser <username>               # Delete only the user
deluser --remove-home <username> # Delete user entry and home directory
```

## Add new group and new user

```bash
groupadd -g 1000 <username>
useradd -d /home/<username> -s /bin/bash -m <username> -u 1000 -g 1000
```

**Examples:**

```bash
groupadd -g 1000 username
useradd -d /home/username -s /bin/bash -m username -u 1000 -g 1000
```

## Adding the new user to the sudo group

```bash
groups <username>           # To list the groups of the user belongs to
usermod -aG sudo <username> # Add the new user to a sudo group
```

**Examples:**

```bash
usermod -aG sudo username
usermod -aG vboxusers username
```

### Alternate way to add user in sudo group

If you are signed as root user type `visudo` and add the below entry

```bash
<username> ALL=(ALL:ALL) ALL
```
