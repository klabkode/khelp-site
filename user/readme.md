# Linux User Management

| Action                          | Command                                             | What it Does                      | Notes                 |
| ------------------------------- | --------------------------------------------------- | --------------------------------- | --------------------- |
| Add user with home dir          | `useradd -m username`                               | Creates user and `/home/username` | Password **not** set  |
| Add user with bash shell        | `useradd -m -s /bin/bash username`                  | Sets bash as login shell          | Preferred for humans  |
| Set user password               | `passwd username`                                   | Sets/changes login password       | Required to login     |
| Add user (interactive)          | `adduser username`                                  | Creates user, home, password      | Debian/Ubuntu only    |
| Add sudo access (Debian/Ubuntu) | `usermod -aG sudo username`                         | Grants sudo privileges            | Logout/login required |
| Add sudo access (RHEL/CentOS)   | `usermod -aG wheel username`                        | Grants sudo privileges            | Same as above         |
| Verify user exists              | `id username`                                       | Shows UID/GID/groups              | Fails if user missing |
| Check home directory            | `ls -ld /home/username`                             | Verifies home creation            | Permission check      |
| Delete user only                | `userdel username`                                  | Removes account only              | Home preserved        |
| Delete user + home              | `userdel -r username`                               | Removes account and home          | **Recommended**       |
| List user processes             | `ps -u username`                                    | Shows running processes           | Before deletion       |
| Kill user processes             | `pkill -u username`                                 | Stops all user processes          | Needed if logged in   |
| Force delete leftovers          | `rm -rf /home/username`                             | Manual cleanup                    | ⚠️ Dangerous           |
| Remove user from passwd files   | `sed -i '/^username:/d' /etc/{passwd,shadow,group}` | Manual removal                    | ⚠️ Last resort         |

## Recommended workflow

1. Create new user

    ```bash
    useradd -m -s /bin/bash username
    passwd username
    sudo usermod -aG sudo username
    ```

2. Remove user with home directory

    ```bash
    userdel -r username
    ```

---

