import SideNav from "./SideNav";

const PROVIDERS = [
  {
    icon: "solar_power",
    name: "Voltaic Energy",
    category: "Solar & Storage",
    rate: "$120/hr",
    score: "9.8",
    primary: true,
  },
  {
    icon: "ac_unit",
    name: "Precision HVAC",
    category: "Climate Systems",
    rate: "$240/hr",
    score: "9.6",
    primary: false,
  },
  {
    icon: "plumbing",
    name: "Flow State Plumbing",
    category: "Hydraulics",
    rate: "$110/hr",
    score: "9.4",
    primary: false,
  },
  {
    icon: "electrical_services",
    name: "Arc Electric",
    category: "Electrical",
    rate: "$175/hr",
    score: "9.2",
    primary: false,
  },
  {
    icon: "roofing",
    name: "Summit Roofing Co.",
    category: "Roofing & Exteriors",
    rate: "$95/hr",
    score: "9.0",
    primary: false,
  },
];

const AVAILABILITY = [
  { day: "Today", slot: "2:30 PM — 5:00 PM", available: true },
  { day: "Tomorrow", slot: "Closed", available: false },
  { day: "Wednesday", slot: "9:00 AM — 12:00 PM", available: true },
];

export default function Marketplace({ onNavigate }) {
  return (
    <div className="font-body text-on-surface min-h-screen" style={{ backgroundColor: "#000000" }}>
      <SideNav activePage="marketplace" onNavigate={onNavigate} />

      {/* Top App Bar */}
      <header
        className="fixed top-0 right-0 h-16 flex justify-between items-center px-8 z-40 border-b border-white/5"
        style={{
          left: "80px",
          backgroundColor: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-4">
          <h1 className="text-white font-semibold text-lg font-headline tracking-widest uppercase">
            Marketplace
          </h1>
          <div className="h-4 w-px bg-white/10"></div>
          <span className="text-on-surface-variant text-[10px] tracking-widest uppercase">
            Vetted Network
          </span>
        </div>
        <div className="flex items-center gap-4 text-on-surface-variant">
          <span className="material-symbols-outlined hover:text-white cursor-pointer transition-colors">notifications</span>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
            JD
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="pt-24 pb-16 px-6" style={{ marginLeft: "80px" }}>
        <div className="w-full">

          {/* Page Header */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-headline text-6xl font-extrabold mb-3">Service Providers</h2>
              <p className="text-on-surface-variant text-xl">Vetted network of high-performance professionals.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-surface-container-low border border-outline-variant/20 px-10 py-6 rounded-lg min-w-[160px]">
                <span className="text-sm text-on-surface-variant uppercase tracking-widest block mb-2">Providers</span>
                <span className="text-4xl font-bold font-headline text-primary">5</span>
              </div>
              <div className="bg-surface-container-low border border-outline-variant/20 px-10 py-6 rounded-lg min-w-[160px]">
                <span className="text-sm text-on-surface-variant uppercase tracking-widest block mb-2">Network</span>
                <span className="text-4xl font-bold font-headline text-white">Vetted</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Provider List */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Recommended</h3>
                <button className="text-xs font-bold text-primary hover:underline">FILTER ALL</button>
              </div>

              {PROVIDERS.map(({ icon, name, category, rate, score, primary }) => (
                <div
                  key={name}
                  className="p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors"
                  style={{ background: "#0e0e0e", border: "1px solid #1f1f1f" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(63,255,139,0.3)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#1f1f1f"}
                >
                  <div className="flex gap-5 items-center">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-primary rounded-lg">
                      <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>{icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-white">{name}</h4>
                      <p className="text-sm text-on-surface-variant font-medium mt-0.5">{category} • {rate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="text-center">
                      <div className="text-primary font-bold text-2xl">{score}</div>
                      <div className="text-xs text-on-surface-variant font-bold uppercase mt-0.5">Score</div>
                    </div>
                    {primary ? (
                      <button className="bg-primary px-8 py-3 rounded-lg font-bold text-base text-on-primary hover:brightness-110 active:scale-95 transition-all">
                        Book Now
                      </button>
                    ) : (
                      <button className="border border-white/20 px-8 py-3 rounded-lg font-bold text-base text-white hover:bg-white/5 transition-all">
                        Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Widgets */}
            <aside className="space-y-8">

              {/* Availability */}
              <div className="p-7 border border-outline-variant/20 bg-surface-container rounded-lg">
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface mb-5">Availability</h3>
                <div className="space-y-4">
                  {AVAILABILITY.map(({ day, slot, available }, i) => (
                    <div
                      key={day}
                      className={`flex justify-between items-center py-2 ${i < AVAILABILITY.length - 1 ? "border-b border-white/5" : ""}`}
                    >
                      <span className="text-base text-white">{day}</span>
                      <span className={`text-sm font-bold ${available ? "text-primary" : "text-on-surface-variant"}`}>
                        {slot}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Insight */}
              <div className="p-7 border border-primary/20 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-5 flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>analytics</span>
                  Insight
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
                  Costs are up <span className="text-white font-bold">4%</span> this quarter. Book now to lock in current rates.
                </p>
                <div className="text-2xl font-bold text-white">-$34.00 Optimized</div>
              </div>

              {/* Quick Categories */}
              <div className="p-7 border border-outline-variant/20 bg-surface-container rounded-lg">
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-5">Browse by Trade</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "plumbing", label: "Plumbing" },
                    { icon: "electrical_services", label: "Electric" },
                    { icon: "ac_unit", label: "HVAC" },
                    { icon: "roofing", label: "Roofing" },
                    { icon: "solar_power", label: "Solar" },
                    { icon: "yard", label: "Landscaping" },
                  ].map(({ icon, label }) => (
                    <button
                      key={label}
                      className="flex flex-col items-center gap-2 p-4 rounded-lg border border-outline-variant/20 hover:border-primary/40 hover:bg-primary/5 transition-all text-on-surface-variant hover:text-primary"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>{icon}</span>
                      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </aside>
          </div>
        </div>
      </main>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-50 text-on-primary">
        <span className="material-symbols-outlined">chat</span>
      </button>
    </div>
  );
}
