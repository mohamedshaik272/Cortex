import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import HouseDetailView from '../components/data/HouseDetailView';
import { MarketplaceListingsSection } from '../components/data/MarketplaceListingsSection';
import { getWillowbrookHome } from '../data/willowbrookDemo';

export default function HomeDetailPage() {
  const { id } = useParams();
  const home = getWillowbrookHome(id);

  return (
    <div className="min-h-svh bg-canvas font-sans text-ink antialiased">
      <Header />

      <main className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {home ? (
            <>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {home.address}
              </h1>
              <p className="mt-1 text-sm text-muted">
                Willowbrook Estates &middot; {home.homeType}
              </p>

              <div className="mt-6">
                <HouseDetailView house={home} locationContext="Willowbrook Estates" />
              </div>

              <div className="mt-8">
                <MarketplaceListingsSection house={home} />
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40 text-center">
              <span
                className="material-symbols-outlined text-muted"
                style={{ fontSize: '48px' }}
              >
                home
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold text-ink">
                Home not found
              </h2>
              <p className="mt-2 text-sm text-muted">
                No home with ID &ldquo;{id}&rdquo; exists in Willowbrook Estates.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-orange-200/20 bg-paper/30 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/data" className="btn-ghost text-sm">
            &larr; Back to data
          </Link>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Cortex
          </p>
        </div>
      </footer>
    </div>
  );
}
