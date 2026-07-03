"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import jobsData from "@/mock/jobs.json";
import { loadCollection, saveCollection } from "@/lib/adminStore";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  open: boolean;
}

const STORE_KEY = "admin_jobs";

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setJobs(loadCollection<Job>(STORE_KEY, jobsData as Job[]));
    setLoaded(true);
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("Remove this job opening? This cannot be undone.")) return;
    const updated = jobs.filter((j) => j.id !== id);
    setJobs(updated);
    saveCollection(STORE_KEY, updated);
  };

  const toggleOpen = (id: string) => {
    const updated = jobs.map((j) => j.id === id ? { ...j, open: !j.open } : j);
    setJobs(updated);
    saveCollection(STORE_KEY, updated);
  };

  if (!loaded) return null;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.5rem" }}>
            Job Openings
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)" }}>
            Manage positions shown on the Careers page.
          </p>
        </div>
        <Link href="/admin/careers/new" style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          fontSize: "0.9rem", fontWeight: 500, color: "#ffffff",
          backgroundColor: "var(--color-brand-teal)", padding: "0.7rem 1.25rem",
          borderRadius: "var(--radius-full)", whiteSpace: "nowrap",
        }}>
          <Plus size={16} strokeWidth={2} />
          Add Opening
        </Link>
      </div>

      <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.25fr 1fr 1fr 0.75fr auto", padding: "0.9rem 1.5rem", borderBottom: "1px solid var(--color-gray-border)", backgroundColor: "var(--color-gray-bg)" }}>
          {["Title", "Department", "Location", "Type", "Status", ""].map((h) => (
            <span key={h} style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
          ))}
        </div>

        {jobs.length === 0 ? (
          <p style={{ padding: "2rem", textAlign: "center", fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>
            No job openings yet. Add your first one.
          </p>
        ) : (
          jobs.map((job, i) => (
            <div key={job.id} style={{
              display: "grid", gridTemplateColumns: "2fr 1.25fr 1fr 1fr 0.75fr auto",
              alignItems: "center", padding: "1rem 1.5rem",
              borderBottom: i < jobs.length - 1 ? "1px solid var(--color-gray-border)" : "none",
            }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-black)" }}>{job.title}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>{job.department}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>{job.location}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>{job.type}</span>
              <button
                onClick={() => toggleOpen(job.id)}
                style={{
                  fontSize: "0.75rem", fontWeight: 600, padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-full)", border: "none", cursor: "pointer",
                  backgroundColor: job.open ? "#EAF3DE" : "#FCEBEB",
                  color: job.open ? "#27500A" : "#A32D2D",
                  transition: "all 150ms ease",
                }}
              >
                {job.open ? "Open" : "Closed"}
              </button>
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                <Link href={"/admin/careers/" + job.id + "/edit"} aria-label="Edit" style={{
                  width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--color-gray-border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Pencil size={14} strokeWidth={1.75} color="var(--color-gray-mid)" />
                </Link>
                <button onClick={() => handleDelete(job.id)} aria-label="Delete" style={{
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