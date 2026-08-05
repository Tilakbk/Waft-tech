import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getPublishedProjects } from "@/lib/api/projects";

export default async function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project = await getProjectBySlug(slug).catch(() => null);
  if (!project) notFound();

  const { content: allProjects } = await getPublishedProjects(undefined, 0, 50);
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
      <main>
        {/* Hero */}
        <section style={{ paddingTop: "10rem", paddingBottom: "4rem" }}>
          <div className="container-custom" style={{ maxWidth: "900px" }}>
            <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)", marginBottom: "1rem" }}>{project.createdByName}</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 700, color: "var(--color-black)", lineHeight: 1.1 }}>
              {project.title}
            </h1>
          </div>
        </section>

        {/* Hero image */}
        <section style={{ marginBottom: "3rem" }}>
          <div style={{ width: "100%", height: "min(50vw, 500px)", backgroundColor: "#1a1a6e", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.heroImageUrl} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </section>

        {/* Meta row */}
        <section style={{ paddingBottom: "5rem", borderBottom: "1px solid var(--color-gray-border)" }}>
          <div className="container-custom" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "var(--color-gray-light)", marginBottom: "0.75rem" }}>Services:</p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {project.tags.map((s) => (
                    <span key={s} style={{ fontSize: "0.85rem", padding: "0.4rem 1rem", borderRadius: "var(--radius-full)", border: "1px solid var(--color-gray-border)", color: "var(--color-gray-mid)" }}>
                  {s}
                </span>
                ))}
              </div>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--color-gray-light)" }}>Date / {project.date}</p>
          </div>
        </section>

        {/* Brief */}
        <section style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "4rem" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--color-gray-light)" }}>About the project</p>
            <div style={{ maxWidth: "720px" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "1.5rem" }}>Brief</h2>
              <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8 }}>{project.brief}</p>
            </div>
          </div>
        </section>

        {project.imageUrls?.[0] && (
            <section style={{ marginBottom: "5rem" }}>
              <div className="container-custom">
                <div style={{ width: "100%", height: "min(45vw, 440px)", backgroundColor: "#0a0a2e", overflow: "hidden", borderRadius: "var(--radius-md)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.imageUrls[0]} alt="Showcase" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </section>
        )}

        {/* Problem Statement */}
        <section style={{ paddingBottom: "5rem" }}>
          <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "4rem" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--color-gray-light)" }}>Challenges Faced</p>
            <div style={{ maxWidth: "720px" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "1.5rem" }}>Problem Statement</h2>
              <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8 }}>{project.problemStatement}</p>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section style={{ paddingBottom: "5rem" }}>
          <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "4rem" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--color-gray-light)" }}>Solutions</p>
            <div style={{ maxWidth: "720px" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "1.5rem" }}>Solutions Implemented</h2>
              {project.solutions?.map((s, i) => (
                  <p key={i} style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                    <span style={{ fontWeight: 700, color: "var(--color-black)" }}>{s.heading}: </span>{s.text}
                  </p>
              ))}
            </div>
          </div>
        </section>

        {project.imageUrls?.[1] && (
            <section style={{ marginBottom: "5rem" }}>
              <div className="container-custom">
                <div style={{ width: "100%", height: "min(45vw, 440px)", backgroundColor: "#0a0a2e", overflow: "hidden", borderRadius: "var(--radius-md)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.imageUrls[1]} alt="Showcase" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </section>
        )}

        {/* Results */}
        <section style={{ paddingBottom: "5rem" }}>
          <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "4rem" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--color-gray-light)" }}>The Result</p>
            <div style={{ maxWidth: "720px" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "1.5rem" }}>Satisfying Result</h2>
              {project.results?.map((r, i) => (
                  <p key={i} style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                    <span style={{ fontWeight: 700, color: "var(--color-black)" }}>{r.heading}: </span>{r.text}
                  </p>
              ))}
            </div>
          </div>
        </section>

        {/* Final Thought */}
        {project.finalThought && (
            <section style={{ paddingBottom: "5rem" }}>
              <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "4rem" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--color-gray-light)" }}>Final Thoughts</p>
                <div style={{ maxWidth: "720px" }}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "1.5rem" }}>Our Thoughts</h2>
                  <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8 }}>{project.finalThought}</p>
                </div>
              </div>
            </section>
        )}

        {project.imageUrls?.[2] && (
            <section style={{ marginBottom: "6rem" }}>
              <div className="container-custom">
                <div style={{ width: "100%", height: "min(45vw, 440px)", backgroundColor: "#0a0a2e", overflow: "hidden", borderRadius: "var(--radius-md)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.imageUrls[2]} alt="Showcase" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </section>
        )}

        {/* Next Project */}
        {nextProject && (
            <section style={{ paddingBottom: "6rem" }}>
              <div className="container-custom" style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-black)" }}>Next Project</h2>
              </div>
              <Link href={"/works/" + nextProject.slug} style={{ display: "block" }}>
                <div className="container-custom">
                  <div style={{ position: "relative", width: "100%", height: "min(40vw, 380px)", borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "#1a1a6e" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={nextProject.thumbnailUrl} alt={nextProject.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
                    <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem" }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.25rem, 2.5vw, 2rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>
                        {nextProject.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
        )}
      </main>
  );
}