"use client";

import { useEffect, useState } from "react";
import { getPublicTeamMembers, TeamMember } from "@/lib/team";

export default function TeamGrid() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const result = await getPublicTeamMembers();
      if (result.success) {
        setMembers(result.data);
      }
      setLoaded(true);
    }
    load();
  }, []);

  if (!loaded || members.length === 0) return null;

  return (
    <section style={{ backgroundColor: "var(--color-white)", paddingTop: "5rem", paddingBottom: "7rem" }}>
      <div className="container-custom">
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--color-black)", textAlign: "center", marginBottom: "3.5rem" }}>
          Meet our team
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 240px))", gap: "2rem", justifyContent: "center" }}>
          {members.map((member) => {
            const isHovered = hoveredId === member.id;
            return (
              <div key={member.id} style={{ width: "100%", maxWidth: "240px" }}>
                <div
                  onMouseEnter={() => setHoveredId(member.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "3/4",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    backgroundColor: "var(--color-gray-bg)",
                    marginBottom: "1rem",
                    cursor: "default",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photo ?? "/images/team/placeholder.jpg"}
                    alt={member.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }}
                  />

                  {member.bio && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(10, 20, 40, 0.9)",
                        padding: "1.25rem",
                        display: "flex",
                        alignItems: "center",
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 250ms ease",
                        pointerEvents: "none",
                      }}
                    >
                      <p style={{
                        fontSize: "0.85rem",
                        lineHeight: 1.6,
                        color: "#ffffff",
                      }}>
                        {member.bio}
                      </p>
                    </div>
                  )}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.25rem" }}>{member.name}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-brand-teal)" }}>{member.roleTitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}