import SideNav from "./SideNav";

const STAT_CARDS = [
  {
    icon: "solar_power",
    color: "tertiary",
    bg: "bg-tertiary/10",
    border: "border-tertiary/20",
    label: "Solar Production",
    value: "4.8 kW",
  },
  {
    icon: "battery_full",
    color: "secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/20",
    label: "Battery Storage",
    value: "92%",
  },
  {
    icon: "hvac",
    color: "primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    label: "HVAC Load",
    value: "1.2 kW",
  },
  {
    icon: "thermostat",
    color: "white",
    bg: "bg-white/5",
    border: "border-white/10",
    label: "Ambient Temp",
    value: "72°F",
  },
];

const LOG_ITEMS = [
  {
    accent: "border-l-secondary",
    labelColor: "text-secondary",
    label: "Efficiency",
    time: "Now",
    body: "Analyzing HVAC current draw relative to historical peak afternoon cycles.",
    actions: null,
  },
  {
    accent: "border-l-primary",
    labelColor: "text-primary",
    label: "Warranty",
    time: "2m ago",
    body: "Confirmed active service warranty for HVAC unit via digital records.",
    actions: null,
  },
  {
    accent: "border-l-tertiary",
    labelColor: "text-tertiary",
    label: "Action Required",
    time: "4m ago",
    body: "Projected repair cost: $120–$180. Suggesting preemptive maintenance visit.",
    actions: ["Schedule", "Ignore"],
  },
];

const HEALTH_CARDS = [
  {
    icon: "bolt",
    iconColor: "text-primary",
    label: "Optimization",
    value: "94%",
    sub: "Energy peak efficiency across all nodes.",
    subColor: "text-on-surface-variant",
  },
  {
    icon: "shield_locked",
    iconColor: "text-white",
    label: "Security",
    value: "SECURE",
    sub: "All entry points and sensors online.",
    subColor: "text-on-surface-variant",
  },
  {
    icon: "payments",
    iconColor: "text-secondary",
    label: "Yield",
    value: "$1,240",
    sub: "+12.4% yield versus previous period.",
    subColor: "text-secondary",
  },
];

export default function Dashboard({ onNavigate }) {
  return (
    <div className="font-body selection:bg-primary/30 min-h-screen" style={{ backgroundColor: "#050505", color: "#ffffff" }}>

      <SideNav activePage="dashboard" onNavigate={onNavigate} />

      {/* Top App Bar */}
      <header
        className="fixed top-0 right-0 h-16 flex justify-between items-center px-8 z-40 border-b border-outline-variant/10"
        style={{ left: "80px", backgroundColor: "rgba(14,14,14,0.9)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-4">
          <h1 className="text-white font-semibold text-lg font-headline tracking-widest uppercase">Command Center</h1>
          <div className="h-4 w-px bg-outline-variant/30"></div>
          <span className="text-on-surface-variant font-label text-[10px] tracking-widest uppercase">882-QX</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" style={{ filter: "drop-shadow(0 0 4px rgba(63,255,139,0.6))" }}></div>
            <span className="text-primary text-[10px] font-bold tracking-widest uppercase">Live</span>
          </div>
          <div className="flex items-center gap-4 text-on-surface-variant">
            <span className="material-symbols-outlined hover:text-white cursor-pointer transition-colors">notifications</span>
            <span className="material-symbols-outlined hover:text-white cursor-pointer transition-colors">account_circle</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 p-8 min-h-screen grid grid-cols-12 gap-6" style={{ marginLeft: "80px" }}>

        {/* Left Column: Health Score + Stat Cards */}
        <section className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* System Health Score */}
          <div className="col-span-1 md:col-span-2 bg-surface-container-low p-6 flex flex-col justify-center" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase mb-1">System Health Score</p>
                <h2 className="text-6xl font-headline font-extrabold text-white">98%</h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Status</p>
                <p className="text-xl font-headline font-bold text-primary">OPTIMIZED</p>
              </div>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 mt-6 rounded-full overflow-hidden">
              <div className="bg-primary h-full" style={{ width: "98%" }}></div>
            </div>
          </div>

          {/* Stat Cards */}
          {STAT_CARDS.map(({ icon, color, bg, border, label, value }) => (
            <div
              key={label}
              className="bg-surface-container-low p-6 flex items-center gap-4"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className={`w-12 h-12 rounded ${bg} border ${border} flex items-center justify-center`}>
                <span className={`material-symbols-outlined text-${color}`}>{icon}</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">{label}</p>
                <p className="text-2xl font-headline font-bold text-white">{value}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Right Column: System Log */}
        <section className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-xs uppercase tracking-[0.2em] text-on-surface-variant">System Log</h3>
            <span className="material-symbols-outlined text-on-surface-variant text-sm">auto_awesome</span>
          </div>
          <div className="flex flex-col gap-4">
            {LOG_ITEMS.map(({ accent, labelColor, label, time, body, actions }) => (
              <div
                key={label}
                className={`p-4 bg-surface-container-low rounded-lg border-l-4 ${accent}`}
                style={{ border: "1px solid rgba(255,255,255,0.1)", borderLeftWidth: "4px" }}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${labelColor}`}>{label}</span>
                  <span className="text-[9px] text-on-surface-variant uppercase">{time}</span>
                </div>
                <p className={`text-sm text-white font-medium leading-relaxed ${actions ? "mb-3" : ""}`}>{body}</p>
                {actions && (
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded bg-primary text-on-primary text-[10px] font-bold uppercase tracking-wider">
                      {actions[0]}
                    </button>
                    <button className="px-3 py-1.5 rounded bg-surface-container-highest text-white text-[10px] font-bold uppercase tracking-wider">
                      {actions[1]}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Row: Core Health Cards */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {HEALTH_CARDS.map(({ icon, iconColor, label, value, sub, subColor }) => (
            <div
              key={label}
              className="bg-surface-container-low p-6 hover:bg-surface-container transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
                <span className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">{label}</span>
              </div>
              <div className="text-4xl font-headline font-bold text-white">{value}</div>
              <p className={`text-xs mt-2 ${subColor}`}>{sub}</p>
            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer
        className="px-8 py-6 border-t border-outline-variant/10 flex justify-between items-center"
        style={{ marginLeft: "80px", backgroundColor: "#050505" }}
      >
        <div className="flex gap-12">
          {[
            { label: "Uptime", value: "99.99%" },
            { label: "Active Nodes", value: "42" },
            { label: "Latency", value: "12ms" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col">
              <span className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">{label}</span>
              <span className="text-xs font-headline text-white">{value}</span>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-on-surface-variant font-label tracking-widest uppercase">HC-V4.2.0</div>
      </footer>

    </div>
  );
}
