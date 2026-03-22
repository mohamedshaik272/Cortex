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


from __future__ import annotations

import asyncio
import json
from typing import Any

from google import genai
from google.genai import types

from backend.agent.system_prompt import SYSTEM_PROMPT
from backend.config import GEMINI_API_KEY, MODEL_NAME
from backend.tools.registry import TOOL_DECLARATIONS, TOOL_FUNCTIONS  # noqa: E402

MAX_TOOL_CALLS = 12


# Convert frontend history items into GenAI `Content` messages.
def _normalize_history(history: list[dict] | None) -> list[types.Content]:
    if not history:
        return []

    normalized: list[types.Content] = []
    for item in history:
        role = item.get("role", "user")
        content = item.get("content", "")
        if role == "assistant":
            role = "model"
        if role not in {"user", "model"}:
            continue
        normalized.append(
            types.Content(role=role, parts=[types.Part(text=str(content))])
        )
    return normalized


# Normalize tool-call args into a plain Python dict.
def _normalize_args(raw_args: Any) -> dict:
    if raw_args is None:
        return {}

    if isinstance(raw_args, dict):
        return {str(k): _to_python(v) for k, v in raw_args.items()}

    if isinstance(raw_args, str):
        try:
            parsed = json.loads(raw_args)
            if isinstance(parsed, dict):
                return {str(k): _to_python(v) for k, v in parsed.items()}
            return {"value": _to_python(parsed)}
        except Exception:
            return {"value": raw_args}

    if hasattr(raw_args, "items"):
        try:
            return {str(k): _to_python(v) for k, v in raw_args.items()}
        except Exception:
            return {}

    try:
        return {str(k): _to_python(v) for k, v in dict(raw_args).items()}
    except Exception:
        return {}


# Convert any Python value into a JSON string (with safe fallback).
def _safe_json(value: Any) -> str:
    try:
        return json.dumps(value, ensure_ascii=True)
    except Exception:
        return str(value)


# Recursively coerce SDK/container values into plain Python primitives.
def _to_python(value: Any) -> Any:
    if isinstance(value, (str, int, float, bool)) or value is None:
        return value

    if isinstance(value, list):
        return [_to_python(item) for item in value]

    if isinstance(value, tuple):
        return [_to_python(item) for item in value]

    if isinstance(value, dict):
        return {str(k): _to_python(v) for k, v in value.items()}

    if hasattr(value, "items"):
        try:
            return {str(k): _to_python(v) for k, v in value.items()}
        except Exception:
            pass

    return str(value)


# Extract function calls from a model response (supports multiple response shapes).
def _extract_function_calls(response: Any) -> list[tuple[str, dict]]:
    calls: list[tuple[str, dict]] = []

    direct_calls = getattr(response, "function_calls", None) or []
    for function_call in direct_calls:
        name = getattr(function_call, "name", None)
        if not name:
            continue
        args = _normalize_args(getattr(function_call, "args", {}))
        calls.append((name, args))

    if calls:
        return calls

    candidates = getattr(response, "candidates", None) or []
    for candidate in candidates:
        content = getattr(candidate, "content", None)
        parts = getattr(content, "parts", None) or []

        for part in parts:
            function_call = getattr(part, "function_call", None)
            if function_call:
                name = getattr(function_call, "name", None)
                if not name:
                    continue
                args = _normalize_args(getattr(function_call, "args", {}))
                calls.append((name, args))

    return calls


# Extract the model's final text response from candidate parts.
def _extract_response_text(response: Any) -> str:
    text = getattr(response, "text", None)
    if isinstance(text, str) and text.strip():
        return text.strip()

    candidates = getattr(response, "candidates", None) or []
    for candidate in candidates:
        content = getattr(candidate, "content", None)
        parts = getattr(content, "parts", None) or []
        chunk_list: list[str] = []

        for part in parts:
            part_text = getattr(part, "text", None)
            if isinstance(part_text, str) and part_text.strip():
                chunk_list.append(part_text.strip())

        if chunk_list:
            return "\n".join(chunk_list)

    return ""


# Get the model content block so we can preserve it in the next turn.
def _extract_model_content(response: Any) -> types.Content | None:
    candidates = getattr(response, "candidates", None) or []
    for candidate in candidates:
        content = getattr(candidate, "content", None)
        if content is not None:
            return content

    return None


# Keep tool outputs short for reasoning trace display.
def _summarize_output(tool_name: str, output: str) -> str:
    try:
        data = json.loads(output)
    except (json.JSONDecodeError, TypeError):
        compact = " ".join(output.split())
        return compact[:200] + "..." if len(compact) > 200 else compact

    if tool_name == "get_device_info":
        if data.get("error"):
            return data["error"]
        # Tool returns a flat asset dict directly
        name = data.get("name", "Unknown")
        age = data.get("age_years", "?")
        brand = data.get("brand", "")
        model = data.get("model_number", "")
        detail = f"{brand} {model}".strip() or name
        return f"{detail} — {age} yrs old"

    if tool_name == "check_warranty":
        if data.get("error"):
            return data["error"]
        # Multi-warranty response
        warranties = data.get("warranties")
        if isinstance(warranties, list):
            active = [w.get("asset_name", "?") for w in warranties if w.get("status") == "active"]
            expired = [w.get("asset_name", "?") for w in warranties if w.get("status") == "expired"]
            parts = []
            if active:
                parts.append(f"{len(active)} active ({', '.join(active)})")
            if expired:
                parts.append(f"{len(expired)} expired ({', '.join(expired)})")
            return "; ".join(parts) if parts else "No warranties on file"
        # Single warranty response
        status = data.get("status", "unknown")
        name = data.get("asset_name") or data.get("name", "Asset")
        exp = data.get("coverage_end", "")
        summary = f"{name}: warranty {status}"
        if exp:
            summary += f" (expires {exp})" if status == "active" else f" (expired {exp})"
        return summary

    if tool_name == "find_provider":
        providers = data.get("providers", [])
        if not providers:
            return "No providers found."
        parts = []
        for p in providers[:3]:
            name = p.get("name", "Unknown")
            rating = p.get("rating", "?")
            phone = p.get("phone", "")
            entry = f"{name} ({rating}★)"
            if phone:
                entry += f" — {phone}"
            parts.append(entry)
        return "; ".join(parts)

    if tool_name == "get_spending":
        records = data.get("financial_records", [])
        utilities = data.get("utility_records", [])
        parts = []
        if records:
            total = sum(r.get("invoice_total", 0) for r in records)
            # Break down by service type if available
            by_type = {}
            for r in records:
                stype = r.get("service_type", "service")
                by_type.setdefault(stype, 0)
                by_type[stype] += r.get("invoice_total", 0)
            if len(by_type) > 1:
                breakdown = ", ".join(f"${v:,.0f} {k}" for k, v in by_type.items())
                parts.append(f"{len(records)} records, ${total:,.0f} total ({breakdown})")
            else:
                parts.append(f"{len(records)} service records, ${total:,.0f} total")
        if utilities:
            parts.append(f"{len(utilities)} utility bills")
        return "; ".join(parts) if parts else "No spending records found."

    if tool_name == "check_local_alerts":
        alerts = data.get("alerts", [])
        if not alerts:
            return "No active alerts in your area."
        parts = [a.get("title", a.get("type", "Alert")) for a in alerts[:4]]
        return f"{len(alerts)} alert(s): " + ", ".join(parts)

    if tool_name == "draft_message":
        to = data.get("to") or data.get("provider_name", "provider")
        return f"Message drafted to {to}"

    if tool_name == "search_web":
        results = data.get("results", [])
        if not results:
            return data.get("summary", "Search completed.")
        titles = [r.get("title", "") for r in results[:3] if r.get("title")]
        return f"{len(results)} results: " + "; ".join(titles) if titles else "Search completed."

    compact = " ".join(str(data).split())
    return compact[:200] + "..." if len(compact) > 200 else compact


# Build a function-response part to send tool results back to the model.
def _make_function_response_part(tool_name: str, tool_output: str) -> types.Part:
    if hasattr(types.Part, "from_function_response"):
        return types.Part.from_function_response(
            name=tool_name, response={"result": tool_output}
        )
    return types.Part(
        function_response=types.FunctionResponse(
            name=tool_name, response={"result": tool_output}
        )
    )


# Run blocking SDK generation in a thread to avoid blocking async request handling.
async def _generate_content(client: genai.Client, model_name: str, contents: list[types.Content], config: types.GenerateContentConfig) -> Any:
    return await asyncio.to_thread(
        client.models.generate_content,
        model=model_name,
        contents=contents,
        config=config,
    )


# Execute one tool safely and always return a string payload to the model.
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
    tool_fn = TOOL_FUNCTIONS.get(tool_name)
    if tool_fn is None:
        return f"Tool '{tool_name}' is not available."

    try:
        result = tool_fn(args or {}, knowledge_base)
    except Exception as e:
        return f"Tool '{tool_name}' failed: {e}"

    if result is None:
        return f"Tool '{tool_name}' returned no result."

    if isinstance(result, str):
        return result

    return _safe_json(result)


# Main agent loop: model call, tool execution loop, then final response.
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
    reasoning_trace: list[dict] = []
    drafted_message: str | None = None

    if not GEMINI_API_KEY:
        return {
            "response": "Gemini API key is missing. Set GEMINI_API_KEY in .env.",
            "reasoning_trace": reasoning_trace,
            "drafted_message": drafted_message,
        }

    client = genai.Client(api_key=GEMINI_API_KEY)
    contents = _normalize_history(history)
    contents.append(types.Content(role="user", parts=[types.Part(text=str(message))]))

    config_kwargs: dict[str, Any] = {"system_instruction": SYSTEM_PROMPT}
    if TOOL_DECLARATIONS:
        config_kwargs["tools"] = TOOL_DECLARATIONS
    config = types.GenerateContentConfig(**config_kwargs)

    try:
        response = await _generate_content(client, MODEL_NAME, contents, config)
    except Exception as exc:
        return {
            "response": f"Model request failed: {exc}",
            "reasoning_trace": reasoning_trace,
            "drafted_message": drafted_message,
        }

    tool_calls = 0
    while tool_calls < MAX_TOOL_CALLS:
        function_calls = _extract_function_calls(response)
        if not function_calls:
            break

        model_content = _extract_model_content(response)
        if model_content is not None:
            contents.append(model_content)

        tool_parts: list[types.Part] = []
        for tool_name, args in function_calls:
            tool_output = execute_tool(tool_name, args, knowledge_base)
            reasoning_trace.append(
                {
                    "tool_name": tool_name,
                    "input": args,
                    "output_summary": _summarize_output(tool_name, tool_output),
                }
            )

            if tool_name == "draft_message":
                drafted_message = tool_output

            tool_parts.append(_make_function_response_part(tool_name, tool_output))
            tool_calls += 1
            if tool_calls >= MAX_TOOL_CALLS:
                break

        if not tool_parts:
            break

        contents.append(types.Content(role="tool", parts=tool_parts))
        try:
            response = await _generate_content(client, MODEL_NAME, contents, config)
        except Exception as exc:
            return {
                "response": f"Model request failed after tool execution: {exc}",
                "reasoning_trace": reasoning_trace,
                "drafted_message": drafted_message,
            }

    final_response = _extract_response_text(response)
    if not final_response:
        if tool_calls >= MAX_TOOL_CALLS:
            final_response = (
                "I hit the tool-call safety limit before finishing. "
                "Please narrow the request and try again."
            )
        else:
            final_response = (
                "I could not produce a complete response right now. "
                "Please try again."
            )

    return {
        "response": final_response,
        "reasoning_trace": reasoning_trace,
        "drafted_message": drafted_message,
    }
