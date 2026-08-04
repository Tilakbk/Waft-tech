"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";
import { createProject, SolutionItem } from "@/lib/api/projects";

export default function NewProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [date, setDate] = useState("");
  const [brief, setBrief] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [solutions, setSolutions] = useState<SolutionItem[]>([{ heading: "", text: "" }]);
  const [results, setResults] = useState<SolutionItem[]>([{ heading: "", text: "" }]);
  const [finalThought, setFinalThought] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateItem = (list: SolutionItem[], setList: (v: SolutionItem[]) => void, i: number, field: "heading" | "text", value: string) => {
    const next = [...list];
    next[i] = { ...next[i], [field]: value };
    setList(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await createProject({
        title,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        thumbnailUrl,
        heroImageUrl,
        date,
        brief,
        problemStatement,
        solutions: solutions.filter((s) => s.heading || s.text),
        results: results.filter((r) => r.heading || r.text),
        finalThought,
      });
      router.push("/admin/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "0.75rem 1rem", fontSize: "0.9rem",
    border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-sm)",
    fontFamily: "var(--font-body)", outline: "none",
  };
  const labelStyle = { display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.5rem" };

  return (
    <div style={{ maxWidth: "720px" }}>
      <Link href="/admin/projects" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--color-gray-mid)", marginBottom: "1.5rem" }}>
        <ArrowLeft size={15} strokeWidth={2} />
        Back to Projects
      </Link>

      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "2rem" }}>
        Add New Project
      </h1>

      <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Tags (comma separated)</label>
          <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Branding, UI/UX Design" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Thumbnail image URL</label>
          <input value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Hero image URL</label>
          <input value={heroImageUrl} onChange={(e) => setHeroImageUrl(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Brief</label>
          <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>
        <div>
          <label style={labelStyle}>Problem statement</label>
          <textarea value={problemStatement} onChange={(e) => setProblemStatement(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div>
          <label style={labelStyle}>Solutions</label>
          {solutions.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <input placeholder="Heading" value={s.heading} onChange={(e) => updateItem(solutions, setSolutions, i, "heading", e.target.value)} style={{ ...inputStyle, flex: "0 0 40%" }} />
              <input placeholder="Text" value={s.text} onChange={(e) => updateItem(solutions, setSolutions, i, "text", e.target.value)} style={{ ...inputStyle, flex: 1 }} />
              <button type="button" onClick={() => setSolutions(solutions.filter((_, idx) => idx !== i))} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={16} color="#c0392b" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setSolutions([...solutions, { heading: "", text: "" }])} style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", color: "var(--color-brand-teal)", background: "none", border: "none", cursor: "pointer" }}>
            <Plus size={14} /> Add solution item
          </button>
        </div>

        <div>
          <label style={labelStyle}>Results</label>
          {results.map((r, i) => (
            <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <input placeholder="Heading" value={r.heading} onChange={(e) => updateItem(results, setResults, i, "heading", e.target.value)} style={{ ...inputStyle, flex: "0 0 40%" }} />
              <input placeholder="Text" value={r.text} onChange={(e) => updateItem(results, setResults, i, "text", e.target.value)} style={{ ...inputStyle, flex: 1 }} />
              <button type="button" onClick={() => setResults(results.filter((_, idx) => idx !== i))} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={16} color="#c0392b" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setResults([...results, { heading: "", text: "" }])} style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", color: "var(--color-brand-teal)", background: "none", border: "none", cursor: "pointer" }}>
            <Plus size={14} /> Add result item
          </button>
        </div>

        <div>
          <label style={labelStyle}>Final thought</label>
          <textarea value={finalThought} onChange={(e) => setFinalThought(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        {error && <p style={{ fontSize: "0.85rem", color: "#c0392b" }}>{error}</p>}

        <button type="submit" disabled={isSubmitting} style={{
          fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500,
          color: "#ffffff", backgroundColor: isSubmitting ? "var(--color-gray-light)" : "var(--color-brand-teal)",
          padding: "0.8rem 2rem", borderRadius: "var(--radius-full)", border: "none",
          cursor: isSubmitting ? "not-allowed" : "pointer", alignSelf: "flex-start",
        }}>
          {isSubmitting ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}