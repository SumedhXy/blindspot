import re
import html
import unicodedata
from typing import Optional
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from backend.core.errors import SecurityViolationError


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Adds essential OWASP security headers to all responses."""

    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "0"  # Modern OWASP standard
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=(), payment=()"
        response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
        response.headers["X-DNS-Prefetch-Control"] = "off"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "img-src 'self' data: https:; "
            "script-src 'self' 'unsafe-inline'; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com data:;"
        )
        return response


def sanitize_text(text: Optional[str]) -> str:
    """Escapes potential HTML/script injections and normalizes whitespace."""
    if not text:
        return ""
    # Strip dangerous control characters
    cleaned = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", text)
    # Escape HTML characters to prevent XSS
    return html.escape(cleaned.strip())


def sanitize_prompt_input(user_input: str) -> str:
    """
    Sanitizes user input intended for LLM ingestion to defend against prompt injection.
    - Normalizes Unicode (NFKC) to prevent homoglyph attacks.
    - Strips zero-width characters and control codes.
    - Neutralizes instruction override markers, system spoofing, and delimiter breakouts.
    """
    if not user_input:
        return ""

    # 1. Normalize Unicode and remove zero-width characters
    normalized = unicodedata.normalize("NFKC", str(user_input))
    cleaned = re.sub(r"[\u200b-\u200f\ufeff\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", normalized).strip()

    # 2. Comprehensive prompt injection and delimiter breakout patterns
    forbidden_patterns = [
        r"ignore\s+(all\s+)?(previous|prior)\s+(instructions|directions|prompts)",
        r"disregard\s+(all\s+)?(previous|prior)\s+(instructions|directions)",
        r"you\s+are\s+now\s+(an?\s+)?unfiltered",
        r"<\|im_start\|>",
        r"<\|im_end\|>",
        r"\[SYSTEM_PROMPT_OVERRIDE\]",
        r"\[/?INST\]",
        r"<<SYS>>",
        r"<</SYS>>",
        r"^\s*(SYSTEM|DEVELOPER|ASSISTANT)\s*:\s*",
        r"override\s+system\s+prompt",
        r"reveal\s+your\s+system\s+prompt",
    ]

    for pattern in forbidden_patterns:
        cleaned = re.sub(pattern, "[FILTERED_INSTRUCTION]", cleaned, flags=re.IGNORECASE | re.MULTILINE)

    return cleaned
