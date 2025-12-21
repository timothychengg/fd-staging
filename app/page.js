'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState, memo } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import FeaturedReviews to reduce initial bundle size
const FeaturedReviews = dynamic(() => import('../components/FeaturedReviews').then(mod => ({ default: mod.FeaturedReviews })), {
  loading: () => (
    <div className='grid gap-6 md:grid-cols-2'>
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className='rounded-2xl border border-luxmuted/15 bg-white p-6 animate-pulse'
        >
          <div className='h-5 w-24 bg-gray-200 rounded mb-4'></div>
          <div className='space-y-2 mb-4'>
            <div className='h-4 bg-gray-200 rounded'></div>
            <div className='h-4 bg-gray-200 rounded w-5/6'></div>
          </div>
          <div className='pt-3 border-t border-luxmuted/10'>
            <div className='h-4 w-32 bg-gray-200 rounded'></div>
          </div>
        </div>
      ))}
    </div>
  ),
  ssr: true,
});

// Optimize motion components - memoize to prevent recreation
const MotionDiv = motion.div;
const MotionArticle = motion.article;

// Move static data outside component to prevent recreation on every render
const STATS = [
  {
    label: 'Faster Days on Market',
    value: '48%',
  },
  {
    label: 'Average Over List Price',
    value: '15–25%',
  },
  {
    label: 'Average Sale Time',
    value: '21 Days',
  },
  {
    label: 'ROI on Staging',
    value: '286%',
  },
  {
    label: 'Listing Volume',
    value: '300M+',
  },
];

const FEATURED_PROJECTS = [
  {
    name: 'Laurel Canyon Modern',
    address: '5246 Montecito Dr, Concord',
    area: 'Concord • 5 bd • 4.5 ba • 3,589 sq ft',
    blurb:
      'Open-plan home with warm woods, sculptural decor, and layered textiles to highlight indoor–outdoor flow. Sold for $1,680,000 in 6 days.',
    image: '/concord1.webp',
    imageAlt:
      'Staged living room in Concord home featuring modern furnishings and warm decor',
  },
  {
    name: 'Brentwood Soft Minimal',
    address: '2339 Kinetic Common Unit 202, Fremont',
    area: 'Fremont • 3 bd • 2 ba • 1,550 sq ft',
    blurb:
      'Corner unit staged with soft neutrals, plush textures, and tailored silhouettes to create a calm, elevated backdrop.',
    image: '/fremont1.webp',
    imageAlt:
      'Staged modern condominium in Fremont with contemporary minimalist design',
  },
  {
    name: 'Downtown Artist Loft',
    address: '30 Park St, San Francisco',
    area: 'San Francisco • 4 bd • 2 ba • 1,427 sq ft',
    blurb:
      'Industrial loft softened with organic shapes, vintage-inspired pieces, and warm lighting to appeal to creative buyers.',
    image: '/sf1.webp',
    imageAlt:
      'Staged Victorian home in San Francisco featuring elegant interior design',
  },
];

const PARTNER_LOGOS = [
  { name: 'Compass', image: '/Compass.png', alt: 'Compass Real Estate' },
  {
    name: 'Century 21',
    image: '/century.jpeg',
    alt: 'Century 21 Real Estate',
  },
  {
    name: "Christie's",
    image: '/christies.png',
    alt: "Christie's International Real Estate",
  },
  {
    name: 'Coldwell Banker',
    image: '/coldwell.jpg',
    alt: 'Coldwell Banker Real Estate',
  },
  { name: 'Intero', image: '/intero.webp', alt: 'Intero Real Estate' },
  {
    name: 'Keller Williams',
    image: '/kw.png',
    alt: 'Keller Williams Realty',
  },
];

const SERVICES = [
  {
    title: 'Full Staging',
    body: 'Ideal for empty homes, investor flips, and new construction. We furnish every room to tell a cohesive story and photograph beautifully.',
  },
  {
    title: 'Occupied Staging',
    body: 'Perfect for clients living in the home during the listing period. We work with what is there, then add what is needed.',
  },
  {
    title: 'Partial Staging',
    body: 'For builders and developers seeking cohesive, aspirational model homes and amenity spaces that support premium positioning.',
  },
];

// Enhanced structured data for SEO
const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://fanddstaging.com/#organization',
  name: 'F&D Staging',
  alternateName: 'F&D Staging - Luxury Home Staging',
  description:
    'Luxury home staging studio in the San Francisco Bay Area creating aspirational interiors that sell. Professional staging services for vacant homes, occupied listings, and new developments.',
  url: 'https://fanddstaging.com',
  telephone: '(408)393-2161',
  email: 'info@fanddstaging.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Concord, CA',
    addressLocality: 'Concord',
    addressRegion: 'CA',
    postalCode: '94520',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '37.9775',
    longitude: '-122.0311',
  },
  areaServed: [
    { '@type': 'City', name: 'San Francisco' },
    { '@type': 'City', name: 'Concord' },
    { '@type': 'City', name: 'Fremont' },
    { '@type': 'City', name: 'Oakland' },
    { '@type': 'City', name: 'Palo Alto' },
    { '@type': 'City', name: 'San Jose' },
    { '@type': 'City', name: 'Berkeley' },
    { '@type': 'City', name: 'Walnut Creek' },
  ],
  serviceType: 'Home Staging',
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '50+',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Sarah Chen',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      reviewBody:
        'F&D Staging transformed our listing completely. The attention to detail and design sensibility helped us sell the property in just two weeks. Highly professional and easy to work with.',
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Michael Rodriguez',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      reviewBody:
        'Working with Fiona and Daniel was a pleasure. They understood our vision and executed flawlessly. The staging made our home feel warm, inviting, and ready for buyers.',
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Jennifer Park',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      reviewBody:
        'The team at F&D Staging has an incredible eye for design. They helped us stage multiple units in our development, and each one looked magazine-ready. Buyers were impressed from day one.',
    },
  ],
  sameAs: [
    'https://www.instagram.com/fd_staging_408/',
    'https://www.facebook.com/fanddstaging',
    'https://www.linkedin.com/company/fanddstaging',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Home Staging Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Full Staging',
          description:
            'Complete staging for empty homes, investor flips, and new construction',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Occupied Staging',
          description:
            'Staging services for homes where clients are living during listing period',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Partial Staging',
          description:
            'Model home and amenity space staging for builders and developers',
        },
      },
    ],
  },
};

const VIDEO_SEGMENT_START = 2; // seconds into clip
const VIDEO_SEGMENT_END = 18; // seconds into clip
const VIDEO_PLAYBACK_RATE = 0.85;

// Memoized VideoBanner component for performance
const VideoBanner = memo(function VideoBanner() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { rootMargin: '50px' }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView) return;

    // Set video properties for optimal playback
    video.loop = false; // we manually loop the best segment
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';

    // Once metadata is ready, jump to the desired start segment
    const handleLoadedMetadata = () => {
      try {
        video.currentTime = VIDEO_SEGMENT_START;
      } catch (e) {
        // ignore if seeking before ready
      }
    };

    // Handle video loaded and ready to play
    const handleCanPlay = () => {
      video.playbackRate = VIDEO_PLAYBACK_RATE;
      setIsLoaded(true);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setVideoError(true);
        });
      }
    };

    // Handle video errors
    const handleError = () => {
      setVideoError(true);
    };

    const handleTimeUpdate = () => {
      if (video.currentTime >= VIDEO_SEGMENT_END) {
        video.currentTime = VIDEO_SEGMENT_START;
        video.play().catch(() => setVideoError(true));
      }
    };

    // Add event listeners
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Try to play immediately if video is already loaded
    if (video.readyState >= 3) {
      handleCanPlay();
    } else {
      video.load();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [isInView]);

  return (
    <div ref={containerRef} className='absolute inset-0'>
      {/* Fallback image - always visible as background, hidden when video loads */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          videoError || !isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {!imageError ? (
          <Image
            src='https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600&auto=format&fit=crop'
            alt='Luxury home staging interior with elegant furnishings'
            fill
            priority
            quality={90}
            className='object-cover'
            sizes='100vw'
            onError={() => setImageError(true)}
          />
        ) : (
          <div className='absolute inset-0 bg-gradient-to-br from-[#e9e2d7] via-[#d4c5b0] to-[#c4b5a0]' />
        )}
      </div>

      {/* Video background - shown when loaded successfully */}
      {isInView && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          poster='/13.webp'
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            isLoaded && !videoError ? 'opacity-100' : 'opacity-0'
          }`}
          preload='metadata'
          aria-label='Luxury home staging video background showcasing elegant interiors'
          onError={() => {
            setVideoError(true);
          }}
        >
          <source src='/homepage-video.mp4' type='video/mp4' />
          <source src='/hero-banner.mp4' type='video/mp4' />
          <source src='/hero-banner.webm' type='video/webm' />
        </video>
      )}
    </div>
  );
});

VideoBanner.displayName = 'VideoBanner';

export default function Home() {
  return (
    <>
      {/* Enhanced Structured Data for SEO */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(STRUCTURED_DATA),
        }}
      />
      <main id='main-content' className='min-h-screen bg-luxbg'>
        {/* HERO */}
        <section
          className='relative overflow-hidden min-h-[70vh]'
          aria-label='Hero section with video background'
        >
          <div className='absolute inset-0 z-0'>
            <VideoBanner />
          </div>
          <MotionDiv
            className='absolute inset-0 bg-gradient-to-r from-[#181515]/80 via-[#181515]/55 to-transparent z-[1]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            aria-hidden='true'
          />
          <div className='section-shell relative flex min-h-[70vh] flex-col justify-center py-20 text-luxbg z-[2]'>
            <MotionDiv
              className='max-w-xl space-y-5'
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <p className='tagline text-luxbg/70'>
                LUXURY HOME STAGING • SAN FRANCISCO BAY AREA
              </p>
              <h1 className='heading-serif text-4xl leading-tight md:text-5xl'>
                Stage the home.
                <br />
                Elevate the offer.
              </h1>
              <p className='max-w-md text-sm text-luxbg/85'>
                F&amp;D Staging turns empty properties into inviting,
                market-ready homes that photograph crisply, show beautifully,
                and sell faster at stronger prices.
              </p>
              <div className='flex flex-wrap gap-4 pt-1'>
                <Link
                  href='/contact'
                  prefetch={true}
                  className='btn-pill bg-luxbg text-luxtxt hover:bg-luxbg/90 focus-visible:outline-luxbg focus-visible:ring-2 focus-visible:ring-luxbg/50'
                  aria-label='Book a consultation with F&D Staging'
                >
                  Book a Consultation
                </Link>
                <a
                  href='tel:+14083932161'
                  className='btn-pill border border-luxbg/70 bg-transparent text-luxbg hover:bg-luxbg/10 focus-visible:outline-luxbg focus-visible:ring-2 focus-visible:ring-luxbg/50'
                  aria-label='Call F&D Staging at (408) 393-2161'
                >
                  Call (408) 393-2161
                </a>
                <Link
                  href='/portfolio'
                  prefetch={true}
                  className='btn-pill border border-luxbg/70 bg-transparent text-luxbg hover:bg-luxbg/10 focus-visible:outline-luxbg focus-visible:ring-2 focus-visible:ring-luxbg/50'
                  aria-label='View our portfolio of staged homes'
                >
                  View Portfolio
                </Link>
              </div>
              <div className='flex flex-col gap-2 pt-2'>
                <p className='text-[0.72rem] uppercase tracking-[0.18em] text-luxbg/70'>
                  Serving the San Francisco Bay Area • Trusted by agents,
                  developers, and homeowners
                </p>
                <div className='flex items-center gap-2 text-[0.7rem] text-luxbg/80'>
                  <span className='flex items-center gap-1'>
                    <span className='text-yellow-400'>★★★★★</span>
                    <span>5.0 Rating</span>
                  </span>
                  <span>•</span>
                  <span>50+ Reviews</span>
                  <span>•</span>
                  <span>286% ROI</span>
                </div>
              </div>
            </MotionDiv>
          </div>
        </section>

        {/* STAT BAR */}
        <section
          className='border-b border-luxmuted/15 bg-white'
          aria-labelledby='stats-heading'
        >
          <div className='section-shell grid gap-6 py-8 text-sm md:grid-cols-3 lg:grid-cols-5'>
            <h2 id='stats-heading' className='sr-only'>
              Performance statistics
            </h2>
            {STATS.map((item, idx) => (
              <MotionDiv
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <div className='heading-serif text-2xl'>{item.value}</div>
                <p className='mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-luxmuted'>
                  {item.label}
                </p>
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section
          className='section-shell space-y-6 py-16'
          aria-label='Featured staging projects'
        >
          <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-end'>
            <div>
              <p className='tagline mb-2 text-luxmuted'>Featured Projects</p>
              <h2 className='heading-serif text-2xl'>
                Spaces that sold the story.
              </h2>
              <p className='mt-2 max-w-md text-sm text-luxmuted'>
                A glimpse into recent homes, lofts, and developments staged to
                feel elevated, warm, and ready to move into.
              </p>
            </div>
            <Link
              href='/portfolio'
              prefetch={true}
              className='text-[0.78rem] uppercase tracking-[0.18em] text-luxtxt hover:text-luxaccent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-luxaccent focus-visible:outline-offset-2'
              aria-label='View full portfolio of staged homes'
            >
              View Full Portfolio →
            </Link>
          </div>

          <div className='grid gap-6 md:grid-cols-3'>
            {FEATURED_PROJECTS.map((project, idx) => (
              <MotionArticle
                key={project.name}
                className='group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_rgba(15,15,15,0.06)] transition-shadow hover:shadow-[0_18px_50px_rgba(15,15,15,0.12)]'
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.12 * idx }}
                whileHover={{ y: -6 }}
              >
                <div className='relative h-52 overflow-hidden bg-[#e9e2d7]'>
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    quality={85}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    fetchPriority={idx === 0 ? 'high' : 'low'}
                  />
                  <div className='absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/50 via-black/20 to-transparent'>
                    <span className='text-[0.7rem] uppercase tracking-[0.18em] text-white drop-shadow-lg'>
                      {project.address}
                    </span>
                  </div>
                </div>
                <div className='space-y-2 p-5 text-sm'>
                  <p className='text-[0.8rem] font-medium text-luxmuted'>
                    {project.area}
                  </p>
                  <p className='text-luxmuted leading-relaxed'>
                    {project.blurb}
                  </p>
                </div>
              </MotionArticle>
            ))}
          </div>
        </section>

        {/* SERVICES STRIP */}
        <section
          className='border-y border-luxmuted/15 bg-[#f2ede6]'
          aria-label='Staging services'
        >
          <div className='section-shell space-y-6 py-16'>
            <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-end'>
              <div>
                <p className='tagline mb-2 text-luxmuted'>Services</p>
                <h2 className='heading-serif text-2xl'>
                  Staging that meets the moment.
                </h2>
                <p className='mt-2 max-w-md text-sm text-luxmuted'>
                  Tailored support for vacant homes, occupied listings, and new
                  developments—each with a clear, predictable process.
                </p>
              </div>
              <Link
                href='/services'
                prefetch={true}
                className='text-[0.78rem] uppercase tracking-[0.18em] text-luxtxt hover:text-luxaccent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-luxaccent focus-visible:outline-offset-2'
                aria-label='Explore our staging services'
              >
                Explore Services →
              </Link>
            </div>

            <div className='grid gap-6 text-sm md:grid-cols-3'>
              {SERVICES.map((service, idx) => (
                <MotionDiv
                  key={service.title}
                  className='rounded-2xl bg-white p-5 transition-shadow hover:shadow-lg'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <h3 className='mb-1 text-sm font-semibold'>
                    {service.title}
                  </h3>
                  <p className='text-luxmuted leading-relaxed'>
                    {service.body}
                  </p>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED REVIEWS */}
        <section
          className='section-shell space-y-6 py-16'
          aria-label='Featured client reviews'
        >
          <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-end'>
            <div>
              <p className='tagline mb-2 text-luxmuted'>Client Reviews</p>
              <h2 className='heading-serif text-2xl'>
                What our clients are saying.
              </h2>
              <p className='mt-2 max-w-md text-sm text-luxmuted'>
                Real feedback from real estate agents, homeowners, and
                developers across the San Francisco Bay Area.
              </p>
            </div>
            <Link
              href='/reviews'
              prefetch={true}
              className='text-[0.78rem] uppercase tracking-[0.18em] text-luxtxt hover:text-luxaccent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-luxaccent focus-visible:outline-offset-2'
              aria-label='View all client reviews and testimonials'
            >
              View All Reviews →
            </Link>
          </div>

          <FeaturedReviews />
        </section>

        {/* TRUST STRIP - Rolling Banner */}
        <section className='bg-luxbg' aria-label='Trusted real estate partners'>
          <div className='section-shell border-b border-luxmuted/15 py-10'>
            <p className='tagline mb-6 text-center text-luxmuted'>
              Trusted by agents and teams from
            </p>
            <div className='flex flex-wrap items-center justify-center gap-x-12 gap-y-6 px-4'>
              {PARTNER_LOGOS.map((logo) => (
                <div
                  key={logo.name}
                  className='flex items-center justify-center'
                >
                  <Image
                    src={logo.image}
                    alt={logo.alt}
                    width={140}
                    height={70}
                    className='h-auto max-h-14 w-auto object-contain'
                    quality={75}
                    loading='lazy'
                    sizes='(max-width: 768px) 100px, 140px'
                    fetchPriority='low'
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section
          className='section-shell border-b border-luxmuted/15 bg-white py-16'
          aria-label='Get started with F&D Staging'
        >
          <div className='mx-auto max-w-3xl text-center'>
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className='heading-serif text-3xl mb-4 text-luxtxt md:text-4xl'>
                Ready to stage your property?
              </h2>
              <p className='mb-8 text-sm leading-relaxed text-luxmuted md:text-base'>
                Get a free consultation and see how professional staging can
                help your property sell faster and for a higher price. We
                respond within one business day.
              </p>
              <div className='flex flex-wrap justify-center gap-4'>
                <Link
                  href='/contact'
                  prefetch={true}
                  className='btn-pill bg-luxtxt text-luxbg hover:bg-luxtxt/90 focus-visible:outline-luxtxt focus-visible:ring-2 focus-visible:ring-luxtxt/50'
                  aria-label='Get a free staging consultation'
                >
                  Get Free Consultation
                </Link>
                <a
                  href='tel:+14083932161'
                  className='btn-pill border-2 border-luxtxt bg-transparent text-luxtxt hover:bg-luxtxt hover:text-luxbg focus-visible:outline-luxtxt focus-visible:ring-2 focus-visible:ring-luxtxt/50'
                  aria-label='Call F&D Staging at (408) 393-2161'
                >
                  Call (408) 393-2161
                </a>
                <Link
                  href='/portfolio'
                  prefetch={true}
                  className='btn-pill border border-luxtxt bg-transparent text-luxtxt hover:bg-luxtxt/10 focus-visible:outline-luxtxt focus-visible:ring-2 focus-visible:ring-luxtxt/50'
                  aria-label='View our portfolio of staged homes'
                >
                  View Portfolio
                </Link>
              </div>
              <p className='mt-6 text-[0.8rem] text-luxmuted'>
                Serving San Francisco, Concord, Fremont, Oakland, Palo Alto, San
                Jose, and the entire Bay Area
              </p>
            </MotionDiv>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className='bg-luxbg' aria-label='Contact call to action'>
          <MotionDiv
            className='section-shell flex flex-col items-start justify-between gap-4 py-12 md:flex-row md:items-center'
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45 }}
          >
            <div>
              <h2 className='heading-serif text-xl'>
                Have a listing coming to market?
              </h2>
              <p className='mt-2 max-w-md text-sm text-luxmuted leading-relaxed'>
                Share the address, timeline, and a few photos—we will follow up
                with recommendations and a clear, fast proposal.
              </p>
            </div>
            <Link
              href='/contact'
              prefetch={true}
              className='btn-pill bg-luxtxt text-luxbg hover:bg-luxtxt/90 focus-visible:outline-luxtxt focus-visible:ring-2 focus-visible:ring-luxtxt/50'
              aria-label='Start a new staging project'
            >
              Start a Project
            </Link>
          </MotionDiv>
        </section>
      </main>
    </>
  );
}
