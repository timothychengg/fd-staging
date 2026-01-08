# Image Optimization Troubleshooting

## Issue: "upstream image response failed" or "ResponseAborted" Errors

These errors occur when Next.js tries to optimize images during development. They're typically non-fatal - images will still load, just without optimization.

### Quick Fix

1. **Clear the Next.js cache:**
   ```bash
   npm run clear-cache
   ```

2. **Or manually clear the cache:**
   ```bash
   rm -rf .next/cache
   ```

3. **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C) then:
   npm run dev
   ```

### Why This Happens

- Next.js optimizes images on-demand during development
- Sometimes the optimization process gets interrupted or times out
- This is more common with large images or when many images are loaded at once
- The cache can become corrupted

### Solutions

#### Option 1: Clear Cache (Recommended)
Run `npm run clear-cache` and restart your dev server.

#### Option 2: Disable Image Optimization (Development Only)
If errors persist, you can temporarily disable optimization in development:

1. Create or update `.env.local`:
   ```
   DISABLE_IMAGE_OPTIMIZATION=true
   ```

2. Update `next.config.js` to use this flag (already configured)

3. Restart the dev server

**Note:** This should only be used in development. Production builds will still optimize images.

#### Option 3: Check Image Files
Ensure your image files are valid:

```bash
# Check if images are corrupted
file public/*.webp
file public/*.jpg
```

If images are corrupted, re-export them.

### Production

These errors typically don't occur in production because:
- Images are optimized during build time
- The build process is more stable
- Cached optimized images are used

### Best Practices

1. **Use WebP format** - Better compression and faster loading
2. **Optimize images before adding** - Use tools like `sharp` or online optimizers
3. **Don't use extremely large images** - Resize to appropriate dimensions first
4. **Clear cache regularly** - Especially after adding many new images

### Monitoring

If errors persist:
1. Check the image file sizes - very large files (>5MB) may cause issues
2. Verify image formats are supported (WebP, JPEG, PNG, AVIF)
3. Check disk space - optimization requires temporary storage
4. Review Next.js version - update if using an older version

### Related Files

- `next.config.js` - Image optimization configuration
- `components/OptimizedImage.js` - Custom image component with error handling
- `lib/imageErrorHandler.js` - Image error handling utilities

