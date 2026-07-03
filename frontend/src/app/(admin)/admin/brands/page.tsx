"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import brandsData from "@/mock/trustedBrands.json";

interface Brand {
  id: string;
  name: string;
  logo: string;
  url: string;
}

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(brandsData as Brand[]);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newBrand: Brand = {
      id: Date.now().toString(),
      name: name.trim(),
      logo: logo.trim() || "/images/brands/placeholder.svg",
      url: url.trim() || "#",
    };
    setBrands((prev) => [...prev, newBrand]);
    setName("");
    setLogo("");
    setUrl("");
  };

  const handleDelete = (id: string) => {
    setBrands((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.5rem" }}>
        Trusted Brands
      </h1>
      <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)", marginBottom: "2rem" }}>
        Manage the client logos shown in the &quot;Trusted by teams at&quot; section on the homepage.
      </p>

      {/* Add new brand form */}
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
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.4rem" }}>Brand name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Eg: Nexora" style={{ width: "100%", padding: "0.6rem 0.75rem", fontSize: "0.875rem", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-sm)", outline: "none" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.4rem" }}>Logo URL</label>
          <input value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="/images/brands/logo.svg" style={{ width: "100%", padding: "0.6rem 0.75rem", fontSize: "0.875rem", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-sm)", outline: "none" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.4rem" }}>Website URL</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." style={{ width: "100%", padding: "0.6rem 0.75rem", fontSize: "0.875rem", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-sm)", outline: "none" }} />
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

      {/* Brands list */}
      <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        {brands.length === 0 ? (
          <p style={{ padding: "2rem", textAlign: "center", fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>
            No brands added yet.
          </p>
        ) : (
          brands.map((brand, i) => (
            <div key={brand.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "1rem 1.5rem",
              borderBottom: i < brands.length - 1 ? "1px solid var(--color-gray-border)" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-sm)", backgroundColor: "var(--color-gray-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-mid)" }}>
                  {brand.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-black)" }}>{brand.name}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-gray-light)" }}>{brand.url}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(brand.id)} aria-label="Delete brand" style={{
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