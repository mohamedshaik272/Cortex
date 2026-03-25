import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Hero from '../components/Hero'

const FEATURES = [
  {
    icon: 'home',
    title: 'Homeowner intelligence',
    description:
      'Health scores, alerts, upcoming maintenance, and detailed system breakdowns for every home — built from real equipment, service, and climate data.',
    stat: '86 / 100',
    statLabel: 'health score',
    to: '/my-home',
    cta: 'Open my home',
  },
  {
    icon: 'analytics',
    title: 'Subdivision analytics',
    description:
      'See risk profiles, replacement timelines, and service opportunities across entire neighborhoods. Filter by floor plan, age, or equipment type.',
    stat: '14',
    statLabel: 'homes tracked',
    to: '/data',
    cta: 'Explore data',
  },
  {
    icon: 'forum',
    title: 'AI advisor',
    description:
      'Ask anything about your home in plain English — maintenance schedules, warranty coverage, repair history, costs. Answers are based on your actual data.',
    stat: 'Live',
    statLabel: 'home-aware chat',
    to: '/advisor',
    cta: 'Talk to Cortex',
  },
]

export default function ProductPage() {
  return (
    <div className="min-h-svh bg-canvas font-sans text-ink antialiased">
      <Header />
      <Hero />

      <section
        id="explore"
        className="border-b border-orange-200/20 bg-paper/50 px-4 py-12 sm:px-6 sm:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              What Cortex does
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Three ways to use Cortex, whether you own a home, service homes, or sell into them.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Link
                key={f.to}
                to={f.to}
                className="group flex flex-col rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40 transition-all hover:shadow-md hover:ring-accent/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft/80 ring-1 ring-orange-200/40">
                    <span
                      className="material-symbols-outlined text-terracotta"
                      style={{ fontSize: '22px' }}
                    >
                      {f.icon}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-semibold text-ink">
                      {f.stat}
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{f.statLabel}</p>
                  </div>
                </div>
                <h3 className="font-display mt-4 text-lg font-semibold text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {f.description}
                </p>
                <p className="mt-4 text-sm font-medium text-accent transition-colors group-hover:text-terracotta">
                  {f.cta} &rarr;
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-orange-200/20 bg-paper/30 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            Cortex &mdash; the smart layer for homeownership.
          </p>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Cortex
          </p>
        </div>
      </footer>
    </div>
  )
}
