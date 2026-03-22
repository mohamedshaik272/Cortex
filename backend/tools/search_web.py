"""
General web search for current pricing, product info, replacement recommendations,
recalls, and local service availability.

Returns simulated but realistic search results for the demo.
"""

import json


def execute(args: dict, knowledge_base: dict) -> str:
    query = (args.get("query") or "").strip().lower()

    if not query:
        return json.dumps({"error": "No search query provided."})

    # Simulated search results based on common demo queries
    results = []

    if "water heater" in query and ("price" in query or "cost" in query or "replacement" in query or "new" in query):
        results = [
            {
                "title": "Water Heater Replacement Cost (2026)",
                "snippet": "Average cost to replace a 40-gallon tank water heater: $1,200–$2,500 installed. Tankless units range $2,800–$4,500. Rheem, A.O. Smith, and Bradford White are top-rated brands.",
                "source": "HomeAdvisor",
            },
            {
                "title": "Best Water Heaters of 2026",
                "snippet": "Top picks: Rheem Performance Platinum ($1,350), A.O. Smith Signature Premier ($1,500), Rinnai Tankless RU199iN ($2,900). Energy Star models can save $300+/year.",
                "source": "Consumer Reports",
            },
        ]
    elif "furnace" in query:
        results = [
            {
                "title": "Furnace Repair & Replacement Costs (2026)",
                "snippet": "Common furnace repairs: $150–$500. Full replacement: $3,000–$7,500 depending on efficiency and brand. Carrier and Trane are industry leaders.",
                "source": "Angi",
            },
        ]
    elif "hvac" in query:
        results = [
            {
                "title": "HVAC Service Costs in Northern Virginia",
                "snippet": "Average HVAC tune-up: $150–$250. Emergency repair: $200–$600. Full system replacement: $5,000–$12,000.",
                "source": "HomeAdvisor",
            },
        ]
    elif "plumb" in query:
        results = [
            {
                "title": "Plumbing Service Costs — Fairfax VA Area",
                "snippet": "Average plumber rate in Fairfax: $95–$175/hour. Common calls: leak repair ($150–$400), water heater service ($125–$350), drain clearing ($100–$300).",
                "source": "Thumbtack",
            },
        ]
    elif "recall" in query:
        results = [
            {
                "title": "CPSC Product Recalls — Home Appliances",
                "snippet": "No active recalls found for Rheem XE40M series water heaters or Carrier 59SC furnaces as of March 2026.",
                "source": "CPSC.gov",
            },
        ]
    else:
        results = [
            {
                "title": f"Search results for: {query}",
                "snippet": f"Multiple results found for '{query}'. Typical home service costs in Northern Virginia range $100–$500 for repairs, $1,000–$10,000 for replacements depending on the system.",
                "source": "Various",
            },
        ]

    return json.dumps({"query": query, "results": results})
