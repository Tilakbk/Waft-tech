"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { loadCollection, saveCollection } from "@/lib/adminStore";

interface ChatLog {
  id: string;
  page: string;
  messages: { role: string; content: string }[];
  startedAt: string;
}

const STORE_KEY = "admin_chat_logs";

const mockLogs: ChatLog[] = [
  { id: "1", page: "/contact", messages: [{ role: "user", content: "How much does a project cost?" }, { role: "assistant", content: "Project costs depend on scope..." }], startedAt: "2026-07-03T10:22:00Z" },
  { id: "2", page: "/careers", messages: [{ role: "user", content: "Are there any internship openings?" }, { role: "assistant", content: "We are always looking for talented people..." }], startedAt: "2026-07-02T14:05:00Z" },
  { id: "3", page: "/works", messages: [{ role: "user", content: "Do you work with startups?" }, { role: "assistant", content: "Yes, we love partnering with early-stage companies..." }], startedAt: "2026-07-01T09:45:00Z" },
];

export default function ChatLogsPage() {
  const [logs, setLogs] = useState<ChatLog[]>([]);
  const [selected, setSelected] = useState<ChatLog | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLogs(loadCollection<ChatLog>(STORE_KEY, mockLogs));
    setLoaded(true);
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("Delete this chat log?")) return;
    const updated = logs.filter((l) => l.id !== id);
    setLogs(updated);
    saveCollection(STORE_KEY, updated);
    if (selected?.id === id) setSelected(null);
  };

  if (!loaded) return null;

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "0.5rem" }}>Chat Logs</h1>
        <p style={{ fontSize: "0.95rem", color: "var(--color-gray-mid)" }}>Conversations from the AI Chatbox across all pages.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.75fr", gap: "1.5rem", alignItems: "start" }}>
        <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          {logs.length === 0 ? (
            <p style={{ padding: "2rem", textAlign: "center", fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>No chat logs yet.</p>
          ) : logs.map((log, i) => (
            <div
              key={log.id}
              onClick={() => setSelected(log)}
              style={{
                padding: "1rem 1.25rem",
                borderBottom: i < logs.length - 1 ? "1px solid var(--color-gray-border)" : "none",
                cursor: "pointer",
                backgroundColor: selected?.id === log.id ? "var(--color-brand-teal-light)" : "#ffffff",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-black)" }}>{log.page}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--color-gray-light)" }}>
                  {new Date(log.startedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--color-gray-mid)" }}>{log.messages.length} messages</p>
            </div>
          ))}
        </div>

        {selected ? (
          <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <p style={{ fontSize: "0.75rem", color: "var(--color-gray-light)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.25rem" }}>Page</p>
                <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-black)" }}>{selected.page}</p>
              </div>
              <button onClick={() => handleDelete(selected.id)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <Trash2 size={16} strokeWidth={1.75} color="#c0392b" />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {selected.messages.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "80%", padding: "0.65rem 1rem",
                    borderRadius: msg.role === "user" ? "var(--radius-md) var(--radius-md) 4px var(--radius-md)" : "var(--radius-md) var(--radius-md) var(--radius-md) 4px",
                    backgroundColor: msg.role === "user" ? "var(--color-brand-teal)" : "var(--color-gray-bg)",
                    color: msg.role === "user" ? "#ffffff" : "var(--color-black)",
                    fontSize: "0.875rem", lineHeight: 1.6,
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ backgroundColor: "var(--color-gray-bg)", border: "1px solid var(--color-gray-border)", borderRadius: "var(--radius-md)", padding: "3rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--color-gray-mid)" }}>Select a session to view the conversation.</p>
          </div>
        )}
      </div>
    </div>
  );
}