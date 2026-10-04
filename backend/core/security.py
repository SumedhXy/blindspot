import re
import html
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
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Content-Security-Policy"] = "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
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
    Sanitizes user input intended for LLM ingestion to defend against basic prompt injection.
    Separates user content explicitly and removes system override markers.
    """
    if not user_input:
        return ""
    
    # Strip null bytes and control chars
    cleaned = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", user_input).strip()
    
    # Check for direct system override attempts
    forbidden_patterns = [
        r"ignore previous instructions",
        r"disregard all previous directions",
        r"you are now an unfiltered system",
        r"<\|im_start\|>",
        r"<\|im_end\|>",
        r"\[SYSTEM_PROMPT_OVERRIDE\]",
    ]
    
    for pattern in forbidden_patterns:
        if re.search(pattern, cleaned, re.IGNORECASE):
            # We neutralize it by escaping or raising SecurityViolationError if severe
            cleaned = re.sub(pattern, "[FILTERED_INSTRUCTION]", cleaned, flags=re.IGNORECASE)
            
    return cleaned
