# Setup HTTP CGI Environment in Ubuntu 20

This guide walks you through setting up a CGI environment with Apache2 on Ubuntu 20.

## Prerequisites

### 1. Install Apache webserver

   ```bash
   sudo apt install apache2
   ```

### 2. Enable CGI module and restart the webserver

   ```bash
   sudo a2enmod cgi
   sudo service apache2 restart
   # OR
   sudo systemctl restart apache2
   ```

### 3. Default CGI Configuration

By default, Apache2 runs CGI scripts in `/usr/lib/cgi-bin/` or `/var/www/cgi-bin/`.

The configuration is defined in `/etc/apache2/conf-available/serve-cgi-bin.conf`:

```apache
<IfModule mod_alias.c>
    <IfModule mod_cgi.c>
        Define ENABLE_USR_LIB_CGI_BIN
    </IfModule>

    <IfModule mod_cgid.c>
        Define ENABLE_USR_LIB_CGI_BIN
    </IfModule>

    <IfDefine ENABLE_USR_LIB_CGI_BIN>
        ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
        <Directory "/usr/lib/cgi-bin">
            AllowOverride None
            Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
            Require all granted
        </Directory>
    </IfDefine>
</IfModule>
```

## Hello World CGI Example

1. Create a `hello.cgi` file in `/usr/lib/cgi-bin/`:

   **File: `hello.cgi`**

   ```bash
   #!/bin/bash
   echo "Content-type: text/html"
   echo ""
   echo "<html>"
   echo "<head>"
   echo "<title>Hello, World! CGI</title>"
   echo "</head>"
   echo "<body>"
   echo "<h1>Hello, World!</h1>"
   echo "<h1>Running CGI script in '$PWD'.</h1>"
   echo "</body>"
   echo "</html>"
   ```

2. Make the script executable

   ```bash
   sudo chmod +x /usr/lib/cgi-bin/hello.cgi
   ```

3. **Access the script**

   Open your browser and navigate to: `http://localhost/cgi-bin/hello.cgi`

## Customizing the CGI Path

1. Create your custom CGI directory `mkdir /usr/lib/kdev`.

2. Place your CGI files in the new directory `/usr/lib/kdev/`.

3. Add the following configuration to `/etc/apache2/apache2.conf`:

   **File: `kdev.cgi`**

   ```apache
   ScriptAlias /kdev/ "/usr/lib/kdev/"
   RedirectMatch ^/kdev$ /kdev/

   # Optional: Serve static assets
   #Alias /kdev-css "/usr/share/kdev/"

   <Directory "/usr/lib/kdev/">
      AllowOverride None
      Options ExecCGI FollowSymlinks
      Require all granted
   </Directory>
   ```

- Optionally: Create a Separate Configuration File

   1. **Create the configuration file**

      Create `/etc/apache2/conf-available/kdev.conf` with the above configuration.

   2. **Enable the configuration**

      ```bash
      cd /etc/apache2/conf-enabled
      sudo ln -sf ../conf-available/kdev.conf ./kdev.conf
      ```

## Deployment

1. Verify configuration syntax

   ```bash
   sudo apachectl configtest
   ```

2. Review Apache module status (optional)

   ```bash
   apachectl -M
   ```

3. Restart Apache2

   ```bash
   sudo systemctl restart apache2
   ```

## Configuration Breakdown

### 1. ScriptAlias Directive

```apache
ScriptAlias /kdev/ "/usr/lib/kdev/"
```

- Maps the URL path `/kdev/` to the physical location `/usr/lib/kdev/`
- When accessing URLs starting with `/kdev/`, the server executes scripts from this directory

### 2. Redirect Rule

```apache
RedirectMatch ^/kdev$ /kdev/
```

- Redirects `/kdev` (without trailing slash) to `/kdev/` (with trailing slash)
- Ensures consistent URL handling

### 3. Static Asset Alias

```apache
Alias /kdev-css "/usr/share/kdev/"
```

- Creates an alias for serving static files (CSS, images, etc.)
- Maps `/kdev-css` URL path to `/usr/share/kdev/` directory

### 4. Directory Configuration

```apache
<Directory "/usr/lib/kdev/">
    AllowOverride None
    Options ExecCGI FollowSymlinks
    Require all granted
</Directory>
```

**Directive explanations:**

- `AllowOverride None`: Disables `.htaccess` file overrides in this directory
- `Options ExecCGI FollowSymlinks`: Allows CGI script execution and following symbolic links
- `Require all granted`: Grants access to all users

## Accessing Your CGI Application

After completing the setup, your CGI application will be accessible at:

<http://localhost/kdev/>

## Troubleshooting

### Common Issues

1. **Permission denied errors**

   ```bash
   sudo chmod +x /usr/lib/kdev/your-script.cgi
   sudo chown www-data:www-data /usr/lib/kdev/your-script.cgi
   ```

2. **Check Apache error logs**

   ```bash
   sudo tail -f /var/log/apache2/error.log
   ```

3. **Verify CGI module is loaded**

   ```bash
   apache2ctl -M | grep cgi
   ```
