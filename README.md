# Self-Hosted DNS and Web Server Project

## Live Demo
[https://nestortoscano.com](https://nestortoscano.com)

## Overview
This project demonstrates how to self-host a fully functional authoritative DNS server using BIND9 and serve a website using Apache2 all hosted from a Digital Ocean Ubuntu Droplet and afterwards moved to a Raspberry Pi 4 B.

Instead of relying on third-party DNS providers, I set up custom nameservers (`ns1` and `ns2`) and configured a primary master DNS server to resolve domain names. I also deployed a basic web page over HTTP using Apache2 with custom virtual host settings.

Additionally, I installed PHP to handle WordPress's dynamic website functionality, and I installed mySQL as its database for content/configuration files. Finally, I installed WordPress on the same server and manually configured the admin settings. Overall, I was able to demonstrate full-stack hosting capabilities, from DNS to dynamic content delivery.

## Tool/Servers Used
- **BIND9** – DNS server for authoritative zone management
- **Apache2** – Web server to serve static content (html)
- **DigitalOcean or Raspberry Pi** – Hosting container (VPS or hardware)
- **Ubuntu** – Linux distribution
- **UFW** – Firewall to secure DNS and HTTP ports
- **Custom Domain (IONOS)** – Purchased separately and configured
- **PHP and mySQL** - HTML Processing and Database for files
- **Wordpress** - Content Management System

## My Setup
### 1. Digital Ocean VPS
- Created a Ubuntu Live Droplet with custom IPV4 address
  - (Possibly soon to integrate an IPV6 address)
- On Raspbery Pi with Ubuntu, I obtained the public IPV4 address then forwarded the ports (80/443) on the router to its private IP.
  
### 2. Domain/Nameserver Configuration
- Registered a domain: `nestortoscano.com` using IONOS
- Created custom nameservers using DNS/IP from Ubuntu VPS:  
  - `ns1.nestortoscano.com → <159.89.80.36>`  
  - `ns2.nestortoscano.com → <167.172.0.13>` (necessary to create a reserved IP)
- Configured glue records and pointed the domain to these nameservers at the registrar.
- On the Pi, I left the default nameservers and simply configured the glue records to the pi's public IP address (@ and www)
  
### 3. BIND9 DNS Server Configuration
- Installed BIND9 on Ubuntu VPS.
- Configured it as a primary authoritative DNS server.
- Created forward zone files with:
  - `A` records for root, `www`, `ns1`, `ns2`, `etc`
  - `NS` records pointing to custom nameservers
- Opened port 53 (TCP/UDP) via UFW for external DNS queries.
  - created problems whenever the UFW was not configured properly
- Note: I did not apply BIND9 on the Pi

### 4. Apache2 Web Server Configuration
- Installed Apache2 on the VPS.
- Created a custom virtual host (nestortoscano.com.conf):
  - `ServerName`, `DocumentRoot`, and `ServerAlias` set to domain
  - Enabled error logs
- Ensured ownership and permissions were properly set:
  ```bash
  sudo chown -R www-data.www-data /var/www/nestortoscano.com/
  sudo chmod -R 755 /var/www/nestortoscano.com/
  ```
- Set up ssl certification to allow secure connections using certbot
  - It was necessary to create a ssl certificate for both www.nestortoscano.com and nestortoscano.com
- On the Pi, I downloaded the .key and .cer files from IONOS and made sure they were only readable by apache2 (nestortoscano.com-ssl.conf)
  ```bash
  sudo mv _.nestortoscano.com_private_key.key /etc/ssl/private/nestortoscano.key
  sudo mv nestortoscano.com.crt /etc/ssl/certs/nestortoscano.crt
  sudo chown root:root /etc/ssl/certs/nestortoscano.crt
  sudo chmod 644 /etc/ssl/certs/nestortoscano.crt
  ```
- Finally I created the symbolic links for the website from sites-available to sites-enabled
  ```bash
  sudo a2enmod ssl
  sudo a2ensite nestortoscano-ssl.conf
  sudo a2ensite nestortoscano.com.conf
  sudo systemctl reload apache2
  ```

### 5. PHP and MySQL Database Configuration (optional)
- Install PHP and the related apache2 and mysql packages necessary
  - `sudo apt install php libapache2-mod-php php-mysql mysql-server`
-  Run Security Script for mySQL (removes certain scripts and unsafe configurations)
  - `mysql_secure_installation`

### 6. Installing/Securing Web Application (WordPress) (optional)
- In mySQL, create and initialize wordpress database, user, and privileges
  - `CREATE DATABASEE wordpress; GRANT ALL PRIVILEGES ON wordpress.* TO 'wordpressuser'@'localh
    ost'; FLUSH PRIVILEGES`
- Install Wordpress archive and extract/transfer files to website
  - `wget https://wordpress.org/latest.tar.gz `
  - `tar -xzvf latest.tar.gz`
  - `mv /tmp/wordpress/* /var/www/nestortoscano.com/`
    - make sure to remove all current files in directory first
  - `chown -R www-data:www-data /var/www/nestortoscano.com/`
    - making sure all files have create ownership/group
  - Manually Configure Wordpress website after logging in
    - 2FA, plugins, etc.
  
  ### General Tools/Commands Used
- `named-checkconf` – Validated BIND9 configuration syntax
- `named-checkzone nestortoscano.com db.nestortoscano.com` – Verified zone file syntax
- `dig @127.0.0.1 nestortoscano.com` – Tested DNS resolution locally
- `dig -t ns nestortoscano.com` – Tested DNS resolution publicly
- `systemctl status bind9` / `systemctl reload apache2` – Checking/Reloading Servers
- `ufw allow 53`, `ufw allow 80`, – Opened necessary firewall ports
- `curl http://nestotoscano.com` – Verified HTTP response from Apache
- `vim` – Edited various files
- `chown`, `chmod` – Managed file ownership and permissions
- `certbot -d nestortocano.com` - Acquiring SSL Certificate

  ### What is this used for now?
- Although I had initially configured this web server to use Wordpress, I realized I needed the website for non-blogging uses, so I configured the vps to display my portfolio using custom made HTML/CSS. Wordpress was slightly overkill for my use case, so I found this met my needs much better. I also decided to migrate the server to a previously used Raspberry Pi 4 B to have complete control over my server and loosen up on costs. It was a learning experience to migrate the server to a different system, and I definitely do not regret it!

