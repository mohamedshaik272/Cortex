import {
  floorToIsoSvg,
  planLayoutSummary,
  roomsForHome,
} from '../../data/willowbrookPlanLayouts'

const CAT = {
  appliance: { fill: 'bg-orange-600', ring: 'ring-orange-200', shadow: 'shadow-orange-900/25' },
  maintenance: { fill: 'bg-blue-600', ring: 'ring-blue-200', shadow: 'shadow-blue-900/20' },
  hardware: { fill: 'bg-amber-900', ring: 'ring-amber-200', shadow: 'shadow-amber-900/25' },
  utility: { fill: 'bg-cyan-700', ring: 'ring-cyan-200', shadow: 'shadow-cyan-900/25' },
}

const ISO_K = 2.45
const WALL_LIFT = 13

function collectIsoPoints(home, nodes, k) {
  const pts = []
  for (const r of roomsForHome(home)) {
    for (const [fx, fy] of r.corners) {
      pts.push(floorToIsoSvg(fx, fy, k))
    }
  }
  for (const n of nodes) {
    const p = floorToIsoSvg(n.layoutPct.x, n.layoutPct.y, k)
    pts.push({ x: p.x, y: p.y - WALL_LIFT })
  }
  return pts
}

function boundsForPoints(pts) {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const p of pts) {
    minX = Math.min(minX, p.x)
    minY = Math.min(minY, p.y)
    maxX = Math.max(maxX, p.x)
    maxY = Math.max(maxY, p.y)
  }
  return { minX, minY, maxX, maxY }
}

function floorBounds(room) {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const [x, y] of room.corners) {
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
  }
  return { minX, minY, maxX, maxY }
}

function topPath(points) {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${(p.y - WALL_LIFT).toFixed(2)}`)
    .join(' ')
}

function sidePath(a, b) {
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} L ${b.x.toFixed(2)} ${b.y.toFixed(2)} L ${b.x.toFixed(2)} ${(b.y - WALL_LIFT).toFixed(2)} L ${a.x.toFixed(2)} ${(a.y - WALL_LIFT).toFixed(2)} Z`
}

function roomBaseIso(room, k) {
  return room.corners.map(([fx, fy]) => floorToIsoSvg(fx, fy, k))
}

function rectTopPoints(x, y, w, h, k) {
  const p1 = floorToIsoSvg(x, y, k)
  const p2 = floorToIsoSvg(x + w, y, k)
  const p3 = floorToIsoSvg(x + w, y + h, k)
  const p4 = floorToIsoSvg(x, y + h, k)
  return [p1, p2, p3, p4]
}

function topPathWithLift(points, lift) {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${(p.y - lift).toFixed(2)}`)
    .join(' ')
}

function roomMaterial(roomId) {
  if (roomId === 'garage') return { base: '#d8d4cb', pattern: null }
  if (roomId === 'kitchen' || roomId === 'mud-laundry' || roomId === 'mech') {
    return { base: '#ece8df', pattern: 'tile' }
  }
  if (roomId === 'living') return { base: '#eceae4', pattern: 'carpet' }
  if (roomId === 'hall' || roomId === 'primary' || roomId.startsWith('bed')) {
    return { base: '#e6d7c2', pattern: 'wood' }
  }
  return { base: '#ece8df', pattern: null }
}

function fixtureForRoom(room) {
  const b = floorBounds(room)
  const w = b.maxX - b.minX
  const h = b.maxY - b.minY
  const f = []

  if (room.id === 'kitchen') {
    f.push({
      id: `${room.id}-island`,
      x: b.minX + w * 0.36,
      y: b.minY + h * 0.42,
      w: w * 0.3,
      h: h * 0.2,
      fill: '#d7d3cb',
      stroke: '#bfb9af',
      lift: WALL_LIFT - 1.5,
    })
  }
  if (room.id === 'living') {
    f.push({
      id: `${room.id}-rug`,
      x: b.minX + w * 0.28,
      y: b.minY + h * 0.26,
      w: w * 0.46,
      h: h * 0.42,
      fill: '#d9d4cb',
      stroke: '#c9c3b7',
      lift: WALL_LIFT - 0.8,
    })
  }
  if (room.id.startsWith('bed') || room.id === 'primary' || room.id === 'bed5-flex') {
    f.push({
      id: `${room.id}-bed`,
      x: b.minX + w * 0.28,
      y: b.minY + h * 0.26,
      w: w * 0.42,
      h: h * 0.28,
      fill: '#d8d2c6',
      stroke: '#beb6a7',
      lift: WALL_LIFT - 1.1,
    })
  }
  if (room.id === 'garage') {
    f.push(
      {
        id: `${room.id}-bay-1`,
        x: b.minX + w * 0.18,
        y: b.minY + h * 0.2,
        w: w * 0.22,
        h: h * 0.38,
        fill: '#cdc8bd',
        stroke: '#b6afa1',
        lift: WALL_LIFT - 0.9,
      },
      {
        id: `${room.id}-bay-2`,
        x: b.minX + w * 0.48,
        y: b.minY + h * 0.2,
        w: w * 0.22,
        h: h * 0.38,
        fill: '#cdc8bd',
        stroke: '#b6afa1',
        lift: WALL_LIFT - 0.9,
      },
    )
  }
  if (room.id === 'mud-laundry') {
    f.push(
      {
        id: `${room.id}-w`,
        x: b.minX + w * 0.16,
        y: b.minY + h * 0.26,
        w: w * 0.24,
        h: h * 0.42,
        fill: '#d7d2c8',
        stroke: '#bbb4a8',
        lift: WALL_LIFT - 1.1,
      },
      {
        id: `${room.id}-d`,
        x: b.minX + w * 0.48,
        y: b.minY + h * 0.26,
        w: w * 0.24,
        h: h * 0.42,
        fill: '#d7d2c8',
        stroke: '#bbb4a8',
        lift: WALL_LIFT - 1.1,
      },
    )
  }
  return f
}

function spreadPins(pins, minDist = 6.4) {
  const out = pins.map((p) => ({ ...p }))
  for (let it = 0; it < 20; it += 1) {
    for (let i = 0; i < out.length; i += 1) {
      for (let j = i + 1; j < out.length; j += 1) {
        const a = out[i]
        const b = out[j]
        const dx = b.left - a.left
        const dy = b.top - a.top
        const d = Math.hypot(dx, dy) || 0.001
        if (d >= minDist) continue
        const push = (minDist - d) * 0.5
        const ux = dx / d
        const uy = dy / d
        a.left -= ux * push
        a.top -= uy * push
        b.left += ux * push
        b.top += uy * push
      }
    }
    for (const p of out) {
      p.left = Math.min(97, Math.max(3, p.left))
      p.top = Math.min(96, Math.max(4, p.top))
    }
  }
  return Object.fromEntries(out.map((p) => [p.id, { left: p.left, top: p.top }]))
}

/**
 * Vector isometric floor plan: plan-specific room quads + sqft scaling, no raster underlay.
 */
export function IsometricFloorPlan({
  home,
  nodes,
  selectedId,
  onSelect,
}) {
  const k = ISO_K
  const rooms = roomsForHome(home).slice().sort((a, b) => {
    const ay =
      a.corners.reduce((s, c) => s + floorToIsoSvg(c[0], c[1], k).y, 0) / a.corners.length
    const by =
      b.corners.reduce((s, c) => s + floorToIsoSvg(c[0], c[1], k).y, 0) / b.corners.length
    return ay - by
  })

  const pts = collectIsoPoints(home, nodes, k)
  for (const room of rooms) {
    for (const p of roomBaseIso(room, k)) pts.push({ x: p.x, y: p.y - WALL_LIFT })
  }
  const { minX, minY, maxX, maxY } = boundsForPoints(pts)
  const pad = 40
  const vbW = maxX - minX + pad * 2
  const vbH = maxY - minY + pad * 2
  const vbX = minX - pad
  const vbY = minY - pad

  const toPct = (sx, sy) => ({
    left: ((sx - vbX) / vbW) * 100,
    top: ((sy - vbY) / vbH) * 100,
  })
  const fixtures = rooms.flatMap((room) => fixtureForRoom(room))
  const initialPins = nodes.map((n) => {
    const p = floorToIsoSvg(n.layoutPct.x, n.layoutPct.y, k)
    const pos = toPct(p.x, p.y - WALL_LIFT)
    return { id: n.id, left: pos.left, top: pos.top }
  })
  const pinPos = spreadPins(initialPins)

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-stone-100 to-stone-200/80 ring-1 ring-stone-300/70">
        <svg
          viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
          className="block w-full h-auto"
          role="img"
          aria-label={`Isometric ${home.planName} floor plan with system hotspots`}
        >
          <defs>
            <filter id="iso-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2.2" stdDeviation="1.5" floodOpacity="0.16" />
            </filter>
            <pattern id="iso-wood" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
              <rect width="7" height="7" fill="transparent" />
              <line x1="0" y1="0" x2="0" y2="7" stroke="#d5c3aa" strokeWidth="1" opacity="0.52" />
            </pattern>
            <pattern id="iso-tile" width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="transparent" />
              <path d="M 0 0 L 6 0 L 6 6 L 0 6 Z" fill="none" stroke="#dad2c6" strokeWidth="0.5" opacity="0.55" />
            </pattern>
            <pattern id="iso-carpet" width="5" height="5" patternUnits="userSpaceOnUse">
              <circle cx="1.2" cy="1.2" r="0.45" fill="#d7d2c8" opacity="0.7" />
              <circle cx="3.6" cy="3.6" r="0.45" fill="#d7d2c8" opacity="0.7" />
            </pattern>
          </defs>
          <rect x={vbX} y={vbY} width={vbW} height={vbH} fill="#ebe9e4" />
          <ellipse
            cx={(minX + maxX) / 2}
            cy={maxY + 8}
            rx={(maxX - minX) * 0.5}
            ry={12}
            fill="#1c1917"
            opacity={0.1}
          />
          <g filter="url(#iso-soft)">
            {rooms.map((r) => {
              const base = roomBaseIso(r, k)
              const d = topPath(base)
              const mat = roomMaterial(r.id)
              return (
                <g key={r.id}>
                  {base.map((p, i) => {
                    const q = base[(i + 1) % base.length]
                    if (q.y <= p.y) return null
                    return (
                      <path
                        key={`${r.id}-w-${i}`}
                        d={sidePath(p, q)}
                        fill="#f5f5f4"
                        stroke="#d6d3d1"
                        strokeWidth={0.65}
                        opacity={0.95}
                      />
                    )
                  })}
                  <path
                    d={`${d} Z`}
                    fill={mat.base}
                    stroke="#d6d3d1"
                    strokeWidth={1.1}
                    strokeLinejoin="round"
                    opacity={0.99}
                  />
                  {mat.pattern ? (
                    <path
                      d={`${d} Z`}
                      fill={`url(#iso-${mat.pattern})`}
                      opacity={0.5}
                      stroke="none"
                    />
                  ) : null}
                </g>
              )
            })}
            {fixtures.map((fx) => {
              const ptsTop = rectTopPoints(fx.x, fx.y, fx.w, fx.h, k)
              const dTop = topPathWithLift(ptsTop, fx.lift)
              return (
                <g key={fx.id}>
                  {ptsTop.map((p, i) => {
                    const q = ptsTop[(i + 1) % ptsTop.length]
                    if (q.y <= p.y) return null
                    return (
                      <path
                        key={`${fx.id}-s-${i}`}
                        d={`M ${p.x.toFixed(2)} ${(p.y - fx.lift + 0.9).toFixed(2)} L ${q.x.toFixed(2)} ${(q.y - fx.lift + 0.9).toFixed(2)} L ${q.x.toFixed(2)} ${(q.y - fx.lift + 2.2).toFixed(2)} L ${p.x.toFixed(2)} ${(p.y - fx.lift + 2.2).toFixed(2)} Z`}
                        fill="#d1cbc0"
                        opacity={0.84}
                      />
                    )
                  })}
                  <path d={`${dTop} Z`} fill={fx.fill} stroke={fx.stroke} strokeWidth={0.7} opacity={0.92} />
                </g>
              )
            })}
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-0">
          {nodes.map((n) => {
            const spread = pinPos[n.id]
            const left = spread?.left ?? 50
            const top = spread?.top ?? 50
            const c = CAT[n.category]
            const sel = selectedId === n.id
            const short = n.label.length > 22 ? `${n.label.slice(0, 20)}…` : n.label
            return (
              <div
                key={n.id}
                className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 ${sel ? 'z-20' : 'z-10'}`}
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <button
                  type="button"
                  aria-label={n.label}
                  aria-pressed={sel}
                  onClick={() => onSelect(n.id)}
                  className={`group relative flex flex-col items-center gap-0.5 p-2 -m-2 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${c.shadow}`}
                >
                  <span
                    className={`relative flex h-7 w-7 items-center justify-center rounded-full ${c.fill} ring-2 ${c.ring} transition ${
                      sel ? 'scale-110 ring-4 ring-white' : 'hover:scale-105'
                    }`}
                  >
                    {sel ? (
                      <span
                        className="absolute inset-0 animate-ping rounded-full bg-white/30"
                        aria-hidden
                      />
                    ) : null}
                    <span className="h-2.5 w-2.5 rounded-full bg-white/90 shadow-sm" />
                  </span>
                  <span
                    className={`max-w-[8.5rem] rounded-md px-1.5 py-0.5 text-center text-[10px] font-semibold leading-tight shadow-sm transition ${
                      sel
                        ? 'translate-y-0 bg-ink text-white opacity-100'
                        : 'translate-y-1 bg-white/95 text-ink ring-1 ring-stone-300/80 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                    }`}
                  >
                    {short}
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <p className="mt-2 px-2 text-center text-[10px] leading-snug text-stone-500">
        {planLayoutSummary(home)} — layout aligned to plan series and lot sqft.
      </p>
    </div>
  )
}
