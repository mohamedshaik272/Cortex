"""
Cortex configuration module.

Loads environment variables from .env file and exports application settings.
All configuration is centralized here so other modules import from config
rather than reading env vars directly.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME", "gemini-2.0-flash")
DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "knowledge_base.json"
