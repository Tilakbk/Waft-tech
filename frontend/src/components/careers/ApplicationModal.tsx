"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";

interface ApplicationModalProps {
  jobTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function ApplicationModal({ jobTitle, isOpen, onClose }: ApplicationModalProps) {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", address: "" });
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetAndClose = () => {
    setFormData({ name: "", email: "", phone: "", address: "" });
    setResumeName(null);
    setSubmitted(false);
    setError(null);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError("File size must not exceed 2 MB.");
      return;
    }
    setError(null);
    setResumeName(file.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeName) {
      setError("Please upload your resume before submitting.");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={resetAndClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1200,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "var(--radius-lg)",
          width: "min(560px, 100%)",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "2.5rem",
          position: "relative",
        }}
      >
        <button
          onClick={resetAndClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1px solid var(--color-gray-border)",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <X size={16} strokeWidth={2} color="var(--color-gray-mid)" />
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.75rem" }}>
              Application Submitted!
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)", lineHeight: 1.7, marginBottom: "2rem" }}>
              Thank you for applying to the <strong>{jobTitle}</strong> position. Our team will review your
              application and reach out if there is a match.
            </p>
            <button
              onClick={resetAndClose}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "#ffffff",
                backgroundColor: "var(--color-brand-teal)",
                padding: "0.75rem 2rem",
                borderRadius: "var(--radius-full)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p style={{ fontSize: "0.85rem", color: "var(--color-gray-light)", marginBottom: "0.5rem" }}>
              Apply for
            </p>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "2rem", paddingRight: "2rem" }}>
              {jobTitle}
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.5rem" }}>
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Eg: John Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
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
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Eg: john@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
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
                  Contact number
                </label>
                <input
                  type="tel"
                  placeholder="Eg: +977 98XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
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
                  Current address
                </label>
                <input
                  type="text"
                  placeholder="Eg: Gairidhara, Kathmandu"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
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

              <div style={{
                border: "1px dashed var(--color-gray-border)",
                borderRadius: "var(--radius-sm)",
                padding: "1.25rem",
                marginBottom: "0.5rem",
              }}>
                <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-black)", cursor: "pointer", textDecoration: "underline" }}>
                  <Upload size={16} strokeWidth={2} />
                  Upload your resume
                  <input type="file" accept=".pdf,.docx" onChange={handleFileChange} style={{ display: "none" }} />
                </label>
                {resumeName && (
                  <p style={{ fontSize: "0.8rem", color: "var(--color-brand-teal)", marginTop: "0.5rem" }}>
                    {resumeName}
                  </p>
                )}
                <p style={{ fontSize: "0.75rem", color: "var(--color-gray-light)", marginTop: "0.5rem" }}>
                  File size not more than 2 MB. (Pdf, Docx)
                </p>
              </div>

              {error && (
                <p style={{ fontSize: "0.85rem", color: "#c0392b", marginBottom: "1rem" }}>{error}</p>
              )}

              <button
                type="submit"
                style={{
                  width: "100%",
                  marginTop: "1rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "#ffffff",
                  backgroundColor: "var(--color-brand-teal)",
                  padding: "0.9rem 2rem",
                  borderRadius: "var(--radius-full)",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 150ms ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-brand-teal-dark)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-brand-teal)"; }}
              >
                Submit Application
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}