'use client';

import { useEffect, useState, useMemo, memo } from 'react';

// Fallback reviews to display if API is not configured or fails
const FALLBACK_REVIEWS = [
  {
    id: 'fallback-1',
    author: 'Sarah Chen',
    rating: 5,
    text: 'F&D Staging transformed our listing completely. The attention to detail and design sensibility helped us sell the property in just two weeks. Highly professional and easy to work with.',
    relativeTime: '2 months ago',
    role: 'Real Estate Agent, Compass',
  },
  {
    id: 'fallback-2',
    author: 'Michael Rodriguez',
    rating: 5,
    text: 'Working with Fiona & Daniel was a pleasure. They understood our vision and executed flawlessly. The staging made our home feel warm, inviting, and ready for buyers.',
    relativeTime: '3 months ago',
    role: 'Homeowner',
  },
  {
    id: 'fallback-3',
    author: 'Jennifer Park',
    rating: 5,
    text: 'The team at F&D Staging has an incredible eye for design. They helped us stage multiple units in our development, and each one looked magazine-ready. Buyers were impressed from day one.',
    relativeTime: '1 month ago',
    role: 'Developer, Bay Area Properties',
  },
  {
    id: 'fallback-4',
    author: 'David Kim',
    rating: 5,
    text: 'Fast, professional, and results-driven. F&D Staging helped us get our listing ready in record time. The property received multiple offers within the first week.',
    relativeTime: '4 months ago',
    role: 'Real Estate Agent, Coldwell Banker',
  },
  {
    id: 'fallback-5',
    author: 'Lisa Thompson',
    rating: 5,
    text: "What sets F&D Staging apart is their ability to create spaces that feel both luxurious and livable. They know exactly how to appeal to today's buyers.",
    relativeTime: '2 months ago',
    role: 'Real Estate Agent, Intero',
  },
  {
    id: 'fallback-6',
    author: 'Robert Martinez',
    rating: 5,
    text: 'From initial consultation to final staging, the entire process was seamless. The team is responsive, creative, and truly cares about making your property shine.',
    relativeTime: '5 months ago',
    role: 'Homeowner',
  },
];

const StarRating = memo(function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div
      className='flex items-center gap-1 text-yellow-500'
      aria-label={`${rating} out of 5 stars`}
    >
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <span key={i} className='text-lg' aria-hidden='true'>
              ★
            </span>
          );
        } else if (i === fullStars && hasHalfStar) {
          return (
            <span key={i} className='text-lg' aria-hidden='true'>
              ★
            </span>
          );
        } else {
          return (
            <span key={i} className='text-lg text-gray-300' aria-hidden='true'>
              ★
            </span>
          );
        }
      })}
    </div>
  );
});

export const GoogleReviews = memo(function GoogleReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize height calculation - must be before any early returns
  const getHeightClass = useMemo(
    () => (text) => {
      const length = (text || '').length;
      if (length > 300) return 'min-h-[280px]';
      if (length > 200) return 'min-h-[240px]';
      if (length > 150) return 'min-h-[200px]';
      if (length > 100) return 'min-h-[180px]';
      return 'min-h-[160px]';
    },
    []
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      try {
        const response = await fetch('/api/reviews');
        const data = await response.json();

        if (!isMounted) return;

        let reviewsToDisplay = [];
        if (data.reviews && data.reviews.length > 0) {
          reviewsToDisplay = data.reviews;
        } else {
          // Use fallback reviews if API is not configured
          reviewsToDisplay = FALLBACK_REVIEWS;
        }

        // Sort reviews by text length (longest first) and limit to 3
        const sortedReviews = [...reviewsToDisplay]
          .sort((a, b) => {
            const lengthA = (a.text || '').length;
            const lengthB = (b.text || '').length;
            return lengthB - lengthA;
          })
          .slice(0, 3); // Only show first 3 reviews

        setReviews(sortedReviews);
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching reviews:', err);
        setError(err.message);
        // Use fallback reviews on error, sorted by length, limit to 3
        const sortedFallbacks = [...FALLBACK_REVIEWS]
          .sort((a, b) => {
            return b.text.length - a.text.length;
          })
          .slice(0, 3); // Only show first 3 reviews
        setReviews(sortedFallbacks);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className='rounded-2xl border border-luxmuted/15 bg-white p-6 animate-pulse'
          >
            <div className='h-5 w-24 bg-gray-200 rounded mb-4'></div>
            <div className='space-y-2 mb-4'>
              <div className='h-4 bg-gray-200 rounded'></div>
              <div className='h-4 bg-gray-200 rounded w-5/6'></div>
              <div className='h-4 bg-gray-200 rounded w-4/6'></div>
            </div>
            <div className='pt-3 border-t border-luxmuted/10'>
              <div className='h-4 w-32 bg-gray-200 rounded mb-2'></div>
              <div className='h-3 w-24 bg-gray-200 rounded'></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='grid gap-6 md:grid-cols-3 auto-rows-fr' role='list'>
      {reviews.map((review) => (
        <article
          key={review.id}
          role='listitem'
          className={`group flex flex-col space-y-4 rounded-2xl border border-luxmuted/15 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:border-luxmuted/25 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-luxaccent focus-within:ring-offset-2 ${getHeightClass(
            review.text
          )}`}
        >
          <StarRating rating={review.rating} />
          <blockquote className='text-sm leading-relaxed text-luxmuted flex-grow'>
            <p>&quot;{review.text}&quot;</p>
          </blockquote>
          <div className='pt-3 border-t border-luxmuted/10 mt-auto'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-luxtxt'>
                  {review.author}
                </p>
                <p className='text-[0.75rem] text-luxmuted mt-0.5'>
                  {review.role || review.relativeTime || ''}
                </p>
              </div>
              {review.relativeTime && !review.role && (
                <time className='text-[0.7rem] text-luxmuted/70 uppercase tracking-wide'>
                  {review.relativeTime}
                </time>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
});
