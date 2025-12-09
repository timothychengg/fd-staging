export default function ServicesPage() {
  return (
    <main className='min-h-screen bg-luxbg'>
      <section className='section-shell border-b border-luxmuted/15 py-14'>
        <p className='tagline mb-3 text-luxmuted'>Services</p>
        <h1 className='heading-serif text-3xl mb-3'>
          Full Staging, Partial Staging, and Occupied Staging
        </h1>
        <p className='max-w-xl text-sm text-luxmuted'>
          From vacant homes to lived-in family spaces and new developments, each
          project is tailored to the property, buyer, and market.
        </p>
      </section>
      <section className='section-shell grid gap-6 py-10 text-sm md:grid-cols-2'>
        <article className='space-y-2 rounded-2xl border border-luxmuted/15 bg-white p-5'>
          <h2 className='text-base font-semibold'>Full Staging</h2>
          <p className='text-luxmuted'>
            Ideal for empty homes, investor flips, and new construction. We
            furnish every room to tell a cohesive story and photograph
            beautifully.
          </p>
          <ul className='ml-5 list-disc space-y-1 text-luxmuted'>
            <li>Full furniture, art, and accessories</li>
            <li>Space planning, styling, and installation</li>
            <li>De-staging after close or listing term</li>
          </ul>
        </article>
        <article className='space-y-2 rounded-2xl border border-luxmuted/15 bg-white p-5'>
          <h2 className='text-base font-semibold'>Occupied Staging</h2>
          <p className='text-luxmuted'>
            Perfect for clients living in the home during the listing period. We
            work with what is there, then add what is needed.
          </p>
          <ul className='ml-5 list-disc space-y-1 text-luxmuted'>
            <li>Pre-listing walkthrough and recommendations</li>
            <li>Editing and re-arranging existing pieces</li>
            <li>Targeted additions of furniture and decor</li>
          </ul>
        </article>
        <article className='space-y-2 rounded-2xl border border-luxmuted/15 bg-white p-5'>
          <h2 className='text-base font-semibold'>Partial Staging</h2>
          <p className='text-luxmuted'>
            For builders and developers seeking cohesive, aspirational model
            homes and amenity spaces that support premium positioning.
          </p>
          <ul className='ml-5 list-disc space-y-1 text-luxmuted'>
            <li>Model unit and sales office design</li>
            <li>Amenity and common-area styling</li>
            <li>Multi-unit and phased roll-out options</li>
          </ul>
        </article>
        <article className='space-y-2 rounded-2xl border border-luxmuted/15 bg-white p-5'>
          <h2 className='text-base font-semibold'>Consultation</h2>
          <p className='text-luxmuted'>
            Additional services that keep the listing process cohesive from prep
            through closing.
          </p>
          <ul className='ml-5 list-disc space-y-1 text-luxmuted'>
            <li>Pre-listing design consultations (virtual or in-person)</li>
            <li>Artwork and accessories for longer-term use</li>
            <li>Photography and media coordination support</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
