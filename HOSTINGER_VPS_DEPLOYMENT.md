# 🚀 Deploy to Hostinger VPS - Complete Guide

## ✅ Yes, Hostinger VPS Works Perfectly!

You **don't need Vercel**. Your Hostinger VPS is actually better because:
- ✅ Full control over your app
- ✅ Private and secure
- ✅ No third-party dependencies
- ✅ Better for custom domains

---

## 📋 What You Need

Before starting, make sure you have:
- ✅ Hostinger VPS access (SSH login)
- ✅ Your domain: www.valeneo.space
- ✅ Domain DNS pointing to your VPS IP
- ✅ This app's code ready to upload

---

## 🎯 Deployment Steps (Simple!)

### Step 1: Connect to Your VPS

Open terminal (Mac/Linux) or PuTTY (Windows) and connect:

```bash
ssh root@your-vps-ip-address
# Enter your password when prompted
```

**Example:**
```bash
ssh root@123.45.67.89
```

---

### Step 2: Install Required Software

Run these commands one by one:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (version 18)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (keeps your app running)
sudo npm install -g pm2

# Install Nginx (web server)
sudo apt install -y nginx

# Verify installations
node -v     # Should show v18.x.x
npm -v      # Should show 9.x.x or higher
pm2 -v      # Should show version number
```

✅ **Done!** Your VPS now has everything needed.

---

### Step 3: Upload Your App

**Option A: Using FileZilla (Easy for non-technical users)**

1. Download FileZilla: https://filezilla-project.org/
2. Connect to your VPS:
   - Host: `sftp://your-vps-ip`
   - Username: `root`
   - Password: Your VPS password
   - Port: `22`
3. Navigate to `/var/www/` on the right side
4. Upload your entire `/app` folder there
5. Rename it to `notion-gallery`

**Option B: Using Git (If you have GitHub)**

```bash
# On your VPS
cd /var/www/
git clone https://github.com/yourusername/your-repo.git notion-gallery
cd notion-gallery
```

**Option C: Using SCP (Command line)**

On your local computer (not VPS):
```bash
scp -r /path/to/your/app root@your-vps-ip:/var/www/notion-gallery
```

---

### Step 4: Setup Your App

Now on your VPS, run:

```bash
# Go to app directory
cd /var/www/notion-gallery

# Install dependencies
npm install

# Create .env file
nano .env
```

**In the nano editor, add this:**
```
NEXT_PUBLIC_BASE_URL=https://www.valeneo.space
```

**Save and exit:**
- Press `Ctrl + X`
- Press `Y`
- Press `Enter`

**Build the app:**
```bash
npm run build
```

✅ **Done!** App is built and ready.

---

### Step 5: Start the App with PM2

```bash
# Start the app
pm2 start npm --name "notion-gallery" -- start

# Save PM2 configuration (so app runs after reboot)
pm2 save
pm2 startup

# Copy and run the command PM2 shows (it will look like this):
# sudo env PATH=$PATH:/usr/bin...

# Check if app is running
pm2 status
```

You should see:
```
┌─────┬──────────────────┬─────────┬──────┐
│ id  │ name             │ status  │ cpu  │
├─────┼──────────────────┼─────────┼──────┤
│ 0   │ notion-gallery   │ online  │ 0%   │
└─────┴──────────────────┴─────────┴──────┘
```

✅ **Your app is running on port 3000!**

---

### Step 6: Configure Nginx (Web Server)

**Create Nginx configuration:**

```bash
sudo nano /etc/nginx/sites-available/notion-gallery
```

**Paste this configuration:**
```nginx
server {
    listen 80;
    server_name www.valeneo.space valeneo.space;

    # Allow large file uploads (for images)
    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Save and exit** (Ctrl+X, Y, Enter)

**Enable the site:**
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/notion-gallery /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# If test is OK, restart Nginx
sudo systemctl restart nginx
```

✅ **Nginx is configured!**

---

### Step 7: Setup SSL (HTTPS)

Let's make your site secure with free SSL:

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate (automatic!)
sudo certbot --nginx -d www.valeneo.space -d valeneo.space

# Follow the prompts:
# - Enter your email
# - Agree to terms (Y)
# - No to sharing email (N)
# - Choose 2 (redirect HTTP to HTTPS)
```

✅ **SSL installed! Your site is now https://www.valeneo.space**

**Test auto-renewal:**
```bash
sudo certbot renew --dry-run
```

---

### Step 8: Configure Firewall

```bash
# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp

# Enable firewall (if not already)
sudo ufw enable

# Check status
sudo ufw status
```

---

## ✅ You're Live!

Visit: **https://www.valeneo.space**

Your app should be live! 🎉

---

## 🔧 Useful Commands

### Check App Status
```bash
pm2 status
pm2 logs notion-gallery     # View logs
pm2 restart notion-gallery  # Restart app
```

### Update Your App
```bash
cd /var/www/notion-gallery
git pull                    # If using git
npm install                 # Install new dependencies
npm run build              # Rebuild
pm2 restart notion-gallery # Restart
```

### Check Nginx
```bash
sudo nginx -t              # Test configuration
sudo systemctl status nginx
sudo systemctl restart nginx
```

### View Logs
```bash
# App logs
pm2 logs notion-gallery

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 🆘 Troubleshooting

### Problem: Site not loading
**Check if app is running:**
```bash
pm2 status
# If not running:
pm2 start notion-gallery
```

**Check if Nginx is running:**
```bash
sudo systemctl status nginx
# If not running:
sudo systemctl start nginx
```

### Problem: "502 Bad Gateway"
**App might have crashed:**
```bash
pm2 logs notion-gallery  # Check errors
pm2 restart notion-gallery
```

### Problem: Changes not showing
**Need to rebuild:**
```bash
cd /var/www/notion-gallery
npm run build
pm2 restart notion-gallery
```

### Problem: SSL not working
**Check certificate:**
```bash
sudo certbot certificates
sudo certbot renew --force-renewal -d www.valeneo.space
```

### Problem: Domain not pointing to VPS
**Check DNS settings in Hostinger:**
1. Go to Hostinger control panel
2. Find your domain DNS settings
3. Add A record:
   - Type: `A`
   - Name: `@`
   - Points to: Your VPS IP
   - TTL: 3600
4. Add A record for www:
   - Type: `A`
   - Name: `www`
   - Points to: Your VPS IP
   - TTL: 3600
5. Wait 5-30 minutes for DNS to propagate

---

## 📋 Complete Setup Checklist

- [ ] Connected to VPS via SSH
- [ ] Installed Node.js, PM2, Nginx
- [ ] Uploaded app to `/var/www/notion-gallery`
- [ ] Created `.env` file with domain
- [ ] Ran `npm install` and `npm run build`
- [ ] Started app with PM2
- [ ] Configured Nginx
- [ ] Setup SSL with Certbot
- [ ] Configured firewall
- [ ] Domain DNS pointing to VPS
- [ ] Tested: https://www.valeneo.space

---

## 🔄 How to Update Your App Later

When you make changes to your code:

```bash
# 1. Connect to VPS
ssh root@your-vps-ip

# 2. Go to app directory
cd /var/www/notion-gallery

# 3. Upload new files (using FileZilla or git pull)

# 4. Rebuild
npm run build

# 5. Restart
pm2 restart notion-gallery

# Done! Changes are live in 30 seconds
```

---

## 💰 Why Hostinger VPS is Better (for you)

**Vercel Limitations:**
- ❌ Code visible in their system
- ❌ Limited control
- ❌ May have rate limits
- ❌ Public deployment logs

**Hostinger VPS Advantages:**
- ✅ **Full privacy** - only you have access
- ✅ **Complete control** - install anything
- ✅ **No rate limits** - unlimited requests
- ✅ **Better for custom setup** - full server access
- ✅ **Already paid for** - no extra costs

---

## 🎯 Quick Start (TL;DR)

```bash
# On VPS
sudo apt update && sudo apt install -y nodejs npm nginx
sudo npm install -g pm2
cd /var/www/
# Upload your app here
cd notion-gallery
npm install
echo "NEXT_PUBLIC_BASE_URL=https://www.valeneo.space" > .env
npm run build
pm2 start npm --name "notion-gallery" -- start
pm2 save
# Setup Nginx (see Step 6)
# Setup SSL (see Step 7)
```

Visit: https://www.valeneo.space 🚀

---

## 📞 Need Help?

**If something doesn't work:**

1. Check PM2 logs: `pm2 logs notion-gallery`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Restart everything:
   ```bash
   pm2 restart notion-gallery
   sudo systemctl restart nginx
   ```

**Common issue:** Port 3000 already in use
```bash
# Find what's using port 3000
sudo lsof -i :3000
# Kill that process
sudo kill -9 <PID>
# Restart your app
pm2 restart notion-gallery
```

---

## ✅ You're Done!

Your app is now live at: **https://www.valeneo.space** 🎉

**Test it:**
1. Visit https://www.valeneo.space
2. Enter Notion credentials
3. Generate embed link
4. Paste in Notion
5. Click and view your beautiful image grid!

**Hostinger VPS is perfect for your needs!** No Vercel needed. 💪
