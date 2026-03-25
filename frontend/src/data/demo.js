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
      'Cooling performance dropped about 8% compared to last summer at similar temperatures. Filters are on schedule \u2014 a coil inspection would help.',
    severity: 'watch',
  },
  {
    id: 'a3',
    title: 'Water heater anode horizon',
    detail:
      'Based on local water hardness, the anode rod will probably need replacing within the next two years.',
    severity: 'watch',
    eta: '14\u201318 mo',
  },
]

export const maintenanceQueue = [
  {
    id: 'm1',
    label: 'Gutter & downspout check',
    due: 'Apr 12',
    context: 'Clear post-winter debris. This area has ice dam risk.',
  },
  {
    id: 'm2',
    label: 'AC startup & refrigerant sweep',
    due: 'May 3',
    context: 'Timed before the first hot week of the season.',
  },
  {
    id: 'm3',
    label: 'Exterior caulk & flashing review',
    due: 'Jun 1',
    context: 'Humidity in this area wears down exterior seals faster.',
  },
]

export const aiInsights = [
  {
    id: 'i1',
    title: 'Unify two partial repair histories',
    body:
      'A 2019 dishwasher repair only shows up in email. Merge it with the warranty PDF so everything is in one place.',
    action: 'Import & merge',
  },
  {
    id: 'i2',
    title: 'Pre-emptive LED swap in kitchen',
    body:
      'Kitchen fixture hours are higher than average. Replacing them as a group saves money vs. swapping one at a time.',
    action: 'Schedule bundle',
  },
]

export const appliances = [
  {
    name: 'Heat pump (outdoor)',
    age: '7 yrs',
    health: 82,
    note: 'Compressor cycles normal; defrost pattern stable',
  },
  {
    name: 'Tank water heater',
    age: '9 yrs',
    health: 71,
    note: 'Anode + T&P test due this season',
  },
  {
    name: 'Refrigerator',
    age: '4 yrs',
    health: 91,
    note: 'Coil clean on track',
  },
]

export const regionSignals = [
  {
    region: 'Northeast US',
    demand: 0.84,
    trend: 'up',
    topCategory: 'Roofing & ice dam mitigation',
  },
  {
    region: 'Southeast US',
    demand: 0.76,
    trend: 'up',
    topCategory: 'HVAC load & humidity control',
  },
  {
    region: 'Mountain West',
    demand: 0.62,
    trend: 'flat',
    topCategory: 'Wildfire air quality systems',
  },
  {
    region: 'Pacific NW',
    demand: 0.71,
    trend: 'up',
    topCategory: 'Drainage & foundation moisture',
  },
]

export const categoryDemand = [
  { category: 'HVAC & ventilation', share: 34, horizon: 'Next 90 days' },
  { category: 'Roofing & exterior', share: 22, horizon: 'Next 120 days' },
  { category: 'Water systems', share: 18, horizon: 'Rolling 6 mo' },
  { category: 'Electrical & safety', share: 15, horizon: 'Next 60 days' },
  { category: 'Appliances', share: 11, horizon: '12\u201324 mo window' },
]

export const providerBullets = [
  'See real demand patterns across climate zones and housing types.',
  'Spot category-level trends before they show up in search data.',
  'Plan inventory and crew schedules around predicted maintenance and replacement needs.',
]
