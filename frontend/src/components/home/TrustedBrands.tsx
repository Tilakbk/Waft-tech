"use client";

import Link from "next/link";
import brandsData from "@/mock/trustedBrands.json";

interface Brand {
  id: string;
  name: string;
  logo: string;
  url: string;
}

export default function TrustedBrands() {
  const brands = brandsData as Brand[];

  return (
    <section style={{ paddingTop: "5rem", paddingBottom: "5rem", borderTop: "1px solid var(--color-gray-border)", borderBottom: "1px solid var(--color-gray-border)" }}>
      <div className="container-custom">
        <p style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-gray-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2.5rem", textAlign: "center" }}>
          Trusted by teams at
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "2rem",
          alignItems: "center",
        }}>
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "48px",
                opacity: 0.6,
                transition: "opacity 150ms ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.6"; }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.logo}
                alt={brand.name}
                style={{ maxHeight: "32px", maxWidth: "120px", objectFit: "contain", filter: "grayscale(100%)" }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}