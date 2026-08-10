import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedBlogPostBySlug, getPublishedBlogPosts } from "@/lib/blog";

export default async function InsightPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const result = await getPublishedBlogPostBySlug(slug);

  if (!result.success) notFound();

  const post = result.data;

  const nextResult = await getPublishedBlogPosts({ size: 5 });
  const nextPost = nextResult.success
    ? nextResult.data.content.find((p) => p.slug !== slug)
    : undefined;

  const paragraphs = post.content.split("\n").filter((line) => line.trim() !== "");

  return (
    <main>
      {/* Hero */}
      <section style={{ paddingTop: "10rem", paddingBottom: "3rem" }}>
        <div className="container-custom" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>
              {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--color-gray-light)" }}>|</span>
            <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-brand-teal)" }}>
              {post.category}
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: 700,
            color: "var(--color-black)",
            lineHeight: 1.1,
          }}>
            {post.title}
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
            <img src={post.coverImageUrl} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
            ].map((s) => (
              
                
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
              {post.excerpt}
            </p>

            {paragraphs.map((para, i) => (
              <p key={i} style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
                {para}
              </p>
            ))}

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
                {post.authorName.charAt(0)}
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", color: "var(--color-gray-light)", marginBottom: "0.2rem" }}>Written by</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.15rem" }}>{post.authorName}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next blog */}
      {nextPost && (
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
                <img src={nextPost.coverImageUrl} alt={nextPost.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
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
      )}
    </main>
  );
}