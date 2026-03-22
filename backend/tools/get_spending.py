"""
Returns financial history filtered by system, provider, date range, or category.

Can summarize totals or return line items.
"""

import json
from datetime import date, timedelta


def execute(args: dict, knowledge_base: dict) -> str:
    asset_id = (args.get("asset_id") or "").strip()
    system_id = (args.get("system_id") or "").strip()
    utility_type = (args.get("utility_type") or "").strip().lower()
    months = args.get("months")
    category = (args.get("category") or "").strip().lower()

    results = {}

    # Build lookup maps for enrichment
    asset_map = {a["asset_id"]: a.get("name", "") for a in knowledge_base.get("assets", []) if "asset_id" in a}
    provider_map = {p["provider_id"]: p.get("company_name", p.get("name", "")) for p in knowledge_base.get("service_providers", []) if "provider_id" in p}
    maint_map = {}
    for evt in knowledge_base.get("maintenance_events", []):
        frid = evt.get("financial_record_id")
        if frid:
            maint_map[frid] = evt

    # Financial records
    if not utility_type or category in ("service", "maintenance", "repair", ""):
        records = knowledge_base.get("financial_records", [])
        filtered = []
        for rec in records:
            if asset_id and rec.get("asset_id") != asset_id:
                continue
            if system_id and rec.get("system_id") != system_id:
                continue
            if months:
                try:
                    cutoff = date.today() - timedelta(days=int(months) * 30)
                    rec_date = date.fromisoformat(rec.get("date", ""))
                    if rec_date < cutoff:
                        continue
                except (ValueError, TypeError):
                    pass
            enriched = dict(rec)
            enriched["asset_name"] = asset_map.get(rec.get("asset_id", ""), "")
            enriched["provider_name"] = provider_map.get(rec.get("provider_id", ""), "")
            evt = maint_map.get(rec.get("financial_record_id", ""))
            if evt:
                enriched["service_type"] = evt.get("service_type", "")
                enriched["issue_description"] = evt.get("issue_description", "")
                enriched["resolution"] = evt.get("resolution", "")
            filtered.append(enriched)

        total = sum(r.get("invoice_total", 0) for r in filtered)
        results["financial_records"] = filtered
        results["service_total"] = total

    # Utility history
    if not category or category == "utility" or utility_type:
        utilities = knowledge_base.get("utility_history", [])
        filtered_util = []
        for u in utilities:
            if utility_type and u.get("utility_type", "").lower() != utility_type:
                continue
            if months:
                try:
                    cutoff = date.today() - timedelta(days=int(months) * 30)
                    period_start = date.fromisoformat(u.get("billing_period_start", ""))
                    if period_start < cutoff:
                        continue
                except (ValueError, TypeError):
                    pass
            filtered_util.append(u)

        util_total = sum(u.get("total_cost", 0) for u in filtered_util)
        results["utility_records"] = filtered_util
        results["utility_total"] = round(util_total, 2)

    return json.dumps(results)
