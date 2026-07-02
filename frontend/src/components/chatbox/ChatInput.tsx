"use client";

import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", padding: "0.75rem", borderTop: "1px solid var(--color-gray-border)" }}>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        rows={1}
        disabled={disabled}
        style={{
          flex: 1,
          resize: "none",
          border: "1px solid var(--color-gray-border)",
          borderRadius: "var(--radius-md)",
          padding: "0.625rem 0.875rem",
          fontSize: "0.875rem",
          fontFamily: "var(--font-body)",
          outline: "none",
          maxHeight: "100px",
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        style={{
          width: "40px",
          height: "40px",
          flexShrink: 0,
          borderRadius: "50%",
          border: "none",
          backgroundColor: value.trim() && !disabled ? "var(--color-brand-teal)" : "var(--color-gray-border)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: value.trim() && !disabled ? "pointer" : "not-allowed",
          transition: "background-color 150ms ease",
        }}
      >
        <Send size={16} strokeWidth={2} />
      </button>
    </div>
  );
}