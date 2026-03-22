const TABS = [
  { key: 'community', label: 'Map & inventory' },
  { key: 'bridge', label: 'Analytics' },
  { key: 'partner', label: 'Partner view' },
]

export default function DataSubnav({ activeTab, onTabChange }) {
  return (
    <nav
      className="flex flex-wrap items-center gap-1 rounded-full bg-surface/80 p-1 ring-1 ring-orange-200/25"
      aria-label="Data workspace"
    >
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onTabChange(key)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition cursor-pointer ${
            activeTab === key
              ? 'bg-elevated text-ink ring-1 ring-orange-200/40'
              : 'text-muted hover:text-ink'
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
