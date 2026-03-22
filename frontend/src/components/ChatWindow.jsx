import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, loading, suggestions, onSuggestion }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-canvas/50">
      {/* Empty state */}
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
            <span className="material-symbols-outlined text-accent" style={{ fontSize: '22px' }}>
              home_app_logo
            </span>
          </div>
          <h2 className="mt-5 font-display text-lg font-semibold text-ink">
            How can I help?
          </h2>
          <p className="mt-2 max-w-sm text-center text-sm text-muted">
            Ask about your home systems, warranties, service providers, or spending history.
          </p>

          {suggestions && (
            <div className="mt-8 grid w-full max-w-md gap-2 sm:grid-cols-2">
              {suggestions.map((s) => (
                <button
                  key={s.text}
                  type="button"
                  onClick={() => onSuggestion(s.text)}
                  aria-label={s.text}
                  className="flex items-start gap-3 rounded-xl border border-orange-200/30 bg-elevated px-4 py-3.5 text-left text-sm text-muted ring-1 ring-orange-100/40 transition-colors hover:border-orange-200/50 hover:text-ink cursor-pointer"
                >
                  <span
                    className="material-symbols-outlined mt-0.5 shrink-0 text-accent/60"
                    style={{ fontSize: '18px' }}
                  >
                    {s.icon}
                  </span>
                  <span className="leading-snug">{s.text}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 space-y-1 px-4 py-6 sm:px-6">
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl bg-elevated px-4 py-3">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent/50" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent/50" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent/50" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
