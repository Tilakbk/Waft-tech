import ProjectsGrid from "@/components/works/ProjectsGrid";

export default function WorksPage() {
  return (
    <main>
      <section style={{ paddingTop: "10rem", paddingBottom: "3rem" }}>
        <div className="container-custom">
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 700,
            color: "var(--color-black)",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}>
            Our Work
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--color-gray-mid)", lineHeight: 1.8, maxWidth: "500px" }}>
            A selection of projects where we partnered with ambitious teams to design, build, and ship products that matter.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "7rem" }}>
        <div className="container-custom">
          <ProjectsGrid />
        </div>
      </section>
    </main>
  );
}
