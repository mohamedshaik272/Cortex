import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 py-4 border-t border-orange-200/20 bg-paper sm:px-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your home..."
          disabled={disabled}
          className="flex-1 rounded-lg border border-orange-200/40 bg-elevated/80 px-4 py-3 text-sm text-ink placeholder:text-muted ring-1 ring-orange-200/20 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        />
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 px-6 py-3"
        >
          Send
        </button>
      </div>
    </form>
  );
}
