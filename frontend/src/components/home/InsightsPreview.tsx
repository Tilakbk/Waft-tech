"use client";

import Link from "next/link";

const posts = [
  {
    slug: "top-8-magento-2-extensions",
    title: "Top 8 Best Magento 2 Extensions To Boost Your Store",
    excerpt: "Are you tired of watching potential sales slip away through abandoned carts? Or found...",
    image: "/images/home/insight-1.jpg",
  },
  {
    slug: "magento-open-source-vs-adobe-commerce",
    title: "Magento Open Source vs Adobe Commerce Key Differences",
    excerpt: "Magento Commerce is a descendant of Adobe Commerce. It is not a replacement because it...",
    image: "/images/home/insight-2.jpg",
  },
  {
    slug: "8-best-magento-2-extensions-marketing",
    title: "8 Best Magento 2 Extensions for Marketing in 2025",
    excerpt: "Supercharge your marketing effort using these cutting-edge Magento 2 extensions this year.",
    image: "/images/home/insight-3.jpg",
  },
];

export default function InsightsPreview() {
  return (
    <section style={{ backgroundColor: "var(--color-white)", paddingTop: "7rem", paddingBottom: "7rem" }}>
      <div className="container-custom">

        <div style={{ marginBottom: "3.5rem" }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "var(--color-black)",
            marginBottom: "1.25rem",
          }}>
            Our Insights
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: "420px" }}>
            This is where we share our experience and knowledge with you.
          </p>
          <Link
            href="/insights"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 500, color: "var(--color-black)" }}
          >
            See all
            <span>{"\u2192"}</span>
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={"/insights/" + post.slug}
              style={{ display: "block" }}
            >
              <div style={{
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                backgroundColor: "var(--color-gray-bg)",
                marginBottom: "1.25rem",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
                />
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "var(--color-black)",
                lineHeight: 1.3,
                marginBottom: "0.75rem",
              }}>
                {post.title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--color-gray-mid)", lineHeight: 1.7 }}>
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
