"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import teamData from "@/mock/team.json";
import { loadCollection, saveCollection } from "@/lib/adminStore";
import AdminForm from "@/components/admin/AdminForm";

interface Member {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
}

const STORE_KEY = "admin_team";

const fields = [
  { key: "name", label: "Full name", placeholder: "Eg: Ashwin Rai", required: true },
  { key: "role", label: "Role / Title", placeholder: "Eg: Frontend Developer", required: true },
  { key: "photo", label: "Photo URL", placeholder: "/images/team/example.jpg" },
  { key: "bio", label: "Short bio", type: "textarea" as const, placeholder: "One or two sentences about this person.", required: true },
];

export default function EditTeamMemberPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [values, setValues] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [notFoundFlag, setNotFoundFlag] = useState(false);

  useEffect(() => {
    const existing = loadCollection<Member>(STORE_KEY, teamData as Member[]);
    const member = existing.find((m) => m.id === id);
    if (!member) {
      setNotFoundFlag(true);
      setLoaded(true);
      return;
    }
    setValues({
      name: member.name,
      role: member.role,
      photo: member.photo,
      bio: member.bio,
    });
    setLoaded(true);
  }, [id]);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = loadCollection<Member>(STORE_KEY, teamData as Member[]);

    const updated = existing.map((m) =>
      m.id === id
        ? { ...m, name: values.name || "", role: values.role || "", photo: values.photo || "", bio: values.bio || "" }
        : m
    );

    saveCollection(STORE_KEY, updated);
    router.push("/admin/team");
  };

  if (!loaded) return null;

  if (notFoundFlag) {
    return (
      <div>
        <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)" }}>Team member not found.</p>
        <Link href="/admin/team" style={{ fontSize: "0.9rem", color: "var(--color-black)", textDecoration: "underline" }}>
          Back to Team
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "640px" }}>
      <Link href="/admin/team" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--color-gray-mid)", marginBottom: "1.5rem" }}>
        <ArrowLeft size={15} strokeWidth={2} />
        Back to Team
      </Link>

      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "2rem" }}>
        Edit Team Member
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
          Save Changes
        </button>
      </form>
    </div>
  );
}