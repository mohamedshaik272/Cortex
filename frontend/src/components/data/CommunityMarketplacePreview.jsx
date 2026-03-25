import { Link } from 'react-router-dom'
import { MARKETPLACE_PRODUCTS } from '../../data/marketplaceListings'

const PREVIEW_IDS = ['prod-gaf-timberline-hdz', 'prod-carrier-24vna', 'prod-aquajet-pro-50']

/**
 * Static cross-vertical product teaser — full prediction-linked bundles live on each home detail
 * and on Bridge intelligence.
 */
export function CommunityMarketplacePreview() {
  const items = PREVIEW_IDS.map((id) => MARKETPLACE_PRODUCTS.find((p) => p.id === id)).filter(
    Boolean,
  )

  return (
    <section aria-labelledby="marketplace-preview-heading" className="rounded-2xl border border-stone-400/35 bg-surface/40 p-6 ring-1 ring-stone-400/20">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="marketplace-preview-heading" className="font-display text-lg font-semibold text-ink">
            Marketplace preview
          </h2>
          <p className="mt-1 text-sm text-muted">
            Featured products across roofing, HVAC, and water heating. Open any home
            to see matched products and services for that property.
          </p>
        </div>
      </div>
      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {items.map((p) => (
          <li
            key={p.id}
            className="overflow-hidden rounded-xl border border-stone-400/30 bg-paper/90 ring-1 ring-stone-300/40"
          >
            <div className="aspect-[5/3] overflow-hidden bg-stone-200/70">
              <img src={p.imageUrl} alt={p.imageAlt} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="p-3">
              <p className="text-[10px] font-bold uppercase text-stone-500">{p.brand}</p>
              <p className="mt-0.5 text-sm font-semibold leading-snug text-ink">{p.name}</p>
              <p className="mt-1 text-xs text-terracotta">
                ${p.priceMinUsd.toLocaleString()}–${p.priceMaxUsd.toLocaleString()}
              </p>
              <p className="mt-2 line-clamp-2 text-[11px] text-stone-600">{p.logistics.leadTime}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
