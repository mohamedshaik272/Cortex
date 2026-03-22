export default function ReasoningTrace({ steps }) {
  return (
    <div className="p-4 sm:p-6">
      <h2 className="font-display text-base font-semibold text-ink mb-4">
        Activity
      </h2>
      {steps.length === 0 && (
        <p className="text-muted text-sm">
          Steps will appear here as Cortex works through your question.
        </p>
      )}
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="rounded-xl border border-orange-200/30 bg-paper/80 p-3">
            <div className="text-xs font-semibold text-accent">{step.tool_name}</div>
            <div className="text-sm text-muted mt-1">{step.output_summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
