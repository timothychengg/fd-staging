'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-static';

const PROJECTS = [
  {
    name: 'Laurel Canyon Modern',
    meta: 'Hollywood Hills · 4 bd · Modern',
    result: 'Sold in 6 days at 18% over list.',
    description:
      'Light-filled modern staged with warm woods, sculptural decor, and layered textiles to emphasize indoor–outdoor flow.',
    photos: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    name: 'Brentwood Soft Minimal',
    meta: 'Brentwood · 5 bd · Transitional',
    result: 'Multiple offers in the first weekend.',
    description:
      'Soft neutrals, plush textures, and refined silhouettes created a calm, elevated backdrop for family living.',
    photos: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    name: 'Downtown Artist Loft',
    meta: 'DTLA · Loft · Industrial',
    result: 'All-cash offer within 10 days.',
    description:
      'Industrial shell softened with organic forms, vintage-inspired pieces, and warm lighting tailored to creative buyers.',
    photos: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    name: 'Silver Lake Bungalow',
    meta: 'Silver Lake · 3 bd · Bungalow',
    result: 'Sold over asking after first open house.',
    description:
      'Playful, polished staging with layered art and color to keep the bungalow feeling fresh and approachable.',
    photos: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    name: 'Pasadena Craftsman',
    meta: 'Pasadena · 4 bd · Craftsman',
    result: 'Received 7 offers in the first weekend.',
    description:
      'Warm woods, tailored millwork accents, and softened lines to respect the architecture while modernizing the feel.',
    photos: [
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    name: 'West Hollywood Condo',
    meta: 'West Hollywood · 2 bd · Condo',
    result: 'Sold over list in 9 days.',
    description:
      'Light, textural staging with sculptural lighting to make a compact layout feel open and premium.',
    photos: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    name: 'Manhattan Beach Modern',
    meta: 'Manhattan Beach · 5 bd · Coastal Modern',
    result: 'All-cash offer after first showings.',
    description:
      'Coastal palette with clean lines and layered textiles to spotlight natural light and indoor–outdoor flow.',
    photos: [
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    name: 'Beverly Hills Spanish',
    meta: 'Beverly Hills · 6 bd · Spanish Revival',
    result: 'Closed in 14 days with multiple offers.',
    description:
      'Refined staging that pairs vintage-inspired pieces with modern silhouettes to honor character and elevate value.',
    photos: [
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1600&auto=format&fit=crop',
    ],
  },
];

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  const closeModal = () => setSelectedProject(null);

  return (
    <main className='min-h-screen bg-luxbg'>
      <section className='section-shell border-b border-luxmuted/15 py-14'>
        <div className='grid gap-6 md:grid-cols-[1.2fr,1fr] md:items-start'>
          <div>
            <p className='tagline mb-3 text-luxmuted'>Portfolio</p>
            <h1 className='heading-serif mb-3 text-3xl'>
              Spaces that sold the story.
            </h1>
            <p className='max-w-xl text-sm text-luxmuted'>
              A selection of staged homes, lofts, and developments designed to
              photograph beautifully and feel immediately livable when buyers
              walk through.
            </p>
          </div>

          <div className='relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-luxmuted/10 bg-luxbg shadow-[0_4px_12px_rgba(15,15,15,0.08)]'>
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
        {PROJECTS.map((p) => (
          <article
            key={p.name}
            className='grid overflow-hidden rounded-2xl border border-luxmuted/15 bg-white transition-shadow hover:shadow-lg md:grid-cols-[1.2fr,1.4fr]'
          >
            <div className='flex h-40 items-center justify-center bg-[#e9e2d7] text-[0.7rem] uppercase tracking-[0.16em] text-luxmuted md:h-full'>
              {p.name}
            </div>

            <div className='space-y-3 p-5 text-sm'>
              <h2 className='text-base font-semibold'>{p.name}</h2>
              <p className='text-[0.8rem] text-luxmuted'>{p.meta}</p>
              <p className='text-luxmuted'>{p.description}</p>
              <p className='text-[0.8rem] font-medium text-luxmuted'>
                {p.result}
              </p>

              <button
                type='button'
                onClick={() => setSelectedProject(p)}
                className='text-[0.8rem] font-medium text-luxtxt underline underline-offset-4 hover:text-luxaccent'
                aria-label={`View photos for ${p.name}`}
              >
                View photos
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className='section-shell py-12'>
        <div className='flex flex-col gap-4 rounded-2xl border border-luxmuted/15 bg-white p-6 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-2'>
            <p className='tagline text-luxmuted'>Full Portfolio</p>
            <h2 className='heading-serif text-xl text-luxtxt'>
              40+ staged homes across the Bay Area
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

      {selectedProject && (
        <div
          className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm'
          role='dialog'
          aria-modal='true'
          aria-label={`${selectedProject.name} photos`}
          onClick={closeModal}
        >
          <div
            className='absolute left-1/2 top-1/2 max-h-[80vh] w-[90vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between border-b border-luxmuted/15 px-5 py-3'>
              <div>
                <p className='tagline text-luxmuted'>Project Gallery</p>
                <h3 className='heading-serif text-lg text-luxtxt'>
                  {selectedProject.name}
                </h3>
                <p className='text-[0.85rem] text-luxmuted'>
                  {selectedProject.meta}
                </p>
              </div>

              <button
                type='button'
                onClick={closeModal}
                className='rounded-full border border-luxmuted/30 px-3 py-1 text-sm text-luxtxt hover:bg-luxbg'
                aria-label='Close project photos'
              >
                Close
              </button>
            </div>

            <div className='grid max-h-[70vh] grid-cols-2 gap-2 overflow-y-auto p-4 sm:grid-cols-3'>
              {selectedProject.photos.slice(0, 10).map((src, idx) => (
                <div
                  key={`${selectedProject.name}-${idx}`}
                  className='relative h-32 overflow-hidden rounded-lg sm:h-36 md:h-40'
                >
                  <Image
                    src={src}
                    alt={`${selectedProject.name} photo ${idx + 1}`}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
                    quality={80}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
