import SideNav from "./SideNav";

const ASSETS = [
  {
    icon: "bolt",
    iconColor: "text-primary",
    name: "Energy Storage Unit",
    id: "ESU-99023",
    warrantyBadge: "ACTIVE (2032)",
    warrantyStyle: "bg-primary/10 text-primary",
    nextService: "Oct 22, 2024",
    nextServiceColor: "text-on-surface-variant",
  },
  {
    icon: "ac_unit",
    iconColor: "text-on-surface-variant",
    name: "Climate Control System",
    id: "CCS-0023",
    warrantyBadge: "EXPIRING (3M)",
    warrantyStyle: "bg-yellow-500/10 text-yellow-500",
    nextService: "Jul 18, 2024",
    nextServiceColor: "text-on-surface-variant",
  },
  {
    icon: "wb_sunny",
    iconColor: "text-on-surface-variant",
    name: "Solar Inverter",
    id: "SIN-IV-450",
    warrantyBadge: "EXPIRED",
    warrantyStyle: "bg-red-500/10 text-red-500",
    nextService: "Past Due",
    nextServiceColor: "text-red-500/80",
  },
];

const VAULT_FILES = [
  "hvac_manual_v2.pdf",
  "battery_receipt.jpg",
  "warranty_cert.pdf",
];

const EVENTS = [
  {
    icon: "build",
    title: "Annual System Tune-Up",
    cost: "$285.00",
    desc: "Maintenance check completed for Climate System. All checks passed.",
    meta: "Jun 12, 2024 • Tech: M. Richards",
  },
  {
    icon: "update",
    title: "Remote Firmware Update",
    cost: "$0.00",
    desc: "Inverter software updated to v4.12.0 for performance optimization.",
    meta: "Mar 04, 2024 • Automated Session",
  },
];

const card = "bg-surface-container-low border border-outline-variant/20 rounded-lg";

export default function Maintenance({ onNavigate }) {
  return (
    <div
      className="font-body text-on-surface min-h-screen"
      style={{ backgroundColor: "#050505" }}
    >
      <SideNav activePage="maintenance" onNavigate={onNavigate} />

      {/* Top App Bar */}
      <header
        className="fixed top-0 right-0 h-16 flex justify-between items-center px-8 z-40 border-b border-outline-variant/10"
        style={{
          left: "80px",
          backgroundColor: "rgba(14,14,14,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-4">
          <h1 className="text-white font-semibold text-lg font-headline tracking-widest uppercase">
            Maintenance
          </h1>
          <div className="h-4 w-px bg-outline-variant/30"></div>
          <span className="text-on-surface-variant font-label text-[10px] tracking-widest uppercase">
            Asset Ledger
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center bg-surface-container-low px-4 py-1.5 rounded-lg border border-outline-variant/20">
            <span className="material-symbols-outlined text-on-surface-variant mr-2" style={{ fontSize: "18px" }}>
              search
            </span>
            <input
              className="bg-transparent border-none text-xs focus:outline-none placeholder:text-on-surface-variant/50 w-40"
              placeholder="Search assets..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-4 text-on-surface-variant">
            <span className="material-symbols-outlined hover:text-white cursor-pointer transition-colors">notifications</span>
            <span className="material-symbols-outlined hover:text-white cursor-pointer transition-colors">account_circle</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="pt-24 pb-16 px-6" style={{ marginLeft: "80px" }}>
        <div className="w-full">

          {/* Page Header */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-headline text-6xl font-extrabold tracking-tight mb-3">
                Maintenance <span className="text-primary">&amp;</span> Warranty
              </h1>
              <p className="text-on-surface-variant text-xl">
                System management and predictive telemetry dashboard.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-surface-container-low border border-outline-variant/20 px-10 py-6 rounded-lg min-w-[160px]">
                <span className="text-sm text-on-surface-variant uppercase tracking-widest block mb-2">Active</span>
                <span className="text-4xl font-bold font-headline text-primary">12 / 14</span>
              </div>
              <div className="bg-surface-container-low border border-outline-variant/20 px-10 py-6 rounded-lg min-w-[160px]">
                <span className="text-sm text-on-surface-variant uppercase tracking-widest block mb-2">Status</span>
                <span className="text-4xl font-bold font-headline text-white">Nominal</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column */}
            <div className="lg:col-span-1 space-y-8">

              {/* Maintenance Alerts */}
              <div className={`${card} p-7`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: "22px" }}>auto_awesome</span>
                  <h2 className="text-sm font-bold uppercase tracking-widest">Maintenance Alerts</h2>
                </div>
                <div className="space-y-4">
                  <div className="p-5 bg-primary/5 border border-primary/20 rounded-lg">
                    <h3 className="text-lg font-bold text-primary">HVAC Filter Replacement</h3>
                    <p className="text-sm text-on-surface-variant mt-2">Due in 12 days based on airflow sensor data.</p>
                  </div>
                  <div className="p-5 bg-surface-container border border-outline-variant/20 rounded-lg">
                    <h3 className="text-lg font-bold text-white">Battery Optimization</h3>
                    <p className="text-sm text-on-surface-variant mt-2">Scheduled cycle optimization in 45 days.</p>
                  </div>
                </div>
              </div>

              {/* Digital Vault */}
              <div className={`${card} p-7`}>
                <h2 className="text-sm font-bold uppercase tracking-widest mb-5">Digital Vault</h2>
                <div className="space-y-2">
                  {VAULT_FILES.map((file) => (
                    <button
                      key={file}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-surface-container text-base group transition-colors"
                    >
                      <span className="text-on-surface-variant group-hover:text-primary transition-colors text-left">
                        {file}
                      </span>
                      <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "20px" }}>
                        download
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-8">

              {/* Asset Inventory Table */}
              <div className={`${card} overflow-hidden`}>
                <div className="px-7 py-5 border-b border-outline-variant/20 bg-surface-container flex justify-between items-center">
                  <h2 className="text-sm font-bold uppercase tracking-widest">Asset Inventory</h2>
                  <span className="text-xs text-on-surface-variant uppercase">3 Monitored</span>
                </div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs text-on-surface-variant uppercase tracking-widest bg-surface-container/50">
                      <th className="px-7 py-4 font-semibold">Asset</th>
                      <th className="px-7 py-4 font-semibold">Warranty</th>
                      <th className="px-7 py-4 font-semibold">Next Service</th>
                      <th className="px-7 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {ASSETS.map(({ icon, iconColor, name, id, warrantyBadge, warrantyStyle, nextService, nextServiceColor }) => (
                      <tr key={id} className="hover:bg-surface-container transition-colors">
                        <td className="px-7 py-5">
                          <div className="flex items-center gap-4">
                            <span className={`material-symbols-outlined ${iconColor}`} style={{ fontSize: "24px" }}>{icon}</span>
                            <div>
                              <p className="font-bold text-white text-lg">{name}</p>
                              <p className="text-sm text-on-surface-variant mt-0.5">ID: {id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-7 py-5">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${warrantyStyle}`}>
                            {warrantyBadge}
                          </span>
                        </td>
                        <td className={`px-7 py-5 text-base ${nextServiceColor}`}>{nextService}</td>
                        <td className="px-7 py-5 text-right">
                          <button className="material-symbols-outlined text-on-surface-variant hover:text-white transition-colors">
                            more_horiz
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Recent Events */}
              <div className={`${card} p-7`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-sm font-bold uppercase tracking-widest">Recent Events</h2>
                  <button className="text-xs font-bold text-primary hover:underline">Export Logs</button>
                </div>
                <div className="space-y-4">
                  {EVENTS.map(({ icon, title, cost, desc, meta }) => (
                    <div
                      key={title}
                      className="flex gap-5 p-4 rounded-lg hover:bg-surface-container transition-colors"
                    >
                      <div className="w-11 h-11 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "22px" }}>
                          {icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-lg font-bold text-white">{title}</h4>
                          <span className="text-base font-bold text-primary">{cost}</span>
                        </div>
                        <p className="text-sm text-on-surface-variant mt-1">{desc}</p>
                        <p className="text-xs text-on-surface-variant/60 mt-2 uppercase">{meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined font-bold">add</span>
      </button>

    </div>
  );
}
