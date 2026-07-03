"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--color-gray-bg)",
      padding: "1.5rem",
    }}>
      <div style={{
        width: "min(400px, 100%)",
        backgroundColor: "#ffffff",
        borderRadius: "var(--radius-lg)",
        padding: "2.5rem",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}>
        <Link href="/" style={{
          display: "inline-block",
          fontFamily: "var(--font-display)",
          fontSize: "1.4rem",
          fontWeight: 700,
          color: "var(--color-black)",
          marginBottom: "2rem",
        }}>
          Waft<span style={{ color: "var(--color-brand-teal)" }}>.</span>
        </Link>

        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "var(--color-black)",
          marginBottom: "0.5rem",
        }}>
          Admin Login
        </h1>
        <p style={{ fontSize: "0.9rem", color: "var(--color-gray-mid)", marginBottom: "2rem" }}>
          Sign in to manage Waft Tech content.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.5rem" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@wafttech.io"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                fontSize: "0.9rem",
                border: "1px solid var(--color-gray-border)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-body)",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.5rem" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                fontSize: "0.9rem",
                border: "1px solid var(--color-gray-border)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-body)",
                outline: "none",
              }}
            />
          </div>

          {error && (
            <p style={{ fontSize: "0.85rem", color: "#c0392b", marginBottom: "1.25rem" }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#ffffff",
              backgroundColor: "var(--color-black)",
              padding: "0.85rem 2rem",
              borderRadius: "var(--radius-full)",
              border: "none",
              cursor: "pointer",
              transition: "background-color 150ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-brand-teal)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-black)"; }}
          >
            Sign in
          </button>
        </form>

        <p style={{ fontSize: "0.75rem", color: "var(--color-gray-light)", marginTop: "1.5rem", textAlign: "center" }}>
          Demo credentials: admin@wafttech.io / admin123
        </p>
      </div>
    </div>
  );
}