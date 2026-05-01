# PAM (Pluggable Authentication Module) configuration

## Override the password strength check

To override the password strength check and allow setting a simple password on Ubuntu, you can adjust the PAM configuration.
Here's how:

### Steps to Allow Simple Passwords

1. Open the PAM password configuration file:

    ```bash
    sudo vim /etc/pam.d/common-password
    ```

2. Find the line that looks like this:

    ```bash
    password requisite pam_pwquality.so retry=3
    ```

3. Comment it out by adding a # at the beginning of the line:

    ```bash
    # password requisite pam_pwquality.so retry=3
    ```

    Or, if you want to keep it but disable dictionary checks, you can modify it like this:

    ```bash
    password requisite pam_pwquality.so retry=3 minlen=6 dcredit=0 ucredit=0 ocredit=0 lcredit=0 dictcheck=0
    ```

4. Save, exit and try changing the password again now

    ```bash
    passwd
    ```
