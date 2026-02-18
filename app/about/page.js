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
                Fiona Lu
              </h1>
              <p className='text-[0.8rem] text-luxmuted mb-2'>
                Founder &amp; Creative Director
              </p>
              <p className='max-w-xl text-sm leading-relaxed text-luxmuted'>
                Fiona believes great staging should feel inviting, not staged.
                She creates warm, modern spaces by pairing clean-lined furniture
                with soft textures and natural materials—think neutral palettes
                with subtle earth tones that let a home&apos;s best features
                shine. Her approach is thoughtful and practical: balanced
                layouts, good lighting, and décor that adds warmth without
                overwhelming. She&apos;s worked with agents and homeowners
                across the Bay Area for years, and she still gets excited about
                helping each property look its best. No fuss, no attitude—just
                spaces that feel lived-in and ready for the right buyer.
              </p>
            </div>
          </div>
          <div className='relative aspect-[3/4] w-4/5 mx-auto rounded-xl overflow-hidden border border-luxmuted/10 bg-luxbg shadow-[0_4px_12px_rgba(15,15,15,0.08)]'>
            <Image
              src='/fiona.png'
              alt='Fiona Lu'
              fill
              className='object-cover object-center'
              style={{ objectPosition: 'center top' }}
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
          <div className='grid gap-6 text-sm md:grid-cols-2 lg:grid-cols-3'>
            <article className='space-y-3 rounded-2xl border border-luxmuted/15 bg-white p-6 transition-shadow hover:shadow-lg'>
              <div className='flex items-center gap-3'>
                <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#e9e2d7]'>
                  <Image
                    src='/daniel1.png'
                    alt='Daniel Hwang'
                    fill
                    className='object-cover object-center rounded-full'
                    style={{ transform: 'scale(1.1)' }}
                    sizes='80px'
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
                <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#e9e2d7]'>
                  <Image
                    src='/teresa.PNG'
                    alt='Teresa Lu'
                    fill
                    className='object-cover object-center rounded-full'
                    style={{ transform: 'scale(1.1)' }}
                    sizes='80px'
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
                <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#e9e2d7]'>
                  <Image
                    src='/timothy.png'
                    alt='Timothy Cheng'
                    fill
                    className='object-cover object-center rounded-full'
                    style={{ transform: 'scale(1.1)' }}
                    sizes='80px'
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
