"""
Tool registry for the Cortex agent.

Exports:
    TOOL_DECLARATIONS — list of function declarations formatted for the Gemini API
    TOOL_FUNCTIONS — dict mapping tool names to their execute functions

Available tools:
    get_device_info    — Look up any device/asset by name, system, or id
    check_warranty     — Check warranty status for a specific device
    find_provider      — Find service providers by trade type
    get_spending       — Query financial history with filters
    check_local_alerts — Search for local utility/weather alerts
    draft_message      — Compose a message to a service provider
    search_web         — General web search for pricing, products, recalls
"""

from backend.tools import (
    get_device_info,
    check_warranty,
    find_provider,
    get_spending,
    check_local_alerts,
    draft_message,
    search_web,
)

TOOL_FUNCTIONS = {
    "get_device_info": get_device_info.execute,
    "check_warranty": check_warranty.execute,
    "find_provider": find_provider.execute,
    "get_spending": get_spending.execute,
    "check_local_alerts": check_local_alerts.execute,
    "draft_message": draft_message.execute,
    "search_web": search_web.execute,
}

TOOL_DECLARATIONS = [
    {
        "name": "get_device_info",
        "description": "Look up a home device or asset by name, system, location, or asset ID, using input, inside the ",
        "parameters": {
            "type": "object",
            "properties": {
                "input": {
                    "type": "string",
                    "description": "The asset name, system ID, or asset ID to search for."
                }
            },
            "required": ["input"]
        }
    },
    {
        "name": "check_warranty",
        "description": "Checks warranty status for a specific device. Returns whether warranty is active or expired, what's covered, expiration date, and provider.",
        "parameters": {
            "type": "object",
            "properties": {
                "asset_id": {
                    "type": "string",
                    "description": "Unique identifier for the asset, e.g. 'asset_furnace'."
                },
                "system_id": {
                    "type": "string",
                    "description": "The home system this asset belongs to, e.g. 'sys_hvac', 'sys_plumbing'."
                },
                "name": {
                    "type": "string",
                    "description": "Human-readable name of the asset, e.g. 'Gas Furnace'."
                },
                "category": {
                    "type": "string",
                    "description": "Asset category type, e.g. 'furnace', 'water_heater', 'washer'."
                },
                "make": {
                    "type": "string",
                    "description": "Manufacturer of the asset, e.g. 'Carrier', 'Rheem'."
                },
                "model": {
                    "type": "string",
                    "description": "Model number of the asset, e.g. '59SC5B080E17'."
                },
                "serial_number": {
                    "type": "string",
                    "description": "Manufacturer serial number, used for warranty and service lookups."
                },
                "install_date": {
                    "type": "string",
                    "format": "date",
                    "description": "Date the asset was installed, in ISO 8601 format (YYYY-MM-DD)."
                },
                "expected_lifespan_years": {
                    "type": "integer",
                    "description": "Expected operational lifespan in years, used to estimate end-of-life."
                },
                "warranty_id": {
                    "type": "string",
                    "description": "Reference ID linking to the asset's warranty record, e.g. 'warr_002'."
                },
                "maintenance_event_ids": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "List of maintenance event IDs associated with this asset, e.g. ['maint_003']."
                },
                "document_ids": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "List of document IDs linked to this asset, such as manuals or receipts, e.g. ['doc_004']."
                }
            },
            "required": ["asset"]
        }
    }
]  # TODO: Populate with Gemini function declaration schema
