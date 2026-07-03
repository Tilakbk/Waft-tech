"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import techStackData from "@/mock/techStack.json";

interface Tech {
  id: string;
  name: string;
  logo: string;
  category: string;
}

const categories = ["Frontend", "Backend", "Database", "DevOps", "Design", "Language"];

export default function AdminTechStackPage() {
  const [stack, setStack] = useState<Tech[]>(techStackData as Tech[]);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newTech: Tech = {
      id: Date.now().toString(),
      name: name.trim(),
      logo: logo.trim() || "/images/techstack/placeholder.svg",
      category,
    };
    setStack((prev) => [...prev, newTech]);
    setName("");
    setLogo("");
    setCategory(categories[0]);
  };

  const handleDelete = (id: string) => {
    setStack((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.5rem" }}>
        Tech Stack
      </h1>
      <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)", marginBottom: "2rem" }}>
        Manage the technologies shown in the &quot;Technology we work with&quot; section on the homepage.
      </p>

      <form onSubmit={handleAdd} style={{
        backgroundColor: "#ffffff",
        border: "1px solid var(--color-gray-border)",
        borderRadius: "var(--radius-md)",
        padding: "1.5rem",
        marginBottom: "2rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr auto",
        gap: "1rem",
        alignItems: "end",
      }}>
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.4rem" }}>Technology name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Eg: PostgreSQL" style={{ width: "100%", padding: "0.6rem 0.75rem", fontSize: "0.875rem", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-sm)", outline: "none" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.4rem" }}>Logo URL</label>
          <input value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="/images/techstack/logo.svg" style={{ width: "100%", padding: "0.6rem 0.75rem", fontSize: "0.875rem", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-sm)", outline: "none" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.4rem" }}>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: "100%", padding: "0.6rem 0.75rem", fontSize: "0.875rem", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-sm)", outline: "none", backgroundColor: "#ffffff" }}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button type="submit" style={{
          display: "flex", alignItems: "center", gap: "0.4rem",
          padding: "0.65rem 1.1rem", fontSize: "0.875rem", fontWeight: 500,
          color: "#ffffff", backgroundColor: "var(--color-brand-teal)",
          border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", whiteSpace: "nowrap",
        }}>
          <Plus size={16} strokeWidth={2} />
          Add
        </button>
      </form>

      <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        {stack.length === 0 ? (
          <p style={{ padding: "2rem", textAlign: "center", fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>
            No technologies added yet.
          </p>
        ) : (
          stack.map((tech, i) => (
            <div key={tech.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "1rem 1.5rem",
              borderBottom: i < stack.length - 1 ? "1px solid var(--color-gray-border)" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-sm)", backgroundColor: "var(--color-gray-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-mid)" }}>
                  {tech.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-black)" }}>{tech.name}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-gray-light)" }}>{tech.category}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(tech.id)} aria-label="Delete technology" style={{
                width: "34px", height: "34px", borderRadius: "50%", border: "1px solid var(--color-gray-border)",
                backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <Trash2 size={15} strokeWidth={1.75} color="#c0392b" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}