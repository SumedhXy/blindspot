from typing import Any, Optional, Dict
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel


class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    code: str
    details: Optional[Any] = None


class AppError(Exception):
    def __init__(
        self,
        message: str,
        code: str = "BAD_REQUEST",
        status_code: int = status.HTTP_400_BAD_REQUEST,
        details: Optional[Any] = None,
    ):
        super().__init__(message)
        self.message = message
        self.code = code
        self.status_code = status_code
        self.details = details


class AIProviderError(AppError):
    def __init__(self, message: str, details: Optional[Any] = None):
        super().__init__(
            message=message,
            code="AI_PROVIDER_ERROR",
            status_code=status.HTTP_502_BAD_GATEWAY,
            details=details,
        )


class AIValidationError(AppError):
    def __init__(self, message: str, details: Optional[Any] = None):
        super().__init__(
            message=message,
            code="AI_OUTPUT_VALIDATION_ERROR",
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            details=details,
        )


class SecurityViolationError(AppError):
    def __init__(self, message: str, details: Optional[Any] = None):
        super().__init__(
            message=message,
            code="SECURITY_VIOLATION",
            status_code=status.HTTP_403_FORBIDDEN,
            details=details,
        )


def register_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(AppError)
    async def app_error_handler(request: Request, exc: AppError):
        return JSONResponse(
            status_code=exc.status_code,
            content=ErrorResponse(
                success=False,
                error=exc.message,
                code=exc.code,
                details=exc.details,
            ).model_dump(),
        )

    @app.exception_handler(RequestValidationError)
    async def validation_error_handler(request: Request, exc: RequestValidationError):
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=ErrorResponse(
                success=False,
                error="Request input validation failed",
                code="INPUT_VALIDATION_ERROR",
                details=exc.errors(),
            ).model_dump(),
        )

    @app.exception_handler(Exception)
    async def generic_error_handler(request: Request, exc: Exception):
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=ErrorResponse(
                success=False,
                error="Internal server error occurred",
                code="INTERNAL_SERVER_ERROR",
                details=str(exc) if app.debug else None,
            ).model_dump(),
        )
