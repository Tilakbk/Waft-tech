"use client";

import { useState } from "react";
import { Target, Users, Shield, Award } from "lucide-react";

const values = [
  { number: "01", label: "Passionately Driven", description: "We continuously strive to be technologically innovative and achieve process excellence in order to enable our customers to harvest significant business advantages.", Icon: Target },
  { number: "02", label: "Customer Centricity", description: "We are passionate about customer service and believe in being proactive and going the extra mile to ensure our customers get the best possible experience using our services.", Icon: Users },
  { number: "03", label: "Business Ethics and Transparency", description: "To be honest, dedicated, fair, transparent, sincere, and open in all customer transactions.", Icon: Shield },
  { number: "04", label: "Ownership", description: "We believe in being accountable and taking ownership of the outcomes due to our efforts. We celebrate good results wholeheartedly and reflect on the results that go wrong, but we always take the buck.", Icon: Award },
];

export default function CoreValues() {
  const [active, setActive] = useState(0);
  const val = values[active];

  return (
    <section style={{ backgroundColor: "var(--color-white)", paddingTop: "7rem", paddingBottom: "7rem" }}>
      <div className="container-custom">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center", marginBottom: "4rem" }}>
          <div>
            <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-gray-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Our core Values</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--color-black)", lineHeight: 1.2, marginBottom: "1.25rem" }}>{val.label}</h2>
            <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8 }}>{val.description}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "320px", backgroundColor: "var(--color-brand-teal-light)", borderRadius: "var(--radius-lg)" }}>
            <val.Icon size={120} strokeWidth={1} color="var(--color-brand-teal)" />
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", borderTop: "1px solid var(--color-gray-border)", paddingTop: "2rem" }}>
          {values.map((v, i) => (
            <button key={v.number} onClick={() => setActive(i)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0", borderBottom: active === i ? "2px solid var(--color-black)" : "2px solid transparent", paddingBottom: "1rem" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--color-gray-light)" }}>{v.number}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: active === i ? "var(--color-black)" : "var(--color-gray-light)" }}>{v.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}