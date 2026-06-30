"use client";

import { ShoppingBag, Landmark, HeartPulse, HandHeart, GraduationCap, Building2 } from "lucide-react";

const industries = [
  { label: "E-commerce", Icon: ShoppingBag },
  { label: "Fintech", Icon: Landmark },
  { label: "Health Care", Icon: HeartPulse },
  { label: "Non-Profit", Icon: HandHeart },
  { label: "Education", Icon: GraduationCap },
  { label: "Real Estate", Icon: Building2 },
];

export default function IndustryGridSection() {
  return (
    <section style={{ backgroundColor: "var(--color-white)", paddingTop: "7rem", paddingBottom: "7rem" }}>
      <div className="container-custom">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem", alignItems: "start" }}>

          {/* Left heading */}
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "var(--color-black)",
            lineHeight: 1.1,
          }}>
            Our work spans industries &amp; domains.
          </h2>

          {/* Right grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            rowGap: "4rem",
            columnGap: "3rem",
          }}>
            {industries.map(({ label, Icon }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.5rem" }}>
                <div style={{
                  width: "96px",
                  height: "96px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-brand-teal-light)",
                }}>
                  <Icon size={40} strokeWidth={1.5} color="var(--color-brand-teal)" />
                </div>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  color: "var(--color-black)",
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
