"use client";

import Link from "next/link";

const brands = ["CHRONOTEK", "luminate", "Confidencial", "Lineage", "SHARING hope", "Finay", "Guide", "Beautiful Minds", "NEWSTART", "Jeewit Bachan"];

export default function TrustedBrands() {
  return (
    <section style={{ backgroundColor: "var(--color-gray-bg)", paddingTop: "2rem", paddingBottom: "7rem" }}>
      <div className="container-custom">

        {/* Logo grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          rowGap: "3rem",
          columnGap: "2rem",
          marginBottom: "5rem",
        }}>
          {brands.map((brand) => (
            <div key={brand} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--color-gray-mid)",
                whiteSpace: "nowrap",
              }}>
                {brand}
              </span>
            </div>
          ))}
        </div>

        {/* Closing statement + CTA */}
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
