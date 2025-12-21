# Contact Form Setup Guide

The contact form is now fully functional and ready to send emails using Resend.

## Quick Setup

### 1. Get a Resend API Key

1. Sign up for a free account at [resend.com](https://resend.com)
2. Go to your dashboard and create an API key
3. Copy the API key (starts with `re_`)

### 2. Configure Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist) and add:

```bash
# Required: Your Resend API key
RESEND_API_KEY=re_your_api_key_here

# Optional: Custom from email (must be a verified domain in Resend)
# Default: F&D Staging <onboarding@resend.dev>
RESEND_FROM_EMAIL=F&D Staging <info@fanddstaging.com>

# Optional: Recipient email for contact form submissions
# Default: info@fanddstaging.com
CONTACT_EMAIL=info@fanddstaging.com
```

### 3. Verify Your Domain (Recommended for Production)

For production use, you should verify your domain in Resend:

1. Go to Resend Dashboard → Domains
2. Add your domain (`fanddstaging.com`)
3. Add the DNS records provided by Resend to your domain's DNS settings
4. Once verified, update `RESEND_FROM_EMAIL` to use your domain:
   ```bash
   RESEND_FROM_EMAIL=F&D Staging <info@fanddstaging.com>
   ```

### 4. Test the Form

1. Start your development server: `npm run dev`
2. Navigate to `/contact`
3. Fill out and submit the form
4. Check your email inbox (or Resend dashboard for logs)

## How It Works

- **Without API Key**: Form submissions are logged to the console and return success (useful for development)
- **With API Key**: Form submissions send formatted HTML emails to the configured recipient

## Email Template

The email includes:

- Contact information (name, email, phone)
- Role (Real estate agent, Homeowner, etc.)
- Property details (address, square footage)
- Timeline preference
- Custom message

All emails are sent with the submitter's email as the reply-to address for easy responses.

## Troubleshooting

- **Emails not sending**: Check that `RESEND_API_KEY` is set correctly
- **Domain not verified**: Use the default `onboarding@resend.dev` for testing, or verify your domain
- **Emails going to spam**: Verify your domain and set up SPF/DKIM records in Resend
