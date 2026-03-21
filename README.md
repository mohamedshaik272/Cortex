# Cortex

**AI-powered home intelligence agent.**

Cortex is not a dashboard. It's an AI agent that reasons across your home's devices, maintenance history, warranties, finances, and trusted service providers to give you complete, actionable answers. Ask it a question about your house and it thinks like a seasoned property manager — tracing problems to root causes, checking warranties, estimating costs, and connecting you with the right people.

## The Demo

> **You:** "My water heater is making a weird noise and my energy bill jumped 30%."

**Cortex:**
1. Looks up your water heater — A.O. Smith ProLine XE, installed 2014, now 11 years old (expected lifespan: 10-12 years). Warranty expired 2020.
2. Pulls your energy bills and spots a 6-month upward trend, consistent with a failing water heater working harder to maintain temperature.
3. Searches current replacement costs — estimates $1,800-$2,400 installed for a comparable unit.
4. Finds your trusted plumber (Blue Ridge Plumbing, used 3 times, highly rated) from your provider list.
5. Drafts a message to the plumber with your address, the device details, and the issue.

All of this happens in seconds. The reasoning trace shows each step live in the UI.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| AI | Gemini API (gemini-2.0-flash) with function calling |
| Backend | Python + FastAPI |
| Frontend | React + Tailwind CSS (Vite) |
| Data | Structured JSON knowledge base |

## How to Run

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp ../.env.example ../.env
# Edit .env with your Gemini API key
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`. API calls proxy to the backend automatically.

## Project Structure

```
cortex/
├── data/                  # Home knowledge base and sample queries
│   ├── knowledge_base.json    # All home data: devices, providers, finances
│   └── sample_queries.md      # Example questions to ask Cortex
│
├── backend/               # Python FastAPI server
│   ├── main.py                # API entry point with /chat and /health
│   ├── config.py              # Environment variable loading
│   ├── agent/                 # AI agent logic
│   │   ├── orchestrator.py    # Gemini function-calling loop
│   │   └── system_prompt.py   # Cortex personality and instructions
│   └── tools/                 # Agent tools (function calling targets)
│       ├── registry.py        # Tool declarations and function map
│       ├── get_device_info.py # Look up any home device/asset
│       ├── check_warranty.py  # Check warranty status
│       ├── find_provider.py   # Find service providers by trade
│       ├── get_spending.py    # Query financial history
│       ├── check_local_alerts.py  # Local utility/weather alerts
│       ├── draft_message.py   # Compose message to provider
│       └── search_web.py      # Web search for pricing/info
│
├── frontend/              # React + Tailwind UI
│   └── src/
│       ├── App.jsx            # Two-panel layout: chat + reasoning trace
│       ├── components/        # Chat UI components
│       └── utils/api.js       # Backend API client
│
└── docs/
    └── DEMO_SCRIPT.md     # Step-by-step demo scenarios
```

## Team

Built at [Hackathon Name] 2026.
