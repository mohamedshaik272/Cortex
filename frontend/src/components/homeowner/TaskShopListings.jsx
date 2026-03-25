export function TaskShopListings({ pair }) {
  return (
    <div className="mt-5 border-t border-stone-400/25 pt-5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
        Shop & book
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <a
          href={pair.product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col overflow-hidden rounded-xl border border-stone-400/40 bg-white/95 ring-1 ring-stone-300/50 transition hover:border-accent/40 hover:ring-orange-200/60"
        >
          <div className="aspect-[16/10] w-full overflow-hidden bg-stone-200/80">
            <img
              src={pair.product.imageUrl}
              alt={pair.product.imageAlt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition group-hover:scale-[1.02]"
            />
          </div>
          <div className="flex flex-1 flex-col p-3">
            <span className="text-[10px] font-bold uppercase text-terracotta">Product</span>
            <p className="mt-1 text-sm font-semibold leading-snug text-ink group-hover:text-accent">
              {pair.product.name}
            </p>
            <p className="mt-1 text-xs text-terracotta">{pair.product.priceDisplay}</p>
            <p className="mt-1 text-[11px] text-stone-500">{pair.product.retailer}</p>
            <span className="mt-3 text-xs font-semibold text-accent group-hover:underline">
              View listing →
            </span>
          </div>
        </a>

        <a
          href={pair.service.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col overflow-hidden rounded-xl border border-stone-400/40 bg-white/95 ring-1 ring-stone-300/50 transition hover:border-accent/40 hover:ring-orange-200/60"
        >
          <div className="aspect-[16/10] w-full overflow-hidden bg-stone-200/80">
            <img
              src={pair.service.imageUrl}
              alt={pair.service.imageAlt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition group-hover:scale-[1.02]"
            />
          </div>
          <div className="flex flex-1 flex-col p-3">
            <span className="text-[10px] font-bold uppercase text-emerald-800">Service</span>
            <p className="mt-1 text-sm font-semibold leading-snug text-ink group-hover:text-accent">
              {pair.service.name}
            </p>
            <p className="mt-1 text-xs text-terracotta">{pair.service.priceDisplay}</p>
            <p className="mt-1 text-[11px] text-stone-500">{pair.service.providerLabel}</p>
            <span className="mt-3 text-xs font-semibold text-accent group-hover:underline">
              Open booking / quotes →
            </span>
          </div>
        </a>
      </div>
    </div>
  )
}
