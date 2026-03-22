import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import ReasoningTrace from "./ReasoningTrace";
import { sendMessage } from "../utils/api";

export default function Advisor() {
  const [messages, setMessages] = useState([]);
  const [reasoningSteps, setReasoningSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSend(text) {
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setReasoningSteps([]);
    setLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const data = await sendMessage(text, history);
      const assistantMsg = { role: "assistant", content: data.response || "No response." };
      setMessages((prev) => [...prev, assistantMsg]);
      if (data.reasoning_trace) {
        setReasoningSteps(data.reasoning_trace);
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

  return (
    <div className="min-h-svh bg-canvas font-sans text-ink antialiased">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Advisor
          </h1>
          <p className="mt-2 text-sm text-muted">
            Ask anything about your home — maintenance, warranties, service history, and more.
          </p>
        </div>

        {/* Chat + Reasoning Card */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-orange-200/30 ring-1 ring-orange-100/40 lg:flex-row" style={{ minHeight: '500px' }}>
          {/* Chat panel */}
          <div className="flex flex-1 flex-col">
            <ChatWindow messages={messages} />
            <ChatInput onSend={handleSend} disabled={loading} />
          </div>

          {/* Reasoning trace panel */}
          <div className="hidden border-t border-orange-200/20 bg-paper overflow-y-auto lg:block lg:w-[340px] lg:border-l lg:border-t-0">
            <ReasoningTrace steps={reasoningSteps} />
          </div>
        </div>
      </main>

      <footer className="border-t border-orange-200/20 bg-paper/30 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/" className="btn-ghost text-sm">&larr; Back to home</Link>
          <p className="text-xs text-muted">&copy; 2026 Cortex</p>
        </div>
      </footer>
    </div>
  );
}
