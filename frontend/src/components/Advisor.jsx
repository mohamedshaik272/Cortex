import SideNav from "./SideNav";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import ReasoningTrace from "./ReasoningTrace";

export default function Advisor({ onNavigate }) {
  return (
    <div className="flex h-screen bg-background text-on-surface">
      <SideNav activePage="advisor" onNavigate={onNavigate} />

      {/* Chat panel */}
      <div className="flex flex-col border-r border-outline-variant/20" style={{ marginLeft: "80px", width: "calc(70% - 80px)" }}>
        <div className="px-6 py-4 border-b border-outline-variant/20">
          <h1 className="text-xl font-bold text-primary font-headline">AI Advisor</h1>
          <p className="text-sm text-on-surface-variant">Home Intelligence Agent</p>
        </div>
        <ChatWindow messages={[]} />
        <ChatInput onSend={() => {}} disabled={false} />
      </div>

      {/* Reasoning trace panel */}
      <div className="flex-1 bg-surface-container-low">
        <ReasoningTrace steps={[]} />
      </div>
    </div>
  );
}
