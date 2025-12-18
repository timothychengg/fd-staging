'use client';

import { useEffect, useState, memo } from 'react';
import Link from 'next/link';

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
    text: 'Working with Fiona and Daniel was a pleasure. They understood our vision and executed flawlessly. The staging made our home feel warm, inviting, and ready for buyers.',
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
];

const StarRating = memo(function StarRating({ rating }) {
  const fullStars = Math.floor(rating);

  return (
    <div
      className='flex items-center gap-1 text-yellow-500'
      aria-label={`${rating} out of 5 stars`}
    >
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <span key={i} className='text-base' aria-hidden='true'>
              ★
            </span>
          );
        } else {
          return (
            <span
              key={i}
              className='text-base text-gray-300'
              aria-hidden='true'
            >
              ★
            </span>
          );
        }
      })}
    </div>
  );
});

export const FeaturedReviews = memo(function FeaturedReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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
          reviewsToDisplay = FALLBACK_REVIEWS;
        }

        // Sort reviews by text length (longest first) and limit to 2 for homepage
        const sortedReviews = [...reviewsToDisplay]
          .sort((a, b) => {
            const lengthA = (a.text || '').length;
            const lengthB = (b.text || '').length;
            return lengthB - lengthA;
          })
          .slice(0, 2); // Show 2 reviews on homepage

        setReviews(sortedReviews);
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching reviews:', err);
        // Use fallback reviews on error, sorted by length, limit to 2
        const sortedFallbacks = [...FALLBACK_REVIEWS]
          .sort((a, b) => {
            return b.text.length - a.text.length;
          })
          .slice(0, 2);
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
      <div className='grid gap-6 md:grid-cols-2'>
        {[...Array(2)].map((_, i) => (
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
    <div className='grid gap-6 md:grid-cols-2'>
      {reviews.map((review) => (
        <article
          key={review.id}
          className='group flex flex-col space-y-4 rounded-2xl border border-luxmuted/15 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:border-luxmuted/25 hover:-translate-y-1'
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
