"""
Checks warranty status for a specific device, or all devices if none specified.

Returns whether warranty is active or expired, what's covered,
expiration date, and provider.
"""

import json
from datetime import date


def _build_warranty_record(asset: dict, knowledge_base: dict) -> dict:
    """Build a warranty status record for a single asset."""
    warranty_id = asset.get("warranty_id")
    if warranty_id is None:
        return {
            "asset_id": asset.get("asset_id"),
            "asset_name": asset.get("name"),
            "warranty_id": None,
            "status": "no_warranty",
            "message": "No warranty on file for this asset."
        }

    matched_warranty = None
    for w in knowledge_base.get("warranties", []):
        if w.get("warranty_id") == warranty_id:
            matched_warranty = w
            break

    if matched_warranty is None:
        return {
            "asset_id": asset.get("asset_id"),
            "asset_name": asset.get("name"),
            "warranty_id": warranty_id,
            "status": "missing_warranty",
            "message": f"Warranty ID '{warranty_id}' not found in records."
        }

    coverage_end_str = matched_warranty.get("coverage_end")
    coverage_end = date.fromisoformat(coverage_end_str)
    today = date.today()
    is_valid = coverage_end >= today

    return {
        "asset_id": asset.get("asset_id"),
        "asset_name": asset.get("name"),
        "warranty_id": warranty_id,
        "provider": matched_warranty.get("provider_name"),
        "coverage_start": matched_warranty.get("coverage_start"),
        "coverage_end": coverage_end_str,
        "registration_status": matched_warranty.get("registration_status"),
        "status": "active" if is_valid else "expired",
        "message": (
            f"Warranty is active until {coverage_end_str}."
            if is_valid
            else f"Warranty expired on {coverage_end_str}."
        )
    }


def execute(args: dict, knowledge_base: dict) -> str:
    asset_id = args.get("asset_id", "").strip()
    name = args.get("name", "").strip().lower()

    # If no specific asset requested, return all warranties
    if not asset_id and not name:
        all_assets = knowledge_base.get("assets", [])
        results = [_build_warranty_record(a, knowledge_base) for a in all_assets]
        return json.dumps({"warranties": results})

    # Find the specific asset
    asset = None
    for a in knowledge_base.get("assets", []):
        if asset_id and a.get("asset_id") == asset_id:
            asset = a
            break
        if name and name in a.get("name", "").lower():
            asset = a
            break

    if asset is None:
        return json.dumps({"error": f"Asset not found for asset_id='{asset_id}', name='{name}'."})

    return json.dumps(_build_warranty_record(asset, knowledge_base))
