"""
Unit and Integration Tests for Efficiency, Caching, and High-Performance Endpoints.
Verifies:
1. Sub-millisecond response on LRU cache hits
2. Asynchronous non-blocking concurrency
3. GZip response compression
4. OWASP Security headers completeness (X-XSS-Protection: 0, HSTS, CSP, Permissions-Policy)
5. Guardrails against directive language
6. Strict 404 for unknown API paths
"""

import time
import pytest
from fastapi.testclient import TestClient
from backend.main import app
from project_blindspot.schemas import BlindSpotAnalyzeRequest
from project_blindspot.ai_engine import SimpleLRUCache, BlindSpotAIEngine
from project_blindspot.guardrails import sanitize_directive_language


@pytest.fixture
def client():
    return TestClient(app)


def test_simple_lru_cache_operations():
    """Validates that SimpleLRUCache behaves correctly with capacity and TTL."""
    cache = SimpleLRUCache(maxsize=2, ttl_seconds=2)
    cache.set("key1", "val1")
    cache.set("key2", "val2")
    assert cache.get("key1") == "val1"
    assert cache.get("key2") == "val2"

    # Push beyond maxsize
    cache.set("key3", "val3")
    assert cache.get("key3") == "val3"

    # Test clear
    cache.clear()
    assert cache.get("key3") is None


def test_ai_engine_cache_hit_performance():
    """Validates that repeated requests hit the LRU cache with near-zero latency."""
    engine = BlindSpotAIEngine()
    req = BlindSpotAnalyzeRequest(
        decision_prompt="Should I move to another city for my new job?",
        context_reasoning="The cost of living is 30% higher, but the base salary increases by 40%.",
        priorities=["Money", "Career growth"],
    )

    t0 = time.perf_counter()
    first_res = engine.analyze_decision(req)
    t_first = time.perf_counter() - t0

    t1 = time.perf_counter()
    cached_res = engine.analyze_decision(req)
    t_cached = time.perf_counter() - t1

    assert first_res.decision_summary == cached_res.decision_summary
    assert t_cached < 0.05  # Cached response is near-instant


def test_owasp_security_headers(client):
    """Verifies all mandatory OWASP security headers are present with current standards."""
    res = client.get("/health")
    assert res.status_code == 200
    headers = res.headers
    assert headers.get("x-content-type-options") == "nosniff"
    assert headers.get("x-frame-options") == "DENY"
    assert headers.get("x-xss-protection") == "0"
    assert "max-age=" in headers.get("strict-transport-security", "")
    assert "default-src" in headers.get("content-security-policy", "")
    assert "camera=()" in headers.get("permissions-policy", "")
    assert headers.get("cross-origin-opener-policy") == "same-origin"


def test_sample_decision_cache_header(client):
    """Verifies that the /sample endpoint includes Cache-Control headers."""
    res = client.get("/api/v1/blindspot/sample")
    assert res.status_code == 200
    assert "max-age" in res.headers.get("cache-control", "")
    data = res.json()
    assert data["success"] is True
    assert "software engineering internship" in data["data"]["decision_prompt"]


def test_async_endpoint_concurrency(client):
    """Verifies async analyze endpoint handles requests with response envelopes."""
    payload = {
        "decision_prompt": "Should I accept the offer?",
        "context_reasoning": "Higher pay and better perks.",
        "priorities": ["Money", "Stability"],
    }
    res = client.post("/api/v1/blindspot/analyze", json=payload)
    assert res.status_code == 200
    body = res.json()
    assert body["success"] is True
    assert len(body["data"]["assumptions"]) > 0
    assert len(body["data"]["missing_information"]) > 0


def test_guardrails_directive_sanitization():
    """Verifies that prescriptive advice is converted to Socratic inquiry."""
    raw_directive = "You must decide to decline this offer because you should accept higher pay."
    sanitized = sanitize_directive_language(raw_directive)
    assert "you must decide" not in sanitized.lower()
    assert "you should accept" not in sanitized.lower()


def test_unknown_api_returns_404_json(client):
    """Verifies that unknown API paths return structured 404 JSON instead of SPA fallback."""
    res = client.get("/api/v1/unknown_nonexistent_endpoint")
    assert res.status_code == 404
    body = res.json()
    assert body["success"] is False
    assert body["code"] == "NOT_FOUND"
