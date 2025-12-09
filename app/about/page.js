export default function AboutPage() {
  return (
    <main className='min-h-screen bg-luxbg'>
      <section className='section-shell border-b border-luxmuted/15 py-14'>
        <p className='tagline mb-3 text-luxmuted'>About Us</p>
        <h1 className='heading-serif text-3xl mb-3'>
          Fiona and Daniel
        </h1>
        <p className='max-w-xl text-sm text-luxmuted'>
          F&amp;D Staging is a design studio focused on creating elevated,
          livable spaces that help listings stand out in photos and feel
          instantly welcoming in person.
        </p>
      </section>
      <section className='section-shell grid gap-8 py-10 text-sm md:grid-cols-2'>
        <div className='space-y-3 text-luxmuted'>
          <h2 className='heading-serif text-lg text-luxtxt'>Our Story</h2>
          <p>
            We believe staging is more than filling a room with furniture. It is
            about telling a story that feels aspirational yet attainable—aligned
            with how buyers actually want to live.
          </p>
          <p>
            Every project balances design intuition with market insight. We
            consider the architecture, neighborhood, and buyer profile before we
            bring in a single piece.
          </p>
        </div>
        <div className='space-y-3 text-luxmuted'>
          <h2 className='heading-serif text-lg text-luxtxt'>Our Mission</h2>
          <p>
            Based in Los Angeles, we work across Greater LA and surrounding
            markets in partnership with agents, developers, and homeowners who
            care about presentation.
          </p>
          <p>
            Our team is intentionally lean and detail-focused. That means clear
            communication, thoughtful edits, and staging that respects both the
            property and your time.
          </p>
        </div>
      </section>
      <section className='section-shell space-y-4 pb-14'>
        <h2 className='heading-serif mb-2 text-lg text-luxtxt'>
          Founding Team
        </h2>
        <div className='grid gap-6 text-sm md:grid-cols-2'>
          <article className='space-y-2 rounded-2xl border border-luxmuted/15 bg-white p-5'>
            <div className='mb-2 flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#e9e2d7] text-xs'>
                TC
              </div>
              <div>
                <h3 className='text-sm font-semibold'>Daniel Hwang</h3>
                <p className='text-[0.8rem] text-luxmuted'>
                  Founder &amp; Creative Director
                </p>
              </div>
            </div>
            <p className='text-luxmuted'>
              Timothy brings a background in design, real estate, and visual
              storytelling. He is obsessed with natural light, sightlines, and
              the small details that make a room feel finished.
            </p>
          </article>
          <article className='space-y-2 rounded-2xl border border-luxmuted/15 bg-white p-5'>
            <div className='mb-2 flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#e9e2d7] text-xs'>
                pic
              </div>
              <div>
                <h3 className='text-sm font-semibold'>Fiona Lu</h3>
                <p className='text-[0.8rem] text-luxmuted'>Lead Stylist</p>
              </div>
            </div>
            <p className='text-luxmuted'>
              Alex focuses on textiles, layering, and styled moments that draw
              buyers deeper into the space—both in photos and in person.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
