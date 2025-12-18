'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PROJECTS = [
  {
    name: '5246 S Montecito Dr, Concord, CA 94521',
    meta: 'Concord · 5 bd · 4.5 ba · 3,589 sq ft',
    result: 'Sold for $1,680,000 in 6 days.',
    description:
      'Open-plan home with warm woods, sculptural decor, and layered textiles to highlight indoor–outdoor flow.',
    photos: [
      '/concord1.webp',
      '/concord2.webp',
      '/concord3.webp',
      '/concord4.webp',
      '/concord5.webp',
      '/concord6.webp',
      '/concord7.webp',
      '/concord8.webp',
      '/concord9.webp',
      '/concord10.webp',
      '/concord11.webp',
    ],
  },
  {
    name: '2339 Kinetic Common Unit 202, Fremont, CA 94539',
    meta: 'Fremont · 3 bd · 2 ba · 1,550 sq ft',
    result: 'Multiple offers in the first weekend.',
    description:
      'Corner unit staged with soft neutrals, plush textures, and tailored silhouettes to create a calm, elevated backdrop.',
    photos: [
      '/fremont1.webp',
      '/fremont2.webp',
      '/fremont3.webp',
      '/fremont4.webp',
      '/fremont5.webp',
      '/fremont6.webp',
      '/fremont7.webp',
      '/fremont8.webp',
      '/fremont9.webp',
      '/fremont10.webp',
      '/fremont11.webp',
    ],
  },
  {
    name: '2339 Kinetic Cmn Unit 201, Fremont, CA 94539',
    meta: 'Fremont · 3 bd · 2.5 ba · 2,034 sq ft',
    result: 'Sold for $1,270,000 in Feb 2024.',
    description:
      'Metro Crossing condo staged with airy neutrals, sculptural lighting, and indoor–outdoor vignettes to play up 10-ft ceilings and balcony doors.',
    photos: [
      '/apt1.webp',
      '/apt2.webp',
      '/apt3.webp',
      '/apt4.webp',
      '/apt5.webp',
      '/apt6.webp',
      '/apt7.webp',
      '/apt8.webp',
      '/apt9.webp',
      '/apt10.webp',
      '/apt11.webp',
    ],
  },
  {
    name: '30 Park St, San Francisco, CA 94110',
    meta: 'San Francisco · 4 bd · 2 ba · 1,427 sq ft',
    result: 'All-cash offer within 10 days.',
    description:
      'Industrial loft softened with organic shapes, vintage-inspired pieces, and warm lighting to appeal to creative buyers.',
    photos: [
      '/sf1.webp',
      '/sf2.webp',
      '/sf3.webp',
      '/sf4.webp',
      '/sf5.webp',
      '/sf6.webp',
      '/sf7.webp',
      '/sf8.webp',
      '/sf9.webp',
      '/sf10.webp',
      '/sf11.webp',
    ],
  },
  {
    name: '1619 Hill Rd, Novato, CA 94947',
    meta: 'Novato · 4 bd · 2.5 ba · 2,604 sq ft',
    result: 'Sold for $1,240,000 in Mar 2025.',
    description:
      'Layered woods, stone, and airy textiles to warm a two-level hillside plan and draw buyers to the indoor–outdoor flow.',
    photos: [
      '/novato1.webp',
      '/novato2.webp',
      '/novato3.webp',
      '/novato4.webp',
      '/novato5.webp',
      '/novato6.webp',
      '/novato7.webp',
      '/novato8.webp',
      '/novato9.webp',
      '/novato10.webp',
      '/novato11.webp',
    ],
  },
  {
    name: '4301 Cesar Chavez, San Francisco, CA 94131',
    meta: 'San Francisco · 3 bd · 2 ba · 2,307 sq ft',
    result: 'Sold for $2,399,000 in Jul 2024.',
    description:
      'Noe Valley home staged with refined neutrals, sculptural lighting, and an open-concept flow to showcase designer upgrades.',
    photos: [
      '/cc1.jpg',
      '/cc2.jpg',
      '/cc3.jpg',
      '/cc4.jpg',
      '/cc5.jpg',
      '/cc6.jpg',
      '/cc7.jpg',
      '/cc8.jpg',
      '/cc9.jpg',
      '/cc10.jpg',
      '/cc11.jpg',
    ],
  },
  {
    name: '4319 Diavila Ave, Pleasanton, CA 94588',
    meta: 'Pleasanton · 3 bd · 2.5 ba · 1,858 sq ft',
    result: 'Sold for $1,650,000 in Oct 2024.',
    description:
      'Family-friendly staging with soft contrast, tailored seating, and indoor–outdoor cues to highlight the refreshed kitchen and yard.',
    photos: [
      '/pleas1.jpeg',
      '/pleas2.webp',
      '/pleas3.webp',
      '/pleas4.webp',
      '/pleas5.webp',
      '/pleas6.webp',
      '/pleas7.webp',
      '/pleas8.webp',
      '/pleas10.webp',
      '/pleas11.webp',
    ],
  },
  {
    name: '5308 Swainsons Ct, Concord, CA 94521',
    meta: 'Concord · 5 bd · 3 ba · 2,923 sq ft',
    result: 'Sold for $1,500,000 in Apr 2024.',
    description:
      'Bright, transitional staging with layered neutrals and greenery to emphasize volume, sightlines, and the private lot.',
    photos: [
      '/swain1.webp',
      '/swain2.webp',
      '/swain3.webp',
      '/swain4.webp',
      '/swain5.webp',
      '/swain6.webp',
      '/swain7.webp',
      '/swain8.webp',
      '/swain9.webp',
      '/swain10.webp',
      '/swain11.webp',
    ],
  },
];

const PLACEHOLDER_PHOTOS = [
  '/13.webp',
  '/servicesphoto.jpeg',
  '/13.webp',
  '/servicesphoto.jpeg',
];
const TOTAL_PLACEHOLDER_PHOTOS = PLACEHOLDER_PHOTOS.length;

const photoKey = (project, idx) => `${project.name}-${idx}`;
const photoCount = (project) =>
  project?.photos?.length || TOTAL_PLACEHOLDER_PHOTOS;

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [erroredPhotos, setErroredPhotos] = useState({});
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);

  const photoSrc = (project, idx) => {
    const photos =
      project?.photos?.length && project.photos.length > 0
        ? project.photos
        : PLACEHOLDER_PHOTOS;
    const fallback = PLACEHOLDER_PHOTOS[idx % TOTAL_PLACEHOLDER_PHOTOS];
    const key = photoKey(project, idx);
    if (erroredPhotos[key]) return fallback;
    return photos[idx % photos.length] || fallback;
  };

  const onPhotoError = (project, idx) => {
    setErroredPhotos((prev) => ({
      ...prev,
      [photoKey(project, idx)]: true,
    }));
  };

  const openModal = useCallback((project, startIndex = 0) => {
    setSelectedProject(project);
    setActivePhotoIndex(startIndex);
  }, []);

  const closeModal = useCallback(() => setSelectedProject(null), []);

  const showNextPhoto = useCallback(() => {
    if (!selectedProject) return;
    const count = photoCount(selectedProject);
    setActivePhotoIndex((prev) => (prev + 1) % count);
  }, [selectedProject]);

  const showPrevPhoto = useCallback(() => {
    if (!selectedProject) return;
    const count = photoCount(selectedProject);
    setActivePhotoIndex((prev) => (prev - 1 + count) % count);
  }, [selectedProject]);

  // Close on Escape + arrow key navigation + lock background scroll + focus trap
  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // focus the close button when modal opens
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNextPhoto();
      if (e.key === 'ArrowLeft') showPrevPhoto();

      // Simple focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const focusArray = Array.from(focusables);
        const first = focusArray[0];
        const last = focusArray[focusArray.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject, closeModal, showNextPhoto, showPrevPhoto]);

  return (
    <main className='min-h-screen bg-luxbg'>
      <section className='section-shell border-b border-luxmuted/15 py-14'>
        <div className='grid gap-8 md:grid-cols-[1.4fr,1fr] md:items-center'>
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

          <div className='relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-luxmuted/15 bg-[#e9e2d7] shadow-[0_12px_30px_rgba(15,15,15,0.08)]'>
            <Image
              src='/13.webp'
              alt='Staged interior showcasing F&D Staging portfolio work'
              fill
              className='object-cover object-[72%_45%] scale-[1.08]'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 400px'
              quality={85}
              unoptimized
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
            <div className='relative h-40 overflow-hidden bg-[#e9e2d7] md:h-full'>
              <Image
                src={photoSrc(p, 0)}
                alt={`${p.name} lead photo`}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 520px'
                unoptimized
                loading='lazy'
                onError={() => onPhotoError(p, 0)}
              />
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
                onClick={() => openModal(p, 0)}
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
              100+ staged homes across the Bay Area
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
            className='absolute left-1/2 top-1/2 flex h-[90vh] w-[92vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl'
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex w-full shrink-0 items-center justify-between border-b border-luxmuted/15 px-5 py-3'>
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
                ref={closeButtonRef}
              >
                Close
              </button>
            </div>

            <div className='flex flex-1 flex-col gap-3 overflow-hidden p-4'>
              <div className='relative flex-1 min-h-[50vh] w-full overflow-hidden rounded-xl border border-luxmuted/15 bg-luxbg'>
                <Image
                  src={photoSrc(selectedProject, activePhotoIndex)}
                  alt={`${selectedProject.name} photo ${activePhotoIndex + 1}`}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 960px'
                  unoptimized
                  priority={activePhotoIndex === 0}
                  loading={activePhotoIndex === 0 ? undefined : 'lazy'}
                  onError={() =>
                    onPhotoError(selectedProject, activePhotoIndex)
                  }
                />

                <button
                  type='button'
                  onClick={showPrevPhoto}
                  className='absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-sm font-semibold text-luxtxt shadow hover:bg-white'
                  aria-label='View previous photo'
                >
                  &lt;
                </button>
                <button
                  type='button'
                  onClick={showNextPhoto}
                  className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-sm font-semibold text-luxtxt shadow hover:bg-white'
                  aria-label='View next photo'
                >
                  &gt;
                </button>

                <div className='absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white'>
                  {String(activePhotoIndex + 1).padStart(2, '0')} /{' '}
                  {String(photoCount(selectedProject)).padStart(2, '0')}
                </div>
              </div>

              <div className='flex gap-2 overflow-x-auto pb-1'>
                {(selectedProject?.photos?.length
                  ? selectedProject.photos
                  : PLACEHOLDER_PHOTOS
                ).map((src, idx) => (
                  <button
                    key={`${selectedProject.name}-thumb-${idx}`}
                    type='button'
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative h-16 w-20 min-w-[5rem] overflow-hidden rounded-md border transition ${
                      idx === activePhotoIndex
                        ? 'border-luxtxt ring-2 ring-luxtxt/30'
                        : 'border-transparent hover:border-luxmuted/50'
                    }`}
                    aria-label={`Jump to photo ${idx + 1}`}
                    aria-current={idx === activePhotoIndex}
                  >
                    <Image
                      src={photoSrc(selectedProject, idx)}
                      alt={`${selectedProject.name} thumbnail ${idx + 1}`}
                      fill
                      className='object-cover'
                      sizes='80px'
                      unoptimized
                      loading='lazy'
                      onError={() => onPhotoError(selectedProject, idx)}
                    />
                  </button>
                ))}
              </div>

              <div className='flex items-center justify-between text-[0.9rem] text-luxmuted'>
                <span className='font-semibold text-luxtxt'>
                  {String(activePhotoIndex + 1).padStart(2, '0')} /{' '}
                  {String(photoCount(selectedProject)).padStart(2, '0')}
                </span>
                <div className='flex gap-2'>
                  <button
                    type='button'
                    onClick={showPrevPhoto}
                    className='rounded-full border border-luxmuted/30 px-3 py-1 text-sm text-luxtxt hover:bg-luxbg'
                    aria-label='Previous photo'
                  >
                    Previous
                  </button>
                  <button
                    type='button'
                    onClick={showNextPhoto}
                    className='rounded-full border border-luxmuted/30 px-3 py-1 text-sm text-luxtxt hover:bg-luxbg'
                    aria-label='Next photo'
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
