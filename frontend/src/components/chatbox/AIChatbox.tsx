"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import ChatMessage from "@/components/chatbox/ChatMessage";
import ChatInput from "@/components/chatbox/ChatInput";
import ChatTypingIndicator from "@/components/chatbox/ChatTypingIndicator";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const pageGreetings: Record<string, string> = {
  "/": "Hi! I am the Waft Tech assistant. Ask me about our services, our work, or how to start a project.",
  "/works": "Looking through our case studies? I can tell you more about any project or the industries we have worked in.",
  "/company": "Curious about who we are? Ask me about our team, our values, or our story.",
  "/what-we-do": "I can walk you through our Discover, Design, and Build process. What would you like to know?",
  "/insights": "Looking for something specific in our articles? Let me know the topic and I will point you in the right direction.",
  "/careers": "Thinking about joining us? I can answer questions about open roles, benefits, or our culture.",
  "/contact": "I can help you fill out the inquiry form or answer quick questions before you reach out.",
};

function getGreeting(pathname: string): string {
  if (pageGreetings[pathname]) return pageGreetings[pathname];
  const base = "/" + pathname.split("/")[1];
  return pageGreetings[base] || "Hi! How can I help you today?";
}

export default function AIChatbox() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (isOpen && !initializedRef.current) {
      setMessages([{ role: "assistant", content: getGreeting(pathname) }]);
      initializedRef.current = true;
    }
  }, [isOpen, pathname]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    const userMessage: Message = { role: "user", content };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated, page: pathname }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
        style={{
          position: "fixed",
          bottom: "1.75rem",
          right: "1.75rem",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "var(--color-black)",
          color: "#ffffff",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          zIndex: 1100,
          transition: "background-color 150ms ease",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-brand-teal)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-black)"; }}
      >
        {isOpen ? <X size={22} strokeWidth={2} /> : <MessageCircle size={22} strokeWidth={2} />}
      </button>

      <div
        style={{
          position: "fixed",
          bottom: "5.5rem",
          right: "1.75rem",
          width: "min(380px, calc(100vw - 2.5rem))",
          height: "min(560px, calc(100vh - 8rem))",
          backgroundColor: "#ffffff",
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          border: "1px solid var(--color-gray-border)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 1099,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(12px) scale(0.98)",
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 200ms ease, transform 200ms ease",
        }}
      >
        <div style={{
          padding: "1rem 1.25rem",
          borderBottom: "1px solid var(--color-gray-border)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          backgroundColor: "var(--color-black)",
        }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "var(--color-brand-teal)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: "#ffffff",
            fontSize: "0.9rem",
            flexShrink: 0,
          }}>
            W
          </div>
          <div>
            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#ffffff" }}>Waft Assistant</p>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>Usually replies instantly</p>
          </div>
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          {messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}
          {isTyping && <ChatTypingIndicator />}
        </div>

        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </>
  );
}