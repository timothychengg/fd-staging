# Contact Form Troubleshooting Guide

If contact form submissions aren't reaching your email, follow these steps:

## Step 1: Check Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Verify these variables are set:
   - `RESEND_API_KEY` - Should start with `re_`
   - `CONTACT_EMAIL` - Should be `dhwang1129@gmail.com` (or leave unset to use default)
   - `RESEND_FROM_EMAIL` - Should be `F&D Staging <onboarding@resend.dev>` (for testing) or your verified domain

4. **Important**: After adding/changing environment variables:
   - Click "Redeploy" or trigger a new deployment
   - Environment variables only take effect after a new deployment

## Step 2: Check Vercel Function Logs

1. Go to your Vercel project
2. Click on **Deployments** tab
3. Click on the latest deployment
4. Click **Functions** tab
5. Look for `/api/contact` function
6. Check the logs for:
   - `⚠️ RESEND_API_KEY is not configured` - Means API key is missing
   - `❌ Resend API error` - Shows the actual error from Resend
   - `✅ Email sent successfully` - Confirms email was sent
   - `📧 Attempting to send email` - Shows email details before sending

## Step 3: Verify Resend API Key

1. Go to [resend.com](https://resend.com) and log in
2. Navigate to **API Keys**
3. Verify your API key exists and is active
4. Copy the API key (starts with `re_`)
5. Verify it matches what's in Vercel environment variables

## Step 4: Check Resend Email Logs

1. Go to [resend.com](https://resend.com)
2. Navigate to **Logs** or **Emails**
3. Check if emails are being sent:
   - If you see emails but they're marked as "Failed", check the error message
   - If you don't see any emails, the API isn't being called or API key is wrong

## Step 5: Common Issues and Solutions

### Issue: "RESEND_API_KEY is not configured"
**Solution**: 
- Add `RESEND_API_KEY` to Vercel environment variables
- Redeploy your application

### Issue: "Domain not verified" or "From email not verified"
**Solution**: 
- For testing: Use `F&D Staging <onboarding@resend.dev>` as `RESEND_FROM_EMAIL`
- For production: Verify your domain in Resend and use your domain email

**Note**: You CANNOT use `dhwang1129@gmail.com` as the `from` email. Gmail addresses cannot be used as sender addresses in Resend. You must use:
- `onboarding@resend.dev` (for testing)
- A verified domain email like `info@fanddstaging.com` (after domain verification)

### Issue: Emails sent but not received
**Solutions**:
- Check spam/junk folder
- Verify `CONTACT_EMAIL` is set correctly in Vercel
- Check Resend logs to confirm recipient email address
- The email might be going to spam - check your spam filter

### Issue: Form shows success but no email
**Check**:
1. Vercel function logs (Step 2 above)
2. Resend dashboard logs (Step 4 above)
3. Verify environment variables are set correctly

## Step 6: Test the Form

After making changes:

1. Submit a test form on your production site
2. Immediately check Vercel function logs
3. Check Resend dashboard logs
4. Check your email inbox (and spam folder)

## Quick Verification Checklist

- [ ] `RESEND_API_KEY` is set in Vercel (starts with `re_`)
- [ ] `CONTACT_EMAIL` is set to `dhwang1129@gmail.com` (or default will be used)
- [ ] `RESEND_FROM_EMAIL` is set to `F&D Staging <onboarding@resend.dev>` (for testing)
- [ ] Application has been redeployed after setting environment variables
- [ ] Resend API key is active in Resend dashboard
- [ ] Checked Vercel function logs after form submission
- [ ] Checked Resend dashboard logs
- [ ] Checked spam/junk folder

## Still Not Working?

If you've checked all the above:

1. Take a screenshot of:
   - Vercel environment variables (hide the actual API key value)
   - Vercel function logs from a form submission
   - Resend dashboard logs

2. Common final checks:
   - Make sure you're testing on the production URL (not localhost)
   - Verify the form is actually calling `/api/contact` (check browser network tab)
   - Check if there are any CORS or network errors in browser console

