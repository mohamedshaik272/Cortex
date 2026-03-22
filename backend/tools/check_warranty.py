"""
Checks warranty status for a specific device.

Returns whether warranty is active or expired, what's covered,
expiration date, and provider.

PS: Prob need a method to load the knowledge_base? 
Redundant to load it in every call and apparently not supposed to pass it in to the tool...? Allegedly
"""

from datetime import date
import json

# Assuming args includes appliance
def check_warranty(asset: dict) -> dict:

    with open('data/knowledge_base.json') as f:
        knowledge_dict = json.load(f)
    
    warranty_id = asset.get("warranty_id")
    asset_id = asset.get("asset_id")

    if warranty_id is None:
          return {
            "asset_id": asset_id,
            "asset_name": asset.get("name"),
            "warranty_id": None,
            "status": "no_warranty",
            "message": "No warranty ID found on this asset."
        }
    
    matched_warranty = None

    for warranty in knowledge_dict["warranties"]:
        if warranty.get("warranty_id") == warranty_id:
            matched_warranty = warranty
            break
    
    if matched_warranty is None:
        return {
            "asset_id": asset_id,
            "asset_name": asset.get("name"),
            "warranty_id": warranty_id,
            "status": "missing_warranty",
            "message": f"Warranty ID '{warranty_id}' not found in warranties list."
        }
    
    coverage_end_str = matched_warranty.get("coverage_end")
    coverage_end = date.fromisoformat(coverage_end_str)
    today = date.today()
    is_valid = coverage_end >= today

    return {
        "asset_id": asset_id,
        "asset_name": asset.get("name"),
        "warranty_id": warranty_id,
        "provider": matched_warranty.get("provider_name"),
        "coverage_end": coverage_end_str,
        "status": "active" if is_valid else "expired",
        "message": (
            f"Warranty is active until {coverage_end_str}."
            if is_valid
            else f"Warranty expired on {coverage_end_str}."
        )
    }

def main():
     asset = {
      "asset_id": "asset_furnace",
      "system_id": "sys_hvac",
      "name": "Gas Furnace",
      "category": "furnace",
      "make": "Carrier",
      "model": "59SC5B080E17",
      "serial_number": "CA99887766",
      "install_date": "2018-10-02",
      "expected_lifespan_years": 15,
      "warranty_id": "warr_002",
      "maintenance_event_ids": ["maint_003"],
      "document_ids": ["doc_004"]
    }
     
     print(check_warranty(asset))

if __name__ == "__main__":
    main()