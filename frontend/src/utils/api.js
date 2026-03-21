/*
 * Backend API client for Cortex.
 *
 * sendMessage() POSTs to /api/chat and returns:
 * {
 *   response: string,          // The agent's text response
 *   reasoning_trace: array,    // Tool calls made during reasoning
 *   drafted_message?: string   // Optional drafted message to a provider
 * }
 */

export async function sendMessage(message, history) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });
  return res.json();
}
