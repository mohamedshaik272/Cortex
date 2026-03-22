import { useMemo } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import {
  LOG_HOME_ID,
  SERVICE_HISTORY,
  VAULT_FILES,
  buildAlerts,
  buildMaintenanceHorizon,
  buildSuggestedNextSteps,
  computeHomeHealth,
} from '../data/homeownerLogDemo'
import { getWillowbrookHome } from '../data/willowbrookDemo'

export default function HomeownerLogPage() {
  const [searchParams] = useSearchParams()
  const homeId = searchParams.get('home') ?? LOG_HOME_ID
  const home = useMemo(() => getWillowbrookHome(homeId), [homeId])

  const healthScore = useMemo(() => (home ? computeHomeHealth(home) : 0), [home])
  const alerts = useMemo(() => (home ? buildAlerts(home) : []), [home])
  const horizon = useMemo(() => buildMaintenanceHorizon(), [])
  const nextSteps = useMemo(() => buildSuggestedNextSteps(), [])

  if (!home) {
    return <Navigate to="/my-home" replace />
  }

  return (
    <div className="flex min-h-svh flex-col bg-canvas font-sans text-ink antialiased">
      <Header />

      {/* Page header */}
      <div className="bg-gradient-to-b from-accent-soft/80 to-paper px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-terracotta">
            {home.address}
          </p>
          <h1 className="font-display mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Your home, interpreted
          </h1>
          <p className="mt-2 text-sm text-muted">
            Alerts, maintenance, and systems in one flow.
          </p>
          <p className="mt-1 text-xs text-muted">
            {home.sqft.toLocaleString()} sqft &middot; {home.beds} bd &middot; {home.baths} ba &middot;
            built {home.yearBuilt}
          </p>
        </div>
      </div>

      <main className="flex-1 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-10">

          {/* Home health score */}
          <section className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">Home health</h2>
                <p className="mt-2 max-w-lg text-sm text-muted">
                  Based on safety, mechanical systems, envelope, and energy compared to similar homes
                  in your area.
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-4xl font-semibold text-ink">
                  {healthScore}
                </p>
                <p className="text-sm text-muted">/ 100</p>
              </div>
            </div>
          </section>

          {/* Alerts */}
          <section>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-lg font-semibold text-ink">Alerts</h2>
              <span className="rounded-full bg-surface/80 px-2.5 py-0.5 text-[11px] font-medium text-muted ring-1 ring-orange-200/30">
                Updated recently
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.title}
                  className={`rounded-xl border p-4 ${
                    alert.severity === 'action'
                      ? 'border-accent/30 bg-accent-soft/40'
                      : 'border-orange-200/30 bg-elevated'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-ink">{alert.title}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        alert.severity === 'action'
                          ? 'bg-accent-soft text-terracotta'
                          : 'bg-surface/80 text-muted'
                      }`}
                    >
                      {alert.severity === 'action' ? 'Action soon' : 'Watch'}
                    </span>
                    {alert.timeframe && (
                      <span className="rounded-full bg-surface/80 px-2 py-0.5 text-[11px] font-medium text-muted ring-1 ring-orange-200/30">
                        {alert.timeframe}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted">{alert.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Maintenance horizon */}
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Maintenance horizon</h2>
            <p className="mt-1 text-sm text-muted">
              Upcoming tasks based on season, weather, and equipment age.
            </p>
            <div className="mt-4 space-y-3">
              {horizon.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-xl border border-orange-200/30 bg-elevated p-4 ring-1 ring-orange-100/40"
                >
                  <div className="w-16 shrink-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-terracotta">Due</p>
                    <p className="font-display text-sm font-semibold text-ink">{item.date}</p>
                  </div>
                  <div>
                    <p className="font-medium text-ink">{item.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Suggested next steps */}
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Suggested next steps</h2>
            <p className="mt-1 text-sm text-muted">
              Recommendations based on your home&apos;s history and condition.
            </p>
            <div className="mt-4 space-y-3">
              {nextSteps.map((step) => (
                <div
                  key={step.title}
                  className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-orange-200/30 bg-elevated p-4 ring-1 ring-orange-100/40"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-ink">{step.title}</p>
                    <p className="mt-1 text-sm text-muted">{step.description}</p>
                  </div>
                  <button
                    type="button"
                    className="btn-secondary shrink-0 text-sm"
                  >
                    {step.cta} &rarr;
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Major systems */}
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Major systems</h2>
            <p className="mt-1 text-sm text-muted">
              Age, health, and notes for each major system.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-orange-200/30 bg-elevated ring-1 ring-orange-100/40">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="border-b border-orange-200/30 bg-surface/80">
                    <tr>
                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                        Asset
                      </th>
                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                        Age
                      </th>
                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                        Health
                      </th>
                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {home.appliances.map((s) => (
                      <tr
                        key={s.name}
                        className="border-b border-orange-200/15 last:border-0"
                      >
                        <td className="px-4 py-3 font-medium text-ink">{s.name}</td>
                        <td className="px-4 py-3 text-muted">{s.ageYears} yrs</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 overflow-hidden rounded-full bg-surface/60">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-accent to-terracotta"
                                style={{ width: `${s.healthPct}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium tabular-nums text-muted">
                              {s.healthPct}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted">{s.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Service history & digital vault */}
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40 lg:col-span-2">
              <h2 className="font-display mb-5 text-lg font-semibold text-ink">
                Service history
              </h2>
              <div className="space-y-3">
                {SERVICE_HISTORY.map(({ icon, title, cost, desc, meta }) => (
                  <div
                    key={title}
                    className="flex gap-4 rounded-xl p-3 transition-colors hover:bg-accent-soft/40"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft/60">
                      <span
                        className="material-symbols-outlined text-muted"
                        style={{ fontSize: '20px' }}
                      >
                        {icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-ink">{title}</h4>
                        <span className="text-sm font-semibold text-accent">{cost}</span>
                      </div>
                      <p className="mt-0.5 text-sm text-muted">{desc}</p>
                      <p className="mt-1 text-xs text-muted">{meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40">
              <h2 className="font-display mb-4 text-lg font-semibold text-ink">Digital vault</h2>
              <div className="space-y-1">
                {VAULT_FILES.map((file) => (
                  <button
                    key={file}
                    type="button"
                    className="group flex w-full cursor-pointer items-center justify-between rounded-lg p-3 text-sm transition-colors hover:bg-accent-soft/60"
                  >
                    <span className="text-left text-muted transition-colors group-hover:text-accent">
                      {file}
                    </span>
                    <span
                      className="material-symbols-outlined text-muted transition-colors group-hover:text-accent"
                      style={{ fontSize: '18px' }}
                    >
                      download
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>

      <footer className="border-t border-orange-200/20 bg-paper/30 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="btn-ghost text-sm">
            &larr; Back to product
          </Link>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Cortex
          </p>
        </div>
      </footer>
    </div>
  )
}
