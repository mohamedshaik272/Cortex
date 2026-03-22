import { useEffect, useRef, useState } from 'react'

function FilterSelect({ value, onChange, options, placeholder, label }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const selected = options.find((o) => o.value === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex cursor-pointer items-center gap-2 rounded-xl border border-orange-200/30 bg-elevated/80 px-3 py-2 text-sm ring-1 ring-orange-200/20 transition-colors hover:border-accent/30 ${
          open ? 'border-accent/40 ring-2 ring-accent/20' : ''
        }`}
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className={selected ? 'text-ink' : 'text-muted'}>
          {selected?.label ?? placeholder}
        </span>
        <svg
          className={`h-3.5 w-3.5 text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-30 mt-1 min-w-full overflow-hidden rounded-xl border border-orange-200/30 bg-elevated py-1 shadow-lg ring-1 ring-orange-100/40"
          role="listbox"
          aria-label={label}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={value === option.value}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              className={`flex w-full cursor-pointer items-center px-3 py-2 text-left text-sm transition-colors hover:bg-accent-soft/60 ${
                value === option.value
                  ? 'font-medium text-accent'
                  : 'text-ink'
              }`}
            >
              {option.label}
              {value === option.value && (
                <svg
                  className="ml-auto h-4 w-4 text-accent"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const PLAN_OPTIONS = [
  { value: '', label: 'All plans' },
  { value: 'Cambridge', label: 'Cambridge' },
  { value: 'Bishop', label: 'Bishop' },
  { value: 'Alder', label: 'Alder' },
]

const BEDS_OPTIONS = [
  { value: '', label: 'Beds' },
  { value: '4', label: '4+ beds' },
  { value: '5', label: '5+ beds' },
]

const BATHS_OPTIONS = [
  { value: '', label: 'Baths' },
  { value: '3', label: '3+ baths' },
  { value: '3.5', label: '3.5+ baths' },
  { value: '4', label: '4+ baths' },
]

const SORT_OPTIONS = [
  { value: 'service', label: 'Annual service opportunity' },
  { value: 'risk', label: 'Portfolio risk' },
  { value: 'sqft', label: 'Square footage' },
  { value: 'year', label: 'Year built' },
]

export default function SubdivisionFilterBar({
  value,
  onChange,
  resultCount,
  totalInSubdivision,
}) {
  return (
    <div className="bg-surface/40 px-4 py-2.5 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2">
        <input
          type="search"
          value={value.search}
          onChange={(e) => onChange({ ...value, search: e.target.value })}
          placeholder="Search address, appliances, HVAC..."
          className="min-w-[180px] flex-1 rounded-xl border border-orange-200/30 bg-elevated/80 px-3 py-2 text-sm text-ink placeholder:text-muted ring-1 ring-orange-200/20 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
          aria-label="Search property features"
        />
        <FilterSelect
          value={value.plan}
          onChange={(v) => onChange({ ...value, plan: v })}
          options={PLAN_OPTIONS}
          placeholder="All plans"
          label="Floor plan"
        />
        <FilterSelect
          value={value.minBeds}
          onChange={(v) => onChange({ ...value, minBeds: v })}
          options={BEDS_OPTIONS}
          placeholder="Beds"
          label="Minimum bedrooms"
        />
        <FilterSelect
          value={value.minBaths}
          onChange={(v) => onChange({ ...value, minBaths: v })}
          options={BATHS_OPTIONS}
          placeholder="Baths"
          label="Minimum bathrooms"
        />
        <FilterSelect
          value={value.sort}
          onChange={(v) => onChange({ ...value, sort: v })}
          options={SORT_OPTIONS}
          placeholder="Sort"
          label="Sort"
        />
        <span className="text-xs text-muted">
          <span className="font-semibold text-ink">{resultCount}</span>/{totalInSubdivision}
        </span>
      </div>
    </div>
  )
}
