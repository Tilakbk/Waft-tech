export default function FounderStory() {
  return (
    <section style={{ backgroundColor: "var(--color-white)", paddingTop: "7rem", paddingBottom: "7rem" }}>
      <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--color-black)", lineHeight: 1.2, marginBottom: "2rem" }}>Our humble beginnings</h2>
          <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            Since 2018, we have cherished our customers like partners. We began our journey with a vision to help organizations build a bigger and better presence on the internet. We have had the fantastic opportunity to work with various industries and have made friends across the globe.
          </p>
          <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8 }}>
            Our journey has been a blessing because of our diverse team of designers, developers, project managers, and marketers. We strive to make a difference with every project, and because of that, we are able to build winning solutions for a better tomorrow.
          </p>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ width: "100%", height: "min(45vw, 400px)", borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "var(--color-gray-bg)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/company/ceo.jpg" alt="CEO" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", backgroundColor: "#ffffff", padding: "0.75rem 1.25rem", borderRadius: "var(--radius-sm)" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 600, color: "var(--color-black)" }}>James Wilson</p>
            <p style={{ fontSize: "0.8rem", color: "var(--color-gray-mid)" }}>CEO</p>
          </div>
        </div>
      </div>
    </section>
  );
}