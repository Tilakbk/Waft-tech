"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { getAllBlogPostsAdmin, deleteBlogPost, togglePublishStatus, BlogPost } from "@/lib/blog";
import { getCurrentUser, AdminUser } from "@/lib/auth";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    const [user, result] = await Promise.all([
      getCurrentUser(),
      getAllBlogPostsAdmin({ page: 0, size: 100 }),
    ]);
    setCurrentUser(user);
    if (result.success) {
      setPosts(result.data.content);
      setError(null);
    } else {
      setError(result.error);
    }
    setLoaded(true);
  };

  useEffect(() => {
    load();
  }, []);

  const isOwnPost = (post: BlogPost) => currentUser?.fullName === post.authorName;
  const isTeamMember = currentUser?.role === "TEAM_MEMBER";
  const canModerate = currentUser?.role === "ADMIN" || currentUser?.role === "HR";

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    const result = await deleteBlogPost(id);
    if (result.success) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert(result.error);
    }
  };

  const handleTogglePublish = async (id: number) => {
    const result = await togglePublishStatus(id);
    if (result.success) {
      setPosts((prev) => prev.map((p) => (p.id === id ? result.data : p)));
    } else {
      alert(result.error);
    }
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
            {isTeamMember
              ? "Manage your own articles shown on the Insights page."
              : "View all articles across every author. You can moderate publish status but cannot edit or delete content."}
          </p>
        </div>
        {isTeamMember && (
          <Link href="/admin/blog/new" style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            fontSize: "0.9rem", fontWeight: 500, color: "#ffffff",
            backgroundColor: "var(--color-brand-teal)", padding: "0.7rem 1.25rem",
            borderRadius: "var(--radius-full)", whiteSpace: "nowrap",
          }}>
            <Plus size={16} strokeWidth={2} />
            Add Post
          </Link>
        )}
      </div>

      {error && <p style={{ fontSize: "0.9rem", color: "#c0392b", marginBottom: "1.25rem" }}>{error}</p>}

      <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.25fr 1fr 1fr auto", padding: "0.9rem 1.5rem", borderBottom: "1px solid var(--color-gray-border)", backgroundColor: "var(--color-gray-bg)" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-light)", textTransform: "uppercase" }}>Title</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-light)", textTransform: "uppercase" }}>Category</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-light)", textTransform: "uppercase" }}>Author</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gray-light)", textTransform: "uppercase" }}>Status</span>
          <span></span>
        </div>

        {posts.length === 0 ? (
          <p style={{ padding: "2rem", textAlign: "center", fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>
            {isTeamMember ? "No posts yet. Add your first one." : "No blog posts have been published yet."}
          </p>
        ) : (
          posts.map((post, i) => (
            <div key={post.id} style={{
              display: "grid", gridTemplateColumns: "2fr 1.25fr 1fr 1fr auto",
              alignItems: "center", padding: "1rem 1.5rem",
              borderBottom: i < posts.length - 1 ? "1px solid var(--color-gray-border)" : "none",
            }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-black)" }}>{post.title}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>{post.category}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>{post.authorName}</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: post.isPublished ? "var(--color-brand-teal)" : "var(--color-gray-light)" }}>
                {post.isPublished ? "Published" : "Draft"}
              </span>
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                {(isOwnPost(post) || canModerate) && (
                  <button onClick={() => handleTogglePublish(post.id)} aria-label="Toggle publish" style={{
                    width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--color-gray-border)",
                    backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {post.isPublished ? <Eye size={14} strokeWidth={1.75} color="var(--color-gray-mid)" /> : <EyeOff size={14} strokeWidth={1.75} color="var(--color-gray-mid)" />}
                  </button>
                )}
                {isTeamMember && isOwnPost(post) && (
                  <>
                    <Link href={"/admin/blog/" + post.id + "/edit"} aria-label="Edit" style={{
                      width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--color-gray-border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Pencil size={14} strokeWidth={1.75} color="var(--color-gray-mid)" />
                    </Link>
                    <button onClick={() => handleDelete(post.id)} aria-label="Delete" style={{
                      width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--color-gray-border)",
                      backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Trash2 size={14} strokeWidth={1.75} color="#c0392b" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}