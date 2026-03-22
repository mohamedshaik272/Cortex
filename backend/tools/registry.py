"""
Tool registry for the Cortex agent.

Exports:
    TOOL_DECLARATIONS — list of Tool objects formatted for the Gemini API
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

from google.genai import types

from . import (
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


def _schema(properties: dict[str, types.Schema], required: list[str] | None = None) -> types.Schema:
    return types.Schema(
        type="OBJECT",
        properties=properties,
        required=required or [],
    )


def _str(description: str) -> types.Schema:
    return types.Schema(type="STRING", description=description)


def _int(description: str) -> types.Schema:
    return types.Schema(type="INTEGER", description=description)


TOOL_DECLARATIONS = [
    types.Tool(function_declarations=[
        types.FunctionDeclaration(
            name="get_device_info",
            description="Look up a home device or asset by name, system, location, or asset ID. Returns full profile including age, warranty status, and maintenance history.",
            parameters=_schema(
                {"input": _str("The asset name, category, system ID, or asset ID to search for (e.g. 'water heater', 'asset_furnace', 'sys_hvac').")},
                ["input"],
            ),
        ),
        types.FunctionDeclaration(
            name="check_warranty",
            description="Check warranty status for a specific device, or list all warranties if no asset is specified. Returns whether warranty is active or expired, coverage dates, and provider.",
            parameters=_schema(
                {
                    "asset_id": _str("Unique identifier for the asset, e.g. 'asset_furnace'. Leave empty to get all warranties."),
                    "name": _str("Human-readable name of the asset, e.g. 'Gas Furnace'. Used if asset_id is not known. Leave empty to get all warranties."),
                },
            ),
        ),
        types.FunctionDeclaration(
            name="find_provider",
            description="Find service providers by trade type or name. Returns provider profile, job history with this home, ratings, and notes.",
            parameters=_schema({
                "trade_type": _str("The trade or specialty to search for, e.g. 'plumber', 'hvac', 'electrician', 'appliance'."),
                "name": _str("Provider name to search for, e.g. 'Fairfax Plumbing'."),
            }),
        ),
        types.FunctionDeclaration(
            name="get_spending",
            description="Query financial records and utility history. Can filter by asset, system, utility type, and time range. Returns line items and totals.",
            parameters=_schema({
                "asset_id": _str("Filter by asset ID, e.g. 'asset_water_heater'."),
                "system_id": _str("Filter by system ID, e.g. 'sys_plumbing'."),
                "utility_type": _str("Filter utility records by type: 'electricity', 'water', or 'natural_gas'."),
                "months": _int("Only include records from the last N months."),
                "category": _str("Filter category: 'service' for financial records, 'utility' for utility bills."),
            }),
        ),
        types.FunctionDeclaration(
            name="check_local_alerts",
            description="Check for local utility alerts, water advisories, weather warnings, power outages, and infrastructure issues near the home's location.",
            parameters=_schema({
                "query": _str("Optional filter for alert type, e.g. 'weather', 'power', 'water'."),
            }),
        ),
        types.FunctionDeclaration(
            name="draft_message",
            description="Compose a message to a service provider. Includes homeowner address, device details, issue description, and urgency.",
            parameters=_schema(
                {
                    "provider_id": _str("The provider ID to address, e.g. 'prov_001'."),
                    "provider_name": _str("Provider name if ID is not known."),
                    "asset_id": _str("The asset ID related to the service request."),
                    "issue": _str("Description of the issue or service needed."),
                    "urgency": _str("Urgency level: 'low', 'normal', 'high', or 'emergency'."),
                },
                ["issue"],
            ),
        ),
        types.FunctionDeclaration(
            name="search_web",
            description="Search the web for current pricing, product info, replacement recommendations, recalls, and local service availability.",
            parameters=_schema(
                {"query": _str("The search query, e.g. 'water heater replacement cost 2026', 'Rheem recall'.")},
                ["query"],
            ),
        ),
    ])
]
