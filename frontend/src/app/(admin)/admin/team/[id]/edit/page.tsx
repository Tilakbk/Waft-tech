"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getTeamMemberById, updateTeamMember, TeamMember } from "@/lib/team";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  fontSize: "0.9rem",
  border: "1px solid var(--color-gray-border)",
  borderRadius: "var(--radius-sm)",
  fontFamily: "var(--font-body)",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "var(--color-black)",
  marginBottom: "0.5rem",
};

export default function EditTeamMemberPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [member, setMember] = useState<TeamMember | null>(null);
  const [name, setName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const result = await getTeamMemberById(id);
      if (result.success) {
        setMember(result.data);
        setName(result.data.name);
        setRoleTitle(result.data.roleTitle ?? "");
        setPhoto(result.data.photo ?? "");
        setBio(result.data.bio ?? "");
      } else {
        setNotFound(true);
      }
      setLoaded(true);
    }
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await updateTeamMember(id, { name, roleTitle, photo, bio });

    setSubmitting(false);

    if (result.success) {
      router.push("/admin/team");
    } else {
      setError(result.error);
    }
  };

  if (!loaded) return null;

  if (notFound || !member) {
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

      {error && (
        <p style={{ fontSize: "0.85rem", color: "#c0392b", marginBottom: "1.25rem" }}>{error}</p>
      )}

      <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "2rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Full name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Eg: Ashwin Rai" style={inputStyle} />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Role / Title</label>
          <input type="text" value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} placeholder="Eg: Frontend Developer" style={inputStyle} />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Photo URL</label>
          <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="/images/team/example.jpg" style={inputStyle} />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Short bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="One or two sentences about this person." style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500,
            color: "#ffffff", backgroundColor: submitting ? "var(--color-gray-light)" : "var(--color-brand-teal)",
            padding: "0.8rem 2rem", borderRadius: "var(--radius-full)",
            border: "none", cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}