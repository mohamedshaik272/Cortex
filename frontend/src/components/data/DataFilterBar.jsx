import { NEIGHBORHOOD } from '../../data/neighborhoodDemo';

const baseInput =
  'h-11 rounded-lg border border-orange-200/40 bg-elevated/80 px-4 text-sm text-ink placeholder:text-muted ring-1 ring-orange-200/20 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors';

const selectClass =
  `${baseInput} w-44 appearance-none cursor-pointer bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b5d4d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-9`;

export default function DataFilterBar() {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-orange-200/30 bg-paper/90 px-4 py-3 ring-1 ring-orange-100/40 sm:px-6 sm:py-4">
      <div className="flex flex-1 flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder={`${NEIGHBORHOOD.name}, ${NEIGHBORHOOD.city} ${NEIGHBORHOOD.state}`}
          className={`${baseInput} min-w-0 flex-1`}
          aria-label="Search location"
        />
        <select className={selectClass} aria-label="Home type">
          <option value="">All types</option>
          <option value="house">House</option>
          <option value="townhouse">Townhouse</option>
          <option value="condo">Condo</option>
        </select>
        <select className={selectClass} aria-label="Sort">
          <option value="demand">Demand</option>
          <option value="price-asc">Price: low → high</option>
          <option value="price-desc">Price: high → low</option>
          <option value="sqft">Sq ft</option>
        </select>
      </div>
      <button type="button" className="btn-primary h-11">
        Save search
      </button>
    </div>
  );
}
