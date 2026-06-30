"use client";

import { useState } from "react";
import Link from "next/link";

const projects = [
  { number: "01", title: "Luminate", image: "/images/home/project-luminate.jpg", href: "/works/luminate" },
  { number: "02", title: "Lineage Journey", image: "/images/home/project-lineage.jpg", href: "/works/lineage-journey" },
  { number: "03", title: "SUMMA", image: "/images/home/project-summa.jpg", href: "/works/summa" },
];

export default function FeaturedProjects() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ backgroundColor: "var(--color-black)", paddingTop: "7rem", paddingBottom: "7rem", overflow: "hidden" }}>
      <div className="container-custom">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>

          {/* Left — heading + list */}
          <div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "1.5rem",
            }}>
              Featured Project
            </h2>
            <p style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.8,
              maxWidth: "420px",
              marginBottom: "3rem",
            }}>
              We proactively work with our clients to design, develop, and scale seamless digital experiences that fuel innovation and success.
            </p>

            <div>
              {projects.map((project, i) => (
                <Link
                  key={project.number}
                  href={project.href}
                  onMouseEnter={() => setActive(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.5rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.15)",
                    transition: "opacity 200ms ease",
                    opacity: active === i ? 1 : 0.4,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>{project.number}.</span>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                      fontWeight: 700,
                      color: "#ffffff",
                    }}>
                      {project.title}
                    </span>
                  </div>
                  <span style={{
                    fontSize: "1.25rem",
                    color: "#ffffff",
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? "translateX(0)" : "translateX(-8px)",
                    transition: "all 200ms ease",
                  }}>
                    {"\→"}
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href="/works"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "2.5rem",
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "#ffffff",
              }}
            >
              Check out our latest projects
              <span>{"\→"}</span>
            </Link>
          </div>

          {/* Right — active project preview */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "min(55vw, 480px)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              backgroundColor: "var(--color-gray-dark)",
            }}
          >
            {projects.map((project, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={project.number}
                src={project.image}
                alt={project.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: active === i ? 1 : 0,
                  transition: "opacity 400ms ease",
                }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
