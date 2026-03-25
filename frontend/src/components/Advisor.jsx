import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import ReasoningTrace from "./ReasoningTrace";
import { sendMessage } from "../utils/api";

const SUGGESTIONS = [
  { icon: "verified", text: "Is my water heater still under warranty?" },
  { icon: "schedule", text: "What maintenance is overdue?" },
  { icon: "plumbing", text: "Find me a plumber for the washer drain" },
  { icon: "payments", text: "How much have I spent on repairs this year?" },
];

export default function Advisor() {
  const [messages, setMessages] = useState([]);
  const [reasoningSteps, setReasoningSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTrace, setShowTrace] = useState(false);

  async function handleSend(text) {
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const data = await sendMessage(text, history);
      const assistantMsg = { role: "assistant", content: data.response || "No response." };
      setMessages((prev) => [...prev, assistantMsg]);
      if (data.reasoning_trace) {
        setReasoningSteps((prev) => [...prev, ...data.reasoning_trace]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-svh flex-col overflow-hidden bg-canvas font-sans text-ink antialiased">
      <Header />

      <div className="shrink-0 bg-paper/80 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Advisor
          </h1>
          <p className="mt-1 text-sm text-muted">
            Ask anything about your home: maintenance, warranties, service history, and more.
          </p>
        </div>
      </div>

      <main className="flex min-h-0 flex-1 flex-col px-4 sm:px-6">
        <div className="mx-auto flex w-full min-h-0 max-w-6xl flex-1 flex-col py-6">

          {/* Chat layout */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-orange-200/30 bg-elevated ring-1 ring-orange-100/40 lg:flex-row">
            {/* Chat panel */}
            <div className="flex min-h-0 flex-1 flex-col">
              <ChatWindow
                messages={messages}
                loading={loading}
                suggestions={hasMessages ? null : SUGGESTIONS}
                onSuggestion={handleSend}
              />
              <ChatInput onSend={handleSend} disabled={loading} />
            </div>

            {/* Reasoning panel — desktop */}
            <div className="hidden lg:flex lg:w-[340px] lg:flex-col lg:border-l lg:border-orange-200/20">
              <ReasoningTrace steps={reasoningSteps} />
            </div>
          </div>

          {/* Reasoning panel — mobile toggle */}
          {reasoningSteps.length > 0 && (
            <div className="mt-4 shrink-0 lg:hidden">
              <button
                type="button"
                onClick={() => setShowTrace(!showTrace)}
                aria-expanded={showTrace}
                className="flex w-full items-center justify-between rounded-xl border border-orange-200/30 bg-elevated px-4 py-3 text-sm font-medium text-ink ring-1 ring-orange-100/40 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent" style={{ fontSize: '18px' }} aria-hidden="true">timeline</span>
                  Activity · {reasoningSteps.length} steps
                </span>
                <span className="material-symbols-outlined text-muted" style={{ fontSize: '18px' }} aria-hidden="true">
                  {showTrace ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {showTrace && (
                <div className="mt-2 max-h-64 overflow-y-auto rounded-xl border border-orange-200/30 bg-paper ring-1 ring-orange-100/40">
                  <ReasoningTrace steps={reasoningSteps} />
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="shrink-0 border-t border-orange-200/20 bg-paper/30 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="btn-ghost text-sm">&larr; Back to product</Link>
          <p className="text-xs text-muted">&copy; {new Date().getFullYear()} Cortex</p>
        </div>
      </footer>
    </div>
  );
}
