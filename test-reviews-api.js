// Quick test script to verify Google Reviews API is working
// Run with: node test-reviews-api.js
// Note: Requires Node.js 18+ for built-in fetch

const { readFileSync } = require('fs');
const { join } = require('path');

// Read .env.local file
let apiKey, placeId;
try {
  const envContent = readFileSync(join(__dirname, '.env.local'), 'utf8');
  const lines = envContent.split('\n');

  for (const line of lines) {
    if (line.startsWith('GOOGLE_PLACES_API_KEY=')) {
      apiKey = line.split('=')[1]?.trim();
    }
    if (line.startsWith('GOOGLE_PLACE_ID=')) {
      placeId = line.split('=')[1]?.trim();
    }
  }
} catch (error) {
  console.error('❌ Error reading .env.local file:', error.message);
  process.exit(1);
}

console.log('Testing Google Reviews API Integration...\n');

if (!apiKey || !placeId) {
  console.error(
    '❌ Error: GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID not found in .env.local'
  );
  console.log('\nMake sure you have:');
  console.log('1. Created .env.local file');
  console.log('2. Added GOOGLE_PLACES_API_KEY=your_key');
  console.log('3. Added GOOGLE_PLACE_ID=your_place_id');
  process.exit(1);
}

// Clean Place ID
try {
  placeId = placeId.split('?')[0].split('&')[0];
  placeId = decodeURIComponent(placeId);
  placeId = placeId.trim();
} catch (e) {
  placeId = placeId.split('?')[0].split('&')[0].trim();
}

console.log('✓ Environment variables found');
console.log(`  API Key: ${apiKey.substring(0, 10)}...`);
console.log(`  Place ID: ${placeId.substring(0, 50)}...`);
console.log(`  (Length: ${placeId.length} characters)\n`);

// Validate Place ID format
if (placeId.includes('%') || placeId.includes('?') || placeId.includes('&')) {
  console.log(
    '⚠️  WARNING: Place ID may still be URL-encoded or contain query parameters'
  );
  console.log(
    '   This might cause API errors. See GET_PLACE_ID.md for help.\n'
  );
}

// Try new Places API first
const newApiUrl = `https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName,rating,userRatingCount,reviews`;

console.log('Trying new Places API (New)...\n');

fetch(newApiUrl, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews',
  },
})
  .then(async (response) => {
    if (response.ok) {
      return response.json().then((data) => {
        console.log('✅ Success with new Places API!\n');
        console.log(`Business: ${data.displayName || 'N/A'}`);
        console.log(`Rating: ${data.rating || 'N/A'}/5`);
        console.log(`Total Reviews: ${data.userRatingCount || 0}`);
        console.log(`Reviews Retrieved: ${data.reviews?.length || 0}\n`);

        if (data.reviews && data.reviews.length > 0) {
          console.log('Sample review:');
          const firstReview = data.reviews[0];
          console.log(
            `  Author: ${
              firstReview.authorAttribution?.displayName || 'Anonymous'
            }`
          );
          console.log(`  Rating: ${firstReview.rating}/5`);
          console.log(
            `  Text: ${firstReview.text?.text?.substring(0, 100) || 'N/A'}...`
          );
        } else {
          console.log('⚠️  No reviews found for this place ID');
        }
      });
    } else {
      // Get error details
      const errorData = await response.json().catch(() => ({}));
      console.log('❌ New Places API Error:');
      console.log(`   Status: ${response.status}`);
      if (errorData.error) {
        console.log(
          `   Message: ${errorData.error.message || 'Unknown error'}`
        );
        if (errorData.error.status === 'PERMISSION_DENIED') {
          console.log(
            '\n⚠️  You need to enable "Places API (New)" in Google Cloud Console'
          );
          console.log(
            '   Go to: https://console.cloud.google.com/apis/library'
          );
          console.log('   Search for: "Places API (New)" and enable it');
        }
      }

      // Fallback to legacy API
      console.log('\nTrying legacy API as fallback...\n');
      const legacyUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`;

      return fetch(legacyUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'OK') {
            console.log('✅ Success with legacy Places API!\n');
            console.log(`Business: ${data.result?.name || 'N/A'}`);
            console.log(`Rating: ${data.result?.rating || 'N/A'}/5`);
            console.log(
              `Total Reviews: ${data.result?.user_ratings_total || 0}`
            );
            console.log(
              `Reviews Retrieved: ${data.result?.reviews?.length || 0}\n`
            );

            if (data.result?.reviews && data.result.reviews.length > 0) {
              console.log('Sample review:');
              const firstReview = data.result.reviews[0];
              console.log(`  Author: ${firstReview.author_name}`);
              console.log(`  Rating: ${firstReview.rating}/5`);
              console.log(`  Text: ${firstReview.text.substring(0, 100)}...`);
            } else {
              console.log('⚠️  No reviews found for this place ID');
            }
          } else {
            console.error(`❌ API Error: ${data.status}`);
            if (data.error_message) {
              console.error(`   Message: ${data.error_message}`);
            }
            console.log('\nCommon issues:');
            console.log('1. Enable "Places API (New)" in Google Cloud Console');
            console.log('2. API key may not have Places API enabled');
            console.log('3. Place ID may be incorrect');
            console.log(
              '4. API key may have restrictions that block this request'
            );
          }
        });
    }
  })
  .catch((error) => {
    console.error('❌ Network Error:', error.message);
    console.log('\nCheck your internet connection and try again');
  });
