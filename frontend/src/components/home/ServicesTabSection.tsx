"use client";

import { useState } from "react";
import Link from "next/link";

const tabs = [
  {
    number: "01",
    label: "Discover",
    heading: "We uncover what your users truly need.",
    description: "Before we design or build anything, we dig deep. Through research, workshops, and strategic thinking, we map out the problem space and define a clear path forward. This phase sets the foundation for everything that follows.",
    points: ["User Research", "Competitor Analysis", "Product Strategy", "Requirements Gathering", "Roadmap Planning"],
    href: "/what-we-do#discover",
  },
  {
    number: "02",
    label: "Design",
    heading: "Interfaces that are beautiful and intentional.",
    description: "We craft experiences that feel effortless. Every screen, every interaction, every micro-animation is designed with purpose — to guide your users naturally toward their goals while reinforcing your brand.",
    points: ["UI/UX Design", "Wireframing", "Prototyping", "Design Systems", "Brand Identity"],
    href: "/what-we-do#design",
  },
  {
    number: "03",
    label: "Build",
    heading: "Engineered for performance, built to scale.",
    description: "Our engineering team brings designs to life with clean, maintainable code. We build web and mobile applications that are fast, secure, and ready to grow with your business from day one.",
    points: ["Web Development", "Mobile Apps", "API Integration", "Cloud Deployment", "QA & Testing"],
    href: "/what-we-do#build",
  },
];

export default function ServicesTabSection() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section style={{ backgroundColor: "var(--color-gray-bg)", paddingTop: "7rem", paddingBottom: "7rem" }}>
      <div className="container-custom">

        {/* Section label */}
        <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-gray-light)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4rem" }}>
          What We Do
        </p>

        {/* Tab Switcher */}
        <div style={{ display: "flex", gap: "0", borderBottom: "1px solid var(--color-gray-border)", marginBottom: "4rem" }}>
          {tabs.map((t, i) => (
            <button
              key={t.number}
              onClick={() => setActive(i)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "1rem 2.5rem 1rem 0",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                borderBottom: active === i ? "2px solid var(--color-black)" : "2px solid transparent",
                marginBottom: "-1px",
                transition: "all 200ms ease",
              }}
            >
              <span style={{ fontSize: "0.7rem", color: active === i ? "var(--color-black)" : "var(--color-gray-light)", fontWeight: 500 }}>{t.number}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: active === i ? "var(--color-black)" : "var(--color-gray-light)", transition: "color 200ms ease" }}>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>

          {/* Left */}
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--color-black)", lineHeight: 1.15, marginBottom: "1.5rem" }}>
              {tab.heading}
            </h3>
            <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "2rem" }}>
              {tab.description}
            </p>
            <Link
              href={tab.href}
              style={{ display: "inline-block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-black)", borderBottom: "1px solid var(--color-black)", paddingBottom: "2px", transition: "color 150ms ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-brand-teal)"; (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "var(--color-brand-teal)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-black)"; (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "var(--color-black)"; }}
            >
              Learn more
            </Link>
          </div>

          {/* Right — capability list */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {tab.points.map((point, i) => (
              <div
                key={point}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.25rem 0",
                  borderBottom: i < tab.points.length - 1 ? "1px solid var(--color-gray-border)" : "none",
                }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-black)" }}>{point}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--color-gray-light)" }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
