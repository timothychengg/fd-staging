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
import { GoogleMapsLink } from '../../components/GoogleMapsLink';

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
        className='section-shell border-b border-luxmuted/15 py-14 relative'
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
            <div className='md:absolute md:top-14 md:right-0 md:w-[400px] lg:w-[480px] w-full'>
              <div className='rounded-xl border border-luxmuted/15 bg-gradient-to-br from-white to-[#faf9f7] p-5 md:p-6 shadow-[0_2px_8px_rgba(15,15,15,0.04)]'>
                <div className='flex flex-col items-center gap-4 text-center'>
                  <div className='flex items-center gap-2 justify-center'>
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
                  <div className='flex flex-col gap-2 w-full md:w-auto'>
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
