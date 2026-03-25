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
  const [openMethod, setOpenMethod] = useState(false)
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
        No homes match the current filters. Adjust filters to see analytics.
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Annual service opportunity"
          value={`$${insights.totalAnnualServiceUsd.toLocaleString()}`}
          hint="Total across filtered cohort"
        />
        <KpiCard
          label="Mean per home"
          value={`$${insights.meanAnnualServiceUsd.toLocaleString()}`}
          hint="Average per home"
        />
        <KpiCard
          label="Portfolio risk index"
          value={`${insights.portfolioRiskIndex}`}
          hint="0–100 blended score"
        />
        <KpiCard
          label="Homes in cohort"
          value={String(insights.homeCount)}
          hint="Matches current filters"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40">
          <h3 className="font-display text-lg font-semibold text-ink">
            Category risk profile
          </h3>
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
                  {c.homesAtRisk} urgent &middot; ~${c.pipelineUsd24mo.toLocaleString()} pipeline (24 mo)
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40">
          <h3 className="font-display text-lg font-semibold text-ink">
            Replacement & repair pipeline
          </h3>
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
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><strong className="text-ink">Maintenance:</strong> Roof age/condition, plumbing issues, repair frequency, climate exposure.</li>
            <li><strong className="text-ink">Hardware:</strong> Electrical panel age, capacity headroom, structural cycle signals.</li>
            <li><strong className="text-ink">Appliances:</strong> Mean age and count of units below health threshold.</li>
            <li><strong className="text-ink">Utilities:</strong> Water heater and HVAC age/health, refrigerant class, panel load.</li>
            <li><strong className="text-ink">Portfolio risk:</strong> Weighted average of four category scores (0.28 / 0.22 / 0.22 / 0.28).</li>
          </ul>
        ) : null}
      </div>
    </section>
  )
}
