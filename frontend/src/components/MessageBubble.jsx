import ReactMarkdown from "react-markdown";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} py-1.5`}>
      <div className="flex max-w-[75%] flex-col gap-1">
        <span className={`text-[11px] font-medium ${isUser ? "text-right text-muted" : "text-muted"}`}>
          {isUser ? "You" : "Cortex"}
        </span>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "rounded-br-lg bg-accent text-white"
              : "rounded-bl-lg bg-elevated text-ink"
          }`}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose-cortex text-sm leading-relaxed">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
