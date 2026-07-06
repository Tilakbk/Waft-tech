"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { loadCollection, saveCollection } from "@/lib/adminStore";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  services: string[];
  message: string;
  date: string;
  read: boolean;
}

const STORE_KEY = "admin_inquiries";

const mockInquiries: Inquiry[] = [
  { id: "1", name: "Alex Johnson", email: "alex@example.com", services: ["UX Design", "Development"], message: "We are looking to redesign our e-commerce platform.", date: "2026-07-01", read: false },
  { id: "2", name: "Priya Mehta", email: "priya@startup.io", services: ["Branding"], message: "We are a health tech startup needing a complete brand identity.", date: "2026-06-28", read: true },
  { id: "3", name: "Tom Nakamura", email: "tom@agency.com", services: ["Consulting"], message: "I would like to discuss a potential partnership.", date: "2026-06-25", read: true },
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setInquiries(loadCollection<Inquiry>(STORE_KEY, mockInquiries));
    setLoaded(true);
  }, []);

  const markRead = (id: string) => {
    const updated = inquiries.map((i) => i.id === id ? { ...i, read: true } : i);
    setInquiries(updated);
    saveCollection(STORE_KEY, updated);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    const updated = inquiries.filter((i) => i.id !== id);
    setInquiries(updated);
    saveCollection(STORE_KEY, updated);
    if (selected?.id === id) setSelected(null);
  };

  const handleSelect = (inquiry: Inquiry) => {
    setSelected(inquiry);
    markRead(inquiry.id);
  };

  if (!loaded) return null;

  const leftPanel = (
    <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
      {inquiries.length === 0 ? (
        <p style={{ padding: "2rem", textAlign: "center", fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>No inquiries yet.</p>
      ) : inquiries.map((inquiry, i) => (
        <div
          key={inquiry.id}
          onClick={() => handleSelect(inquiry)}
          style={{
            padding: "1rem 1.25rem",
            borderBottom: i < inquiries.length - 1 ? "1px solid var(--color-gray-border)" : "none",
            cursor: "pointer",
            backgroundColor: selected?.id === inquiry.id ? "var(--color-brand-teal-light)" : inquiry.read ? "#ffffff" : "#f0fafa",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
            <span style={{ fontSize: "0.9rem", fontWeight: inquiry.read ? 500 : 700, color: "var(--color-black)" }}>{inquiry.name}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--color-gray-light)" }}>
              {new Date(inquiry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--color-gray-mid)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {inquiry.message}
          </p>
          {!inquiry.read && (
            <span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--color-brand-teal)", marginTop: "0.4rem" }} />
          )}
        </div>
      ))}
    </div>
  );

  const rightPanel = selected ? (
    <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "1.75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.25rem" }}>{selected.name}</h2>
          <p style={{ fontSize: "0.875rem", color: "var(--color-brand-teal)" }}>{selected.email}</p>
        </div>
        <button onClick={() => handleDelete(selected.id)} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Trash2 size={16} strokeWidth={1.75} color="#c0392b" />
        </button>
      </div>

      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.5rem" }}>Services</p>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
        {selected.services.map((s) => (
          <span key={s} style={{ fontSize: "0.8rem", padding: "0.3rem 0.75rem", borderRadius: "var(--radius-full)", border: "1px solid var(--color-gray-border)", color: "var(--color-gray-mid)" }}>{s}</span>
        ))}
      </div>

      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.5rem" }}>Message</p>
      <p style={{ fontSize: "0.95rem", color: "var(--color-black)", lineHeight: 1.7, marginBottom: "1.5rem" }}>{selected.message}</p>

      <p style={{ fontSize: "0.8rem", color: "var(--color-gray-mid)" }}>
        Reply at: <strong style={{ color: "var(--color-black)" }}>{selected.email}</strong>
      </p>
    </div>
  ) : (
    <div style={{ backgroundColor: "var(--color-gray-bg)", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "3rem", textAlign: "center" }}>
      <p style={{ fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>Select an inquiry to view details.</p>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.5rem" }}>
          Contact Inquiries
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)" }}>Messages submitted through the Contact page.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "1.5rem", alignItems: "start" }}>
        {leftPanel}
        {rightPanel}
      </div>
    </div>
  );
}