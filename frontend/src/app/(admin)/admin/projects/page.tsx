"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { getAdminProjects, deleteProject, toggleProjectPublish, ProjectResponse } from "@/lib/api/projects";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      const page = await getAdminProjects(0, 100);
      setProjects(page.content);
    } catch {
      setError("Could not load projects.");
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete project.");
    }
  };

  const handleTogglePublish = async (id: number) => {
    try {
      const updated = await toggleProjectPublish(id);
      setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch {
      alert("Failed to update publish status.");
    }
  };

  if (!loaded) return null;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.5rem" }}>
            Projects
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)" }}>Manage the case studies shown on the Works page.</p>
        </div>
        <Link href="/admin/projects/new" style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          fontSize: "0.9rem", fontWeight: 500, color: "#ffffff",
          backgroundColor: "var(--color-brand-teal)", padding: "0.7rem 1.25rem",
          borderRadius: "var(--radius-full)", whiteSpace: "nowrap",
        }}>
          <Plus size={16} strokeWidth={2} />
          Add Project
        </Link>
      </div>

      {error && <p style={{ fontSize: "0.9rem", color: "#c0392b", marginBottom: "1rem" }}>{error}</p>}

      <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 0.75fr auto", padding: "0.9rem 1.5rem", borderBottom: "1px solid var(--color-gray-border)", backgroundColor: "var(--color-gray-bg)" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-light)", textTransform: "uppercase" }}>Title</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-light)", textTransform: "uppercase" }}>Tags</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-light)", textTransform: "uppercase" }}>Status</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-light)", textTransform: "uppercase" }}>Slug</span>
          <span></span>
        </div>

        {projects.length === 0 ? (
          <p style={{ padding: "2rem", textAlign: "center", fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>No projects yet. Add your first one.</p>
        ) : (
          projects.map((project, i) => (
            <div key={project.id} style={{
              display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 0.75fr auto",
              alignItems: "center", padding: "1rem 1.5rem",
              borderBottom: i < projects.length - 1 ? "1px solid var(--color-gray-border)" : "none",
            }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-black)" }}>{project.title}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>{project.tags.join(", ")}</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: project.isPublished ? "var(--color-brand-teal)" : "var(--color-gray-light)" }}>
                {project.isPublished ? "Published" : "Draft"}
              </span>
              <span style={{ fontSize: "0.85rem", color: "var(--color-gray-light)" }}>{project.slug}</span>
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                <button onClick={() => handleTogglePublish(project.id)} aria-label="Toggle publish" style={{
                  width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--color-gray-border)",
                  backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {project.isPublished ? <Eye size={14} strokeWidth={1.75} color="var(--color-gray-mid)" /> : <EyeOff size={14} strokeWidth={1.75} color="var(--color-gray-mid)" />}
                </button>
                <Link href={"/admin/projects/" + project.id + "/edit"} aria-label="Edit" style={{
                  width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--color-gray-border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Pencil size={14} strokeWidth={1.75} color="var(--color-gray-mid)" />
                </Link>
                <button onClick={() => handleDelete(project.id)} aria-label="Delete" style={{
                  width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--color-gray-border)",
                  backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Trash2 size={14} strokeWidth={1.75} color="#c0392b" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}