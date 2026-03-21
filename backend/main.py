"""
Cortex API entry point.

FastAPI application that serves the Cortex home intelligence agent.
- GET /health — service health check
- POST /chat — send a message to the Cortex agent and receive a response
  with reasoning trace

Loads the knowledge base at startup and passes it to the agent on each request.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Cortex", description="AI Home Intelligence Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

knowledge_base = {}


@app.on_event("startup")
async def load_knowledge_base():
    """Load the home knowledge base from JSON at startup."""
    pass


@app.get("/health")
async def health():
    """Health check endpoint."""
    pass


@app.post("/chat")
async def chat():
    """
    Send a message to the Cortex agent.

    Request body: { "message": str, "history": list }
    Response: { "response": str, "reasoning_trace": list, "drafted_message": str | null }
    """
    pass
