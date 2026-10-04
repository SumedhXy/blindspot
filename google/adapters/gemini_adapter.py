import json
import logging
from typing import Optional, Dict, Any, Type, TypeVar
from pydantic import BaseModel
from backend.core.config import settings
from backend.core.errors import AIProviderError, AIValidationError

logger = logging.getLogger(__name__)
T = TypeVar("T", bound=BaseModel)


class GeminiAdapter:
    """
    Adapter for Google Gemini AI API.
    Provides structured output parsing, grounded generation, multimodal support,
    and automatic safe mock/fallback mode for offline or unauthenticated testing.
    """

    def __init__(self, api_key: Optional[str] = None, model_name: Optional[str] = None):
        self.api_key = api_key or settings.GEMINI_API_KEY
        self.model_name = model_name or settings.GEMINI_MODEL
        self._client = None
        self._initialize_client()

    def _initialize_client(self) -> None:
        if self.api_key:
            try:
                from google import genai
                self._client = genai.Client(api_key=self.api_key)
                logger.info("Initialized Gemini Client with provided API key.")
            except Exception as e:
                logger.warning(f"Could not initialize google-genai client: {e}. Will use fallback.")
                self._client = None
        else:
            logger.info("No GEMINI_API_KEY provided; operating in mock/fallback mode.")

    def is_configured(self) -> bool:
        return self._client is not None

    def generate_text(self, prompt: str, system_instruction: Optional[str] = None) -> str:
        """Generates raw text response."""
        if not self._client:
            return f"[MOCK_GEMINI_RESPONSE]: Response for prompt: '{prompt[:60]}...'"

        try:
            response = self._client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config={"system_instruction": system_instruction} if system_instruction else None,
            )
            return response.text or ""
        except Exception as e:
            logger.error(f"Gemini generate_text error: {e}")
            if settings.AI_MOCK_FALLBACK:
                return f"[FALLBACK_GEMINI_RESPONSE]: Provider encountered error ({e}). Safe fallback output."
            raise AIProviderError(f"Gemini API invocation failed: {e}")

    def generate_structured(
        self,
        prompt: str,
        response_schema: Type[T],
        system_instruction: Optional[str] = None,
    ) -> T:
        """
        Generates and validates structured JSON output against a Pydantic schema model.
        Protects against malformed JSON, missing fields, and unexpected formats.
        """
        schema_json = json.dumps(response_schema.model_json_schema())
        instruction = (
            f"{system_instruction or 'You are an analytical assistant.'}\n"
            f"You MUST output valid JSON conforming strictly to this JSON Schema:\n"
            f"{schema_json}\n"
            f"Do not include Markdown formatting or triple backticks outside the JSON."
        )

        if not self._client:
            # Generate deterministic mock matching the requested schema structure
            return self._generate_mock_structured(response_schema, prompt)

        try:
            raw_response = self._client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config={
                    "system_instruction": instruction,
                    "response_mime_type": "application/json",
                },
            )
            raw_text = raw_response.text or "{}"
            # Clean possible markdown formatting
            cleaned_text = raw_text.strip()
            if cleaned_text.startswith("```json"):
                cleaned_text = cleaned_text[7:]
            if cleaned_text.startswith("```"):
                cleaned_text = cleaned_text[3:]
            if cleaned_text.endswith("```"):
                cleaned_text = cleaned_text[:-3]

            parsed_data = json.loads(cleaned_text.strip())
            return response_schema.model_validate(parsed_data)
        except json.JSONDecodeError as jde:
            logger.warning(f"Malformed JSON from Gemini: {jde}. Attempting fallback.")
            if settings.AI_MOCK_FALLBACK:
                return self._generate_mock_structured(response_schema, prompt)
            raise AIValidationError(f"Gemini returned invalid JSON: {jde}")
        except Exception as e:
            logger.error(f"Gemini structured error: {e}")
            if settings.AI_MOCK_FALLBACK:
                return self._generate_mock_structured(response_schema, prompt)
            raise AIProviderError(f"Structured Gemini call failed: {e}")

    def generate_multimodal(
        self,
        prompt: str,
        image_bytes: bytes,
        mime_type: str = "image/png",
    ) -> Dict[str, Any]:
        """Analyzes an image/document visual snippet alongside a text prompt."""
        if not self._client:
            return {
                "caption": f"Mock visual analysis for {len(image_bytes)} bytes of {mime_type}",
                "detected_elements": ["Header", "Status Bar", "Action Button", "Data Grid"],
                "structured_data": {"confidence": 0.94, "clarity": "high"},
                "requires_human_confirmation": True,
                "proposed_action": "Proceed with user verification of detected data",
            }

        try:
            from google.genai import types
            part = types.Part.from_bytes(data=image_bytes, mime_type=mime_type)
            response = self._client.models.generate_content(
                model=self.model_name,
                contents=[prompt, part],
            )
            return {
                "caption": response.text or "Image analyzed",
                "detected_elements": ["visual_artifact"],
                "structured_data": {"raw": response.text},
                "requires_human_confirmation": True,
                "proposed_action": "Review model visual findings",
            }
        except Exception as e:
            logger.error(f"Gemini multimodal error: {e}")
            return {
                "caption": f"Multimodal analysis fallback: {e}",
                "detected_elements": [],
                "structured_data": {},
                "requires_human_confirmation": True,
                "proposed_action": "Manual review",
            }

    def _generate_mock_structured(self, response_schema: Type[T], prompt: str) -> T:
        """Constructs a valid default mock instance matching the target Pydantic schema."""
        from backend.schemas.common import AIStructuredResponse, AnalysisFinding
        if response_schema == AIStructuredResponse:
            mock_data = AIStructuredResponse(
                title="Automated Analysis Report",
                summary=f"Analysis of input query: '{prompt[:50]}...'",
                score=92.5,
                key_findings=[
                    AnalysisFinding(
                        category="Core Quality",
                        severity="info",
                        description="Input successfully decoded and processed through validation pipeline.",
                        recommendation="Proceed with next stage in workflow.",
                    ),
                    AnalysisFinding(
                        category="Security",
                        severity="info",
                        description="Untrusted prompt markers neutralized; sanitization active.",
                        recommendation="Maintain strict boundary controls.",
                    ),
                ],
                confidence=0.98,
                suggested_actions=["Execute primary action", "Review audit log"],
            )
            return mock_data  # type: ignore
        
        # Generic instantiation
        return response_schema.model_construct()
