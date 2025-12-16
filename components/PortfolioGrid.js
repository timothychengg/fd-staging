'use client';

import Image from 'next/image';
import { useState } from 'react';

export function PortfolioGrid({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const closeModal = () => setSelectedProject(null);

  return (
    <>
      <section className='section-shell space-y-4 py-10'>
        {projects.map((p) => (
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
    </>
  );
}
