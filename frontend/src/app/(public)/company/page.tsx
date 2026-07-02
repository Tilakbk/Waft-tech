import CompanyHero from "@/components/company/CompanyHero";
import MissionVision from "@/components/company/MissionVision";
import CoreValues from "@/components/company/CoreValues";
import FounderStory from "@/components/company/FounderStory";
import TeamGrid from "@/components/company/TeamGrid";
import TrustedBrands from "@/components/home/TrustedBrands";
import Link from "next/link";

export default function CompanyPage() {
  return (
    <main>
      <CompanyHero />

      <section style={{ paddingTop: "12rem", paddingBottom: "12rem" }}>
        <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--color-black)", lineHeight: 1.1 }}>
            We believe <br /> in results.
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--color-brand-teal)", lineHeight: 1.8 }}>
            Our greatest strength lies in our ability to solve problems. We present intuitive solutions in the form of secure, reliable, and scalable applications that help businesses excel in today&apos;s rapidly growing economy.
          </p>
        </div>
      </section>

      <MissionVision />
      <CoreValues />
      <TrustedBrands showCta={false} />
      <FounderStory />
      <TeamGrid />

      <section style={{ paddingTop: "5rem", paddingBottom: "7rem" }}>
        <div className="container-custom" style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--color-black)", marginBottom: "1rem" }}>Look at us more closely</h2>
          <p style={{ fontSize: "1rem", color: "var(--color-brand-teal)", lineHeight: 1.7, maxWidth: "420px" }}>The Agile Team on demand. From planning to execution, we are a team of capable ideators, thinkers, and decision-makers.</p>
        </div>
       <div style={{ width: "100%", height: "min(65vw, 600px)", overflow: "hidden", backgroundColor: "var(--color-gray-bg)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/company/team-full.jpg" alt="Full team" style={{ width: "100%", height: "100%", objectFit:"cover" }} />
        </div>
      </section>

      <section style={{ backgroundColor: "var(--color-gray-bg)", paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto", padding: "0 2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--color-black)", marginBottom: "1.5rem" }}>Join our team of doers</h2>
          <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            We are always on the lookout for enthusiastic and talented professionals. Let&apos;s make a positive impact on the world through our work!
          </p>
          <Link href="/careers" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 500, color: "#ffffff", backgroundColor: "var(--color-black)", padding: "0.875rem 2rem", borderRadius: "var(--radius-full)" }}>
            Join us &#x2192;
          </Link>
        </div>
      </section>
    </main>
  );
}