'use client';

import { useEffect, useState, memo } from 'react';
import { GoogleMapsLink } from './GoogleMapsLink';

const StarRating = memo(function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div
      className='flex items-center gap-0.5'
      aria-label={`${rating} out of 5 stars`}
    >
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <span
              key={i}
              className='text-base text-yellow-500'
              aria-hidden='true'
            >
              ★
            </span>
          );
        } else if (i === fullStars && hasHalfStar) {
          return (
            <span
              key={i}
              className='text-base text-yellow-500'
              aria-hidden='true'
            >
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

export const GoogleReviewsCard = memo(function GoogleReviewsCard() {
  const [ratingData, setRatingData] = useState({
    totalRating: 0,
    totalReviews: 0,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchRating() {
      try {
        const response = await fetch('/api/reviews');
        const data = await response.json();

        if (!isMounted) return;

        setRatingData({
          totalRating: data.totalRating || 0,
          totalReviews: data.totalReviews || 0,
          loading: false,
        });
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching rating:', err);
        setRatingData({
          totalRating: 0,
          totalReviews: 0,
          loading: false,
        });
      }
    }

    fetchRating();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className='rounded-xl border border-luxmuted/15 bg-gradient-to-br from-white to-[#faf9f7] p-5 md:p-6 shadow-[0_2px_12px_rgba(15,15,15,0.06)]'>
      <div className='flex flex-col items-center gap-4 text-center'>
        {/* Google Logo and Title */}
        <div className='flex items-center gap-2.5 justify-center'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-luxmuted/10 shadow-sm shrink-0'>
            <svg
              className='h-5 w-5'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                fill='#4285F4'
              />
              <path
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                fill='#34A853'
              />
              <path
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                fill='#FBBC05'
              />
              <path
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                fill='#EA4335'
              />
            </svg>
          </div>
          <div>
            <h2
              id='google-reviews-heading'
              className='heading-serif text-lg text-luxtxt mb-0.5'
            >
              Google Reviews
            </h2>
            <p className='text-[0.7rem] text-luxmuted uppercase tracking-[0.1em]'>
              Verified Feedback
            </p>
          </div>
        </div>

        {/* Rating Display */}
        {ratingData.loading ? (
          <div className='flex flex-col items-center gap-2 py-1'>
            <div className='h-7 w-28 bg-gray-200 rounded animate-pulse'></div>
            <div className='h-4 w-20 bg-gray-200 rounded animate-pulse'></div>
          </div>
        ) : ratingData.totalRating > 0 ? (
          <div className='flex flex-col items-center gap-1.5 py-0.5'>
            <div className='flex items-baseline gap-1.5'>
              <span className='heading-serif text-2xl font-semibold text-luxtxt'>
                {ratingData.totalRating.toFixed(1)}
              </span>
              <span className='text-xs text-luxmuted'>/ 5</span>
            </div>
            <StarRating rating={ratingData.totalRating} />
            <p className='text-[0.7rem] text-luxmuted mt-0.5'>
              {ratingData.totalReviews > 0
                ? `${ratingData.totalReviews} ${
                    ratingData.totalReviews === 1 ? 'review' : 'reviews'
                  }`
                : 'No reviews yet'}
            </p>
          </div>
        ) : (
          <div className='flex flex-col items-center gap-1.5 py-0.5'>
            <StarRating rating={5} />
            <p className='text-[0.7rem] text-luxmuted mt-0.5'>
              Be the first to review
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex flex-col gap-2 w-full md:w-auto pt-1'>
          <GoogleMapsLink
            className='btn-pill inline-flex items-center justify-center gap-2 bg-luxtxt text-luxbg hover:bg-luxtxt/90 whitespace-nowrap transition-all shadow-sm hover:shadow-md text-xs px-3 py-1.5'
            ariaLabel='View F&D Staging on Google'
          >
            <svg
              className='h-3.5 w-3.5'
              fill='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
            </svg>
            View on Google
          </GoogleMapsLink>
          <GoogleMapsLink
            type='review'
            className='btn-pill inline-flex items-center justify-center gap-2 border-2 border-luxtxt text-luxtxt hover:bg-luxtxt hover:text-luxbg whitespace-nowrap transition-all text-xs px-3 py-1.5'
            ariaLabel='Leave a Google review for F&D Staging'
          >
            <svg
              className='h-3.5 w-3.5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
              />
            </svg>
            Leave a Review
          </GoogleMapsLink>
        </div>
      </div>
    </div>
  );
});
