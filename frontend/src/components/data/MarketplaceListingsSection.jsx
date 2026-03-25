import { Link } from 'react-router-dom'
import { bundleForNeeds } from '../../data/marketplaceListings'
import { getPredictedVerticalsForHome } from '../../lib/predictionNeeds'

const VERTICAL_LABELS = {
  roof: 'Roof',
  hvac: 'HVAC',
  water_heater: 'Hot water',
  electrical_panel: 'Electrical',
  storm_envelope: 'Envelope / storm',
}

function formatPriceRange(min, max, perUnit) {
  const u = perUnit ? '/ lin. ft' : ''
  return `$${min.toLocaleString()}–$${max.toLocaleString()}${u}`
}

function VerticalLabel({ id }) {
  return (
    <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-terracotta ring-1 ring-orange-200/60">
      {VERTICAL_LABELS[id]}
    </span>
  )
}

export function MarketplaceListingsSection({ house }) {
  const predicted = getPredictedVerticalsForHome(house)
  const { pairs } = bundleForNeeds(predicted.map((p) => p.id))

  if (pairs.length === 0) {
    return (
      <section className="rounded-xl border border-dashed border-stone-400/50 bg-surface/40 p-5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-terracotta">
          Products & services
        </h3>
        <p className="mt-2 text-sm text-muted">
          No major replacements are flagged for this home right now. Browse the{' '}
          <Link to="/data" className="font-medium text-accent hover:text-terracotta">
            data workspace
          </Link>{' '}
          for community-wide analytics.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-xl border border-orange-200/70 bg-gradient-to-b from-orange-50/60 to-paper/80 p-5 ring-1 ring-orange-200/40">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-terracotta">
            Recommended products & services
          </h3>
          <p className="mt-1 text-xs text-muted">
            Matched to this home's equipment age and condition. Pricing and availability
            for the Gaithersburg area.
          </p>
        </div>
      </div>

      <ul className="mt-5 space-y-8">
        {predicted.map((need) => {
          const row = pairs.find((p) => p.need === need.id)
          if (!row) return null
          const { product, service } = row
          return (
            <li key={need.id} className="border-t border-stone-400/25 pt-6 first:border-t-0 first:pt-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <VerticalLabel id={need.id} />
                <p className="text-sm font-medium text-ink">{need.label}</p>
              </div>
              <p className="text-xs text-stone-600">
                <span className="font-medium text-ink">Why:</span> {need.reason}
              </p>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <article className="overflow-hidden rounded-xl border border-stone-300/50 bg-white/90 ring-1 ring-stone-200/60">
                  <div className="aspect-[16/10] w-full overflow-hidden bg-stone-200/80">
                    <img
                      src={product.imageUrl}
                      alt={product.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-stone-500">
                      Product
                    </p>
                    <p className="font-display text-base font-semibold text-ink">{product.name}</p>
                    <p className="text-xs text-muted">
                      {product.brand} · {product.model}
                    </p>
                    <p className="font-display text-lg font-semibold text-terracotta">
                      {formatPriceRange(
                        product.priceMinUsd,
                        product.priceMaxUsd,
                        product.priceMaxUsd < 100,
                      )}
                    </p>
                    <p className="text-xs text-stone-600">{product.matchesPrediction}</p>
                    <dl className="mt-2 space-y-1 border-t border-stone-200/80 pt-2 text-[11px] text-stone-600">
                      <div>
                        <dt className="font-medium text-ink">Lead time</dt>
                        <dd>{product.logistics.leadTime}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-ink">Fulfillment</dt>
                        <dd>{product.logistics.fulfillment}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-ink">Notes</dt>
                        <dd>{product.logistics.notes}</dd>
                      </div>
                    </dl>
                  </div>
                </article>

                <article className="overflow-hidden rounded-xl border border-stone-300/50 bg-white/90 ring-1 ring-stone-200/60">
                  <div className="aspect-[16/10] w-full overflow-hidden bg-stone-200/80">
                    <img
                      src={service.imageUrl}
                      alt={service.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-stone-500">
                      Service
                    </p>
                    <p className="font-display text-base font-semibold text-ink">{service.name}</p>
                    <p className="text-xs text-muted">{service.providerLabel}</p>
                    <p className="font-display text-lg font-semibold text-terracotta">
                      {formatPriceRange(service.priceMinUsd, service.priceMaxUsd)}
                    </p>
                    <p className="text-xs text-stone-600">{service.matchesPrediction}</p>
                    <dl className="mt-2 space-y-1 border-t border-stone-200/80 pt-2 text-[11px] text-stone-600">
                      <div>
                        <dt className="font-medium text-ink">Scheduling</dt>
                        <dd>{service.logistics.scheduling}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-ink">Service area</dt>
                        <dd>{service.logistics.serviceArea}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-ink">On-site duration</dt>
                        <dd>{service.logistics.jobDuration}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
