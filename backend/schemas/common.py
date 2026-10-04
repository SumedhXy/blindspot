from typing import TypeVar, Generic, Optional, List, Dict, Any
from datetime import datetime, timezone
from pydantic import BaseModel, Field

T = TypeVar("T")


class HealthResponse(BaseModel):
    status: str = "ok"
    app_name: str
    version: str
    database: str
    ai_status: str
    timestamp: datetime


class ResponseEnvelope(BaseModel, Generic[T]):
    success: bool = True
    data: Optional[T] = None
    message: Optional[str] = None
    errors: Optional[List[str]] = None


class ProjectRecordCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    category: Optional[str] = Field(default="general", max_length=100)
    content: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict)


class ProjectRecordResponse(BaseModel):
    id: str
    title: str
    category: str
    content: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)
    created_at: datetime
    updated_at: datetime


# AI Schema Interfaces
class AIStructuredRequest(BaseModel):
    prompt: str = Field(..., min_length=1, description="Raw user prompt or input text")
    schema_type: str = Field(
        default="general_analysis",
        description="Target output schema: general_analysis | action_plan | classification",
    )
    context: Optional[str] = Field(default=None, description="Optional grounding context")


class AnalysisFinding(BaseModel):
    category: str
    severity: str = "info"  # low | medium | high | info
    description: str
    recommendation: Optional[str] = None


class AIStructuredResponse(BaseModel):
    title: str
    summary: str
    score: Optional[float] = None
    key_findings: List[AnalysisFinding] = Field(default_factory=list)
    confidence: float = Field(default=1.0, ge=0.0, le=1.0)
    suggested_actions: List[str] = Field(default_factory=list)


class AIGroundedRequest(BaseModel):
    query: str = Field(..., min_length=1)
    approved_context: str = Field(
        ...,
        min_length=1,
        description="Strictly verified source knowledge the AI must ground on",
    )


class AIGroundedResponse(BaseModel):
    answer: str
    is_fully_grounded: bool
    confidence: float
    sources_cited: List[str] = Field(default_factory=list)
    missing_information_notes: Optional[str] = None


class AIMultimodalRequest(BaseModel):
    prompt: str = Field(..., min_length=1)
    image_base64: str = Field(..., description="Base64 encoded image or document snippet")
    mime_type: str = Field(default="image/png")


class AIMultimodalResponse(BaseModel):
    caption: str
    detected_elements: List[str] = Field(default_factory=list)
    structured_data: Dict[str, Any] = Field(default_factory=dict)
    requires_human_confirmation: bool = True
    proposed_action: Optional[str] = None


class AIToolExecutionRequest(BaseModel):
    tool_name: str = Field(..., description="Whitelisted deterministic tool name")
    parameters: Dict[str, Any] = Field(default_factory=dict)


class AIToolExecutionResponse(BaseModel):
    tool_name: str
    success: bool
    result: Any
    execution_time_ms: float


class ExecutionTraceStep(BaseModel):
    step_number: int
    stage_name: str
    status: str = "completed"
    input_summary: str
    output_summary: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class AgentWorkflowRequest(BaseModel):
    task_goal: str = Field(..., min_length=1)
    max_steps: int = Field(default=5, ge=1, le=10, description="Bounded execution limit")
    auto_execute_safe_tools: bool = False


class AgentWorkflowResponse(BaseModel):
    goal: str
    final_output: str
    steps_executed: int
    trace: List[ExecutionTraceStep]
    status: str
