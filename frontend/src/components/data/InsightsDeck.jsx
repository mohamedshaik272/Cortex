import { useMemo, useState } from 'react'

function KpiCard({ label, value, hint }) {
  return (
    <div className="rounded-xl border border-orange-200/30 bg-elevated/95 p-4 ring-1 ring-orange-100/40">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="font-display mt-1 text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-0.5 text-[11px] text-muted">{hint}</p>
    </div>
  )
}

export default function InsightsDeck({ insights }) {
  const [openMethod, setOpenMethod] = useState(true)
  const maxCat = useMemo(
    () => Math.max(1, ...insights.categoryRisks.map((c) => c.score)),
    [insights.categoryRisks],
  )
  const maxPipe = useMemo(
    () => Math.max(1, ...insights.pipeline.map((p) => p.estUsd24mo)),
    [insights.pipeline],
  )

  if (insights.homeCount === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-orange-200/30 bg-surface/40 p-6 text-center text-sm text-muted">
        No homes match the current filters. Widen search or clear filters to see subdivision
        analytics.
      </section>
    )
  }

  return (
    <section className="space-y-6" aria-labelledby="insights-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="insights-heading" className="font-display text-lg font-semibold text-ink">
            Market intelligence
          </h2>
          <p className="mt-0.5 text-sm text-muted">
            Cohort-level signals from{' '}
            <span className="font-medium text-ink">{insights.homeCount}</span> homes.
            Updates when filters change.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Total annual service opportunity"
          value={`$${insights.totalAnnualServiceUsd.toLocaleString()}`}
          hint="Sum of predicted annual product + maintenance + service value"
        />
        <KpiCard
          label="Mean per home"
          value={`$${insights.meanAnnualServiceUsd.toLocaleString()}`}
          hint="Average opportunity within filtered cohort"
        />
        <KpiCard
          label="Portfolio risk index"
          value={`${insights.portfolioRiskIndex}`}
          hint="0\u2013100 weighted blend of maintenance, hardware, appliances, utilities"
        />
        <KpiCard
          label="Homes in cohort"
          value={String(insights.homeCount)}
          hint="Filtered set. Map markers and tiles use the same set"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40">
          <h3 className="font-display text-lg font-semibold text-ink">
            Category risk profile
          </h3>
          <p className="mt-1 text-xs text-muted">
            Per-category scores aggregate per-home urgency (0\u2013100), then average across the cohort.
          </p>
          <ul className="mt-4 space-y-4">
            {insights.categoryRisks.map((c) => (
              <li key={c.category}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{c.label}</span>
                  <span className="text-terracotta">{c.score}</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface/60">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-terracotta transition-[width] duration-500"
                    style={{ width: `${(c.score / maxCat) * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-muted">
                  {c.homesAtRisk} homes at or above urgent threshold \u00b7 24-mo pipeline ~$
                  {c.pipelineUsd24mo.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40">
          <h3 className="font-display text-lg font-semibold text-ink">
            Replacement & repair pipeline
          </h3>
          <p className="mt-1 text-xs text-muted">
            Rule-based counts from equipment age, health, and refrigerant class. Dollar estimates are
            modeled per category.
          </p>
          <ul className="mt-4 space-y-3">
            {insights.pipeline.map((p) => (
              <li
                key={p.label}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-200/20 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-ink">{p.label}</p>
                  <p className="text-xs text-muted">{p.count} homes affected</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-terracotta">
                    ~${p.estUsd24mo.toLocaleString()}
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">24 mo est.</p>
                </div>
                <div className="w-full">
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface/60">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-terracotta"
                      style={{ width: `${(p.estUsd24mo / maxPipe) * 100}%` }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-orange-200/30 bg-surface/50 p-5 ring-1 ring-orange-100/40">
        <button
          type="button"
          onClick={() => setOpenMethod((o) => !o)}
          className="btn-ghost flex w-full items-center justify-between text-left font-display font-semibold"
        >
          Methodology & algorithms
          <span className="text-muted">{openMethod ? '\u2212' : '+'}</span>
        </button>
        {openMethod ? (
          <div className="mt-4 space-y-3 text-sm text-muted">
            <p>
              <strong className="text-ink">Maintenance risk:</strong> weighted blend of roof age
              and condition, plumbing age and known issues, repair frequency in the maintenance
              record, and climate exposure index.
            </p>
            <p>
              <strong className="text-ink">Hardware:</strong> electrical panel age and
              capacity headroom vs. roof structural cycle signals for major capital events.
            </p>
            <p>
              <strong className="text-ink">Appliances:</strong> mean appliance age and count of
              units below a health threshold (proxy for failure probability).
            </p>
            <p>
              <strong className="text-ink">Utilities:</strong> water heater age and health,
              HVAC age and refrigerant class (legacy R-22 drives higher replacement pressure), and
              panel load context.
            </p>
            <p>
              <strong className="text-ink">Portfolio risk index:</strong> weighted average of
              the four category scores (0.28 / 0.22 / 0.22 / 0.28) across the filtered cohort.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
