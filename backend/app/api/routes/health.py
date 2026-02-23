"""Health check router.

Exposes a /health endpoint for uptime monitoring and deployment readiness checks.
"""

import logging

from fastapi import APIRouter

from app.schemas.prediction import HealthResponse
from app.services.ml_service import ml_service
from app.core.config import get_settings

logger = logging.getLogger(__name__)

router = APIRouter()
settings = get_settings()


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Health Check",
    description="Returns the API health status and model load state.",
    tags=["System"],
)
async def health_check() -> HealthResponse:
    """Returns API health and ML model status.

    Returns:
        HealthResponse with status indicator and model load state.
    """
    model_loaded = ml_service.is_loaded
    status = "healthy" if model_loaded else "degraded"
    message = (
        "Model loaded and ready for inference."
        if model_loaded
        else "Model artifacts not yet loaded. Try again shortly."
    )

    logger.info("Health check called. Model loaded: %s", model_loaded)

    return HealthResponse(
        status=status,
        model_loaded=model_loaded,
        version=settings.app_version,
        message=message,
    )
