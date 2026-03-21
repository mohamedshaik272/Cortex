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

TOOL_DECLARATIONS = []  # TODO: Populate with Gemini function declaration schema
