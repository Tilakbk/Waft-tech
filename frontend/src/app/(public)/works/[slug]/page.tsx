import { notFound } from "next/navigation";
import Link from "next/link";
import projectsData from "@/mock/projects.json";

interface CaseStudySolution {
  heading: string;
  text: string;
}

interface CaseStudy {
  label: string;
  heroTitle: string;
  heroImage: string;
  services: string[];
  date: string;
  clientName?: string;
  clientUrl?: string;
  briefLabel: string;
  briefParagraphs: string[];
  showcaseImage1?: string;
  problemLabel: string;
  problemTitle: string;
  problemParagraphs: string[];
  solutionsTitle: string;
  solutions: CaseStudySolution[];
  showcaseImage2?: string;
  resultLabel: string;
  resultTitle: string;
  results: CaseStudySolution[];
  thoughtsLabel: string;
  thoughtsTitle: string;
  thoughtsText: string;
  showcaseImage3?: string;
}

interface Project {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  thumbnail: string;
  year: string;
  caseStudy?: CaseStudy;
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = projectsData as Project[];
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const cs = project!.caseStudy;
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Fallback for projects without a full case study yet
  if (!cs) {
    return (
      <main>
        <section style={{ paddingTop: "10rem", paddingBottom: "6rem" }}>
          <div className="container-custom">
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "var(--color-black)", marginBottom: "1rem" }}>
              {project!.title}
            </h1>
            <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)" }}>Full case study coming soon.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section style={{ paddingTop: "10rem", paddingBottom: "4rem" }}>
        <div className="container-custom" style={{ maxWidth: "900px" }}>
          <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)", marginBottom: "1rem" }}>{cs.label}</p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.75rem)",
            fontWeight: 700,
            color: "var(--color-black)",
            lineHeight: 1.1,
          }}>
            {cs.heroTitle}
          </h1>
        </div>
      </section>

      {/* Hero image */}
      <section style={{ marginBottom: "3rem" }}>
        <div style={{ width: "100%", height: "min(50vw, 500px)", backgroundColor: "#1a1a6e", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cs.heroImage} alt={cs.heroTitle} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </section>

      {/* Meta row */}
      <section style={{ paddingBottom: "5rem", borderBottom: "1px solid var(--color-gray-border)" }}>
        <div className="container-custom" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <p style={{ fontSize: "0.85rem", color: "var(--color-gray-light)", marginBottom: "0.75rem" }}>Services:</p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              {cs.services.map((s) => (
                <span key={s} style={{ fontSize: "0.85rem", padding: "0.4rem 1rem", borderRadius: "var(--radius-full)", border: "1px solid var(--color-gray-border)", color: "var(--color-gray-mid)" }}>
                  {s}
                </span>
              ))}
            </div>
            {cs.clientUrl && (
              <Link href={cs.clientUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--color-black)", textDecoration: "underline" }}>
                Visit Website &#x2197;
              </Link>
            )}
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--color-gray-light)" }}>Date / {cs.date}</p>
        </div>
      </section>

      {/* Brief */}
      <section style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "4rem" }}>
          <p style={{ fontSize: "0.9rem", color: "var(--color-gray-light)" }}>{cs.briefLabel}</p>
          <div style={{ maxWidth: "720px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "1.5rem" }}>Brief</h2>
            {cs.briefParagraphs.map((p, i) => (
              <p key={i} style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "1.25rem" }}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {cs.showcaseImage1 && (
        <section style={{ marginBottom: "5rem" }}>
          <div className="container-custom">
            <div style={{ width: "100%", height: "min(45vw, 440px)", backgroundColor: "#0a0a2e", overflow: "hidden", borderRadius: "var(--radius-md)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cs.showcaseImage1} alt="Showcase" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </section>
      )}

      {/* Challenge */}
      <section style={{ paddingBottom: "5rem" }}>
        <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "4rem" }}>
          <p style={{ fontSize: "0.9rem", color: "var(--color-gray-light)" }}>{cs.problemLabel}</p>
          <div style={{ maxWidth: "720px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "1.5rem" }}>{cs.problemTitle}</h2>
            {cs.problemParagraphs.map((p, i) => (
              <p key={i} style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "1.25rem" }}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section style={{ paddingBottom: "5rem" }}>
        <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "4rem" }}>
          <p style={{ fontSize: "0.9rem", color: "var(--color-gray-light)" }}>Design Approach</p>
          <div style={{ maxWidth: "720px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "1.5rem" }}>{cs.solutionsTitle}</h2>
            {cs.solutions.map((s, i) => (
              <p key={i} style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                <span style={{ fontWeight: 700, color: "var(--color-black)" }}>{s.heading}</span> {s.text}
              </p>
            ))}
          </div>
        </div>
      </section>

      {cs.showcaseImage2 && (
        <section style={{ marginBottom: "5rem" }}>
          <div className="container-custom">
            <div style={{ width: "100%", height: "min(45vw, 440px)", backgroundColor: "#0a0a2e", overflow: "hidden", borderRadius: "var(--radius-md)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cs.showcaseImage2} alt="Showcase" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </section>
      )}

      {/* Result */}
      <section style={{ paddingBottom: "5rem" }}>
        <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "4rem" }}>
          <p style={{ fontSize: "0.9rem", color: "var(--color-gray-light)" }}>{cs.resultLabel}</p>
          <div style={{ maxWidth: "720px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "1.5rem" }}>{cs.resultTitle}</h2>
            {cs.results.map((r, i) => (
              <p key={i} style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                <span style={{ fontWeight: 700, color: "var(--color-black)" }}>{r.heading}</span> {r.text}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Thoughts */}
      <section style={{ paddingBottom: "5rem" }}>
        <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "4rem" }}>
          <p style={{ fontSize: "0.9rem", color: "var(--color-gray-light)" }}>{cs.thoughtsLabel}</p>
          <div style={{ maxWidth: "720px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "1.5rem" }}>{cs.thoughtsTitle}</h2>
            <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8 }}>{cs.thoughtsText}</p>
          </div>
        </div>
      </section>

      {cs.showcaseImage3 && (
        <section style={{ marginBottom: "6rem" }}>
          <div className="container-custom">
            <div style={{ width: "100%", height: "min(45vw, 440px)", backgroundColor: "#0a0a2e", overflow: "hidden", borderRadius: "var(--radius-md)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cs.showcaseImage3} alt="Showcase" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </section>
      )}

      {/* Next Project */}
      <section style={{ paddingBottom: "6rem" }}>
        <div className="container-custom" style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-black)" }}>Next Project</h2>
        </div>
        <Link href={"/works/" + nextProject.slug} style={{ display: "block" }}>
          <div className="container-custom">
            <div style={{ position: "relative", width: "100%", height: "min(40vw, 380px)", borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "#1a1a6e" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={nextProject.thumbnail} alt={nextProject.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
              <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.25rem, 2.5vw, 2rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>
                  {nextProject.title}
                </h3>
              </div>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}