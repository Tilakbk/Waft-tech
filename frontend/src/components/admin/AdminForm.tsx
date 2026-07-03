"use client";

interface Field {
  key: string;
  label: string;
  type?: "text" | "textarea";
  placeholder?: string;
  required?: boolean;
}

interface AdminFormProps {
  fields: Field[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

export default function AdminForm({ fields, values, onChange }: AdminFormProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {fields.map((field) => (
        <div key={field.key}>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.5rem" }}>
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              value={values[field.key] || ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              rows={4}
              style={{
                width: "100%", padding: "0.75rem 1rem", fontSize: "0.9rem",
                border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-body)", outline: "none", resize: "vertical",
              }}
            />
          ) : (
            <input
              type="text"
              value={values[field.key] || ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              style={{
                width: "100%", padding: "0.75rem 1rem", fontSize: "0.9rem",
                border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-body)", outline: "none",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}