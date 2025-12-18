'use client';

import { useEffect, useState, memo } from 'react';

export const GoogleMapsLink = memo(function GoogleMapsLink({
  children,
  className,
  ariaLabel,
  type = 'view',
}) {
  const [googleMapsUrl, setGoogleMapsUrl] = useState(
    type === 'review'
      ? 'https://www.google.com/maps/search/?api=1&query=F%26D+Staging+San+Francisco+Bay+Area'
      : 'https://www.google.com/maps/search/F%26D+Staging+home+staging+San+Francisco+Bay+Area'
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchPlaceId() {
      try {
        const response = await fetch('/api/reviews');
        const data = await response.json();

        if (!isMounted) return;

        if (data.placeId) {
          const placeId = encodeURIComponent(data.placeId);

          if (type === 'review') {
            // Construct "Leave a Review" URL using Place ID
            setGoogleMapsUrl(
              `https://search.google.com/local/writereview?placeid=${placeId}`
            );
          } else {
            // Construct "View on Google Maps" URL using Place ID
            setGoogleMapsUrl(
              `https://www.google.com/maps/place/?q=place_id:${placeId}`
            );
          }
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching place ID:', err);
        // Keep default URL on error
      }
    }

    fetchPlaceId();

    return () => {
      isMounted = false;
    };
  }, [type]);

  return (
    <a
      href={googleMapsUrl}
      target='_blank'
      rel='noopener noreferrer'
      className={className}
      aria-label={ariaLabel}
      prefetch={false}
    >
      {children}
    </a>
  );
});
