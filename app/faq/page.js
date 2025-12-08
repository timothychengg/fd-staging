const faqs = [
  {
    q: "How much does staging cost?",
    a: "Pricing varies based on square footage, scope, and duration. After a brief consult and viewing photos or the property, we provide a tailored proposal.",
  },
  {
    q: "How far in advance should we book?",
    a: "We recommend reaching out 1–2 weeks before photography. For rush projects, contact us and we'll share current availability.",
  },
  {
    q: "Can clients live in the home while it's staged?",
    a: "Yes. Many clients live in their homes during the listing period. In those cases, we design an occupied staging plan that balances showings with everyday life.",
  },
  {
    q: "What areas do you service?",
    a: "We are based in Los Angeles and primarily serve Greater LA and surrounding markets. For select projects outside that radius, travel fees may apply.",
  },
  {
    q: "What happens if the home doesn't sell within the staging term?",
    a: "Our proposals outline an initial staging term plus clear extension options if the listing needs more time on market.",
  },
  {
    q: "Do you work on furnished rentals or Airbnbs?",
    a: "We occasionally take on select furnished rental and Airbnb projects where design and visual storytelling are a priority.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-luxbg">
      <section className="section-shell border-b border-luxmuted/15 py-14">
        <p className="tagline mb-3 text-luxmuted">FAQ</p>
        <h1 className="heading-serif text-3xl mb-3">Questions about staging?</h1>
        <p className="max-w-xl text-sm text-luxmuted">
          Answers to the questions we hear most often about services, pricing, and what
          to expect when working together.
        </p>
      </section>
      <section className="section-shell space-y-3 py-10 text-sm">
        {faqs.map((item) => (
          <article
            key={item.q}
            className="space-y-1 rounded-2xl border border-luxmuted/15 bg-white p-5"
          >
            <h2 className="text-sm font-semibold">{item.q}</h2>
            <p className="text-luxmuted">{item.a}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
