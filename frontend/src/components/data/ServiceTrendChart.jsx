import { useMemo } from 'react'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Seasonal multipliers: slightly higher in spring/summer for maintenance, lower in winter
const SEASONAL_CURVE = [0.75, 0.78, 0.92, 1.08, 1.15, 1.18, 1.14, 1.10, 1.02, 0.93, 0.82, 0.73]

const CHART_WIDTH = 600
const CHART_HEIGHT = 220
const MARGIN = { top: 10, right: 20, bottom: 30, left: 50 }
const PLOT_W = CHART_WIDTH - MARGIN.left - MARGIN.right
const PLOT_H = CHART_HEIGHT - MARGIN.top - MARGIN.bottom

function formatDollar(n) {
  if (n >= 1000) return `$${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`
  return `$${Math.round(n)}`
}

export default function ServiceTrendChart({ insights, homebridge }) {
  const { serviceData, savingsData, yMax, gridLines } = useMemo(() => {
    const baseMonthly = (insights.totalAnnualServiceUsd || 0) / 12
    const totalSavings =
      (homebridge.annualEnergySavingsUsd || 0) +
      (homebridge.annualInsuranceSavingsUsd || 0) +
      (homebridge.annualMaintenanceAvoidanceUsd || 0)
    const baseSavingsMonthly = totalSavings / 12

    // Build cumulative monthly arrays
    const svcPoints = []
    const savPoints = []
    let cumSvc = 0
    let cumSav = 0

    for (let i = 0; i < 12; i++) {
      cumSvc += baseMonthly * SEASONAL_CURVE[i]
      cumSav += baseSavingsMonthly * SEASONAL_CURVE[i]
      svcPoints.push(cumSvc)
      savPoints.push(cumSav)
    }

    // Determine Y-axis max (round up to a tidy number)
    const rawMax = Math.max(svcPoints[11], savPoints[11], 1)
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawMax)))
    const nice = Math.ceil(rawMax / magnitude) * magnitude
    const finalMax = nice || 1000

    // 4 horizontal grid lines (evenly spaced including 0 and max)
    const lines = [0, finalMax * 0.25, finalMax * 0.5, finalMax * 0.75, finalMax]

    return {
      serviceData: svcPoints,
      savingsData: savPoints,
      yMax: finalMax,
      gridLines: lines,
    }
  }, [insights.totalAnnualServiceUsd, homebridge])

  // Map data to SVG coordinates
  const toX = (i) => MARGIN.left + (i / 11) * PLOT_W
  const toY = (val) => MARGIN.top + PLOT_H - (val / yMax) * PLOT_H

  // Build polyline points string
  const svcPath = serviceData.map((v, i) => `${toX(i)},${toY(v)}`).join(' ')
  const savPath = savingsData.map((v, i) => `${toX(i)},${toY(v)}`).join(' ')

  // Build polygon points for area fill under the service line
  const areaPoints = [
    `${toX(0)},${toY(0)}`,
    ...serviceData.map((v, i) => `${toX(i)},${toY(v)}`),
    `${toX(11)},${toY(0)}`,
  ].join(' ')

  return (
    <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40">
      <h3 className="font-display text-lg font-semibold text-ink">
        12-month service opportunity projection
      </h3>
      <p className="mt-1 text-xs text-muted">
        Cumulative monthly value based on portfolio risk and seasonal demand curves
      </p>

      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="mt-4 w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="svc-area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ea580c" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#ea580c" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {gridLines.map((val) => (
          <g key={val}>
            <line
              x1={MARGIN.left}
              y1={toY(val)}
              x2={CHART_WIDTH - MARGIN.right}
              y2={toY(val)}
              stroke="#e5dcd0"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            <text
              x={MARGIN.left - 8}
              y={toY(val) + 4}
              textAnchor="end"
              fill="#6b5d4d"
              fontSize={11}
              fontFamily="DM Sans, sans-serif"
            >
              {formatDollar(val)}
            </text>
          </g>
        ))}

        {/* X-axis month labels */}
        {MONTHS.map((m, i) => (
          <text
            key={m}
            x={toX(i)}
            y={CHART_HEIGHT - 6}
            textAnchor="middle"
            fill="#6b5d4d"
            fontSize={11}
            fontFamily="DM Sans, sans-serif"
            fontWeight={500}
          >
            {m}
          </text>
        ))}

        {/* Area fill under service line */}
        <polygon points={areaPoints} fill="url(#svc-area-fill)" />

        {/* Service opportunity line */}
        <polyline
          points={svcPath}
          fill="none"
          stroke="#ea580c"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Projected savings line (dashed) */}
        <polyline
          points={savPath}
          fill="none"
          stroke="#c2410c"
          strokeWidth={2}
          strokeDasharray="6 4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
          Service opportunity
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-terracotta" />
          Projected savings
        </span>
      </div>
    </div>
  )
}
