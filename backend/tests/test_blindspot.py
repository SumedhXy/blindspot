"""
BlindSpot Automated Test Suite.
Tests 6-lens reasoning audit, negative constraints (no scores, no recommendations),
interactive stress-testing responses, challenge reasoning, multi-agent execution trace,
document grounding layer, and input validation.
"""

import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_get_sample_decision():
    """Verify sample benchmark decision is returned successfully."""
    response = client.get("/api/v1/blindspot/sample")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "internship" in data["data"]["decision_prompt"].lower()
    assert len(data["data"]["priorities"]) >= 3


def test_analyze_decision_happy_path_and_multi_agent_trace():
    """Verify 6-lens structured reasoning audit and multi-agent debate logs."""
    payload = {
        "decision_prompt": "Should I accept this 6-month internship?",
        "context_reasoning": "The company is reputed. The stipend is 25000. It is 15 km from home. It gives industry experience.",
        "priorities": ["Career growth", "Learning", "Education", "Money"],
    }
    response = client.post("/api/v1/blindspot/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    audit = data["data"]

    # 1. Check Multi-Agent Execution Trace
    assert "agent_trace" in audit
    assert len(audit["agent_trace"]["steps"]) >= 3
    assert any("dissector" in s["agent_id"].lower() or "cynic" in s["agent_id"].lower() for s in audit["agent_trace"]["steps"])
    assert any("antagonist" in s["agent_id"].lower() or "cynic" in s["agent_id"].lower() for s in audit["agent_trace"]["steps"])
    assert any("auditor" in s["agent_id"].lower() for s in audit["agent_trace"]["steps"])

    # 2. Check extracted claims & assumptions
    assert len(audit["assumptions"]) >= 1
    assert all(a["impact_level"] in ["HIGH", "MEDIUM", "LOW"] for a in audit["assumptions"])
    assert all(0.0 <= a["sensitivity_score"] <= 1.0 for a in audit["assumptions"])

    # 3. Check missing information & tensions
    assert len(audit["missing_information"]) >= 1
    assert len(audit["reasoning_tensions"]) >= 1

    # 4. Check perspective lenses
    assert len(audit["alternative_perspectives"]) >= 2

    # 5. Check evidence gaps & sensitivity factors
    assert len(audit["evidence_gaps"]) >= 1
    assert len(audit["sensitivity_factors"]) >= 1

    # 6. Check stress test scenario (Magic Moment)
    assert "scenario_premise" in audit["stress_test"]
    assert "if_yes_guidance" in audit["stress_test"]

    # 7. Check investigation checklist
    assert len(audit["investigation_checklist"]) >= 3


def test_document_grounding_active():
    """Verify raw document text is cross-referenced and citations are extracted."""
    payload = {
        "decision_prompt": "Should I sign this offer letter?",
        "context_reasoning": "Offer letter says 25k stipend and software intern.",
        "priorities": ["Career growth", "Money"],
        "document_context": "Clause 1.1: Position: Engineering Intern (Frontend & QA Support). Clause 2.4: Responsibilities: Assist engineering squads in bug triage and internal backlog maintenance.",
    }
    response = client.post("/api/v1/blindspot/analyze", json=payload)
    assert response.status_code == 200
    audit = response.json()["data"]
    assert audit["document_grounding_active"] is True
    assert "Document Grounding Active" in audit["grounded_document_summary"]


def test_negative_constraints_preserved():
    """
    Ensure BlindSpot strictly adheres to negative constraints:
    No decision score (e.g. 82/100) and no explicit advice/recommendation.
    """
    payload = {
        "decision_prompt": "Should I drop out of college to join an early stage startup?",
        "context_reasoning": "The founders are passionate. I want to build fast. College feels slow.",
        "priorities": ["Learning", "Speed", "Career"],
    }
    response = client.post("/api/v1/blindspot/analyze", json=payload)
    assert response.status_code == 200
    res_str = response.text

    # Must NOT contain decision quality scores or advice commands
    assert "decision score" not in res_str.lower()
    assert "you should drop out" not in res_str.lower()
    assert "you should not drop out" not in res_str.lower()


def test_analyze_decision_validation_error():
    """Verify short or invalid payloads are rejected with 422."""
    payload = {
        "decision_prompt": "No",  # Too short (< 5 chars)
        "context_reasoning": "Short",  # Too short (< 10 chars)
    }
    response = client.post("/api/v1/blindspot/analyze", json=payload)
    assert response.status_code == 422


def test_stress_test_feedback_choices():
    """Verify interactive stress-test interrogation for YES, MAYBE, and NO."""
    base_payload = {
        "decision_prompt": "Should I accept this 6-month internship?",
        "context_reasoning": "The company is reputed, stipend is ₹25,000.",
        "tested_assumption": "Company Reputation = High Learning Quality",
        "scenario_premise": "75% of time on manual data entry with zero mentorship.",
    }

    # Choice: YES
    res_yes = client.post("/api/v1/blindspot/stress-test", json={**base_payload, "user_choice": "YES"})
    assert res_yes.status_code == 200
    assert res_yes.json()["data"]["user_choice"] == "YES"
    assert "confirmed" in res_yes.json()["data"]["verdict_title"].lower()

    # Choice: MAYBE
    res_maybe = client.post("/api/v1/blindspot/stress-test", json={**base_payload, "user_choice": "MAYBE"})
    assert res_maybe.status_code == 200
    assert res_maybe.json()["data"]["user_choice"] == "MAYBE"

    # Choice: NO
    res_no = client.post("/api/v1/blindspot/stress-test", json={**base_payload, "user_choice": "NO"})
    assert res_no.status_code == 200
    assert res_no.json()["data"]["user_choice"] == "NO"


def test_challenge_reasoning():
    """Verify adversarial constructive breakdown."""
    payload = {
        "decision_prompt": "Should I accept this internship?",
        "context_reasoning": "Well known brand, ₹25k stipend, near home.",
        "priorities": ["Career growth", "Learning"],
    }
    response = client.post("/api/v1/blindspot/challenge", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "strongest_argument" in data["data"]
    assert "counter_perspective" in data["data"]
    assert len(data["data"]["evidence_that_strengthens"]) >= 1
    assert len(data["data"]["evidence_that_weakens"]) >= 1
