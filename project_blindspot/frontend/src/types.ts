/**
 * TypeScript Interfaces for BlindSpot Multi-Agent Reasoning-Audit Frontend.
 * Matches backend Pydantic schemas in project_blindspot/schemas.py.
 */

export interface PriorityItem {
  id: string;
  name: string;
}

export interface BlindSpotAnalyzeRequest {
  decision_prompt: string;
  context_reasoning: string;
  priorities: string[];
  document_context?: string;
}

export interface AgentTraceStep {
  agent_id: string;
  agent_name: string;
  role: string;
  timestamp_offset_ms: number;
  thought_summary: string;
  extracted_finding: string;
  status: "active" | "completed" | "disputed";
}

export interface AgentExecutionTrace {
  total_debate_turns: number;
  agents_involved: string[];
  steps: AgentTraceStep[];
}

export interface ClaimItem {
  claim: string;
  stated_inference: string;
  grounded_in_doc?: boolean;
  doc_citation?: string;
}

export interface AssumptionItem {
  id: string;
  title: string;
  explanation: string;
  impact_level: "HIGH" | "MEDIUM" | "LOW";
  sensitivity_score: number;
  adversary_challenge?: string;
}

export interface MissingInfoItem {
  id: string;
  item: string;
  why_it_matters: string;
  investigative_question: string;
  impact_level: "HIGH" | "MEDIUM" | "LOW";
}

export interface ReasoningTensionItem {
  id: string;
  stated_priority: string;
  conflicting_reason: string;
  probing_question: string;
}

export interface PerspectiveLensItem {
  lens_name: string;
  insight: string;
  critical_question: string;
}

export interface EvidenceGapItem {
  claim: string;
  current_evidence: string;
  evidence_to_seek: string[];
  is_grounded_in_document?: boolean;
  document_excerpt?: string;
}

export interface SensitivityFactor {
  factor_name: string;
  impact: "HIGH" | "MEDIUM" | "LOW";
  sensitivity_percentage: number;
  reasoning: string;
}

export interface StressTestScenario {
  tested_assumption_id: string;
  tested_assumption_title: string;
  scenario_premise: string;
  prompt_question: string;
  if_yes_guidance: string;
  if_maybe_guidance: string;
  if_no_guidance: string;
}

export interface BlindSpotAnalysisResponse {
  decision_summary: string;
  document_grounding_active: boolean;
  grounded_document_summary?: string;
  agent_trace: AgentExecutionTrace;
  extracted_claims: ClaimItem[];
  assumptions: AssumptionItem[];
  missing_information: MissingInfoItem[];
  reasoning_tensions: ReasoningTensionItem[];
  alternative_perspectives: PerspectiveLensItem[];
  evidence_gaps: EvidenceGapItem[];
  sensitivity_factors: SensitivityFactor[];
  stress_test: StressTestScenario;
  investigation_checklist: string[];
}

export interface StressTestFeedbackRequest {
  decision_prompt: string;
  context_reasoning: string;
  tested_assumption: string;
  scenario_premise: string;
  user_choice: "YES" | "MAYBE" | "NO";
  user_notes?: string;
}

export interface StressTestFeedbackResponse {
  user_choice: "YES" | "MAYBE" | "NO";
  verdict_title: string;
  audit_insight: string;
  recommended_interrogation: string;
  action_items_to_add: string[];
}

export interface ChallengeReasoningRequest {
  decision_prompt: string;
  context_reasoning: string;
  priorities: string[];
  document_context?: string;
}

export interface ChallengeReasoningResponse {
  strongest_argument: string;
  strongest_assumption: string;
  counter_perspective: string;
  evidence_that_strengthens: string[];
  evidence_that_weakens: string[];
  critical_investigation_question: string;
}
