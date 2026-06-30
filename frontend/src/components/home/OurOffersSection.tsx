"use client";

import { useRef, useState } from "react";

const offers = [
  {
    image: "/images/home/offer-1.jpg",
    title: "Discovery",
    description: "We conduct high-level research based on your requirements to develop the best digital solutions. We understand, devise, and strategize solutions that are centered around your idea.",
    points: ["User Research", "UX Audit", "Product and Business Strategy", "Conversion Rate Optimisation"],
    href: "/what-we-do#discover",
  },
  {
    image: "/images/home/offer-2.jpg",
    title: "Design",
    description: "Users first. We create for the end users. Those who are on your platform every day. Those who wish life was a little bit easier. We do our part. We design products. We design brands. But most importantly, we design experiences.",
    points: ["UX Design", "UI Design", "Competitive Analysis", "Motion Design", "Branding", "Digital Prototyping"],
    href: "/what-we-do#design",
  },
  {
    image: "/images/home/offer-3.jpg",
    title: "Build",
    description: "We build the tech for the future. We adhere to the latest coding standards to build scalable products. Our rooted understanding of your business helps us find what works best for you.",
    points: ["Web Development", "Mobile Application", "E-commerce Solutions", "CMS Integration"],
    href: "/what-we-do#build",
  },
];

export default function OurOffersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[index] as HTMLElement;
    if (card) {
      scrollRef.current.scrollTo({ left: card.offsetLeft - 32, behavior: "smooth" });
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    const next = Math.min(activeIndex + 1, offers.length - 1);
    scrollToIndex(next);
  };

  return (
    <section style={{ backgroundColor: "var(--color-white)", paddingTop: "7rem", paddingBottom: "7rem", overflow: "hidden" }}>
      <div className="container-custom" style={{ marginBottom: "3.5rem" }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
          color: "var(--color-black)",
          marginBottom: "1.5rem",
        }}>
          Our offers
        </h2>
        <p style={{
          fontSize: "1rem",
          color: "var(--color-gray-mid)",
          lineHeight: 1.8,
          maxWidth: "480px",
        }}>
          Our three-step approach to projects has yielded in brands to make an impact in their industry. We discover, design, and build effective solutions tailor-made for your ideas.
        </p>
      </div>

      {/* Scrollable cards row */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: "2rem",
          overflowX: "auto",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingBottom: "1rem",
          scrollSnapType: "x mandatory",
        }}
        className="hide-scrollbar"
      >
        {offers.map((offer, i) => (
          <div
            key={offer.title}
            style={{
              flex: "0 0 auto",
              width: "min(78vw, 760px)",
              scrollSnapAlign: "start",
            }}
          >
            {/* Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "min(45vw, 320px)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                backgroundColor: "var(--color-gray-bg)",
                marginBottom: "1.5rem",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={offer.image}
                alt={offer.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
              />
            </div>

            {/* Content row — number/title left, text+list right */}
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "2rem", alignItems: "start" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--color-gray-light)" }}>
                  {"0" + (i + 1)} / {"0" + offers.length}
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--color-black)", marginTop: "-0.3rem" }}>
                {offer.title}
              </h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "2rem", alignItems: "start", marginTop: "1.5rem" }}>
              <div />
              <div>
                <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  {offer.description}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "2rem" }}>
                  {offer.points.map((point) => (
                    <li key={point} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0", fontSize: "1rem", color: "var(--color-black)" }}>
                      <span style={{ width: "6px", height: "6px", backgroundColor: "var(--color-brand-teal)", flexShrink: 0 }} />
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href={offer.href}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--color-black)" }}
                >
                  Learn More
                  {/* <span>{"\\u2192"}</span> */}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next button */}
      <div className="container-custom" style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
        <button
          onClick={handleNext}
          aria-label="Next offer"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--color-gray-bg)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            color: "var(--color-black)",
            transition: "background-color 150ms ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-gray-border)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-gray-bg)"; }}
        >
          {/* {"\\u2192"} */}
        </button>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
