import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HomeownerView from '../components/HomeownerView';
import ProviderView from '../components/ProviderView';

export default function ProductPage() {
  const [mode, setMode] = useState('homeowner');

  return (
    <div className="min-h-svh bg-canvas font-sans text-ink antialiased">
      <Header>
        <nav
          className="flex items-center gap-1 rounded-full bg-orange-50/40 p-1 ring-1 ring-orange-200/25"
          aria-label="Insights mode"
        >
          <button
            type="button"
            onClick={() => setMode('homeowner')}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition cursor-pointer ${
              mode === 'homeowner'
                ? 'bg-elevated text-terracotta shadow-sm ring-1 ring-orange-200/30'
                : 'text-muted hover:text-ink'
            }`}
          >
            Homeowner
          </button>
          <button
            type="button"
            onClick={() => setMode('provider')}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition cursor-pointer ${
              mode === 'provider'
                ? 'bg-elevated text-rust shadow-sm ring-1 ring-orange-200/30'
                : 'text-muted hover:text-ink'
            }`}
          >
            Service &amp; product
          </button>
        </nav>
      </Header>
      <Hero />

      <section
        id="insights"
        className="scroll-mt-20 border-b border-orange-200/20 bg-paper/50 px-4 py-12 sm:px-6 sm:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {mode === 'homeowner'
                ? 'Your home at a glance'
                : 'Market overview'}
            </h2>
            <p className="mt-1 text-muted">
              {mode === 'homeowner'
                ? 'Alerts, maintenance schedule, and systems for your home.'
                : 'How service and product teams track homeowner needs.'}
            </p>
          </div>

          {mode === 'homeowner' ? <HomeownerView /> : <ProviderView />}
        </div>
      </section>

      <footer className="border-t border-orange-200/20 bg-paper/30 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-sm font-semibold text-ink">
              Cortex
            </p>
            <p className="mt-1 max-w-md text-sm text-muted">
              A complete home management platform — maintenance, warranties,
              service history, and more.
            </p>
          </div>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Cortex
          </p>
        </div>
      </footer>
    </div>
  );
}
