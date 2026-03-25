import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Product", end: true },
  { to: "/data", label: "Data" },
  { to: "/my-home", label: "My Home" },
  { to: "/advisor", label: "Advisor" },
];

export default function Header({ children }) {
  const location = useLocation();
  const navRef = useRef(null);
  const linkRefs = useRef([]);
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 px-4 sm:px-6 transition-all duration-500 ${
        scrolled
          ? "border-b border-orange-200/20 bg-paper/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 py-3">
        <div className="flex flex-wrap items-center gap-4">
          <NavLink to="/" className="font-display text-lg font-semibold tracking-tight text-ink">
            Cortex
          </NavLink>
          <nav
            ref={navRef}
            className={`relative flex items-center gap-1 rounded-full p-1 transition-all duration-500 ${
              scrolled
                ? "bg-accent-soft/40 ring-1 ring-orange-200/25"
                : "bg-transparent ring-1 ring-transparent"
            }`}
            aria-label="Primary sections"
          >
            {pill.ready && (
              <span
                className={`absolute top-1 bottom-1 rounded-full transition-all duration-500 ease-in-out ${
                  scrolled
                    ? "bg-elevated shadow-sm ring-1 ring-orange-200/40"
                    : "bg-elevated/50 shadow-none ring-1 ring-orange-200/20"
                }`}
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
                  `relative z-10 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    isActive ? "text-accent" : "text-muted hover:text-ink"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        {typeof children === 'function' ? children(scrolled) : children}
      </div>
    </header>
  );
}
