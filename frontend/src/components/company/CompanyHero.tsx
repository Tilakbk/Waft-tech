"use client";

import { useEffect, useRef } from "react";

export default function CompanyHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Video background */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "var(--color-black)" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }}
        >
          <source src="/videos/company-hero.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)" }} />
      </div>

      {/* Text overlay */}
      <h1 style={{
        position: "relative",
        zIndex: 1,
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2rem, 5vw, 4rem)",
        fontWeight: 700,
        color: "#ffffff",
        textAlign: "center",
        lineHeight: 1.15,
        maxWidth: "700px",
        padding: "0 2rem",
      }}>
        We work to get results that work for you.
      </h1>
    </section>
  );
}