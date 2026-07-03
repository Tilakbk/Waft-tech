import techStackData from "@/mock/techStack.json";

interface Tech {
  id: string;
  name: string;
  logo: string;
  category: string;
}

export default function TechStack() {
  const stack = techStackData as Tech[];

  return (
    <section style={{ paddingTop: "6rem", paddingBottom: "6rem", backgroundColor: "var(--color-gray-bg)" }}>
      <div className="container-custom">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-gray-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Our Toolkit
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "var(--color-black)" }}>
            Technology we work with
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "1.5rem",
        }}>
          {stack.map((tech) => (
            <div
              key={tech.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
                backgroundColor: "#ffffff",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-gray-border)",
                padding: "1.5rem 1rem",
              }}
            >
              <div style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tech.logo} alt={tech.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--color-black)", textAlign: "center" }}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}