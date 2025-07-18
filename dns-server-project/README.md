# Self-Hosted DNS and Web Server Project

## Live Demo
[http://nestortoscano.com](http://nestortoscano.com)

## Overview
This project demonstrates how to self-host a fully functional authoritative DNS server using BIND9 and serve a website using Apache2 all hosted from a Digital Ocean Ubuntu Droplet.

Instead of relying on third-party DNS providers, I set up custom nameservers (`ns1` and `ns2`) and configured a primary master DNS server to resolve domain names. I also deployed a basic web page over HTTP using Apache2 with custom virtual host settings.

## Tool/Servers Used
- **BIND9** – DNS server for authoritative zone management
- **Apache2** – Web server to serve static content
- **DigitalOcean** – VPS hosting provider
- **Ubuntu** – Linux distribution (server environment)
- **UFW** – Firewall to secure DNS and HTTP ports
- **Custom Domain (IONOS)** – Purchased separately and configured with glue records

## My Setup
### 1. Digital Ocean VPS
- Created a Ubuntu Live Droplet with custom IPV4 address
  - (Possibly soon to integrate an IPV6 address)
  
### 2. Domain/Nameserver Configuration
- Registered a domain: `nestortoscano.com` using IONOS
- Created custom nameservers using DNS/IP from Ubuntu VPS:  
  - `ns1.nestortoscano.com → <159.89.80.36>`  
  - `ns2.nestortoscano.com → <167.172.0.13>` (necessary to create a reserved IP)
- Configured glue records and pointed the domain to these nameservers at the registrar.
  
### 3. BIND9 DNS Server Configuration
- Installed BIND9 on Ubuntu VPS.
- Configured it as a primary authoritative DNS server.
- Created forward zone files with:
  - `A` records for root, `www`, `ns1`, `ns2`, 'etc'
  - `NS` records pointing to custom nameservers
- Opened port 53 (TCP/UDP) via UFW for external DNS queries.

### 3. Apache2 Web Server Configuration
- Installed Apache2 on the same droplet.
- Created a custom virtual host:
  - `ServerName` and `ServerAlias` set to domain
  - Custom `DocumentRoot` with animated landing page
  - Enabled error logs
- Ensured ownership and permissions were properly set:
  ```bash
  sudo chown -R www-data:www-data /var/www/yourdomain.com
