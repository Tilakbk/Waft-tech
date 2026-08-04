import Link from "next/link";
import { getPublishedProjects } from "@/lib/api/projects";

export default async function WorksPage() {
  const { content: projects } = await getPublishedProjects(undefined, 0, 50);

  return (
    <main>
      <section style={{ paddingTop: "10rem", paddingBottom: "4rem" }}>
        <div className="container-custom">
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 700,
            color: "var(--color-black)",
            lineHeight: 1.05,
            marginBottom: "1rem",
          }}>
            Our Work
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", maxWidth: "600px" }}>
            A selection of projects where we helped teams design, build, and ship products that matter.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "7rem" }}>
        <div className="container-custom" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2.5rem",
        }}>
          {projects.length === 0 ? (
            <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)" }}>No published projects yet.</p>
          ) : (
            projects.map((project) => (
              <Link key={project.slug} href={"/works/" + project.slug} style={{ display: "block" }}>
                <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "#1a1a6e", marginBottom: "1.25rem" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.thumbnailUrl} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.4rem" }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>
                  {project.tags.join(", ")}
                </p>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}