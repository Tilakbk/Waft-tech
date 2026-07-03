"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Clock, Briefcase, ChevronDown } from "lucide-react";
import jobsData from "@/mock/jobs.json";

interface Job {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  remote: boolean;
  postedDate: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const departments = ["All", "Engineering", "Design", "Marketing"];

export default function OpenRoles() {
  const jobs = jobsData as Job[];
  const [activeDept, setActiveDept] = useState("All");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const filtered = activeDept === "All" ? jobs : jobs.filter((j) => j.department === activeDept);

  const toggleExpand = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <section id="open-roles" style={{ paddingTop: "7rem", paddingBottom: "7rem", backgroundColor: "var(--color-gray-bg)" }}>
      <div className="container-custom">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3rem" }}>
          <div>
            <p style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-gray-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Join Us
            </p>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "var(--color-black)",
              lineHeight: 1.1,
            }}>
              Open Positions
            </h2>
          </div>

          {/* Department filter */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  padding: "0.6rem 1.25rem",
                  borderRadius: "var(--radius-full)",
                  border: activeDept === dept ? "1px solid var(--color-black)" : "1px solid var(--color-gray-border)",
                  backgroundColor: activeDept === dept ? "var(--color-black)" : "transparent",
                  color: activeDept === dept ? "#ffffff" : "var(--color-gray-mid)",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  whiteSpace: "nowrap",
                }}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "1rem", color: "var(--color-gray-mid)", padding: "3rem 0" }}>
            No open positions in this department right now. Check back soon!
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {filtered.map((job) => {
              const isExpanded = expandedSlug === job.slug;
              return (
                <div
                  key={job.slug}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-gray-border)",
                    overflow: "hidden",
                    transition: "box-shadow 200ms ease",
                  }}
                >
                  {/* Row header */}
                  <button
                    onClick={() => toggleExpand(job.slug)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1.5rem",
                      padding: "1.5rem 2rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: "220px" }}>
                      <h3 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "var(--color-black)",
                        marginBottom: "0.6rem",
                      }}>
                        {job.title}
                      </h3>
                      <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>
                          <Briefcase size={14} strokeWidth={1.75} />
                          {job.department}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>
                          <MapPin size={14} strokeWidth={1.75} />
                          {job.location}{job.remote ? " (Remote OK)" : ""}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>
                          <Clock size={14} strokeWidth={1.75} />
                          {job.type}
                        </span>
                      </div>
                    </div>

                    <ChevronDown
                      size={20}
                      strokeWidth={2}
                      color="var(--color-gray-mid)"
                      style={{
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 200ms ease",
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  {/* Expanded content */}
                  <div style={{
                    maxHeight: isExpanded ? "800px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 300ms ease",
                  }}>
                    <div style={{ padding: "0 2rem 2rem 2rem", borderTop: "1px solid var(--color-gray-border)", paddingTop: "1.5rem" }}>
                      <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                        {job.description}
                      </p>

                      <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.75rem" }}>
                        Responsibilities
                      </p>
                      <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
                        {job.responsibilities.map((r) => (
                          <li key={r} style={{ fontSize: "0.9rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "0.35rem" }}>
                            {r}
                          </li>
                        ))}
                      </ul>

                      <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.75rem" }}>
                        Requirements
                      </p>
                      <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.75rem" }}>
                        {job.requirements.map((r) => (
                          <li key={r} style={{ fontSize: "0.9rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "0.35rem" }}>
                            {r}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={"mailto:hr@wafttech.io?subject=Application: " + job.title}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.6rem",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: "#ffffff",
                          backgroundColor: "var(--color-brand-teal)",
                          padding: "0.75rem 1.5rem",
                          borderRadius: "var(--radius-full)",
                        }}
                      >
                        Apply for this role &#x2192;
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}