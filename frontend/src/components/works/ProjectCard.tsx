import Link from "next/link";

interface ProjectCardProps {
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  year: string;
}

export default function ProjectCard({ slug, title, category, thumbnail, year }: ProjectCardProps) {
  return (
    <Link href={"/works/" + slug} className="project-card" style={{ display: "block" }}>
      <div className="project-card-img-wrap" style={{
        width: "100%",
        aspectRatio: "4 / 3",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        backgroundColor: "var(--color-gray-bg)",
        marginBottom: "1.25rem",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={title}
          className="project-card-img"
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 500ms ease", display: "block" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 600, color: "var(--color-black)" }}>
          {title}
        </h3>
        <span style={{ fontSize: "0.85rem", color: "var(--color-gray-light)" }}>{year}</span>
      </div>
      <p style={{ fontSize: "0.9rem", color: "var(--color-gray-mid)", marginTop: "0.25rem" }}>
        {category}
      </p>
    </Link>
  );
}
