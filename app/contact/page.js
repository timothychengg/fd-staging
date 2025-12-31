import { SocialLinks } from '../../components/SocialLinks';
import { ContactForm } from '../../components/ContactForm';

export const metadata = {
  title: 'Contact – F&D Staging',
  description:
    "Share details about your property and staging needs. We'll follow up with next steps within one business day.",
  openGraph: {
    title: 'Contact – F&D Staging',
    description:
      "Share details about your property and staging needs. We'll follow up with next steps within one business day.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact – F&D Staging',
    description:
      "Share details about your property and staging needs. We'll follow up with next steps within one business day.",
  },
};

// Dynamic because ContactForm is a client component
export const dynamic = 'force-dynamic';

export default function ContactPage() {
  return (
    <main className='min-h-screen bg-luxbg'>
      <section className='section-shell border-b border-luxmuted/15 py-14'>
        <p className='tagline mb-3 text-luxmuted'>Contact</p>
        <h1 className='heading-serif text-3xl mb-3'>
          Tell us about the property.
        </h1>
        <p className='max-w-xl text-sm text-luxmuted'>
          Share a few details—address, timing, and what you are hoping staging
          will accomplish—and we will follow up with next steps within one
          business day.
        </p>
      </section>
      <section className='section-shell grid gap-8 py-10 text-sm md:grid-cols-[1.4fr,1fr]'>
        <ContactForm />
        <aside className='space-y-4 text-sm text-luxmuted'>
          <div>
            <h2 className='tagline mb-1 text-[0.7rem] text-luxtxt'>Direct</h2>
            <p>
              dhwang1129@gmail.com
              <br />
              (408) 393-2161
            </p>
          </div>
          <div>
            <h2 className='tagline mb-1 text-[0.7rem] text-luxtxt'>
              Typical response
            </h2>
            <p>Within one business day for new project inquiries.</p>
          </div>
          <div>
            <h2 className='tagline mb-2 text-[0.7rem] text-luxtxt'>
              Connect with us
            </h2>
            <SocialLinks />
          </div>
        </aside>
      </section>
    </main>
  );
}
