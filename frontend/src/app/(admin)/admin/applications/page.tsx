"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { loadCollection, saveCollection } from "@/lib/adminStore";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  coverLetter: string;
  appliedAt: string;
  status: "new" | "reviewed" | "shortlisted" | "rejected";
}

const STORE_KEY = "admin_applications";

const mockApplications: Application[] = [
  { id: "1", name: "Ramesh Shrestha", email: "ramesh@gmail.com", phone: "+977 9841234567", position: "Frontend Developer", experience: "3 years", coverLetter: "I have been working with React and Next.js for 3 years and would love to join Waft Tech.", appliedAt: "2026-07-02", status: "new" },
  { id: "2", name: "Sita Thapa", email: "sita.thapa@outlook.com", phone: "+977 9812345678", position: "UI/UX Designer", experience: "2 years", coverLetter: "I specialize in Figma and user research focused on accessible, beautiful designs.", appliedAt: "2026-07-01", status: "reviewed" },
  { id: "3", name: "Bikram Rai", email: "bikram.rai@gmail.com", phone: "+977 9867891234", position: "Backend Engineer", experience: "4 years", coverLetter: "I have deep expertise in Java and Spring Boot, built for fintech clients.", appliedAt: "2026-06-29", status: "shortlisted" },
  { id: "4", name: "Anita Gurung", email: "anita.gurung@gmail.com", phone: "+977 9823456789", position: "Frontend Developer", experience: "1 year", coverLetter: "I recently graduated and have been building personal projects with React.", appliedAt: "2026-06-28", status: "rejected" },
];

const statusStyles: Record<string, { bg: string; color: string; label: string }> = {
  new:         { bg: "#E6F1FB", color: "#0C447C", label: "New" },
  reviewed:    { bg: "#FAEEDA", color: "#633806", label: "Reviewed" },
  shortlisted: { bg: "#EAF3DE", color: "#27500A", label: "Shortlisted" },
  rejected:    { bg: "#FCEBEB", color: "#A32D2D", label: "Rejected" },
};

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selected, setSelected] = useState<Application | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setApplications(loadCollection<Application>(STORE_KEY, mockApplications));
    setLoaded(true);
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("Delete this application?")) return;
    const updated = applications.filter((a) => a.id !== id);
    setApplications(updated);
    saveCollection(STORE_KEY, updated);
    if (selected?.id === id) setSelected(null);
  };

  const handleStatusChange = (id: string, status: Application["status"]) => {
    const updated = applications.map((a) => a.id === id ? { ...a, status } : a);
    setApplications(updated);
    saveCollection(STORE_KEY, updated);
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : prev);
  };

  if (!loaded) return null;

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.5rem" }}>
          Job Applications
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)" }}>
          Applications submitted by candidates for open positions.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "1.5rem", alignItems: "start" }}>
        <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          {applications.length === 0 ? (
            <p style={{ padding: "2rem", textAlign: "center", fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>No applications yet.</p>
          ) : applications.map((app, i) => (
            <div
              key={app.id}
              onClick={() => setSelected(app)}
              style={{
                padding: "1rem 1.25rem",
                borderBottom: i < applications.length - 1 ? "1px solid var(--color-gray-border)" : "none",
                cursor: "pointer",
                backgroundColor: selected?.id === app.id ? "var(--color-brand-teal-light)" : "#ffffff",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-black)" }}>{app.name}</span>
                <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: "var(--radius-full)", backgroundColor: statusStyles[app.status].bg, color: statusStyles[app.status].color }}>
                  {statusStyles[app.status].label}
                </span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--color-brand-teal)", marginBottom: "0.1rem" }}>{app.position}</p>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-light)" }}>
                {new Date(app.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          ))}
        </div>

        {selected ? (
          <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.2rem" }}>{selected.name}</h2>
                <p style={{ fontSize: "0.875rem", color: "var(--color-brand-teal)", marginBottom: "0.15rem" }}>{selected.position}</p>
                <p style={{ fontSize: "0.8rem", color: "var(--color-gray-mid)" }}>{selected.experience} experience</p>
              </div>
              <button onClick={() => handleDelete(selected.id)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <Trash2 size={16} strokeWidth={1.75} color="#c0392b" />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.3rem" }}>Email</p>
                <p style={{ fontSize: "0.875rem", color: "var(--color-black)" }}>{selected.email}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.3rem" }}>Phone</p>
                <p style={{ fontSize: "0.875rem", color: "var(--color-black)" }}>{selected.phone}</p>
              </div>
            </div>

            <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.5rem" }}>Cover Letter</p>
            <p style={{ fontSize: "0.9rem", color: "var(--color-black)", lineHeight: 1.7, marginBottom: "1.5rem" }}>{selected.coverLetter}</p>

            <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.75rem" }}>Update Status</p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {(["new", "reviewed", "shortlisted", "rejected"] as Application["status"][]).map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(selected.id, s)}
                  style={{
                    fontSize: "0.8rem", fontWeight: 600, padding: "0.4rem 1rem",
                    borderRadius: "var(--radius-full)", border: "none", cursor: "pointer",
                    backgroundColor: selected.status === s ? statusStyles[s].color : statusStyles[s].bg,
                    color: selected.status === s ? "#ffffff" : statusStyles[s].color,
                    transition: "all 150ms ease",
                  }}
                >
                  {statusStyles[s].label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ backgroundColor: "var(--color-gray-bg)", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "3rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>Select an application to view details.</p>
          </div>
        )}
      </div>
    </div>
  );
}