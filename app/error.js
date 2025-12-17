'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className='flex min-h-screen items-center justify-center bg-luxbg px-6 text-center'>
        <div className='space-y-4 rounded-2xl border border-luxmuted/15 bg-white p-8 shadow-[0_12px_30px_rgba(15,15,15,0.08)]'>
          <p className='tagline text-luxmuted'>Something went wrong</p>
          <h1 className='heading-serif text-2xl text-luxtxt'>
            We encountered an error
          </h1>
          <p className='text-sm text-luxmuted'>
            Please try again. If the issue persists, refresh the page.
          </p>
          <div className='flex items-center justify-center gap-3'>
            <button
              type='button'
              onClick={() => reset?.()}
              className='btn-pill bg-luxtxt text-luxbg hover:bg-luxtxt/90 focus-visible:outline-luxtxt'
            >
              Try again
            </button>
            <button
              type='button'
              onClick={() => window.location.reload()}
              className='btn-pill border border-luxmuted/30 bg-white text-luxtxt hover:bg-luxbg focus-visible:outline-luxtxt'
            >
              Refresh
            </button>
          </div>
          {process.env.NODE_ENV === 'development' && error?.message && (
            <p className='text-[0.8rem] text-luxmuted/80'>{error.message}</p>
          )}
        </div>
      </body>
    </html>
  );
}
