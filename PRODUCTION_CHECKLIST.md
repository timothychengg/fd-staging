# Production Deployment Checklist

## Pre-Deployment

### Environment Variables

- [ ] Set `GOOGLE_PLACES_API_KEY` in production environment
- [ ] Set `GOOGLE_PLACE_ID` in production environment
- [ ] Verify API key has proper restrictions (HTTP referrer, IP, etc.)
- [ ] Ensure "Places API (New)" is enabled in Google Cloud Console

### Build & Testing

- [ ] Run `npm run build` successfully
- [ ] Test production build locally: `npm run build && npm start`
- [ ] Verify all pages load correctly
- [ ] Test API route `/api/reviews` returns data or graceful fallback
- [ ] Check browser console for errors
- [ ] Test responsive design on mobile/tablet/desktop

### SEO & Metadata

- [ ] Verify all pages have proper metadata
- [ ] Check sitemap includes all pages (including `/reviews`)
- [ ] Verify robots.txt is properly configured
- [ ] Test Open Graph images and metadata
- [ ] Verify canonical URLs are correct

### Security

- [ ] All external links have `rel="noopener noreferrer"`
- [ ] API routes handle errors gracefully
- [ ] No sensitive data exposed in client-side code
- [ ] Environment variables are not exposed to client
- [ ] Security headers are configured (already in `next.config.js`)

### Performance

- [ ] Images are optimized (WebP/AVIF formats)
- [ ] Video files are compressed appropriately
- [ ] Fonts are properly loaded with `display: swap`
- [ ] No unnecessary console.log statements (removed in production)
- [ ] Bundle size is reasonable (check build output)

### Content

- [ ] All images have alt text
- [ ] All links are working
- [ ] Contact form is functional (if applicable)
- [ ] Phone numbers and emails are correct
- [ ] Social media links are correct (if applicable)

## Deployment

### Platform-Specific (Vercel/Netlify/etc.)

- [ ] Set environment variables in hosting platform
- [ ] Configure custom domain
- [ ] Set up SSL certificate (usually automatic)
- [ ] Configure redirects if needed
- [ ] Set up analytics (if applicable)

### Post-Deployment

- [ ] Test site on production URL
- [ ] Verify Google Reviews are loading (or fallback is working)
- [ ] Test all navigation links
- [ ] Check mobile responsiveness
- [ ] Test page load speeds
- [ ] Verify sitemap.xml is accessible
- [ ] Verify robots.txt is accessible
- [ ] Submit sitemap to Google Search Console
- [ ] Test contact form (if applicable)

## Monitoring

### Recommended Tools

- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Monitor API rate limits for Google Places API
- [ ] Set up uptime monitoring

## Files to Exclude from Production

The following files are for development/testing only:

- `test-reviews-api.js` - Testing script (not included in build)
- `GET_PLACE_ID.md` - Documentation (safe to include)
- `.env.local` - Never commit (already in .gitignore)
- `.env.example` - Safe to include (no secrets)

## Notes

- Console errors in production are automatically removed by Next.js config
- API routes gracefully handle missing environment variables
- Fallback reviews display if Google API is not configured
- All pages are statically generated where possible for performance
- Dynamic routes (`/reviews`, `/api/reviews`) are server-rendered
