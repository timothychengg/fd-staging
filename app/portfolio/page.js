export default function PortfolioPage() {
  const projects = [
    {
      name: "Laurel Canyon Modern",
      meta: "Hollywood Hills · 4 bd · Modern",
      result: "Sold in 6 days at 18% over list.",
      description:
        "Light-filled open-plan home staged with warm woods, sculptural decor, and layered textiles to highlight the indoor–outdoor flow.",
    },
    {
      name: "Brentwood Soft Minimal",
      meta: "Brentwood · 5 bd · Transitional",
      result: "Multiple offers in the first weekend.",
      description:
        "Soft neutrals, plush textures, and refined silhouettes created a calm, elevated backdrop for family living.",
    },
    {
      name: "Downtown Artist Loft",
      meta: "DTLA · Loft · Industrial",
      result: "All-cash offer within 10 days.",
      description:
        "Industrial bones softened with organic shapes, vintage-inspired pieces, and warm lighting for creative buyers.",
    },
    {
      name: "Silver Lake Bungalow",
      meta: "Silver Lake · 3 bd · Bungalow",
      result: "Sold over asking after first open house.",
      description:
        "Playful yet polished staging with layered art and color that kept the home feeling fresh and approachable.",
    },
  ];

  return (
    <main className="min-h-screen bg-luxbg">
      <section className="section-shell border-b border-luxmuted/15 py-14">
        <p className="tagline mb-3 text-luxmuted">Portfolio</p>
        <h1 className="heading-serif text-3xl mb-3">Spaces that sold the story.</h1>
        <p className="max-w-xl text-sm text-luxmuted">
          A selection of staged homes, lofts, and developments designed to photograph
          beautifully and feel instantly livable when buyers walk through the door.
        </p>
      </section>
      <section className="section-shell space-y-4 py-10">
        {projects.map((p) => (
          <article
            key={p.name}
            className="grid overflow-hidden rounded-2xl border border-luxmuted/15 bg-white md:grid-cols-[1.2fr,1.4fr]"
          >
            <div className="flex h-40 items-center justify-center bg-[#e9e2d7] text-[0.7rem] uppercase tracking-[0.16em] text-luxmuted md:h-full">
              {p.name}
            </div>
            <div className="space-y-2 p-5 text-sm">
              <h2 className="text-base font-semibold">{p.name}</h2>
              <p className="text-[0.8rem] text-luxmuted">{p.meta}</p>
              <p className="text-luxmuted">{p.description}</p>
              <p className="text-[0.8rem] font-medium text-luxmuted">{p.result}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
