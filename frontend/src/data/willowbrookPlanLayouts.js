/** Base finished sqft used to stretch/shrink the normalized footprint per lot. */
const BASE_SQFT = {
  Cambridge: 2680,
  Bishop: 3020,
  Alder: 3350,
}

function scaleAroundCenter(p, s, cx = 50, cy = 50) {
  return { x: cx + (p.x - cx) * s, y: cy + (p.y - cy) * s }
}

function scalePath(corners, s) {
  return corners.map(([x, y]) => {
    const q = scaleAroundCenter({ x, y }, s)
    return [q.x, q.y]
  })
}

/**
 * Meridian phase-I single-story + front-load garage layouts.
 * Cambridge: compact 4-bed wing; Bishop: wider 5-bed; Alder: largest with bonus flex.
 */
const PLAN_ROOMS = {
  Cambridge: [
    {
      id: 'garage',
      label: 'Garage',
      fill: '#ddd9d0',
      corners: [
        [4, 44],
        [38, 44],
        [38, 97],
        [4, 97],
      ],
    },
    {
      id: 'mud-laundry',
      label: 'Laundry / mud',
      fill: '#ece6db',
      corners: [
        [38, 44],
        [52, 44],
        [52, 62],
        [38, 62],
      ],
    },
    {
      id: 'living',
      label: 'Great room',
      fill: '#f2eee6',
      corners: [
        [38, 24],
        [62, 24],
        [62, 44],
        [38, 44],
      ],
    },
    {
      id: 'kitchen',
      label: 'Kitchen',
      fill: '#efe8dc',
      corners: [
        [62, 22],
        [84, 22],
        [84, 50],
        [62, 50],
      ],
    },
    {
      id: 'hall',
      label: 'Hall',
      fill: '#f4f0e7',
      corners: [
        [62, 50],
        [78, 50],
        [78, 62],
        [62, 62],
      ],
    },
    {
      id: 'mech',
      label: 'Mech',
      fill: '#eeece6',
      corners: [
        [84, 22],
        [95, 22],
        [95, 48],
        [84, 48],
      ],
    },
    {
      id: 'bed2',
      label: 'Bed 2',
      fill: '#e9ddca',
      corners: [
        [6, 58],
        [30, 58],
        [30, 82],
        [6, 82],
      ],
    },
    {
      id: 'bed3',
      label: 'Bed 3',
      fill: '#e9ddca',
      corners: [
        [30, 58],
        [52, 58],
        [52, 82],
        [30, 82],
      ],
    },
    {
      id: 'bed4',
      label: 'Bed 4',
      fill: '#e9ddca',
      corners: [
        [52, 58],
        [74, 58],
        [74, 72],
        [52, 72],
      ],
    },
    {
      id: 'primary',
      label: 'Primary suite',
      fill: '#e2d3bf',
      corners: [
        [52, 72],
        [80, 72],
        [80, 96],
        [52, 96],
      ],
    },
  ],
  Bishop: [
    {
      id: 'garage',
      label: 'Garage',
      fill: '#ddd9d0',
      corners: [
        [2, 42],
        [40, 42],
        [40, 97],
        [2, 97],
      ],
    },
    {
      id: 'mud-laundry',
      label: 'Laundry / mud',
      fill: '#ece6db',
      corners: [
        [40, 42],
        [56, 42],
        [56, 62],
        [40, 62],
      ],
    },
    {
      id: 'living',
      label: 'Great room',
      fill: '#f2eee6',
      corners: [
        [36, 22],
        [64, 22],
        [64, 42],
        [36, 42],
      ],
    },
    {
      id: 'kitchen',
      label: 'Kitchen',
      fill: '#efe8dc',
      corners: [
        [64, 20],
        [90, 20],
        [90, 52],
        [64, 52],
      ],
    },
    {
      id: 'hall',
      label: 'Hall',
      fill: '#f4f0e7',
      corners: [
        [64, 52],
        [82, 52],
        [82, 64],
        [64, 64],
      ],
    },
    {
      id: 'mech',
      label: 'Mech',
      fill: '#eeece6',
      corners: [
        [90, 20],
        [98, 20],
        [98, 46],
        [90, 46],
      ],
    },
    {
      id: 'bed2',
      label: 'Bed 2',
      fill: '#e9ddca',
      corners: [
        [4, 56],
        [26, 56],
        [26, 80],
        [4, 80],
      ],
    },
    {
      id: 'bed3',
      label: 'Bed 3',
      fill: '#e9ddca',
      corners: [
        [26, 56],
        [48, 56],
        [48, 80],
        [26, 80],
      ],
    },
    {
      id: 'bed4',
      label: 'Bed 4',
      fill: '#e9ddca',
      corners: [
        [48, 56],
        [70, 56],
        [70, 80],
        [48, 80],
      ],
    },
    {
      id: 'bed5',
      label: 'Bed 5',
      fill: '#e9ddca',
      corners: [
        [70, 56],
        [90, 56],
        [90, 80],
        [70, 80],
      ],
    },
    {
      id: 'primary',
      label: 'Primary suite',
      fill: '#e2d3bf',
      corners: [
        [52, 70],
        [84, 70],
        [84, 96],
        [52, 96],
      ],
    },
  ],
  Alder: [
    {
      id: 'garage',
      label: 'Garage',
      fill: '#ddd9d0',
      corners: [
        [0, 40],
        [42, 40],
        [42, 97],
        [0, 97],
      ],
    },
    {
      id: 'mud-laundry',
      label: 'Laundry / mud',
      fill: '#ece6db',
      corners: [
        [42, 40],
        [58, 40],
        [58, 60],
        [42, 60],
      ],
    },
    {
      id: 'living',
      label: 'Great room',
      fill: '#f2eee6',
      corners: [
        [34, 18],
        [66, 18],
        [66, 40],
        [34, 40],
      ],
    },
    {
      id: 'kitchen',
      label: 'Kitchen + pantry',
      fill: '#efe8dc',
      corners: [
        [66, 16],
        [96, 16],
        [96, 54],
        [66, 54],
      ],
    },
    {
      id: 'bed5-flex',
      label: 'Bed 5 / flex',
      fill: '#e9ddca',
      corners: [
        [18, 18],
        [34, 18],
        [34, 38],
        [18, 38],
      ],
    },
    {
      id: 'hall',
      label: 'Hall',
      fill: '#f4f0e7',
      corners: [
        [66, 54],
        [86, 54],
        [86, 66],
        [66, 66],
      ],
    },
    {
      id: 'mech',
      label: 'Mech',
      fill: '#eeece6',
      corners: [
        [96, 16],
        [100, 16],
        [100, 44],
        [96, 44],
      ],
    },
    {
      id: 'bed2',
      label: 'Bed 2',
      fill: '#e9ddca',
      corners: [
        [2, 54],
        [24, 54],
        [24, 78],
        [2, 78],
      ],
    },
    {
      id: 'bed3',
      label: 'Bed 3',
      fill: '#e9ddca',
      corners: [
        [24, 54],
        [46, 54],
        [46, 78],
        [24, 78],
      ],
    },
    {
      id: 'bed4',
      label: 'Bed 4',
      fill: '#e9ddca',
      corners: [
        [46, 54],
        [68, 54],
        [68, 78],
        [46, 78],
      ],
    },
    {
      id: 'primary',
      label: 'Primary suite',
      fill: '#e2d3bf',
      corners: [
        [50, 68],
        [88, 68],
        [88, 96],
        [50, 96],
      ],
    },
  ],
}

function roomBounds(corners) {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const [x, y] of corners) {
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
  }
  return { minX, minY, maxX, maxY }
}

/**
 * Node anchors are expressed relative to room bounds:
 * - u: 0 (left wall) -> 1 (right wall)
 * - v: 0 (top wall)  -> 1 (bottom wall)
 */
const PLAN_NODE_ANCHORS = {
  Cambridge: {
    'n-fridge': { roomId: 'kitchen', u: 0.4, v: 0.35 },
    'n-range': { roomId: 'kitchen', u: 0.74, v: 0.5 },
    'n-dishwasher': { roomId: 'kitchen', u: 0.18, v: 0.6 },
    'n-laundry': { roomId: 'mud-laundry', u: 0.5, v: 0.58 },
    'n-wh': { roomId: 'mech', u: 0.72, v: 0.58 },
    'n-hvac': { roomId: 'mech', u: 0.28, v: 0.26 },
    'n-panel': { roomId: 'garage', u: 0.2, v: 0.62 },
    'n-roof': { roomId: 'living', u: 0.55, v: 0.14 },
    'n-bath': { roomId: 'primary', u: 0.52, v: 0.45 },
    'n-garage': { roomId: 'garage', u: 0.24, v: 0.83 },
  },
  Bishop: {
    'n-fridge': { roomId: 'kitchen', u: 0.4, v: 0.32 },
    'n-range': { roomId: 'kitchen', u: 0.76, v: 0.46 },
    'n-dishwasher': { roomId: 'kitchen', u: 0.18, v: 0.58 },
    'n-laundry': { roomId: 'mud-laundry', u: 0.48, v: 0.56 },
    'n-wh': { roomId: 'mech', u: 0.76, v: 0.62 },
    'n-hvac': { roomId: 'mech', u: 0.2, v: 0.24 },
    'n-panel': { roomId: 'garage', u: 0.18, v: 0.6 },
    'n-roof': { roomId: 'living', u: 0.56, v: 0.14 },
    'n-bath': { roomId: 'primary', u: 0.54, v: 0.44 },
    'n-garage': { roomId: 'garage', u: 0.24, v: 0.84 },
  },
  Alder: {
    'n-fridge': { roomId: 'kitchen', u: 0.4, v: 0.32 },
    'n-range': { roomId: 'kitchen', u: 0.76, v: 0.45 },
    'n-dishwasher': { roomId: 'kitchen', u: 0.18, v: 0.56 },
    'n-laundry': { roomId: 'mud-laundry', u: 0.47, v: 0.56 },
    'n-wh': { roomId: 'mech', u: 0.76, v: 0.62 },
    'n-hvac': { roomId: 'mech', u: 0.2, v: 0.24 },
    'n-panel': { roomId: 'garage', u: 0.16, v: 0.58 },
    'n-roof': { roomId: 'living', u: 0.58, v: 0.14 },
    'n-bath': { roomId: 'primary', u: 0.56, v: 0.42 },
    'n-garage': { roomId: 'garage', u: 0.24, v: 0.82 },
  },
}

export function layoutScale(home) {
  const base = BASE_SQFT[home.planName]
  return Math.sqrt(home.sqft / base)
}

/** Scaled room quads for this lot's sqft vs plan baseline. */
export function roomsForHome(home) {
  const s = layoutScale(home)
  return PLAN_ROOMS[home.planName].map((r) => ({
    ...r,
    corners: scalePath(r.corners, s),
  }))
}

/** Hotspot center for a node id — matches isometric projection. */
export function hotspotFor(home, nodeId) {
  const anchors = PLAN_NODE_ANCHORS[home.planName]
  const anchor = anchors[nodeId]
  if (!anchor) return { x: 50, y: 50 }

  const scaledRooms = roomsForHome(home)
  const room = scaledRooms.find((r) => r.id === anchor.roomId)
  if (!room) return { x: 50, y: 50 }

  const b = roomBounds(room.corners)
  return {
    x: b.minX + (b.maxX - b.minX) * anchor.u,
    y: b.minY + (b.maxY - b.minY) * anchor.v,
  }
}

export function planLayoutSummary(home) {
  return `${home.planName} · ~${BASE_SQFT[home.planName].toLocaleString()} ft² baseline · ${home.sqft.toLocaleString()} ft² this lot (footprint scaled)`
}

const ISO = Math.PI / 6
const COS = Math.cos(ISO)
const SIN = Math.sin(ISO)

/** Project normalized floor coords (0–100) into isometric SVG space. */
export function floorToIsoSvg(fx, fy, k) {
  return {
    x: (fx - fy) * COS * k,
    y: (fx + fy - 100) * SIN * k,
  }
}

export { PLAN_ROOMS, BASE_SQFT }
