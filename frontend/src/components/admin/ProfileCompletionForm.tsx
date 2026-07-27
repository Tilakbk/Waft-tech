"use client";

import { useState } from "react";
import { completeProfile } from "@/lib/auth";

interface ProfileCompletionFormProps {
  fullName: string;
  onComplete: () => void;
}

export default function ProfileCompletionForm({ fullName, onComplete }: ProfileCompletionFormProps) {
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await completeProfile({ photo, bio, roleTitle });

    setIsSubmitting(false);

    if (result.success) {
      onComplete();
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--color-gray-bg)",
      padding: "1.5rem",
    }}>
      <div style={{
        width: "min(480px, 100%)",
        backgroundColor: "#ffffff",
        borderRadius: "var(--radius-lg)",
        padding: "2.5rem",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.5rem" }}>
          Welcome, {fullName}
        </p>
        <p style={{ fontSize: "0.9rem", color: "var(--color-gray-mid)", marginBottom: "2rem" }}>
          Before you continue, please complete your profile. This information will be shown on the public Company page.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.5rem" }}>
              Photo URL
            </label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Paste a link to your photo (e.g. from LinkedIn, Imgur, or Google Drive)"
              required
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                fontSize: "0.9rem",
                border: "1px solid var(--color-gray-border)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-body)",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.5rem" }}>
              Role title
            </label>
            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="Eg: Frontend Developer"
              required
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                fontSize: "0.9rem",
                border: "1px solid var(--color-gray-border)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-body)",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.5rem" }}>
              Short bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A sentence or two about yourself."
              required
              disabled={isSubmitting}
              rows={4}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                fontSize: "0.9rem",
                border: "1px solid var(--color-gray-border)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-body)",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          {error && (
            <p style={{ fontSize: "0.85rem", color: "#c0392b", marginBottom: "1.25rem" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#ffffff",
              backgroundColor: isSubmitting ? "var(--color-gray-light)" : "var(--color-brand-teal)",
              padding: "0.85rem 2rem",
              borderRadius: "var(--radius-full)",
              border: "none",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "background-color 150ms ease",
            }}
          >
            {isSubmitting ? "Saving..." : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}