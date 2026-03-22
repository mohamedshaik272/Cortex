function formatServiceValue(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

export default function HouseCard({ house, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border p-4 text-left transition cursor-pointer ${
        isSelected
          ? 'border-accent bg-orange-50/80 ring-2 ring-orange-300/60'
          : 'border-orange-200/30 bg-paper/80 hover:border-orange-300/50 hover:bg-orange-50/40'
      }`}
    >
      <div className="relative mb-2 aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface/60 ring-1 ring-orange-200/20">
        <img
          src={house.imageUrl}
          alt={house.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <p className="font-display text-base font-semibold text-ink">
        {formatServiceValue(house.annualServiceValue)}
        <span className="ml-1 font-normal text-muted">/yr</span>
      </p>
      <p className="mt-0.5 text-xs text-muted">
        Estimated annual service value
      </p>
      <p className="mt-1 text-sm text-muted">
        {house.beds} bds &middot; {house.baths} ba &middot; {house.sqft.toLocaleString()} sqft
      </p>
      <p className="mt-0.5 text-xs text-muted">{house.address}</p>
      <p className="mt-0.5 text-xs text-muted">{house.homeType}</p>
    </button>
  );
}
