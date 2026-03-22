"""
Cortex API entry point.

FastAPI application that serves the Cortex home intelligence agent.
- GET /health — service health check
- POST /chat — send a message to the Cortex agent and receive a response
  with reasoning trace

Loads the knowledge base at startup and passes it to the agent on each request.
"""

import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.config import DATA_PATH
from backend.agent.orchestrator import run_agent

app = FastAPI(title="Cortex", description="AI Home Intelligence Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

knowledge_base: dict = {}


class ChatRequest(BaseModel):
    message: str
    history: list = []


@app.on_event("startup")
async def load_knowledge_base():
    """Load the home knowledge base from JSON at startup."""
    global knowledge_base
    with open(DATA_PATH, "r") as f:
        knowledge_base = json.load(f)


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {
        "status": "ok",
        "knowledge_base_loaded": bool(knowledge_base),
        "asset_count": len(knowledge_base.get("assets", [])),
    }


@app.post("/chat")
async def chat(req: ChatRequest):
    """
    Send a message to the Cortex agent.

    Request body: { "message": str, "history": list }
    Response: { "response": str, "reasoning_trace": list, "drafted_message": str | null }
    """
    result = await run_agent(req.message, knowledge_base, req.history)
    return result
