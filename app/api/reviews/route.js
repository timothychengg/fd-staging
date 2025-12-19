// API Route to fetch Google Reviews
// This route fetches reviews from Google Places API
// Requires: GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID environment variables

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  let placeId = process.env.GOOGLE_PLACE_ID;

  // If API key or Place ID is not configured, return empty array
  if (!apiKey || !placeId) {
    return Response.json(
      { reviews: [], error: 'Google Places API not configured' },
      { status: 200 }
    );
  }

  // Clean and decode Place ID
  try {
    // Remove any query parameters
    placeId = placeId.split('?')[0].split('&')[0];
    // Decode URL encoding
    placeId = decodeURIComponent(placeId);
    // Remove any trailing slashes or special characters
    placeId = placeId.trim();
  } catch (e) {
    // If decoding fails, just clean query params
    placeId = placeId.split('?')[0].split('&')[0].trim();
  }

  // Retry function for transient errors
  const fetchWithRetry = async (url, options, maxRetries = 2) => {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(url, options);
        if (response.ok || attempt === maxRetries) {
          return response;
        }
        // Retry on 5xx errors (server errors) or network errors
        if (response.status >= 500) {
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * (attempt + 1))
          ); // Exponential backoff
          continue;
        }
        return response;
      } catch (error) {
        if (attempt === maxRetries) throw error;
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (attempt + 1))
        );
      }
    }
  };

  try {
    // Use the new Places API (New) endpoint
    // Note: The new API requires different field names and endpoint
    const response = await fetchWithRetry(
      `https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName,rating,userRatingCount,reviews`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      // Get error details from new API
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || response.statusText;

      console.error('New Places API error:', {
        status: response.status,
        error: errorData,
      });

      // If new API fails, try legacy API as fallback
      const legacyResponse = await fetchWithRetry(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`,
        {
          next: { revalidate: 3600 },
        }
      );

      if (!legacyResponse.ok) {
        throw new Error(
          `Google Places API error: ${legacyResponse.status} - ${errorMessage}`
        );
      }

      const legacyData = await legacyResponse.json();

      if (legacyData.status !== 'OK' && legacyData.status !== 'ZERO_RESULTS') {
        throw new Error(
          `Google Places API error: ${legacyData.status} - ${
            legacyData.error_message || errorMessage
          }`
        );
      }

      // Transform legacy API reviews to our format
      const reviews = (legacyData.result?.reviews || []).map((review) => ({
        id: review.author_name + review.time,
        author: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.time,
        relativeTime: review.relative_time_description,
        profilePhotoUrl: review.profile_photo_url,
      }));

      return Response.json(
        {
          reviews,
          totalRating: legacyData.result?.rating || 0,
          totalReviews: legacyData.result?.user_ratings_total || 0,
          placeId: placeId, // Include place ID for Google Maps link
        },
        {
          headers: {
            'Cache-Control':
              'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        }
      );
    }

    const data = await response.json();

    // Transform new API reviews to our format
    const reviews = (data.reviews || []).map((review) => ({
      id:
        review.authorAttribution?.uri ||
        review.publishTime ||
        Math.random().toString(),
      author: review.authorAttribution?.displayName || 'Anonymous',
      rating: review.rating || 5,
      text: review.text?.text || '',
      time: review.publishTime || Date.now(),
      relativeTime: review.publishTime
        ? new Date(review.publishTime).toLocaleDateString()
        : '',
      profilePhotoUrl: review.authorAttribution?.photoUri || null,
    }));

    return Response.json(
      {
        reviews,
        totalRating: data.rating || 0,
        totalReviews: data.userRatingCount || 0,
        placeId: placeId, // Include place ID for Google Maps link
      },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return Response.json(
      { reviews: [], error: error.message },
      { status: 200 } // Return 200 so page still renders with fallback
    );
  }
}
