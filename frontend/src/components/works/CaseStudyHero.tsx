export default function CaseStudyHero({ label, title, image }: { label: string; title: string; image: string }) {
  return (
    <section style={{ paddingTop: "10rem" }}>
      <div className="container-custom" style={{ marginBottom: "3rem" }}>
        <p style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)", marginBottom: "1rem" }}>{label}</p>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
          fontWeight: 700,
          color: "var(--color-black)",
          lineHeight: 1.15,
          maxWidth: "900px",
        }}>
          {title}
        </h1>
      </div>
      <div style={{
        width: "100%",
        height: "min(50vw, 480px)",
        backgroundColor: "var(--color-gray-bg)",
        overflow: "hidden",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </section>
  );
}