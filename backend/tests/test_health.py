def test_root_health_check(client):
    """Verifies that GET /health returns 200 with structured health details."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ["healthy", "ok"]
    assert "app_name" in data
    assert "version" in data
    assert "database" in data
    assert "ai_status" in data


def test_api_ping(client):
    """Verifies that GET /api/v1/ping responds correctly."""
    response = client.get("/api/v1/ping")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"] == "pong"
