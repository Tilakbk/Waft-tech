"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import jobsData from "@/mock/jobs.json";
import { loadCollection, saveCollection } from "@/lib/adminStore";
import AdminForm from "@/components/admin/AdminForm";

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

const fields = [
  { key: "title", label: "Job title", placeholder: "Eg: Senior Frontend Developer", required: true },
  { key: "department", label: "Department", placeholder: "Eg: Engineering", required: true },
  { key: "location", label: "Location", placeholder: "Eg: Kathmandu, Nepal / Remote", required: true },
  { key: "type", label: "Employment type", placeholder: "Eg: Full-time / Part-time / Contract", required: true },
  { key: "description", label: "Job description", type: "textarea" as const, placeholder: "Describe the role, responsibilities, and requirements.", required: true },
];

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [values, setValues] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const existing = loadCollection<Job>(STORE_KEY, jobsData as Job[]);
    const job = existing.find((j) => j.id === id);
    if (!job) { setNotFound(true); setLoaded(true); return; }
    setValues({ title: job.title, department: job.department, location: job.location, type: job.type, description: job.description });
    setIsOpen(job.open);
    setLoaded(true);
  }, [id]);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = loadCollection<Job>(STORE_KEY, jobsData as Job[]);
    const updated = existing.map((j) =>
      j.id === id
        ? { ...j, title: values.title || "", department: values.department || "", location: values.location || "", type: values.type || "", description: values.description || "", open: isOpen }
        : j
    );
    saveCollection(STORE_KEY, updated);
    router.push("/admin/careers");
  };

  if (!loaded) return null;
  if (notFound) return (
    <div>
      <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)" }}>Job not found.</p>
      <Link href="/admin/careers" style={{ fontSize: "0.9rem", color: "var(--color-black)", textDecoration: "underline" }}>Back</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: "640px" }}>
      <Link href="/admin/careers" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--color-gray-mid)", marginBottom: "1.5rem" }}>
        <ArrowLeft size={15} strokeWidth={2} />
        Back to Job Openings
      </Link>

      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "2rem" }}>
        Edit Job Opening
      </h1>

      <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "2rem" }}>
        <AdminForm fields={fields} values={values} onChange={handleChange} />

        <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "1.25rem", fontSize: "0.9rem", color: "var(--color-black)", cursor: "pointer" }}>
          <input type="checkbox" checked={isOpen} onChange={(e) => setIsOpen(e.target.checked)} style={{ width: "16px", height: "16px" }} />
          Mark as open (visible on Careers page)
        </label>

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