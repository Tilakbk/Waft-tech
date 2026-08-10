"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createBlogPost } from "@/lib/blog";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.75rem 1rem", fontSize: "0.9rem",
  border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-sm)",
  fontFamily: "var(--font-body)", outline: "none",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.5rem",
};

export default function NewBlogPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await createBlogPost({ title, category, coverImageUrl, excerpt, content });

    setIsSubmitting(false);

    if (result.success) {
      router.push("/admin/blog");
    } else {
      setError(result.error);
    }
  };

  return (
    <div style={{ maxWidth: "720px" }}>
      <Link href="/admin/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--color-gray-mid)", marginBottom: "1.5rem" }}>
        <ArrowLeft size={15} strokeWidth={2} />
        Back to Blog Posts
      </Link>

      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "2rem" }}>
        Add New Blog Post
      </h1>

      <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Category</label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Eg: Web Development" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Cover image URL</label>
          <input value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Excerpt</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} placeholder="A short summary shown on the Insights listing page." style={{ ...inputStyle, resize: "vertical" }} />
        </div>
        <div>
          <label style={labelStyle}>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} placeholder="Full article body. Use blank lines to separate paragraphs." style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        {error && <p style={{ fontSize: "0.85rem", color: "#c0392b" }}>{error}</p>}

        <button type="submit" disabled={isSubmitting} style={{
          fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500,
          color: "#ffffff", backgroundColor: isSubmitting ? "var(--color-gray-light)" : "var(--color-brand-teal)",
          padding: "0.8rem 2rem", borderRadius: "var(--radius-full)", border: "none",
          cursor: isSubmitting ? "not-allowed" : "pointer", alignSelf: "flex-start",
        }}>
          {isSubmitting ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
}