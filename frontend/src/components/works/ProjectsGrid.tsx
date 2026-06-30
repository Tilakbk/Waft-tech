"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import projectsData from "@/mock/projects.json";

interface Project {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  thumbnail: string;
  year: string;
}

const PAGE_SIZE = 6;

export default function ProjectsGrid() {
  const projects = projectsData as Project[];
  const [active, setActive] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (category: string) => {
    setActive(category);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div>
      <ProjectFilter active={active} onChange={handleFilterChange} />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "3rem",
      }}>
        {visible.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            title={project.title}
            category={project.tags.join(",")}
            thumbnail={project.thumbnail}
            year={project.year}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", textAlign: "center", padding: "4rem 0" }}>
          No projects found in this category.
        </p>
      )}

      {hasMore && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "4rem" }}>
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#ffffff",
              backgroundColor: "var(--color-black)",
              padding: "0.875rem 2.5rem",
              borderRadius: "var(--radius-full)",
              border: "none",
              cursor: "pointer",
              transition: "background-color 150ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-brand-teal)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-black)"; }}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}