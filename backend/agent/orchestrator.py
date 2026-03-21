"""
Cortex Agent Orchestrator.

The brain of Cortex. Handles the full agent loop:

1. Takes a user message and the loaded knowledge base
2. Sends the message to Gemini with tool declarations from the registry
3. Handles the function calling loop:
   - Gemini requests a tool call → execute it via execute_tool()
   - Send the tool result back to Gemini
   - Repeat until Gemini produces a final text response
4. Returns both the final response text AND the reasoning trace

The reasoning trace is a list of dicts showing each tool the agent called:
[
    {
        "tool_name": "get_device_info",
        "input": {"name": "water heater"},
        "output_summary": "A.O. Smith ProLine XE, installed 2014, 11 years old, warranty expired"
    },
    ...
]

This trace is displayed in the UI's right panel so the user can see
exactly how Cortex reasoned through their question.
"""


async def run_agent(message: str, knowledge_base: dict, history: list) -> dict:
    """
    Run the Cortex agent on a user message.

    Args:
        message: The user's question or request.
        knowledge_base: The full home knowledge base dict.
        history: Conversation history as a list of message dicts.

    Returns:
        {
            "response": str,           # The agent's final text response
            "reasoning_trace": list,    # List of tool call dicts
            "drafted_message": str | None  # If the agent drafted a message to a provider
        }
    """
    pass


def execute_tool(tool_name: str, args: dict, knowledge_base: dict) -> str:
    """
    Execute a single tool by name with the given arguments.

    Args:
        tool_name: The name of the tool to execute (must exist in TOOL_FUNCTIONS).
        args: The arguments dict passed by Gemini's function call.
        knowledge_base: The full home knowledge base dict.

    Returns:
        A string result from the tool execution.
    """
    pass
