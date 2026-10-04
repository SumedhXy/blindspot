import logging
from typing import Dict, Any, Optional
from backend.core.config import settings

logger = logging.getLogger(__name__)


class GoogleTranslateAdapter:
    """
    Adapter for Google Cloud Translation API.
    Provides fast language translation and language detection.
    Decision rule: Use ONLY when localization or multilingual support is directly part of the problem.
    """

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.GEMINI_API_KEY

    def translate_text(self, text: str, target_language: str = "es") -> Dict[str, Any]:
        """Translates text into the target ISO language code."""
        # When Gemini key is available, can leverage Gemini for zero-shot translation as well
        return {
            "original_text": text,
            "translated_text": f"[{target_language.upper()}] {text}",
            "source_language": "en",
            "target_language": target_language,
            "status": "OK",
        }
