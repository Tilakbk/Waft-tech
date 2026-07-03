"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import teamData from "@/mock/team.json";
import { loadCollection, saveCollection } from "@/lib/adminStore";

interface Member {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
}

const STORE_KEY = "admin_team";

export default function AdminTeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setMembers(loadCollection<Member>(STORE_KEY, teamData as Member[]));
    setLoaded(true);
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("Remove this team member? This cannot be undone.")) return;
    const updated = members.filter((m) => m.id !== id);
    setMembers(updated);
    saveCollection(STORE_KEY, updated);
  };

  if (!loaded) return null;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.5rem" }}>
            Team
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)" }}>
            Manage the profiles shown on the Company page.
          </p>
        </div>
        <Link href="/admin/team/new" style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          fontSize: "0.9rem", fontWeight: 500, color: "#ffffff",
          backgroundColor: "var(--color-brand-teal)", padding: "0.7rem 1.25rem",
          borderRadius: "var(--radius-full)", whiteSpace: "nowrap",
        }}>
          <Plus size={16} strokeWidth={2} />
          Add Member
        </Link>
      </div>

      <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr auto", padding: "0.9rem 1.5rem", borderBottom: "1px solid var(--color-gray-border)", backgroundColor: "var(--color-gray-bg)" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Name</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Role</span>
          <span></span>
        </div>

        {members.length === 0 ? (
          <p style={{ padding: "2rem", textAlign: "center", fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>
            No team members yet. Add your first one.
          </p>
        ) : (
          members.map((member, i) => (
            <div key={member.id} style={{
              display: "grid", gridTemplateColumns: "2fr 2fr auto",
              alignItems: "center", padding: "1rem 1.5rem",
              borderBottom: i < members.length - 1 ? "1px solid var(--color-gray-border)" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "var(--color-brand-teal-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-brand-teal)", flexShrink: 0 }}>
                  {member.name.charAt(0)}
                </div>
                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-black)" }}>{member.name}</span>
              </div>
              <span style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>{member.role}</span>
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                <Link href={"/admin/team/" + member.id + "/edit"} aria-label="Edit" style={{
                  width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--color-gray-border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Pencil size={14} strokeWidth={1.75} color="var(--color-gray-mid)" />
                </Link>
                <button onClick={() => handleDelete(member.id)} aria-label="Delete" style={{
                  width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--color-gray-border)",
                  backgroundColor: "transparent", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
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