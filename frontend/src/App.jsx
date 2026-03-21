/*
 * App root. Manages top-level page state:
 *   "landing"     → LandingPage
 *   "dashboard"   → Dashboard (Command Center)
 *   "advisor"     → AI Advisor (chat interface)
 *   "maintenance" → Maintenance (placeholder)
 *   "marketplace" → Marketplace (placeholder)
 */

import { useState } from "react";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import Maintenance from "./components/Maintenance";
import Marketplace from "./components/Marketplace";
import Advisor from "./components/Advisor";

export default function App() {
  const [page, setPage] = useState("landing");

  if (page === "landing") {
    return <LandingPage onLaunch={() => setPage("dashboard")} />;
  }

  if (page === "dashboard") {
    return <Dashboard onNavigate={setPage} />;
  }

  if (page === "maintenance") {
    return <Maintenance onNavigate={setPage} />;
  }

  if (page === "marketplace") {
    return <Marketplace onNavigate={setPage} />;
  }

  if (page === "advisor") {
    return <Advisor onNavigate={setPage} />;
  }

  // Placeholder for Maintenance and Marketplace
  return (
    <div className="flex items-center justify-center h-screen bg-background text-on-surface-variant">
      <div className="text-center space-y-4">
        <p className="text-lg font-headline uppercase tracking-widest">{page}</p>
        <p className="text-sm">Coming soon.</p>
        <button
          onClick={() => setPage("dashboard")}
          className="text-primary text-sm hover:underline"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
