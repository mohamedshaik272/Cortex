const TOOL_META = {
  get_device_info: { label: "Looked up device", icon: "devices" },
  check_warranty: { label: "Checked warranty", icon: "verified" },
  find_provider: { label: "Found providers", icon: "person_search" },
  get_spending: { label: "Pulled spending data", icon: "payments" },
  check_local_alerts: { label: "Checked alerts", icon: "warning" },
  draft_message: { label: "Drafted message", icon: "edit_note" },
  search_web: { label: "Searched the web", icon: "travel_explore" },
};

function StepCard({ step, index, total }) {
  const meta = TOOL_META[step.tool_name] || { label: step.tool_name, icon: "check_circle" };

  return (
    <div className="flex gap-3">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/10">
          <span className="material-symbols-outlined text-accent" style={{ fontSize: '16px' }}>
            {meta.icon}
          </span>
        </div>
        {index < total - 1 && (
          <div className="mt-1 w-px flex-1 bg-orange-200/30" />
        )}
      </div>

      {/* Content */}
      <div className="pb-4">
        <p className="text-xs font-semibold text-ink">{meta.label}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">{step.output_summary}</p>
      </div>
    </div>
  );
}

export default function ReasoningTrace({ steps }) {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-accent" style={{ fontSize: '18px' }}>timeline</span>
        <h2 className="font-display text-sm font-semibold text-ink">Activity</h2>
      </div>

      {steps.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface/60">
            <span className="material-symbols-outlined text-muted/50" style={{ fontSize: '20px' }}>
              neurology
            </span>
          </div>
          <p className="mt-3 max-w-[200px] text-xs text-muted/70">
            Steps will appear here as Cortex works through your question.
          </p>
        </div>
      ) : (
        <div>
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} total={steps.length} />
          ))}
        </div>
      )}
    </div>
  );
}
