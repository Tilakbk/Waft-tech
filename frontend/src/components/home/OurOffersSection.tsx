"use client";

import { useRef } from "react";

const offerImages = [
  { src: "/images/home/offer-1.jpg", alt: "Team collaborating on whiteboard" },
  { src: "/images/home/offer-2.jpg", alt: "Designers reviewing work" },
  { src: "/images/home/offer-3.jpg", alt: "Developer working on laptop" },
  { src: "/images/home/offer-4.jpg", alt: "Team meeting" },
];

export default function OurOffersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

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

      {/* Scrollable image row */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: "1.5rem",
          overflowX: "auto",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingBottom: "1rem",
          scrollSnapType: "x mandatory",
        }}
        className="hide-scrollbar"
      >
        {offerImages.map((img, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              flex: "0 0 auto",
              width: "min(70vw, 420px)",
              height: "min(70vw, 420px)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              backgroundColor: "var(--color-gray-bg)",
              scrollSnapAlign: "start",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
            />
          </div>
        ))}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
