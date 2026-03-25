import {
  categoryDemand,
  providerBullets,
  regionSignals,
} from '../data/demo'

function trendArrow(t) {
  switch (t) {
    case 'up': return '\u2191'
    case 'down': return '\u2193'
    default: return '\u2192'
  }
}

function trendClass(t) {
  switch (t) {
    case 'up': return 'text-terracotta'
    case 'down': return 'text-rust'
    default: return 'text-muted'
  }
}

export default function ProviderView() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-orange-200/30 bg-gradient-to-br from-accent-soft/95 via-paper/80 to-canvas p-6 ring-1 ring-orange-200/40 sm:p-8">
        <h2 className="font-display text-xl font-semibold text-ink">
          Market intelligence from real homes
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          See where demand is coming from across regions, climates, and equipment types.
          Plan your inventory and services around how homes are actually aging.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {providerBullets.map((b) => (
            <li
              key={b}
              className="rounded-xl border border-orange-200/30 bg-paper/90 px-4 py-3 text-sm leading-relaxed text-muted"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40 lg:col-span-2">
          <h3 className="font-display text-lg font-semibold text-ink">
            Regional demand index
          </h3>
          <p className="mt-1 text-sm text-muted">
            Scaled 0&ndash;1 against the past 12 months.
          </p>
          <ul className="mt-5 space-y-3">
            {regionSignals.map((r) => (
              <li
                key={r.region}
                className="rounded-xl border border-orange-200/30 bg-paper/80 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-ink">{r.region}</span>
                  <span className={`text-sm font-semibold ${trendClass(r.trend)}`}>
                    {trendArrow(r.trend)} {(r.demand * 100).toFixed(0)}
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface/60">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-terracotta"
                    style={{ width: `${r.demand * 100}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted">
                  Top category:{' '}
                  <span className="text-ink">{r.topCategory}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40 lg:col-span-3">
          <h3 className="font-display text-lg font-semibold text-ink">
            Category share & timing
          </h3>
          <p className="mt-1 text-sm text-muted">
            Where home-level demand is heading next.
          </p>
          <div className="mt-6 space-y-4">
            {categoryDemand.map((c) => (
              <div key={c.category}>
                <div className="flex justify-between text-sm">
                  <span className="text-ink">{c.category}</span>
                  <span className="text-muted">{c.horizon}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface/60">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-terracotta"
                      style={{ width: `${c.share}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-sm font-medium tabular-nums text-muted">
                    {c.share}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-accent/25 bg-surface/40 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">
              How it connects
            </h3>
            <p className="mt-1 max-w-xl text-sm text-muted">
              Manufacturers, distributors, and service companies all connect to
              the same data — working from one shared picture of how homes age.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['APIs', 'Regional exports', 'Cohort benchmarks'].map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-elevated px-3 py-1 text-xs font-medium text-muted ring-1 ring-orange-200/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
