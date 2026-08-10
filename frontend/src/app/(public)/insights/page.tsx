"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPublishedBlogPosts, BlogPost } from "@/lib/blog";

const categories = ["All", "Magento Commerce", "Web Design", "Web Development", "Design", "Wordpress", "SEO"];
const PAGE_SIZE = 6;

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoaded(false);
      const result = await getPublishedBlogPosts({
        category: activeCategory === "All" ? undefined : activeCategory,
        page: 0,
        size: PAGE_SIZE,
      });

      if (cancelled) return;

      if (result.success) {
        setPosts(result.data.content);
        setPage(0);
        setHasMore(!result.data.last);
        setError(null);
      } else {
        setError(result.error);
      }
      setLoaded(true);
    }

    load();
    return () => { cancelled = true; };
  }, [activeCategory]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const result = await getPublishedBlogPosts({
      category: activeCategory === "All" ? undefined : activeCategory,
      page: nextPage,
      size: PAGE_SIZE,
    });

    if (result.success) {
      setPosts((prev) => [...prev, ...result.data.content]);
      setPage(nextPage);
      setHasMore(!result.data.last);
    }
    setLoadingMore(false);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
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

      {/* Blog grid */}
      <section style={{ paddingBottom: "7rem" }}>
        <div className="container-custom">
          {error && (
            <p style={{ fontSize: "0.9rem", color: "#c0392b", marginBottom: "2rem" }}>{error}</p>
          )}

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}>
            {posts.map((post) => (
              <Link key={post.id} href={"/insights/" + post.slug} style={{ display: "block", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", overflow: "hidden", transition: "box-shadow 200ms ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
              >
                {/* Thumbnail */}
                <div style={{ width: "100%", aspectRatio: "16/9", backgroundColor: "#1a1a6e", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.coverImageUrl}
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

          {loaded && posts.length === 0 && (
            <p style={{ textAlign: "center", fontSize: "1rem", color: "var(--color-gray-mid)", padding: "4rem 0" }}>
              No posts found in this category.
            </p>
          )}

          {/* Load More */}
          {hasMore && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "#ffffff",
                  backgroundColor: loadingMore ? "var(--color-gray-light)" : "var(--color-brand-teal)",
                  padding: "0.875rem 2.5rem",
                  borderRadius: "var(--radius-full)",
                  border: "none",
                  cursor: loadingMore ? "not-allowed" : "pointer",
                  transition: "background-color 150ms ease",
                }}
              >
                {loadingMore ? "Loading..." : "Load More"}
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