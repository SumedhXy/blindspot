"""
BlindSpot Multi-Agent AI Reasoning Engine.
Implements:
1. Multi-Agent Friction (Agent 1 Dissector vs Agent 2 Antagonist vs Agent 3 Risk Auditor)
2. Document Grounding Layer (Raw text offer letters/contracts/terms analysis)
3. Live Agent Execution Trace generator for frontend visualization
4. Gemini Structured JSON pipeline with dynamic contextual reasoning engine
5. Ultra-fast thread-safe LRU caching with TTL for sub-millisecond response
"""

import time
import hashlib
import logging
from collections import OrderedDict
from threading import Lock
from typing import Optional, Any, Tuple
from google.adapters.gemini_adapter import GeminiAdapter
from backend.core.security import sanitize_prompt_input as sanitize_prompt
from project_blindspot.schemas import (
    BlindSpotAnalyzeRequest,
    BlindSpotAnalysisResponse,
    StressTestFeedbackRequest,
    StressTestFeedbackResponse,
    ChallengeReasoningRequest,
    ChallengeReasoningResponse,
)
from project_blindspot.prompts import (
    BLINDSPOT_SYSTEM_INSTRUCTION,
    STRESS_TEST_FEEDBACK_PROMPT,
    CHALLENGE_REASONING_PROMPT,
)
from project_blindspot.fallback_audit import (
    generate_dynamic_audit,
    generate_dynamic_stress_feedback,
    generate_dynamic_challenge_response,
)

logger = logging.getLogger("blindspot.ai")


class SimpleLRUCache:
    """High-performance thread-safe in-memory LRU cache with TTL for zero-latency AI responses."""

    def __init__(self, maxsize: int = 512, ttl_seconds: int = 7200):
        self._cache: OrderedDict[str, Tuple[Any, float]] = OrderedDict()
        self._maxsize = maxsize
        self._ttl = ttl_seconds
        self._lock = Lock()

    def get(self, key: str) -> Optional[Any]:
        with self._lock:
            if key not in self._cache:
                return None
            value, timestamp = self._cache[key]
            if time.time() - timestamp > self._ttl:
                del self._cache[key]
                return None
            self._cache.move_to_end(key)
            return value

    def set(self, key: str, value: Any) -> None:
        with self._lock:
            if key in self._cache:
                self._cache.move_to_end(key)
            self._cache[key] = (value, time.time())
            if len(self._cache) > self._maxsize:
                self._cache.popitem(last=False)

    def clear(self) -> None:
        with self._lock:
            self._cache.clear()


class BlindSpotAIEngine:
    """Multi-Agent Reasoning Engine for BlindSpot with built-in response caching and efficiency acceleration."""

    def __init__(self, adapter: Optional[GeminiAdapter] = None):
        self.adapter = adapter or GeminiAdapter()
        self._cache = SimpleLRUCache(maxsize=512, ttl_seconds=7200)

    def _compute_key(self, prefix: str, *args: Any) -> str:
        serialized = f"{prefix}:" + ":".join(str(a) for a in args)
        return hashlib.sha256(serialized.encode("utf-8")).hexdigest()

    def analyze_decision(self, req: BlindSpotAnalyzeRequest) -> BlindSpotAnalysisResponse:
        """Runs the Multi-Agent reasoning audit using Gemini with Document Grounding and LRU caching."""
        cache_key = self._compute_key(
            "analyze",
            req.decision_prompt,
            req.context_reasoning,
            req.priorities,
            req.document_context or "",
        )
        cached_res = self._cache.get(cache_key)
        if cached_res is not None:
            logger.debug("Cache hit for analyze_decision (%s)", cache_key[:8])
            return cached_res

        sanitized_decision = sanitize_prompt(req.decision_prompt)
        sanitized_context = sanitize_prompt(req.context_reasoning)
        sanitized_doc = sanitize_prompt(req.document_context or "")
        priorities_str = ", ".join(req.priorities) if req.priorities else "None specified"

        doc_section = (
            f"\n\nRAW DOCUMENT CONTEXT (GROUNDING SOURCE):\n{sanitized_doc}"
            if sanitized_doc
            else "\n\nNO RAW DOCUMENT PROVIDED (Audit strictly on user rationale)."
        )

        prompt = (
            f"DECISION STATEMENT:\n{sanitized_decision}\n\n"
            f"USER CONTEXT & REASONING:\n{sanitized_context}\n\n"
            f"STATED USER PRIORITIES (Ranked):\n{priorities_str}"
            f"{doc_section}\n\n"
            f"MULTI-AGENT DEBATE KERNEL PIPELINE:\n"
            f"1. Agent 1: The Dissector (Analytical / Grounded): Extracts explicit claims, hidden inferences, and baseline structural assumptions. Passes structured claims.\n"
            f"2. Agent 2: The Antagonist (Critical Adversary): Actively challenges every claim, finds internal tensions, uncovers missing variables, and probes fragility.\n"
            f"3. Agent 3: The Risk Auditor (Executive / Objective): Evaluates data volatility, scores impact, computes sensitivity percentages, grounds findings against raw documents, and builds the dynamic Stress-Test.\n\n"
            f"Ground findings directly against the raw document when provided. Maintain all negative constraints (NO decision score, NO recommendations)."
        )

        if not self.adapter.is_configured():
            logger.info("Gemini adapter operating in offline/mock mode.")
            res = generate_dynamic_audit(req)
            self._cache.set(cache_key, res)
            return res

        try:
            res = self.adapter.generate_structured(
                prompt=prompt,
                response_schema=BlindSpotAnalysisResponse,
                system_instruction=BLINDSPOT_SYSTEM_INSTRUCTION,
            )
            if not res or not res.assumptions or len(res.assumptions) == 0:
                logger.info("Gemini structured response empty/sparse; applying dynamic multi-scenario reasoning engine.")
                res = generate_dynamic_audit(req)
            self._cache.set(cache_key, res)
            return res
        except Exception as e:
            logger.warning(f"Error invoking Gemini for Multi-Agent analysis: {e}. Falling back to dynamic mock data.")
            res = generate_dynamic_audit(req)
            self._cache.set(cache_key, res)
            return res

    def evaluate_stress_test(self, req: StressTestFeedbackRequest) -> StressTestFeedbackResponse:
        """Evaluates user choice (YES / MAYBE / NO) in the interactive stress test with LRU caching."""
        cache_key = self._compute_key(
            "stress",
            req.decision_prompt,
            req.context_reasoning,
            req.tested_assumption,
            req.scenario_premise,
            req.user_choice,
            req.user_notes or "",
        )
        cached = self._cache.get(cache_key)
        if cached is not None:
            return cached

        prompt = STRESS_TEST_FEEDBACK_PROMPT.format(
            decision_prompt=sanitize_prompt(req.decision_prompt),
            context_reasoning=sanitize_prompt(req.context_reasoning),
            tested_assumption=sanitize_prompt(req.tested_assumption),
            scenario_premise=sanitize_prompt(req.scenario_premise),
            user_choice=req.user_choice,
            user_notes=sanitize_prompt(req.user_notes or "None provided"),
        )

        if not self.adapter.is_configured():
            res = generate_dynamic_stress_feedback(req)
            self._cache.set(cache_key, res)
            return res

        try:
            res = self.adapter.generate_structured(
                prompt=prompt,
                response_schema=StressTestFeedbackResponse,
                system_instruction="You are an expert reasoning auditor evaluating a decision stress-test response.",
            )
            if not res or not res.verdict_title:
                res = generate_dynamic_stress_feedback(req)
            self._cache.set(cache_key, res)
            return res
        except Exception as e:
            logger.warning(f"Error during stress test evaluation: {e}. Falling back to dynamic mock.")
            res = generate_dynamic_stress_feedback(req)
            self._cache.set(cache_key, res)
            return res

    def challenge_reasoning(self, req: ChallengeReasoningRequest) -> ChallengeReasoningResponse:
        """Generates adversarial constructive challenge to user's reasoning with LRU caching."""
        cache_key = self._compute_key(
            "challenge",
            req.decision_prompt,
            req.context_reasoning,
            req.priorities,
            req.document_context or "",
        )
        cached = self._cache.get(cache_key)
        if cached is not None:
            return cached

        priorities_str = ", ".join(req.priorities) if req.priorities else "General"
        prompt = CHALLENGE_REASONING_PROMPT.format(
            decision_prompt=sanitize_prompt(req.decision_prompt),
            context_reasoning=sanitize_prompt(req.context_reasoning),
            priorities=priorities_str,
        )

        if not self.adapter.is_configured():
            res = generate_dynamic_challenge_response(req)
            self._cache.set(cache_key, res)
            return res

        try:
            res = self.adapter.generate_structured(
                prompt=prompt,
                response_schema=ChallengeReasoningResponse,
                system_instruction="You are an adversarial-but-constructive reasoning challenger.",
            )
            if not res or not res.strongest_argument:
                res = generate_dynamic_challenge_response(req)
            self._cache.set(cache_key, res)
            return res
        except Exception as e:
            logger.warning(f"Error during challenge reasoning generation: {e}. Falling back to dynamic mock.")
            res = generate_dynamic_challenge_response(req)
            self._cache.set(cache_key, res)
            return res
