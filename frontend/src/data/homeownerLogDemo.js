import { hotspotFor } from './willowbrookPlanLayouts'

/** Default home for the consumer log — strong water-heater + warranty narrative */
export const LOG_HOME_ID = 'wb-10'

/* ── Consolidated view helpers (kept from original main) ── */

export function computeHomeHealth(home) {
  const appHealthAvg = home.appliances.length > 0
    ? home.appliances.reduce((s, a) => s + a.healthPct, 0) / home.appliances.length
    : 75
  const roofScore = home.roof.condition === 'good' ? 96
    : home.roof.condition === 'fair' ? 82
    : 58
  const hvacAge = Math.max(50, 100 - home.hvac.ageYears * 3)
  const hvacScore = home.hvac.refrigerantType === 'R-22'
    ? Math.round(hvacAge * 0.88)
    : hvacAge
  const elecScore = home.electric.panelAmps >= 200 ? 94 : 76
  const plumbScore = home.plumbing.knownIssues ? 78 : 94

  return Math.round(
    appHealthAvg * 0.35 +
    roofScore * 0.20 +
    hvacScore * 0.20 +
    elecScore * 0.10 +
    plumbScore * 0.15,
  )
}

export function buildAlerts(home) {
  const alerts = []

  alerts.push({
    title: 'Smoke detector batch expires',
    severity: 'action',
    timeframe: '6 wks',
    description:
      'Three units in the 2nd floor hallway share the same install date. Replacement window opens in 6 weeks.',
  })

  if (home.hvac.ageYears >= 5) {
    alerts.push({
      title: 'HVAC efficiency drift',
      severity: 'watch',
      timeframe: null,
      description: home.hvac.refrigerantType === 'R-22'
        ? 'R-22 system — cooling output has dropped compared to last season. R-22 costs are rising; start planning a replacement.'
        : 'Cooling output has dropped about 8% compared to last season at similar temperatures. Filters are fine — consider a coil inspection.',
    })
  }

  const wh = home.appliances.find((a) => /water heater/i.test(a.name))
  if (wh && wh.ageYears >= 5) {
    alerts.push({
      title: 'Water heater anode rod',
      severity: wh.healthPct < 65 ? 'action' : 'watch',
      timeframe: wh.healthPct < 65 ? '3-6 mo' : '14-18 mo',
      description: wh.healthPct < 65
        ? `Health at ${wh.healthPct}%. The anode rod probably needs replacing — schedule an inspection before the tank starts corroding.`
        : 'Based on your local water hardness, the anode rod will probably need replacing within the next 1–2 years.',
    })
  }

  if (home.roof.condition !== 'good') {
    alerts.push({
      title: 'Roof condition flagged',
      severity: home.roof.condition === 'replace_soon' ? 'action' : 'watch',
      timeframe: home.roof.condition === 'replace_soon' ? '12-24 mo' : null,
      description: home.roof.notes,
    })
  }

  return alerts
}

export function buildMaintenanceHorizon() {
  return [
    {
      date: 'Apr 12',
      title: 'Gutter & downspout check',
      description: 'Clear post-winter debris. Your area has ice dam risk.',
    },
    {
      date: 'May 3',
      title: 'AC startup & refrigerant sweep',
      description: 'Get ahead of the first hot week of the season.',
    },
    {
      date: 'Jun 1',
      title: 'Exterior caulk & flashing review',
      description: 'High humidity area — check seals and weatherproofing.',
    },
  ]
}

export function buildSuggestedNextSteps() {
  return [
    {
      title: 'Unify two partial repair histories',
      description:
        'A 2019 dishwasher repair only shows up in email. Merge it with your warranty PDF to keep everything in one place.',
      cta: 'Import & merge',
    },
    {
      title: 'Pre-emptive LED swap in kitchen',
      description:
        'Kitchen light fixtures are getting old. Replacing them all at once saves money versus doing them one at a time.',
      cta: 'Schedule bundle',
    },
  ]
}

export const SERVICE_HISTORY = [
  { icon: 'search', title: 'Water Heater Inspection', cost: '$125.00', desc: 'Rumbling noise and higher energy use. Recommended replacement within 6-12 months.', meta: 'Mar 10, 2026 \u00b7 Fairfax Plumbing Pros' },
  { icon: 'build', title: 'Gas Furnace Annual Tune-Up', cost: '$210.00', desc: 'Cleaned burners and verified normal operation. Seasonal maintenance.', meta: 'Oct 5, 2025 \u00b7 Northern Virginia Heating & Air' },
  { icon: 'plumbing', title: 'Washer Drain Repair', cost: '$220.00', desc: 'Cleared partial blockage, but the issue returned within a week.', meta: 'Sep 14, 2025 \u00b7 RapidFix Home Services' },
  { icon: 'handyman', title: 'Water Softener Maintenance', cost: '$145.00', desc: 'Removed salt bridge, cleaned brine tank. System operating normally.', meta: 'May 11, 2025 \u00b7 Fairfax Plumbing Pros' },
  { icon: 'build', title: 'Water Heater Repair', cost: '$275.00', desc: 'Replaced heating element and flushed tank. Rattling noise resolved.', meta: 'Aug 21, 2024 \u00b7 Fairfax Plumbing Pros' },
]

export const VAULT_FILES = [
  'Rheem Water Heater Warranty PDF',
  'Water Heater Repair Invoice 2024',
  'Water Heater Replacement Estimate 2026',
  'Carrier Furnace Manual',
  'Samsung Washer Manual',
  'Washer Drain Repair Invoice 2025',
  'Plumber Follow-Up Email',
  'Electric Bill March 2026',
]

/* ── clearview2 additions ────────────────────────────── */

export const SAMPLE_CONTRACT_TEXT = `
RESIDENTIAL PURCHASE AND SALE AGREEMENT — DEMO
Property: 18464 Meridian Way, Gaithersburg, MD 20878
Closing date: March 15, 2017

BUILDER WARRANTY — MERIDIAN HOMES PHASE I
Structural coverage through March 14, 2027. Systems coverage (HVAC rough-in, plumbing supply lines)
through March 14, 2025. Workmanship one year from closing.

HVAC — Carrier equipment registered with manufacturer.
Limited parts warranty 10 years from installation date April 2017. Labor 12 months from install.

WATER HEATER — Bradford White model M450T6FBN
Manufacturer limited tank warranty 6 years parts from installation August 2017.
Owner must maintain anode rod inspection — exclusion if sediment damage or flood.

ROOF — Owens Corning Duration architectural shingles
Material warranty 25 years wind/algae limited. Workmanship 5 years by installer.

Closing costs include title insurance, recording fees, and prorated property taxes.
HOA: Willowbrook Estates — quarterly dues; architectural review required for exterior changes.
`

export const AREA_BENCHMARKS = [
  {
    label: 'Plumbing service call (median)',
    metroMedianUsd: '$185–320',
    thisZipNote: 'Gaithersburg (20878) tends to run about 4% above the DC-area average.',
  },
  {
    label: 'HVAC tune-up',
    metroMedianUsd: '$120–220',
    thisZipNote: 'Prices peak June through August.',
  },
  {
    label: 'Tank WH replacement (installed)',
    metroMedianUsd: '$1,400–2,800',
    thisZipNote: 'Heat-pump hybrid units add about $1.2k–2.5k over a standard gas tank.',
  },
]

export const SERVICE_PROVIDERS = [
  {
    id: 'p1',
    name: 'Piedmont Plumbing Co.',
    specialty: 'Water heaters, repipes, gas lines',
    rating: 4.8,
    reviewCount: 312,
    phone: '(301) 424-6080',
    url: 'https://www.thumbtack.com/md/gaithersburg/plumbing/',
    serviceRadius: '15 mi · Gaithersburg',
    typicalCostRangeUsd: '$175 visit · $1.6k–2.4k WH swap',
    costIndexVsArea: 1.04,
  },
  {
    id: 'p2',
    name: 'Capital HVAC Partners',
    specialty: 'Heat pumps, R-22 phaseout, zoning',
    rating: 4.7,
    reviewCount: 528,
    phone: '(240) 772-5130',
    url: 'https://www.thumbtack.com/md/gaithersburg/hvac/',
    serviceRadius: 'Montgomery County',
    typicalCostRangeUsd: '$149 tune-up · $6k–14k replace',
    costIndexVsArea: 1.02,
  },
  {
    id: 'p3',
    name: 'Metro Handyman Collective',
    specialty: 'Drywall, trim, smart home, small electric',
    rating: 4.6,
    reviewCount: 891,
    phone: '(301) 850-9290',
    url: 'https://www.thumbtack.com/md/gaithersburg/handyman/',
    serviceRadius: 'DMV',
    typicalCostRangeUsd: '$95/hr · min 2 hr',
    costIndexVsArea: 0.98,
  },
  {
    id: 'p4',
    name: 'Ridge Roofing & Exteriors',
    specialty: 'Shingle, flashing, storm repair',
    rating: 4.9,
    reviewCount: 204,
    phone: '(301) 637-8450',
    url: 'https://www.thumbtack.com/md/gaithersburg/roofing/',
    serviceRadius: '25 mi',
    typicalCostRangeUsd: '$350 inspection · $8k–18k full replace',
    costIndexVsArea: 1.08,
  },
]

export function buildSchedule(_home) {
  return [
    {
      id: 's1',
      title: 'HVAC seasonal tune-up',
      date: '2025-04-02',
      time: '9:00 AM',
      type: 'appointment',
      provider: 'Capital HVAC Partners',
      notes: 'Filter bring MERV 13; check heat pump charge.',
    },
    {
      id: 's2',
      title: 'Water heater flush & anode check',
      date: '2025-08-10',
      type: 'checkup',
      provider: 'Piedmont Plumbing Co.',
      notes: 'Due annually per manufacturer.',
    },
    {
      id: 's3',
      title: 'Roof visual (Year 2 builder program)',
      date: '2025-11-18',
      type: 'reminder',
      notes: 'Document north rake flashing.',
    },
    {
      id: 's4',
      title: 'Sewer lateral inspection',
      date: '2026-05-20',
      type: 'checkup',
      notes: 'Municipal cleanout at property line.',
    },
  ]
}

function appliance(home, re) {
  return home.appliances.find((a) => re.test(a.name))
}

export function buildFloorNodes(home) {
  const wh = home.appliances.find((a) => /water heater/i.test(a.name))
  const fridge = appliance(home, /refrigerator/i)
  const dw = appliance(home, /dishwasher/i)
  const range = appliance(home, /range/i)

  // Build task IDs that actually apply to this home so nodes only reference real tasks
  const activeTasks = new Set(buildProminentTasks(home).map((t) => t.id))
  const rel = (ids) => ids.filter((id) => activeTasks.has(id))

  return [
    {
      id: 'n-fridge',
      label: 'Refrigerator',
      category: 'appliance',
      layoutPct: hotspotFor(home, 'n-fridge'),
      detail: fridge
        ? `${fridge.brand} ${fridge.model} — ${fridge.ageYears} yrs, health ${fridge.healthPct}%.`
        : 'Kitchen refrigerator. See appliance details below.',
      relatedTaskIds: rel(['t-appliances']),
    },
    {
      id: 'n-range',
      label: 'Range / oven',
      category: 'appliance',
      layoutPct: hotspotFor(home, 'n-range'),
      detail: range
        ? `${range.brand} ${range.model} — ${range.ageYears} yrs. ${range.notes}`
        : 'Gas or dual-fuel range.',
      relatedTaskIds: rel(['t-appliances']),
    },
    {
      id: 'n-dishwasher',
      label: 'Dishwasher',
      category: 'appliance',
      layoutPct: hotspotFor(home, 'n-dishwasher'),
      detail: dw
        ? `${dw.brand} ${dw.model} — ${dw.ageYears} yrs. ${dw.notes}`
        : 'Built-in dishwasher.',
      relatedTaskIds: rel(['t-appliances']),
    },
    {
      id: 'n-laundry',
      label: 'Washer / dryer',
      category: 'appliance',
      layoutPct: hotspotFor(home, 'n-laundry'),
      detail:
        'Washer and dryer. Check hose bibs, drain pan, and vibration isolation periodically.',
      relatedTaskIds: rel(['t-appliances']),
    },
    {
      id: 'n-wh',
      label: 'Water heater',
      category: 'utility',
      layoutPct: hotspotFor(home, 'n-wh'),
      detail: wh
        ? `${wh.brand} ${wh.model} — ${wh.ageYears} yrs, ${wh.healthPct}% health. ${wh.notes}`
        : 'Mechanical closet',
      relatedTaskIds: rel(['t-wh-urgent']),
    },
    {
      id: 'n-hvac',
      label: 'HVAC / air handler',
      category: 'utility',
      layoutPct: hotspotFor(home, 'n-hvac'),
      detail: `${home.hvac.systemType} — ${home.hvac.ageYears} yrs. ${home.hvac.refrigerantType}.`,
      relatedTaskIds: rel(['t-hvac']),
    },
    {
      id: 'n-panel',
      label: 'Electrical panel',
      category: 'hardware',
      layoutPct: hotspotFor(home, 'n-panel'),
      detail: `${home.electric.panelAmps}A panel, ${home.electric.panelAgeYears} yrs.`,
      relatedTaskIds: rel(['t-panel']),
    },
    {
      id: 'n-roof',
      label: 'Roof / attic',
      category: 'maintenance',
      layoutPct: hotspotFor(home, 'n-roof'),
      detail: `${home.roof.material} — ${home.roof.condition}. ${home.roof.notes}`,
      relatedTaskIds: rel(['t-roof']),
    },
    {
      id: 'n-bath',
      label: 'Primary bath',
      category: 'maintenance',
      layoutPct: hotspotFor(home, 'n-bath'),
      detail: home.plumbing.knownIssues || 'PEX trunk; monitor fittings.',
      relatedTaskIds: rel(['t-plumb']),
    },
    {
      id: 'n-garage',
      label: 'Garage / hose bibs',
      category: 'maintenance',
      layoutPct: hotspotFor(home, 'n-garage'),
      detail: 'North-facing hose bib has freeze-thaw risk in winter.',
      relatedTaskIds: rel(['t-plumb']),
    },
  ]
}

export function buildWaterHeaterScenario(home) {
  const wh = home.appliances.find((a) => /water heater/i.test(a.name))
  if (!wh || (wh.healthPct >= 70 && wh.ageYears < 7)) return null
  return {
    current: {
      brand: wh.brand,
      model: wh.model,
      ageYears: wh.ageYears,
      healthPct: wh.healthPct,
      fuel: 'Natural gas',
      notes:
        'Pan corrosion found — watch for slow leaks. Anode rod is likely spent. Manufacturer warranty may not cover flood or sediment damage.',
    },
    keepVsUpgrade: {
      keepPros: ['No upfront cost if the tank still holds pressure', 'Existing venting and gas line work as-is'],
      keepCons: [
        'Higher standby loss vs heat-pump water heater',
        'Risk of failure goes up after year 8 — emergency replacements cost more than planned ones',
        'Warranty labor coverage has likely expired',
      ],
      upgradeBenefits: [
        'A heat-pump or high-efficiency tank can cut water-heating costs by 35–55%',
        'Utility rebates may be available in MD (check Pepco/DPLM programs)',
        'New warranty plus modern leak detection and Wi-Fi monitoring',
      ],
      upgradeCons: ['Higher upfront cost', 'Heat-pump units may need an electrical circuit upgrade', 'Need space for condensate drainage'],
    },
    replacements: [
      {
        id: 'r-tank',
        name: 'Like-for-like efficient tank (gas)',
        type: 'tank',
        installedRangeUsd: '$1,600–2,400',
        estAnnualSavingsUsd: '$60–120 vs aging unit',
        notes: 'Fastest path; smallest electrical impact.',
      },
      {
        id: 'r-hp',
        name: 'Heat-pump water heater (hybrid)',
        type: 'heat-pump',
        installedRangeUsd: '$2,800–4,200',
        estAnnualSavingsUsd: '$180–340 estimated',
        notes: 'Best efficiency; verify closet air volume & condensate.',
      },
      {
        id: 'r-tankless',
        name: 'Gas tankless',
        type: 'tankless',
        installedRangeUsd: '$2,200–3,600',
        estAnnualSavingsUsd: '$80–200',
        notes: 'Endless hot water; may require gas line upsizing.',
      },
    ],
  }
}

export function buildProminentTasks(home) {
  const tasks = []
  const wh = home.appliances.find((a) => /water heater/i.test(a.name))

  // Water heater — only if health is concerning or age is high
  if (wh && (wh.healthPct < 70 || wh.ageYears >= 7)) {
    const isUrgent = wh.healthPct < 65
    tasks.push({
      id: 't-wh-urgent',
      title: isUrgent
        ? 'Water heater — corrosion detected'
        : 'Water heater — getting older, plan ahead',
      urgency: isUrgent ? 'urgent' : 'soon',
      summary: isUrgent
        ? `Pan corrosion found and health is at ${wh.healthPct}%. Consider replacing within 6–12 months.`
        : `${wh.brand} ${wh.model} is ${wh.ageYears} years old at ${wh.healthPct}% health. Keep an eye on it and budget for replacement.`,
      estCostHomeUsd: '$1,700–2,600 (tank) · $2,900–4,300 (hybrid)',
      estCostAreaTypicalUsd: AREA_BENCHMARKS[2].metroMedianUsd,
      warrantyRefIds: ['w-wh'],
      warrantyNote:
        'Manufacturer warranty may be expired or limited to parts only. Labor is usually not covered.',
      serviceOptions: [
        { label: 'Piedmont Plumbing — swap + permit', estUsd: '$1,850–2,500' },
        { label: 'Big-box install network', estUsd: '$1,400–2,200' },
      ],
      productOptions: [
        {
          label: 'Bradford White equivalent tank',
          pros: ['Drop-in gas venting', 'Lower upfront'],
          cons: ['Standby loss', 'Shorter efficient life vs hybrid'],
        },
        {
          label: 'Heat-pump water heater',
          pros: ['Lowest operating cost', 'Rebate potential'],
          cons: ['Higher install', 'Electrical / space needs'],
        },
      ],
    })
  }

  // HVAC — only if R-22 or age >= 8
  if (home.hvac.refrigerantType === 'R-22' || home.hvac.ageYears >= 8) {
    const isLegacy = home.hvac.refrigerantType === 'R-22'
    tasks.push({
      id: 't-hvac',
      title: isLegacy
        ? 'HVAC — uses R-22 refrigerant'
        : 'HVAC — aging system, plan ahead',
      urgency: isLegacy ? 'soon' : 'planned',
      summary: isLegacy
        ? `${home.hvac.systemType}: R-22 service costs are rising. Plan a replacement before the next major repair.`
        : `${home.hvac.systemType} is ${home.hvac.ageYears} years old. Schedule an efficiency check and start budgeting for a replacement.`,
      estCostHomeUsd: '$8,500–14,000',
      estCostAreaTypicalUsd: '$7k–13k metro',
      warrantyRefIds: ['w-hvac'],
      warrantyNote: 'Manufacturer parts warranty may still cover some components — check your registration and serial number.',
      serviceOptions: [
        { label: 'Capital HVAC — full system', estUsd: '$9k–13k' },
        { label: 'Tune-up only (delay)', estUsd: '$149–219' },
      ],
    })
  }

  // Roof — only if condition is not good
  if (home.roof.condition !== 'good') {
    const isReplaceSoon = home.roof.condition === 'replace_soon'
    tasks.push({
      id: 't-roof',
      title: isReplaceSoon
        ? 'Roof — replacement coming up'
        : 'Roof — needs attention, keep monitoring',
      urgency: isReplaceSoon ? 'soon' : 'planned',
      summary: home.roof.notes,
      estCostHomeUsd: isReplaceSoon ? '$9,000–17,000' : '$800–2,500 (repair scope)',
      estCostAreaTypicalUsd: '$8k–16k',
      warrantyRefIds: ['w-roof', 'w-builder'],
      warrantyNote: 'Builder structural warranty may cover this if still within term and the issue is workmanship-related. Material warranty is separate.',
      serviceOptions: [
        { label: 'Ridge Roofing — repair scope', estUsd: '$800–2,500' },
        ...(isReplaceSoon ? [{ label: 'Full replacement', estUsd: '$12k–18k' }] : []),
      ],
    })
  }

  // Plumbing — only if there are known issues
  if (home.plumbing.knownIssues) {
    tasks.push({
      id: 't-plumb',
      title: 'Plumbing — active issues',
      urgency: 'planned',
      summary: home.plumbing.knownIssues,
      estCostHomeUsd: '$120–450',
      estCostAreaTypicalUsd: AREA_BENCHMARKS[0].metroMedianUsd,
      warrantyRefIds: [],
      warrantyNote: 'Normal wear isn\'t covered by warranty. A sudden leak may be covered by homeowners insurance (minus deductible).',
      serviceOptions: [{ label: 'Piedmont — service call', estUsd: '$175–320' }],
    })
  }

  // Electrical — only if panel < 200A (upgrade needed)
  if (home.electric.panelAmps < 200) {
    tasks.push({
      id: 't-panel',
      title: 'Electrical — panel upgrade recommended',
      urgency: 'planned',
      summary: home.electric.notes,
      estCostHomeUsd: '$1,200–3,500',
      estCostAreaTypicalUsd: '$1k–3k',
      warrantyRefIds: ['w-builder'],
      warrantyNote: 'The original builder panel may still be under systems coverage — check your contract dates.',
      serviceOptions: [
        { label: 'Panel upgrade + EV stub', estUsd: '$2k–3.5k' },
      ],
    })
  }

  // Kitchen appliances — only if any appliance has low health or high age
  const kitchenAppliances = home.appliances.filter((a) =>
    /refrigerator|dishwasher|range/i.test(a.name),
  )
  const hasAgingAppliance = kitchenAppliances.some(
    (a) => a.healthPct < 75 || a.ageYears >= 8,
  )
  if (hasAgingAppliance) {
    const aging = kitchenAppliances.filter((a) => a.healthPct < 75 || a.ageYears >= 8)
    tasks.push({
      id: 't-appliances',
      title: 'Kitchen appliances — aging',
      urgency: 'planned',
      summary: aging.map((a) => `${a.name} (${a.ageYears} yrs, ${a.healthPct}%)`).join('; ') + '.',
      estCostHomeUsd: '$400–2,200',
      estCostAreaTypicalUsd: 'varies',
      warrantyRefIds: [],
      warrantyNote: 'Manufacturer warranties on appliances are typically 1–5 years. Check if extended coverage was purchased at closing.',
      serviceOptions: [{ label: 'Metro Handyman — minor repairs', estUsd: '$95/hr' }],
    })
  }

  return tasks
}
