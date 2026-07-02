"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, Clock, Mail } from "lucide-react";

const services = [
  "UX Design",
  "Development",
  "Branding",
  "Others",
  "SEO",
  "Motion Design",
  "Wordpress",
  "Consulting",
];

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"message" | "call">("message");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      {/* Hero + Form */}
      <section style={{ paddingTop: "10rem", paddingBottom: "6rem" }}>
        <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>

          {/* Left — headline */}
          <div>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 700,
              color: "var(--color-black)",
              lineHeight: 1.05,
            }}>
              Let&apos;s start a project together.
            </h1>
          </div>

          {/* Right — tabbed form */}
          <div>
            {/* Tabs */}
            <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem", borderBottom: "1px solid var(--color-gray-border)" }}>
              <button
                onClick={() => setActiveTab("message")}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: activeTab === "message" ? "var(--color-black)" : "var(--color-gray-light)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  paddingBottom: "1rem",
                  borderBottom: activeTab === "message" ? "2px solid var(--color-black)" : "2px solid transparent",
                  marginBottom: "-1px",
                }}
              >
                Message
              </button>
              <button
                onClick={() => setActiveTab("call")}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: activeTab === "call" ? "var(--color-black)" : "var(--color-gray-light)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  paddingBottom: "1rem",
                  borderBottom: activeTab === "call" ? "2px solid var(--color-black)" : "2px solid transparent",
                  marginBottom: "-1px",
                }}
              >
                Schedule a Call
              </button>
            </div>

            {/* MESSAGE TAB */}
            {activeTab === "message" && (
              <>
                {submitted ? (
                  <div style={{ padding: "2.5rem", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", textAlign: "center" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.75rem" }}>
                      Thank you!
                    </h3>
                    <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)" }}>
                      We&apos;ve received your inquiry and will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "2rem" }}>
                      We love to sit down and talk about ideas. Let&apos;s get your project up and running. Get in touch for a tech consultation today.
                    </p>

                    {/* Services pills */}
                    <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "1rem" }}>
                      What services are you looking for?
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem" }}>
                      {services.map((service) => {
                        const active = selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              padding: "0.6rem 1.25rem",
                              borderRadius: "var(--radius-full)",
                              border: active ? "1px solid var(--color-black)" : "1px solid var(--color-gray-border)",
                              backgroundColor: active ? "var(--color-black)" : "transparent",
                              color: active ? "#ffffff" : "var(--color-gray-mid)",
                              cursor: "pointer",
                              transition: "all 150ms ease",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>

                    {/* Full name */}
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.5rem" }}>
                        Your full name
                      </label>
                      <input
                        type="text"
                        placeholder="Eg: John Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        style={{
                          width: "100%",
                          padding: "0.875rem 1rem",
                          fontSize: "0.95rem",
                          border: "1px solid var(--color-gray-border)",
                          borderRadius: "var(--radius-sm)",
                          fontFamily: "var(--font-body)",
                          outline: "none",
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.5rem" }}>
                        Your email address
                      </label>
                      <input
                        type="email"
                        placeholder="Eg: john@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        style={{
                          width: "100%",
                          padding: "0.875rem 1rem",
                          fontSize: "0.95rem",
                          border: "1px solid var(--color-gray-border)",
                          borderRadius: "var(--radius-sm)",
                          fontFamily: "var(--font-body)",
                          outline: "none",
                        }}
                      />
                    </div>

                    {/* Message */}
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.5rem" }}>
                        Tell us in brief
                      </label>
                      <textarea
                        placeholder="Message/ Project Details"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        style={{
                          width: "100%",
                          padding: "0.875rem 1rem",
                          fontSize: "0.95rem",
                          border: "1px solid var(--color-gray-border)",
                          borderRadius: "var(--radius-sm)",
                          fontFamily: "var(--font-body)",
                          outline: "none",
                          resize: "vertical",
                        }}
                      />
                    </div>

                    {/* File upload */}
                    <div style={{
                      border: "1px dashed var(--color-gray-border)",
                      borderRadius: "var(--radius-sm)",
                      padding: "1.5rem",
                      marginBottom: "2rem",
                    }}>
                      <p style={{ fontSize: "0.9rem", color: "var(--color-gray-mid)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                        Share any requirement documents or briefs you may have with us right here. (Optional)
                      </p>
                      <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", fontWeight: 600, color: "var(--color-black)", cursor: "pointer", textDecoration: "underline" }}>
                        <Upload size={16} strokeWidth={2} />
                        Upload your document
                        <input type="file" accept=".pdf,.docx" onChange={handleFileChange} style={{ display: "none" }} />
                      </label>
                      {fileName && (
                        <p style={{ fontSize: "0.8rem", color: "var(--color-brand-teal)", marginTop: "0.5rem" }}>
                          {fileName}
                        </p>
                      )}
                      <p style={{ fontSize: "0.75rem", color: "var(--color-gray-light)", marginTop: "0.5rem" }}>
                        File size not more than 2 MB. (Pdf, Docx)
                      </p>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        color: "#ffffff",
                        backgroundColor: "var(--color-brand-teal)",
                        padding: "1rem 2rem",
                        borderRadius: "var(--radius-full)",
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 150ms ease",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-brand-teal-dark)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-brand-teal)"; }}
                    >
                      Send inquiry &#x2192;
                    </button>
                    <p style={{ fontSize: "0.8rem", color: "var(--color-gray-light)", marginTop: "1rem" }}>
                      By clicking on &quot;Send Inquiry&quot; button, you agree to our{" "}
                      <Link href="/privacy-policy" style={{ textDecoration: "underline", color: "var(--color-gray-mid)" }}>
                        Privacy Policy
                      </Link>.
                    </p>
                  </form>
                )}
              </>
            )}

            {/* SCHEDULE A CALL TAB */}
            {activeTab === "call" && (
              <div style={{ border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "2.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                  <div style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-brand-teal-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Mail size={24} strokeWidth={1.5} color="var(--color-brand-teal)" />
                  </div>
                  <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-black)" }}>Sales Team</p>
                </div>

                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "1rem" }}>
                  Project discussion call
                </h3>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                  <Clock size={16} strokeWidth={2} color="var(--color-gray-mid)" />
                  <span style={{ fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>50 Min approax</span>
                </div>

                <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "2rem" }}>
                  A member of our team will walk you through our work process and explain how we can help!
                </p>

                <Link
                  href="mailto:sales@wafttech.io"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "#ffffff",
                    backgroundColor: "var(--color-brand-teal)",
                    padding: "1rem 2rem",
                    borderRadius: "var(--radius-full)",
                    transition: "background-color 150ms ease",
                  }}
                >
                  Schedule my date and time &#x2192;
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Our locations */}
      <section style={{ backgroundColor: "var(--color-gray-bg)", paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div className="container-custom">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "3rem" }}>
            Our locations
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "4rem", marginBottom: "4rem" }}>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <div style={{ width: "72px", height: "72px", flexShrink: 0, backgroundColor: "var(--color-brand-teal-light)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-brand-teal)" }}>
                US
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.5rem" }}>Australia</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--color-brand-teal)", lineHeight: 1.6 }}>
                  260 Peachtree St NW Suite<br />2200 Atlanta, GA 30303, Australia
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <div style={{ width: "72px", height: "72px", flexShrink: 0, backgroundColor: "var(--color-brand-teal-light)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-brand-teal)" }}>
                NP
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.5rem" }}>Nepal</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--color-brand-teal)", lineHeight: 1.6 }}>
                  Kupandole<br />Lalitpur 44600, Nepal
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "4rem" }}>
            <div>
              <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.75rem", lineHeight: 1.5 }}>
                If you&apos;d rather, you can email us about new business opportunities.
              </p>
              <Link href="mailto:sales@wafttech.io" style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--color-brand-teal)" }}>
                sales@wafttech.io
              </Link>
            </div>
            <div>
              <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.75rem" }}>
                Looking for job opportunities?
              </p>
              <Link href="/careers" style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--color-black)" }}>
                Explore careers at Waft Tech &#x2192;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}