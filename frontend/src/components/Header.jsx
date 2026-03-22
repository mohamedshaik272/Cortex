import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Product", end: true },
  { to: "/data", label: "Data" },
  { to: "/maintenance", label: "Maintenance" },
  { to: "/advisor", label: "Advisor" },
];

export default function Header({ children }) {
  const location = useLocation();
  const navRef = useRef(null);
  const linkRefs = useRef([]);
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });

  const updatePill = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;

    const activeIndex = NAV_ITEMS.findIndex(({ to, end }) =>
      end ? location.pathname === to : location.pathname.startsWith(to)
    );
    const el = linkRefs.current[activeIndex];
    if (!el) return;

    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setPill({
      left: elRect.left - navRect.left,
      width: elRect.width,
      ready: true,
    });
  }, [location.pathname]);

  useEffect(() => {
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  return (
    <header className="sticky top-0 z-50 border-b border-orange-200/20 bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-4">
          <NavLink to="/" className="font-display text-lg font-semibold tracking-tight text-ink">
            Cortex
          </NavLink>
          <nav
            ref={navRef}
            className="relative flex items-center gap-1 rounded-full bg-orange-50/40 p-1 ring-1 ring-orange-200/25"
            aria-label="Primary sections"
          >
            {pill.ready && (
              <span
                className="absolute top-1 bottom-1 rounded-full bg-elevated shadow-sm ring-1 ring-orange-200/40 transition-all duration-300 ease-in-out"
                style={{ left: pill.left, width: pill.width }}
                aria-hidden="true"
              />
            )}
            {NAV_ITEMS.map(({ to, label, end }, i) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                ref={(el) => (linkRefs.current[i] = el)}
                className={({ isActive }) =>
                  `relative z-10 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${
                    isActive ? "text-accent" : "text-muted hover:text-ink"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        {children}
      </div>
    </header>
  );
}
