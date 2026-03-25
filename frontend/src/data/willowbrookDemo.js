import { satelliteTileImageUrl } from '../lib/mapTiles';

/** Single-builder tract — Meridian Homes at Willowbrook Estates */

export const WILLOWBROOK = {
  name: 'Willowbrook Estates',
  builder: 'Meridian Homes',
  city: 'Gaithersburg',
  state: 'MD',
  bounds: { sw: [39.1411, -77.2361], ne: [39.1428, -77.2332] },
  center: [39.1420464, -77.2348226],
  zoom: 17,
};

function maintenanceFor(spec) {
  const base = [
    { date: '2024-04-02', type: 'inspection', description: 'HVAC seasonal tune-up' },
    { date: '2023-11-18', type: 'inspection', description: 'Roof visual (builder Year 2 program)' },
    { date: '2023-08-10', type: 'inspection', description: 'Water heater flush & anode check' },
  ];
  for (let i = 0; i < spec.extraRepairs; i++) {
    base.push({
      date: `2023-${String(6 - i).padStart(2, '0')}-12`,
      type: 'repair',
      description: 'Warranty touch-up, trim / caulking',
    });
  }
  return base;
}

function buildHome(spec) {
  const imageUrl = satelliteTileImageUrl(spec.lat, spec.lng, 20);
  const homeType =
    spec.planName === 'Cambridge'
      ? 'Single-family (plan Cambridge)'
      : spec.planName === 'Bishop'
        ? 'Single-family (plan Bishop)'
        : 'Single-family (plan Alder)';

  return {
    id: spec.id,
    address: spec.address,
    lat: spec.lat,
    lng: spec.lng,
    annualServiceValue: spec.annualServiceValue,
    beds: spec.beds,
    baths: spec.baths,
    sqft: spec.sqft,
    homeType,
    yearBuilt: spec.yearBuilt,
    demandIndex: spec.demandIndex,
    imageUrl,
    imageAlt: `Satellite view of ${spec.address}`,
    photoNote: `Tile snapshot at the same coordinates as the map marker (building centroid from OpenStreetMap). Lot ${spec.lot}. \u00a9 Esri`,
    planName: spec.planName,
    block: spec.block,
    lot: spec.lot,
    builderName: WILLOWBROOK.builder,
    appliances: [
      {
        name: 'Heat pump (outdoor)',
        brand: 'Carrier',
        model: spec.planName === 'Alder' ? '25VNA836' : '24ANB636',
        ageYears: spec.hvac.ageYears,
        healthPct: 78 + (spec.id.charCodeAt(0) % 15),
        lastService: '2024-04-02',
        notes: 'Charge verified; defrost board nominal.',
      },
      {
        name: 'Tank water heater',
        brand: spec.wh.brand,
        model: spec.wh.model,
        ageYears: spec.wh.ageYears,
        healthPct: spec.wh.healthPct,
        lastService: '2023-08-10',
        notes:
          spec.wh.ageYears >= 8
            ? 'Anode depleted faster than curve. Replacement window opening.'
            : 'Annual flush on file; T&P tested.',
      },
      {
        name: 'Refrigerator',
        brand: 'GE',
        model: 'GNE27JYM',
        ageYears: spec.yearBuilt >= 2019 ? 4 : 7,
        healthPct: 88,
        lastService: '2024-01-05',
        notes: 'Energy Star rated; ice maker filter replaced.',
      },
      {
        name: 'Dishwasher',
        brand: 'Bosch',
        model: 'SHPM65Z55N',
        ageYears: spec.yearBuilt >= 2019 ? 3 : 6,
        healthPct: 91,
        lastService: '2023-12-01',
        notes: 'Drain pump within spec.',
      },
      {
        name: spec.planName === 'Alder' ? 'Range (dual-fuel)' : 'Range (gas)',
        brand: 'Caf\u00e9',
        model: 'C2S950P2MS1',
        ageYears: 5,
        healthPct: 86,
        lastService: '2023-10-14',
        notes: 'LP conversion kit not installed. Natural gas service.',
      },
    ],
    sewage: {
      type: 'municipal',
      lastInspection: '2023-05-20',
      condition: 'good',
      notes: 'WSSC lateral. Cleanout at property line; no root intrusion on 2023 scope.',
    },
    electric: {
      panelAmps: spec.electric.panelAmps,
      panelAgeYears: spec.electric.panelAgeYears,
      lastUpgrade: spec.yearBuilt >= 2020 ? `${spec.yearBuilt}-06` : '2019-07',
      notes:
        spec.electric.panelAmps >= 200
          ? '200A Siemens; whole-home surge at main; EV-ready stub in garage.'
          : '150A legacy. Upgrade recommended before Level 2 EV.',
    },
    gas: {
      supplier: 'Washington Gas',
      meterType: 'Coriolis smart',
      lastInspection: '2024-01-15',
      notes: 'CSST interior runs; sediment trap at range compliant.',
    },
    hvac: {
      systemType: spec.hvac.systemType,
      ageYears: spec.hvac.ageYears,
      lastMaintenance: '2024-04-02',
      refrigerantType: spec.hvac.refrigerant,
      notes:
        spec.hvac.refrigerant === 'R-22'
          ? 'Legacy split. Phased replacement aligned with refrigerant regs.'
          : 'Duct static 0.65 in w.g.; MERV 13 filter.',
    },
    roof: {
      material: 'Architectural asphalt (OC Duration)',
      ageYears: spec.roof.ageYears,
      lastInspection: '2023-11-18',
      condition: spec.roof.condition,
      notes:
        spec.roof.condition === 'replace_soon'
          ? 'Wind-driven rain at north rake. Replacement in 24 mo window.'
          : 'Flashing sealed; attic intake balanced.',
    },
    plumbing: {
      pipeMaterial: 'PEX-A (Uponor) trunk',
      ageYears: spec.plumbing.ageYears,
      knownIssues: spec.plumbing.knownIssues,
      notes: 'Pressure 58 psi PRV at curb; recirc pump on Alder plans only.',
    },
    maintenanceHistory: maintenanceFor(spec),
    climateExposure: {
      exposureIndex: 0.52 + (spec.lat - 39.14) * 2,
      seasonalRisks: ['Humid summers', 'Freeze\u2013thaw on hose bibs'],
      floodZone: 'X',
      notes: 'Piedmont climate; no recorded basement water in builder warranty DB.',
    },
  };
}

/** 14 lots — Meridian Homes, phase I */
const LOTS = [
  { id: 'wb-01', address: '18402 Willow Trace Terr', lat: 39.1425911, lng: -77.2357993, planName: 'Cambridge', block: 'A', lot: '12', beds: 4, baths: 3, sqft: 2680, yearBuilt: 2019, annualServiceValue: 11200, demandIndex: 0.81, wh: { brand: 'Rheem', model: 'PROG50-40N', ageYears: 5, healthPct: 82 }, hvac: { ageYears: 5, refrigerant: 'R-410A', systemType: 'Heat pump (ducted)' }, roof: { ageYears: 5, condition: 'good' }, electric: { panelAmps: 200, panelAgeYears: 5 }, plumbing: { ageYears: 5, knownIssues: '' }, extraRepairs: 0 },
  { id: 'wb-02', address: '18408 Willow Trace Terr', lat: 39.1424965, lng: -77.235239, planName: 'Cambridge', block: 'A', lot: '13', beds: 4, baths: 3, sqft: 2680, yearBuilt: 2019, annualServiceValue: 10800, demandIndex: 0.79, wh: { brand: 'Rheem', model: 'PROG50-40N', ageYears: 5, healthPct: 80 }, hvac: { ageYears: 5, refrigerant: 'R-410A', systemType: 'Heat pump (ducted)' }, roof: { ageYears: 5, condition: 'good' }, electric: { panelAmps: 200, panelAgeYears: 5 }, plumbing: { ageYears: 5, knownIssues: '' }, extraRepairs: 1 },
  { id: 'wb-03', address: '18414 Willow Trace Terr', lat: 39.1425822, lng: -77.2348124, planName: 'Bishop', block: 'A', lot: '14', beds: 5, baths: 3.5, sqft: 3020, yearBuilt: 2018, annualServiceValue: 12400, demandIndex: 0.84, wh: { brand: 'Bradford White', model: 'M450T6FBN', ageYears: 6, healthPct: 74 }, hvac: { ageYears: 6, refrigerant: 'R-410A', systemType: 'Heat pump (ducted)' }, roof: { ageYears: 6, condition: 'fair' }, electric: { panelAmps: 200, panelAgeYears: 6 }, plumbing: { ageYears: 6, knownIssues: 'Recirc valve weep, monitored' }, extraRepairs: 2 },
  { id: 'wb-04', address: '18420 Willow Trace Terr', lat: 39.1423631, lng: -77.2347761, planName: 'Bishop', block: 'A', lot: '15', beds: 5, baths: 3.5, sqft: 3020, yearBuilt: 2018, annualServiceValue: 13100, demandIndex: 0.86, wh: { brand: 'Bradford White', model: 'M450T6FBN', ageYears: 6, healthPct: 71 }, hvac: { ageYears: 6, refrigerant: 'R-410A', systemType: 'Heat pump (ducted)' }, roof: { ageYears: 6, condition: 'fair' }, electric: { panelAmps: 200, panelAgeYears: 6 }, plumbing: { ageYears: 6, knownIssues: '' }, extraRepairs: 0 },
  { id: 'wb-05', address: '18426 Willow Trace Terr', lat: 39.1423297, lng: -77.2341932, planName: 'Alder', block: 'A', lot: '16', beds: 5, baths: 4, sqft: 3350, yearBuilt: 2017, annualServiceValue: 14200, demandIndex: 0.88, wh: { brand: 'Rheem', model: 'PROG75-62N', ageYears: 7, healthPct: 66 }, hvac: { ageYears: 7, refrigerant: 'R-410A', systemType: 'Heat pump (ducted, zoned)' }, roof: { ageYears: 7, condition: 'fair' }, electric: { panelAmps: 200, panelAgeYears: 7 }, plumbing: { ageYears: 7, knownIssues: '' }, extraRepairs: 1 },
  { id: 'wb-06', address: '18432 Willow Trace Terr', lat: 39.1421262, lng: -77.2335915, planName: 'Alder', block: 'A', lot: '17', beds: 5, baths: 4, sqft: 3350, yearBuilt: 2017, annualServiceValue: 13800, demandIndex: 0.87, wh: { brand: 'Rheem', model: 'PROG75-62N', ageYears: 7, healthPct: 64 }, hvac: { ageYears: 7, refrigerant: 'R-410A', systemType: 'Heat pump (ducted, zoned)' }, roof: { ageYears: 7, condition: 'fair' }, electric: { panelAmps: 200, panelAgeYears: 7 }, plumbing: { ageYears: 7, knownIssues: 'Garage hose bib slow drip' }, extraRepairs: 2 },
  { id: 'wb-07', address: '18440 Meridian Way', lat: 39.1421145, lng: -77.2357636, planName: 'Cambridge', block: 'B', lot: '21', beds: 4, baths: 3, sqft: 2680, yearBuilt: 2020, annualServiceValue: 9900, demandIndex: 0.76, wh: { brand: 'Rheem', model: 'PROG50-40N', ageYears: 4, healthPct: 86 }, hvac: { ageYears: 4, refrigerant: 'R-410A', systemType: 'Heat pump (ducted)' }, roof: { ageYears: 4, condition: 'good' }, electric: { panelAmps: 200, panelAgeYears: 4 }, plumbing: { ageYears: 4, knownIssues: '' }, extraRepairs: 0 },
  { id: 'wb-08', address: '18448 Meridian Way', lat: 39.1420301, lng: -77.235192, planName: 'Cambridge', block: 'B', lot: '22', beds: 4, baths: 3, sqft: 2680, yearBuilt: 2020, annualServiceValue: 10100, demandIndex: 0.77, wh: { brand: 'Rheem', model: 'PROG50-40N', ageYears: 4, healthPct: 85 }, hvac: { ageYears: 4, refrigerant: 'R-410A', systemType: 'Heat pump (ducted)' }, roof: { ageYears: 4, condition: 'good' }, electric: { panelAmps: 200, panelAgeYears: 4 }, plumbing: { ageYears: 4, knownIssues: '' }, extraRepairs: 0 },
  { id: 'wb-09', address: '18456 Meridian Way', lat: 39.1419043, lng: -77.23476, planName: 'Bishop', block: 'B', lot: '23', beds: 5, baths: 3.5, sqft: 3020, yearBuilt: 2018, annualServiceValue: 12800, demandIndex: 0.85, wh: { brand: 'Bradford White', model: 'M450T6FBN', ageYears: 6, healthPct: 72 }, hvac: { ageYears: 6, refrigerant: 'R-410A', systemType: 'Heat pump (ducted)' }, roof: { ageYears: 6, condition: 'fair' }, electric: { panelAmps: 200, panelAgeYears: 6 }, plumbing: { ageYears: 6, knownIssues: '' }, extraRepairs: 1 },
  { id: 'wb-10', address: '18464 Meridian Way', lat: 39.1416728, lng: -77.234731, planName: 'Bishop', block: 'B', lot: '24', beds: 5, baths: 3.5, sqft: 3020, yearBuilt: 2016, annualServiceValue: 14500, demandIndex: 0.89, wh: { brand: 'Bradford White', model: 'M450T6FBN', ageYears: 8, healthPct: 62 }, hvac: { ageYears: 8, refrigerant: 'R-22', systemType: 'Split AC + furnace (legacy)' }, roof: { ageYears: 8, condition: 'fair' }, electric: { panelAmps: 200, panelAgeYears: 8 }, plumbing: { ageYears: 8, knownIssues: 'WH pan corrosion, monitor' }, extraRepairs: 3 },
  { id: 'wb-11', address: '18472 Meridian Way', lat: 39.1418797, lng: -77.2341717, planName: 'Alder', block: 'B', lot: '25', beds: 5, baths: 4, sqft: 3350, yearBuilt: 2016, annualServiceValue: 15200, demandIndex: 0.9, wh: { brand: 'Rheem', model: 'PROG75-62N', ageYears: 8, healthPct: 58 }, hvac: { ageYears: 8, refrigerant: 'R-22', systemType: 'Split AC + furnace (legacy)' }, roof: { ageYears: 8, condition: 'replace_soon' }, electric: { panelAmps: 200, panelAgeYears: 8 }, plumbing: { ageYears: 8, knownIssues: '' }, extraRepairs: 2 },
  { id: 'wb-12', address: '18480 Meridian Way', lat: 39.1418238, lng: -77.2337366, planName: 'Alder', block: 'B', lot: '26', beds: 5, baths: 4, sqft: 3350, yearBuilt: 2016, annualServiceValue: 14900, demandIndex: 0.89, wh: { brand: 'Rheem', model: 'PROG75-62N', ageYears: 8, healthPct: 59 }, hvac: { ageYears: 8, refrigerant: 'R-22', systemType: 'Split AC + furnace (legacy)' }, roof: { ageYears: 8, condition: 'replace_soon' }, electric: { panelAmps: 150, panelAgeYears: 8 }, plumbing: { ageYears: 8, knownIssues: '' }, extraRepairs: 1 },
  { id: 'wb-13', address: '18488 Builders Row', lat: 39.1414023, lng: -77.2356788, planName: 'Cambridge', block: 'C', lot: '31', beds: 4, baths: 3, sqft: 2680, yearBuilt: 2021, annualServiceValue: 9200, demandIndex: 0.73, wh: { brand: 'Rheem', model: 'PROG50-40N', ageYears: 3, healthPct: 90 }, hvac: { ageYears: 3, refrigerant: 'R-410A', systemType: 'Heat pump (ducted)' }, roof: { ageYears: 3, condition: 'good' }, electric: { panelAmps: 200, panelAgeYears: 3 }, plumbing: { ageYears: 3, knownIssues: '' }, extraRepairs: 0 },
  { id: 'wb-14', address: '18496 Builders Row', lat: 39.1413335, lng: -77.2350714, planName: 'Bishop', block: 'C', lot: '32', beds: 5, baths: 3.5, sqft: 3020, yearBuilt: 2015, annualServiceValue: 15800, demandIndex: 0.91, wh: { brand: 'Bradford White', model: 'M450T6FBN', ageYears: 9, healthPct: 54 }, hvac: { ageYears: 9, refrigerant: 'R-22', systemType: 'Split AC + furnace (legacy)' }, roof: { ageYears: 9, condition: 'replace_soon' }, electric: { panelAmps: 150, panelAgeYears: 9 }, plumbing: { ageYears: 10, knownIssues: 'Galvanized stub at curb, partial repipe 2019' }, extraRepairs: 4 },
];

export const willowbrookHomes = LOTS.map(buildHome);

export function getWillowbrookHome(id) {
  return willowbrookHomes.find((h) => h.id === id);
}
