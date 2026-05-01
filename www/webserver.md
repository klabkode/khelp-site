# How to Run a Web Server (Python, PHP, Node.js, Apache)

How to quickly spin up a local web server using popular tools: **Python**, **PHP**, **Node.js**, and **Apache (httpd)**.

It also includes CGI script support and setting custom port numbers.

- Serve static or dynamic content (HTML, JS, CSS, CGI).
- Test and debug locally before deployment.
- Share files or APIs via HTTP.

## 1. Python Web Server

### Python 3.x (built-in)

```bash
# Serve current directory on port 8000

python  -m SimpleHTTPServer 8000 # Python 2.X
python3 -m http.server 8000      # Python 3.X
```

### Python CGI Server (with CGI support)

```bash
# Place CGI scripts in ./cgi-bin/
# Use --cgi flag for CGI support

python  -m CGIHTTPServer 8000     # Python 2.X
python3 -m http.server --cgi 8000 # Python 3.X
```

CGI scripts should be placed in a `cgi-bin/` directory and have executable permissions:

```bash
chmod +x cgi-bin/script.py
```

Refer to **khelp/www/cgi-bin.md** for CGI script details.

## 2. PHP Built-in Web Server

```bash
# Serve current folder on port 8000
php -S localhost:8000
```

### To enable PHP CGI scripts

Make sure your `.php` files are valid scripts and index.php exists.

PHP doesn’t require a separate `cgi-bin`.

Example:

```php
<?php
echo "Hello from PHP!";
?>
```

Default routing:

```bash
php -S localhost:8000 router.php
```

### Host Control

```bash
php -S 0.0.0.0:8080   # Allows external host connections
php -S localhost:8080 # Localhost does'nt allows external host connections
```

## 3. Node.js Simple HTTP Server

### Install `http-server` globally (if not installed)

```bash
npm install -g http-server
```

### Run the server

```bash
http-server . -p 8000
```

#### Or use a custom Node.js script with CGI-like logic

```javascript
// cgi-server.js
const http = require('http');
const { spawn } = require('child_process');
const server = http.createServer((req, res) => {
    if (req.url.startsWith('/cgi-bin/')) {
        const script = `.${req.url}`;
        const proc = spawn('python3', [script]);
        proc.stdout.pipe(res);
        proc.stderr.pipe(process.stderr);
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
});
server.listen(8000, () => console.log("Listening on port 8000"));
```

```bash
node cgi-server.js
```

Place scripts under `/cgi-bin/`, ensure execution rights.

## 4. Apache HTTP Server (httpd)

Apache provides robust static & dynamic content delivery and CGI support.

### Installation

**Debian/Ubuntu:**

```bash
sudo apt install apache2
```

**RedHat/CentOS:**

```bash
sudo yum install httpd
```

### Configure Custom Port

Edit `/etc/apache2/ports.conf`:

```bash
Listen 8080
```

Edit your site config in `/etc/apache2/sites-available/000-default.conf`:

```apache
<VirtualHost *:8080>
    DocumentRoot /var/www/html
    ...
</VirtualHost>
```

Restart Apache:

```bash
sudo systemctl restart apache2
```

### Enable CGI Support

**Enable CGI Module:**

```bash
sudo a2enmod cgi
```

**Configure CGI Directory:**

Edit `/etc/apache2/conf-enabled/serve-cgi-bin.conf` or define:

```apache
<Directory "/usr/lib/cgi-bin">
    Options +ExecCGI
    AddHandler cgi-script .cgi .py
</Directory>
```

Place scripts in `/usr/lib/cgi-bin/`:

```bash
sudo chmod +x /usr/lib/cgi-bin/test.py
```

Python CGI example:

```python
#!/usr/bin/env python3
print("Content-Type: text/html\n")
print("<h1>Hello from CGI Python!</h1>")
```
