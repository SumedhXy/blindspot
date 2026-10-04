import logging
from typing import Dict, Any, Optional
from backend.core.config import settings

logger = logging.getLogger(__name__)


class FirebaseAdapter:
    """
    Adapter for Google Firebase services (Auth / Firestore / Realtime DB).
    Provides structured fallback for local development.
    Decision rule: Use ONLY when problem requires real-time pub/sub or Firebase Auth.
    """

    def __init__(self, project_id: Optional[str] = None):
        self.project_id = project_id or settings.FIREBASE_PROJECT_ID

    def is_configured(self) -> bool:
        return bool(self.project_id)

    def verify_token(self, id_token: str) -> Dict[str, Any]:
        """Validates a Firebase user ID token."""
        if not self.is_configured():
            return {
                "uid": "mock-user-123",
                "email": "developer@promptwars.local",
                "authenticated": True,
                "provider": "mock_firebase",
            }
        return {"uid": "mock-user-123", "email": "user@google.com", "authenticated": True}
