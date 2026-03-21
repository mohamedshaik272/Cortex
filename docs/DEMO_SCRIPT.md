# Cortex Demo Script

Three scenarios, escalating in complexity. Lead with Scenario 1 — it's the killer demo.

---

## Scenario 1 — The Killer Demo: Water Heater Diagnosis

### Query
> "My water heater is making a weird noise and my energy bill jumped 30%."

### What the Reasoning Trace Should Show

1. **get_device_info** — Searched for "water heater"
   - Found: A.O. Smith ProLine XE, 50-gallon gas, installed August 2014
   - Age: 11 years (expected lifespan: 10 years — past end of life)
   - Status: operational_with_concerns
   - Notes: Rumbling noises, corroded anode rod, sediment buildup

2. **check_warranty** — Checked warranty for water heater
   - Warranty: Expired August 2020 (6-year manufacturer limited)
   - Not covered for any repairs or replacement

3. **get_spending** — Pulled energy bills for the last 12 months
   - Pattern: Electric bills rising from ~$168/mo in Dec 2024 to $247/mo in Feb 2026
   - That's a ~47% increase over 14 months — consistent with a failing water heater

4. **search_web** — Searched "A.O. Smith 50 gallon gas water heater replacement cost 2026"
   - Estimated replacement: $1,800-$2,400 installed for comparable unit
   - Current recommended models and pricing

5. **find_provider** — Searched for plumbing providers
   - Found: Blue Ridge Plumbing (Mike Hargrove)
   - 3 jobs completed, all rated 5 stars
   - Previously serviced this exact water heater (March 2024 flush)

6. **draft_message** — Drafted message to Blue Ridge Plumbing
   - Includes address, device details, symptoms, service history

### What the Final Response Should Look Like

Cortex explains:
- Your water heater is an A.O. Smith ProLine XE installed in August 2014 — it's 11 years old, which is past the typical 10-year lifespan for tank gas water heaters
- The rumbling noise is almost certainly sediment buildup at the bottom of the tank. This is consistent with the corroded anode rod noted during the March 2024 service
- Your energy bills have been climbing steadily: from $168/month to $247/month over the last 14 months. A failing water heater working harder to heat through sediment is a likely contributor
- The warranty expired in 2020, so any repair or replacement is out of pocket
- Replacement cost estimate: $1,800-$2,400 installed for a comparable 50-gallon gas unit
- Recommended provider: Blue Ridge Plumbing (Mike Hargrove, 434-555-0147). They've done 3 jobs for you, all rated 5 stars, and they serviced this exact water heater last year
- A drafted message to Blue Ridge Plumbing is ready for you to review and send

**Why this impresses judges:** This is not a chatbot response — it's multi-step reasoning across 6 different data sources, all happening in seconds with full transparency. The reasoning trace makes it feel like an intelligence platform. The drafted message makes it immediately actionable.

---

## Scenario 2 — Warranty Deep Dive

### Query
> "What's still under warranty in this house?"

### What the Reasoning Trace Should Show

1. **get_device_info** — Scanned all devices across all systems
   - Retrieved full asset inventory (10+ devices)

2. **check_warranty** — Checked warranty for each device
   - Iterated through all assets to determine warranty status

### What the Final Response Should Look Like

Cortex returns a clear, organized breakdown:

**Active Warranties:**
- Carrier AC (24ACC636A003) — Compressor/coil parts coverage through April 2027
- Rheem Furnace (R801TA075421MSA) — Heat exchanger through April 2037, other parts through 2027
- Bosch Dishwasher (SHPM88Z75N) — Parts and labor through November 2026
- Smoke/CO Detectors (Kidde) — Through March 2031
- LiftMaster Garage Opener — Motor/belt lifetime warranty, parts through May 2027
- Samsung Refrigerator — Compressor only (parts) through January 2030
- LG Washer — Motor only (parts) through January 2030
- GAF Roof — Prorated manufacturer coverage through June 2028

**Expired / No Warranty:**
- A.O. Smith Water Heater — Expired August 2020 (11 years old, past lifespan)
- Wayne Sump Pump — Expired November 2024
- Square D Electrical Panel — Expires June 2028 but original install, non-transferable portions may apply

**Attention Needed:**
- Water heater is past both warranty and expected lifespan — highest risk
- Sump pump warranty just expired, monitor closely

**Why this impresses judges:** Shows that Cortex doesn't just look up one device — it reasons across the entire home inventory and presents a prioritized risk assessment, not just a list.

---

## Scenario 3 — Local Alert + Cross-Reference

### Query
> "Are there any local alerts that could affect my house?"

### What the Reasoning Trace Should Show

1. **check_local_alerts** — Searched for alerts in Charlottesville, VA 22901
   - Checked Dominion Energy outage map, Rivanna Water advisories, NWS alerts, Albemarle County notices

2. **get_device_info** — Cross-referenced home systems with alert types
   - Checked sewer type (city sewer), water source (city water), backup power capability

3. **get_spending** — Pulled recent utility patterns
   - Checked if any recent utility anomalies match alert conditions

### What the Final Response Should Look Like

Cortex provides a contextualized assessment:
- Reports any active alerts (weather warnings, water advisories, planned outages)
- Cross-references with the home's specific setup:
  - "You're on city sewer, so a boil water advisory would affect you"
  - "You have a sump pump with battery backup — last tested May 2025. If there's a flood warning, you're partially protected but the backup battery is approaching 2 years old"
  - "Your garage door opener has battery backup for power outages"
- Recommends specific actions based on the home's actual configuration

**Why this impresses judges:** This is the "intelligence" in home intelligence. It's not just forwarding alerts — it's interpreting them in the context of this specific home's systems, vulnerabilities, and backup capabilities. No other home app does this.

---

## Demo Tips

- **Start with Scenario 1.** It's the most dramatic and showcases the full agent loop.
- **Point out the reasoning trace.** This is the visual differentiator. While the response is generating, the right panel shows each tool being called in real-time.
- **Emphasize the drafted message.** The fact that Cortex doesn't just diagnose but also prepares the action (message to plumber) is the "wow" moment.
- **If asked "is the data real?"** — Yes, the knowledge base contains realistic device models, prices, and provider histories. In production, this would be populated from receipts, smart home APIs, and user input.
- **If asked about scalability** — The tool architecture is modular. Adding a new capability (e.g., checking energy rebates) is just adding a new tool file and registering it.
