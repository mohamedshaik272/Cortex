/*
 * Right panel showing the agent's reasoning steps. Each step shows:
 * tool icon/name, what it searched for, and a brief result summary.
 * Steps appear one by one as the agent works.
 *
 * This is what makes Cortex feel like an intelligence platform, not a chatbot.
 */

export default function ReasoningTrace({ steps }) {
  return (
    <div className="p-4">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Reasoning Trace
      </h2>
      {steps.length === 0 && (
        <p className="text-gray-600 text-sm">
          Agent reasoning steps will appear here as Cortex works.
        </p>
      )}
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="bg-gray-900 rounded-lg p-3 border border-gray-800">
            <div className="text-xs font-mono text-blue-400">{step.tool_name}</div>
            <div className="text-sm text-gray-300 mt-1">{step.output_summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
