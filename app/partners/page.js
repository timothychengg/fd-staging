export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-luxbg">
      <section className="section-shell border-b border-luxmuted/15 py-14">
        <p className="tagline mb-3 text-luxmuted">For Agents &amp; Developers</p>
        <h1 className="heading-serif text-3xl mb-3">
          A staging partner that thinks like the deal team.
        </h1>
        <p className="max-w-xl text-sm text-luxmuted">
          We work as an extension of your listing and development team, supporting
          premium positioning, seamless launches, and consistent visual storytelling
          across your portfolio.
        </p>
      </section>
      <section className="section-shell grid gap-6 py-10 text-sm md:grid-cols-2">
        <article className="space-y-2 rounded-2xl border border-luxmuted/15 bg-white p-5">
          <h2 className="text-base font-semibold">Priority Scheduling</h2>
          <p className="text-luxmuted">
            Repeat partners receive preferred booking windows, rush options when
            available, and advance blocking for upcoming listings.
          </p>
        </article>
        <article className="space-y-2 rounded-2xl border border-luxmuted/15 bg-white p-5">
          <h2 className="text-base font-semibold">
            Volume &amp; Portfolio Pricing
          </h2>
          <p className="text-luxmuted">
            For agents and developers with multiple listings per year, we structure
            pricing to support long-term collaboration.
          </p>
        </article>
        <article className="space-y-2 rounded-2xl border border-luxmuted/15 bg-white p-5">
          <h2 className="text-base font-semibold">
            Listing Presentation Support
          </h2>
          <p className="text-luxmuted">
            Use our work in your listing presentations. We provide curated imagery and
            talking points that help explain the value of staging to sellers.
          </p>
        </article>
        <article className="space-y-2 rounded-2xl border border-luxmuted/15 bg-white p-5">
          <h2 className="text-base font-semibold">Marketing &amp; Content</h2>
          <p className="text-luxmuted">
            Thoughtful staging gives you more to share. We collaborate on assets and
            angles that support your brand across social, email, and print.
          </p>
        </article>
      </section>
    </main>
  );
}
