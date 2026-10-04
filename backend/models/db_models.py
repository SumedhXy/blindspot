import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, JSON, Integer
from backend.db.session import Base


class ProjectRecord(Base):
    """Generic record model for storing application entities."""
    __tablename__ = "records"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False, index=True)
    category = Column(String(100), nullable=True, default="general", index=True)
    content = Column(Text, nullable=True)
    metadata_json = Column(JSON, nullable=True, default=dict)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )


class ExecutionTrace(Base):
    """Stores bounded execution trace steps for observability."""
    __tablename__ = "execution_traces"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String(100), nullable=False, index=True)
    step_number = Column(Integer, nullable=False)
    stage_name = Column(String(100), nullable=False)
    status = Column(String(50), nullable=False, default="completed")
    input_summary = Column(Text, nullable=True)
    output_summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
