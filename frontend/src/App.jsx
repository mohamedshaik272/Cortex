/*
 * Main layout. Two-panel design:
 * - Chat conversation on the left (70% width)
 * - Reasoning trace on the right (30% width)
 *
 * Dark theme. The reasoning trace shows each tool the agent called
 * and a summary of what it found, updating in real-time as the agent works.
 */

import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import ReasoningTrace from "./components/ReasoningTrace";

export default function App() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-[70%] border-r border-gray-800">
        <div className="px-6 py-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">Cortex</h1>
          <p className="text-sm text-gray-500">Home Intelligence Agent</p>
        </div>
        <ChatWindow messages={[]} />
        <ChatInput onSend={() => {}} disabled={false} />
      </div>
      <div className="w-[30%] bg-gray-950">
        <ReasoningTrace steps={[]} />
      </div>
    </div>
  );
}
