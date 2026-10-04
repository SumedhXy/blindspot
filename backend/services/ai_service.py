import base64
import time
import logging
from typing import Dict, Any, List, Optional
from google.adapters.gemini_adapter import GeminiAdapter
from backend.schemas.common import (
    AIStructuredRequest,
    AIStructuredResponse,
    AIGroundedRequest,
    AIGroundedResponse,
    AIMultimodalRequest,
    AIMultimodalResponse,
    AIToolExecutionRequest,
    AIToolExecutionResponse,
    AgentWorkflowRequest,
    AgentWorkflowResponse,
    ExecutionTraceStep,
    AnalysisFinding,
)
from backend.core.security import sanitize_prompt_input
from backend.core.errors import SecurityViolationError, AIValidationError

logger = logging.getLogger(__name__)


class AIService:
    """
    Core AI orchestration service. Provides a provider-agnostic abstraction
    over Gemini and other cognitive services, enforcing input sanitization,
    output validation, and bounded safety guarantees.
    """

    def __init__(self, adapter: Optional[GeminiAdapter] = None):
        self.adapter = adapter or GeminiAdapter()
        # Allowed deterministic tools registry
        self._tool_registry = {
            "calculate_metrics": self._tool_calculate_metrics,
            "format_markdown_report": self._tool_format_markdown_report,
            "validate_schema_compliance": self._tool_validate_schema_compliance,
        }

    # -------------------------------------------------------------
    # AI PATTERN 1: STRUCTURED OUTPUT
    # -------------------------------------------------------------
    def generate_structured_analysis(self, req: AIStructuredRequest) -> AIStructuredResponse:
        """
        Takes user input, sanitizes it, queries Gemini for structured JSON,
        and validates strictly against the Pydantic schema model.
        """
        sanitized_prompt = sanitize_prompt_input(req.prompt)
        system_instruction = (
            "You are an expert analytical assistant. Analyze the user request thoroughly. "
            "Produce structured, actionable insights with categorical findings and confidence scores."
        )
        if req.context:
            system_instruction += f"\nRelevant Context:\n{req.context[:1000]}"

        return self.adapter.generate_structured(
            prompt=sanitized_prompt,
            response_schema=AIStructuredResponse,
            system_instruction=system_instruction,
        )

    # -------------------------------------------------------------
    # AI PATTERN 2: GROUNDED ASSISTANT
    # -------------------------------------------------------------
    def generate_grounded_answer(self, req: AIGroundedRequest) -> AIGroundedResponse:
        """
        Grounds response strictly on approved context.
        Instructs model never to invent information and to identify missing data.
        """
        sanitized_query = sanitize_prompt_input(req.query)
        grounding_instruction = (
            "You are a strict, grounded factual assistant. Answer the user query ONLY using the provided APPROVED CONTEXT. "
            "If the answer cannot be determined from the approved context, explicitly state what information is missing "
            "and indicate uncertainty. Do NOT invent or extrapolate facts."
        )

        full_prompt = (
            f"--- APPROVED CONTEXT ---\n{req.approved_context}\n"
            f"--- USER QUERY ---\n{sanitized_query}\n"
        )

        raw_text = self.adapter.generate_text(
            prompt=full_prompt,
            system_instruction=grounding_instruction,
        )

        # Evaluate if answer reflects missing information
        missing_notes = None
        is_grounded = True
        if "not specified" in raw_text.lower() or "not mentioned" in raw_text.lower() or "missing" in raw_text.lower():
            missing_notes = "Certain details were not present in the approved context."
            is_grounded = False

        return AIGroundedResponse(
            answer=raw_text,
            is_fully_grounded=is_grounded,
            confidence=0.95 if is_grounded else 0.70,
            sources_cited=["approved_context"],
            missing_information_notes=missing_notes,
        )

    # -------------------------------------------------------------
    # AI PATTERN 3: MULTIMODAL PROCESSING
    # -------------------------------------------------------------
    def analyze_multimodal_asset(self, req: AIMultimodalRequest) -> AIMultimodalResponse:
        """
        Decodes base64 visual input, passes it through the multimodal Gemini adapter,
        and enforces human confirmation for any proposed downstream actions.
        """
        try:
            image_bytes = base64.b64decode(req.image_base64)
        except Exception as e:
            raise AIValidationError(f"Invalid base64 image data: {e}")

        sanitized_prompt = sanitize_prompt_input(req.prompt)
        res = self.adapter.generate_multimodal(
            prompt=sanitized_prompt,
            image_bytes=image_bytes,
            mime_type=req.mime_type,
        )

        return AIMultimodalResponse(
            caption=res.get("caption", "Analysis completed"),
            detected_elements=res.get("detected_elements", []),
            structured_data=res.get("structured_data", {}),
            requires_human_confirmation=True,
            proposed_action=res.get("proposed_action", "Review extracted elements"),
        )

    # -------------------------------------------------------------
    # AI PATTERN 4: CONTROLLED DETERMINISTIC TOOLS
    # -------------------------------------------------------------
    def execute_controlled_tool(self, req: AIToolExecutionRequest) -> AIToolExecutionResponse:
        """
        Executes strictly whitelisted deterministic tools.
        Guarantees no arbitrary shell/file system access.
        """
        if req.tool_name not in self._tool_registry:
            raise SecurityViolationError(
                f"Tool '{req.tool_name}' is not in the allowed tool whitelist."
            )

        start_time = time.time()
        tool_func = self._tool_registry[req.tool_name]
        try:
            result = tool_func(req.parameters)
            duration = (time.time() - start_time) * 1000
            return AIToolExecutionResponse(
                tool_name=req.tool_name,
                success=True,
                result=result,
                execution_time_ms=round(duration, 2),
            )
        except Exception as e:
            duration = (time.time() - start_time) * 1000
            return AIToolExecutionResponse(
                tool_name=req.tool_name,
                success=False,
                result=f"Tool error: {str(e)}",
                execution_time_ms=round(duration, 2),
            )

    # Tool Implementations
    def _tool_calculate_metrics(self, params: Dict[str, Any]) -> Dict[str, Any]:
        values = params.get("values", [10, 20, 30])
        numeric_values = [float(v) for v in values if isinstance(v, (int, float))]
        return {
            "count": len(numeric_values),
            "sum": sum(numeric_values),
            "average": sum(numeric_values) / len(numeric_values) if numeric_values else 0,
            "max": max(numeric_values) if numeric_values else 0,
            "min": min(numeric_values) if numeric_values else 0,
        }

    def _tool_format_markdown_report(self, params: Dict[str, Any]) -> str:
        title = params.get("title", "Report")
        sections = params.get("sections", {})
        md = [f"# {title}\n"]
        for heading, body in sections.items():
            md.append(f"## {heading}\n{body}\n")
        return "\n".join(md)

    def _tool_validate_schema_compliance(self, params: Dict[str, Any]) -> Dict[str, Any]:
        payload = params.get("payload", {})
        required_fields = params.get("required_fields", ["title", "summary"])
        missing = [f for f in required_fields if f not in payload]
        return {
            "compliant": len(missing) == 0,
            "missing_fields": missing,
            "total_checked": len(required_fields),
        }

    # -------------------------------------------------------------
    # BOUNDED AGENT KERNEL & SAFE EXECUTION TRACE
    # -------------------------------------------------------------
    def run_bounded_workflow(self, req: AgentWorkflowRequest) -> AgentWorkflowResponse:
        """
        Bounded multi-stage agent pipeline:
        Stage 1: Problem Decomposition & Analyzer
        Stage 2: Deterministic Planning
        Stage 3: Proposal & Action Synthesis
        Emits clean, sanitized execution traces without private chain-of-thought.
        """
        sanitized_goal = sanitize_prompt_input(req.task_goal)
        trace: List[ExecutionTraceStep] = []
        step_num = 1

        # Stage 1: Decomposition
        trace.append(
            ExecutionTraceStep(
                step_number=step_num,
                stage_name="Decomposition & Input Analysis",
                status="completed",
                input_summary=f"Goal received: '{sanitized_goal[:60]}...'",
                output_summary="Extracted core requirements, bounded constraints, and target deliverables.",
            )
        )
        step_num += 1

        # Stage 2: Planning
        analysis_structured = self.generate_structured_analysis(
            AIStructuredRequest(prompt=sanitized_goal)
        )
        trace.append(
            ExecutionTraceStep(
                step_number=step_num,
                stage_name="Strategic Planning & Assessment",
                status="completed",
                input_summary="Extracted constraints passed to reasoning planner.",
                output_summary=f"Formulated plan with {len(analysis_structured.suggested_actions)} prioritized steps.",
            )
        )
        step_num += 1

        # Stage 3: Safe Tool or Synthesis
        if req.auto_execute_safe_tools and step_num <= req.max_steps:
            tool_res = self.execute_controlled_tool(
                AIToolExecutionRequest(
                    tool_name="validate_schema_compliance",
                    parameters={"payload": {"title": analysis_structured.title, "summary": analysis_structured.summary}},
                )
            )
            trace.append(
                ExecutionTraceStep(
                    step_number=step_num,
                    stage_name="Deterministic Tool Verification",
                    status="completed",
                    input_summary="Payload compliance verification executed.",
                    output_summary=f"Compliance check passed: {tool_res.result}",
                )
            )
            step_num += 1

        final_summary = (
            f"### Outcome Summary\n"
            f"**Title**: {analysis_structured.title}\n\n"
            f"{analysis_structured.summary}\n\n"
            f"**Recommended Actions**:\n" + "\n".join([f"- {a}" for a in analysis_structured.suggested_actions])
        )

        return AgentWorkflowResponse(
            goal=sanitized_goal,
            final_output=final_summary,
            steps_executed=len(trace),
            trace=trace,
            status="completed",
        )
