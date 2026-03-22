"""
Finds service providers by trade type (plumbing, hvac, electrical, general).

Returns provider profile, job history with this home, ratings, and notes.
"""

import json


def execute(args: dict, knowledge_base: dict) -> str:
    trade = (args.get("trade_type") or "").strip().lower()
    name_query = (args.get("name") or "").strip().lower()

    providers = knowledge_base.get("service_providers", [])
    maintenance_events = knowledge_base.get("maintenance_events", [])

    results = []
    for prov in providers:
        prov_trade = prov.get("trade_type", "").lower()
        prov_name = prov.get("name", "").lower()

        if trade and trade not in prov_trade and prov_trade not in trade:
            if name_query and name_query not in prov_name:
                continue
            elif not name_query:
                continue

        if name_query and name_query not in prov_name and not trade:
            continue

        # Enrich with job history
        past_jobs = []
        for job_id in prov.get("past_job_ids", []):
            for evt in maintenance_events:
                if evt.get("maintenance_event_id") == job_id:
                    past_jobs.append({
                        "event_id": job_id,
                        "date": evt.get("service_date"),
                        "type": evt.get("service_type"),
                        "asset_id": evt.get("asset_id"),
                        "issue": evt.get("issue_description"),
                        "resolution": evt.get("resolution"),
                        "rating": evt.get("service_rating"),
                    })

        results.append({
            "provider_id": prov.get("provider_id"),
            "name": prov.get("name"),
            "trade_type": prov.get("trade_type"),
            "phone": prov.get("phone"),
            "rating": prov.get("rating"),
            "notes": prov.get("notes"),
            "job_history": past_jobs,
        })

    if not results:
        # Return all providers if no filter matched
        if not trade and not name_query:
            for prov in providers:
                results.append({
                    "provider_id": prov.get("provider_id"),
                    "name": prov.get("name"),
                    "trade_type": prov.get("trade_type"),
                    "phone": prov.get("phone"),
                    "rating": prov.get("rating"),
                    "notes": prov.get("notes"),
                })
        else:
            return json.dumps({"message": f"No providers found for trade='{trade}', name='{name_query}'.", "providers": []})

    return json.dumps({"providers": results})
