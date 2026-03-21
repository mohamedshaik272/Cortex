/*
 * Scrollable message list. Renders MessageBubble for each message.
 * Auto-scrolls to bottom on new messages.
 */

import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.length === 0 && (
        <p className="text-gray-600 text-center mt-20">
          Ask Cortex anything about your home.
        </p>
      )}
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} />
      ))}
    </div>
  );
}
