import { Briefcase, FileText, Users, Building2, Mail, UserSquare2 } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import projectsData from "@/mock/projects.json";
import blogData from "@/mock/blog.json";
import jobsData from "@/mock/jobs.json";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Projects", value: projectsData.length, Icon: Briefcase },
    { label: "Blog Posts", value: blogData.length, Icon: FileText },
    { label: "Team Members", value: 8, Icon: Users },
    { label: "Open Job Roles", value: jobsData.length, Icon: Building2 },
    { label: "New Inquiries", value: 3, Icon: Mail },
    { label: "New Applications", value: 5, Icon: UserSquare2 },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.5rem" }}>
        Dashboard
      </h1>
      <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)", marginBottom: "2.5rem" }}>
        Welcome back. Here is an overview of your site content.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        {stats.map((s) => (
          <StatsCard key={s.label} label={s.label} value={s.value} Icon={s.Icon} />
        ))}
      </div>
    </div>
  );
}