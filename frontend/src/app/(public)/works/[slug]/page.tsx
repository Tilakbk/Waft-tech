import { notFound } from "next/navigation";
import Link from "next/link";
import CaseStudyHero from "@/components/works/CaseStudyHero";
import projectsData from "@/mock/projects.json";

interface SolutionItem { heading: string; text: string; }
interface CaseStudy {
  label: string;
  heroTitle: string;
  heroImage: string;
  services: string[];
  date: string;
  clientName: string;
  clientUrl: string;
  briefLabel: string;
  briefParagraphs: string[];
  showcaseImage1: string;
  problemLabel: string;
  problemTitle: string;
  problemParagraphs: string[];
  solutionsTitle: string;
  solutions: SolutionItem[];
  showcaseImage2: string;
  resultLabel: string;
  resultTitle: string;
  results: SolutionItem[];
  thoughtsLabel: string;
  thoughtsTitle: string;
  thoughtsText: string;
  showcaseImage3: string;
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

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = projectsData as Project[];
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const cs = project!.caseStudy;

  if (!cs) {
    return (
      <main style={{ paddingTop: "10rem", paddingBottom: "7rem" }}>
        <div className="container-custom">
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>{project!.title}</h1>
          <p style={{ color: "var(--color-gray-mid)" }}>Full case study coming soon.</p>
        </div>
      </main>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main>
      <CaseStudyHero label={cs.label} title={cs.heroTitle} image={cs.heroImage} />

      <section style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="container-custom">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid var(--color-gray-border)", marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>Services:</span>
              {cs.services.map((s) => (
                <span key={s} style={{ fontSize: "0.85rem", padding: "0.5rem 1rem", borderRadius: "var(--radius-full)", border: "1px solid var(--color-gray-border)", color: "var(--color-black)" }}>{s}</span>
              ))}
            </div>
            <span style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>Date / {cs.date}</span>
          </div>
          <a href={cs.clientUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--color-black)", borderBottom: "1px solid var(--color-black)", paddingBottom: "2px" }}>
            {cs.clientName}
            <span>{"\u2197"}</span>
          </a>
        </div>

        <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", marginBottom: "5rem" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>{cs.briefLabel}</p>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--color-black)", marginBottom: "1.5rem" }}>Brief</h2>
            {cs.briefParagraphs.map((p, i) => (
              <p key={i} style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "1.25rem" }}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="container-custom" style={{ marginBottom: "6rem" }}>
        <div style={{ width: "100%", height: "min(40vw, 400px)", borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "var(--color-gray-bg)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cs.showcaseImage1} alt="Showcase" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </section>

      <section className="container-custom" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", marginBottom: "5rem" }}>
        <p style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>{cs.problemLabel}</p>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--color-black)", marginBottom: "1.5rem" }}>{cs.problemTitle}</h2>
          {cs.problemParagraphs.map((p, i) => (
            <p key={i} style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "1.25rem" }}>{p}</p>
          ))}

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--color-black)", marginTop: "3rem", marginBottom: "1.5rem" }}>{cs.solutionsTitle}</h2>
          {cs.solutions.map((s, i) => (
            <p key={i} style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              <strong style={{ color: "var(--color-black)" }}>{s.heading}</strong> {s.text}
            </p>
          ))}
        </div>
      </section>

      <section className="container-custom" style={{ marginBottom: "6rem" }}>
        <div style={{ width: "100%", height: "min(40vw, 400px)", borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "var(--color-gray-bg)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cs.showcaseImage2} alt="Showcase" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </section>

      <section className="container-custom" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", marginBottom: "5rem" }}>
        <p style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>{cs.resultLabel}</p>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--color-black)", marginBottom: "1.5rem" }}>{cs.resultTitle}</h2>
          {cs.results.map((r, i) => (
            <div key={i} style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.5rem" }}>{r.heading}</h3>
              <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8 }}>{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-custom" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", marginBottom: "5rem" }}>
        <p style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>{cs.thoughtsLabel}</p>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--color-black)", marginBottom: "1.5rem" }}>{cs.thoughtsTitle}</h2>
          <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8 }}>{cs.thoughtsText}</p>
        </div>
      </section>

      <section className="container-custom" style={{ marginBottom: "6rem" }}>
        <div style={{ width: "100%", height: "min(40vw, 400px)", borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "var(--color-gray-bg)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cs.showcaseImage3} alt="Showcase" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </section>

      <section style={{ paddingBottom: "7rem" }}>
        <div className="container-custom" style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-black)" }}>Next Project</h2>
        </div>
        <Link href={"/works/" + nextProject.slug} className="container-custom" style={{ display: "block" }}>
          <div style={{ width: "100%", height: "min(45vw, 420px)", borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "var(--color-black)", position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={nextProject.thumbnail} alt={nextProject.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
            <h3 style={{ position: "absolute", bottom: "2rem", left: "2rem", fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "#ffffff" }}>
              {nextProject.title}
            </h3>
          </div>
        </Link>
      </section>
    </main>
  );
}