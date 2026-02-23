"""Prediction and model-info router.

Exposes endpoints for house price prediction, location listing,
and model metadata. All routes are versioned under /api/v1.
"""

import logging

from fastapi import APIRouter, HTTPException, status

from app.schemas.prediction import (
    LocationsResponse,
    ModelInfoResponse,
    NaviMumbaiLocation,
    PredictionRequest,
    PredictionResponse,
)
from app.services.ml_service import ml_service

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post(
    "/predict",
    response_model=PredictionResponse,
    status_code=status.HTTP_200_OK,
    summary="Predict House Price",
    description=(
        "Accepts property features and returns an estimated market price "
        "in INR for a property in Navi Mumbai."
    ),
    tags=["Prediction"],
)
async def predict_price(request: PredictionRequest) -> PredictionResponse:
    """Predicts property price based on provided features.

    Args:
        request: Validated prediction request containing property attributes.

    Returns:
        PredictionResponse with price estimate and confidence interval.

    Raises:
        HTTPException 503: If the ML model is not loaded.
        HTTPException 422: Automatically raised by FastAPI for invalid inputs.
        HTTPException 500: For unexpected inference errors.
    """
    if not ml_service.is_loaded:
        logger.error("Prediction attempted but model is not loaded.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="ML model is not ready. Please try again in a moment.",
        )

    try:
        logger.info(
            "Prediction request: location=%s area=%.1f bhk=%d",
            request.location.value,
            request.area_sqft,
            request.bhk,
        )
        result = ml_service.predict(request)
        logger.info("Prediction result: ₹%.0f", result.predicted_price)
        return result
    except ValueError as exc:
        logger.warning("Invalid prediction input: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc
    except Exception as exc:
        logger.exception("Unexpected error during prediction: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during prediction. Please try again.",
        ) from exc


@router.get(
    "/locations",
    response_model=LocationsResponse,
    summary="List Supported Locations",
    description="Returns all Navi Mumbai localities supported by the model.",
    tags=["Metadata"],
)
async def get_locations() -> LocationsResponse:
    """Returns the list of valid location choices for prediction inputs.

    Returns:
        LocationsResponse with sorted list of location strings.
    """
    if ml_service.is_loaded:
        # Use actual classes from the trained label encoder
        locations = ml_service.get_known_locations()
        # Capitalize for display
        locations = [loc.title() if loc != "cbd belapur" else "CBD Belapur" for loc in locations]
    else:
        # Fallback to Enum values if model not loaded
        locations = [loc.value for loc in NaviMumbaiLocation]
    
    return LocationsResponse(locations=sorted(locations), total=len(locations))


@router.get(
    "/model-info",
    response_model=ModelInfoResponse,
    summary="Model Information",
    description="Returns model metadata, performance metrics, and feature importance.",
    tags=["Metadata"],
)
async def get_model_info() -> ModelInfoResponse:
    """Returns information about the trained ML model.

    Returns:
        ModelInfoResponse containing metrics and feature importance scores.

    Raises:
        HTTPException 503: If the model is not loaded.
    """
    if not ml_service.is_loaded:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Model not loaded.",
        )
    return ml_service.get_model_info()
