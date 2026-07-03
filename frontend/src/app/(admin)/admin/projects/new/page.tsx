"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function NewProjectPage() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = loadCollection<Project>(STORE_KEY, projectsData as Project[]);

    if (existing.some((p) => p.slug === values.slug)) {
      alert("A project with this slug already exists. Please choose a different slug.");
      return;
    }

    const newProject: Project = {
      title: values.title || "",
      slug: values.slug || "",
      category: values.category || "",
      tags: (values.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
      thumbnail: values.thumbnail || "/images/works/placeholder-thumb.jpg",
      year: values.year || new Date().getFullYear().toString(),
    };

    const updated = [...existing, newProject];
    saveCollection(STORE_KEY, updated);
    router.push("/admin/projects");
  };

  return (
    <div style={{ maxWidth: "640px" }}>
      <Link href="/admin/projects" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--color-gray-mid)", marginBottom: "1.5rem" }}>
        <ArrowLeft size={15} strokeWidth={2} />
        Back to Projects
      </Link>

      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "2rem" }}>
        Add New Project
      </h1>

      <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "2rem" }}>
        <AdminForm fields={fields} values={values} onChange={handleChange} />

        <button type="submit" style={{
          marginTop: "2rem",
          fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500,
          color: "#ffffff", backgroundColor: "var(--color-brand-teal)",
          padding: "0.8rem 2rem", borderRadius: "var(--radius-full)",
          border: "none", cursor: "pointer",
        }}>
          Create Project
        </button>
      </form>
    </div>
  );
}