"""FastAPI application entrypoint.

Configures app metadata, middleware, CORS, startup/shutdown lifecycle,
and registers all API routers. Follows Google Python Style Guide.
"""

import logging
import logging.config
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse

from app.api.routes import health, predict
from app.core.config import get_settings
from app.services.ml_service import ml_service

# ── Logging Configuration ────────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)
logger = logging.getLogger(__name__)

# ── Settings ─────────────────────────────────────────────────────────────────

settings = get_settings()


# ── Lifespan ─────────────────────────────────────────────────────────────────


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Handles application startup and shutdown lifecycle.

    Loads ML model artifacts on startup so the first request is fast.
    """
    logger.info("Starting %s v%s", settings.app_name, settings.app_version)
    try:
        ml_service.load()
        logger.info("ML model loaded successfully on startup.")
    except Exception as exc:
        logger.error("Failed to load ML model on startup: %s", exc)
        # Application still starts; health check will report degraded status.
    yield
    logger.info("Application shutting down.")


# ── Application Factory ───────────────────────────────────────────────────────


def create_app() -> FastAPI:
    """Creates and configures the FastAPI application instance.

    Returns:
        Configured FastAPI app with middleware and routes registered.
    """
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description=(
            "A production-grade REST API for predicting property prices "
            "in Navi Mumbai using a Gradient Boosting Regressor model "
            "trained on 2,450 real estate listings."
        ),
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
        lifespan=lifespan,
    )

    # ── Middleware ────────────────────────────────────────────────────────────

    app.add_middleware(GZipMiddleware, minimum_size=1000)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_origin_regex=r"https://.*\.vercel\.app",
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization", "X-Request-ID"],
    )

    # ── Routers ───────────────────────────────────────────────────────────────

    prefix = settings.api_v1_prefix

    app.include_router(health.router, prefix=prefix)
    app.include_router(predict.router, prefix=prefix)

    # ── Root redirect ─────────────────────────────────────────────────────────

    @app.get("/", include_in_schema=False)
    async def root() -> JSONResponse:
        """Root endpoint — redirects clients to the API docs."""
        return JSONResponse(
            content={
                "message": f"Welcome to {settings.app_name} API",
                "version": settings.app_version,
                "docs": "/docs",
                "health": f"{prefix}/health",
            }
        )

    # ── Favicon ───────────────────────────────────────────────────────────────

    @app.get("/favicon.ico", include_in_schema=False)
    async def favicon() -> Response:
        """Handles favicon requests — returns 204 No Content to avoid 404 logs."""
        return Response(status_code=204)

    return app


app = create_app()
