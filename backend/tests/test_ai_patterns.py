import base64


def test_ai_pattern_structured_output(client):
    """Tests AI Pattern 1: Structured output schema validation and response envelope."""
    payload = {
        "prompt": "Evaluate system latency and suggest caching optimizations.",
        "schema_type": "general_analysis",
    }
    response = client.post("/api/v1/ai/structured", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "title" in data["data"]
    assert "summary" in data["data"]
    assert isinstance(data["data"]["key_findings"], list)
    assert len(data["data"]["key_findings"]) > 0


def test_ai_pattern_grounded_assistant(client):
    """Tests AI Pattern 2: Grounded reasoning against approved context."""
    payload = {
        "query": "What is the primary theme color?",
        "approved_context": "The primary theme color is set to #CF4500 with secondary #F37338.",
    }
    response = client.post("/api/v1/ai/grounded", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["is_fully_grounded"] is True
    assert "sources_cited" in data["data"]


def test_ai_pattern_multimodal(client):
    """Tests AI Pattern 3: Multimodal image parsing and human gate requirement."""
    # 1x1 transparent PNG base64
    sample_b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    payload = {
        "prompt": "Inspect this UI screenshot snippet.",
        "image_base64": sample_b64,
        "mime_type": "image/png",
    }
    response = client.post("/api/v1/ai/multimodal", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["requires_human_confirmation"] is True
    assert "caption" in data["data"]


def test_ai_pattern_controlled_tool(client):
    """Tests AI Pattern 4: Controlled deterministic tool execution."""
    payload = {
        "tool_name": "calculate_metrics",
        "parameters": {"values": [10, 20, 30, 40]},
    }
    response = client.post("/api/v1/ai/tool", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["result"]["average"] == 25.0
    assert data["data"]["result"]["sum"] == 100.0


def test_ai_pattern_unauthorized_tool_rejected(client):
    """Verifies that unapproved tools (e.g. bash, eval) are strictly rejected with 403."""
    payload = {
        "tool_name": "execute_shell_command",
        "parameters": {"command": "rm -rf /"},
    }
    response = client.post("/api/v1/ai/tool", json=payload)
    assert response.status_code == 403
    data = response.json()
    assert data["success"] is False
    assert data["code"] == "SECURITY_VIOLATION"


def test_agent_bounded_workflow(client):
    """Tests bounded multi-step agent reasoning with safe execution traces."""
    payload = {
        "task_goal": "Formulate a launch readiness report for the hackathon project.",
        "max_steps": 3,
        "auto_execute_safe_tools": True,
    }
    response = client.post("/api/v1/ai/workflow", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["steps_executed"] <= 3
    assert len(data["data"]["trace"]) > 0
