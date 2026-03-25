import { useState } from 'react'
import { satelliteTileImageUrl } from '../../lib/mapTiles'
import { IsometricFloorPlan } from './IsometricFloorPlan'

const CAT_DOT = {
  appliance: 'bg-orange-600',
  maintenance: 'bg-blue-600',
  hardware: 'bg-amber-900',
  utility: 'bg-cyan-700',
}

export default function HomeSiteVisualization({
  home,
  lat,
  lng,
  address,
  planLabel,
  nodes,
  selectedId,
  onSelect,
}) {
  const [mode, setMode] = useState('floorplan')

  const satUrl = satelliteTileImageUrl(lat, lng, 20)
  const satWideUrl = satelliteTileImageUrl(lat, lng, 19)
  const osmHref = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=19/${lat}/${lng}`

  return (
    <div className="overflow-hidden rounded-2xl ring-1 ring-stone-400/40">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-400/30 bg-paper/95 px-3 py-2 sm:px-4">
        <p className="text-xs font-medium text-stone-600">Property visualization</p>
        <div
          className="flex rounded-full bg-stone-200/80 p-0.5 ring-1 ring-stone-400/40"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'floorplan'}
            onClick={() => setMode('floorplan')}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              mode === 'floorplan'
                ? 'bg-white text-ink shadow-sm ring-1 ring-stone-400/50'
                : 'text-muted hover:text-ink'
            }`}
          >
            Floor plan
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'satellite'}
            onClick={() => setMode('satellite')}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              mode === 'satellite'
                ? 'bg-white text-ink shadow-sm ring-1 ring-stone-400/50'
                : 'text-muted hover:text-ink'
            }`}
          >
            Satellite (lot)
          </button>
        </div>
      </div>

      <div className="relative min-h-[min(420px,52vh)] bg-stone-200/40">
        {mode === 'floorplan' ? (
          <div className="p-4 sm:p-6">
            <p className="mb-3 text-center text-[11px] leading-snug text-stone-500">{planLabel}</p>
            <IsometricFloorPlan
              home={home}
              nodes={nodes}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900/90 sm:aspect-[16/10]">
              <img
                src={satUrl}
                alt={`Satellite imagery centered on property location for ${address}`}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-display text-sm font-semibold drop-shadow">Your lot (z20 tile)</p>
                <p className="mt-0.5 text-xs text-white/90 drop-shadow">
                  Esri World Imagery &middot; centered on your property
                </p>
              </div>
            </div>
            <div className="border-t border-stone-400/30 bg-paper/95 p-4">
              <p className="text-xs font-medium text-ink">Neighborhood view</p>
              <div className="mt-2 overflow-hidden rounded-lg ring-1 ring-stone-400/40">
                <img
                  src={satWideUrl}
                  alt="Neighborhood context satellite view"
                  className="h-36 w-full object-cover sm:h-44"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-stone-500">
                <span>
                  {address} &middot; {lat.toFixed(5)}, {lng.toFixed(5)}
                </span>
                <a
                  href={osmHref}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-accent hover:text-terracotta"
                >
                  Open in OpenStreetMap ↗
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 border-t border-stone-400/25 bg-paper/80 px-4 py-2.5 text-[11px] text-stone-600">
        <span className="font-medium text-ink">Floor plan pins:</span>
        {[
          ['appliance', 'Appliance'],
          ['maintenance', 'Maintenance'],
          ['hardware', 'Hardware'],
          ['utility', 'Utility'],
        ].map(([k, label]) => (
          <span key={k} className="inline-flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${CAT_DOT[k]}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
