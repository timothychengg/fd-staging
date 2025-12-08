"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const stats = [
    {
      label: "Faster Days on Market",
      value: "48%",
    },
    {
      label: "Average Over List Price",
      value: "15–25%",
    },
    {
      label: "Homes Styled",
      value: "300+",
    },
    {
      label: "Listing Volume",
      value: "$1.2B+",
    },
  ];

  const featured = [
    {
      name: "Laurel Canyon Modern",
      area: "Hollywood Hills • 4 bd • Modern",
      blurb:
        "Sun-drenched modern with warm woods and sculptural decor that helped attract multiple offers in the first week.",
    },
    {
      name: "Brentwood Soft Minimal",
      area: "Brentwood • 5 bd • Transitional",
      blurb:
        "Soft neutrals, layered textiles, and refined silhouettes created a calm, elevated backdrop for family living.",
    },
    {
      name: "Downtown Artist Loft",
      area: "DTLA • Loft • Industrial",
      blurb:
        "Industrial shell softened with organic shapes and warm lighting for creative buyers.",
    },
  ];

  const logos = ["Compass", "The Agency", "Douglas Elliman", "Sotheby’s"];

  return (
    <main className="min-h-screen bg-luxbg">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1617099404995-0a2b4d90c4f5?q=80&w=1600&auto=format&fit=crop')",
          }}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#181515]/80 via-[#181515]/55 to-transparent" />
        <div className="section-shell relative flex min-h-[70vh] flex-col justify-center py-20 text-luxbg">
          <motion.div
            className="max-w-xl space-y-5"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="tagline text-luxbg/70">
              LUXURY HOME STAGING • LOS ANGELES
            </p>
            <h1 className="heading-serif text-4xl leading-tight md:text-5xl">
              Stage the home.
              <br />
              Elevate the offer.
            </h1>
            <p className="max-w-md text-sm text-luxbg/85">
              F&amp;D Staging transforms empty rooms into warm, aspirational homes
              that photograph beautifully, show effortlessly, and sell faster at
              higher prices.
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              <Link href="/contact" className="btn-pill bg-luxbg text-luxtxt">
                Book a Consultation
              </Link>
              <Link
                href="/portfolio"
                className="btn-pill border border-luxbg/70 bg-transparent text-luxbg"
              >
                View Portfolio
              </Link>
            </div>
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-luxbg/70">
              Serving Greater Los Angeles • Trusted by agents, developers &amp;
              homeowners
            </p>
          </motion.div>
        </div>
      </section>

      {/* STAT BAR */}
      <section className="border-b border-luxmuted/15 bg-white">
        <div className="section-shell grid gap-6 py-8 text-sm md:grid-cols-4">
          {stats.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
            >
              <div className="heading-serif text-2xl">{item.value}</div>
              <p className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-luxmuted">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section-shell space-y-6 py-16">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="tagline mb-2 text-luxmuted">Featured Projects</p>
            <h2 className="heading-serif text-2xl">
              Spaces that sold the story.
            </h2>
            <p className="mt-2 max-w-md text-sm text-luxmuted">
              A glimpse into recent homes, lofts, and developments staged to feel
              elevated, warm, and ready to move into.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="text-[0.78rem] uppercase tracking-[0.18em] text-luxtxt"
          >
            View Full Portfolio →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((p, idx) => (
            <motion.article
              key={p.name}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_rgba(15,15,15,0.06)]"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: 0.12 * idx }}
              whileHover={{ y: -6 }}
            >
              <div className="relative h-52 bg-[#e9e2d7]">
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="text-[0.7rem] uppercase tracking-[0.18em] text-luxmuted">
                    {p.name}
                  </span>
                </div>
              </div>
              <div className="space-y-2 p-5 text-sm">
                <p className="text-[0.8rem] font-medium text-luxmuted">
                  {p.area}
                </p>
                <p className="text-luxmuted">{p.blurb}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="border-y border-luxmuted/15 bg-[#f2ede6]">
        <div className="section-shell space-y-6 py-16">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="tagline mb-2 text-luxmuted">Services</p>
              <h2 className="heading-serif text-2xl">
                Staging that meets the moment.
              </h2>
              <p className="mt-2 max-w-md text-sm text-luxmuted">
                Tailored services for vacant homes, occupied listings, and new
                developments—each with a clear, predictable process.
              </p>
            </div>
            <Link
              href="/services"
              className="text-[0.78rem] uppercase tracking-[0.18em] text-luxtxt"
            >
              Explore Services →
            </Link>
          </div>

          <div className="grid gap-6 text-sm md:grid-cols-3">
            {[
              {
                title: "Vacant Home Staging",
                body: "Full furnishings, art, and styling for empty homes that need a complete story online and in person.",
              },
              {
                title: "Occupied Staging & Refresh",
                body: "Edit, re-arrange, and layer in key pieces so clients can live comfortably while showing.",
              },
              {
                title: "Model Homes & Developments",
                body: "Model units and amenity spaces designed to support premium positioning and absorption.",
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                className="rounded-2xl bg-white p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <h3 className="mb-1 text-sm font-semibold">{card.title}</h3>
                <p className="text-luxmuted">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-luxbg">
        <div className="section-shell border-b border-luxmuted/15 py-10">
          <p className="tagline mb-4 text-center text-luxmuted">
            Trusted by agents and teams from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[0.8rem] text-luxmuted">
            {logos.map((name, idx) => (
              <motion.span
                key={name}
                className="uppercase tracking-[0.16em]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL BAND */}
      <section className="bg-luxtxt text-luxbg">
        <div className="section-shell grid gap-10 py-14 md:grid-cols-[1.2fr,1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <p className="tagline mb-3 text-luxbg/70">Client Perspective</p>
            <p className="heading-serif text-2xl leading-relaxed md:text-3xl">
              “They turned an empty shell into a home buyers instantly connected
              with—online and in person.”
            </p>
            <p className="mt-3 text-sm text-luxbg/80">
              Alex Rivera, Listing Agent
            </p>
          </motion.div>
          <motion.div
            className="space-y-4 text-sm text-luxbg/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p>
              We are the quiet partner behind the scenes, making sure every angle
              tells the right story for photos, showings, and open houses.
            </p>
            <p>
              From first walkthrough to de-staging after close, the process is
              thoughtful, organized, and built around how you work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-luxbg">
        <motion.div
          className="section-shell flex flex-col items-start justify-between gap-4 py-12 md:flex-row md:items-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
        >
          <div>
            <h2 className="heading-serif text-xl">
              Have a listing coming to market?
            </h2>
            <p className="mt-2 max-w-md text-sm text-luxmuted">
              Share the basics—address, timeline, and a few photos—and we will
              follow up with recommendations and a clear proposal.
            </p>
          </div>
          <Link href="/contact" className="btn-pill bg-luxtxt text-luxbg">
            Start a Project
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
