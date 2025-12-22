import Image from 'next/image';
import Link from 'next/link';

// City-specific data
const CITY_DATA = {
  'san-francisco': {
    name: 'San Francisco',
    displayName: 'San Francisco',
    description:
      'Professional home staging services in San Francisco. We help premium listings in neighborhoods like Noe Valley, Pacific Heights, and Mission Bay sell faster and for higher prices.',
    keyNeighborhoods: [
      'Noe Valley',
      'Pacific Heights',
      'Mission Bay',
      'SOMA',
      'Hayes Valley',
      'Russian Hill',
    ],
    marketStats: {
      averageDaysOnMarket: '21 days',
      averageOverList: '15-25%',
      stagingROI: '286%',
    },
  },
  concord: {
    name: 'Concord',
    displayName: 'Concord',
    description:
      'Expert home staging in Concord, CA. Our team specializes in staging premium homes in Concord and surrounding East Bay communities to maximize sale price and reduce time on market.',
    keyNeighborhoods: [
      'Downtown Concord',
      'Clayton Valley',
      'Lime Ridge',
      'Montevideo',
    ],
    marketStats: {
      averageDaysOnMarket: '18 days',
      averageOverList: '12-20%',
      stagingROI: '286%',
    },
  },
  fremont: {
    name: 'Fremont',
    displayName: 'Fremont',
    description:
      'Premium staging services for Fremont homes and condos. We create aspirational interiors that help properties stand out in competitive Fremont real estate market.',
    keyNeighborhoods: [
      'Warm Springs',
      'Ardenwood',
      'Centerville',
      'Mission San Jose',
    ],
    marketStats: {
      averageDaysOnMarket: '22 days',
      averageOverList: '15-25%',
      stagingROI: '286%',
    },
  },
  oakland: {
    name: 'Oakland',
    displayName: 'Oakland',
    description:
      'Premium home staging in Oakland, CA. From Victorian homes to modern condos, we stage properties across Oakland to attract buyers and accelerate sales.',
    keyNeighborhoods: [
      'Rockridge',
      'Montclair',
      'Piedmont',
      'Lake Merritt',
      'Temescal',
    ],
    marketStats: {
      averageDaysOnMarket: '20 days',
      averageOverList: '15-25%',
      stagingROI: '286%',
    },
  },
  'palo-alto': {
    name: 'Palo Alto',
    displayName: 'Palo Alto',
    description:
      'High-end staging services for Palo Alto premium homes. We understand the Palo Alto market and create staging that appeals to discerning buyers in this premium market.',
    keyNeighborhoods: [
      'Old Palo Alto',
      'Professorville',
      'Crescent Park',
      'Downtown',
    ],
    marketStats: {
      averageDaysOnMarket: '19 days',
      averageOverList: '20-30%',
      stagingROI: '286%',
    },
  },
  'san-jose': {
    name: 'San Jose',
    displayName: 'San Jose',
    description:
      'Professional staging in San Jose, CA. We stage homes throughout San Jose and Silicon Valley, helping properties sell faster in this competitive tech-driven market.',
    keyNeighborhoods: [
      'Willow Glen',
      'Almaden Valley',
      'Evergreen',
      'Rose Garden',
      'Santana Row',
    ],
    marketStats: {
      averageDaysOnMarket: '21 days',
      averageOverList: '15-25%',
      stagingROI: '286%',
    },
  },
};

export async function generateStaticParams() {
  return Object.keys(CITY_DATA).map((city) => ({
    city: city,
  }));
}

export async function generateMetadata({ params }) {
  const cityData = CITY_DATA[params.city];
  if (!cityData) {
    return {
      title: 'Staging Services – F&D Staging',
    };
  }

  return {
    title: `Home Staging ${cityData.displayName} – F&D Staging`,
    description: cityData.description,
    openGraph: {
      title: `Home Staging ${cityData.displayName} – F&D Staging`,
      description: cityData.description,
      type: 'website',
    },
  };
}

export default function CityStagingPage({ params }) {
  const cityData = CITY_DATA[params.city];

  if (!cityData) {
    return (
      <main className='min-h-screen bg-luxbg'>
        <section className='section-shell py-14'>
          <h1 className='heading-serif text-3xl mb-3'>City Not Found</h1>
          <Link href='/services' className='text-luxaccent hover:underline'>
            View all services
          </Link>
        </section>
      </main>
    );
  }

  // LocalBusiness schema for this city
  const citySchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `F&D Staging - ${cityData.displayName}`,
    description: cityData.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityData.displayName,
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: cityData.displayName,
    },
    serviceType: 'Home Staging',
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(citySchema),
        }}
      />
      <main className='min-h-screen bg-luxbg'>
        <section className='section-shell border-b border-luxmuted/15 py-14'>
          <div className='grid gap-8 md:grid-cols-[1.4fr,1fr] md:items-center'>
            <div>
              <p className='tagline mb-3 text-luxmuted'>
                Staging Services in {cityData.displayName}
              </p>
              <h1 className='heading-serif text-3xl mb-3'>
                Home Staging in {cityData.displayName}, CA
              </h1>
              <p className='max-w-xl text-sm leading-relaxed text-luxmuted'>
                {cityData.description}
              </p>
            </div>
            <div className='relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-luxmuted/15 bg-[#e9e2d7] shadow-[0_12px_30px_rgba(15,15,15,0.08)]'>
              <Image
                src='/servicesphoto.jpeg'
                alt={`Home staging services in ${cityData.displayName}`}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 520px'
                quality={85}
                priority
              />
            </div>
          </div>
        </section>

        <section className='section-shell grid gap-6 py-10 md:grid-cols-2'>
          <div className='space-y-4 rounded-2xl border border-luxmuted/15 bg-white p-6'>
            <h2 className='heading-serif text-xl text-luxtxt'>
              Market Performance
            </h2>
            <div className='space-y-3 text-sm'>
              <div>
                <p className='text-[0.8rem] text-luxmuted'>
                  Average Days on Market
                </p>
                <p className='heading-serif text-2xl text-luxtxt'>
                  {cityData.marketStats.averageDaysOnMarket}
                </p>
              </div>
              <div>
                <p className='text-[0.8rem] text-luxmuted'>
                  Average Over List Price
                </p>
                <p className='heading-serif text-2xl text-luxtxt'>
                  {cityData.marketStats.averageOverList}
                </p>
              </div>
              <div>
                <p className='text-[0.8rem] text-luxmuted'>Staging ROI</p>
                <p className='heading-serif text-2xl text-luxtxt'>
                  {cityData.marketStats.stagingROI}
                </p>
              </div>
            </div>
          </div>

          <div className='space-y-4 rounded-2xl border border-luxmuted/15 bg-white p-6'>
            <h2 className='heading-serif text-xl text-luxtxt'>
              Areas We Serve in {cityData.displayName}
            </h2>
            <ul className='space-y-2 text-sm text-luxmuted'>
              {cityData.keyNeighborhoods.map((neighborhood) => (
                <li key={neighborhood} className='flex items-center gap-2'>
                  <span className='text-luxaccent'>•</span>
                  {neighborhood}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className='section-shell border-t border-luxmuted/15 py-10'>
          <div className='space-y-4 text-center'>
            <h2 className='heading-serif text-2xl text-luxtxt'>
              Ready to Stage Your {cityData.displayName} Property?
            </h2>
            <p className='max-w-2xl mx-auto text-sm text-luxmuted'>
              Get a free consultation and see how staging can help your property
              sell faster and for a higher price.
            </p>
            <div className='flex flex-wrap justify-center gap-4 pt-4'>
              <Link
                href='/contact'
                className='btn-pill bg-luxtxt text-luxbg hover:bg-luxtxt/90'
              >
                Get Free Consultation
              </Link>
              <Link
                href='/portfolio'
                className='btn-pill border border-luxtxt bg-transparent text-luxtxt hover:bg-luxtxt/10'
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
