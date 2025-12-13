export const metadata = {
  title: "Contact – F&D Staging",
  description:
    "Share details about your property and staging needs. We'll follow up with next steps within one business day.",
};

// Static generation for better performance
export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-luxbg">
      <section className="section-shell border-b border-luxmuted/15 py-14">
        <p className="tagline mb-3 text-luxmuted">Contact</p>
        <h1 className="heading-serif text-3xl mb-3">
          Tell us about the property.
        </h1>
        <p className="max-w-xl text-sm text-luxmuted">
          Share a few details—address, timing, and what you're hoping staging will
          accomplish—and we'll follow up with next steps within one business day.
        </p>
      </section>
      <section className="section-shell grid gap-8 py-10 text-sm md:grid-cols-[1.4fr,1fr]">
        <form
          className="space-y-4 rounded-2xl border border-luxmuted/15 bg-white p-5"
          action="#"
          method="POST"
          aria-label="Contact form"
        >
          <div className="space-y-1">
            <label className="text-[0.8rem] font-medium" htmlFor="name">
              Name <span className="text-luxmuted/60">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-full border border-luxmuted/25 bg-[#f5efe7] px-3 py-2 text-sm outline-none transition-colors focus:border-luxaccent focus:bg-white focus:ring-2 focus:ring-luxaccent/20"
              placeholder="Your name"
              aria-required="true"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-[0.8rem] font-medium" htmlFor="email">
                Email <span className="text-luxmuted/60">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-full border border-luxmuted/25 bg-[#f5efe7] px-3 py-2 text-sm outline-none transition-colors focus:border-luxaccent focus:bg-white focus:ring-2 focus:ring-luxaccent/20"
                placeholder="you@example.com"
                aria-required="true"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[0.8rem] font-medium" htmlFor="phone">
                Phone <span className="text-luxmuted/60">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="w-full rounded-full border border-luxmuted/25 bg-[#f5efe7] px-3 py-2 text-sm outline-none transition-colors focus:border-luxaccent focus:bg-white focus:ring-2 focus:ring-luxaccent/20"
                placeholder="(000) 000-0000"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[0.8rem]" htmlFor="role">
              I am a…
            </label>
            <select
              id="role"
              className="w-full rounded-full border border-luxmuted/25 bg-[#f5efe7] px-3 py-2 text-sm outline-none"
            >
              <option>Real estate agent</option>
              <option>Homeowner / seller</option>
              <option>Developer / builder</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[0.8rem]" htmlFor="address">
              Property address
            </label>
            <input
              id="address"
              className="w-full rounded-full border border-luxmuted/25 bg-[#f5efe7] px-3 py-2 text-sm outline-none"
              placeholder="Street, City, ZIP"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-[0.8rem]" htmlFor="sqft">
                Approximate square footage
              </label>
              <input
                id="sqft"
                className="w-full rounded-full border border-luxmuted/25 bg-[#f5efe7] px-3 py-2 text-sm outline-none"
                placeholder="e.g., 2,400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[0.8rem]" htmlFor="timeline">
                Ideal install timing
              </label>
              <select
                id="timeline"
                className="w-full rounded-full border border-luxmuted/25 bg-[#f5efe7] px-3 py-2 text-sm outline-none"
              >
                <option>As soon as possible</option>
                <option>Within 1–2 weeks</option>
                <option>Within a month</option>
                <option>Just exploring options</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[0.8rem]" htmlFor="message">
              Anything else we should know?
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full rounded-2xl border border-luxmuted/25 bg-[#f5efe7] px-3 py-2 text-sm outline-none"
              placeholder="Share listing link, photos, unique features, or specific goals for the sale."
            />
          </div>
          <button
            type="submit"
            className="btn-pill bg-luxtxt text-luxbg hover:bg-luxtxt/90 focus-visible:outline-luxtxt"
            aria-label="Submit contact form"
          >
            Submit Inquiry
          </button>
          <p className="text-[0.8rem] text-luxmuted">
            We'll respond within one business day.
          </p>
        </form>
        <aside className="space-y-4 text-sm text-luxmuted">
          <div>
            <h2 className="tagline mb-1 text-[0.7rem] text-luxtxt">Studio</h2>
            <p>
              Los Angeles, CA
              <br />
              By appointment only
            </p>
          </div>
          <div>
            <h2 className="tagline mb-1 text-[0.7rem] text-luxtxt">Direct</h2>
            <p>
              hello@fanddstaging.com
              <br />
              (000) 000-0000
            </p>
          </div>
          <div>
            <h2 className="tagline mb-1 text-[0.7rem] text-luxtxt">
              Typical response
            </h2>
            <p>Within one business day for new project inquiries.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
