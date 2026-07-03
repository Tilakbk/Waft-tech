"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function NewJobPage() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = loadCollection<Job>(STORE_KEY, jobsData as Job[]);

    const newJob: Job = {
      id: Date.now().toString(),
      title: values.title || "",
      department: values.department || "",
      location: values.location || "",
      type: values.type || "",
      description: values.description || "",
      open: isOpen,
    };

    saveCollection(STORE_KEY, [...existing, newJob]);
    router.push("/admin/careers");
  };

  return (
    <div style={{ maxWidth: "640px" }}>
      <Link href="/admin/careers" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--color-gray-mid)", marginBottom: "1.5rem" }}>
        <ArrowLeft size={15} strokeWidth={2} />
        Back to Job Openings
      </Link>

      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "2rem" }}>
        Add New Job Opening
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
          Post Opening
        </button>
      </form>
    </div>
  );
}