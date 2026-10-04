"""
BlindSpot Schemas & Data Models.
Structured Pydantic v2 schemas for the Multi-Agent AI reasoning audit pipeline,
document grounding layer, stress testing engine, and live agent terminal traces.
"""

from typing import List, Optional, Literal
from pydantic import BaseModel, Field


class BlindSpotAnalyzeRequest(BaseModel):
    """Input payload for submitting a decision for reasoning audit with optional document grounding."""
    decision_prompt: str = Field(
        ...,
        min_length=5,
        max_length=1000,
        description="The core decision question (e.g. 'Should I accept this 6-month internship?')",
        examples=["Should I accept this 6-month internship?"]
    )
    context_reasoning: str = Field(
        ...,
        min_length=10,
        max_length=5000,
        description="The user's context, existing facts, and reasoning for their inclination.",
        examples=["The company is well known. The stipend is ₹25,000. It is 15 km from home. I believe it will give me industry experience."]
    )
    priorities: List[str] = Field(
        default_factory=lambda: ["Career growth", "Learning", "Education", "Money", "Convenience"],
        description="Ranked or selected list of user priorities."
    )
    document_context: Optional[str] = Field(
        None,
        max_length=15000,
        description="Raw document text (e.g. offer letter, job description, syllabus, contract terms) for external grounding.",
    )


# -------------------------------------------------------------
# MULTI-AGENT EXECUTION TRACE
# -------------------------------------------------------------

class AgentTraceStep(BaseModel):
    """Execution step log from an autonomous specialized reasoning agent."""
    agent_id: str = Field(default="agent_reasoner", description="e.g. 'agent_dissector', 'agent_antagonist', 'agent_auditor'")
    agent_name: str = Field(default="Reasoning Agent", description="e.g. 'Agent 1: The Dissector', 'Agent 2: The Antagonist', 'Agent 3: The Risk Auditor'")
    role: str = Field(default="Specialized Cognitive Auditor", description="Agent role description")
    timestamp_offset_ms: int = Field(default=0)
    thought_summary: str = Field(default="Socratic deliberation completed.", description="Internal deliberation / debate excerpt")
    extracted_finding: str = Field(default="Key analytical insight extracted.", description="Concrete output or objection raised by this agent")
    status: Literal["active", "completed", "disputed"] = "completed"


class AgentExecutionTrace(BaseModel):
    """Container for the multi-agent debate loop logs."""
    total_debate_turns: int = 3
    agents_involved: List[str] = Field(
        default_factory=lambda: [
            "Agent 1: The Dissector (Analytical / Grounded)",
            "Agent 2: The Antagonist (The Ruthless Cynic)",
            "Agent 3: The Risk Auditor (Executive / Objective)",
        ]
    )
    steps: List[AgentTraceStep] = Field(default_factory=list)


# -------------------------------------------------------------
# LENS SCHEMAS
# -------------------------------------------------------------

class ClaimItem(BaseModel):
    """An explicit fact or assertion extracted from the user's reasoning."""
    claim: str
    stated_inference: str
    grounded_in_doc: bool = False
    doc_citation: Optional[str] = None


class AssumptionItem(BaseModel):
    """Lens 1: Beliefs taken as true without established proof."""
    id: str = Field(default_factory=lambda: "asmp_1")
    title: str = Field(..., description="Short summary of the assumption")
    explanation: str = Field(..., description="Why this is an unverified assumption")
    impact_level: Literal["HIGH", "MEDIUM", "LOW"] = Field(
        ..., description="Impact on the decision if this assumption proves false"
    )
    sensitivity_score: float = Field(
        ..., ge=0.0, le=1.0, description="Normalized score 0.0 to 1.0 indicating decision sensitivity"
    )
    adversary_challenge: Optional[str] = Field(None, description="The Cynic's sharpest rebuttal")


class MissingInfoItem(BaseModel):
    """Lens 2: Critical unknown variables that materially affect the outcome."""
    id: str = Field(default_factory=lambda: "mis_1")
    item: str = Field(..., description="The missing variable or unknown factor")
    why_it_matters: str = Field(..., description="Why this missing info changes the decision calculation")
    investigative_question: str = Field(..., description="Direct question the user should investigate")
    impact_level: Literal["HIGH", "MEDIUM", "LOW"]


class ReasoningTensionItem(BaseModel):
    """Lens 3: Internal friction between stated priorities and provided rationale."""
    id: str = Field(default_factory=lambda: "tns_1")
    stated_priority: str = Field(..., description="User's high priority (e.g. Career Growth)")
    conflicting_reason: str = Field(..., description="Conflicting reason given (e.g. Near home, high stipend)")
    probing_question: str = Field(..., description="Socratic question highlighting the tension")


class PerspectiveLensItem(BaseModel):
    """Lens 4: Deliberately shifting the viewpoint to reveal hidden dimensions."""
    lens_name: str = Field(..., description="e.g. Academic, Career, Opportunity Cost, Future Self, Employer")
    insight: str = Field(..., description="What emerges when looking through this angle")
    critical_question: str = Field(..., description="Actionable question from this perspective")


class EvidenceGapItem(BaseModel):
    """Lens 5: Distinguishing between verified facts and unproven beliefs with document grounding."""
    claim: str = Field(..., description="The belief or claim")
    current_evidence: str = Field(..., description="What evidence was actually provided by the user or document")
    evidence_to_seek: List[str] = Field(..., description="Concrete proof items the user should verify")
    is_grounded_in_document: bool = False
    document_excerpt: Optional[str] = None


class SensitivityFactor(BaseModel):
    """Ranked factor showing what the decision is most sensitive to."""
    factor_name: str
    impact: Literal["HIGH", "MEDIUM", "LOW"]
    sensitivity_percentage: int = Field(..., ge=0, le=100)
    reasoning: str


class StressTestScenario(BaseModel):
    """The Magic Moment: Counterfactual scenario testing the highest-impact assumption."""
    tested_assumption_id: str
    tested_assumption_title: str
    scenario_premise: str = Field(
        ..., description="Plausible counterfactual scenario (e.g., 70% repetitive maintenance, zero mentorship)"
    )
    prompt_question: str = Field(
        default="If this scenario were true, would it change your inclination?",
        description="The stress test question"
    )
    if_yes_guidance: str = Field(
        ..., description="Audit conclusion if user answers YES (High sensitivity confirmed)"
    )
    if_maybe_guidance: str = Field(
        ..., description="Audit conclusion if user answers MAYBE (Threshold uncertainty to interrogate)"
    )
    if_no_guidance: str = Field(
        ..., description="Audit conclusion if user answers NO (Assumption was not the true driver)"
    )


class BlindSpotAnalysisResponse(BaseModel):
    """Full comprehensive reasoning audit output envelope with multi-agent trace & grounding."""
    decision_summary: str
    document_grounding_active: bool = False
    grounded_document_summary: Optional[str] = None
    agent_trace: AgentExecutionTrace = Field(default_factory=AgentExecutionTrace)
    extracted_claims: List[ClaimItem] = Field(default_factory=list)
    assumptions: List[AssumptionItem] = Field(default_factory=list)
    missing_information: List[MissingInfoItem] = Field(default_factory=list)
    reasoning_tensions: List[ReasoningTensionItem] = Field(default_factory=list)
    alternative_perspectives: List[PerspectiveLensItem] = Field(default_factory=list)
    evidence_gaps: List[EvidenceGapItem] = Field(default_factory=list)
    sensitivity_factors: List[SensitivityFactor] = Field(default_factory=list)
    stress_test: StressTestScenario
    investigation_checklist: List[str] = Field(default_factory=list)


# -------------------------------------------------------------
# INTERACTIVE STRESS-TEST & CHALLENGE PAYLOADS
# -------------------------------------------------------------

class StressTestFeedbackRequest(BaseModel):
    decision_prompt: str
    context_reasoning: str
    tested_assumption: str
    scenario_premise: str
    user_choice: Literal["YES", "MAYBE", "NO"]
    user_notes: Optional[str] = Field(None, max_length=1000)


class StressTestFeedbackResponse(BaseModel):
    user_choice: Literal["YES", "MAYBE", "NO"]
    verdict_title: str
    audit_insight: str
    recommended_interrogation: str
    action_items_to_add: List[str]


class ChallengeReasoningRequest(BaseModel):
    decision_prompt: str
    context_reasoning: str
    priorities: List[str] = Field(default_factory=list)
    document_context: Optional[str] = None


class ChallengeReasoningResponse(BaseModel):
    strongest_argument: str
    strongest_assumption: str
    counter_perspective: str
    evidence_that_strengthens: List[str]
    evidence_that_weakens: List[str]
    critical_investigation_question: str
