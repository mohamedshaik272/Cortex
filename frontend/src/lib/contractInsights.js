/** Client-side demo extraction — keyword / pattern based, not legal advice. */

function normalize(s) {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

/** Extract ISO-like dates or "Month DD, YYYY" */
function findDates(text) {
  const re = /\b(20\d{2}[/-]\d{1,2}[/-]\d{1,2})|((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2},?\s+20\d{2})/gi;
  return [...text.matchAll(re)].map((m) => m[0]);
}

export function extractContractInsights(raw) {
  const text = raw.slice(0, 120_000);
  const lower = normalize(text);
  const warranties = [];
  const expenseNotes = [];
  const hoaOrSpecialTerms = [];

  if (/hoa|homeowners?\s+association/i.test(text)) {
    hoaOrSpecialTerms.push('HOA / community association terms referenced. Review covenants for exterior modifications.');
  }
  if (/special\s+assessment|assessment/i.test(text)) {
    hoaOrSpecialTerms.push('Possible special assessment language. Verify with closing disclosure.');
  }

  const dates = findDates(text);

  // Builder warranty
  if (/builder|meridian|warranty/i.test(lower)) {
    const exp = dates.find((d) => d.includes('202') || d.includes('202')) ?? dates[0];
    warranties.push({
      id: 'w-builder',
      title: 'Builder structural / systems warranty',
      summary: 'Detected builder warranty language (typical 1–10 yr coverage by component).',
      coverage: 'Structural, systems, and workmanship per schedule. Often excludes appliances installed by owner.',
      expiresOn: exp,
      status: /expir|closed|terminated/i.test(lower) ? 'expired' : 'limited',
      appliesToKeywords: ['roof', 'structural', 'hvac', 'plumbing', 'electrical'],
      exclusions: ['cosmetic', 'consumer appliances', 'owner modifications'],
    });
  }

  // HVAC / equipment
  if (/hvac|heat\s*pump|air\s*handler|carrier/i.test(lower)) {
    warranties.push({
      id: 'w-hvac',
      title: 'HVAC equipment warranty',
      summary: 'Manufacturer parts / compressor coverage referenced.',
      coverage: 'Parts limited warranty; labor often 1 yr from installer.',
      status: 'limited',
      appliesToKeywords: ['hvac', 'heat pump', 'carrier'],
      exclusions: ['lack of maintenance', 'improper filter'],
    });
  }

  // Water heater
  if (/water\s*heater|rheem|bradford|tank|anode/i.test(lower)) {
    const exp = dates[1] ?? dates[0];
    warranties.push({
      id: 'w-wh',
      title: 'Water heater manufacturer warranty',
      summary: 'Tank / parts limited warranty; anode rod may be excluded after inspection.',
      coverage: 'Typically 6–12 years on tank; varies by registration.',
      expiresOn: exp,
      status: /void|null|expired/i.test(lower) ? 'expired' : 'limited',
      appliesToKeywords: ['water heater', 'tank', 'hot water'],
      exclusions: ['sediment damage', 'improper venting', 'flood'],
    });
  }

  // Roof
  if (/roof|shingle|oc\s+duration|architectural/i.test(lower)) {
    warranties.push({
      id: 'w-roof',
      title: 'Roofing material warranty',
      summary: 'Manufacturer wind / algae limited warranty if applicable.',
      coverage: 'Material defect; workmanship by installer.',
      status: 'limited',
      appliesToKeywords: ['roof', 'shingle', 'flashings'],
      exclusions: ['acts of god', 'foot traffic'],
    });
  }

  // Fallback: generic warranty paragraph
  if (warranties.length === 0 && /warranty|guarantee/i.test(lower)) {
    warranties.push({
      id: 'w-generic',
      title: 'Warranty language detected',
      summary: 'Contract references warranties. Review full PDF with counsel for scope.',
      coverage: 'Unspecified in extract. See original document.',
      status: 'unknown',
      appliesToKeywords: ['general'],
      exclusions: [],
    });
  }

  // Expense lines
  if (/closing|settlement|title/i.test(lower)) {
    expenseNotes.push({
      label: 'Closing / settlement costs',
      notes: 'Line items referenced. Verify against final disclosure.',
    });
  }
  if (/escrow|property tax|tax/i.test(lower)) {
    expenseNotes.push({
      label: 'Taxes & escrow',
      notes: 'Prorations and escrow funding may apply.',
    });
  }

  return {
    warranties,
    expenseNotes,
    hoaOrSpecialTerms,
    rawSnippet: text.slice(0, 400) + (text.length > 400 ? '\u2026' : ''),
  };
}

export function taskMatchesWarranty(taskText, warranty) {
  const t = normalize(taskText);
  return warranty.appliesToKeywords.some((k) => t.includes(normalize(k)));
}
