"""
Searches for local utility alerts, water advisories, weather warnings,
power outages, and infrastructure issues near the home's location.

Uses the home's address and zip code for local context.
Returns simulated but realistic local alerts for the demo.
"""

import json
from datetime import date


def execute(args: dict, knowledge_base: dict) -> str:
    query = (args.get("query") or args.get("alert_type") or "").strip().lower()

    prop = knowledge_base.get("property", {})
    addr = prop.get("address", {})
    city = addr.get("city", "Fairfax")
    state = addr.get("state", "VA")
    zip_code = addr.get("zip", "22030")

    today = date.today().isoformat()

    alerts = [
        {
            "type": "weather",
            "title": f"Freeze Warning — {city}, {state}",
            "severity": "moderate",
            "date": today,
            "summary": f"Overnight lows of 28°F expected in {zip_code} area. Protect exposed pipes and outdoor faucets.",
        },
        {
            "type": "utility",
            "title": f"Fairfax Water — Planned Maintenance",
            "severity": "info",
            "date": today,
            "summary": f"Fairfax County Water Authority scheduled main flushing in {zip_code} area this week. Temporary low pressure possible.",
        },
        {
            "type": "power",
            "title": f"Dominion Energy — No Active Outages",
            "severity": "ok",
            "date": today,
            "summary": f"No reported outages in the {zip_code} service area.",
        },
    ]

    # Filter by query if provided
    if query:
        filtered = [a for a in alerts if query in a["type"] or query in a["title"].lower() or query in a["summary"].lower()]
        if filtered:
            alerts = filtered

    return json.dumps({"location": f"{city}, {state} {zip_code}", "alerts": alerts})
