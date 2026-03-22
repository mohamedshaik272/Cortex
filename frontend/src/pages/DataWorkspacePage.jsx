import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import DataSubnav from '../components/data/DataSubnav'
import HouseCard from '../components/data/HouseCard'
import InsightsDeck from '../components/data/InsightsDeck'
import ServiceTrendChart from '../components/data/ServiceTrendChart'
import SubdivisionFilterBar from '../components/data/SubdivisionFilterBar'
import Header from '../components/Header'
import NeighborhoodMap from '../components/map/NeighborhoodMap'
import { WILLOWBROOK, willowbrookHomes } from '../data/willowbrookDemo'
import {
  buildSmartScoreTable,
  computeDealerbridgeOutlook,
  computeHomebridgeOutlook,
} from '../lib/bridgeOutlook'
import {
  computeSubdivisionInsights,
  DEFAULT_FILTER_STATE,
  filterWillowbrookHomes,
  portfolioRiskIndex,
} from '../lib/willowbrookInsights'

/* ── Partner / OEM config ─────────────────────────────── */

const BRAND = {
  name: 'AquaJet Thermal',
  product: 'AquaJet Pro 50 Hybrid',
  tagline: 'Heat-pump water heating for existing gas or electric closets',
}

function waterHeater(h) {
  return h.appliances.find((a) => /water heater/i.test(a.name))
}

function aquaJetFitScore(h) {
  const wh = waterHeater(h)
  if (!wh) return 0
  let s = 0
  if (wh.ageYears >= 7) s += 35
  if (wh.ageYears >= 9) s += 25
  if (wh.healthPct < 70) s += 25
  if (wh.healthPct < 60) s += 15
  if (/R-22/i.test(h.hvac.refrigerantType)) s += 10
  return Math.min(100, s)
}

/* ── Shared Kpi card ──────────────────────────────────── */

function Kpi({ label, value, hint }) {
  return (
    <div className="rounded-xl border border-orange-200/30 bg-elevated/95 p-3 ring-1 ring-orange-100/40">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="font-display mt-1 text-lg font-semibold text-ink">{value}</p>
      {hint && <p className="mt-0.5 text-[11px] text-muted">{hint}</p>}
    </div>
  )
}

/* ── Tab descriptions ─────────────────────────────────── */

const TAB_HEADERS = {
  community: {
    title: WILLOWBROOK.name,
    subtitle: `${WILLOWBROOK.builder} · ${WILLOWBROOK.city}, ${WILLOWBROOK.state}`,
  },
  bridge: {
    title: 'Market intelligence',
    subtitle: 'Risk, pipeline, savings, and lead scoring — synced to filters',
  },
  partner: {
    title: `${BRAND.name} · Partner view`,
    subtitle: BRAND.tagline,
  },
}

/* ── Main page ────────────────────────────────────────── */

export default function DataWorkspacePage() {
  const [tab, setTab] = useState('community')
  const [filter, setFilter] = useState(DEFAULT_FILTER_STATE)
  const [selectedId, setSelectedId] = useState(null)

  const filtered = useMemo(
    () => filterWillowbrookHomes(willowbrookHomes, filter),
    [filter],
  )

  const insights = useMemo(() => computeSubdivisionInsights(filtered), [filtered])

  /* Bridge computations */
  const homebridge = useMemo(() => computeHomebridgeOutlook(filtered), [filtered])
  const dealer = useMemo(
    () => computeDealerbridgeOutlook(filtered, insights),
    [filtered, insights],
  )
  const scoreRows = useMemo(() => buildSmartScoreTable(filtered), [filtered])

  /* Partner computations */
  const partnerMarket = useMemo(() => computeSubdivisionInsights(willowbrookHomes), [])
  const candidates = useMemo(() => {
    return willowbrookHomes
      .map((h) => ({ h, score: aquaJetFitScore(h), wh: waterHeater(h) }))
      .filter((x) => x.wh)
      .sort((a, b) => b.score - a.score)
  }, [])
  const tamUsd = useMemo(() => {
    return candidates.filter((c) => c.score >= 55).length * 3200
  }, [candidates])
  const serviceAttach = useMemo(() => {
    const eligible = candidates.filter((c) => c.score >= 45).length
    return Math.round((eligible / willowbrookHomes.length) * 100)
  }, [candidates])

  /* Clear selected home if filtered out */
  useEffect(() => {
    if (selectedId && !filtered.some((h) => h.id === selectedId)) {
      setSelectedId(null)
    }
  }, [filtered, selectedId])

  const header = TAB_HEADERS[tab]
  const showFilter = tab === 'community' || tab === 'bridge'

  return (
    <div className="flex min-h-svh flex-col bg-canvas font-sans text-ink antialiased">
      <Header />

      {/* Page header */}
      <div className="bg-paper/80 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {header.title}
            </h1>
            <p className="mt-0.5 text-sm text-muted">{header.subtitle}</p>
          </div>
          <DataSubnav activeTab={tab} onTabChange={setTab} />
        </div>
      </div>

      {/* Shared filter bar (community + bridge) */}
      {showFilter && (
        <SubdivisionFilterBar
          value={filter}
          onChange={setFilter}
          resultCount={filtered.length}
          totalInSubdivision={willowbrookHomes.length}
        />
      )}

      <main className="flex-1 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          {tab === 'community' && (
            <CommunityTab
              filtered={filtered}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              insights={insights}
            />
          )}
          {tab === 'bridge' && (
            <BridgeTab
              filtered={filtered}
              insights={insights}
              homebridge={homebridge}
              dealer={dealer}
              scoreRows={scoreRows}
            />
          )}
          {tab === 'partner' && (
            <PartnerTab
              market={partnerMarket}
              candidates={candidates}
              tamUsd={tamUsd}
              serviceAttach={serviceAttach}
            />
          )}
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

/* ═══════════════════════════════════════════════════════
   Community tab: map + inventory + compact summary
   ═══════════════════════════════════════════════════════ */

function CommunityTab({ filtered, selectedId, setSelectedId, insights }) {
  return (
    <>
      {/* Compact cohort summary */}
      <section className="grid gap-3 sm:grid-cols-3">
        <Kpi
          label="Homes in cohort"
          value={String(insights.homeCount)}
          hint="Filtered set shown on map and tiles"
        />
        <Kpi
          label="Portfolio risk index"
          value={String(insights.portfolioRiskIndex)}
          hint="0-100 blended risk across all categories"
        />
        <Kpi
          label="Total annual service opportunity"
          value={`$${insights.totalAnnualServiceUsd.toLocaleString()}`}
          hint="Sum across filtered cohort"
        />
      </section>

      <section aria-labelledby="map-heading">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <h2 id="map-heading" className="font-display text-lg font-semibold text-ink">
            Subdivision map
          </h2>
          <p className="text-xs text-muted">
            {WILLOWBROOK.city}, {WILLOWBROOK.state} &middot; phase I lots
          </p>
        </div>
        <div className="min-h-[420px] overflow-hidden rounded-2xl ring-1 ring-orange-100/40">
          <NeighborhoodMap
            houses={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
            center={WILLOWBROOK.center}
            zoom={WILLOWBROOK.zoom}
            fitBounds
            totalInSubdivision={willowbrookHomes.length}
          />
        </div>
      </section>

      <section aria-labelledby="inventory-heading">
        <h2 id="inventory-heading" className="font-display text-lg font-semibold text-ink">
          Home inventory
        </h2>
        <p className="mt-1 text-sm text-muted">
          Select a tile to open the full system-of-record view for that home.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((h) => (
            <HouseCard
              key={h.id}
              house={h}
              detailHref={`/data/home/${h.id}`}
              isSelected={selectedId === h.id}
            />
          ))}
        </div>
      </section>
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   Bridge tab: full analytics hub
   (InsightsDeck + HomeBridge + DealerBridge + Smart Score)
   ═══════════════════════════════════════════════════════ */

function BridgeTab({ filtered, insights, homebridge, dealer, scoreRows }) {
  if (filtered.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-orange-200/30 bg-surface/40 p-8 text-center text-sm text-muted">
        No homes match the current filters. Adjust filters to see analytics.
      </p>
    )
  }

  return (
    <>
      {/* Category risk + replacement pipeline (from InsightsDeck) */}
      <InsightsDeck insights={insights} />

      {/* 12-month projection chart */}
      <ServiceTrendChart insights={insights} homebridge={homebridge} />

      {/* Savings & scoring */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* HomeBridge: savings modeling */}
        <section className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40">
          <h2 className="font-display text-lg font-semibold text-ink">
            Homeowner savings outlook
          </h2>
          <p className="mt-1 text-xs text-muted">
            Energy, insurance, and maintenance modeled from equipment stress and opportunity value.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Kpi
              label="Annual energy savings"
              value={`$${homebridge.annualEnergySavingsUsd.toLocaleString()}`}
            />
            <Kpi
              label="Insurance optimization"
              value={`$${homebridge.annualInsuranceSavingsUsd.toLocaleString()}`}
            />
            <Kpi
              label="Maintenance avoidance"
              value={`$${homebridge.annualMaintenanceAvoidanceUsd.toLocaleString()}`}
            />
            <Kpi
              label="Stacked monthly savings"
              value={`$${homebridge.monthlySavingsStackUsd.toLocaleString()}/mo`}
            />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-accent-soft/80 p-4 ring-1 ring-orange-200/60">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-terracotta">
                Upgrade readiness
              </p>
              <p className="font-display mt-1 text-3xl font-semibold text-ink">
                {homebridge.upgradeReadinessIndex}
              </p>
              <p className="mt-1 text-xs text-muted">0-100 cohort index from system mix</p>
            </div>
            <div className="rounded-xl bg-accent-soft/80 p-4 ring-1 ring-orange-200/60">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-rust">
                Value uplift potential
              </p>
              <p className="font-display mt-1 text-3xl font-semibold text-ink">
                {homebridge.valueUpliftIndex}
              </p>
              <p className="mt-1 text-xs text-muted">
                Modeled from hardware backlog x demand index
              </p>
            </div>
          </div>
        </section>

        {/* DealerBridge: lead scoring */}
        <section className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40">
          <h2 className="font-display text-lg font-semibold text-ink">
            Contractor lead scoring
          </h2>
          <p className="mt-1 text-xs text-muted">
            Lead tiers and qualified counts. Scores drive routing priority.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Kpi label="Mean Smart Score" value={dealer.meanSmartScore} />
            <Kpi label="Qualified homes" value={`${dealer.qualifiedHomes}`} hint="Score >= 62" />
            <Kpi label="Reactivation candidates" value={`${dealer.reactivationCandidates}`} hint="Aging systems + service history" />
            <div className="rounded-xl border border-orange-200/30 bg-elevated/95 p-3 ring-1 ring-orange-100/40">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Tier distribution</p>
              <div className="mt-2 flex gap-2">
                {['A', 'B', 'C'].map((t) => (
                  <div
                    key={t}
                    className="flex-1 rounded-lg bg-surface/60 px-2 py-1.5 text-center"
                  >
                    <p className="font-display text-lg font-semibold text-ink">{dealer.tierCounts[t]}</p>
                    <p className="text-[11px] text-muted">Tier {t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Smart Score table */}
      <section className="overflow-hidden rounded-2xl border border-orange-200/30 bg-elevated ring-1 ring-orange-100/40">
        <div className="border-b border-orange-200/30 bg-surface/80 px-4 py-3">
          <h2 className="font-display text-lg font-semibold text-ink">
            Per-home Smart Score
          </h2>
          <p className="text-xs text-muted">
            {WILLOWBROOK.name} &middot; sorted by score. Links open full home record.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-orange-200/30 bg-surface/80 text-[11px] font-semibold uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Service opp. / yr</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {scoreRows.map((row) => (
                <tr key={row.id} className="border-b border-orange-200/15 last:border-0">
                  <td className="px-4 py-2.5 font-medium text-ink">{row.address}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        row.tier === 'A'
                          ? 'bg-accent-soft text-clay'
                          : row.tier === 'B'
                            ? 'bg-accent-soft text-rust'
                            : 'bg-surface text-muted'
                      }`}
                    >
                      {row.tier}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-medium">{row.score}</td>
                  <td className="px-4 py-2.5 text-muted">
                    ${row.annualServiceValue.toLocaleString()}
                  </td>
                  <td className="px-4 py-2.5">
                    <Link
                      to={`/data/home/${row.id}`}
                      className="font-medium text-accent hover:text-terracotta"
                    >
                      Home &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   Partner tab: focused OEM view (AquaJet)
   ═══════════════════════════════════════════════════════ */

function PartnerTab({ market, candidates, tamUsd, serviceAttach }) {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Addressable market
          </p>
          <p className="font-display mt-2 text-3xl font-semibold text-ink">
            ${tamUsd.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-muted">
            Rough install TAM at ~$3.2k &times; homes with strong retrofit fit score (&ge;55).
          </p>
        </div>
        <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Service attach potential
          </p>
          <p className="font-display mt-2 text-3xl font-semibold text-ink">
            {serviceAttach}%
          </p>
          <p className="mt-1 text-xs text-muted">
            Share of homes where cross-sell model fires (fit score &ge;45).
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-orange-200/30 bg-surface/50 p-6 ring-1 ring-orange-100/40">
        <h2 className="font-display text-lg font-semibold text-ink">
          Why {BRAND.product} shows up here
        </h2>
        <p className="mt-2 text-sm text-muted">
          The same equipment graph that powers homeowner insights feeds a partner rule: flag
          tank water heaters beyond efficient mid-life, especially when health scores fall or
          legacy HVAC refrigerant increases whole-home project bundling.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
          <li>
            <span className="font-medium text-ink">Recommendation</span>: prioritized for
            homes with tank WH age &ge;7 yr and/or health &lt;68%, aligned with Meridian phase I
            install years (2015-2021).
          </li>
          <li>
            <span className="font-medium text-ink">Homeowner downside of waiting</span>:{' '}
            higher standby losses, tank failure risk (water damage), cold-shock complaints, and
            lost utility rebates when equipment fails on emergency timeline vs. planned retrofit.
          </li>
          <li>
            <span className="font-medium text-ink">Market motion</span>: annual service
            opportunity across the subdivision is{' '}
            <span className="text-ink">
              ${market.totalAnnualServiceUsd.toLocaleString()}
            </span>{' '}
            (all categories); utilities category pipeline helps time OEM promos with HVAC
            replacements.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink">
          Homes where {BRAND.name} is modeled as top recommendation
        </h2>
        <p className="mt-1 text-sm text-muted">
          Fit score blends tank age, health, and bundling signals. &ldquo;Portfolio risk&rdquo; is the
          same 0-100 index used on the analytics tab for that home.
        </p>
        <div className="mt-4 overflow-hidden overflow-x-auto rounded-2xl border border-orange-200/30 bg-elevated ring-1 ring-orange-100/40">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-orange-200/30 bg-surface/80 text-[11px] font-semibold uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Current WH</th>
                <th className="px-4 py-3">Age / health</th>
                <th className="px-4 py-3">AquaJet fit</th>
                <th className="px-4 py-3">Portfolio risk</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {candidates.slice(0, 10).map(({ h, score, wh }) => (
                <tr key={h.id} className="border-b border-orange-200/15 last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">{h.address}</td>
                  <td className="px-4 py-3 text-muted">
                    {wh.brand} {wh.model}
                  </td>
                  <td className="px-4 py-3">
                    {wh.ageYears} yr &middot; {wh.healthPct}% health
                  </td>
                  <td className="px-4 py-3 font-semibold text-terracotta">{score}</td>
                  <td className="px-4 py-3">{portfolioRiskIndex([h])}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/data/home/${h.id}`}
                      className="font-medium text-accent hover:text-terracotta"
                    >
                      Home &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
