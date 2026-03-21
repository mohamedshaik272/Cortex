/*
 * Single chat message. User messages right-aligned, Cortex messages left-aligned.
 * Cortex messages render markdown. If message includes a drafted_message field,
 * render it as a styled card with copy button.
 */

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-800 text-gray-100"
        }`}
      >
        <p>{message.content}</p>
      </div>
    </div>
  );
}
