import { Link } from "react-router-dom";
import Header from "./Header";

const ASSETS = [
  {
    icon: "water_drop",
    name: "Basement Water Heater",
    id: "asset_water_heater",
    make: "Rheem XE40M09EL55U1",
    warrantyBadge: "Expired",
    warrantyStyle: "bg-surface/80 text-clay ring-1 ring-orange-200/30",
    nextService: "Replacement recommended",
    nextServiceColor: "text-rust",
  },
  {
    icon: "local_fire_department",
    name: "Gas Furnace",
    id: "asset_furnace",
    make: "Carrier 59SC5B080E17",
    warrantyBadge: "Active (2028)",
    warrantyStyle: "bg-orange-50 text-terracotta ring-1 ring-orange-200/60",
    nextService: "Serviced Oct 2025",
    nextServiceColor: "text-muted",
  },
  {
    icon: "local_laundry_service",
    name: "Laundry Washing Machine",
    id: "asset_washing_machine",
    make: "Samsung WF45T6000AW",
    warrantyBadge: "Active (2027)",
    warrantyStyle: "bg-orange-50 text-terracotta ring-1 ring-orange-200/60",
    nextService: "Drain issue unresolved",
    nextServiceColor: "text-rust",
  },
  {
    icon: "garage",
    name: "Garage Door Opener",
    id: "asset_garage_door_opener",
    make: "Chamberlain B4505T",
    warrantyBadge: "Active (2026)",
    warrantyStyle: "bg-accent-soft text-rust ring-1 ring-orange-200/40",
    nextService: "No issues",
    nextServiceColor: "text-muted",
  },
  {
    icon: "ev_charger",
    name: "Garage EV Charger",
    id: "asset_ev_charger",
    make: "ChargePoint Home Flex",
    warrantyBadge: "Active (2028)",
    warrantyStyle: "bg-orange-50 text-terracotta ring-1 ring-orange-200/60",
    nextService: "Newly installed",
    nextServiceColor: "text-muted",
  },
];

const VAULT_FILES = [
  "Rheem Water Heater Warranty PDF",
  "Water Heater Repair Invoice 2024",
  "Water Heater Replacement Estimate 2026",
  "Carrier Furnace Manual",
  "Samsung Washer Manual",
  "Washer Drain Repair Invoice 2025",
  "Plumber Follow-Up Email",
  "Electric Bill March 2026",
];

const EVENTS = [
  { icon: "search", title: "Water Heater Inspection", cost: "$125.00", desc: "Rumbling noise and higher energy use. Recommended replacement within 6-12 months.", meta: "Mar 10, 2026 · Fairfax Plumbing Pros" },
  { icon: "build", title: "Gas Furnace Annual Tune-Up", cost: "$210.00", desc: "Cleaned burners and verified normal operation. Seasonal maintenance.", meta: "Oct 5, 2025 · Northern Virginia Heating & Air" },
  { icon: "plumbing", title: "Washer Drain Repair", cost: "$220.00", desc: "Cleared partial blockage, but the issue returned within a week.", meta: "Sep 14, 2025 · RapidFix Home Services" },
  { icon: "handyman", title: "Water Softener Maintenance", cost: "$145.00", desc: "Removed salt bridge, cleaned brine tank. System operating normally.", meta: "May 11, 2025 · Fairfax Plumbing Pros" },
  { icon: "build", title: "Water Heater Repair", cost: "$275.00", desc: "Replaced heating element and flushed tank. Rattling noise resolved.", meta: "Aug 21, 2024 · Fairfax Plumbing Pros" },
];

const cardClass = "rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40";

export default function Maintenance() {
  return (
    <div className="min-h-svh bg-canvas font-sans text-ink antialiased">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight mb-2 sm:text-3xl">
              Maintenance <span className="text-accent">&amp;</span> Warranty
            </h1>
            <p className="text-base text-muted">
              Asset inventory, warranty tracking, and service history.
            </p>
          </div>
          <div className="flex gap-4">
            <div className={cardClass}>
              <span className="text-xs text-muted block mb-1">Assets</span>
              <span className="font-display text-3xl font-bold text-accent">12</span>
            </div>
            <div className={cardClass}>
              <span className="text-xs text-muted block mb-1">Warranties</span>
              <span className="font-display text-3xl font-bold text-ink">5 Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Alerts */}
            <div className={cardClass}>
              <div className="flex items-center gap-3 mb-5">
                <span className="material-symbols-outlined text-accent" style={{ fontSize: "20px" }}>notifications</span>
                <h2 className="font-display text-lg font-semibold text-ink">Maintenance Alerts</h2>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-orange-50/80 border border-orange-200/50 rounded-xl">
                  <h3 className="font-semibold text-rust">Water Heater Replacement</h3>
                  <p className="text-sm text-muted mt-1">11 years old, past expected lifespan. Warranty expired. Replacement recommended within 6 months.</p>
                </div>
                <div className="p-4 bg-accent-soft/60 border border-orange-200/40 rounded-xl">
                  <h3 className="font-semibold text-rust">Washer Drain Issue</h3>
                  <p className="text-sm text-muted mt-1">Previous repair by RapidFix did not fully resolve the issue. Consider rebooking.</p>
                </div>
              </div>
            </div>

            {/* Vault */}
            <div className={cardClass}>
              <h2 className="font-display text-lg font-semibold text-ink mb-4">Digital Vault</h2>
              <div className="space-y-1">
                {VAULT_FILES.map((file) => (
                  <button key={file} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50/60 text-sm group transition-colors cursor-pointer">
                    <span className="text-muted group-hover:text-accent transition-colors text-left">{file}</span>
                    <span className="material-symbols-outlined text-muted group-hover:text-accent transition-colors" style={{ fontSize: "18px" }}>download</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Asset Table */}
            <div className="rounded-2xl border border-orange-200/30 bg-elevated overflow-hidden ring-1 ring-orange-100/40">
              <div className="px-6 py-4 border-b border-orange-200/20 bg-paper flex justify-between items-center">
                <h2 className="font-display text-lg font-semibold text-ink">Asset Inventory</h2>
                <span className="text-xs text-muted">{ASSETS.length} of 12</span>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[11px] text-muted bg-paper/50">
                    <th className="px-6 py-3 font-medium">Asset</th>
                    <th className="px-6 py-3 font-medium">Warranty</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-200/20">
                  {ASSETS.map(({ icon, name, id, make, warrantyBadge, warrantyStyle, nextService, nextServiceColor }) => (
                    <tr key={id} className="hover:bg-paper/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-accent" style={{ fontSize: "22px" }}>{icon}</span>
                          <div>
                            <p className="font-semibold text-ink">{name}</p>
                            <p className="text-xs text-muted mt-0.5">{make}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${warrantyStyle}`}>{warrantyBadge}</span>
                      </td>
                      <td className={`px-6 py-4 text-sm ${nextServiceColor}`}>{nextService}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="material-symbols-outlined text-muted hover:text-accent transition-colors cursor-pointer" style={{ fontSize: "20px" }}>more_horiz</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Service History */}
            <div className={cardClass}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-lg font-semibold text-ink">Service History</h2>
                <button className="btn-ghost text-xs">Export</button>
              </div>
              <div className="space-y-3">
                {EVENTS.map(({ icon, title, cost, desc, meta }) => (
                  <div key={title} className="flex gap-4 p-3 rounded-xl hover:bg-orange-50/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-orange-50/60 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-muted" style={{ fontSize: "20px" }}>{icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-ink">{title}</h4>
                        <span className="font-semibold text-accent text-sm">{cost}</span>
                      </div>
                      <p className="text-sm text-muted mt-0.5">{desc}</p>
                      <p className="text-xs text-muted/70 mt-1">{meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-orange-200/20 bg-paper/30 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/" className="btn-ghost text-sm">&larr; Back to home</Link>
          <p className="text-xs text-muted">&copy; 2026 Cortex</p>
        </div>
      </footer>
    </div>
  );
}
