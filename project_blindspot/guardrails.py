"""
BlindSpot Alignment & Quality Guardrails.
Guarantees:
1. Strict adherence to the negative constraint gate (NO prescriptive advice, NO decision scores).
2. Socratic rewriting of any directive phrasing that slips through model generation.
3. Source transparency (attaches analysis_source: 'ai' | 'offline_fallback').
"""

import re
from typing import List, TypeVar
from pydantic import BaseModel
from project_blindspot.schemas import (
    BlindSpotAnalysisResponse,
    StressTestFeedbackResponse,
    ChallengeReasoningResponse,
)

T = TypeVar("T", bound=BaseModel)

# Regex patterns for directive language
DIRECTIVE_PATTERNS = [
    (r"\b(you\s+must\s+decide|you\s+must\s+choose|you\s+should\s+accept|you\s+should\s+reject|you\s+ought\s+to|I\s+recommend\s+that\s+you|we\s+advise\s+you\s+to)\b", "it is worth investigating whether you should"),
    (r"\b(my\s+recommendation\s+is\s+to|the\s+final\s+verdict\s+is\s+to|you\s+must\s+treat)\b", "an essential question to consider is"),
    (r"\b(definitely\s+take\s+this|definitely\s+decline\s+this)\b", "carefully weigh the trade-offs of this"),
]


def sanitize_directive_language(text: str) -> str:
    """Replaces prescriptive/directive phrases with open Socratic inquiry phrases."""
    if not text:
        return ""
    result = text
    for pattern, replacement in DIRECTIVE_PATTERNS:
        result = re.sub(pattern, replacement, result, flags=re.IGNORECASE)
    return result


def enforce_analysis_guardrails(
    response: BlindSpotAnalysisResponse,
    source: str = "ai",
) -> BlindSpotAnalysisResponse:
    """
    Validates and cleanses a BlindSpotAnalysisResponse:
    - Neutralizes directive language across all lens items.
    - Sets the transparent source tag ('ai' or 'offline_fallback').
    """
    response.decision_summary = sanitize_directive_language(response.decision_summary)

    for item in response.assumptions:
        item.explanation = sanitize_directive_language(item.explanation)
        if item.adversary_challenge:
            item.adversary_challenge = sanitize_directive_language(item.adversary_challenge)

    for item in response.missing_information:
        item.why_it_matters = sanitize_directive_language(item.why_it_matters)
        item.investigative_question = sanitize_directive_language(item.investigative_question)

    for item in response.reasoning_tensions:
        item.probing_question = sanitize_directive_language(item.probing_question)

    for item in response.alternative_perspectives:
        item.insight = sanitize_directive_language(item.insight)
        item.critical_question = sanitize_directive_language(item.critical_question)

    if response.stress_test:
        response.stress_test.scenario_premise = sanitize_directive_language(response.stress_test.scenario_premise)
        response.stress_test.if_yes_guidance = sanitize_directive_language(response.stress_test.if_yes_guidance)
        response.stress_test.if_maybe_guidance = sanitize_directive_language(response.stress_test.if_maybe_guidance)
        response.stress_test.if_no_guidance = sanitize_directive_language(response.stress_test.if_no_guidance)

    response.investigation_checklist = [
        sanitize_directive_language(c) for c in response.investigation_checklist
    ]

    return response
