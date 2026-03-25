# Cortex

**The smart layer for homeownership.**

Cortex gives homeowners a single place to understand everything about their home — what shape it's in, what needs attention, and what to do about it. It pulls together appliance data, maintenance history, warranties, climate factors, and local service providers so you can make better decisions without digging through paperwork or guessing.

## Who it's for

- **Homeowners** who want to stay on top of maintenance, plan for big-ticket repairs, and stop being surprised by what breaks next.
- **Service providers and contractors** who want to see where demand is heading based on real home data — not just search trends.
- **Manufacturers and distributors** who want to understand what homeowners actually need, when they'll need it, and where.

## What it does

- **Home health scoring** — See how your home's major systems (HVAC, water heater, roof, electrical) are doing, scored by age, condition, and safety.
- **Maintenance planning** — Get a timeline of what needs attention now, what's coming soon, and what can wait, based on your equipment and local climate.
- **Interactive floor plan** — Tap into an isometric view of your home's layout to see where each system lives and what's going on with it.
- **Contract and warranty analysis** — Upload or paste closing documents and Cortex pulls out warranty coverage, expiration dates, and cost details automatically.
- **Marketplace recommendations** — See products and services matched to your home's actual needs, with real pricing and local providers.
- **Community-level data** — Explore aggregated trends across a neighborhood to understand regional demand, service value, and equipment patterns.
- **Keep-vs-upgrade analysis** — Compare the cost of maintaining aging equipment against replacing it, with real numbers for your situation.

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Tailwind CSS (Vite) |
| AI | Gemini API (gemini-2.5-flash) with function calling |
| Backend | Python + FastAPI |
| Data | Structured JSON knowledge base |

## Running locally

**Backend:**

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp ../.env.example ../.env  # add your Gemini API key
uvicorn main:app --reload   # runs on localhost:8000
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev  # runs on localhost:5173
```

## HooHacks 2026

Cortex was built and submitted for [HooHacks 2026](https://hoohacks.io).
