/** Aligns with `verticalPipeline` in bridgeOutlook.js */

export const NEED_VERTICAL_LABEL = {
  roof: 'Roof replacement',
  hvac: 'HVAC / heat pump',
  water_heater: 'Hot water',
  electrical_panel: 'Electrical / panel',
  storm_envelope: 'Storm & envelope',
}

function waterHeater(h) {
  return h.appliances.find((a) => /water heater/i.test(a.name))
}

/**
 * Verticals where this home matches the same rules as dealer "pipeline" analytics
 * (replacement pressure, legacy refrigerant, panel load, climate).
 */
export function getPredictedVerticalsForHome(h) {
  const out = []
  const wh = waterHeater(h)

  if (h.roof.condition === 'replace_soon' || h.roof.ageYears >= 15) {
    out.push({
      id: 'roof',
      label: 'Roof replacement',
      reason: `${h.roof.material} roof · ${h.roof.ageYears} yrs · ${h.roof.condition.replace(/_/g, ' ')}`,
    })
  }
  if (h.hvac.ageYears >= 8 || h.hvac.refrigerantType.includes('R-22')) {
    out.push({
      id: 'hvac',
      label: 'Central HVAC / heat pump',
      reason: `${h.hvac.systemType} · ${h.hvac.ageYears} yrs · ${h.hvac.refrigerantType}`,
    })
  }
  if (wh && (wh.ageYears >= 7 || wh.healthPct < 68)) {
    out.push({
      id: 'water_heater',
      label: 'Tank / tankless hot water',
      reason: `${wh.brand} ${wh.model} · ${wh.ageYears} yrs · health ${wh.healthPct}%`,
    })
  }
  if (h.electric.panelAmps < 200 || h.electric.panelAgeYears >= 16) {
    out.push({
      id: 'electrical_panel',
      label: 'Electrical service / panel',
      reason: `${h.electric.panelAmps}A panel · ${h.electric.panelAgeYears} yrs since build/upgrade`,
    })
  }
  if (h.climateExposure.seasonalRisks.length >= 2 || h.climateExposure.exposureIndex > 0.55) {
    out.push({
      id: 'storm_envelope',
      label: 'Storm-ready envelope & openings',
      reason: `Exposure ${h.climateExposure.exposureIndex.toFixed(2)} · ${h.climateExposure.seasonalRisks.slice(0, 2).join(' · ') || 'regional wind/hail profile'}`,
    })
  }

  return out
}

/** Maps Bridge page pipeline row labels → catalog vertical ids */
export const DEALER_VERTICAL_TO_NEED = {
  'Roof replacement': 'roof',
  'Central HVAC / heat pump': 'hvac',
  'Tank / tankless hot water': 'water_heater',
  'Electrical service / panel': 'electrical_panel',
  'Storm-ready envelope & openings': 'storm_envelope',
}
