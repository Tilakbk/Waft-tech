export default function MissionVision() {
  return (
    <section style={{ backgroundColor: "var(--color-black)", paddingTop: "7rem", paddingBottom: "7rem" }}>
      <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <div>
          <div style={{ paddingBottom: "3rem", borderBottom: "1px solid rgba(255,255,255,0.15)", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-brand-teal)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Our Vision</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.3 }}>
              To help ideators and visionary organizations bring their ideas to reality.
            </h2>
          </div>
          <div>
            <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-brand-teal)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Mission</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.3 }}>
              Delivering innovative and intuitive digital experiences to meet our clients needs with the utmost quality.
            </h2>
          </div>
        </div>
        <div style={{ width: "100%", height: "min(50vw, 480px)", borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "var(--color-gray-dark)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/company/team-group.jpg" alt="Team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    </section>
  );
}