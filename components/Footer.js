import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='mt-16 border-t border-luxmuted/15 bg-[#f1ece5]'>
      <div className='section-shell grid gap-8 py-10 text-sm md:grid-cols-[2.2fr,1.2fr,1.2fr]'>
        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full border border-luxaccent text-[0.7rem] tracking-[0.16em]'>
              F&amp;D
            </div>
            <div className='flex flex-col'>
              <span className='tagline text-[0.66rem]'>F&amp;D STAGING</span>
              <span className='text-[0.7rem] text-luxmuted'>
                Home Staging • San Francisco Bay Area
              </span>
            </div>
          </div>
          <p className='max-w-xs text-luxmuted'>
            Boutique staging studio helping listings across Greater Los Angeles
            sell faster and photograph at their absolute best.
          </p>
        </div>

        <div className='space-y-2'>
          <h4 className='tagline mb-1 text-[0.7rem]'>Office Headquarters</h4>
          <p className='text-luxmuted'>
            Concord, CA
            <br />
            By appointment only
            <br />
            Hours: 9am-6pm PST
          </p>
        </div>

        <div className='space-y-2'>
          <h4 className='tagline mb-1 text-[0.7rem]'>Contact</h4>
          <p className='text-luxmuted'>
            info@fanddstaging.com
            <br />
            (408)393-2161
          </p>
          <div className='mt-2 flex flex-col text-[0.8rem] text-luxmuted'>
            <Link href='/portfolio' className='hover:text-luxtxt'>
              Portfolio
            </Link>
            <Link href='/services' className='hover:text-luxtxt'>
              Services
            </Link>
          </div>
        </div>
      </div>

      <div className='border-t border-luxmuted/20 bg-luxbg'>
        <div className='section-shell flex flex-col items-start justify-between gap-2 py-4 text-[0.75rem] text-luxmuted md:flex-row md:items-center'>
          <span>© {year} F&amp;D Staging. All rights reserved.</span>
          <span>Highlighting beauty, one listing at a time.</span>
        </div>
      </div>
    </footer>
  );
}
