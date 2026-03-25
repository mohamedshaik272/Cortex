import { NEIGHBORHOOD } from '../../data/neighborhoodDemo';

function formatServiceValue(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

const sectionCard =
  'rounded-2xl border border-orange-200/30 bg-elevated p-6 ring-1 ring-orange-100/40';

function Section({ icon, title, children }) {
  return (
    <section className={sectionCard}>
      <div className="flex items-center gap-2.5 mb-4">
        <span
          className="material-symbols-outlined text-accent"
          style={{ fontSize: '20px' }}
          aria-hidden="true"
        >
          {icon}
        </span>
        <h3 className="font-display text-lg font-semibold text-ink">
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-sm font-medium text-ink text-right">{value}</dd>
    </div>
  );
}

function Note({ text }) {
  if (!text) return null;
  return (
    <p className="mt-3 rounded-lg bg-surface/50 px-3 py-2 text-xs text-muted">
      {text}
    </p>
  );
}

function healthColor(pct) {
  if (pct >= 85) return 'bg-accent-soft text-terracotta ring-1 ring-orange-200/60';
  if (pct >= 60) return 'bg-accent-soft text-rust ring-1 ring-orange-200/40';
  return 'bg-surface/80 text-clay ring-1 ring-orange-200/30';
}

function AppliancesSection({ items }) {
  return (
    <div className="space-y-3">
      {items.map((a) => (
        <div
          key={a.name}
          className="rounded-xl border border-orange-200/20 bg-elevated/90 ring-1 ring-orange-100/40 p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <p className="font-semibold text-ink">{a.name}</p>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${healthColor(a.healthPct)}`}
            >
              {a.healthPct}% health
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">
            {a.brand} {a.model}
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
            <span>{a.ageYears} yrs old</span>
            <span>Last service {a.lastService}</span>
          </div>
          <Note text={a.notes} />
        </div>
      ))}
    </div>
  );
}

function MaintenanceSection({ events }) {
  return (
    <div className="space-y-2">
      {events.map((e, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-xl border border-orange-200/20 bg-elevated/90 ring-1 ring-orange-100/40 p-3"
        >
          <div className="shrink-0 pt-0.5">
            <span
              className="material-symbols-outlined text-muted"
              style={{ fontSize: '18px' }}
              aria-hidden="true"
            >
              {e.type === 'inspection'
                ? 'search'
                : e.type === 'repair'
                  ? 'build'
                  : e.type === 'replacement'
                    ? 'swap_horiz'
                    : 'upgrade'}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-ink">{e.description}</p>
            <p className="mt-0.5 text-xs text-muted">
              {e.date} &middot;{' '}
              <span className="capitalize">{e.type}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ClimateSection({ c }) {
  return (
    <div>
      <dl className="space-y-0.5">
        <Row label="Exposure index" value={c.exposureIndex.toFixed(2)} />
        <Row label="Flood zone" value={c.floodZone} />
      </dl>
      {c.seasonalRisks.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-medium text-muted mb-1.5">
            Seasonal risks
          </p>
          <div className="flex flex-wrap gap-1.5">
            {c.seasonalRisks.map((risk) => (
              <span
                key={risk}
                className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-rust ring-1 ring-orange-200/40"
              >
                {risk}
              </span>
            ))}
          </div>
        </div>
      )}
      <Note text={c.notes} />
    </div>
  );
}

export default function HouseDetailView({ house, locationContext }) {
  return (
    <div className="space-y-4">
      {/* Summary card */}
      <div className={sectionCard}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-2xl font-semibold text-ink">
              {formatServiceValue(house.annualServiceValue)}
              <span className="ml-1 text-base font-normal text-muted">
                /yr
              </span>
            </p>
            <p className="mt-1 text-xs text-muted">
              Estimated annual service value
            </p>
          </div>
          <span className="rounded-full bg-accent-soft/80 px-2.5 py-1 text-xs font-medium text-terracotta ring-1 ring-orange-200/40">
            Demand {house.demandIndex.toFixed(2)}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
          <span>{house.beds} bds</span>
          <span>&middot;</span>
          <span>{house.baths} ba</span>
          <span>&middot;</span>
          <span>{house.sqft.toLocaleString()} sqft</span>
          <span>&middot;</span>
          <span>{house.homeType}</span>
        </div>
        <p className="mt-2 text-sm font-medium text-ink">{house.address}</p>
        <p className="text-xs text-muted">
          {locationContext || `${NEIGHBORHOOD.city}, ${NEIGHBORHOOD.state}`} &middot; Built{' '}
          {house.yearBuilt}
        </p>
      </div>

      {/* Photo */}
      <figure>
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl bg-surface/60 ring-1 ring-orange-200/20">
          <img
            src={house.imageUrl}
            alt={house.imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        {house.photoNote && (
          <figcaption className="mt-2 text-xs text-muted">
            {house.photoNote}
          </figcaption>
        )}
      </figure>

      {/* System sections */}
      <Section icon="kitchen" title="Appliances & equipment">
        <AppliancesSection items={house.appliances} />
      </Section>

      <Section icon="water_drop" title="Sewage & water">
        <dl className="space-y-0.5">
          <Row label="Type" value={house.sewage.type} />
          <Row label="Last inspection" value={house.sewage.lastInspection} />
          <Row label="Condition" value={house.sewage.condition} />
        </dl>
        <Note text={house.sewage.notes} />
      </Section>

      <Section icon="bolt" title="Electrical">
        <dl className="space-y-0.5">
          <Row label="Panel" value={`${house.electric.panelAmps}A`} />
          <Row label="Panel age" value={`${house.electric.panelAgeYears} yrs`} />
          <Row label="Last upgrade" value={house.electric.lastUpgrade} />
        </dl>
        <Note text={house.electric.notes} />
      </Section>

      <Section icon="local_fire_department" title="Gas">
        <dl className="space-y-0.5">
          <Row label="Supplier" value={house.gas.supplier} />
          <Row label="Meter" value={house.gas.meterType} />
          <Row label="Last inspection" value={house.gas.lastInspection} />
        </dl>
        <Note text={house.gas.notes} />
      </Section>

      <Section icon="thermostat" title="HVAC">
        <dl className="space-y-0.5">
          <Row label="System" value={house.hvac.systemType} />
          <Row label="Age" value={`${house.hvac.ageYears} yrs`} />
          <Row label="Refrigerant" value={house.hvac.refrigerantType} />
          <Row label="Last maintenance" value={house.hvac.lastMaintenance} />
        </dl>
        <Note text={house.hvac.notes} />
      </Section>

      <Section icon="roofing" title="Roof & envelope">
        <dl className="space-y-0.5">
          <Row label="Material" value={house.roof.material} />
          <Row label="Age" value={`${house.roof.ageYears} yrs`} />
          <Row
            label="Condition"
            value={house.roof.condition.replace(/_/g, ' ')}
          />
          <Row label="Last inspection" value={house.roof.lastInspection} />
        </dl>
        <Note text={house.roof.notes} />
      </Section>

      <Section icon="plumbing" title="Plumbing">
        <dl className="space-y-0.5">
          <Row label="Material" value={house.plumbing.pipeMaterial} />
          <Row label="Age" value={`${house.plumbing.ageYears} yrs`} />
          {house.plumbing.knownIssues && (
            <Row label="Known issues" value={house.plumbing.knownIssues} />
          )}
        </dl>
        <Note text={house.plumbing.notes} />
      </Section>

      <Section icon="history" title="Maintenance history">
        <MaintenanceSection events={house.maintenanceHistory} />
      </Section>

      <Section icon="thermostat_auto" title="Climate & risk exposure">
        <ClimateSection c={house.climateExposure} />
      </Section>
    </div>
  );
}
