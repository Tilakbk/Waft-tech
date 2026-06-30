export default function TestimonialsCarousel() {
  return (
    <section style={{ backgroundColor: "var(--color-gray-bg)", paddingTop: "7rem", paddingBottom: "7rem" }}>
      <div className="container-custom">
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
          color: "var(--color-black)",
          lineHeight: 1.1,
          marginBottom: "3.5rem",
        }}>
          Trusted by leading brands
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "4rem", alignItems: "center" }}>

          {/* Photo */}
          <div style={{
            width: "100%",
            height: "min(40vw, 360px)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            backgroundColor: "var(--color-black)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/testimonial-sebastien.jpg"
              alt="Sebastien Braxton, Co-Founder, Luminate"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
            />
          </div>

          {/* Quote */}
          <div>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "4rem",
              color: "var(--color-gray-border)",
              lineHeight: 0.5,
              display: "block",
              marginBottom: "1.5rem",
            }}>
              {"\u201C"}
            </span>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
              fontWeight: 600,
              color: "var(--color-black)",
              lineHeight: 1.4,
              marginBottom: "2rem",
            }}>
              Our collaboration on Luminate{"\u2019"}s brand development was a great experience. With their help, we exceeded our Kickstarter goal of $144,000 and are launching our MVP and testing our beta version at the moment.
            </p>
            <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.25rem" }}>
              Sebastien Braxton
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>
              Co-Founder, Luminate
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
