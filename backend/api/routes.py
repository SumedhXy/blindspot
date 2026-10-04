from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from backend.core.config import settings
from backend.db.session import get_db, check_db_health
from backend.models.db_models import ProjectRecord
from backend.schemas.common import (
    HealthResponse,
    ResponseEnvelope,
    ProjectRecordCreate,
    ProjectRecordResponse,
    AIStructuredRequest,
    AIStructuredResponse,
    AIGroundedRequest,
    AIGroundedResponse,
    AIMultimodalRequest,
    AIMultimodalResponse,
    AIToolExecutionRequest,
    AIToolExecutionResponse,
    AgentWorkflowRequest,
    AgentWorkflowResponse,
)
from backend.services.ai_service import AIService
from backend.core.errors import AppError
from project_blindspot.router import router as blindspot_router

router = APIRouter()
ai_service = AIService()

# Include BlindSpot Domain Routes
router.include_router(blindspot_router)


# -------------------------------------------------------------
# HEALTH & SYSTEM STATUS
# -------------------------------------------------------------
@router.get("/health", response_model=HealthResponse, tags=["Health"])
def health_check():
    """Returns application health, database connectivity, and AI provider status."""
    db_healthy = check_db_health()
    ai_status = "configured" if ai_service.adapter.is_configured() else "mock_fallback_mode"
    
    return HealthResponse(
        status="healthy" if db_healthy else "degraded",
        app_name=settings.APP_NAME,
        version=settings.VERSION,
        database="connected" if db_healthy else "error",
        ai_status=ai_status,
        timestamp=datetime.now(timezone.utc),
    )


@router.get("/ping", response_model=ResponseEnvelope[str], tags=["Health"])
def ping():
    return ResponseEnvelope(data="pong", message="Service is responsive.")


# -------------------------------------------------------------
# AI PATTERNS & AGENT WORKFLOWS
# -------------------------------------------------------------
@router.post("/ai/structured", response_model=ResponseEnvelope[AIStructuredResponse], tags=["AI Patterns"])
def structured_analysis(req: AIStructuredRequest):
    """Executes AI Pattern 1: Structured JSON generation and Pydantic validation."""
    result = ai_service.generate_structured_analysis(req)
    return ResponseEnvelope(data=result, message="Structured analysis completed successfully.")


@router.post("/ai/grounded", response_model=ResponseEnvelope[AIGroundedResponse], tags=["AI Patterns"])
def grounded_assistant(req: AIGroundedRequest):
    """Executes AI Pattern 2: Strictly grounded reasoning based on approved context."""
    result = ai_service.generate_grounded_answer(req)
    return ResponseEnvelope(data=result, message="Grounded query answered.")


@router.post("/ai/multimodal", response_model=ResponseEnvelope[AIMultimodalResponse], tags=["AI Patterns"])
def multimodal_analysis(req: AIMultimodalRequest):
    """Executes AI Pattern 3: Multimodal image/document parsing with human verification gate."""
    result = ai_service.analyze_multimodal_asset(req)
    return ResponseEnvelope(data=result, message="Multimodal asset parsed.")


@router.post("/ai/tool", response_model=ResponseEnvelope[AIToolExecutionResponse], tags=["AI Patterns"])
def execute_tool(req: AIToolExecutionRequest):
    """Executes AI Pattern 4: Safe, whitelisted deterministic tool execution."""
    result = ai_service.execute_controlled_tool(req)
    return ResponseEnvelope(data=result, message="Controlled tool executed.")


@router.post("/ai/workflow", response_model=ResponseEnvelope[AgentWorkflowResponse], tags=["Agent Kernel"])
def execute_bounded_workflow(req: AgentWorkflowRequest):
    """Executes bounded multi-stage reasoning agent with safe execution traces."""
    result = ai_service.run_bounded_workflow(req)
    return ResponseEnvelope(data=result, message="Bounded agent workflow completed.")


# -------------------------------------------------------------
# GENERIC DATA RECORDS (CRUD)
# -------------------------------------------------------------
@router.get("/records", response_model=ResponseEnvelope[List[ProjectRecordResponse]], tags=["Records"])
def list_records(
    category: Optional[str] = Query(None),
    limit: int = Query(50, le=100),
    db: Session = Depends(get_db),
):
    query = db.query(ProjectRecord)
    if category:
        query = query.filter(ProjectRecord.category == category)
    records = query.order_by(ProjectRecord.created_at.desc()).limit(limit).all()
    
    data = [
        ProjectRecordResponse(
            id=r.id,
            title=r.title,
            category=r.category,
            content=r.content,
            metadata=r.metadata_json or {},
            created_at=r.created_at,
            updated_at=r.updated_at,
        )
        for r in records
    ]
    return ResponseEnvelope(data=data, message=f"Retrieved {len(data)} records.")


@router.post("/records", response_model=ResponseEnvelope[ProjectRecordResponse], status_code=status.HTTP_201_CREATED, tags=["Records"])
def create_record(req: ProjectRecordCreate, db: Session = Depends(get_db)):
    record = ProjectRecord(
        title=req.title,
        category=req.category,
        content=req.content,
        metadata_json=req.metadata or {},
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    data = ProjectRecordResponse(
        id=record.id,
        title=record.title,
        category=record.category,
        content=record.content,
        metadata=record.metadata_json or {},
        created_at=record.created_at,
        updated_at=record.updated_at,
    )
    return ResponseEnvelope(data=data, message="Record created successfully.")


@router.get("/records/{record_id}", response_model=ResponseEnvelope[ProjectRecordResponse], tags=["Records"])
def get_record(record_id: str, db: Session = Depends(get_db)):
    record = db.query(ProjectRecord).filter(ProjectRecord.id == record_id).first()
    if not record:
        raise AppError(message="Record not found", code="NOT_FOUND", status_code=status.HTTP_404_NOT_FOUND)
    
    data = ProjectRecordResponse(
        id=record.id,
        title=record.title,
        category=record.category,
        content=record.content,
        metadata=record.metadata_json or {},
        created_at=record.created_at,
        updated_at=record.updated_at,
    )
    return ResponseEnvelope(data=data, message="Record found.")
