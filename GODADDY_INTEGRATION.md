# GoDaddy Integration Guide

This guide will help you connect your F&D Staging website with GoDaddy for domain management, email, and hosting.

## Table of Contents

1. [Domain DNS Configuration](#domain-dns-configuration)
2. [Email Setup](#email-setup)
3. [Deployment Options](#deployment-options)
4. [SSL/HTTPS Configuration](#sslhttps-configuration)
5. [Troubleshooting](#troubleshooting)

---

## Domain DNS Configuration

### Option 1: Connect GoDaddy Domain to Vercel (Recommended for Next.js)

Vercel is the recommended hosting platform for Next.js applications and offers seamless integration with GoDaddy.

#### Step 1: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure build settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
6. Add environment variables (from your `.env` file):
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `CONTACT_EMAIL`
7. Click "Deploy"

#### Step 2: Connect GoDaddy Domain in Vercel

1. In your Vercel project, go to **Settings** → **Domains**
2. Enter your domain: `fanddstaging.com` (and `www.fanddstaging.com`)
3. Vercel will provide DNS records to add

#### Step 3: Update DNS Records in GoDaddy

1. Log in to [GoDaddy](https://www.godaddy.com)
2. Go to **My Products** → **Domains** → Click **DNS** next to your domain
3. Add/Update the following records:

**For Apex Domain (fanddstaging.com):**

- **Type**: A
- **Name**: @
- **Value**: `76.76.21.21` (Vercel's IP - check Vercel dashboard for current IP)
- **TTL**: 600 (or default)

**For WWW Subdomain (www.fanddstaging.com):**

- **Type**: CNAME
- **Name**: www
- **Value**: `cname.vercel-dns.com` (or the CNAME provided by Vercel)
- **TTL**: 600 (or default)

4. Remove any conflicting A or CNAME records
5. Save changes

**Note**: DNS propagation can take 24-48 hours, but usually completes within a few hours.

---

### Option 2: Connect GoDaddy Domain to Netlify

#### Step 1: Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up/login
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables
7. Click "Deploy site"

#### Step 2: Connect Domain in Netlify

1. Go to **Site settings** → **Domain management**
2. Click "Add custom domain"
3. Enter `fanddstaging.com`
4. Netlify will provide DNS records

#### Step 3: Update DNS in GoDaddy

1. Log in to GoDaddy
2. Go to **DNS** settings for your domain
3. Add the DNS records provided by Netlify:
   - A record for apex domain
   - CNAME record for www subdomain

---

### Option 3: Connect GoDaddy Domain to Other Hosting

If you're using a different hosting provider, you'll need to:

1. Get your hosting provider's DNS records (usually A record IP or CNAME)
2. Log in to GoDaddy
3. Go to **DNS** settings
4. Update/add the records provided by your hosting provider

**Common DNS Record Types:**

- **A Record**: Points domain to an IP address
- **CNAME Record**: Points domain to another domain name
- **MX Record**: For email (see Email Setup section)

---

## Email Setup

### Option 1: Use GoDaddy Email (Microsoft 365/Outlook)

If you have GoDaddy email hosting:

1. **Set up MX Records in GoDaddy:**

   - Go to **DNS** settings
   - Add MX records provided by GoDaddy (usually something like):
     - **Type**: MX
     - **Name**: @
     - **Value**: `smtp.secureserver.net` (priority 0)
     - **Value**: `mailstore1.secureserver.net` (priority 10)

2. **Configure Email in Your App:**
   - Update `RESEND_FROM_EMAIL` in your `.env` to use your GoDaddy email
   - Example: `F&D Staging <info@fanddstaging.com>`
   - Make sure to verify this email in Resend

### Option 2: Use Resend with GoDaddy Domain

1. **Add Domain to Resend:**

   - Go to [resend.com](https://resend.com)
   - Navigate to **Domains**
   - Click "Add Domain"
   - Enter `fanddstaging.com`

2. **Add DNS Records in GoDaddy:**
   - Resend will provide DNS records to add:
     - **SPF Record** (TXT)
     - **DKIM Records** (TXT)
     - **DMARC Record** (TXT)
3. **Add Records in GoDaddy:**

   - Go to **DNS** settings
   - Add each TXT record provided by Resend
   - Wait for verification (usually 5-10 minutes)

4. **Update Environment Variables:**
   ```env
   RESEND_FROM_EMAIL=F&D Staging <info@fanddstaging.com>
   ```

### Option 3: Use GoDaddy Workspace Email

If you have GoDaddy Workspace (formerly Office 365):

1. **Configure SMTP Settings:**

   - SMTP Server: `smtp.office365.com`
   - Port: 587
   - Security: TLS
   - Username: `info@fanddstaging.com`
   - Password: Your email password

2. **Update Contact Form:**
   - You may need to use a different email service or configure SMTP directly
   - Consider using Nodemailer or similar for SMTP

---

## Deployment Options

### Recommended: Vercel (Best for Next.js)

**Pros:**

- Built by Next.js creators
- Automatic deployments from GitHub
- Free SSL certificates
- Global CDN
- Serverless functions included
- Easy GoDaddy integration

**Setup:**

1. Deploy to Vercel (see Domain DNS Configuration section)
2. Connect GoDaddy domain
3. SSL is automatic

### Alternative: Netlify

**Pros:**

- Great Next.js support
- Free tier available
- Automatic SSL
- Easy domain management

**Setup:**

1. Deploy to Netlify
2. Connect GoDaddy domain
3. SSL is automatic

### Alternative: GoDaddy Hosting (Not Recommended)

**Note**: GoDaddy's shared hosting doesn't support Next.js well. You would need:

- GoDaddy Managed WordPress (not suitable for Next.js)
- GoDaddy VPS/Dedicated Server (requires manual setup)
- GoDaddy cPanel hosting (limited Node.js support)

**If you must use GoDaddy hosting:**

1. You'll need a VPS or dedicated server
2. Install Node.js and npm
3. Set up PM2 or similar process manager
4. Configure reverse proxy (Nginx)
5. Set up SSL certificate
6. Configure domain DNS

**This is complex and not recommended for Next.js apps.**

---

## SSL/HTTPS Configuration

### Automatic SSL (Vercel/Netlify)

Both Vercel and Netlify provide **automatic SSL certificates** via Let's Encrypt:

- SSL is automatically provisioned when you connect your domain
- Certificates auto-renew
- No configuration needed

### Manual SSL (If using other hosting)

If you're using a different hosting provider:

1. **Let's Encrypt (Free):**

   - Use Certbot to generate certificates
   - Auto-renewal setup required

2. **GoDaddy SSL Certificate:**

   - Purchase SSL from GoDaddy
   - Install on your server
   - Configure in your hosting panel

3. **Update Next.js Config:**
   - Ensure `next.config.js` has proper headers (already configured)
   - Force HTTPS redirects if needed

---

## Troubleshooting

### DNS Not Working

**Problem**: Domain not resolving after 24 hours

**Solutions:**

1. Check DNS records are correct in GoDaddy
2. Use [DNS Checker](https://dnschecker.org) to verify propagation
3. Clear DNS cache: `sudo dscacheutil -flushcache` (Mac) or `ipconfig /flushdns` (Windows)
4. Verify records match hosting provider requirements
5. Check for conflicting records

### SSL Certificate Issues

**Problem**: "Not Secure" warning in browser

**Solutions:**

1. Wait 24-48 hours for SSL to provision (Vercel/Netlify)
2. Check SSL status in hosting dashboard
3. Verify DNS records are correct
4. Ensure domain is properly connected
5. Check for mixed content (HTTP resources on HTTPS page)

### Email Not Sending

**Problem**: Contact form emails not being received

**Solutions:**

1. Verify `RESEND_API_KEY` is set correctly
2. Check Resend dashboard for errors
3. Verify domain DNS records (SPF, DKIM, DMARC) if using custom domain
4. Check spam folder
5. Verify `RESEND_FROM_EMAIL` matches verified domain
6. Check Resend API logs

### Deployment Issues

**Problem**: Build fails or site doesn't deploy

**Solutions:**

1. Check build logs in hosting dashboard
2. Verify all environment variables are set
3. Ensure `package.json` has correct build scripts
4. Check Node.js version compatibility
5. Verify all dependencies are in `package.json`
6. Check for TypeScript/ESLint errors

---

## Quick Start Checklist

- [ ] Choose hosting provider (Vercel recommended)
- [ ] Deploy website to hosting
- [ ] Add environment variables
- [ ] Connect GoDaddy domain in hosting dashboard
- [ ] Update DNS records in GoDaddy
- [ ] Wait for DNS propagation (24-48 hours)
- [ ] Verify SSL certificate is active
- [ ] Set up email (Resend or GoDaddy email)
- [ ] Test contact form
- [ ] Test all pages load correctly
- [ ] Verify mobile responsiveness

---

## Additional Resources

- [Vercel Domain Documentation](https://vercel.com/docs/concepts/projects/domains)
- [GoDaddy DNS Help](https://www.godaddy.com/help/manage-dns-records-680)
- [Resend Domain Setup](https://resend.com/docs/dashboard/domains/introduction)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## Support

If you encounter issues:

1. Check hosting provider documentation
2. Check GoDaddy DNS documentation
3. Review error logs in hosting dashboard
4. Verify all DNS records are correct
5. Contact hosting provider support if needed
