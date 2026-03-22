import {
  aiInsights,
  appliances,
  homeAlerts,
  maintenanceQueue,
} from '../data/demo';

function severityStyles(s) {
  switch (s) {
    case 'critical':
      return 'bg-orange-100 text-rust ring-orange-300/60';
    case 'attention':
      return 'bg-accent-soft text-rust ring-orange-200/40';
    case 'watch':
      return 'bg-surface/80 text-muted ring-orange-200/30';
    default:
      return 'bg-surface text-muted';
  }
}

function severityLabel(s) {
  switch (s) {
    case 'critical':
      return 'Critical';
    case 'attention':
      return 'Action soon';
    case 'watch':
      return 'Watch';
    default:
      return s;
  }
}

export default function HomeownerView() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-orange-200/30 bg-gradient-to-br from-orange-50/90 to-elevated p-6 ring-1 ring-orange-200/40 lg:col-span-1">
          <p className="text-xs font-medium text-terracotta">
            Home health
          </p>
          <div className="mt-4 flex items-end gap-2">
            <span className="font-display text-5xl font-semibold text-ink">
              86
            </span>
            <span className="mb-1.5 text-sm text-muted">/ 100</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Based on safety, mechanical systems, envelope, and energy
            compared to similar homes in your area.
          </p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-orange-100/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-terracotta"
              style={{ width: '86%' }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-lg font-semibold text-ink">
              Alerts
            </h2>
            <span className="text-xs text-muted">Updated recently</span>
          </div>
          <ul className="mt-4 space-y-3">
            {homeAlerts.map((a) => (
              <li
                key={a.id}
                className="rounded-xl border border-orange-200/30 bg-paper/80 p-4"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="font-medium text-ink">{a.title}</p>
                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${severityStyles(a.severity)}`}
                    >
                      {severityLabel(a.severity)}
                    </span>
                    {a.eta ? (
                      <span className="rounded-full bg-surface/80 px-2 py-0.5 text-[11px] font-medium text-muted ring-1 ring-orange-200/30">
                        {a.eta}
                      </span>
                    ) : null}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  {a.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40">
          <h2 className="font-display text-lg font-semibold text-ink">
            Maintenance horizon
          </h2>
          <p className="mt-1 text-sm text-muted">
            Upcoming tasks based on season, weather, and equipment age.
          </p>
          <ul className="mt-5 space-y-3">
            {maintenanceQueue.map((m) => (
              <li
                key={m.id}
                className="flex gap-4 rounded-xl border border-orange-200/30 bg-paper/70 px-4 py-3"
              >
                <div className="flex min-w-[4.5rem] flex-col items-center justify-center rounded-lg bg-orange-50 px-2 py-1 text-center ring-1 ring-orange-200/60">
                  <span className="text-xs text-muted">Due</span>
                  <span className="text-sm font-semibold text-terracotta">
                    {m.due}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-ink">{m.label}</p>
                  <p className="mt-0.5 text-sm text-muted">{m.context}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40">
          <h2 className="font-display text-lg font-semibold text-ink">
            Suggested next steps
          </h2>
          <p className="mt-1 text-sm text-muted">
            Recommendations based on your home&apos;s history and condition.
          </p>
          <ul className="mt-5 space-y-4">
            {aiInsights.map((i) => (
              <li
                key={i.id}
                className="rounded-xl border border-orange-200/80 bg-orange-50/60 p-4"
              >
                <p className="font-medium text-rust">{i.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {i.body}
                </p>
                <button
                  type="button"
                  className="btn-ghost mt-3"
                >
                  {i.action} &rarr;
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Major systems
            </h2>
            <p className="mt-1 text-sm text-muted">
              Age, health, and notes for each major system.
            </p>
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-orange-200/30 text-xs text-muted">
                <th className="pb-3 pr-4 font-medium">Asset</th>
                <th className="pb-3 pr-4 font-medium">Age</th>
                <th className="pb-3 pr-4 font-medium">Health</th>
                <th className="pb-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-200/20">
              {appliances.map((row) => (
                <tr key={row.name} className="text-muted">
                  <td className="py-3 pr-4 font-medium text-ink">
                    {row.name}
                  </td>
                  <td className="py-3 pr-4 text-muted">{row.age}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-orange-100/60">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-terracotta"
                          style={{ width: `${row.health}%` }}
                        />
                      </div>
                      <span className="text-muted">{row.health}</span>
                    </div>
                  </td>
                  <td className="py-3 text-muted">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
