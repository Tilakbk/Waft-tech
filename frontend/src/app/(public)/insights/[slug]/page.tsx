"use client";

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

  const related = posts.filter((p) => p.slug !== slug && p.category === post!.category).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section style={{ paddingTop: "10rem", paddingBottom: "4rem" }}>
        <div className="container-custom" style={{ maxWidth: "860px" }}>
          <span style={{
            display: "inline-block",
            fontSize: "0.8rem",
            fontWeight: 500,
            padding: "0.4rem 1rem",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--color-gray-border)",
            color: "var(--color-gray-mid)",
            marginBottom: "1.5rem",
          }}>
            {post!.category}
          </span>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: 700,
            color: "var(--color-black)",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}>
            {post!.title}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--color-gray-mid)", lineHeight: 1.8 }}>
            {post!.excerpt}
          </p>
        </div>
      </section>

      {/* Cover image */}
      <section className="container-custom" style={{ marginBottom: "5rem" }}>
        <div style={{
          width: "100%",
          height: "min(45vw, 420px)",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          backgroundColor: "#1a1a6e",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post!.image}
            alt={post!.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
          />
        </div>
      </section>

      {/* Article body */}
      <section className="container-custom" style={{ maxWidth: "860px", marginBottom: "7rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "4rem" }}>
          <div style={{ paddingTop: "0.25rem" }}>
            <p style={{ fontSize: "0.75rem", color: "var(--color-gray-light)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Published</p>
            <p style={{ fontSize: "0.875rem", color: "var(--color-gray-mid)" }}>
              {new Date(post!.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "1.05rem", color: "var(--color-gray-mid)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
              {post!.excerpt} This is a placeholder article body. When connected to the backend CMS, the full rich-text content will render here. The layout supports headings, paragraphs, images, blockquotes, and code blocks.
            </p>
            <p style={{ fontSize: "1.05rem", color: "var(--color-gray-mid)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
              Our team of experts carefully researches every topic to bring you the most accurate and actionable insights. Whether you are a developer, designer, or business owner, our articles are written to help you stay ahead of the curve.
            </p>
            <p style={{ fontSize: "1.05rem", color: "var(--color-gray-mid)", lineHeight: 1.9 }}>
              Stay tuned for more in-depth articles covering the latest trends in web design, development, and digital strategy. Subscribe to our newsletter to get notified when new content is published.
            </p>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section style={{ backgroundColor: "var(--color-gray-bg)", paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="container-custom">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "2.5rem" }}>
              Related Articles
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
              {related.map((p) => (
                <Link key={p.slug} href={"/insights/" + p.slug} style={{ display: "block", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "#ffffff" }}>
                  <div style={{ width: "100%", aspectRatio: "16/9", backgroundColor: "#1a1a6e", overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }} />
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--color-black)", lineHeight: 1.3, marginBottom: "0.5rem" }}>{p.title}</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)", lineHeight: 1.6 }}>{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to insights */}
      <section style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="container-custom">
          <Link href="/insights" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--color-black)" }}>
            &#x2190; Back to Insights
          </Link>
        </div>
      </section>
    </main>
  );
}