export default function ProcessPage() {
  const steps = [
    {
      title: "Discovery",
      copy:
        "We begin with a quick call or Zoom consult to understand the property, timeline, and goals. You can share photos, floor plans, or a draft listing.",
    },
    {
      title: "Site Visit & Staging Plan",
      copy:
        "We walk the property, take measurements, and note light, sightlines, and focal points. You receive a proposed scope, style direction, and fees.",
    },
    {
      title: "Proposal & Scheduling",
      copy:
        "Once the proposal is approved, we confirm install and de-staging dates around photography and go-live timing.",
    },
    {
      title: "Design & Pull",
      copy:
        "Our team pulls furnishings, art, textiles, and accessories from curated inventory—tailored to the architecture and ideal buyer.",
    },
    {
      title: "Install Day",
      copy:
        "We handle delivery, installation, and full styling over the course of the day. Spaces are dialed in so the home is camera- and showing-ready.",
    },
    {
      title: "Show-Ready & De-Staging",
      copy:
        "We remain available for light refreshes as needed. After close or term end, we coordinate discreet de-staging and removal.",
    },
  ];

  return (
    <main className="min-h-screen bg-luxbg">
      <section className="section-shell border-b border-luxmuted/15 py-14">
        <p className="tagline mb-3 text-luxmuted">Process</p>
        <h1 className="heading-serif text-3xl mb-3">
          Effortless from first call to final showing.
        </h1>
        <p className="max-w-xl text-sm text-luxmuted">
          A clear, streamlined process that keeps everyone aligned—agents, sellers, and
          our team—so the listing launches smoothly and confidently.
        </p>
      </section>
      <section className="section-shell grid gap-4 py-10 text-sm md:grid-cols-2">
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="space-y-2 rounded-2xl border border-luxmuted/15 bg-white p-5"
          >
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-luxmuted">
              {String(index + 1).padStart(2, "0")} • {step.title}
            </p>
            <p className="text-luxmuted">{step.copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
