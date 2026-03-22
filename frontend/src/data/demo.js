export const homeAlerts = [
  {
    id: 'a1',
    title: 'Smoke detector batch expires',
    detail:
      'Three units in the 2nd floor hallway share the same install date. Replacement window opens in 6 weeks.',
    severity: 'attention',
    eta: '6 wks',
  },
  {
    id: 'a2',
    title: 'HVAC efficiency drift',
    detail:
      'Cooling delta has widened 8% vs. last season for comparable outdoor temps. Filter cycle aligned; coil inspection suggested.',
    severity: 'watch',
  },
  {
    id: 'a3',
    title: 'Water heater anode horizon',
    detail:
      'Based on local water hardness and usage, sacrificial anode replacement likely within 2 seasons.',
    severity: 'watch',
    eta: '14\u201318 mo',
  },
];

export const maintenanceQueue = [
  { id: 'm1', label: 'Gutter & downspout check', due: 'Apr 12', context: 'Post-winter debris; ice dam risk region' },
  { id: 'm2', label: 'AC startup & refrigerant sweep', due: 'May 3', context: 'Ahead of first 85\u00b0F+ week per climate model' },
  { id: 'm3', label: 'Exterior caulk & flashing review', due: 'Jun 1', context: 'Coastal humidity exposure index elevated' },
];

export const aiInsights = [
  {
    id: 'i1',
    title: 'Unify two partial repair histories',
    body:
      'A 2019 dishwasher repair appears in email only; merge with warranty PDF for a complete lifecycle view.',
    action: 'Import & merge',
  },
  {
    id: 'i2',
    title: 'Pre-emptive LED swap in kitchen',
    body:
      'Fixture hours exceed cohort median; group replacement avoids staggered failures and bulk pricing.',
    action: 'Schedule bundle',
  },
];

export const appliances = [
  { name: 'Heat pump (outdoor)', age: '7 yrs', health: 82, note: 'Compressor cycles normal; defrost pattern stable' },
  { name: 'Tank water heater', age: '9 yrs', health: 71, note: 'Anode + T&P test due this season' },
  { name: 'Refrigerator', age: '4 yrs', health: 91, note: 'Coil clean on track' },
];

export const regionSignals = [
  { region: 'Northeast US', demand: 0.84, trend: 'up', topCategory: 'Roofing & ice dam mitigation' },
  { region: 'Southeast US', demand: 0.76, trend: 'up', topCategory: 'HVAC load & humidity control' },
  { region: 'Mountain West', demand: 0.62, trend: 'flat', topCategory: 'Wildfire air quality systems' },
  { region: 'Pacific NW', demand: 0.71, trend: 'up', topCategory: 'Drainage & foundation moisture' },
];

export const categoryDemand = [
  { category: 'HVAC & ventilation', share: 34, horizon: 'Next 90 days' },
  { category: 'Roofing & exterior', share: 22, horizon: 'Next 120 days' },
  { category: 'Water systems', share: 18, horizon: 'Rolling 6 mo' },
  { category: 'Electrical & safety', share: 15, horizon: 'Next 60 days' },
  { category: 'Appliances', share: 11, horizon: '12\u201324 mo window' },
];

export const providerBullets = [
  'View home maintenance trends across climate zones and housing types.',
  'See what homeowners need before it shows up in search trends.',
  'Plan inventory and crew capacity around upcoming maintenance and replacement cycles.',
];
