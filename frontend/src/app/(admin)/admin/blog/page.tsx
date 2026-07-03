"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import blogData from "@/mock/blog.json";
import { loadCollection, saveCollection } from "@/lib/adminStore";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  featured: boolean;
}

const STORE_KEY = "admin_blog";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPosts(loadCollection<Post>(STORE_KEY, blogData as Post[]));
    setLoaded(true);
  }, []);

  const handleDelete = (slug: string) => {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    const updated = posts.filter((p) => p.slug !== slug);
    setPosts(updated);
    saveCollection(STORE_KEY, updated);
  };

  if (!loaded) return null;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.5rem" }}>
            Blog Posts
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)" }}>
            Manage articles shown on the Insights page.
          </p>
        </div>
        <Link href="/admin/blog/new" style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          fontSize: "0.9rem", fontWeight: 500, color: "#ffffff",
          backgroundColor: "var(--color-brand-teal)", padding: "0.7rem 1.25rem",
          borderRadius: "var(--radius-full)", whiteSpace: "nowrap",
        }}>
          <Plus size={16} strokeWidth={2} />
          Add Post
        </Link>
      </div>

      <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1.25fr 1fr 0.75fr auto", padding: "0.9rem 1.5rem", borderBottom: "1px solid var(--color-gray-border)", backgroundColor: "var(--color-gray-bg)" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Title</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Featured</span>
          <span></span>
        </div>

        {posts.length === 0 ? (
          <p style={{ padding: "2rem", textAlign: "center", fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>
            No blog posts yet. Add your first one.
          </p>
        ) : (
          posts.map((post, i) => (
            <div key={post.slug} style={{
              display: "grid", gridTemplateColumns: "2.5fr 1.25fr 1fr 0.75fr auto",
              alignItems: "center", padding: "1rem 1.5rem",
              borderBottom: i < posts.length - 1 ? "1px solid var(--color-gray-border)" : "none",
            }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-black)" }}>{post.title}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>{post.category}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--color-gray-light)" }}>
                {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <span style={{ fontSize: "0.8rem", color: post.featured ? "var(--color-brand-teal)" : "var(--color-gray-light)", fontWeight: post.featured ? 600 : 400 }}>
                {post.featured ? "Yes" : "No"}
              </span>
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                <Link href={"/admin/blog/" + post.slug + "/edit"} aria-label="Edit" style={{
                  width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--color-gray-border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Pencil size={14} strokeWidth={1.75} color="var(--color-gray-mid)" />
                </Link>
                <button onClick={() => handleDelete(post.slug)} aria-label="Delete" style={{
                  width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--color-gray-border)",
                  backgroundColor: "transparent", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Trash2 size={14} strokeWidth={1.75} color="#c0392b" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}