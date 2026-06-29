import Link from "next/link";

const companyLinks = [
  { label: "About", href: "/company" },
  { label: "Work", href: "/works" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];

const serviceLinks = [
  { label: "Discover", href: "/what-we-do#discover" },
  { label: "Design", href: "/what-we-do#design" },
  { label: "Build", href: "/what-we-do#build" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

const offices = [
  { country: "Australia", address: "260 Peachtree St NW Suite 2200 Atlanta, GA 30303", email: "sales@wafttech.io", phone: "+1 (470) 755-6225" },
  { country: "UK", address: "39th floor One Canada Square, E14 5AB", email: "hello@wafttech.uk", phone: "+44 20 3819 8886" },
  { country: "Nepal", address: "Kupandole lalitpur 44600, Nepal", email: "sales@wafttech.io", phone: "+977 1-5705899" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-black)", color: "#ffffff", paddingTop: "5rem", paddingBottom: "2rem" }}>
      <div className="container-custom">

        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "4rem", marginBottom: "4rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, maxWidth: "600px" }}>
            Together, let us create something wonderful.
          </h2>
          <Link
            href="/contact"
            style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500, color: "var(--color-black)", backgroundColor: "#ffffff", padding: "0.875rem 2rem", borderRadius: "var(--radius-full)", whiteSpace: "nowrap" }}
          >
            Start working with us
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "3rem", marginBottom: "4rem" }}>
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Company</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href} style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)" }}>{link.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Services</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {serviceLinks.map((link) => (
                <Link key={link.href} href={link.href} style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)" }}>{link.label}</Link>
              ))}
            </div>
          </div>

          {offices.map((office) => (
            <div key={office.country}>
              <p style={{ fontSize: "0.7rem", fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>{office.country}</p>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: "0.75rem" }}>{office.address}</p>
              <a href={"mailto:" + office.email} style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.65)", marginBottom: "0.25rem" }}>{office.email}</a>
              <a href={"tel:" + office.phone} style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }}>{office.phone}</a>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link href="/" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em" }}>
            Waft<span style={{ color: "var(--color-brand-teal)" }}>.</span>
          </Link>

          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.7rem", fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{social.label}</a>
            ))}
          </div>

          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
            {new Date().getFullYear()} Waft Tech. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
