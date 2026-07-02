"use client";

import { useState } from "react";
import Link from "next/link";
import IndustryGridSection from "@/components/home/IndustryGridSection";
import { Code2,Globe, Smartphone, ShoppingCart, Database, ChevronDown } from "lucide-react";

const services = [
  {
    id: "discover",
    title: "Discovery",
    description: "We conduct high-level research based on your requirements to develop the best digital solutions. We understand, devise, and strategize solutions that are centered around your idea.",
    image: "/images/what-we-do/discovery.jpg",
    items: ["User Research", "UX Audit", "Product and Business Strategy", "Conversion Rate Optimisation"],
  },
  {
    id: "design",
    title: "Design",
    description: "Users first. We create for the end users. Those who are on your platform every day. Those who wish life was a little bit easier. We do our part. We design products. We design brands. But most importantly, we design experiences.",
    image: "/images/what-we-do/design.jpg",
    items: ["UX Design", "UI Design", "Competitive Analysis", "Motion Design", "Branding", "Digital Prototyping"],
  },
  {
    id: "build",
    title: "Build",
    description: "We build the tech for the future. We adhere to the latest coding standards to build scalable products. Our rooted understanding of your business helps us find what works best for you.",
    image: "/images/what-we-do/build.jpg",
    items: ["Web Development", "Mobile Application", "E-commerce Solutions", "CMS Integration"],
  },
];

const techStacks = [
  {
    category: "Design",
    description: "Intuitive designs powered by innovative tools.",
    tools: ["Figma", "Adobe XD","Photoshop", "After Effects", "Premiere", "Framer", "Vector"],
  },
  {
    category: "Front-end Development",
    description: "Pixel-perfect development created and curated for your projects.",
    tools: ["React", "Vue", "Flutter", "CSS3", "Angular", "Ember", "Tailwind"],
  },
  {
    category: "Back-end Development",
    description: "Our robust backend developers, backed up by powerful tools.",
    tools: ["Spring Boot", "Laravel", "Django", "Node.js", "CakePHP", "Rails"],
  },
];

function AccordionItem({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--color-gray-border)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 0", background: "none", border: "none", cursor: "pointer" }}
      >
        <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 500, color: "var(--color-black)" }}>{label}</span>
        <ChevronDown size={18} color="var(--color-gray-mid)" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 200ms ease" }} />
      </button>
      {open && (
        <p style={{ fontSize: "0.9rem", color: "var(--color-gray-mid)", lineHeight: 1.7, paddingBottom: "1rem" }}>
          Our team specializes in {label.toLowerCase()} to deliver exceptional results for your project.
        </p>
      )}
    </div>
  );
}

export default function WhatWeDoPage() {
  return (
    <main>
      {/* Hero */}
      <section style={{ backgroundColor: "var(--color-gray-bg)", paddingTop: "12rem", paddingBottom: "6rem" }}>
        <div className="container-custom">
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, color: "var(--color-black)", lineHeight: 1.05, maxWidth: "800px" }}>
            We help companies build, design, and develop digital solutions.
          </h1>
        </div>
      </section>

      {/* Services */}
      {services.map((service, i) => (
        <section key={service.id} id={service.id} style={{ backgroundColor: i % 2 === 0 ? "var(--color-white)" : "var(--color-white)", paddingTop: "7rem", paddingBottom: "7rem", borderTop: "1px solid var(--color-gray-border)" }}>
          <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "5rem", alignItems: "start" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--color-black)", position: "sticky", top: "6rem" }}>
              {service.title}
            </h2>
            <div>
              <p style={{ fontSize: "1rem", color: "var(--color-brand-teal)", lineHeight: 1.8, marginBottom: "2rem" }}>{service.description}</p>
              <div style={{ width: "100%", height: "min(35vw, 300px)", borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "var(--color-gray-bg)", marginBottom: "2rem" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={service.image} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                {service.items.map((item) => (
                  <AccordionItem key={item} label={item} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Industry Grid */}
      <IndustryGridSection />

      {/* Capabilities */}
      <section style={{ paddingTop: "7rem", paddingBottom: "0" }}>
        <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start", marginBottom: "5rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "var(--color-black)", lineHeight: 1.1 }}>
            Our<br />Capabilities
          </h2>
          <div>
            <p style={{ fontSize: "1rem", color: "var(--color-brand-teal)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              When we work on your project, you will have a team of dedicated professionals invested in your vision. Our experienced developers work with industry-leading tech stacks to construct exceptional design and functionality.
            </p>
            <p style={{ fontSize: "1rem", color: "var(--color-brand-teal)", lineHeight: 1.8 }}>
              We work to produce top-tier digital solutions — every time.
            </p>
          </div>
        </div>

        {/* Full width team photo */}
        <div style={{ width: "100%", height: "min(80vw, 680px)", overflow: "hidden", backgroundColor: "var(--color-gray-bg)", marginBottom: "5rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/what-we-do/team-full.jpg" alt="Our team" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        </div>

        {/* Tech stack grid */}
        <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4rem", paddingBottom: "7rem", borderTop: "1px solid var(--color-gray-border)", paddingTop: "4rem" }}>
          {techStacks.map((stack) => (
            <div key={stack.category}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.75rem" }}>{stack.category}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--color-brand-teal)", lineHeight: 1.7, marginBottom: "1.5rem" }}>{stack.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {stack.tools.map((tool) => (
                  <span key={tool} style={{ fontSize: "0.8rem", fontWeight: 500, padding: "0.4rem 0.9rem", borderRadius: "var(--radius-full)", border: "1px solid var(--color-gray-border)", color: "var(--color-gray-mid)" }}>{tool}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      
      
    </main>
  );
}