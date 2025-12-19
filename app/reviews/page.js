// Google Reviews Integration:
// To enable Google Reviews integration:
// 1. Get a Google Places API key from: https://console.cloud.google.com/
// 2. Enable the Places API in your Google Cloud project
// 3. Find your Google Place ID:
//    - Go to https://www.google.com/maps and search for your business
//    - Click on your business listing
//    - The Place ID is in the URL (look for "place_id=") or use Google's Place ID Finder
// 4. Add to your .env.local file:
//    GOOGLE_PLACES_API_KEY=your_api_key_here
//    GOOGLE_PLACE_ID=your_place_id_here
// 5. Update the "Leave a Review" href to: https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
//
// Note: If API is not configured, the page will display fallback reviews.

import { Suspense } from 'react';
import { GoogleReviews } from '../../components/GoogleReviews';
import { GoogleReviewsCard } from '../../components/GoogleReviewsCard';

export const metadata = {
  title: 'Reviews – F&D Staging',
  description:
    'Read what our clients say about F&D Staging. Real testimonials from real estate agents, homeowners, and developers across the San Francisco Bay Area.',
  openGraph: {
    title: 'Reviews – F&D Staging',
    description:
      'Read what our clients say about F&D Staging. Real testimonials from real estate agents, homeowners, and developers across the San Francisco Bay Area.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reviews – F&D Staging',
    description:
      'Read what our clients say about F&D Staging. Real testimonials from real estate agents, homeowners, and developers across the San Francisco Bay Area.',
  },
};

// Dynamic because we're fetching reviews from API
export const dynamic = 'force-dynamic';

export default function ReviewsPage() {
  return (
    <main className='min-h-screen bg-luxbg'>
      <section
        className='section-shell border-b border-luxmuted/15 py-14'
        aria-labelledby='reviews-heading'
      >
        <div className='space-y-6'>
          <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-6'>
            <div className='flex-1'>
              <p className='tagline mb-3 text-luxmuted'>Reviews</p>
              <h1
                id='reviews-heading'
                className='heading-serif text-3xl md:text-4xl mb-4 text-luxtxt'
              >
                What Our Clients Say
              </h1>
              <p className='max-w-xl text-sm leading-relaxed text-luxmuted'>
                We&apos;re grateful for the trust our clients place in us.
                Here&apos;s what real estate agents, homeowners, and developers
                across the San Francisco Bay Area have shared about working with
                F&D Staging.
              </p>
            </div>
            <div className='w-full md:w-[400px] lg:w-[480px] shrink-0 md:ml-6'>
              <GoogleReviewsCard />
            </div>
          </div>
        </div>
      </section>

      <section
        className='section-shell py-14'
        aria-labelledby='testimonials-heading'
      >
        <div className='space-y-8'>
          <div className='text-center space-y-3'>
            <p className='tagline text-luxmuted'>Client Testimonials</p>
            <h2
              id='testimonials-heading'
              className='heading-serif text-3xl md:text-4xl text-luxtxt'
            >
              Trusted by Real Estate Professionals
            </h2>
            <p className='text-sm text-luxmuted max-w-2xl mx-auto'>
              Discover what agents, homeowners, and developers across the Bay
              Area are saying about their experience with F&D Staging.
            </p>
          </div>
          <Suspense
            fallback={
              <div className='grid gap-6 md:grid-cols-3'>
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
            }
          >
            <GoogleReviews />
          </Suspense>
        </div>
      </section>

      <section
        className='section-shell border-t border-luxmuted/15 py-16'
        aria-labelledby='cta-heading'
      >
        <div className='text-center space-y-6 max-w-2xl mx-auto'>
          <div className='space-y-3'>
            <p className='tagline text-luxmuted'>Get Started</p>
            <h2
              id='cta-heading'
              className='heading-serif text-3xl md:text-4xl text-luxtxt'
            >
              Ready to Transform Your Listing?
            </h2>
            <p className='text-sm leading-relaxed text-luxmuted'>
              Join our satisfied clients and discover how professional staging
              can help your property stand out, attract more buyers, and sell
              faster.
            </p>
          </div>
          <div className='pt-2'>
            <a
              href='/contact'
              prefetch={true}
              className='btn-pill inline-flex items-center gap-2 bg-luxtxt text-luxbg hover:bg-luxtxt/90 transition-all shadow-sm hover:shadow-md px-6 py-3 text-sm focus-visible:outline-2 focus-visible:outline-luxtxt focus-visible:outline-offset-2'
            >
              Schedule a Consultation
              <svg
                className='h-4 w-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
