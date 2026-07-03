import Link from "next/link";

const sections = [
  {
    heading: "1. Information We Collect",
    body: "We may collect personal information you provide directly to us, such as your name, email address, phone number, and any message content when you fill out a contact form, request a quote, or apply for a job through our website. We also automatically collect certain technical information, including your IP address, browser type, device information, and pages visited, through cookies and similar technologies.",
  },
  {
    heading: "2. How We Use Your Information",
    body: "We use the information we collect to respond to your inquiries, provide and improve our services, process job applications, send you updates about your project or application status, and analyze website usage to improve user experience. We do not sell your personal information to third parties.",
  },
  {
    heading: "3. Cookies and Tracking Technologies",
    body: "Our website uses cookies and similar tracking technologies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can control cookie settings through your browser, though disabling cookies may affect certain website functionality.",
  },
  {
    heading: "4. How We Share Your Information",
    body: "We may share your information with trusted third-party service providers who assist us in operating our website, conducting business, or servicing you, so long as those parties agree to keep this information confidential. We may also disclose information when required by law or to protect our rights and safety.",
  },
  {
    heading: "5. Data Security",
    body: "We implement reasonable administrative, technical, and physical safeguards designed to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    heading: "6. Data Retention",
    body: "We retain personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.",
  },
  {
    heading: "7. Your Rights",
    body: "Depending on your location, you may have the right to access, correct, delete, or restrict the use of your personal information. To exercise any of these rights, please contact us using the details below.",
  },
  {
    heading: "8. Third-Party Links",
    body: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external sites, and we encourage you to review their privacy policies separately.",
  },
  {
    heading: "9. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of our website after changes are posted constitutes acceptance of the revised policy.",
  },
  {
    heading: "10. Contact Us",
    body: "If you have any questions about this Privacy Policy or how we handle your personal information, please reach out to us via the Contact page or email us directly.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section style={{ paddingTop: "10rem", paddingBottom: "3rem" }}>
        <div className="container-custom" style={{ maxWidth: "820px" }}>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            fontWeight: 700,
            color: "var(--color-black)",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--color-gray-light)" }}>
            Last updated: July 2026
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "7rem" }}>
        <div className="container-custom" style={{ maxWidth: "820px" }}>
          <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "3rem" }}>
            Waft Tech ("we," "us," or "our") respects your privacy and is committed to protecting the personal
            information you share with us. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website or use our services.
          </p>

          {sections.map((section) => (
            <div key={section.heading} style={{ marginBottom: "2.5rem" }}>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "var(--color-black)",
                marginBottom: "0.85rem",
              }}>
                {section.heading}
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8 }}>
                {section.body}
              </p>
            </div>
          ))}

          <div style={{ paddingTop: "2rem", borderTop: "1px solid var(--color-gray-border)" }}>
            <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)" }}>
              Questions about this policy? Visit our{" "}
              <Link href="/contact" style={{ textDecoration: "underline", color: "var(--color-black)", fontWeight: 500 }}>
                Contact page
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}