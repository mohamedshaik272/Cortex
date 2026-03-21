const NAV_ITEMS = [
  { icon: "dashboard", label: "Overview", page: "dashboard" },
  { icon: "psychology", label: "Advisor", page: "advisor" },
  { icon: "build", label: "Maintenance", page: "maintenance" },
  { icon: "storefront", label: "Market", page: "marketplace" },
];

export default function SideNav({ activePage, onNavigate }) {
  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col items-center py-8 z-50 w-20 border-r border-outline-variant/15"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Logo — click to go home */}
      <button
        onClick={() => onNavigate("landing")}
        className="mb-12 text-primary font-bold tracking-tighter font-headline text-2xl hover:opacity-70 transition-opacity"
        title="Home"
      >
        C
      </button>

      <nav className="flex flex-col gap-8 flex-1">
        {NAV_ITEMS.map(({ icon, label, page }) => {
          const active = page === activePage;
          return (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`flex flex-col items-center gap-1 font-headline font-medium tracking-tight transition-colors duration-200 ${
                active ? "text-primary" : "text-on-surface-variant hover:text-white"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {icon}
              </span>
              <span className="text-[10px] uppercase tracking-tighter">{label}</span>
            </button>
          );
        })}
      </nav>

      <button className="mt-auto text-on-surface-variant hover:text-white transition-colors">
        <span className="material-symbols-outlined">settings</span>
      </button>
    </aside>
  );
}
