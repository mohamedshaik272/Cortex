import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DataFilterBar from '../components/data/DataFilterBar';
import Header from '../components/Header';
import HouseCard from '../components/data/HouseCard';
import HouseDetailView from '../components/data/HouseDetailView';
import NeighborhoodMap from '../components/map/NeighborhoodMap';
import { houses, NEIGHBORHOOD } from '../data/neighborhoodDemo';

export default function DataExplorerPage() {
  const [selectedId, setSelectedId] = useState(null);

  const selected = useMemo(
    () => houses.find((h) => h.id === selectedId) ?? null,
    [selectedId],
  );

  return (
    <div className="min-h-svh bg-canvas font-sans text-ink antialiased">
      <Header />

      <main className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {NEIGHBORHOOD.name} — {NEIGHBORHOOD.city}, {NEIGHBORHOOD.state}
          </h1>
          <p className="mt-2 text-sm text-muted">
            Explore homes in this neighborhood. Click a home on the map or in the list to see full details.
          </p>
        </div>

        <DataFilterBar />

        {/* Map */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-orange-200/30 ring-1 ring-orange-100/40" style={{ height: '420px' }}>
          <NeighborhoodMap
            houses={houses}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId(id)}
            center={NEIGHBORHOOD.center}
            zoom={NEIGHBORHOOD.zoom}
          />
        </div>

        {/* House cards */}
        <div className="mt-6">
          <p className="mb-4 text-sm text-muted">
            Showing {houses.length} results — select a home to view details.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {houses.map((h) => (
              <HouseCard
                key={h.id}
                house={h}
                isSelected={selectedId === h.id}
                onSelect={() => setSelectedId(selectedId === h.id ? null : h.id)}
              />
            ))}
          </div>
        </div>

        {/* Selected house detail */}
        {selected ? (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">
                {selected.address}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="btn-ghost"
              >
                &larr; Clear selection
              </button>
            </div>
            <HouseDetailView house={selected} />
          </div>
        ) : null}
        </div>
      </main>

      <footer className="border-t border-orange-200/20 bg-paper/30 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            to="/"
            className="btn-ghost text-sm"
          >
            &larr; Back to home
          </Link>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Cortex
          </p>
        </div>
      </footer>
    </div>
  );
}
