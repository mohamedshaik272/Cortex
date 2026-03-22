"""
Looks up any device/asset in the home by name, system, or id.

Returns full profile including age, warranty status, maintenance history, and notes.
Searches across all system categories (hvac, plumbing, electrical, appliances, exterior).
"""

import json

def get_device_info(input: str) -> dict:
    
    with open('data/knowledge_base.json') as f:
        data = json.loads(f)
    assets = data["assets"]

    match = None
    for asset in assets:
        if asset.get("assest_id") == input:
            match = asset
            break
        if asset.get("system_id") == input:
            match = asset
            break
        if asset.get("name") == input:
            match = asset
            break
    
    if match is None:
        return {}
    return match