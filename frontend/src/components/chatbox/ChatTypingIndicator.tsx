export default function ChatTypingIndicator() {
  return (
    <div style={{ display: "flex", gap: "4px", padding: "0.75rem 1rem" }}>
      <span className="chat-dot" style={{ animationDelay: "0ms" }} />
      <span className="chat-dot" style={{ animationDelay: "150ms" }} />
      <span className="chat-dot" style={{ animationDelay: "300ms" }} />
      <style>{"
        .chat-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--color-gray-light);
          display: inline-block;
          animation: chatBounce 1.2s infinite ease-in-out;
        }
        @keyframes chatBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      "}</style>
    </div>
  );
}