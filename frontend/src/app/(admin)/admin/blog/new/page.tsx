"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import blogData from "@/mock/blog.json";
import { loadCollection, saveCollection } from "@/lib/adminStore";
import AdminForm from "@/components/admin/AdminForm";

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

const fields = [
  { key: "title", label: "Post title", placeholder: "Eg: How to Choose a Magento Host", required: true },
  { key: "slug", label: "URL slug", placeholder: "Eg: choose-magento-host (no spaces)", required: true },
  { key: "category", label: "Category", placeholder: "Eg: Web Development", required: true },
  { key: "excerpt", label: "Excerpt", type: "textarea" as const, placeholder: "A short summary shown on the Insights listing page.", required: true },
  { key: "image", label: "Cover image URL", placeholder: "/images/insights/example.jpg" },
];

export default function NewBlogPostPage() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});
  const [featured, setFeatured] = useState(false);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = loadCollection<Post>(STORE_KEY, blogData as Post[]);

    if (existing.some((p) => p.slug === values.slug)) {
      alert("A blog post with this slug already exists. Please choose a different slug.");
      return;
    }

    const newPost: Post = {
      title: values.title || "",
      slug: values.slug || "",
      category: values.category || "",
      excerpt: values.excerpt || "",
      image: values.image || "/images/insights/placeholder.jpg",
      date: new Date().toISOString().slice(0, 10),
      featured,
    };

    const updated = [...existing, newPost];
    saveCollection(STORE_KEY, updated);
    router.push("/admin/blog");
  };

  return (
    <div style={{ maxWidth: "640px" }}>
      <Link href="/admin/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--color-gray-mid)", marginBottom: "1.5rem" }}>
        <ArrowLeft size={15} strokeWidth={2} />
        Back to Blog Posts
      </Link>

      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "2rem" }}>
        Add New Blog Post
      </h1>

      <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "2rem" }}>
        <AdminForm fields={fields} values={values} onChange={handleChange} />

        <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "1.25rem", fontSize: "0.9rem", color: "var(--color-black)", cursor: "pointer" }}>
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} style={{ width: "16px", height: "16px" }} />
          Feature this post at the top of Insights
        </label>

        <button type="submit" style={{
          marginTop: "2rem",
          fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500,
          color: "#ffffff", backgroundColor: "var(--color-brand-teal)",
          padding: "0.8rem 2rem", borderRadius: "var(--radius-full)",
          border: "none", cursor: "pointer",
        }}>
          Publish Post
        </button>
      </form>
    </div>
  );
}