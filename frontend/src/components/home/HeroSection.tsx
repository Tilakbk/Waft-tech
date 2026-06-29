"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "var(--color-black)",
        overflow: "hidden",
      }}
    >
      {/* Background Video */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.35,
          }}
        >
          <source src="/videos/showreel.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)",
          }}
        />
      </div>

      {/* Hero Content */}
      <div
        className="container-custom"
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "6rem",
          paddingBottom: "3rem",

        }}
      >
        {/* Main Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            marginBottom: "2rem",
            maxWidth: "900px",
          }}
        >
          We Build
          <br />
          <span style={{ color: "var(--color-brand-teal)" }}>Winning</span>
          <br />
          Solutions
          <br />
          for a
          <br />
          Better Tomorrow.
        </h1>

        {/* Bottom row — tagline + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              maxWidth: "480px",
            }}
          >
            From research to execution, we work closely with
            <br />
            organizations to create an intuitive and impactful
            <br />
            experience online.
          </p>

          <Link
            href="/contact"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "var(--color-black)",
              backgroundColor: "#ffffff",
              padding: "1rem 2rem",
              borderRadius: "var(--radius-full)",
              transition: "background-color 150ms ease, color 150ms ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-brand-teal)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#ffffff";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-black)";
            }}
          >
            Start your project
          </Link>
        </div>
      </div>
    </section>
  );
}
