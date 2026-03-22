const URGENCY_THRESHOLD = 62;

function clamp(n, lo, hi) {
  return Math.min(hi, Math.max(lo, n));
}

function waterHeaterFrom(h) {
  return h.appliances.find((a) => /water heater/i.test(a.name));
}

function avgApplianceAge(h) {
  if (!h.appliances.length) return 0;
  return h.appliances.reduce((s, a) => s + a.ageYears, 0) / h.appliances.length;
}

/** Maintenance risk: roof + plumbing + maintenance recency + climate */
function maintenanceScore(h) {
  const roof = clamp(h.roof.ageYears * 4 + (h.roof.condition === 'replace_soon' ? 35 : 0), 0, 100);
  const plumb = clamp(h.plumbing.ageYears * 3 + (h.plumbing.knownIssues ? 15 : 0), 0, 100);
  const recent = h.maintenanceHistory.filter((m) => m.type === 'repair').length;
  const maint = clamp(40 - recent * 8 + h.climateExposure.exposureIndex * 8, 0, 100);
  return Math.round(roof * 0.45 + plumb * 0.35 + maint * 0.2);
}

/** Hardware: structural systems — electric panel, roof as asset, gas meter */
function hardwareScore(h) {
  const panel = clamp(h.electric.panelAgeYears * 2.5 + (h.electric.panelAmps < 200 ? 18 : 0), 0, 100);
  const roof = h.roof.condition === 'replace_soon' ? 72 : clamp(h.roof.ageYears * 2, 0, 60);
  return Math.round(panel * 0.55 + roof * 0.45);
}

/** Appliances: lifecycle curve on owned equipment */
function appliancesScore(h) {
  const avgAge = avgApplianceAge(h);
  const lowHealth = h.appliances.filter((a) => a.healthPct < 65).length;
  return clamp(Math.round(avgAge * 5 + lowHealth * 12), 0, 100);
}

/** Utilities: HVAC + water heater + electric load headroom */
function utilitiesScore(h) {
  const wh = waterHeaterFrom(h);
  const whRisk = wh ? clamp(wh.ageYears * 7 + (wh.healthPct < 70 ? 22 : 0), 0, 100) : 45;
  const hvac = clamp(h.hvac.ageYears * 4 + (h.hvac.refrigerantType.includes('R-22') ? 25 : 0), 0, 100);
  const elec = clamp(h.electric.panelAgeYears * 2, 0, 55);
  return Math.round(whRisk * 0.4 + hvac * 0.45 + elec * 0.15);
}

export function perHomeCategoryScores(h) {
  return {
    maintenance: maintenanceScore(h),
    hardware: hardwareScore(h),
    appliances: appliancesScore(h),
    utilities: utilitiesScore(h),
  };
}

export function portfolioRiskIndex(homes) {
  if (!homes.length) return 0;
  let sum = 0;
  for (const h of homes) {
    const s = perHomeCategoryScores(h);
    sum += s.maintenance * 0.28 + s.hardware * 0.22 + s.appliances * 0.22 + s.utilities * 0.28;
  }
  return Math.round(sum / homes.length);
}

function categoryAggregate(homes, category, label) {
  const scores = homes.map((h) => perHomeCategoryScores(h)[category]);
  const score = scores.length === 0 ? 0 : Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const homesAtRisk = scores.filter((s) => s >= URGENCY_THRESHOLD).length;
  const weight = category === 'utilities' ? 420 : category === 'appliances' ? 380 : 290;
  const pipelineUsd24mo = Math.round(
    homes.reduce((acc, h) => acc + (perHomeCategoryScores(h)[category] / 100) * weight, 0) * 2,
  );
  return { category, label, score, homesAtRisk, pipelineUsd24mo };
}

function buildPipeline(homes) {
  const items = [
    {
      label: 'Tank water heaters (efficiency / tank integrity)',
      count: homes.filter((h) => {
        const wh = waterHeaterFrom(h);
        return wh && (wh.ageYears >= 8 || wh.healthPct < 68);
      }).length,
      estUsd24mo: 0,
    },
    {
      label: 'HVAC heat pumps / air handlers',
      count: homes.filter((h) => h.hvac.ageYears >= 9 || h.hvac.refrigerantType.includes('R-22')).length,
      estUsd24mo: 0,
    },
    {
      label: 'Electrical panel / service upgrades',
      count: homes.filter((h) => h.electric.panelAmps < 200 || h.electric.panelAgeYears >= 18).length,
      estUsd24mo: 0,
    },
    {
      label: 'Roof replacement cycle',
      count: homes.filter((h) => h.roof.condition === 'replace_soon' || h.roof.ageYears >= 16).length,
      estUsd24mo: 0,
    },
  ];
  const base = [2400, 5200, 1800, 8500];
  return items.map((it, i) => ({
    ...it,
    estUsd24mo: Math.round(it.count * base[i] * 0.85),
  }));
}

export function computeSubdivisionInsights(homes) {
  const totalAnnualServiceUsd = homes.reduce((s, h) => s + h.annualServiceValue, 0);
  const meanAnnualServiceUsd = homes.length === 0 ? 0 : Math.round(totalAnnualServiceUsd / homes.length);
  return {
    homeCount: homes.length,
    totalAnnualServiceUsd,
    meanAnnualServiceUsd,
    portfolioRiskIndex: portfolioRiskIndex(homes),
    categoryRisks: [
      categoryAggregate(homes, 'maintenance', 'Maintenance & envelope'),
      categoryAggregate(homes, 'hardware', 'Structural hardware'),
      categoryAggregate(homes, 'appliances', 'Appliances'),
      categoryAggregate(homes, 'utilities', 'Utilities & HVAC'),
    ],
    pipeline: buildPipeline(homes),
    algorithmVersion: 'WB-INSIGHTS v1.2 (cohort-weighted risk)',
  };
}

export const DEFAULT_FILTER_STATE = {
  search: '',
  plan: '',
  minBeds: '',
  minBaths: '',
  sort: 'service',
};

function matchesSearch(h, q) {
  if (!q.trim()) return true;
  const s = q.toLowerCase();
  const blob = [
    h.address,
    h.planName,
    h.block,
    h.lot,
    h.homeType,
    ...h.appliances.map((a) => `${a.name} ${a.brand} ${a.model}`),
    h.hvac.systemType,
    h.plumbing.pipeMaterial,
    h.electric.notes,
    h.gas.notes,
  ]
    .join(' ')
    .toLowerCase();
  return blob.includes(s);
}

export function filterWillowbrookHomes(homes, f) {
  let out = homes.filter((h) => matchesSearch(h, f.search));
  if (f.plan) {
    out = out.filter((h) => h.planName === f.plan);
  }
  if (f.minBeds) {
    const n = Number(f.minBeds);
    if (!Number.isNaN(n)) out = out.filter((h) => h.beds >= n);
  }
  if (f.minBaths) {
    const n = Number(f.minBaths);
    if (!Number.isNaN(n)) out = out.filter((h) => h.baths >= n);
  }
  const scored = out.map((h) => ({
    h,
    risk: portfolioRiskIndex([h]),
  }));
  scored.sort((a, b) => {
    switch (f.sort) {
      case 'risk':
        return b.risk - a.risk;
      case 'sqft':
        return b.h.sqft - a.h.sqft;
      case 'year':
        return b.h.yearBuilt - a.h.yearBuilt;
      case 'service':
      default:
        return b.h.annualServiceValue - a.h.annualServiceValue;
    }
  });
  return scored.map((x) => x.h);
}
