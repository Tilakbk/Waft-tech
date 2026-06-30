"use client";

interface ProjectFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export default function ProjectFilter({ categories, active, onChange }: ProjectFilterProps) {
  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            fontWeight: 500,
            padding: "0.6rem 1.25rem",
            borderRadius: "var(--radius-full)",
            border: active === cat ? "1px solid var(--color-black)" : "1px solid var(--color-gray-border)",
            backgroundColor: active === cat ? "var(--color-black)" : "transparent",
            color: active === cat ? "#ffffff" : "var(--color-gray-mid)",
            cursor: "pointer",
            transition: "all 150ms ease",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
