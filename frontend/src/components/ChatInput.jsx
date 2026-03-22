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

  const canSend = text.trim().length > 0 && !disabled;

  return (
    <form onSubmit={handleSubmit} className="border-t border-orange-200/20 bg-paper px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your home..."
          disabled={disabled}
          className="h-11 flex-1 rounded-xl border border-orange-200/30 bg-elevated px-4 text-sm text-ink placeholder:text-muted/60 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send message"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white shadow-sm transition-all hover:bg-terracotta active:scale-95 disabled:opacity-30 disabled:hover:bg-accent disabled:active:scale-100 disabled:cursor-not-allowed cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_upward</span>
        </button>
      </div>
    </form>
  );
}
