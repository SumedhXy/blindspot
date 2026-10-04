"""
BlindSpot FastAPI Router & Endpoints.
Mounts under /api/v1/blindspot with strict validation, response envelopes,
and error handling.
"""

from fastapi import APIRouter, Depends, status
from backend.schemas.common import ResponseEnvelope
from project_blindspot.schemas import (
    BlindSpotAnalyzeRequest,
    BlindSpotAnalysisResponse,
    StressTestFeedbackRequest,
    StressTestFeedbackResponse,
    ChallengeReasoningRequest,
    ChallengeReasoningResponse,
)
from project_blindspot.ai_engine import BlindSpotAIEngine

router = APIRouter(prefix="/blindspot", tags=["BlindSpot — Decision Stress-Test"])
blindspot_engine = BlindSpotAIEngine()


@router.post(
    "/analyze",
    response_model=ResponseEnvelope[BlindSpotAnalysisResponse],
    status_code=status.HTTP_200_OK,
    summary="Conduct 6-Lens Decision Reasoning Audit",
)
def analyze_decision_reasoning(req: BlindSpotAnalyzeRequest):
    """
    Analyzes a user's decision rationale without giving advice or recommendations.
    Extracts claims, uncovers assumptions, discovers missing information,
    detects reasoning tensions, evaluates perspectives, identifies evidence gaps,
    computes sensitivity rankings, and constructs a counterfactual stress-test.
    """
    analysis = blindspot_engine.analyze_decision(req)
    return ResponseEnvelope(
        data=analysis,
        message="Decision reasoning audit completed successfully across 6 analytical lenses."
    )


@router.post(
    "/stress-test",
    response_model=ResponseEnvelope[StressTestFeedbackResponse],
    status_code=status.HTTP_200_OK,
    summary="Evaluate Interactive Stress-Test Response",
)
def evaluate_stress_test_response(req: StressTestFeedbackRequest):
    """
    Evaluates user selection (YES / MAYBE / NO) against the counterfactual scenario.
    Provides immediate audit feedback and adds targeted investigation checklist items.
    """
    feedback = blindspot_engine.evaluate_stress_test(req)
    return ResponseEnvelope(
        data=feedback,
        message="Stress-test response processed; dynamic interrogation generated."
    )


@router.post(
    "/challenge",
    response_model=ResponseEnvelope[ChallengeReasoningResponse],
    status_code=status.HTTP_200_OK,
    summary="Generate Adversarial Reasoning Challenge",
)
def challenge_user_reasoning(req: ChallengeReasoningRequest):
    """
    Constructs an adversarial-but-constructive breakdown of the user's strongest argument,
    key vulnerability, counter-perspective, and decisive evidence to seek.
    """
    challenge = blindspot_engine.challenge_reasoning(req)
    return ResponseEnvelope(
        data=challenge,
        message="Adversarial reasoning challenge generated."
    )


@router.get(
    "/sample",
    response_model=ResponseEnvelope[BlindSpotAnalyzeRequest],
    status_code=status.HTTP_200_OK,
    summary="Get Pre-filled Sample Decision for Instant Demo",
)
def get_sample_decision():
    """Returns the flagship benchmark internship dilemma for zero-friction demoing."""
    sample = BlindSpotAnalyzeRequest(
        decision_prompt="Should I accept this 6-month software engineering internship?",
        context_reasoning="The company is well known. The stipend is ₹25,000 per month. It is 15 km from my home. I believe it will give me valuable industry experience for my future career.",
        priorities=["Career growth", "Learning", "Education", "Money", "Convenience"],
    )
    return ResponseEnvelope(data=sample, message="Sample decision loaded.")
