"use client";

import { useEffect, useState } from "react";
import { getPublicTeamMembers, TeamMember } from "@/lib/team";

export default function TeamGrid() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loaded, setLoaded] = useState(false);

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
          {members.map((member) => (
            <div key={member.id} style={{ width: "100%", maxWidth: "240px" }}>
              <div style={{ width: "100%", aspectRatio: "3/4", borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "var(--color-gray-bg)", marginBottom: "1rem", filter: "grayscale(100%)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={member.photo ?? "/images/team/placeholder.jpg"} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.25rem" }}>{member.name}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-brand-teal)" }}>{member.roleTitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}