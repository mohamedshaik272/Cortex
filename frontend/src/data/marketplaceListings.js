/**
 * Marketplace SKUs and install services for Gaithersburg / MoCo corridor.
 * Key product thumbnails live under /public/marketplace-preview/ (manufacturer / listing snapshots).
 */

export const MARKETPLACE_PRODUCTS = [
  {
    id: 'prod-gaf-timberline-hdz',
    vertical: 'roof',
    name: 'Architectural shingle bundle (installed sizing)',
    brand: 'GAF',
    model: 'Timberline HDZ Charcoal',
    priceMinUsd: 11800,
    priceMaxUsd: 16200,
    imageUrl: '/marketplace-preview/gaf-shingle-bundle.jpg',
    imageAlt: 'Architectural asphalt shingles on a roof (product-style photo)',
    logistics: {
      leadTime: 'Materials 5–10 business days (distributor Rockville / Frederick)',
      fulfillment: 'Lift-load to curb; steep-slope crew 2–3 days',
      notes: 'Ice & water per IRC; county permit bundled in turnkey quotes.',
    },
    matchesPrediction: 'Recommended for homes approaching a roof replacement. Upgrade from 3-tab to dimensional laminate.',
  },
  {
    id: 'prod-owens-duration',
    vertical: 'roof',
    name: 'Impact-rated laminate system',
    brand: 'Owens Corning',
    model: 'Duration Storm (class 3 hail)',
    priceMinUsd: 13200,
    priceMaxUsd: 17800,
    imageUrl:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'House roofline at sunset',
    logistics: {
      leadTime: '10–14 days specialty color runs',
      fulfillment: 'Manufacturer warranty registration via certified installer',
      notes: 'Good pairing with storm-protection upgrades in high-exposure areas.',
    },
    matchesPrediction: 'Recommended when seasonal storm risk is high and the roof is aging.',
  },
  {
    id: 'prod-carrier-24vna',
    vertical: 'hvac',
    name: 'Variable-speed heat pump system',
    brand: 'Carrier',
    model: 'Infinity 24VNA6 (cold-climate sizing)',
    priceMinUsd: 11200,
    priceMaxUsd: 15800,
    imageUrl: '/marketplace-preview/carrier-heat-pump.png',
    imageAlt: 'Carrier Infinity heat pump outdoor unit (manufacturer product image)',
    logistics: {
      leadTime: 'Equipment 1–2 weeks; line set & pad as-built survey',
      fulfillment: 'MD HVAC licensed; refrigerant recovery on R-22 retirements',
      notes: 'May qualify for utility rebates and IRA efficiency tax credits.',
    },
    matchesPrediction: 'Recommended when the heat pump is 8+ years old or still uses R-22 refrigerant.',
  },
  {
    id: 'prod-mitsubishi-puz',
    vertical: 'hvac',
    name: 'Ducted multi-position air handler + heat pump',
    brand: 'Mitsubishi Electric',
    model: 'PUZ-A / SVZ for existing duct retrofit',
    priceMinUsd: 9800,
    priceMaxUsd: 14200,
    imageUrl:
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'HVAC technician checking indoor air handler',
    logistics: {
      leadTime: '2–3 weeks (multi-split allocation)',
      fulfillment: 'Cold-weather commissioning checklist included',
      notes: 'Good fit for tight lots like Meridian Alder plans with limited side-yard space.',
    },
    matchesPrediction: 'Recommended when utility costs are high and the HVAC system is aging.',
  },
  {
    id: 'prod-aquajet-pro-50',
    vertical: 'water_heater',
    name: '50-gal hybrid heat-pump water heater',
    brand: 'AquaJet Thermal',
    model: 'Pro 50 Hybrid',
    priceMinUsd: 2899,
    priceMaxUsd: 3499,
    imageUrl: '/marketplace-preview/rheem-hybrid-hpwh.webp',
    imageAlt: 'Hybrid heat-pump water heater (AquaJet Thermal Pro 50)',
    logistics: {
      leadTime: 'In-stock at regional distributor within 3–5 days',
      fulfillment: 'Garage or closet retrofit kit; condensate routing spec sheet',
      notes: '30A circuit check included with bundled install.',
    },
    matchesPrediction:
      'Recommended when the tank water heater is 7+ years old or health drops below 68%.',
  },
  {
    id: 'prod-rheem-proterra',
    vertical: 'water_heater',
    name: '65-gal hybrid electric (high EF)',
    brand: 'Rheem',
    model: 'ProTerra 65',
    priceMinUsd: 2599,
    priceMaxUsd: 3199,
    imageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Plumbing and water lines in a utility room',
    logistics: {
      leadTime: '5–7 days MoCo warehouse',
      fulfillment: 'HOA-friendly noise spec for town-adjacent lots',
      notes: 'Often paired with a panel upgrade when electrical capacity is limited.',
    },
    matchesPrediction: 'Recommended when the water heater is aging and wholesale pricing is available.',
  },
  {
    id: 'prod-siemens-mm',
    vertical: 'electrical_panel',
    name: '200A main breaker panel + whole-home surge',
    brand: 'Siemens',
    model: 'Ultimate MM / first-surge kit',
    priceMinUsd: 2200,
    priceMaxUsd: 3400,
    imageUrl:
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Electrical circuit breaker panel door open',
    logistics: {
      leadTime: 'PEPCO disconnect window 10–15 business days typical',
      fulfillment: 'Trenchless service upgrade if mast ampacity limited',
      notes: 'Needed to support heat-pump water heaters and Level 2 EV charging on older 100A panels.',
    },
    matchesPrediction: 'Recommended when the panel is under 200A or over 16 years old.',
  },
  {
    id: 'prod-square-d-homeline',
    vertical: 'electrical_panel',
    name: '150–200A load center + AFCI suite',
    brand: 'Schneider Square D',
    model: 'Homeline with plug-on neutral',
    priceMinUsd: 1850,
    priceMaxUsd: 2800,
    imageUrl:
      'https://images.unsplash.com/photo-1621905251189-3bfe6d9f1a3d?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Electrician working on residential wiring',
    logistics: {
      leadTime: 'Permit + inspect cycle ~1 week in Montgomery County',
      fulfillment: 'Stickered for IRC 2021 AFCI coverage on kitchen circuits',
      notes: 'Usually done before an HVAC or water heater replacement.',
    },
    matchesPrediction: 'Recommended alongside a panel upgrade when electrical capacity is the bottleneck.',
  },
  {
    id: 'prod-pgt-winguard',
    vertical: 'storm_envelope',
    name: 'Impact laminated openings package (per opening est.)',
    brand: 'PGT',
    model: 'WinGuard Vinyl',
    priceMinUsd: 620,
    priceMaxUsd: 980,
    imageUrl:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Large windows in a modern living room',
    logistics: {
      leadTime: '8–12 weeks custom sizing',
      fulfillment: 'FBC / DP rating matched to county wind maps',
      notes: 'Long lead times — order before storm season starts.',
    },
    matchesPrediction: 'Recommended for homes with higher climate exposure or multiple seasonal risks.',
  },
  {
    id: 'prod-gutter-guard-pro',
    vertical: 'storm_envelope',
    name: 'Seamless aluminum + micro-mesh guards (linear ft)',
    brand: 'LeafGuard / local fab',
    model: '0.032 aluminum, baked enamel',
    priceMinUsd: 18,
    priceMaxUsd: 28,
    imageUrl:
      'https://images.unsplash.com/photo-1464146072230-229c8783a922?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Roof edge and gutter on a suburban home',
    logistics: {
      leadTime: 'Measure-to-install 2–4 weeks',
      fulfillment: 'Pitch-matched hangers; overflow testing on heavy tree lots',
      notes: 'Price per foot — totals scale with roof complexity.',
    },
    matchesPrediction: 'Pairs well with other storm-protection work.',
  },
]

export const MARKETPLACE_SERVICES = [
  {
    id: 'svc-roof-turnkey',
    vertical: 'roof',
    name: 'Turnkey tear-off + install + disposal',
    providerLabel: 'Capitol Exteriors GC',
    priceMinUsd: 9200,
    priceMaxUsd: 14800,
    imageUrl:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Construction crew on a residential roof',
    logistics: {
      scheduling: 'Typically 2–4 week lead in peak season; storm damage gets priority',
      serviceArea: 'Montgomery County + Frederick corridor',
      jobDuration: '2–3 days on-site for single-family gable',
    },
    matchesPrediction: 'Priced for full tear-off and replacement on single-family homes.',
  },
  {
    id: 'svc-hvac-replace',
    vertical: 'hvac',
    name: 'Full changeout + startup + warranty registration',
    providerLabel: 'Pleasant Air Mechanical',
    priceMinUsd: 6800,
    priceMaxUsd: 11200,
    imageUrl:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'HVAC tools and equipment in a service van',
    logistics: {
      scheduling: 'Dispatch within 5–10 days; emergency heat strip loaner if needed',
      serviceArea: 'Gaithersburg / Germantown / Clarksburg',
      jobDuration: '1–2 days including line flush & vacuum',
    },
    matchesPrediction: 'Includes old refrigerant removal and disposal.',
  },
  {
    id: 'svc-wh-install',
    vertical: 'water_heater',
    name: 'Hybrid WH install + electrical mini-upgrade',
    providerLabel: 'Blue Pipe Services',
    priceMinUsd: 1200,
    priceMaxUsd: 2200,
    imageUrl:
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777d79?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Plumber installing connections on a water heater',
    logistics: {
      scheduling: 'Usually next-week slots; same-day for active leaks (premium)',
      serviceArea: 'Willowbrook Estates + 12 mi radius',
      jobDuration: '4–8 hours including fill & heat-up validation',
    },
    matchesPrediction: 'Available alongside product purchase when the water heater needs replacing.',
  },
  {
    id: 'svc-panel-upgrade',
    vertical: 'electrical_panel',
    name: 'Service upgrade + grounding + labeling',
    providerLabel: 'Potomac Electric Co-op install partner',
    priceMinUsd: 1800,
    priceMaxUsd: 4200,
    imageUrl:
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Residential electrical panel with breakers',
    logistics: {
      scheduling: 'Utility disconnect coordinated; 1-day cutover typical',
      serviceArea: 'PEPCO territory — Montgomery County',
      jobDuration: '6–10 hours with inspection sign-off',
    },
    matchesPrediction: 'Required before installing high-draw heat pumps on undersized panels.',
  },
  {
    id: 'svc-envelope-assessment',
    vertical: 'storm_envelope',
    name: 'Wind / water intrusion assessment + photo report',
    providerLabel: 'Mid-Atlantic Building Science',
    priceMinUsd: 450,
    priceMaxUsd: 750,
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Home exterior facade inspection',
    logistics: {
      scheduling: 'Within 7 days; after storms prioritized',
      serviceArea: 'DMV exurbs',
      jobDuration: '2–3 hours on-site + 48h report turnaround',
    },
    matchesPrediction: 'Start here to assess what your home needs before ordering windows or gutters.',
  },
]

export function productsForVertical(v) {
  return MARKETPLACE_PRODUCTS.filter((p) => p.vertical === v)
}

export function servicesForVertical(v) {
  return MARKETPLACE_SERVICES.filter((s) => s.vertical === v)
}

/** One product + one service per predicted need (first SKU in each list). */
export function bundleForNeeds(needIds) {
  const needs = [...new Set(needIds)]
  const pairs = needs.map((need) => {
    const [product] = productsForVertical(need)
    const [service] = servicesForVertical(need)
    return { need, product, service }
  }).filter((x) => x.product && x.service)
  return { needs, pairs }
}
