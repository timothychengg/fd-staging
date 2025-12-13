"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Optimize motion components
const MotionDiv = motion.div;
const MotionArticle = motion.article;
const MotionSpan = motion.span;

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

  const logos = [
    { name: "Compass", image: "/Compass.png", alt: "Compass Real Estate" },
    { name: "Century 21", image: "/century.jpeg", alt: "Century 21 Real Estate" },
    { name: "Christie's", image: "/christies.png", alt: "Christie's International Real Estate" },
    { name: "Coldwell Banker", image: "/coldwell.jpg", alt: "Coldwell Banker Real Estate" },
    { name: "Intero", image: "/intero.webp", alt: "Intero Real Estate" },
    { name: "Keller Williams", image: "/kw.png", alt: "Keller Williams Realty" },
  ];

  // Video banner component with optimized loading
  const VideoBanner = () => {
    const videoRef = useRef(null);
    const [videoError, setVideoError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const video = videoRef.current;
      if (video) {
        // Set video properties for optimal playback
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.preload = "metadata"; // Load metadata first, then play

        // Handle video loaded and ready to play
        const handleCanPlay = () => {
          setIsLoading(false);
          setIsLoaded(true);
          // Ensure video plays
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              // Silently handle autoplay restrictions
              setVideoError(true);
            });
          }
        };

        // Handle video errors
        const handleError = () => {
          setIsLoading(false);
          setVideoError(true);
        };

        // Handle when video starts loading
        const handleLoadStart = () => {
          setIsLoading(true);
        };

        // Add event listeners
        video.addEventListener("canplay", handleCanPlay);
        video.addEventListener("error", handleError);
        video.addEventListener("loadstart", handleLoadStart);

        // Try to play immediately if video is already loaded
        if (video.readyState >= 3) {
          handleCanPlay();
        } else {
          // Load video when component mounts
          video.load();
        }

        return () => {
          video.removeEventListener("canplay", handleCanPlay);
          video.removeEventListener("error", handleError);
          video.removeEventListener("loadstart", handleLoadStart);
        };
      }
    }, []);

    return (
      <>
        {/* Fallback image - always visible as background, hidden when video loads */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            videoError || !isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src="https://images.unsplash.com/photo-1617099404995-0a2b4d90c4f5?q=80&w=1600&auto=format&fit=crop"
            alt="Luxury home staging"
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Video background - shown when loaded successfully */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            isLoaded && !videoError ? "opacity-100" : "opacity-0"
          }`}
          preload="metadata"
          aria-label="Luxury home staging video background"
          onError={(e) => {
            console.error("Video error details:", e);
            const video = e.target;
            console.error("Video error code:", video.error?.code);
            console.error("Video error message:", video.error?.message);
            setVideoError(true);
          }}
        >
          {/* Prioritize MP4 for best browser support */}
          <source src="/IMG_3289.mp4" type="video/mp4" />
          <source src="/hero-banner.mp4" type="video/mp4" />
          <source src="/hero-banner.webm" type="video/webm" />
        </video>
      </>
    );
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "F&D Staging",
            description:
              "Luxury home staging studio in Los Angeles creating aspirational interiors that sell.",
            url: "https://fanddstaging.com",
            telephone: "(408)393-2161",
            email: "info@fanddstaging.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Los Angeles",
              addressRegion: "CA",
              addressCountry: "US",
            },
            areaServed: {
              "@type": "City",
              name: "Los Angeles",
            },
            serviceType: "Home Staging",
            priceRange: "$$",
          }),
        }}
      />
      <main className="min-h-screen bg-luxbg">
        {/* HERO */}
        <section
          className="relative overflow-hidden min-h-[70vh]"
          aria-label="Hero section with video background"
        >
        <div className="absolute inset-0 z-0">
          <VideoBanner />
        </div>
        <MotionDiv
          className="absolute inset-0 bg-gradient-to-r from-[#181515]/80 via-[#181515]/55 to-transparent z-[1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        <div className="section-shell relative flex min-h-[70vh] flex-col justify-center py-20 text-luxbg z-[2]">
          <MotionDiv
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
              <Link
                href="/contact"
                className="btn-pill bg-luxbg text-luxtxt hover:bg-luxbg/90 focus-visible:outline-luxbg"
                aria-label="Book a consultation with F&D Staging"
              >
                Book a Consultation
              </Link>
              <Link
                href="/portfolio"
                className="btn-pill border border-luxbg/70 bg-transparent text-luxbg hover:bg-luxbg/10 focus-visible:outline-luxbg"
                aria-label="View our portfolio of staged homes"
              >
                View Portfolio
              </Link>
            </div>
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-luxbg/70">
              Serving Greater Los Angeles • Trusted by agents, developers &amp;
              homeowners
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* STAT BAR */}
      <section className="border-b border-luxmuted/15 bg-white">
        <div className="section-shell grid gap-6 py-8 text-sm md:grid-cols-4">
          {stats.map((item, idx) => (
            <MotionDiv
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
            </MotionDiv>
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
            className="text-[0.78rem] uppercase tracking-[0.18em] text-luxtxt hover:text-luxaccent transition-colors"
            aria-label="View full portfolio of staged homes"
          >
            View Full Portfolio →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((p, idx) => (
            <MotionArticle
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
            </MotionArticle>
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
              className="text-[0.78rem] uppercase tracking-[0.18em] text-luxtxt hover:text-luxaccent transition-colors"
              aria-label="Explore our staging services"
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
              <MotionDiv
                key={card.title}
                className="rounded-2xl bg-white p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <h3 className="mb-1 text-sm font-semibold">{card.title}</h3>
                <p className="text-luxmuted">{card.body}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP - Rolling Banner */}
      <section className="bg-luxbg overflow-hidden">
        <div className="section-shell border-b border-luxmuted/15 py-10">
          <p className="tagline mb-6 text-center text-luxmuted">
            Trusted by agents and teams from
          </p>
          <div className="relative overflow-hidden">
            {/* Gradient masks for fade effect */}
            <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-luxbg to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-luxbg to-transparent pointer-events-none" />
            
            {/* Scrolling container */}
            <div className="flex animate-scroll gap-x-12 px-4">
              {/* First set of logos */}
              {logos.map((logo) => (
                <div
                  key={`first-${logo.name}`}
                  className="flex shrink-0 items-center justify-center px-4"
                >
                  <Image
                    src={logo.image}
                    alt={logo.alt}
                    width={140}
                    height={70}
                    className="h-auto max-h-14 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:scale-105"
                    quality={85}
                    loading="lazy"
                    sizes="(max-width: 768px) 100px, 140px"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {logos.map((logo) => (
                <div
                  key={`second-${logo.name}`}
                  className="flex shrink-0 items-center justify-center px-4"
                >
                  <Image
                    src={logo.image}
                    alt={logo.alt}
                    width={140}
                    height={70}
                    className="h-auto max-h-14 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:scale-105"
                    quality={85}
                    loading="lazy"
                    sizes="(max-width: 768px) 100px, 140px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL BAND */}
      <section className="bg-luxtxt text-luxbg">
        <div className="section-shell grid gap-10 py-14 md:grid-cols-[1.2fr,1fr]">
          <MotionDiv
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
          </MotionDiv>
          <MotionDiv
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
          </MotionDiv>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-luxbg">
        <MotionDiv
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
          <Link
            href="/contact"
            className="btn-pill bg-luxtxt text-luxbg hover:bg-luxtxt/90 focus-visible:outline-luxtxt"
            aria-label="Start a new staging project"
          >
            Start a Project
          </Link>
        </MotionDiv>
      </section>
      </main>
    </>
  );
}
