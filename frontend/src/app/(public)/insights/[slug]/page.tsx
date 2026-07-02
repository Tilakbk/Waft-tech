import { notFound } from "next/navigation";
import Link from "next/link";
import blogData from "@/mock/blog.json";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  featured: boolean;
}

export default async function InsightPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = blogData as Post[];
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const nextPost = posts[(currentIndex + 1) % posts.length];

  return (
    <main>
      {/* Hero */}
      <section style={{ paddingTop: "10rem", paddingBottom: "3rem" }}>
        <div className="container-custom" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>
              {new Date(post!.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--color-gray-light)" }}>|</span>
            <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-brand-teal)" }}>
              {post!.category}
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: 700,
            color: "var(--color-black)",
            lineHeight: 1.1,
          }}>
            {post!.title}
          </h1>
        </div>
      </section>

      {/* Cover image */}
      <section style={{ marginBottom: "4rem" }}>
        <div className="container-custom">
          <div style={{
            width: "100%",
            height: "min(45vw, 440px)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            backgroundColor: "#1a1a6e",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post!.image} alt={post!.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* Article body with sticky social share sidebar */}
      <section className="container-custom" style={{ marginBottom: "7rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: "4rem", alignItems: "start" }}>

          {/* Sticky social share sidebar */}
          <div style={{ position: "sticky", top: "6rem", display: "flex", flexDirection: "column", gap: "1.25rem", alignItems: "center" }}>
            {[
              { label: "LinkedIn", icon: "in", href: "https://linkedin.com" },
              { label: "Facebook", icon: "f", href: "https://facebook.com" },
              { label: "Twitter", icon: "x", href: "https://twitter.com" },
              { label: "Copy", icon: "#", href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid var(--color-gray-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--color-gray-mid)",
                  transition: "all 150ms ease",
                  textDecoration: "none",
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Article content */}
          <div style={{ maxWidth: "720px" }}>
            <p style={{ fontSize: "1.1rem", color: "var(--color-gray-mid)", lineHeight: 1.9, marginBottom: "2rem", fontWeight: 500 }}>
              {post!.excerpt}
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "1rem", marginTop: "2.5rem" }}>
              What makes this topic matter?
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
              This is a placeholder article body. When connected to the backend CMS, the full rich-text content will render here — complete with headings, paragraphs, images, blockquotes, bullet lists, and inline links.
            </p>
            <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
              Our team of experts carefully researches every topic to bring you the most accurate and actionable insights. Whether you are a developer, designer, or business owner, our articles are written to help you stay ahead of the curve.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "1rem", marginTop: "2.5rem" }}>
              Key takeaways
            </h2>
            <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
              {["Understanding the fundamentals is the first step.", "Applying best practices saves time and reduces errors.", "Continuous learning is what separates good developers from great ones.", "Community resources and documentation are your best friends."].map((item) => (
                <li key={item} style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.9, marginBottom: "0.5rem" }}>
                  {item}
                </li>
              ))}
            </ul>

            <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.9, marginBottom: "2rem" }}>
              Stay tuned for more in-depth articles covering the latest trends in web design, development, and digital strategy. Subscribe to our newsletter to get notified when new content is published.
            </p>

            {/* Author block */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              paddingTop: "2.5rem",
              borderTop: "1px solid var(--color-gray-border)",
              marginTop: "3rem",
            }}>
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                backgroundColor: "var(--color-brand-teal-light)",
                overflow: "hidden",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--color-brand-teal)",
              }}>
                W
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", color: "var(--color-gray-light)", marginBottom: "0.2rem" }}>Written by</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.15rem" }}>Waft Tech Team</p>
                <p style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>Content Writer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next blog */}
      <section style={{ paddingBottom: "7rem" }}>
        <div className="container-custom" style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-black)" }}>
            Next blog
          </h2>
        </div>
        <Link href={"/insights/" + nextPost.slug} style={{ display: "block" }}>
          <div className="container-custom">
            <div style={{
              position: "relative",
              width: "100%",
              height: "min(40vw, 380px)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              backgroundColor: "#1a1a6e",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={nextPost.image} alt={nextPost.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
              <div style={{
                position: "absolute",
                bottom: "2rem",
                left: "2rem",
                right: "2rem",
              }}>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.2,
                }}>
                  {nextPost.title}
                </h3>
              </div>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}