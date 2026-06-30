"use client";

import Link from "next/link";
import { MapPin, Headphones, Disc, Feather, HandHeart, Activity, BookOpen, PlayCircle, Globe2, Orbit } from "lucide-react";

const brands = [
  { label: "CHRONOTEK", sub: "Smart Time Tracking", Icon: MapPin },
  { label: "luminate", sub: null, Icon: Headphones },
  { label: "Confidencial", sub: null, Icon: Disc },
  { label: "Lineage", sub: null, Icon: Feather },
  { label: "SHARING hope", sub: null, Icon: HandHeart },
  { label: "Finay", sub: null, Icon: Activity },
  { label: "Guide", sub: null, Icon: BookOpen },
  { label: "Beautiful Minds", sub: null, Icon: PlayCircle },
  { label: "NEWSTART ONLINE", sub: null, Icon: Globe2 },
  { label: "Jeewit Bachan", sub: null, Icon: Orbit },
];

export default function TrustedBrands() {
  return (
    <section style={{ backgroundColor: "var(--color-gray-bg)", paddingTop: "2rem", paddingBottom: "7rem" }}>
      <div className="container-custom">

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          rowGap: "3rem",
          columnGap: "2rem",
          marginBottom: "5rem",
        }}>
          {brands.map(({ label, sub, Icon }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Icon size={20} strokeWidth={1.75} color="var(--color-gray-mid)" />
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--color-gray-mid)",
                  whiteSpace: "nowrap",
                }}>
                  {label}
                </span>
              </div>
              {sub && (
                <span style={{ fontSize: "0.7rem", color: "var(--color-gray-light)" }}>{sub}</span>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--color-black)",
            lineHeight: 1.2,
            marginBottom: "2rem",
          }}>
            Exceeding expectations,
            <br />
            one project at a time.
          </h2>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#ffffff",
              backgroundColor: "var(--color-black)",
              padding: "0.875rem 2rem",
              borderRadius: "var(--radius-full)",
              transition: "background-color 150ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-brand-teal)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-black)"; }}
          >
            Start your project
          </Link>
        </div>

      </div>
    </section>
  );
}
