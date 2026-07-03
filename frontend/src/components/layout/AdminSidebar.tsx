"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Briefcase, FileText, Users, Building2, Mail, UserSquare2, MessageSquare, Star, Layers, LogOut } from "lucide-react";
import { logout } from "@/lib/auth";


const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", Icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", Icon: Briefcase },
  { label: "Blog Posts", href: "/admin/blog", Icon: FileText },
  { label: "Team", href: "/admin/team", Icon: Users },
  { label: "Job Openings", href: "/admin/careers", Icon: Building2 },
  { label: "Job Applications", href: "/admin/applications", Icon: UserSquare2 },
  { label: "Inquiries", href: "/admin/inquiries", Icon: Mail },
  { label: "Trusted Brands", href: "/admin/brands", Icon: Star },
  { label: "Tech Stack", href: "/admin/tech-stack", Icon: Layers },
  { label: "Chat Logs", href: "/admin/chat-logs", Icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <aside style={{
      width: "240px",
      flexShrink: 0,
      height: "100vh",
      position: "sticky",
      top: 0,
      backgroundColor: "var(--color-black)",
      display: "flex",
      flexDirection: "column",
      padding: "1.5rem 1rem",
    }}>
      <Link href="/admin/dashboard" style={{
        display: "block",
        fontFamily: "var(--font-display)",
        fontSize: "1.25rem",
        fontWeight: 700,
        color: "#ffffff",
        padding: "0.5rem 0.75rem",
        marginBottom: "1.5rem",
      }}>
        Waft<span style={{ color: "var(--color-brand-teal)" }}>.</span>{" "}
        <span style={{ fontSize: "0.7rem", fontWeight: 500, color: "rgba(255,255,255,0.4)" }}>Admin</span>
      </Link>

      <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
        {navItems.map(({ label, href, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.7rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: active ? "#ffffff" : "rgba(255,255,255,0.55)",
                backgroundColor: active ? "rgba(255,255,255,0.08)" : "transparent",
                transition: "background-color 150ms ease, color 150ms ease",
              }}
            >
              <Icon size={17} strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.7rem 0.75rem",
          borderRadius: "var(--radius-sm)",
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "rgba(255,255,255,0.55)",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background-color 150ms ease, color 150ms ease",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ffffff"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)"; }}
      >
        <LogOut size={17} strokeWidth={1.75} />
        Log out
      </button>
    </aside>
  );
}