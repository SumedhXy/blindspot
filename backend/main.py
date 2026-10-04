import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.core.config import settings
from backend.core.errors import register_error_handlers
from backend.core.security import SecurityHeadersMiddleware
from backend.db.session import init_db
from backend.api.routes import router, health_check

# Configure Logging
logging.basicConfig(
    level=logging.INFO if not settings.DEBUG else logging.DEBUG,
    format="%(asctime)s - [%(levelname)s] - %(name)s: %(message)s",
)
logger = logging.getLogger("backend.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle manager for startup and shutdown procedures."""
    logger.info(f"Starting {settings.APP_NAME} in {settings.APP_ENV} mode...")
    init_db()
    logger.info("Database initialized successfully.")
    yield
    logger.info("Shutting down backend services...")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="PromptWars Competition Kit - Production-Quality Reusable Foundation",
    lifespan=lifespan,
    debug=settings.DEBUG,
)

# 1. Register OWASP Security Headers Middleware
app.add_middleware(SecurityHeadersMiddleware)

# 2. Register CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Register Structured Error Handlers
register_error_handlers(app)

# 4. Direct Root Health Endpoint (Requirement Section 9)
app.add_api_route("/health", health_check, methods=["GET"], tags=["Health"])

# 5. Include API v1 Router
app.include_router(router, prefix=settings.API_PREFIX)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
