"use client";

import { useState } from "react";
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

const categories = ["All", "Magento Commerce", "Web Design", "Web Development", "Design", "Wordpress", "SEO"];
const PAGE_SIZE = 6;

export default function InsightsPage() {
  const posts = blogData as Post[];
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = activeCategory === "All" ? rest : rest.filter((p) => p.category === activeCategory);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <main>
      {/* Hero */}
      <section style={{ paddingTop: "10rem", paddingBottom: "4rem" }}>
        <div className="container-custom">
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 700,
            color: "var(--color-black)",
            lineHeight: 1.05,
            maxWidth: "900px",
            marginBottom: "2.5rem",
          }}>
            Brush up on the latest trending tech talks written by experts in the field.
          </h1>

          {/* Category pills */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  padding: "0.6rem 1.25rem",
                  borderRadius: "var(--radius-full)",
                  border: activeCategory === cat ? "1px solid var(--color-black)" : "1px solid var(--color-gray-border)",
                  backgroundColor: activeCategory === cat ? "var(--color-black)" : "transparent",
                  color: activeCategory === cat ? "#ffffff" : "var(--color-gray-mid)",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post — full width banner */}
      {featured && activeCategory === "All" && (
        <section style={{ paddingBottom: "4rem" }}>
          <div className="container-custom">
            <Link href={"/insights/" + featured.slug} style={{ display: "block" }}>
              <div style={{
                position: "relative",
                width: "100%",
                height: "min(45vw, 420px)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                backgroundColor: "#1a1a6e",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.image}
                  alt={featured.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%)",
                  padding: "3rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  maxWidth: "600px",
                }}>
                  <h2 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.2,
                    marginBottom: "1rem",
                  }}>
                    {featured.title}
                  </h2>
                  <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                    {featured.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Blog grid */}
      <section style={{ paddingBottom: "7rem" }}>
        <div className="container-custom">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}>
            {visible.map((post) => (
              <Link key={post.slug} href={"/insights/" + post.slug} style={{ display: "block", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", overflow: "hidden", transition: "box-shadow 200ms ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
              >
                {/* Thumbnail */}
                <div style={{ width: "100%", aspectRatio: "16/9", backgroundColor: "#1a1a6e", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--color-black)",
                    lineHeight: 1.3,
                    marginBottom: "0.75rem",
                  }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--color-brand-teal)", lineHeight: 1.7 }}>
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: "center", fontSize: "1rem", color: "var(--color-gray-mid)", padding: "4rem 0" }}>
              No posts found in this category.
            </p>
          )}

          {/* Load More */}
          {hasMore && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "#ffffff",
                  backgroundColor: "var(--color-brand-teal)",
                  padding: "0.875rem 2.5rem",
                  borderRadius: "var(--radius-full)",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 150ms ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-brand-teal-dark)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-brand-teal)"; }}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ backgroundColor: "#0a0a2e", paddingTop: "8rem", paddingBottom: "8rem" }}>
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto", padding: "0 2rem" }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "3rem",
          }}>
            Together, let&apos;s create something wonderful.
          </h2>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#ffffff",
              backgroundColor: "var(--color-brand-teal)",
              padding: "1rem 2.5rem",
              borderRadius: "var(--radius-full)",
              transition: "background-color 150ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-brand-teal-dark)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-brand-teal)"; }}
          >
            Start working with us &#x2192;
          </Link>
        </div>
      </section>
    </main>
  );
}