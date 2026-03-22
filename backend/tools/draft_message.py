"""
Composes a message to a service provider.

Includes homeowner address, device details (brand, model, age), the issue
description, and availability. Returns the drafted message text.
"""

import json
from datetime import date


def execute(args: dict, knowledge_base: dict) -> str:
    provider_id = (args.get("provider_id") or "").strip()
    provider_name = (args.get("provider_name") or "").strip()
    asset_id = (args.get("asset_id") or "").strip()
    issue = (args.get("issue") or args.get("issue_description") or "Service request").strip()
    urgency = (args.get("urgency") or "normal").strip()

    # Find provider
    provider = None
    for p in knowledge_base.get("service_providers", []):
        if provider_id and p.get("provider_id") == provider_id:
            provider = p
            break
        if provider_name and provider_name.lower() in p.get("name", "").lower():
            provider = p
            break

    # Find asset
    asset = None
    for a in knowledge_base.get("assets", []):
        if asset_id and a.get("asset_id") == asset_id:
            asset = a
            break

    # Property info
    prop = knowledge_base.get("property", {})
    addr = prop.get("address", {})
    address_str = f"{addr.get('street', '')}, {addr.get('city', '')}, {addr.get('state', '')} {addr.get('zip', '')}"

    lines = []
    lines.append(f"Hi {provider.get('name', provider_name or 'Service Provider')},")
    lines.append("")
    lines.append(f"I'm reaching out regarding a service need at my home.")
    lines.append(f"Address: {address_str}")
    lines.append("")

    if asset:
        age_str = ""
        install_date = asset.get("install_date")
        if install_date:
            try:
                installed = date.fromisoformat(install_date)
                age_years = round((date.today() - installed).days / 365.25, 1)
                age_str = f" ({age_years} years old)"
            except ValueError:
                pass
        lines.append(f"Device: {asset.get('name', 'N/A')}")
        lines.append(f"Brand/Model: {asset.get('make', 'N/A')} {asset.get('model', 'N/A')}{age_str}")
        if asset.get("serial_number"):
            lines.append(f"Serial Number: {asset['serial_number']}")
        lines.append("")

    lines.append(f"Issue: {issue}")
    lines.append(f"Urgency: {urgency}")
    lines.append("")
    lines.append("Please let me know your earliest availability. Thank you!")

    return "\n".join(lines)
