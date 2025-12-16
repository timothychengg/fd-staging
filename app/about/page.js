import Image from 'next/image';

export const metadata = {
  title: 'About Us – F&D Staging',
  description:
    'F&D Staging is a design studio focused on creating elevated, livable spaces that help listings stand out in photos and feel instantly welcoming.',
  openGraph: {
    title: 'About Us – F&D Staging',
    description:
      'F&D Staging is a design studio focused on creating elevated, livable spaces that help listings stand out in photos and feel instantly welcoming.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us – F&D Staging',
    description:
      'F&D Staging is a design studio focused on creating elevated, livable spaces that help listings stand out in photos and feel instantly welcoming.',
  },
};

// Static generation for better performance
export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <main className='min-h-screen bg-luxbg' id='main-content'>
      <section
        className='section-shell border-b border-luxmuted/15 py-14'
        aria-labelledby='about-heading'
      >
        <div className='grid gap-8 md:grid-cols-[1.2fr,1fr] md:items-start'>
          <div className='space-y-6'>
            <div>
              <p className='tagline mb-3 text-luxmuted'>About Us</p>
              <h1
                id='about-heading'
                className='heading-serif text-3xl md:text-4xl mb-4 text-luxtxt'
              >
                Fiona and Daniel
              </h1>
              <p className='max-w-xl text-sm leading-relaxed text-luxmuted'>
                Fiona and Daniel lead F&amp;D Staging with a shared focus on
                livable design that sells. They combine interiors expertise,
                market insight, and disciplined execution to present Bay Area
                listings at their best and deliver stronger, faster results.
              </p>
            </div>
            <div className='space-y-4 text-luxmuted'>
              <h2 className='heading-serif text-xl text-luxtxt'>Our Mission</h2>
              <div className='space-y-3 text-sm leading-relaxed'>
                <p>
                  Based in the San Francisco Bay Area, we partner with agents,
                  developers, and homeowners across the region who care about
                  presentation.
                </p>
                <p>
                  Our team stays lean and detail-focused, with clear
                  communication, thoughtful edits, and staging that respects
                  both the property and your time.
                </p>
              </div>
            </div>
          </div>
          <div className='relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-luxmuted/10 bg-luxbg shadow-[0_4px_12px_rgba(15,15,15,0.08)] md:mt-12'>
            <Image
              src='/family-photo.jpg'
              alt='Fiona and Daniel with their family in a sun-dappled forest setting'
              fill
              className='object-cover object-center'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 400px'
              quality={85}
              priority
              loading='eager'
            />
          </div>
        </div>
      </section>
      <section className='section-shell py-14' aria-labelledby='team-heading'>
        <div className='space-y-6'>
          <div>
            <h2
              id='team-heading'
              className='heading-serif text-2xl mb-2 text-luxtxt'
            >
              Founding Team
            </h2>
            <p className='text-sm text-luxmuted max-w-2xl'>
              The team behind F&amp;D Staging—partners to agents, developers,
              and homeowners who need polished, market-ready interiors.
            </p>
          </div>
          <div className='grid gap-6 text-sm md:grid-cols-2 lg:grid-cols-4'>
            <article className='space-y-3 rounded-2xl border border-luxmuted/15 bg-white p-6 transition-shadow hover:shadow-lg'>
              <div className='flex items-center gap-3'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9e2d7] text-sm font-medium text-luxtxt'>
                  DH
                </div>
                <div>
                  <h3 className='text-sm font-semibold text-luxtxt'>
                    Daniel Hwang
                  </h3>
                  <p className='text-[0.8rem] text-luxmuted'>
                    Founder &amp; Creative Director
                  </p>
                </div>
              </div>
              <p className='text-luxmuted leading-relaxed'>
                Daniel blends design, real estate, and visual storytelling. He
                obsesses over light, sightlines, and the details that make a
                space feel finished.
              </p>
            </article>
            <article className='space-y-3 rounded-2xl border border-luxmuted/15 bg-white p-6 transition-shadow hover:shadow-lg'>
              <div className='flex items-center gap-3'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9e2d7] text-sm font-medium text-luxtxt'>
                  FL
                </div>
                <div>
                  <h3 className='text-sm font-semibold text-luxtxt'>
                    Fiona Lu
                  </h3>
                  <p className='text-[0.8rem] text-luxmuted'>Lead Stylist</p>
                </div>
              </div>
              <p className='text-luxmuted leading-relaxed'>
                Fiona elevates spaces through textiles, layering, and styled
                moments that pull buyers deeper—online and in person.
              </p>
            </article>
            <article className='space-y-3 rounded-2xl border border-luxmuted/15 bg-white p-6 transition-shadow hover:shadow-lg'>
              <div className='flex items-center gap-3'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9e2d7] text-sm font-medium text-luxtxt'>
                  JS
                </div>
                <div>
                  <h3 className='text-sm font-semibold text-luxtxt'>
                    Jessica Smith
                  </h3>
                  <p className='text-[0.8rem] text-luxmuted'>
                    Operations Manager
                  </p>
                </div>
              </div>
              <p className='text-luxmuted leading-relaxed'>
                Jessica keeps every project on track—from consultation through
                de-staging—managing logistics, timelines, and communication with
                precision.
              </p>
            </article>
            <article className='space-y-3 rounded-2xl border border-luxmuted/15 bg-white p-6 transition-shadow hover:shadow-lg'>
              <div className='flex items-center gap-3'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9e2d7] text-sm font-medium text-luxtxt'>
                  MR
                </div>
                <div>
                  <h3 className='text-sm font-semibold text-luxtxt'>
                    Michael Rodriguez
                  </h3>
                  <p className='text-[0.8rem] text-luxmuted'>
                    Design Associate
                  </p>
                </div>
              </div>
              <p className='text-luxmuted leading-relaxed'>
                Michael pairs contemporary cues with timeless design to craft
                spaces that feel current, cohesive, and ready to sell.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
