"""
BlindSpot FastAPI Router & Endpoints.
Mounts under /api/v1/blindspot with strict validation, response envelopes,
asynchronous non-blocking concurrency, and LRU cache acceleration.
"""

import asyncio
from fastapi import APIRouter, Response, status
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
async def analyze_decision_reasoning(req: BlindSpotAnalyzeRequest) -> ResponseEnvelope[BlindSpotAnalysisResponse]:
    """
    Analyzes a user's decision rationale without giving advice or recommendations.
    Extracts claims, uncovers assumptions, discovers missing information,
    detects reasoning tensions, evaluates perspectives, identifies evidence gaps,
    computes sensitivity rankings, and constructs a counterfactual stress-test.

    Args:
        req (BlindSpotAnalyzeRequest): Decision statement, reasoning context, priorities, and optional document context.

    Returns:
        ResponseEnvelope[BlindSpotAnalysisResponse]: Structured 6-lens reasoning audit with agent execution trace.
    """
    analysis = await asyncio.to_thread(blindspot_engine.analyze_decision, req)
    return ResponseEnvelope(
        data=analysis,
        message="Decision reasoning audit completed successfully across 6 analytical lenses.",
    )


@router.post(
    "/stress-test",
    response_model=ResponseEnvelope[StressTestFeedbackResponse],
    status_code=status.HTTP_200_OK,
    summary="Evaluate Interactive Stress-Test Response",
)
async def evaluate_stress_test_response(req: StressTestFeedbackRequest) -> ResponseEnvelope[StressTestFeedbackResponse]:
    """
    Evaluates user selection (YES / MAYBE / NO) against the counterfactual scenario.
    Provides immediate audit feedback and adds targeted investigation checklist items.

    Args:
        req (StressTestFeedbackRequest): Scenario premise, tested assumption, and user choice.

    Returns:
        ResponseEnvelope[StressTestFeedbackResponse]: Socratic feedback insight and newly recommended action items.
    """
    feedback = await asyncio.to_thread(blindspot_engine.evaluate_stress_test, req)
    return ResponseEnvelope(
        data=feedback,
        message="Stress-test response processed; dynamic interrogation generated.",
    )


@router.post(
    "/challenge",
    response_model=ResponseEnvelope[ChallengeReasoningResponse],
    status_code=status.HTTP_200_OK,
    summary="Generate Adversarial Reasoning Challenge",
)
async def challenge_user_reasoning(req: ChallengeReasoningRequest) -> ResponseEnvelope[ChallengeReasoningResponse]:
    """
    Constructs an adversarial-but-constructive breakdown of the user's strongest argument,
    key vulnerability, counter-perspective, and decisive evidence to seek.

    Args:
        req (ChallengeReasoningRequest): User decision statement, context, and priorities.

    Returns:
        ResponseEnvelope[ChallengeReasoningResponse]: Socratic adversarial breakdown and testing evidence.
    """
    challenge = await asyncio.to_thread(blindspot_engine.challenge_reasoning, req)
    return ResponseEnvelope(
        data=challenge,
        message="Adversarial reasoning challenge generated.",
    )


@router.get(
    "/sample",
    response_model=ResponseEnvelope[BlindSpotAnalyzeRequest],
    status_code=status.HTTP_200_OK,
    summary="Get Pre-filled Sample Decision for Instant Demo",
)
async def get_sample_decision(response: Response) -> ResponseEnvelope[BlindSpotAnalyzeRequest]:
    """
    Returns the flagship benchmark internship dilemma for zero-friction demoing.
    Includes client-side Cache-Control header for sub-millisecond retrieval.

    Args:
        response (Response): FastAPI response object for setting cache headers.

    Returns:
        ResponseEnvelope[BlindSpotAnalyzeRequest]: Pre-filled sample dilemma payload.
    """
    response.headers["Cache-Control"] = "public, max-age=3600, immutable"
    sample = BlindSpotAnalyzeRequest(
        decision_prompt="Should I accept this 6-month software engineering internship?",
        context_reasoning="The company is well known. The stipend is ₹25,000 per month. It is 15 km from my home. I believe it will give me valuable industry experience for my future career.",
        priorities=["Career growth", "Learning", "Education", "Money", "Convenience"],
    )
    return ResponseEnvelope(data=sample, message="Sample decision loaded.")
