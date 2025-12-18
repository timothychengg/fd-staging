# How to Get Your Correct Google Place ID

Your current Place ID appears to be URL-encoded or from a Google Maps share link. Here's how to get the correct one:

## Method 1: Using Google's Place ID Finder (Easiest)

1. Go to: https://developers.google.com/maps/documentation/places/web-service/place-id
2. Scroll down to the "Place ID Finder" tool
3. Search for your business name (e.g., "F&D Staging")
4. Click on your business in the results
5. Copy the Place ID that appears (it will look like: `ChIJN1t_tDeuEmsRUsoyG83frY4`)

## Method 2: From Google Maps URL

1. Go to https://www.google.com/maps
2. Search for your business
3. Click on your business listing
4. Look at the URL - it will have a format like:
   ```
   https://www.google.com/maps/place/F%26D+Staging/@37.7749,-122.4194,17z/data=!3m1!4b1!4m6!3m5!1s0x0:0x0!8m2!3d37.7749!4d-122.4194!16s%2Fg%2F11abc123xyz
   ```
5. The Place ID is the part after `!16s%2Fg%2F` - but you need to decode it
6. OR better: Right-click on your business name in the left panel
7. Select "What's here?"
8. The Place ID will appear in the search box

## Method 3: Using Google Business Profile

1. Go to https://business.google.com/
2. Select your business
3. The Place ID might be visible in the business details
4. Or check the "Share" link which may contain it

## What a Place ID Should Look Like

A valid Place ID is a long string of letters, numbers, and sometimes special characters:

- Example: `ChIJN1t_tDeuEmsRUsoyG83frY4`
- Example: `0x80859a6d00690021:0x4a501367f076adff`

**It should NOT look like:**

- `s%2Fg%2F11l1fbzcss` (this is URL-encoded)
- A full Google Maps URL
- A share link

## After Getting Your Place ID

1. Update your `.env.local` file:

   ```env
   GOOGLE_PLACE_ID=ChIJN1t_tDeuEmsRUsoyG83frY4
   ```

   (Replace with your actual Place ID)

2. Make sure you've enabled "Places API (New)" in Google Cloud Console:

   - Go to: https://console.cloud.google.com/apis/library
   - Search for: "Places API (New)"
   - Click "Enable"

3. Restart your dev server:
   ```bash
   npm run dev
   ```
