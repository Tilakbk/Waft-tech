"use client";

import Link from "next/link";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  { label: "Discover", href: "/what-we-do#discover" },
  { label: "Design", href: "/what-we-do#design" },
  { label: "Build", href: "/what-we-do#build" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/works" },
  { label: "Company", href: "/company" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Dribble", href: "https://dribbble.com" },
  { label: "Behance", href: "https://behance.net" },
];

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 998,
          backgroundColor: "rgba(0,0,0,0.3)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 300ms ease",
        }}
      />

      <div
        style={{
          position: "fixed",
          top: "72px",
          left: 0,
          right: 0,
          zIndex: 999,
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e8e6df",
          transform: isOpen ? "translateY(0)" : "translateY(-110%)",
          opacity: isOpen ? 1 : 0,
          transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease",
          pointerEvents: isOpen ? "auto" : "none",
          maxHeight: "calc(100vh - 72px)",
          overflowY: "auto",
        }}
      >
        <div
          className="container-custom"
          style={{
            paddingTop: "3rem",
            paddingBottom: "3rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "4rem",
          }}
        >
          <div>
            <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-gray-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Pages
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600, color: "var(--color-black)", transition: "color 150ms ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-brand-teal)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-black)"; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-gray-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Services
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  onClick={onClose}
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600, color: "var(--color-black)", transition: "color 150ms ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-brand-teal)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-black)"; }}
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-gray-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
                Got an idea?
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "1.5rem", lineHeight: 1.3 }}>
                Together, let us create something wonderful.
              </p>
              <Link
                href="/contact"
                onClick={onClose}
                style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500, color: "#ffffff", backgroundColor: "var(--color-black)", padding: "0.75rem 1.5rem", borderRadius: "var(--radius-full)", transition: "background-color 150ms ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-brand-teal)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-black)"; }}
              >
                Start your project
              </Link>
            </div>

            <div style={{ display: "flex", gap: "1.5rem", marginTop: "2rem", flexWrap: "wrap" }}>
                {socialLinks.map((social) => (
                    <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-gray-light)", letterSpacing: "0.05em", textTransform: "uppercase", transition: "color 150ms ease" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-black)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-gray-light)"; }}
                    >
                        {social.label}
                    </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
