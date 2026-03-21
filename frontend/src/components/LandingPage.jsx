import { useEffect, useRef } from "react";

export default function LandingPage({ onLaunch }) {
  // Fade-in refs
  const heroRef = useRef(null);
  const reasoningRef = useRef(null);
  const bentoRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );
    [heroRef, reasoningRef, bentoRef, ctaRef].forEach((r) => {
      if (r.current) observer.observe(r.current);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="dark selection:bg-primary selection:text-on-primary"
      style={{ backgroundColor: "#050505", color: "#ffffff", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}
    >
      {/* TopNavBar — logo only */}
      <nav
        className="fixed top-0 w-full z-50 border-b border-outline-variant/15 h-16"
        style={{ backgroundColor: "rgba(14,14,14,0.7)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
      >
        <div className="flex items-center px-8 h-full max-w-7xl mx-auto font-headline font-medium tracking-tight">
          <div className="text-3xl font-bold tracking-tighter text-primary">Cortex</div>
        </div>
      </nav>

      <main className="pt-16 overflow-x-hidden">

        {/* Hero Section */}
        <section className="relative flex items-center justify-center px-8 py-24" style={{ minHeight: "921px" }}>
          {/* Animated background orbs */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
              style={{
                backgroundColor: "rgba(63,255,139,0.12)",
                filter: "blur(120px)",
                animation: "pulse-slow 6s ease-in-out infinite",
              }}
            />
            <div
              className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full"
              style={{
                backgroundColor: "rgba(0,175,254,0.07)",
                filter: "blur(100px)",
                animation: "pulse-slow 8s ease-in-out infinite reverse",
              }}
            />
          </div>

          <div
            ref={heroRef}
            className="relative z-10 max-w-4xl text-center opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-outline-variant/30 bg-surface-container-low mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-on-surface-variant">Precision Command v1.0.4</span>
            </div>
            <h1
              className="text-5xl md:text-8xl font-extrabold tracking-tighter text-on-surface mb-8 leading-[1.05]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Your Home,{" "}
              <span className="text-primary" style={{ filter: "drop-shadow(0 0 20px rgba(63, 255, 139, 0.35))" }}>
                Reasoned.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              An AI property manager that thinks across your devices, maintenance history, and warranties to give you actionable answers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={onLaunch}
                className="px-8 py-4 bg-primary text-on-primary rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95"
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 40px rgba(63,255,139,0.4)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                Launch Terminal
              </button>
              <button className="px-8 py-4 bg-transparent border border-outline-variant/50 text-on-surface rounded-full font-bold text-lg hover:bg-surface-bright hover:scale-105 transition-all duration-300">
                View Project
              </button>
            </div>
          </div>
        </section>

        {/* Value Prop Section */}
        <section className="py-24 px-8 border-t border-outline-variant/10 bg-surface-container-low">
          <div
            ref={reasoningRef}
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-primary font-bold tracking-widest text-xs uppercase">The Intelligence Layer</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  The AI Reasoning Engine
                </h2>
              </div>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">
                Cortex doesn't just monitor sensor thresholds. It traces anomalies back to root causes. If your HVAC efficiency drops, Cortex analyzes warranty terms, pulls maintenance logs, and suggests specific repairs—even estimating local labor costs before you call a technician.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-lg border border-outline-variant/20">
                  <span className="material-symbols-outlined text-secondary" style={{ fontSize: "18px" }}>account_tree</span>
                  <span className="text-xs font-semibold text-on-surface">Root-Cause Tracing</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-lg border border-outline-variant/20">
                  <span className="material-symbols-outlined text-tertiary" style={{ fontSize: "18px" }}>calculate</span>
                  <span className="text-xs font-semibold text-on-surface">Cost Projection</span>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div
                className="absolute -inset-1 rounded-2xl opacity-50 group-hover:opacity-100 transition duration-1000"
                style={{ background: "linear-gradient(to right, rgba(63,255,139,0.3), rgba(0,175,254,0.3))", filter: "blur(16px)" }}
              />
              <div
                className="relative bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 flex flex-col justify-center gap-6 overflow-hidden"
                style={{ aspectRatio: "4/3" }}
              >
                <div className="space-y-4">
                  <div className="h-1 w-full bg-outline-variant/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "66%", animation: "expand-bar 2s ease-out forwards" }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                    <span>SYSTEM_ANALYSIS_SEQ_001</span>
                    <span>98.4% CONFIDENCE</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant/10">
                    <span className="text-[10px] text-on-surface-variant block mb-1">PROBABILITY_ROOT</span>
                    <span className="text-xl font-bold text-primary tracking-tighter">82% HVAC COIL</span>
                  </div>
                  <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant/10">
                    <span className="text-[10px] text-on-surface-variant block mb-1">ESTIMATED_REPAIR</span>
                    <span className="text-xl font-bold text-tertiary tracking-tighter">$420 - $680</span>
                  </div>
                </div>
                <div className="mt-4 border-l-2 border-secondary/50 pl-4 py-2">
                  <p className="text-xs text-secondary italic font-medium leading-relaxed">
                    "Thermal dissipation anomaly detected in Zone 2. Reasoning: Correlation with 2019 service delay. Warranty expires in 12 days."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="py-32 px-8 max-w-7xl mx-auto">
          <div
            ref={bentoRef}
            className="opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          >
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>System Architecture</h2>
              <div className="w-12 h-1 bg-primary mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

              <div className="md:col-span-7 group relative bg-surface-container border border-outline-variant/20 rounded-2xl overflow-hidden hover:border-primary/50 hover:-translate-y-1 transition-all duration-500">
                <div className="p-8 h-full flex flex-col">
                  <div className="mb-12">
                    <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: "32px", display: "block" }}>dashboard_customize</span>
                    <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>Dashboard</h3>
                    <p className="text-on-surface-variant font-light">Real-time home health and critical system status at a glance.</p>
                  </div>
                  <div className="mt-auto overflow-hidden">
                    <div className="flex gap-4 items-end h-32">
                      <div className="w-full bg-primary/20 rounded-t-lg h-1/2"></div>
                      <div className="w-full bg-primary/40 rounded-t-lg h-3/4"></div>
                      <div className="w-full bg-primary rounded-t-lg" style={{ height: "90%" }}></div>
                      <div className="w-full bg-primary/60 rounded-t-lg" style={{ height: "65%" }}></div>
                      <div className="w-full bg-primary/30 rounded-t-lg h-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 group relative bg-surface-container border border-outline-variant/20 rounded-2xl overflow-hidden hover:border-secondary/50 hover:-translate-y-1 transition-all duration-500">
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <span className="material-symbols-outlined text-secondary mb-4" style={{ fontSize: "32px", display: "block" }}>psychology</span>
                    <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>AI Advisor</h3>
                    <p className="text-on-surface-variant font-light">Conversational interface that 'thinks' through complex house questions.</p>
                  </div>
                  <div className="space-y-3 mt-8">
                    <div className="bg-surface-container-high border border-outline-variant/20 rounded-full py-2 px-4 text-[10px] text-on-surface-variant w-fit">
                      "When was the last plumbing audit?"
                    </div>
                    <div className="bg-secondary/10 border border-secondary/20 rounded-full py-2 px-4 text-[10px] text-secondary w-fit ml-auto">
                      "Audit completed Oct 12, 2023. Pipe fatigue 12%."
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 group relative bg-surface-container border border-outline-variant/20 rounded-2xl overflow-hidden hover:border-tertiary/50 hover:-translate-y-1 transition-all duration-500">
                <div className="p-8">
                  <span className="material-symbols-outlined text-tertiary mb-4" style={{ fontSize: "32px", display: "block" }}>inventory_2</span>
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>Maintenance</h3>
                  <p className="text-on-surface-variant font-light">Your digital vault for warranties, manuals, and service history.</p>
                  <div className="mt-12 space-y-2">
                    <div className="flex items-center justify-between p-3 bg-surface-container-low rounded border border-outline-variant/10">
                      <span className="text-xs text-on-surface font-mono">Roof_Warranty.pdf</span>
                      <span className="text-[10px] text-tertiary">VALID</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-surface-container-low rounded border border-outline-variant/10">
                      <span className="text-xs text-on-surface font-mono">HVAC_Manual.pdf</span>
                      <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "14px" }}>download</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 group relative bg-surface-container border border-outline-variant/20 rounded-2xl overflow-hidden hover:border-primary/50 hover:-translate-y-1 transition-all duration-500">
                <div className="p-8 flex flex-col md:flex-row gap-8 items-center h-full">
                  <div className="flex-1">
                    <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: "32px", display: "block" }}>partner_reports</span>
                    <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>Marketplace</h3>
                    <p className="text-on-surface-variant font-light">Curated connections to vetted service providers optimized for your specific systems.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full md:w-64">
                    {[
                      { icon: "plumbing", label: "Plumbers" },
                      { icon: "electrical_services", label: "Electric" },
                      { icon: "ac_unit", label: "HVAC" },
                      { icon: "roofing", label: "Roofing" },
                    ].map(({ icon, label }) => (
                      <div key={label} className="aspect-square bg-surface-container-low rounded-lg border border-outline-variant/20 flex flex-col items-center justify-center p-2 text-center hover:border-primary/40 hover:bg-primary/5 transition-all duration-300">
                        <span className="material-symbols-outlined text-on-surface-variant mb-2">{icon}</span>
                        <span className="text-[9px] font-bold text-on-surface uppercase">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-8">
          <div
            ref={ctaRef}
            className="max-w-4xl mx-auto rounded-3xl border border-outline-variant/30 p-12 text-center relative overflow-hidden opacity-0 translate-y-8 transition-all duration-1000 ease-out"
            style={{ background: "linear-gradient(to bottom right, #1a1919, #000000)" }}
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full" style={{ backgroundColor: "rgba(63,255,139,0.1)", filter: "blur(48px)" }} />
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>Ready to audit your space?</h2>
            <p className="text-on-surface-variant text-lg mb-10 max-w-xl mx-auto">
              Initialize Cortex on your network and let the reasoning engine map your home's ecosystem in minutes.
            </p>
            <button
              onClick={onLaunch}
              className="bg-primary text-on-primary px-10 py-5 rounded-full text-xl font-black active:scale-95 hover:scale-105 duration-200 transition-all"
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 40px rgba(63,255,139,0.3)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              DEPLOY TERMINAL
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer
        className="w-full py-12 border-t border-outline-variant/15"
        style={{ backgroundColor: "#050505", fontFamily: "'Inter', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-4">
          <div className="text-on-surface-variant">© 2024 Cortex. Precision Command Property Management.</div>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "Contact", "System Status"].map((link) => (
              <a key={link} className="text-on-surface-variant hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Keyframe styles */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes expand-bar {
          from { width: 0%; }
          to { width: 66%; }
        }
      `}</style>
    </div>
  );
}
