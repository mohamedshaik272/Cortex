"""
Looks up any device/asset in the home by name, system, or id.

Returns full profile including age, warranty status, maintenance history, and notes.
Searches across all system categories (hvac, plumbing, electrical, appliances, exterior).
"""

import json
from datetime import date


def execute(args: dict, knowledge_base: dict) -> str:
    query = (args.get("input") or args.get("name") or args.get("asset_id") or "").strip().lower()
    if not query:
        return json.dumps({"error": "No search query provided."})

    assets = knowledge_base.get("assets", [])

    match = None
    for asset in assets:
        if asset.get("asset_id", "").lower() == query:
            match = asset
            break
        if asset.get("system_id", "").lower() == query:
            match = asset
            break
        if asset.get("name", "").lower() == query:
            match = asset
            break

    # Fuzzy / substring match if exact match not found
    if match is None:
        for asset in assets:
            name = asset.get("name", "").lower()
            category = asset.get("category", "").lower()
            if query in name or query in category or name in query:
                match = asset
                break

    if match is None:
        return json.dumps({"error": f"No asset found matching '{query}'."})

    # Compute age
    result = dict(match)
    install_date = match.get("install_date")
    if install_date:
        try:
            installed = date.fromisoformat(install_date)
            age_days = (date.today() - installed).days
            result["age_years"] = round(age_days / 365.25, 1)
        except ValueError:
            pass

    # Attach maintenance history for this asset
    asset_id = match.get("asset_id", "")
    maintenance = [
        e for e in knowledge_base.get("maintenance_events", [])
        if e.get("asset_id") == asset_id
    ]
    if maintenance:
        result["maintenance_history"] = maintenance

    return json.dumps(result)
