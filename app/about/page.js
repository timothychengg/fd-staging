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
                Fiona & Daniel
              </h1>
              <p className='max-w-xl text-sm leading-relaxed text-luxmuted'>
                The husband-and-wife team behind F&amp;D Staging, share a
                passion for interior design and creating beautiful, functional
                spaces. We founded our company to help clients present their
                homes at their best—using thoughtful design, quality
                furnishings, and a curated aesthetic that attracts buyers and
                increases a properties&apos; market value. We love what we do
                and take pride in staging that elevates every listing and helps
                our clients achieve stronger, faster results.
              </p>
            </div>
            <div className='space-y-4 text-luxmuted'>
              <h2 className='heading-serif text-xl text-luxtxt'>Our Mission</h2>
              <div className='space-y-3 text-sm leading-relaxed'>
                <p>
                  Based in the San Francisco Bay Area, we partner with agents and homeowners across the region who care about
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
              alt='Fiona & Daniel with their family in a sun-dappled forest setting'
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
        <div className='space-y-6 text-center'>
          <div className='flex flex-col items-center'>
            <h2
              id='team-heading'
              className='heading-serif text-2xl mb-2 text-luxtxt'
            >
              Founding Team
            </h2>
            <p className='text-sm text-luxmuted max-w-2xl mx-auto'>
              The team behind F&amp;D Staging—partners to agents and homeowners who need polished, market-ready interiors.
            </p>
          </div>
          <div className='grid gap-6 text-sm md:grid-cols-2 lg:grid-cols-4'>
            <article className='space-y-3 rounded-2xl border border-luxmuted/15 bg-white p-6 transition-shadow hover:shadow-lg'>
              <div className='flex items-center gap-3'>
                <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#e9e2d7]'>
                  <Image
                    src='/fiona.png'
                    alt='Fiona Lu'
                    fill
                    className='object-cover object-center rounded-full'
                    style={{ transform: 'scale(1.1)' }}
                    sizes='48px'
                  />
                </div>
                <div>
                  <h3 className='text-sm font-semibold text-luxtxt'>
                    Fiona Lu
                  </h3>
                  <p className='text-[0.8rem] text-luxmuted'>
                    Founder &amp; Creative Director
                  </p>
                </div>
              </div>
              <p className='text-luxmuted leading-relaxed'>
                Fiona creates warm modern staging designs by combining
                clean-lined furniture with soft textures, natural materials, and
                a neutral color palette accented by subtle earth tones. Her
                thoughtful use of lighting, balanced layouts, and curated décor
                adds warmth and approachability while maintaining a polished,
                contemporary feel.
              </p>
            </article>
            <article className='space-y-3 rounded-2xl border border-luxmuted/15 bg-white p-6 transition-shadow hover:shadow-lg'>
              <div className='flex items-center gap-3'>
                <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#e9e2d7]'>
                  <Image
                    src='/daniel1.png'
                    alt='Daniel Hwang'
                    fill
                    className='object-cover object-center rounded-full'
                    style={{ transform: 'scale(1.1)' }}
                    sizes='96px'
                    quality={100}
                    priority
                  />
                </div>
                <div>
                  <h3 className='text-sm font-semibold text-luxtxt'>
                    Daniel Hwang
                  </h3>
                  <p className='text-[0.8rem] text-luxmuted'>
                    Co-Founder &amp; Operations Manager
                  </p>
                </div>
              </div>
              <p className='text-luxmuted leading-relaxed'>
                Daniel brings together design expertise, real estate knowledge,
                and visual storytelling to create compelling staged
                environments. He focuses on lighting, spatial composition, and
                meticulous attention to detail that transforms properties into
                market-ready spaces.
              </p>
            </article>
            <article className='space-y-3 rounded-2xl border border-luxmuted/15 bg-white p-6 transition-shadow hover:shadow-lg'>
              <div className='flex items-center gap-3'>
                <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#e9e2d7]'>
                  <Image
                    src='/teresa.PNG'
                    alt='Teresa Lu'
                    fill
                    className='object-cover object-center rounded-full'
                    style={{ transform: 'scale(1.1)' }}
                    sizes='48px'
                  />
                </div>
                <div>
                  <h3 className='text-sm font-semibold text-luxtxt'>
                    Teresa Lu
                  </h3>
                  <p className='text-[0.8rem] text-luxmuted'>
                    Interior Design Associate
                  </p>
                </div>
              </div>
              <p className='text-luxmuted leading-relaxed'>
                Teresa applies design principles to refine each space through
                strategic color palettes, texture combinations, and proportional
                arrangements that create cohesive, elevated environments
                optimized for market appeal.
              </p>
            </article>
            <article className='space-y-3 rounded-2xl border border-luxmuted/15 bg-white p-6 transition-shadow hover:shadow-lg'>
              <div className='flex items-center gap-3'>
                <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#e9e2d7]'>
                  <Image
                    src='/timothy.png'
                    alt='Timothy Cheng'
                    fill
                    className='object-cover object-center rounded-full'
                    style={{ transform: 'scale(1.1)' }}
                    sizes='48px'
                  />
                </div>
                <div>
                  <h3 className='text-sm font-semibold text-luxtxt'>
                    Timothy Cheng
                  </h3>
                  <p className='text-[0.8rem] text-luxmuted'>Solutions Engineer</p>
                </div>
              </div>
              <p className='text-luxmuted leading-relaxed'>
                Timothy drives marketing initiatives and technology solutions
                that enhance client engagement and operational efficiency. He
                integrates digital marketing strategies with technical systems
                to optimize business performance and client outcomes.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
