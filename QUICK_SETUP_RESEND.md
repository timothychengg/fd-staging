# Quick Setup: Resend API Key for Production

Follow these steps to get your contact form working in production:

## Step 1: Get a Resend API Key

1. **Sign up for Resend** (free account):
   - Go to [https://resend.com](https://resend.com)
   - Click "Sign Up" or "Get Started"
   - Sign up with your email (you can use `dhwang1129@gmail.com`)

2. **Create an API Key**:
   - After logging in, go to [https://resend.com/api-keys](https://resend.com/api-keys)
   - Click **"Create API Key"**
   - Give it a name like "F&D Staging Website"
   - Set permissions to **"Sending access"** (or "Full access" if available)
   - Click **"Add"**
   - **Important**: Copy the API key immediately - it starts with `re_` and you won't be able to see it again!
   - It will look like: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## Step 2: Add API Key to Vercel

1. **Go to your Vercel project**:
   - Log in to [https://vercel.com](https://vercel.com)
   - Navigate to your F&D Staging project

2. **Add Environment Variables**:
   - Click on **Settings** tab
   - Click on **Environment Variables** in the left sidebar
   - You'll see three environment variables to add:

   **Variable 1: RESEND_API_KEY**
   - **Key**: `RESEND_API_KEY`
   - **Value**: Paste your API key (the one starting with `re_`)
   - **Environment**: Select **Production**, **Preview**, and **Development** (or just **Production** if you only want it for production)
   - Click **"Save"**

   **Variable 2: RESEND_FROM_EMAIL**
   - **Key**: `RESEND_FROM_EMAIL`
   - **Value**: `F&D Staging <onboarding@resend.dev>`
   - **Environment**: Select all environments (Production, Preview, Development)
   - Click **"Save"**

   **Variable 3: CONTACT_EMAIL** (Optional - already defaults to dhwang1129@gmail.com)
   - **Key**: `CONTACT_EMAIL`
   - **Value**: `dhwang1129@gmail.com`
   - **Environment**: Select all environments
   - Click **"Save"**

3. **Redeploy your application**:
   - Go to **Deployments** tab
   - Click the **"..."** (three dots) on the latest deployment
   - Click **"Redeploy"**
   - Or trigger a new deployment by pushing to your GitHub repo

## Step 3: Test the Form

1. Go to your production website
2. Navigate to the contact page
3. Fill out and submit the form
4. Check your email at `dhwang1129@gmail.com`
5. Also check your spam/junk folder

## Step 4: Verify It's Working

After submitting the form, check:

1. **Vercel Function Logs**:
   - Go to Vercel → Your Project → Deployments → Latest Deployment
   - Click **Functions** tab
   - Click on `/api/contact`
   - Look for: `✅ Email sent successfully` (should see this if working)
   - If you see `⚠️ RESEND_API_KEY is not configured`, the key wasn't set correctly

2. **Resend Dashboard**:
   - Go to [resend.com](https://resend.com) → **Logs** or **Emails**
   - You should see your email listed there
   - Check the status (should be "Delivered" or "Sent")

## Troubleshooting

### "API key not configured" in logs
- Make sure you added `RESEND_API_KEY` to Vercel environment variables
- Make sure you redeployed after adding the environment variable
- Check that the API key starts with `re_`

### Still not receiving emails
- Check spam/junk folder
- Check Resend dashboard logs to see if email was sent
- Verify `CONTACT_EMAIL` is set to `dhwang1129@gmail.com`
- Check Vercel function logs for error messages

### Need help?
- Check the detailed troubleshooting guide: `CONTACT_FORM_TROUBLESHOOTING.md`
- Check Resend documentation: [https://resend.com/docs](https://resend.com/docs)

