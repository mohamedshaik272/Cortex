import { perHomeCategoryScores, portfolioRiskIndex } from './willowbrookInsights';

function clamp(n, lo, hi) {
  return Math.min(hi, Math.max(lo, n));
}

function waterHeater(h) {
  return h.appliances.find((a) => /water heater/i.test(a.name));
}

/**
 * Smart Scoring-style composite: demand, service opportunity, inverse portfolio risk,
 * and upgrade-intent from utilities + appliances + envelope signals.
 */
export function computeSmartScore(h) {
  const cats = perHomeCategoryScores(h);
  const risk = portfolioRiskIndex([h]);
  const demand = h.demandIndex * 100;
  const service = clamp(h.annualServiceValue / 185, 0, 100);
  const riskInverted = 100 - risk;
  const intent = clamp(cats.utilities * 0.42 + cats.appliances * 0.33 + cats.maintenance * 0.25, 0, 100);
  return Math.round(demand * 0.26 + service * 0.24 + riskInverted * 0.28 + intent * 0.22);
}

export function smartTier(score) {
  if (score >= 71) return 'A';
  if (score >= 52) return 'B';
  return 'C';
}

function sumEnergySavings(homes) {
  let s = 0;
  for (const h of homes) {
    const u = perHomeCategoryScores(h).utilities;
    s += (h.annualServiceValue * 0.14 * u) / 100;
  }
  return Math.round(s);
}

function sumInsuranceSavings(homes) {
  let s = 0;
  for (const h of homes) {
    const m = perHomeCategoryScores(h).maintenance;
    const climate = h.climateExposure.exposureIndex;
    s += (h.annualServiceValue * 0.09 * (m / 100)) * (0.85 + climate * 0.25);
  }
  return Math.round(s);
}

function sumMaintenanceAvoidance(homes) {
  let s = 0;
  for (const h of homes) {
    const hw = perHomeCategoryScores(h).hardware;
    const repairs = h.maintenanceHistory.filter((x) => x.type === 'repair').length;
    s += (h.annualServiceValue * 0.06 * (hw / 100)) * (1 + repairs * 0.12);
  }
  return Math.round(s);
}

function upgradeReadiness(homes) {
  if (!homes.length) return 0;
  let sum = 0;
  for (const h of homes) {
    const c = perHomeCategoryScores(h);
    sum += (c.utilities + c.appliances + c.maintenance) / 3;
  }
  return Math.round(sum / homes.length);
}

function valueUplift(homes) {
  if (!homes.length) return 0;
  let sum = 0;
  for (const h of homes) {
    const hw = perHomeCategoryScores(h).hardware;
    sum += (100 - hw) * h.demandIndex;
  }
  return Math.round(sum / homes.length);
}

export function computeHomebridgeOutlook(homes) {
  const energy = sumEnergySavings(homes);
  const ins = sumInsuranceSavings(homes);
  const maint = sumMaintenanceAvoidance(homes);
  const monthly = (energy + ins + maint) / 12;
  return {
    annualEnergySavingsUsd: energy,
    annualInsuranceSavingsUsd: ins,
    annualMaintenanceAvoidanceUsd: maint,
    monthlySavingsStackUsd: Math.round(monthly),
    upgradeReadinessIndex: upgradeReadiness(homes),
    valueUpliftIndex: valueUplift(homes),
    methodology:
      'HOME-OUTLOOK v1: cohort sums from per-home category scores, demand index, and annual service opportunity. Inspired by Smart Savings / ROI framing.',
  };
}

function verticalPipeline(homes) {
  const roof = homes.filter((h) => h.roof.condition === 'replace_soon' || h.roof.ageYears >= 15);
  const hvac = homes.filter((h) => h.hvac.ageYears >= 8 || h.hvac.refrigerantType.includes('R-22'));
  const wh = homes.filter((h) => {
    const t = waterHeater(h);
    return t && (t.ageYears >= 7 || t.healthPct < 68);
  });
  const panel = homes.filter((h) => h.electric.panelAmps < 200 || h.electric.panelAgeYears >= 16);
  const storm = homes.filter(
    (h) => h.climateExposure.seasonalRisks.length >= 2 || h.climateExposure.exposureIndex > 0.55,
  );
  return [
    { vertical: 'Roof replacement', homesWithOpportunity: roof.length, estRevenueUsd24mo: Math.round(roof.length * 9200 * 0.88) },
    { vertical: 'Central HVAC / heat pump', homesWithOpportunity: hvac.length, estRevenueUsd24mo: Math.round(hvac.length * 11800 * 0.82) },
    { vertical: 'Tank / tankless hot water', homesWithOpportunity: wh.length, estRevenueUsd24mo: Math.round(wh.length * 3200 * 0.9) },
    { vertical: 'Electrical service / panel', homesWithOpportunity: panel.length, estRevenueUsd24mo: Math.round(panel.length * 4200 * 0.85) },
    { vertical: 'Storm-ready envelope & openings', homesWithOpportunity: storm.length, estRevenueUsd24mo: Math.round(storm.length * 6800 * 0.75) },
  ];
}

function reactivationCount(homes) {
  return homes.filter((h) => {
    const wh = waterHeater(h);
    const oldSystems = (wh && wh.ageYears >= 7) || h.hvac.ageYears >= 8 || h.roof.ageYears >= 12;
    const touched = h.maintenanceHistory.length >= 2;
    return oldSystems && touched;
  }).length;
}

export function computeDealerbridgeOutlook(homes, insights) {
  const scores = homes.map((h) => computeSmartScore(h));
  const mean = scores.length === 0 ? 0 : Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const tierCounts = { A: 0, B: 0, C: 0 };
  for (const s of scores) {
    tierCounts[smartTier(s)] += 1;
  }
  const qualified = scores.filter((s) => s >= 62).length;
  return {
    meanSmartScore: mean,
    tierCounts,
    qualifiedHomes: qualified,
    reactivationCandidates: reactivationCount(homes),
    verticals: verticalPipeline(homes),
    methodology:
      `DEALER-OUTLOOK v1: Smart Scoring-style blend (demand, opportunity, risk inversion, intent). Qualified threshold 62. Verticals align with DealerBridge categories; 24-mo revenue modeled. Cohort risk index: ${insights.portfolioRiskIndex}.`,
  };
}

export function buildSmartScoreTable(homes) {
  return homes
    .map((h) => {
      const score = computeSmartScore(h);
      return {
        id: h.id,
        address: h.address,
        score,
        tier: smartTier(score),
        annualServiceValue: h.annualServiceValue,
      };
    })
    .sort((a, b) => b.score - a.score);
}
