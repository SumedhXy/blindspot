import logging
from pathlib import Path
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse

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

# 1. Register GZip Compression Middleware (High Efficiency for JSON payloads)
app.add_middleware(GZipMiddleware, minimum_size=500)

# 2. Register OWASP Security Headers Middleware
app.add_middleware(SecurityHeadersMiddleware)

# 3. Register CORS Middleware with explicit origins (fail-closed on wildcard)
cors_origins = [o for o in settings.CORS_ORIGINS if o != "*"] if settings.APP_ENV == "production" else settings.CORS_ORIGINS
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Register Structured Error Handlers
register_error_handlers(app)

# 5. Direct Root Health Endpoint (Requirement Section 9)
app.add_api_route("/health", health_check, methods=["GET"], tags=["Health"])

# 6. Include API v1 Router
app.include_router(router, prefix=settings.API_PREFIX)

# 7. Mount Frontend Static Files for SPA (Production Container)
frontend_dist = Path("frontend/dist")
if frontend_dist.exists() and (frontend_dist / "index.html").exists():
    if (frontend_dist / "assets").exists():
        app.mount("/assets", StaticFiles(directory=frontend_dist / "assets"), name="assets")

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        # Return real JSON 404 for unknown API or docs paths
        if full_path.startswith("api") or full_path.startswith("docs") or full_path.startswith("openapi.json"):
            return JSONResponse(
                status_code=404,
                content={"success": False, "error": f"API route '/{full_path}' not found", "code": "NOT_FOUND"},
            )
        file_path = frontend_dist / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(frontend_dist / "index.html")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
