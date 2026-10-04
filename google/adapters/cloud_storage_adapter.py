import logging
import base64
from typing import Dict, Any, Optional
from backend.core.config import settings

logger = logging.getLogger(__name__)


class GoogleCloudStorageAdapter:
    """
    Adapter for Google Cloud Storage (GCS).
    Stores and retrieves assets, file uploads, and multimodal media.
    Decision rule: Use ONLY when persistent remote asset storage is required by the problem.
    """

    def __init__(self, project: Optional[str] = None):
        self.project = project or settings.GOOGLE_CLOUD_PROJECT

    def is_configured(self) -> bool:
        return bool(self.project)

    def upload_bytes(
        self,
        file_bytes: bytes,
        filename: str,
        content_type: str = "application/octet-stream",
    ) -> Dict[str, Any]:
        """Simulates or performs upload to Cloud Storage bucket."""
        return {
            "filename": filename,
            "size_bytes": len(file_bytes),
            "content_type": content_type,
            "public_url": f"https://storage.googleapis.com/promptwars-demo-bucket/{filename}",
            "status": "UPLOADED",
        }
