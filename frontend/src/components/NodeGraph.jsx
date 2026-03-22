import { useEffect, useRef, useState } from 'react';

/* ─── topology ────────────────────────────────────────────────── */

const ALL_NODES = [
  { id: 'home',         label: 'Home',         x: 400, y: 250, isCenter: true },
  { id: 'hvac',         label: 'HVAC',         x: 400, y:  80 },
  { id: 'electrical',   label: 'Electrical',   x: 585, y: 120 },
  { id: 'appliances',   label: 'Appliances',   x: 675, y: 260 },
  { id: 'plumbing',     label: 'Plumbing',     x: 585, y: 390 },
  { id: 'water-heater', label: 'Water Heater', x: 400, y: 425 },
  { id: 'gas',          label: 'Gas',          x: 215, y: 390 },
  { id: 'roof',         label: 'Roof',         x: 125, y: 260 },
  { id: 'climate',      label: 'Climate',      x: 215, y: 120 },
  { id: 'insulation',   label: 'Insulation',   x: 150, y: 175 },
  { id: 'solar',        label: 'Solar',        x: 300, y:  58 },
  { id: 'ventilation',  label: 'Ventilation',  x: 510, y:  58 },
  { id: 'foundation',   label: 'Foundation',   x: 675, y: 175 },
  { id: 'drainage',     label: 'Drainage',     x: 695, y: 345 },
  { id: 'septic',       label: 'Septic',       x: 500, y: 440 },
  { id: 'thermostat',   label: 'Thermostat',   x: 300, y: 440 },
  { id: 'fire-safety',  label: 'Fire Safety',  x: 110, y: 340 },
];

const ALL_EDGES = [
  { from: 'home', to: 'hvac' },
  { from: 'home', to: 'electrical' },
  { from: 'home', to: 'appliances' },
  { from: 'home', to: 'plumbing' },
  { from: 'home', to: 'water-heater' },
  { from: 'home', to: 'gas' },
  { from: 'home', to: 'roof' },
  { from: 'home', to: 'climate' },
  { from: 'gas', to: 'hvac' },
  { from: 'gas', to: 'water-heater' },
  { from: 'electrical', to: 'appliances' },
  { from: 'electrical', to: 'hvac' },
  { from: 'plumbing', to: 'water-heater' },
  { from: 'climate', to: 'hvac' },
  { from: 'climate', to: 'roof' },
  { from: 'roof', to: 'insulation' },
  { from: 'climate', to: 'insulation' },
  { from: 'solar', to: 'electrical' },
  { from: 'solar', to: 'roof' },
  { from: 'hvac', to: 'ventilation' },
  { from: 'electrical', to: 'ventilation' },
  { from: 'foundation', to: 'plumbing' },
  { from: 'foundation', to: 'electrical' },
  { from: 'drainage', to: 'plumbing' },
  { from: 'drainage', to: 'foundation' },
  { from: 'septic', to: 'plumbing' },
  { from: 'septic', to: 'water-heater' },
  { from: 'thermostat', to: 'hvac' },
  { from: 'thermostat', to: 'gas' },
  { from: 'fire-safety', to: 'gas' },
  { from: 'fire-safety', to: 'electrical' },
  { from: 'home', to: 'insulation' },
  { from: 'home', to: 'solar' },
  { from: 'home', to: 'ventilation' },
  { from: 'home', to: 'foundation' },
  { from: 'home', to: 'drainage' },
  { from: 'home', to: 'septic' },
  { from: 'home', to: 'thermostat' },
  { from: 'home', to: 'fire-safety' },
];

const CORE_IDS = [
  'home', 'hvac', 'electrical', 'appliances',
  'plumbing', 'water-heater', 'gas', 'roof', 'climate',
];
const OUTER_IDS = ALL_NODES
  .filter((n) => !CORE_IDS.includes(n.id))
  .map((n) => n.id);

/* ─── helpers ─────────────────────────────────────────────────── */

function pickRandom(arr, n) {
  const s = [...arr].sort(() => Math.random() - 0.5);
  return s.slice(0, n);
}

function createMotionParams() {
  const m = {};
  ALL_NODES.forEach((n) => {
    m[n.id] = {
      fx1: 0.12 + Math.random() * 0.14,
      fy1: 0.14 + Math.random() * 0.12,
      ax1: 14 + Math.random() * 14,
      ay1: 16 + Math.random() * 14,
      px1: Math.random() * Math.PI * 2,
      py1: Math.random() * Math.PI * 2,
      fx2: 0.35 + Math.random() * 0.3,
      fy2: 0.4 + Math.random() * 0.25,
      ax2: 5 + Math.random() * 6,
      ay2: 6 + Math.random() * 7,
      px2: Math.random() * Math.PI * 2,
      py2: Math.random() * Math.PI * 2,
    };
  });
  return m;
}

function createEdgeParticles() {
  const p = {};
  ALL_EDGES.forEach((e) => {
    const k = `${e.from}-${e.to}`;
    p[k] = {
      offset: Math.random(),
      speed: 0.08 + Math.random() * 0.1,
      size: 1.5 + Math.random() * 1,
    };
  });
  return p;
}

/* ─── component ───────────────────────────────────────────────── */

export default function NodeGraph() {
  const rafRef = useRef(null);
  const timeRef = useRef(0);
  const motionRef = useRef(createMotionParams());
  const particlesRef = useRef(createEdgeParticles());

  const opRef = useRef((() => {
    const o = {};
    CORE_IDS.forEach((id) => { o[id] = 1; });
    return o;
  })());
  const tgtRef = useRef((() => {
    const o = {};
    CORE_IDS.forEach((id) => { o[id] = 1; });
    return o;
  })());

  /* ── cycle outer nodes ── */
  useEffect(() => {
    const iv = setInterval(() => {
      const op = opRef.current;
      const tgt = tgtRef.current;
      const curOuter = OUTER_IDS.filter((id) => (op[id] || 0) > 0.1);
      const out = pickRandom(curOuter, Math.min(curOuter.length, 1 + Math.floor(Math.random() * 2)));
      const avail = OUTER_IDS.filter((id) => (op[id] || 0) < 0.02 && (tgt[id] || 0) < 0.02);
      const add = pickRandom(avail, Math.min(avail.length, 1 + Math.floor(Math.random() * 2)));
      out.forEach((id) => { tgt[id] = 0; });
      add.forEach((id) => { op[id] = 0; tgt[id] = 1; });
    }, 4500);
    return () => clearInterval(iv);
  }, []);

  /* ── animation loop ── */
  const [, setTick] = useState(0);
  useEffect(() => {
    let run = true;
    let last = performance.now();
    const step = (now) => {
      if (!run) return;
      const dt = (now - last) / 1000;
      timeRef.current += dt;
      last = now;

      const op = opRef.current;
      const tgt = tgtRef.current;
      const factor = 1 - Math.exp(-dt * 2.2);

      for (const id of Object.keys(tgt)) {
        const cur = op[id] ?? 0;
        const next = cur + (tgt[id] - cur) * factor;
        if (tgt[id] === 0 && next < 0.004) {
          delete op[id];
          delete tgt[id];
        } else {
          op[id] = next;
        }
      }

      setTick((tick) => tick + 1);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { run = false; cancelAnimationFrame(rafRef.current); };
  }, []);

  /* ── positions ── */
  const t = timeRef.current;
  const mp = motionRef.current;
  const ep = particlesRef.current;
  const op = opRef.current;

  const nodeMap = {};
  ALL_NODES.forEach((n) => {
    const m = mp[n.id];
    if (n.isCenter) {
      nodeMap[n.id] = {
        ...n,
        cx: n.x + Math.sin(t * 0.1) * 8 + Math.cos(t * 0.07) * 4,
        cy: n.y + Math.cos(t * 0.09) * 7 + Math.sin(t * 0.13) * 3,
      };
    } else {
      nodeMap[n.id] = {
        ...n,
        cx: n.x
          + Math.sin(t * m.fx1 + m.px1) * m.ax1
          + Math.sin(t * m.fx2 + m.px2) * m.ax2,
        cy: n.y
          + Math.sin(t * m.fy1 + m.py1) * m.ay1
          + Math.sin(t * m.fy2 + m.py2) * m.ay2,
      };
    }
  });

  const liveIds = ALL_NODES.map((n) => n.id).filter((id) => (op[id] || 0) > 0.005);
  const liveEdges = ALL_EDGES.filter(
    (e) => (op[e.from] || 0) > 0.005 && (op[e.to] || 0) > 0.005,
  );
  const eOp = (e) => Math.min(op[e.from] || 0, op[e.to] || 0);

  return (
    <svg
      viewBox="0 0 800 500"
      width="100%"
      className="mx-auto block select-none"
      aria-hidden="true"
      role="img"
      style={{ overflow: 'visible' }}
    >
      {/* ── lines ── */}
      {liveEdges.map((e) => {
        const a = nodeMap[e.from];
        const b = nodeMap[e.to];
        const isSpoke = e.from === 'home';
        return (
          <line
            key={`l-${e.from}-${e.to}`}
            x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy}
            stroke={isSpoke ? '#c2410c' : '#9a3412'}
            strokeWidth={isSpoke ? 1 : 0.6}
            strokeLinecap="round"
            opacity={eOp(e) * (isSpoke ? 0.18 : 0.1)}
          />
        );
      })}

      {/* ── particles ── */}
      {liveEdges.map((e) => {
        const a = nodeMap[e.from];
        const b = nodeMap[e.to];
        const k = `${e.from}-${e.to}`;
        const p = ep[k];
        if (!p) return null;
        const o = eOp(e);
        const pos = (t * p.speed + p.offset) % 1;
        const px = a.cx + (b.cx - a.cx) * pos;
        const py = a.cy + (b.cy - a.cy) * pos;
        const fade = Math.min(pos * 5, (1 - pos) * 5, 1);
        return (
          <circle
            key={`p-${k}`}
            cx={px} cy={py} r={p.size}
            fill="#ea580c"
            opacity={0.35 * o * fade}
          />
        );
      })}

      {/* ── nodes ── */}
      {liveIds.map((id) => {
        const n = nodeMap[id];
        const nop = op[id] || 0;

        if (n.isCenter) {
          const r = 12 + Math.sin(t * 0.5) * 1;
          return (
            <g key={id} opacity={nop}>
              <circle
                cx={n.cx} cy={n.cy} r={r}
                fill="#ea580c" stroke="#c2410c" strokeWidth={1.5}
              />
              <text
                x={n.cx} y={n.cy + 26}
                textAnchor="middle" fill="#2c2419"
                fontSize={12} fontWeight={600}
                fontFamily="Syne, system-ui, sans-serif"
                opacity={0.8}
              >
                {n.label}
              </text>
            </g>
          );
        }

        const r = 5 + Math.sin(t * 0.45 + n.x * 0.012) * 0.8;
        const sc = Math.max(nop, 0.15);
        return (
          <g key={id} opacity={nop}>
            <circle
              cx={n.cx} cy={n.cy} r={r * sc}
              fill="#e5dcd0" stroke="#6b5d4d" strokeWidth={1}
              strokeOpacity={0.25}
            />
            <text
              x={n.cx} y={n.cy + 18}
              textAnchor="middle" fill="#6b5d4d"
              fontSize={10} fontWeight={500}
              fontFamily="DM Sans, system-ui, sans-serif"
              opacity={nop > 0.7 ? 0.65 : 0}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
