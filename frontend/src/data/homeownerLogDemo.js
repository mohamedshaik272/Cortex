/** Default home for the consumer log — strong water-heater + warranty narrative */
export const LOG_HOME_ID = 'wb-10';

/* ── Consolidated view helpers ────────────────────────── */

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
        ? 'Legacy R-22 system. Cooling delta widened vs. last season. Refrigerant costs rising; plan transition.'
        : 'Cooling delta has widened 8% vs. last season for comparable outdoor temps. Filter cycle aligned; coil inspection suggested.',
    })
  }

  const wh = home.appliances.find((a) => /water heater/i.test(a.name))
  if (wh && wh.ageYears >= 5) {
    alerts.push({
      title: 'Water heater anode horizon',
      severity: wh.healthPct < 65 ? 'action' : 'watch',
      timeframe: wh.healthPct < 65 ? '3-6 mo' : '14-18 mo',
      description: wh.healthPct < 65
        ? `Health at ${wh.healthPct}%. Sacrificial anode likely depleted. Schedule inspection before failure window.`
        : 'Based on local water hardness and usage, sacrificial anode replacement likely within 2 seasons.',
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
      description: 'Post-winter debris; ice dam risk region',
    },
    {
      date: 'May 3',
      title: 'AC startup & refrigerant sweep',
      description: 'Ahead of first 85\u00b0F+ week per climate model',
    },
    {
      date: 'Jun 1',
      title: 'Exterior caulk & flashing review',
      description: 'Coastal humidity exposure index elevated',
    },
  ]
}

export function buildSuggestedNextSteps() {
  return [
    {
      title: 'Unify two partial repair histories',
      description:
        'A 2019 dishwasher repair appears in email only; merge with warranty PDF for a complete lifecycle view.',
      cta: 'Import & merge',
    },
    {
      title: 'Pre-emptive LED swap in kitchen',
      description:
        'Fixture hours exceed cohort median; group replacement avoids staggered failures and bulk pricing.',
      cta: 'Schedule bundle',
    },
  ]
}

export const SAMPLE_CONTRACT_TEXT = `
RESIDENTIAL PURCHASE AND SALE AGREEMENT
Property: 18464 Meridian Way, Gaithersburg, MD 20878
Closing date: March 15, 2017

BUILDER WARRANTY: MERIDIAN HOMES PHASE I
Structural coverage through March 14, 2027. Systems coverage (HVAC rough-in, plumbing supply lines)
through March 14, 2025. Workmanship one year from closing.

HVAC: Carrier equipment registered with manufacturer.
Limited parts warranty 10 years from installation date April 2017. Labor 12 months from install.

WATER HEATER: Bradford White model M450T6FBN
Manufacturer limited tank warranty 6 years parts from installation August 2017.
Owner must maintain anode rod inspection. Exclusion if sediment damage or flood.

ROOF: Owens Corning Duration architectural shingles
Material warranty 25 years wind/algae limited. Workmanship 5 years by installer.

Closing costs include title insurance, recording fees, and prorated property taxes.
HOA: Willowbrook Estates. Quarterly dues; architectural review required for exterior changes.
`;

export const AREA_BENCHMARKS = [
  {
    label: 'Plumbing service call (median)',
    metroMedianUsd: '$185\u2013320',
    thisZipNote: 'Gaithersburg 20878 runs ~4% above metro median (labor + trip).',
  },
  {
    label: 'HVAC tune-up',
    metroMedianUsd: '$120\u2013220',
    thisZipNote: 'Seasonal demand spikes June\u2013August.',
  },
  {
    label: 'Tank WH replacement (installed)',
    metroMedianUsd: '$1,400\u20132,800',
    thisZipNote: 'Hybrid / heat-pump tanks typically +$1.2k\u20132.5k vs standard gas.',
  },
];

export const SERVICE_PROVIDERS = [
  {
    id: 'p1',
    name: 'Piedmont Plumbing Co.',
    specialty: 'Water heaters, repipes, gas lines',
    rating: 4.8,
    reviewCount: 312,
    phone: '(301) 555-0142',
    serviceRadius: '15 mi \u00b7 Gaithersburg',
    typicalCostRangeUsd: '$175 visit \u00b7 $1.6k\u20132.4k WH swap',
    costIndexVsArea: 1.04,
  },
  {
    id: 'p2',
    name: 'Capital HVAC Partners',
    specialty: 'Heat pumps, R-22 phaseout, zoning',
    rating: 4.7,
    reviewCount: 528,
    phone: '(240) 555-0199',
    serviceRadius: 'Montgomery County',
    typicalCostRangeUsd: '$149 tune-up \u00b7 $6k\u201314k replace',
    costIndexVsArea: 1.02,
  },
  {
    id: 'p3',
    name: 'Metro Handyman Collective',
    specialty: 'Drywall, trim, smart home, small electric',
    rating: 4.6,
    reviewCount: 891,
    phone: '(301) 555-0177',
    serviceRadius: 'DMV',
    typicalCostRangeUsd: '$95/hr \u00b7 min 2 hr',
    costIndexVsArea: 0.98,
  },
  {
    id: 'p4',
    name: 'Ridge Roofing & Exteriors',
    specialty: 'Shingle, flashing, storm repair',
    rating: 4.9,
    reviewCount: 204,
    phone: '(301) 555-0103',
    serviceRadius: '25 mi',
    typicalCostRangeUsd: '$350 inspection \u00b7 $8k\u201318k full replace',
    costIndexVsArea: 1.08,
  },
];

export function buildSchedule(_home) {
  return [
    { id: 's1', title: 'HVAC seasonal tune-up', date: '2025-04-02', time: '9:00 AM', type: 'appointment', provider: 'Capital HVAC Partners', notes: 'Filter bring MERV 13; check heat pump charge.' },
    { id: 's2', title: 'Water heater flush & anode check', date: '2025-08-10', type: 'checkup', provider: 'Piedmont Plumbing Co.', notes: 'Due annually per manufacturer.' },
    { id: 's3', title: 'Roof visual (Year 2 builder program)', date: '2025-11-18', type: 'reminder', notes: 'Document north rake flashing.' },
    { id: 's4', title: 'Sewer lateral inspection', date: '2026-05-20', type: 'checkup', notes: 'Municipal cleanout at property line.' },
  ];
}

export function buildFloorNodes(home) {
  const wh = home.appliances.find((a) => /water heater/i.test(a.name));
  return [
    { id: 'n-kitchen', label: 'Kitchen appliances', category: 'appliance', planPct: { x: 43, y: 22 }, detail: 'Refrigerator, dishwasher, range. See appliance list for ages and health.', relatedTaskIds: ['t-appliances'] },
    { id: 'n-wh', label: 'Water heater', category: 'utility', planPct: { x: 54, y: 19 }, detail: wh ? `${wh.brand} ${wh.model} · ${wh.ageYears} yrs, ${wh.healthPct}% health. ${wh.notes}` : 'Mechanical closet', relatedTaskIds: ['t-wh', 't-wh-urgent'] },
    { id: 'n-hvac', label: 'HVAC / air handler', category: 'utility', planPct: { x: 54, y: 26 }, detail: `${home.hvac.systemType} · ${home.hvac.ageYears} yrs. ${home.hvac.refrigerantType}.`, relatedTaskIds: ['t-hvac'] },
    { id: 'n-panel', label: 'Electrical panel', category: 'hardware', planPct: { x: 66, y: 48 }, detail: `${home.electric.panelAmps}A panel, ${home.electric.panelAgeYears} yrs.`, relatedTaskIds: ['t-panel'] },
    { id: 'n-roof', label: 'Roof / attic', category: 'maintenance', planPct: { x: 20, y: 11 }, detail: `${home.roof.material} · ${home.roof.condition}. ${home.roof.notes}`, relatedTaskIds: ['t-roof'] },
    { id: 'n-bath', label: 'Primary bath plumbing', category: 'maintenance', planPct: { x: 44, y: 52 }, detail: home.plumbing.knownIssues || 'PEX trunk; monitor fittings.', relatedTaskIds: ['t-plumb'] },
    { id: 'n-garage', label: 'Garage / hose bibs', category: 'maintenance', planPct: { x: 76, y: 42 }, detail: 'Freeze\u2013thaw risk on north hose bib per climate profile.', relatedTaskIds: ['t-plumb'] },
  ];
}

export function buildWaterHeaterScenario(home) {
  const wh = home.appliances.find((a) => /water heater/i.test(a.name));
  return {
    current: {
      brand: wh.brand,
      model: wh.model,
      ageYears: wh.ageYears,
      healthPct: wh.healthPct,
      fuel: 'Natural gas',
      notes: 'Pan corrosion noted. Monitor for slow leak. Anode likely depleted vs curve. Manufacturer limited warranty terms may exclude flood/sediment damage.',
    },
    keepVsUpgrade: {
      keepPros: ['No upfront capital if tank holds pressure & T&P passes', 'Familiar venting & gas line sizing'],
      keepCons: [
        'Higher standby loss vs heat-pump water heater',
        'Failure risk rises after year 8; emergency replacement often costs more than planned swap',
        'Limited warranty labor window likely expired',
      ],
      upgradeBenefits: [
        'Heat-pump or high-efficiency tank can cut water-heating cost 35\u201355% (modeled)',
        'Utility rebates may apply in MD (check Pepco/DPLM programs)',
        'New warranty + modern leak detection / Wi-Fi options',
      ],
      upgradeCons: ['Higher installed cost', 'May need electrical circuit upgrade for heat-pump WH', 'Space / condensate planning'],
    },
    replacements: [
      { id: 'r-tank', name: 'Like-for-like efficient tank (gas)', type: 'tank', installedRangeUsd: '$1,600\u20132,400', estAnnualSavingsUsd: '$60\u2013120 vs aging unit', notes: 'Fastest path; smallest electrical impact.' },
      { id: 'r-hp', name: 'Heat-pump water heater (hybrid)', type: 'heat-pump', installedRangeUsd: '$2,800\u20134,200', estAnnualSavingsUsd: '$180\u2013340 modeled', notes: 'Best efficiency; verify closet air volume & condensate.' },
      { id: 'r-tankless', name: 'Gas tankless', type: 'tankless', installedRangeUsd: '$2,200\u20133,600', estAnnualSavingsUsd: '$80\u2013200', notes: 'Endless hot water; may require gas line upsizing.' },
    ],
  };
}

export const SERVICE_HISTORY = [
  { icon: 'search', title: 'Water Heater Inspection', cost: '$125.00', desc: 'Rumbling noise and higher energy use. Recommended replacement within 6-12 months.', meta: 'Mar 10, 2026 \u00b7 Fairfax Plumbing Pros' },
  { icon: 'build', title: 'Gas Furnace Annual Tune-Up', cost: '$210.00', desc: 'Cleaned burners and verified normal operation. Seasonal maintenance.', meta: 'Oct 5, 2025 \u00b7 Northern Virginia Heating & Air' },
  { icon: 'plumbing', title: 'Washer Drain Repair', cost: '$220.00', desc: 'Cleared partial blockage, but the issue returned within a week.', meta: 'Sep 14, 2025 \u00b7 RapidFix Home Services' },
  { icon: 'handyman', title: 'Water Softener Maintenance', cost: '$145.00', desc: 'Removed salt bridge, cleaned brine tank. System operating normally.', meta: 'May 11, 2025 \u00b7 Fairfax Plumbing Pros' },
  { icon: 'build', title: 'Water Heater Repair', cost: '$275.00', desc: 'Replaced heating element and flushed tank. Rattling noise resolved.', meta: 'Aug 21, 2024 \u00b7 Fairfax Plumbing Pros' },
];

export const VAULT_FILES = [
  'Rheem Water Heater Warranty PDF',
  'Water Heater Repair Invoice 2024',
  'Water Heater Replacement Estimate 2026',
  'Carrier Furnace Manual',
  'Samsung Washer Manual',
  'Washer Drain Repair Invoice 2025',
  'Plumber Follow-Up Email',
  'Electric Bill March 2026',
];

export function buildProminentTasks(home) {
  return [
    {
      id: 't-wh-urgent',
      title: 'Water heater: corrosion / end-of-life window',
      urgency: 'urgent',
      summary: 'Pan corrosion and sub-65% health suggest proactive replacement planning within 6\u201312 months.',
      estCostHomeUsd: '$1,700\u20132,600 (tank) \u00b7 $2,900\u20134,300 (hybrid)',
      estCostAreaTypicalUsd: AREA_BENCHMARKS[2].metroMedianUsd,
      warrantyRefIds: ['w-wh'],
      warrantyNote: 'Manufacturer tank/parts warranty may be expired or limited to parts only. Labor often not covered. Builder warranty unlikely to cover consumer water heater unless clearly tied to original install defect.',
      serviceOptions: [
        { label: 'Piedmont Plumbing · swap + permit', estUsd: '$1,850\u20132,500' },
        { label: 'Big-box install network', estUsd: '$1,400\u20132,200' },
      ],
      productOptions: [
        { label: 'Bradford White equivalent tank', pros: ['Drop-in gas venting', 'Lower upfront'], cons: ['Standby loss', 'Shorter efficient life vs hybrid'] },
        { label: 'Heat-pump water heater', pros: ['Lowest operating cost', 'Rebate potential'], cons: ['Higher install', 'Electrical / space needs'] },
      ],
    },
    {
      id: 't-hvac',
      title: 'HVAC: R-22 legacy / efficiency',
      urgency: 'soon',
      summary: `${home.hvac.systemType}: plan phased replacement before refrigerant service becomes costly.`,
      estCostHomeUsd: '$8,500\u201314,000',
      estCostAreaTypicalUsd: '$7k\u201313k metro',
      warrantyRefIds: ['w-hvac'],
      warrantyNote: 'Manufacturer parts warranty may still cover select components. Verify registration & serial.',
      serviceOptions: [
        { label: 'Capital HVAC · full system', estUsd: '$9k\u201313k' },
        { label: 'Tune-up only (delay)', estUsd: '$149\u2013219' },
      ],
    },
    {
      id: 't-roof',
      title: 'Roof: wind-driven rain at rake',
      urgency: 'soon',
      summary: home.roof.notes,
      estCostHomeUsd: '$9,000\u201317,000',
      estCostAreaTypicalUsd: '$8k\u201316k',
      warrantyRefIds: ['w-roof', 'w-builder'],
      warrantyNote: 'Builder structural warranty may apply if within term and defect is workmanship-related; material warranty separate.',
      serviceOptions: [
        { label: 'Ridge Roofing · repair scope', estUsd: '$800\u20132,500' },
        { label: 'Full replacement', estUsd: '$12k\u201318k' },
      ],
    },
    {
      id: 't-plumb',
      title: 'Plumbing: hose bib / fittings',
      urgency: 'planned',
      summary: home.plumbing.knownIssues || 'Routine monitoring',
      estCostHomeUsd: '$120\u2013450',
      estCostAreaTypicalUsd: AREA_BENCHMARKS[0].metroMedianUsd,
      warrantyRefIds: [],
      warrantyNote: 'No warranty on typical wear; sudden leak may invoke homeowners insurance (deductible applies).',
      serviceOptions: [{ label: 'Piedmont · service call', estUsd: '$175\u2013320' }],
    },
    {
      id: 't-panel',
      title: 'Electrical: EV readiness',
      urgency: 'planned',
      summary: home.electric.notes,
      estCostHomeUsd: '$1,200\u20133,500',
      estCostAreaTypicalUsd: '$1k\u20133k',
      warrantyRefIds: ['w-builder'],
      warrantyNote: 'Original builder panel may be under systems coverage window. Verify dates vs contract extract.',
      serviceOptions: [{ label: 'Panel upgrade + EV stub', estUsd: '$2k\u20133.5k' }],
    },
    {
      id: 't-appliances',
      title: 'Kitchen appliances: lifecycle',
      urgency: 'planned',
      summary: 'Dishwasher and range mid-life; refrigerator healthy.',
      estCostHomeUsd: '$400\u20132,200',
      estCostAreaTypicalUsd: 'varies',
      warrantyRefIds: [],
      warrantyNote: 'Consumer appliances: manufacturer warranties typically 1\u20135 yrs; extended plans if purchased at closing.',
      serviceOptions: [{ label: 'Metro Handyman · minor repairs', estUsd: '$95/hr' }],
    },
  ];
}
