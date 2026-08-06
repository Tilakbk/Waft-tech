"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { registerTeamMember } from "@/lib/team";

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

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await registerTeamMember({ name, email, password });

    setSubmitting(false);

    if (result.success) {
      router.push("/admin/team");
    } else {
      setError(result.error);
    }
  };

  return (
    <div style={{ maxWidth: "640px" }}>
      <Link href="/admin/team" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--color-gray-mid)", marginBottom: "1.5rem" }}>
        <ArrowLeft size={15} strokeWidth={2} />
        Back to Team
      </Link>

      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.5rem" }}>
        Add New Team Member
      </h1>
      <p style={{ fontSize: "0.85rem", color: "var(--color-gray-light)", marginBottom: "2rem" }}>
        This creates a login account. The new member signs in themselves to complete their profile
        (photo, bio, role title) — those fields aren&apos;t set here.
      </p>

      {error && (
        <p style={{ fontSize: "0.85rem", color: "#c0392b", marginBottom: "1.25rem" }}>{error}</p>
      )}

      <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "2rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Full name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Eg: Ashwin Rai" required style={inputStyle} />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ashwin@wafttech.io" required style={inputStyle} />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Temporary password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required style={inputStyle} />
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
          {submitting ? "Creating..." : "Add Member"}
        </button>
      </form>
    </div>
  );
}