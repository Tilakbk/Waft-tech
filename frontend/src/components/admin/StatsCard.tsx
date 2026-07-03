import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  Icon: LucideIcon;
}

export default function StatsCard({ label, value, Icon }: StatsCardProps) {
  return (
    <div style={{
      backgroundColor: "#ffffff",
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--color-gray-border)",
      padding: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    }}>
      <div style={{
        width: "48px",
        height: "48px",
        borderRadius: "var(--radius-md)",
        backgroundColor: "var(--color-brand-teal-light)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}>
        <Icon size={22} strokeWidth={1.75} color="var(--color-brand-teal)" />
      </div>
      <div>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", lineHeight: 1.1 }}>
          {value}
        </p>
        <p style={{ fontSize: "0.85rem", color: "var(--color-gray-mid)" }}>{label}</p>
      </div>
    </div>
  );
}