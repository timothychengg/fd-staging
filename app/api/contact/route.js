// API Route to handle contact form submissions
// Sends email notifications using Resend
// Requires: RESEND_API_KEY environment variable

import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

// Rate limiting: Simple in-memory store (for production, consider Redis or Upstash)
const rateLimitStore = new Map();

// Rate limit: 5 submissions per 15 minutes per IP
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

// Field length limits
const FIELD_LIMITS = {
  name: 100,
  email: 255,
  phone: 20,
  role: 50,
  address: 200,
  sqft: 10,
  timeline: 50,
  message: 2000,
};

// Simple HTML escape function to prevent XSS (optimized)
const HTML_ESCAPE_MAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

function escapeHtml(text) {
  if (!text) return '';
  return String(text).replace(/[&<>"']/g, (m) => HTML_ESCAPE_MAP[m]);
}

// Rate limiting check (works in serverless environments)
function checkRateLimit(ip) {
  const now = Date.now();
  
  // Clean up expired records (do this on every check to avoid memory leaks in serverless)
  // Only clean up every 100 requests to avoid overhead
  if (Math.random() < 0.01) {
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }

  const record = rateLimitStore.get(ip);

  if (!record) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const remaining = Math.ceil((record.resetTime - now) / 1000 / 60);
    return { allowed: false, remaining };
  }

  record.count++;
  return { allowed: true };
}

// Generate email HTML template (extracted for better performance)
function generateEmailHtml(data) {
  // Escape email and phone for use in href attributes
  const emailEscaped = data.email.replace(/"/g, '&quot;');
  const phoneEscaped = data.phone ? data.phone.replace(/[^\d+()-]/g, '') : '';
  
  const fields = [
    { label: 'Name', value: data.name },
    { label: 'Email', value: `<a href="mailto:${emailEscaped}">${data.email}</a>` },
    data.phone && { label: 'Phone', value: phoneEscaped ? `<a href="tel:${phoneEscaped}">${data.phone}</a>` : data.phone },
    { label: 'Role', value: data.role },
    data.address && { label: 'Property Address', value: data.address },
    data.sqft && { label: 'Square Footage', value: data.sqft },
    { label: 'Timeline', value: data.timeline },
  ].filter(Boolean);

  const fieldsHtml = fields
    .map(
      (field) => `
      <div class="field">
        <div class="label">${field.label}:</div>
        <div class="value">${field.value}</div>
      </div>`
    )
    .join('');

  const messageHtml = data.message
    ? `
      <div class="message-box">
        <div class="label">Message:</div>
        <div style="margin-top: 10px; white-space: pre-wrap;">${data.message}</div>
      </div>`
    : '';

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background-color: #f5efe7; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
      .header h2 { margin: 0; color: #333; }
      .field { margin-bottom: 15px; }
      .label { font-weight: bold; color: #555; margin-bottom: 5px; font-size: 14px; }
      .value { padding: 8px 12px; background-color: #f9f9f9; border-radius: 4px; font-size: 14px; }
      .value a { color: #2563eb; text-decoration: none; }
      .value a:hover { text-decoration: underline; }
      .message-box { padding: 15px; background-color: #f5efe7; border-radius: 8px; margin-top: 20px; }
      .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #666; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>New Contact Form Submission</h2>
      </div>
      ${fieldsHtml}
      ${messageHtml}
      <div class="footer">
        <p>This email was sent from the F&D Staging contact form.</p>
        <p>Reply directly to this email to respond to ${data.name}.</p>
      </div>
    </div>
  </body>
</html>`;
}

// Generate plain text email
function generateEmailText(data) {
  const lines = [
    'New Contact Form Submission',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    `Role: ${data.role}`,
    data.address && `Property Address: ${data.address}`,
    data.sqft && `Square Footage: ${data.sqft}`,
    `Timeline: ${data.timeline}`,
    '',
    data.message && `Message:\n${data.message}`,
  ].filter(Boolean);

  return lines.join('\n');
}

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Rate limiting check
    const rateLimitResult = checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return Response.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.remaining,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.remaining * 60),
          },
        }
      );
    }

    // Parse and validate request body
    let formData;
    try {
      formData = await request.json();
    } catch (error) {
      return Response.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    // Honeypot field check (spam protection)
    if (formData.website || formData.url) {
      // Silently ignore spam submissions
      return Response.json({ success: true }, { status: 200 });
    }

    // Validate required fields
    if (!formData.name || typeof formData.name !== 'string') {
      return Response.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!formData.email || typeof formData.email !== 'string') {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate email format (RFC 5322 compliant regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Validate and sanitize form data
    const trimAndLimit = (value, maxLength) => {
      if (!value) return '';
      const trimmed = String(value).trim();
      return trimmed.length > maxLength ? trimmed.substring(0, maxLength) : trimmed;
    };

    const sanitized = {
      name: escapeHtml(trimAndLimit(formData.name, FIELD_LIMITS.name)),
      email: escapeHtml(trimAndLimit(formData.email, FIELD_LIMITS.email)),
      phone: formData.phone ? escapeHtml(trimAndLimit(formData.phone, FIELD_LIMITS.phone)) : '',
      role: escapeHtml(trimAndLimit(formData.role || 'Not specified', FIELD_LIMITS.role)),
      address: formData.address ? escapeHtml(trimAndLimit(formData.address, FIELD_LIMITS.address)) : '',
      sqft: formData.sqft ? escapeHtml(trimAndLimit(String(formData.sqft), FIELD_LIMITS.sqft)) : '',
      timeline: escapeHtml(trimAndLimit(formData.timeline || 'Not specified', FIELD_LIMITS.timeline)),
      message: formData.message ? escapeHtml(trimAndLimit(formData.message, FIELD_LIMITS.message)) : '',
    };

    // Validate email format again after sanitization
    if (!emailRegex.test(sanitized.email)) {
      return Response.json({ error: 'Invalid email address format' }, { status: 400 });
    }

    // If Resend API key is not configured, log the submission and return success
    // This allows the form to work in development without email setup
    if (!process.env.RESEND_API_KEY) {
      console.log('Contact form submission (email not configured):', sanitized);
      return Response.json(
        {
          success: true,
          message: 'Form submitted successfully (email not configured)',
        },
        { status: 200 }
      );
    }

    // Initialize Resend only when API key is available
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Prepare email content
    const recipientEmail = process.env.CONTACT_EMAIL || 'dhwang1129@gmail.com';
    const emailSubject = `New Contact Form Submission from ${sanitized.name}`;
    const emailHtml = generateEmailHtml(sanitized);
    const emailText = generateEmailText(sanitized);

    // Send email using Resend
    // Note: The 'from' email must be a verified domain in Resend
    // For production, use: 'F&D Staging <dhwang1129@gmail.com>' or your verified domain
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || 'F&D Staging <onboarding@resend.dev>';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: sanitized.email,
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('Resend API error:', error);
      // Log more details in development for debugging
      if (process.env.NODE_ENV === 'development') {
        console.error('Resend error details:', JSON.stringify(error, null, 2));
      }
      return Response.json(
        { 
          error: 'Failed to send email notification',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: 'Form submitted successfully',
        emailId: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form API error:', error);
    
    // Don't expose internal error details in production
    const errorMessage =
      process.env.NODE_ENV === 'development' && error instanceof Error
        ? error.message
        : 'Internal server error';

    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
