"use client";

import Link from "next/link";

export default function DifferentiatorSection() {
  return (
    <section style={{ backgroundColor: "var(--color-white)", paddingTop: "8rem", paddingBottom: "8rem" }}>
      <div className="container-custom">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "center",
        }}>

          {/* Left — Big Question */}
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 700,
            color: "var(--color-black)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}>
            What makes Waft Tech different?
          </h2>

          {/* Right — Text + CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <p style={{
              fontSize: "1.05rem",
              color: "var(--color-brand-teal)",
              lineHeight: 1.8,
            }}>
              We let our work speak for itself. We know your organization is unique, and we take the time to understand your requirements to create a qualitative approach.
            </p>
            <p style={{
              fontSize: "1.05rem",
              color: "var(--color-brand-teal)",
              lineHeight: 1.8,
            }}>
              We love partnering up with organizations that aim to positively impact the world through user-centric solutions.
            </p>
            <div>
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "#ffffff",
                  backgroundColor: "var(--color-brand-teal)",
                  padding: "0.875rem 2rem",
                  borderRadius: "var(--radius-full)",
                  transition: "background-color 150ms ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-brand-teal-dark)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-brand-teal)"; }}
              >
                Start your project
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
