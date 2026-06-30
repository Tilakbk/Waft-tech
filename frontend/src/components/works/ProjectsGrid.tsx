"use client";

import { useState, useMemo } from "react";
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

export default function ProjectsGrid() {
  const projects = projectsData as Project[];
  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...unique];
  }, [projects]);

  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <ProjectFilter categories={categories} active={active} onChange={setActive} />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "3rem",
      }}>
        {filtered.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            title={project.title}
            category={project.category}
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
    </div>
  );
}
