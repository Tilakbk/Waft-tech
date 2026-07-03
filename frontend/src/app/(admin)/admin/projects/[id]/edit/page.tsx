"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import projectsData from "@/mock/projects.json";
import { loadCollection, saveCollection } from "@/lib/adminStore";
import AdminForm from "@/components/admin/AdminForm";

interface Project {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  thumbnail: string;
  year: string;
  caseStudy?: unknown;
}

const STORE_KEY = "admin_projects";

const fields = [
  { key: "title", label: "Project title", placeholder: "Eg: Luminate", required: true },
  { key: "slug", label: "URL slug", placeholder: "Eg: luminate (no spaces)", required: true },
  { key: "category", label: "Category", placeholder: "Eg: Branding", required: true },
  { key: "tags", label: "Tags (comma separated)", placeholder: "Eg: Branding, UI/UX Design" },
  { key: "thumbnail", label: "Thumbnail image URL", placeholder: "/images/works/example-thumb.jpg" },
  { key: "year", label: "Year", placeholder: "Eg: 2026" },
];

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [values, setValues] = useState<Record<string, string>>({});
  const [caseStudy, setCaseStudy] = useState<unknown>(undefined);
  const [loaded, setLoaded] = useState(false);
  const [notFoundFlag, setNotFoundFlag] = useState(false);

  useEffect(() => {
    const existing = loadCollection<Project>(STORE_KEY, projectsData as Project[]);
    const project = existing.find((p) => p.slug === id);
    if (!project) {
      setNotFoundFlag(true);
      setLoaded(true);
      return;
    }
    setValues({
      title: project.title,
      slug: project.slug,
      category: project.category,
      tags: project.tags.join(", "),
      thumbnail: project.thumbnail,
      year: project.year,
    });
    setCaseStudy(project.caseStudy);
    setLoaded(true);
  }, [id]);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = loadCollection<Project>(STORE_KEY, projectsData as Project[]);

    const updated = existing.map((p) =>
      p.slug === id
        ? {
            ...p,
            title: values.title || "",
            slug: values.slug || "",
            category: values.category || "",
            tags: (values.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
            thumbnail: values.thumbnail || "",
            year: values.year || "",
            caseStudy,
          }
        : p
    );

    saveCollection(STORE_KEY, updated);
    router.push("/admin/projects");
  };

  if (!loaded) return null;

  if (notFoundFlag) {
    return (
      <div>
        <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)" }}>Project not found.</p>
        <Link href="/admin/projects" style={{ fontSize: "0.9rem", color: "var(--color-black)", textDecoration: "underline" }}>
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "640px" }}>
      <Link href="/admin/projects" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--color-gray-mid)", marginBottom: "1.5rem" }}>
        <ArrowLeft size={15} strokeWidth={2} />
        Back to Projects
      </Link>

      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.5rem" }}>
        Edit Project
      </h1>
      <p style={{ fontSize: "0.85rem", color: "var(--color-gray-light)", marginBottom: "2rem" }}>
        Note: full case study content (Brief, Challenge, Solutions, etc.) is not editable here yet —
        this form covers the fields shown on the Works listing page.
      </p>

      <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "2rem" }}>
        <AdminForm fields={fields} values={values} onChange={handleChange} />

        <button type="submit" style={{
          marginTop: "2rem",
          fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500,
          color: "#ffffff", backgroundColor: "var(--color-brand-teal)",
          padding: "0.8rem 2rem", borderRadius: "var(--radius-full)",
          border: "none", cursor: "pointer",
        }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}