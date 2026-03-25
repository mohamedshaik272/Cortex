import { useMemo, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import ContractUploadSection from '../components/homeowner/ContractUploadSection'
import HomeSiteVisualization from '../components/homeowner/HomeSiteVisualization'
import { TaskShopListings } from '../components/homeowner/TaskShopListings'
import {
  AREA_BENCHMARKS,
  LOG_HOME_ID,
  SAMPLE_CONTRACT_TEXT,
  SERVICE_HISTORY,
  SERVICE_PROVIDERS,
  VAULT_FILES,
  buildAlerts,
  buildFloorNodes,
  buildMaintenanceHorizon,
  buildProminentTasks,
  buildSchedule,
  buildSuggestedNextSteps,
  buildWaterHeaterScenario,
  computeHomeHealth,
} from '../data/homeownerLogDemo'
import { PROMINENT_TASK_LISTINGS } from '../data/taskListings'
import { getWillowbrookHome } from '../data/willowbrookDemo'
import { extractContractInsights } from '../lib/contractInsights'

function warrantyLookup(refIds, warranties) {
  return refIds.map((id) => {
    const w = warranties.find((x) => x.id === id)
    if (!w)
      return {
        label: id,
        detail: 'No matching clause in uploaded extract — check original PDF.',
      }
    return {
      label: w.title,
      detail: `${w.status} · ${w.summary}${w.expiresOn ? ` · Ref date: ${w.expiresOn}` : ''}`,
    }
  })
}

export default function HomeownerLogPage() {
  const [searchParams] = useSearchParams()
  const homeId = searchParams.get('home') ?? LOG_HOME_ID

  const home = useMemo(() => getWillowbrookHome(homeId), [homeId])

  const [selectedNodeId, setSelectedNodeId] = useState(null)
  const [contractInsights, setContractInsights] = useState(() =>
    extractContractInsights(SAMPLE_CONTRACT_TEXT),
  )
  const [whState, setWhState] = useState('idle') // idle | loading | done

  const healthScore = useMemo(() => (home ? computeHomeHealth(home) : 0), [home])
  const alerts = useMemo(() => (home ? buildAlerts(home) : []), [home])
  const horizon = useMemo(() => buildMaintenanceHorizon(), [])
  const nextSteps = useMemo(() => buildSuggestedNextSteps(), [])
  const floorNodes = useMemo(() => (home ? buildFloorNodes(home) : []), [home])
  const schedule = useMemo(() => (home ? buildSchedule(home) : []), [home])
  const tasks = useMemo(() => (home ? buildProminentTasks(home) : []), [home])
  const whScenario = useMemo(() => (home ? buildWaterHeaterScenario(home) : null), [home])

  const selectedNode = useMemo(
    () => floorNodes.find((n) => n.id === selectedNodeId),
    [floorNodes, selectedNodeId],
  )

  const warranties = contractInsights?.warranties ?? []

  if (!home) {
    return <Navigate to="/my-home" replace />
  }

  return (
    <div className="flex min-h-svh flex-col bg-canvas font-sans text-ink antialiased">
      <Header />

      {/* Page header */}
      <div className="bg-paper/80 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Your home at a glance
          </h1>
          <p className="mt-1 text-sm text-muted">
            <span className="font-semibold text-terracotta">{home.address}</span>
            {' '}&middot; {home.sqft.toLocaleString()} sqft &middot; {home.beds} bd &middot; {home.baths} ba &middot;
            built {home.yearBuilt}
          </p>
        </div>
      </div>

      <main className="flex-1 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-10">

          {/* Floor plan + node detail */}
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">
              Floor plan & satellite
            </h2>
            <p className="mt-1 text-sm text-muted">
              Tap a pin to see details about that system. Switch to satellite to see your lot.
            </p>
            <div className="mt-3">
              <HomeSiteVisualization
                home={home}
                lat={home.lat}
                lng={home.lng}
                address={home.address}
                planLabel={`${home.builderName} · ${home.planName} — ${home.beds} bed / ${home.baths} bath · ${home.sqft.toLocaleString()} sqft`}
                nodes={floorNodes}
                selectedId={selectedNodeId}
                onSelect={setSelectedNodeId}
              />
            </div>
            {selectedNode && (
              <div className="mt-4 flex items-start gap-4 rounded-xl border border-accent/30 bg-accent-soft/40 p-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink">{selectedNode.label}</p>
                  <p className="mt-1 text-sm text-muted">{selectedNode.detail}</p>
                  {selectedNode.relatedTaskIds.length > 0 && (
                    <p className="mt-2 text-xs text-muted">
                      <span className="font-medium text-ink">Related:</span>{' '}
                      {selectedNode.relatedTaskIds
                        .map((id) => tasks.find((t) => t.id === id)?.title ?? id)
                        .join(' · ')}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(null)}
                  className="shrink-0 rounded-lg p-1 text-muted transition hover:bg-surface/80 hover:text-ink"
                  aria-label="Close detail"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>
            )}
          </section>

          {/* Home health score */}
          <section className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">Home health</h2>
                <p className="mt-2 max-w-lg text-sm text-muted">
                  Scored across safety, mechanical systems, building envelope, and energy efficiency
                  compared to similar homes in your area.
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

          {/* KPI cards */}
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-orange-200/30 bg-elevated/95 p-4 ring-1 ring-orange-100/40">
              <p className="text-[11px] font-semibold uppercase text-muted">Annual service value</p>
              <p className="font-display mt-1 text-2xl font-semibold text-ink">
                ${home.annualServiceValue.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-muted">Based on equipment age and condition</p>
            </div>
            <div className="rounded-2xl border border-orange-200/30 bg-elevated/95 p-4 ring-1 ring-orange-100/40">
              <p className="text-[11px] font-semibold uppercase text-muted">Demand index</p>
              <p className="font-display mt-1 text-2xl font-semibold text-ink">
                {home.demandIndex.toFixed(2)}
              </p>
              <p className="mt-1 text-xs text-muted">Likelihood of needing upgrades</p>
            </div>
            <div className="rounded-2xl border border-orange-200/30 bg-elevated/95 p-4 ring-1 ring-orange-100/40">
              <p className="text-[11px] font-semibold uppercase text-muted">Climate exposure</p>
              <p className="font-display mt-1 text-2xl font-semibold text-ink">
                {home.climateExposure.exposureIndex.toFixed(2)}
              </p>
              <p className="mt-1 text-xs text-muted">{home.climateExposure.floodZone}</p>
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

          {/* Schedule & area cost benchmarks */}
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-display text-lg font-semibold text-ink">
                Schedule & check-ups
              </h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-orange-200/30 bg-elevated ring-1 ring-orange-100/40">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-orange-200/30 bg-surface/80">
                    <tr>
                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">Service</th>
                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">Date</th>
                      <th className="hidden px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted sm:table-cell">Provider</th>
                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((s) => (
                      <tr key={s.id} className="border-b border-orange-200/15 last:border-0">
                        <td className="px-4 py-3">
                          <p className="font-medium text-ink">{s.title}</p>
                          {s.notes && <p className="mt-0.5 text-xs text-muted">{s.notes}</p>}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-muted">
                          {s.date}
                          {s.time && <span className="block text-xs">{s.time}</span>}
                        </td>
                        <td className="hidden px-4 py-3 text-xs text-terracotta sm:table-cell">{s.provider ?? '—'}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-surface/80 px-2 py-0.5 text-[11px] text-muted ring-1 ring-orange-200/30">
                            {s.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </div>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                Area benchmarks
              </h2>
              <p className="mt-1 text-sm text-muted">
                Gaithersburg / 20878 vs DMV
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {AREA_BENCHMARKS.map((a) => (
                  <li
                    key={a.label}
                    className="rounded-lg border border-orange-200/25 bg-surface/80 px-3 py-2"
                  >
                    <span className="font-medium text-ink">{a.label}</span>
                    <span className="text-muted"> — {a.metroMedianUsd}</span>
                    <p className="text-xs text-muted">{a.thisZipNote}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Service providers */}
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">
              Service providers
            </h2>
            <p className="mt-1 text-sm text-muted">
              Local providers in the Gaithersburg area.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICE_PROVIDERS.map((p) => (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-orange-200/30 bg-elevated p-4 ring-1 ring-orange-100/40 transition hover:border-accent/40 hover:ring-orange-200/60"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-ink leading-snug group-hover:text-accent">{p.name}</p>
                    <span className="shrink-0 text-xs font-medium text-terracotta">
                      ★ {p.rating}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted">{p.specialty}</p>
                  <div className="mt-3 space-y-0.5 text-xs text-muted">
                    <p>{p.phone}</p>
                    <p>{p.serviceRadius}</p>
                  </div>
                  <p className="mt-2 text-sm font-medium text-ink">{p.typicalCostRangeUsd}</p>
                  <span className="mt-2 block text-xs font-semibold text-accent group-hover:underline">
                    View profile →
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* Prominent & urgent tasks */}
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">
              Prominent & urgent tasks
            </h2>
            <p className="mt-1 text-sm text-muted">
              Click to expand details. Warranty info updates when you upload contract documents.
            </p>
            <div className="mt-4 space-y-3">
              {tasks.map((t) => (
                <details
                  key={t.id}
                  className="group rounded-2xl border border-orange-200/30 bg-elevated ring-1 ring-orange-100/40 open:rounded-b-2xl"
                >
                  <summary className="cursor-pointer list-none px-4 py-4 sm:px-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-medium text-ink">{t.title}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          t.urgency === 'urgent'
                            ? 'bg-red-100 text-red-900'
                            : t.urgency === 'soon'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-surface/80 text-muted'
                        }`}
                      >
                        {t.urgency}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted">{t.summary}</p>
                  </summary>
                  <div className="border-t border-orange-200/25 px-4 pb-4 pt-0 sm:px-5">
                    <div className="grid gap-4 pt-4 sm:grid-cols-2">
                      <div>
                        <p className="text-[11px] font-semibold uppercase text-muted">
                          Est. cost (this home)
                        </p>
                        <p className="text-sm font-medium text-ink">{t.estCostHomeUsd}</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase text-muted">
                          Area typical
                        </p>
                        <p className="text-sm text-muted">{t.estCostAreaTypicalUsd}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase text-muted">
                          Warranties & coverage
                        </p>
                        <p className="text-sm text-muted">{t.warrantyNote}</p>
                        <ul className="mt-2 space-y-1 text-xs">
                          {warrantyLookup(t.warrantyRefIds, warranties).map((w, i) => (
                            <li key={i} className="rounded-lg bg-accent-soft/50 px-2 py-1 ring-1 ring-orange-200/40">
                              <span className="font-medium text-ink">{w.label}</span>
                              <span className="text-muted"> — {w.detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-[11px] font-semibold uppercase text-muted">
                        Service options
                      </p>
                      <ul className="mt-1 space-y-1 text-sm">
                        {t.serviceOptions.map((o) => (
                          <li key={o.label}>
                            <span className="font-medium text-ink">{o.label}</span>
                            <span className="text-muted"> — {o.estUsd}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {PROMINENT_TASK_LISTINGS[t.id] ? (
                      <TaskShopListings pair={PROMINENT_TASK_LISTINGS[t.id]} />
                    ) : null}
                    {t.productOptions?.length ? (
                      <div className="mt-4">
                        <p className="text-[11px] font-semibold uppercase text-muted">
                          Product / replacement choices
                        </p>
                        <ul className="mt-2 space-y-3">
                          {t.productOptions.map((p) => (
                            <li
                              key={p.label}
                              className="rounded-xl border border-orange-200/30 bg-surface/60 p-3 text-sm"
                            >
                              <p className="font-medium text-ink">{p.label}</p>
                              <p className="mt-1 text-xs text-emerald-800">
                                Pros: {p.pros.join('; ')}
                              </p>
                              <p className="mt-1 text-xs text-red-900/90">
                                Cons: {p.cons.join('; ')}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Water heater scenario */}
          {whScenario ? (
            <section className="rounded-2xl border border-orange-200/80 bg-accent-soft/40 p-6 ring-1 ring-orange-200/60">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg font-semibold text-ink">
                    Water heater — keep, repair, or replace
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {whScenario.current.brand} {whScenario.current.model} &middot; {whScenario.current.ageYears}{' '}
                    yrs &middot; {whScenario.current.healthPct}% health &middot; {whScenario.current.fuel}
                  </p>
                </div>
                {whState === 'idle' && (
                  <button
                    type="button"
                    onClick={() => {
                      setWhState('loading')
                      setTimeout(() => setWhState('done'), 2200)
                    }}
                    className="shrink-0 rounded-xl bg-gradient-to-r from-accent to-terracotta px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-110 active:scale-[0.97]"
                  >
                    Analyze
                  </button>
                )}
              </div>

              {whState === 'loading' && (
                <div className="mt-8 flex flex-col items-center gap-4 py-8">
                  <div className="flex items-center gap-3" role="status" aria-live="polite">
                    <svg className="h-5 w-5 animate-spin text-terracotta" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" />
                    </svg>
                    <p className="text-sm font-medium text-ink">Analyzing system data, warranty terms, and replacement options&hellip;</p>
                  </div>
                  <div className="h-1.5 w-64 overflow-hidden rounded-full bg-orange-200/50">
                    <div className="h-full animate-pulse rounded-full bg-gradient-to-r from-accent to-terracotta" style={{ animation: 'grow 2s ease-out forwards' }} />
                  </div>
                  <style>{`@keyframes grow { from { width: 0% } to { width: 100% } }`}</style>
                </div>
              )}

              {whState === 'done' && (
                <>
                  <p className="mt-4 text-sm text-ink">{whScenario.current.notes}</p>
                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold text-ink">Keep (current tank)</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                        {whScenario.keepVsUpgrade.keepPros.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-red-900/85">
                        {whScenario.keepVsUpgrade.keepCons.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-ink">Upgrade</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-900/90">
                        {whScenario.keepVsUpgrade.upgradeBenefits.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                        {whScenario.keepVsUpgrade.upgradeCons.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {whScenario.replacements.map((r) => (
                      <div
                        key={r.id}
                        className="rounded-xl border border-orange-200/30 bg-white/90 p-4 shadow-sm ring-1 ring-orange-100/40"
                      >
                        <p className="font-medium text-ink">{r.name}</p>
                        <p className="mt-1 text-xs uppercase text-muted">{r.type}</p>
                        <p className="mt-2 text-sm text-muted">{r.installedRangeUsd} installed</p>
                        <p className="text-xs text-terracotta">{r.estAnnualSavingsUsd}/yr est. savings</p>
                        <p className="mt-2 text-xs text-muted">{r.notes}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </section>
          ) : null}

          {/* Major systems */}
          <section>
            <h2 className="font-display text-lg font-semibold text-ink">Major systems</h2>
            <p className="mt-1 text-sm text-muted">
              Age, health, and notes for every system on the floor plan.
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

                    {/* Infrastructure systems matching floor plan pins */}
                    {home.hvac && (
                      <tr className="border-b border-orange-200/15 last:border-0">
                        <td className="px-4 py-3 font-medium text-ink">HVAC &mdash; {home.hvac.systemType}</td>
                        <td className="px-4 py-3 text-muted">{home.hvac.ageYears} yrs</td>
                        <td className="px-4 py-3 text-xs text-muted">{home.hvac.refrigerantType}</td>
                        <td className="px-4 py-3 text-muted">{home.hvac.notes}</td>
                      </tr>
                    )}
                    {home.electric && (
                      <tr className="border-b border-orange-200/15 last:border-0">
                        <td className="px-4 py-3 font-medium text-ink">Electrical panel ({home.electric.panelAmps}A)</td>
                        <td className="px-4 py-3 text-muted">{home.electric.panelAgeYears} yrs</td>
                        <td className="px-4 py-3 text-xs text-muted">&mdash;</td>
                        <td className="px-4 py-3 text-muted">{home.electric.notes}</td>
                      </tr>
                    )}
                    {home.roof && (
                      <tr className="border-b border-orange-200/15 last:border-0">
                        <td className="px-4 py-3 font-medium text-ink">Roof &mdash; {home.roof.material}</td>
                        <td className="px-4 py-3 text-muted">{home.roof.ageYears} yrs</td>
                        <td className="px-4 py-3 text-xs capitalize text-muted">{home.roof.condition}</td>
                        <td className="px-4 py-3 text-muted">{home.roof.notes}</td>
                      </tr>
                    )}
                    {home.plumbing && (
                      <tr className="border-b border-orange-200/15 last:border-0">
                        <td className="px-4 py-3 font-medium text-ink">Plumbing &mdash; {home.plumbing.pipeMaterial}</td>
                        <td className="px-4 py-3 text-muted">{home.plumbing.ageYears} yrs</td>
                        <td className="px-4 py-3 text-xs text-muted">&mdash;</td>
                        <td className="px-4 py-3 text-muted">{home.plumbing.knownIssues || home.plumbing.notes}</td>
                      </tr>
                    )}
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
                        aria-hidden="true"
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
                    aria-label={`Download ${file}`}
                    className="group flex w-full cursor-pointer items-center justify-between rounded-lg p-3 text-sm transition-colors hover:bg-accent-soft/60 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    <span className="text-left text-muted transition-colors group-hover:text-accent" aria-hidden="true">
                      {file}
                    </span>
                    <span
                      className="material-symbols-outlined text-muted transition-colors group-hover:text-accent"
                      style={{ fontSize: '18px' }}
                      aria-hidden="true"
                    >
                      download
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Contract upload */}
          <ContractUploadSection
            insights={contractInsights}
            onParsed={setContractInsights}
          />

        </div>
      </main>

      <footer className="border-t border-orange-200/20 bg-paper/30 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="btn-ghost text-sm">
            &larr; Back to product
          </Link>
          <p className="text-xs text-muted">
            Cortex &middot; Home intelligence
          </p>
        </div>
      </footer>
    </div>
  )
}
