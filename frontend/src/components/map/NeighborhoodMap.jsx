import { Fragment, useEffect, useRef, useState } from 'react';
import {
  CircleMarker,
  LayersControl,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const { BaseLayer } = LayersControl;

function formatServiceValueShort(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n}`;
}

function InitView({ center, zoom }) {
  const map = useMap();
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
}

export default function NeighborhoodMap({
  houses,
  selectedId,
  onSelect,
  center,
  zoom,
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {!mounted ? (
        <div
          className="flex h-full min-h-[360px] items-center justify-center bg-surface/50 text-sm text-muted"
          aria-hidden
        >
          Loading map...
        </div>
      ) : null}
      {mounted ? (
        <Fragment>
          <MapContainer
            center={center}
            zoom={zoom}
            className="relative z-0 h-full min-h-[360px] w-full"
            scrollWheelZoom
            aria-label="Neighborhood map"
          >
            <InitView center={center} zoom={zoom} />
            <LayersControl position="bottomright">
              <BaseLayer checked name="Map">
                <TileLayer
                  attribution='&copy; OSM &copy; CARTO'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
              </BaseLayer>
              <BaseLayer name="Satellite">
                <TileLayer
                  attribution='&copy; Esri'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
              </BaseLayer>
            </LayersControl>
            {houses.map((h) => {
              const isSel = selectedId === h.id;
              return (
                <CircleMarker
                  key={h.id}
                  center={[h.lat, h.lng]}
                  radius={isSel ? 14 : 10}
                  pathOptions={{
                    color: isSel ? '#7c2d12' : '#6b5d4d',
                    weight: isSel ? 3 : 2,
                    fillColor: isSel ? '#ea580c' : '#e5dcd0',
                    fillOpacity: isSel ? 0.95 : 0.85,
                  }}
                  eventHandlers={{
                    click: () => onSelect(h.id),
                  }}
                >
                  <Popup className="cortex-popup">
                    <div className="min-w-[200px] font-sans text-ink">
                      <p className="font-display text-sm font-semibold text-ink">
                        {h.address}
                      </p>
                      <p className="mt-1 text-xs font-medium text-terracotta">
                        {formatServiceValueShort(h.annualServiceValue)}/yr
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        Annual service value
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {h.beds} bd &middot; {h.baths} ba &middot; {h.sqft.toLocaleString()} sqft
                      </p>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>

          <div className="pointer-events-none absolute left-3 top-3 z-[400] rounded-lg bg-elevated/95 px-3 py-2 text-sm font-medium text-ink shadow-md ring-1 ring-orange-200/30">
            {houses.length} of {houses.length} homes
          </div>

          <div className="pointer-events-none absolute bottom-12 right-12 z-[400] flex flex-col gap-1 rounded-lg bg-elevated/90 px-2 py-1.5 text-xs text-muted ring-1 ring-orange-200/20">
            <span>Click marker to view details</span>
          </div>
        </Fragment>
      ) : null}
    </div>
  );
}
