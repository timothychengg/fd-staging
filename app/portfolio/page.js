import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Portfolio – F&D Staging',
  description:
    'A selection of staged homes, lofts, and developments designed to photograph beautifully and feel instantly livable.',
  openGraph: {
    title: 'Portfolio – F&D Staging',
    description:
      'A selection of staged homes, lofts, and developments designed to photograph beautifully and feel instantly livable.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio – F&D Staging',
    description:
      'A selection of staged homes, lofts, and developments designed to photograph beautifully and feel instantly livable.',
  },
};

// Static generation for better performance
export const dynamic = 'force-static';

export default function PortfolioPage() {
  const projects = [
    {
      name: 'Laurel Canyon Modern',
      meta: 'Hollywood Hills · 4 bd · Modern',
      result: 'Sold in 6 days at 18% over list.',
      description:
        'Light-filled modern staged with warm woods, sculptural decor, and layered textiles to emphasize indoor–outdoor flow.',
    },
    {
      name: 'Brentwood Soft Minimal',
      meta: 'Brentwood · 5 bd · Transitional',
      result: 'Multiple offers in the first weekend.',
      description:
        'Soft neutrals, plush textures, and refined silhouettes created a calm, elevated backdrop for family living.',
    },
    {
      name: 'Downtown Artist Loft',
      meta: 'DTLA · Loft · Industrial',
      result: 'All-cash offer within 10 days.',
      description:
        'Industrial shell softened with organic forms, vintage-inspired pieces, and warm lighting tailored to creative buyers.',
    },
    {
      name: 'Silver Lake Bungalow',
      meta: 'Silver Lake · 3 bd · Bungalow',
      result: 'Sold over asking after first open house.',
      description:
        'Playful, polished staging with layered art and color to keep the bungalow feeling fresh and approachable.',
    },
    {
      name: 'Pasadena Craftsman',
      meta: 'Pasadena · 4 bd · Craftsman',
      result: 'Received 7 offers in the first weekend.',
      description:
        'Warm woods, tailored millwork accents, and softened lines to respect the architecture while modernizing the feel.',
    },
    {
      name: 'West Hollywood Condo',
      meta: 'West Hollywood · 2 bd · Condo',
      result: 'Sold over list in 9 days.',
      description:
        'Light, textural staging with sculptural lighting to make a compact layout feel open and premium.',
    },
    {
      name: 'Manhattan Beach Modern',
      meta: 'Manhattan Beach · 5 bd · Coastal Modern',
      result: 'All-cash offer after first showings.',
      description:
        'Coastal palette with clean lines and layered textiles to spotlight natural light and indoor–outdoor flow.',
    },
    {
      name: 'Beverly Hills Spanish',
      meta: 'Beverly Hills · 6 bd · Spanish Revival',
      result: 'Closed in 14 days with multiple offers.',
      description:
        'Refined staging that pairs vintage-inspired pieces with modern silhouettes to honor character and elevate value.',
    },
  ];

  return (
    <main className='min-h-screen bg-luxbg'>
      <section className='section-shell border-b border-luxmuted/15 py-14'>
        <div className='grid gap-6 md:grid-cols-[1.2fr,1fr] md:items-start'>
          <div>
            <p className='tagline mb-3 text-luxmuted'>Portfolio</p>
            <h1 className='heading-serif text-3xl mb-3'>
              Spaces that sold the story.
            </h1>
            <p className='max-w-xl text-sm text-luxmuted'>
              A selection of staged homes, lofts, and developments designed to
              photograph beautifully and feel immediately livable when buyers
              walk through.
            </p>
          </div>
          <div className='relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-luxmuted/10 bg-luxbg shadow-[0_4px_12px_rgba(15,15,15,0.08)]'>
            <Image
              src='/13.webp'
              alt='Staged interior showcasing F&D Staging portfolio work'
              fill
              className='object-cover object-center'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 400px'
              quality={85}
              priority
            />
          </div>
        </div>
      </section>
      <section className='section-shell space-y-4 py-10'>
        {projects.map((p) => (
          <article
            key={p.name}
            className='grid overflow-hidden rounded-2xl border border-luxmuted/15 bg-white md:grid-cols-[1.2fr,1.4fr]'
          >
            <div className='flex h-40 items-center justify-center bg-[#e9e2d7] text-[0.7rem] uppercase tracking-[0.16em] text-luxmuted md:h-full'>
              {p.name}
            </div>
            <div className='space-y-2 p-5 text-sm'>
              <h2 className='text-base font-semibold'>{p.name}</h2>
              <p className='text-[0.8rem] text-luxmuted'>{p.meta}</p>
              <p className='text-luxmuted'>{p.description}</p>
              <p className='text-[0.8rem] font-medium text-luxmuted'>
                {p.result}
              </p>
            </div>
          </article>
        ))}
      </section>
      <section className='section-shell py-12'>
        <div className='flex flex-col gap-4 rounded-2xl border border-luxmuted/15 bg-white p-6 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-2'>
            <p className='tagline text-luxmuted'>Full Portfolio</p>
            <h2 className='heading-serif text-xl text-luxtxt'>
              40+ staged homes across Greater LA
            </h2>
            <p className='text-sm text-luxmuted'>
              Explore the complete portfolio—request access and we will share a
              curated set tailored to your listings.
            </p>
          </div>
          <Link
            href='/contact'
            className='btn-pill bg-luxtxt text-luxbg hover:bg-luxtxt/90 focus-visible:outline-luxtxt focus-visible:ring-2 focus-visible:ring-luxtxt/50'
            aria-label='Contact us to view the full portfolio'
          >
            Contact to View All
          </Link>
        </div>
      </section>
    </main>
  );
}
