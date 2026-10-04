"""
In-Memory Sliding Window Rate Limiter Middleware and Dependencies.
Protects AI endpoints and expensive compute routes from denial-of-service and quota exhaustion.
"""

import time
from collections import defaultdict
from threading import Lock
from typing import Dict, List
from fastapi import Request, HTTPException, status
from backend.core.config import settings


class SlidingWindowRateLimiter:
    """Thread-safe sliding-window in-memory rate limiter per IP address."""

    def __init__(self, requests_per_minute: int = 60):
        self.rpm = requests_per_minute
        self.window_seconds = 60
        self.hits: Dict[str, List[float]] = defaultdict(list)
        self.lock = Lock()

    def is_allowed(self, client_ip: str) -> bool:
        now = time.time()
        window_start = now - self.window_seconds

        with self.lock:
            # Clean expired timestamps
            self.hits[client_ip] = [t for t in self.hits[client_ip] if t > window_start]

            if len(self.hits[client_ip]) >= self.rpm:
                return False

            self.hits[client_ip].append(now)
            return True

    def reset(self) -> None:
        with self.lock:
            self.hits.clear()


# Default limiter instance
blindspot_limiter = SlidingWindowRateLimiter(requests_per_minute=settings.RATE_LIMIT_PER_MINUTE)


def rate_limit_dependency(request: Request) -> None:
    """FastAPI dependency to rate limit sensitive AI operations."""
    client_ip = request.client.host if request.client else "127.0.0.1"
    # Respect trusted proxy header if available
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        client_ip = forwarded.split(",")[0].strip()

    if not blindspot_limiter.is_allowed(client_ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded. Please wait a moment before running another audit.",
        )
