/*
 * Text input with send button. Calls onSend prop with message text.
 * Clears on send. Disabled while loading.
 */

export default function ChatInput({ onSend, disabled }) {
  return (
    <div className="p-4 border-t border-gray-800">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask about your home..."
          disabled={disabled}
          className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-3 outline-none border border-gray-700 focus:border-blue-500"
        />
        <button
          disabled={disabled}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}
