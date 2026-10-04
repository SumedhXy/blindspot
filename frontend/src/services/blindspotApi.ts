/**
 * BlindSpot API Client Service.
 * Connects frontend to the FastAPI /api/v1/blindspot endpoints.
 */

import type {
  BlindSpotAnalyzeRequest,
  BlindSpotAnalysisResponse,
  StressTestFeedbackRequest,
  StressTestFeedbackResponse,
  ChallengeReasoningRequest,
  ChallengeReasoningResponse,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const BLINDSPOT_API = `${API_BASE_URL}/api/v1/blindspot`;

interface ResponseEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

function extractErrorMessage(errorData: any, fallback: string): string {
  if (typeof errorData?.error === "string" && errorData.error) return errorData.error;
  if (typeof errorData?.message === "string" && errorData.message) return errorData.message;
  if (typeof errorData?.detail === "string" && errorData.detail) return errorData.detail;
  if (Array.isArray(errorData?.detail) && errorData.detail.length > 0) {
    return errorData.detail.map((d: any) => d.msg || d.message || JSON.stringify(d)).join(", ");
  }
  return fallback;
}

export async function fetchSampleDecision(): Promise<BlindSpotAnalyzeRequest> {
  const res = await fetch(`${BLINDSPOT_API}/sample`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(extractErrorMessage(errorData, `Failed to load sample decision (${res.status})`));
  }
  const envelope: ResponseEnvelope<BlindSpotAnalyzeRequest> = await res.json();
  return envelope.data;
}

export async function analyzeDecision(
  payload: BlindSpotAnalyzeRequest
): Promise<BlindSpotAnalysisResponse> {
  const res = await fetch(`${BLINDSPOT_API}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(extractErrorMessage(errorData, `Analysis failed (${res.status})`));
  }

  const envelope: ResponseEnvelope<BlindSpotAnalysisResponse> = await res.json();
  return envelope.data;
}

export async function submitStressTestFeedback(
  payload: StressTestFeedbackRequest
): Promise<StressTestFeedbackResponse> {
  const res = await fetch(`${BLINDSPOT_API}/stress-test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(extractErrorMessage(errorData, `Stress test submission failed (${res.status})`));
  }

  const envelope: ResponseEnvelope<StressTestFeedbackResponse> = await res.json();
  return envelope.data;
}

export async function challengeReasoning(
  payload: ChallengeReasoningRequest
): Promise<ChallengeReasoningResponse> {
  const res = await fetch(`${BLINDSPOT_API}/challenge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(extractErrorMessage(errorData, `Challenge reasoning failed (${res.status})`));
  }

  const envelope: ResponseEnvelope<ChallengeReasoningResponse> = await res.json();
  return envelope.data;
}
