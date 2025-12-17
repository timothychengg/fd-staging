'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-luxbg px-6 text-center'>
      <div className='space-y-4 rounded-2xl border border-luxmuted/15 bg-white p-8 shadow-[0_12px_30px_rgba(15,15,15,0.08)]'>
        <p className='tagline text-luxmuted'>404</p>
        <h1 className='heading-serif text-2xl text-luxtxt'>Page not found</h1>
        <p className='text-sm text-luxmuted'>
          The page you are looking for does not exist or was moved.
        </p>
        <div className='flex items-center justify-center gap-3'>
          <Link
            href='/'
            className='btn-pill bg-luxtxt text-luxbg hover:bg-luxtxt/90 focus-visible:outline-luxtxt'
          >
            Back home
          </Link>
          <Link
            href='/contact'
            className='btn-pill border border-luxmuted/30 bg-white text-luxtxt hover:bg-luxbg focus-visible:outline-luxtxt'
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
