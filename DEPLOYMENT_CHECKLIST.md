# GoDaddy Integration - Quick Deployment Checklist

Use this checklist alongside `GODADDY_INTEGRATION.md` to complete your setup.

## Pre-Deployment

- [ ] Code is pushed to GitHub repository
- [ ] All environment variables documented in `.env.example`
- [ ] Tested locally with `npm run build` and `npm run start`
- [ ] All pages load correctly
- [ ] Contact form tested
- [ ] Images optimized and loading correctly

## Step 1: Choose Hosting Provider

**Recommended: Vercel** (Best for Next.js)

- [ ] Create Vercel account at [vercel.com](https://vercel.com)
- [ ] Connect GitHub account
- [ ] Import repository
- [ ] Configure build settings:
  - [ ] Framework: Next.js
  - [ ] Build Command: `npm run build` (default)
  - [ ] Output Directory: `.next` (default)
  - [ ] Install Command: `npm install` (default)

## Step 2: Environment Variables

Add these in your hosting provider's dashboard:

- [ ] `RESEND_API_KEY` - Get from [resend.com/api-keys](https://resend.com/api-keys)
- [ ] `RESEND_FROM_EMAIL` - Set to `F&D Staging <dhwang1129@gmail.com>`
- [ ] `CONTACT_EMAIL` - Set to `dhwang1129@gmail.com`

## Step 3: Initial Deployment

- [ ] Deploy to hosting provider
- [ ] Verify build succeeds
- [ ] Test site on provided URL (e.g., `your-site.vercel.app`)
- [ ] Test contact form
- [ ] Verify all pages load

## Step 4: Connect GoDaddy Domain

### In Hosting Dashboard (Vercel/Netlify):

- [ ] Go to Domain settings
- [ ] Add custom domain: `fanddstaging.com`
- [ ] Add custom domain: `www.fanddstaging.com`
- [ ] Copy DNS records provided

### In GoDaddy Dashboard:

- [ ] Log in to [godaddy.com](https://www.godaddy.com)
- [ ] Go to **My Products** → **Domains**
- [ ] Click **DNS** next to `fanddstaging.com`
- [ ] Remove conflicting A/CNAME records (if any)
- [ ] Add A record for apex domain (from hosting provider)
- [ ] Add CNAME record for www subdomain (from hosting provider)
- [ ] Save changes

## Step 5: Email Setup

### Option A: Use Resend (Recommended)

- [ ] Log in to [resend.com](https://resend.com)
- [ ] Go to **Domains**
- [ ] Click **Add Domain**
- [ ] Enter `fanddstaging.com`
- [ ] Copy DNS records provided (SPF, DKIM, DMARC)
- [ ] In GoDaddy DNS, add TXT records:
  - [ ] SPF record
  - [ ] DKIM records (usually 2-3)
  - [ ] DMARC record
- [ ] Wait for verification (5-10 minutes)
- [ ] Verify domain status shows "Verified" in Resend

### Option B: Use GoDaddy Email

- [ ] Set up GoDaddy Workspace/Email
- [ ] Add MX records in GoDaddy DNS
- [ ] Update `RESEND_FROM_EMAIL` to use GoDaddy SMTP (if needed)

## Step 6: SSL Certificate

- [ ] Wait 24-48 hours for automatic SSL provisioning
- [ ] Verify SSL is active (check hosting dashboard)
- [ ] Test site loads with `https://fanddstaging.com`
- [ ] Test site loads with `https://www.fanddstaging.com`
- [ ] Check for "Not Secure" warnings

## Step 7: DNS Propagation

- [ ] Wait 24-48 hours for DNS to fully propagate
- [ ] Check DNS propagation: [dnschecker.org](https://dnschecker.org)
- [ ] Test domain resolves: `ping fanddstaging.com`
- [ ] Clear local DNS cache if needed

## Step 8: Final Testing

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Portfolio page loads
- [ ] Services page loads
- [ ] Contact page loads
- [ ] Contact form submits successfully
- [ ] Email received from contact form
- [ ] Mobile responsive on all pages
- [ ] Images load correctly
- [ ] Video loads on homepage
- [ ] Reviews section displays
- [ ] Footer links work
- [ ] Social media links work

## Step 9: SEO & Verification

- [ ] Submit sitemap to Google Search Console: `https://fanddstaging.com/sitemap.xml`
- [ ] Verify site in Google Search Console
- [ ] Test robots.txt: `https://fanddstaging.com/robots.txt`
- [ ] Verify structured data (use Google Rich Results Test)
- [ ] Check Open Graph tags (use Facebook Sharing Debugger)
- [ ] Test Twitter Card preview

## Step 10: Monitoring

- [ ] Set up uptime monitoring (optional)
- [ ] Configure error tracking (optional)
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Bookmark hosting dashboard
- [ ] Bookmark GoDaddy DNS settings

## Troubleshooting Quick Reference

**Domain not working?**
- Check DNS records match hosting provider
- Wait 24-48 hours for propagation
- Clear DNS cache
- Verify records with [dnschecker.org](https://dnschecker.org)

**SSL not working?**
- Wait 24-48 hours for automatic provisioning
- Check domain is verified in hosting dashboard
- Verify DNS records are correct

**Email not sending?**
- Check Resend API key is correct
- Verify domain DNS records (SPF, DKIM, DMARC)
- Check Resend dashboard for errors
- Verify email in spam folder

**Build failing?**
- Check environment variables are set
- Review build logs
- Verify Node.js version compatibility
- Check for TypeScript/ESLint errors

## Important URLs to Bookmark

- Vercel Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- GoDaddy DNS: [dns.godaddy.com](https://dns.godaddy.com)
- Resend Dashboard: [resend.com/domains](https://resend.com/domains)
- Google Search Console: [search.google.com/search-console](https://search.google.com/search-console)
- DNS Checker: [dnschecker.org](https://dnschecker.org)

---

**Estimated Time:** 2-4 hours (plus 24-48 hours for DNS/SSL propagation)

**Need Help?** Refer to `GODADDY_INTEGRATION.md` for detailed instructions.

