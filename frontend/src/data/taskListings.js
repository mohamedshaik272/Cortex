/**
 * Clickable product + service listings aligned to each prominent homeowner-log task.
 * Images in /public/task-listings/ are snapshots from manufacturer CDNs, Wikimedia Commons,
 * or Thumbtack pro listing photos (downloaded for reliable thumbnails).
 */

export const PROMINENT_TASK_LISTINGS = {
  't-wh-urgent': {
    product: {
      name: 'Bradford White residential gas water heater (Defender / atmospheric line — same class as M450T6FBN)',
      url: 'https://www.bradfordwhite.com/gas-water-heaters/',
      imageUrl: '/task-listings/bradford-white-gas-tank.jpg',
      imageAlt: 'Bradford White residential gas water heater product photo (manufacturer)',
      priceDisplay: 'Typ. $900–$1,600 tank · $1,600–$2,800 installed (regional)',
      retailer: 'Bradford White — product catalog',
    },
    service: {
      name: 'Water heater installers — quotes (Gaithersburg area)',
      url: 'https://www.thumbtack.com/k/water-heater-installation/near-me/',
      imageUrl: '/task-listings/svc-water-heater-pro.jpeg',
      imageAlt: 'Thumbtack pro profile photo — water heater installer',
      priceDisplay: 'Installed projects often $1,400–$3,500 (regional)',
      providerLabel: 'Thumbtack — water heater installation',
    },
  },
  't-hvac': {
    product: {
      name: 'Carrier Infinity® 23 heat pump (27VNA3) — Puron Advance®',
      url: 'https://www.carrier.com/us/en/residential/heat-pumps/27vna3/',
      imageUrl: '/task-listings/carrier-infinity-heat-pump.png',
      imageAlt: 'Carrier Infinity 23 heat pump outdoor unit (product image, Carrier brand portal)',
      priceDisplay: 'Equipment $7k–$14k+ before labor (size & tier)',
      retailer: 'Carrier — Infinity 23 product page',
    },
    service: {
      name: 'HVAC contractors — Gaithersburg, MD',
      url: 'https://www.thumbtack.com/md/gaithersburg/hvac/',
      imageUrl: '/task-listings/svc-hvac-pro.jpeg',
      imageAlt: 'Thumbtack pro profile photo — HVAC contractor',
      priceDisplay: 'Full changeouts commonly $8k–$16k (market-dependent)',
      providerLabel: 'Thumbtack — HVAC near Gaithersburg',
    },
  },
  't-roof': {
    product: {
      name: 'Owens Corning TruDefinition® Duration® architectural shingles (matches builder spec in your contract)',
      url: 'https://www.owenscorning.com/en-us/roofing/shingles/trudefinition-duration',
      imageUrl: '/task-listings/owens-corning-duration-shingles.jpg',
      imageAlt: 'Architectural asphalt shingles on a residential roof (photo)',
      priceDisplay: 'Materials often $140–$200/sq (contractor quote for full job)',
      retailer: 'Owens Corning — Duration product page',
    },
    service: {
      name: 'Roofing contractors — Gaithersburg, MD',
      url: 'https://www.thumbtack.com/md/gaithersburg/roofing/',
      imageUrl: '/task-listings/svc-roofing-pro.jpeg',
      imageAlt: 'Thumbtack pro profile photo — roofing contractor',
      priceDisplay: 'Repairs $500–$2.5k · full replace often $10k–$20k+',
      providerLabel: 'Thumbtack — roofing near Gaithersburg',
    },
  },
  't-plumb': {
    product: {
      name: 'Freeze-resistant sillcock / hose bib (replacement hardware)',
      url: 'https://www.homedepot.com/b/Plumbing-Hose-Bibs-Valves-Sillcocks/N-5yc1vZc5ae',
      imageUrl: '/task-listings/outdoor-faucet.jpg',
      imageAlt: 'Outdoor wall-mounted water faucet (hose bib)',
      priceDisplay: 'Parts $25–$85 · full swap with interior access higher',
      retailer: 'The Home Depot — sillcocks & hose bibs',
    },
    service: {
      name: 'Plumbers — Gaithersburg, MD',
      url: 'https://www.thumbtack.com/md/gaithersburg/plumbing/',
      imageUrl: '/task-listings/svc-plumber-pro.jpeg',
      imageAlt: 'Thumbtack pro profile photo — plumber',
      priceDisplay: 'Service calls ~$150–$350+ (MoCo typical)',
      providerLabel: 'Thumbtack — plumbers near Gaithersburg',
    },
  },
  't-panel': {
    product: {
      name: 'Siemens VersiCharge AC Level 2 EV charger (hardwire-ready)',
      url: 'https://www.siemens.com/en-us/products/emobility/versicharge/',
      imageUrl: '/task-listings/siemens-versicharge-product.jpg',
      imageAlt: 'Siemens VersiCharge EV charger (official product image, Siemens CDN)',
      priceDisplay: 'Hardware $400–$900+ · panel work often separate',
      retailer: 'Siemens USA — VersiCharge (eMobility product hub)',
    },
    service: {
      name: 'Electricians — Gaithersburg, MD (panel & EV circuit)',
      url: 'https://www.thumbtack.com/md/gaithersburg/electricians/',
      imageUrl: '/task-listings/svc-electrician-pro.jpeg',
      imageAlt: 'Thumbtack pro profile photo — electrician',
      priceDisplay: 'Panel + EV prep often $1.5k–$4k+ (scope-dependent)',
      providerLabel: 'Thumbtack — electricians near Gaithersburg',
    },
  },
  't-appliances': {
    product: {
      name: 'Bosch 300 Series built-in dishwasher (quiet / efficient)',
      url: 'https://www.homedepot.com/b/Appliances-Dishwashers/Bosch/N-5yc1vZc5ae',
      imageUrl: '/task-listings/bosch-dishwasher-open.jpg',
      imageAlt: 'Built-in dishwasher with dishes loaded (product context)',
      priceDisplay: 'Typ. $899–$1,299 before delivery & install',
      retailer: 'The Home Depot — Bosch dishwashers',
    },
    service: {
      name: 'Appliance repair & installation pros',
      url: 'https://www.thumbtack.com/k/appliance-repair/near-me/',
      imageUrl: '/task-listings/svc-appliance-pro.jpeg',
      imageAlt: 'Thumbtack pro profile photo — appliance technician',
      priceDisplay: 'Install bundles often $99–$199 per appliance (retailer) · pro rates vary',
      providerLabel: 'Thumbtack — appliance repair + The Home Depot services',
    },
  },
}
