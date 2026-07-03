"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { loadCollection } from "@/lib/adminStore";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  services: string[];
  message: string;
  date: string;
  read: boolean;
}

const mockInquiries: Inquiry[] = [
  { id: "1", name: "Alex Johnson", email: "alex@example.com", services: ["UX Design", "Development"], message: "We are looking to redesign our e-commerce platform and need a team that understands both design and engineering.", date: "2026-07-01", read: false },
  { id: "2", name: "Priya Mehta", email: "priya@startup.io", services: ["Branding"], message: "We are a health tech startup launching next quarter and need a complete brand identity.", date: "2026-06-28", read: true },
  { id: "3", name: "Tom Nakamura", email: "tom@agency.com", services: ["Consulting"], message: "I would like to schedule a call to discuss a potential long-term partnership.", date: "2026-06-25", read: true },
];

export default function InquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    const all = loadCollection<Inquiry>("admin_inquiries", mockInquiries);
    const found = all.find((i) => i.id === id);
    if (!found) { router.push("/admin/inquiries"); return; }
    setInquiry(found);
  }, [id, router]);

  if (!inquiry) return null;

  return (
    <div style={{ maxWidth: "640px" }}>
      <Link href="/admin/inquiries" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--color-gray-mid)", marginBottom: "1.5rem" }}>
        <ArrowLeft size={15} strokeWidth={2} />
        Back to Inquiries
      </Link>
      <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.25rem" }}>{inquiry.name}</h1>
        <a href={"mailto:" + inquiry.email} style={{ fontSize: "0.875rem", color: "var(--color-brand-teal)", display: "block", marginBottom: "1.5rem" }}>{inquiry.email}</a>
        <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.5rem" }}>Services requested</p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {inquiry.services.map((s) => (
            <span key={s} style={{ fontSize: "0.8rem", padding: "0.3rem 0.75rem", borderRadius: "var(--radius-full)", border: "1px solid var(--color-gray-border)", color: "var(--color-gray-mid)" }}>{s}</span>
          ))}
        </div>
        <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.5rem" }}>Message</p>
        <p style={{ fontSize: "1rem", color: "var(--color-black)", lineHeight: 1.7, marginBottom: "2rem" }}>{inquiry.message}</p>
        <a href={"mailto:" + inquiry.email} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 500, color: "#ffffff", backgroundColor: "var(--color-brand-teal)", padding: "0.65rem 1.25rem", borderRadius: "var(--radius-full)" }}>
          <Mail size={15} strokeWidth={2} />
          Reply via email
        </a>
      </div>
    </div>
  );
}