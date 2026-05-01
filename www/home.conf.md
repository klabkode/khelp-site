# Access your @home directory directly without creating a symbolic link

Add following Apache configurations in '`/etc/apache2/sites-available/000-default.conf`' file.

## Configuration

```apache
<VirtualHost *:80>
    # Other configurations...

    DocumentRoot /home/your_username
    <Directory /home/your_username>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>

    # Other configurations...
</VirtualHost>
```

## Restart Apache

```bash
sudo service apache2 restart
```

## Notes

> In the test, the webserver blocked accessing the user @home directory.
