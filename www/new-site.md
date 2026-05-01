# Setup New Virtual Host in Apache2

## 1. Create Site File at `/usr/local/test`

```bash
index.html
```

## 2. Add Site Configs at `/etc/apache2/sites-available/test.conf`

```apache
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /usr/local/test
    ServerName localhost
    Alias /test /usr/local/test

    <Directory /usr/local/test>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/test_error.log
    CustomLog ${APACHE_LOG_DIR}/test_access.log combined
</VirtualHost>
```

## 3. Enable Site `test.conf`

```bash
sudo a2ensite test.conf
```

## 4. Access the New Test Site

Visit <http://localhost/test/>

## For New CGI Site

```apache
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html

    # Alias for your CGI application
    ScriptAlias /test /usr/local/test

    <Directory "/usr/local/test">
        Options +ExecCGI
        AddHandler cgi-script .cgi .pl .py .sh
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/test_error.log
    CustomLog ${APACHE_LOG_DIR}/test_access.log combined
</VirtualHost>
```
