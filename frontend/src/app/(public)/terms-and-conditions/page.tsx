import Link from "next/link";

const sections = [
  {
    heading: "1. Acceptance of Terms",
    body: "By accessing or using the Waft Tech website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website or services.",
  },
  {
    heading: "2. Services",
    body: "Waft Tech provides digital product design and development services, including but not limited to discovery, UI/UX design, and software engineering. Any project engagement, scope, timeline, and pricing will be governed by a separate signed agreement between Waft Tech and the client.",
  },
  {
    heading: "3. Intellectual Property",
    body: "All content on this website, including text, graphics, logos, images, and code, is the property of Waft Tech or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without our prior written consent.",
  },
  {
    heading: "4. Client Deliverables",
    body: "Ownership of deliverables created for a client project transfers to the client upon full payment, as specified in the applicable project agreement. Waft Tech retains the right to showcase completed work in its portfolio unless otherwise agreed in writing.",
  },
  {
    heading: "5. User Conduct",
    body: "You agree not to use this website for any unlawful purpose, to transmit harmful code, to attempt unauthorized access to our systems, or to interfere with the proper functioning of the website.",
  },
  {
    heading: "6. Job Applications",
    body: "By submitting a job application through our Careers page, you confirm that the information provided is accurate and consent to us processing your application, including storing your resume and contact details for recruitment purposes.",
  },
  {
    heading: "7. Third-Party Links",
    body: "Our website may contain links to third-party websites for your convenience. We do not endorse and are not responsible for the content, accuracy, or practices of these external sites.",
  },
  {
    heading: "8. Limitation of Liability",
    body: "Waft Tech shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of, or inability to use, this website or our services, to the fullest extent permitted by law.",
  },
  {
    heading: "9. Disclaimer of Warranties",
    body: "This website and its content are provided on an \"as is\" and \"as available\" basis without warranties of any kind, either express or implied, including but not limited to accuracy, reliability, or fitness for a particular purpose.",
  },
  {
    heading: "10. Governing Law",
    body: "These Terms and Conditions shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.",
  },
  {
    heading: "11. Changes to These Terms",
    body: "We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on this page with an updated revision date. Continued use of the website after changes are posted constitutes your acceptance of the revised terms.",
  },
  {
    heading: "12. Contact Us",
    body: "If you have any questions about these Terms and Conditions, please reach out to us via the Contact page or email us directly.",
  },
];

export default function TermsAndConditionsPage() {
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
            Terms and Conditions
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--color-gray-light)" }}>
            Last updated: July 2026
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "7rem" }}>
        <div className="container-custom" style={{ maxWidth: "820px" }}>
          <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "3rem" }}>
            These Terms and Conditions ("Terms") govern your use of the Waft Tech website located at wafttech.io
            and any related services. Please read these Terms carefully before using our website.
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
              Questions about these terms? Visit our{" "}
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