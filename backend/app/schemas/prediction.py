"""Pydantic schemas for prediction request and response payloads.

Defines strict input validation and structured response models.
Follows Google Python Style Guide conventions.
"""

from enum import Enum

from pydantic import BaseModel, Field, field_validator


class NaviMumbaiLocation(str, Enum):
    """Enumeration of supported Navi Mumbai localities."""

    KHARGHAR = "Kharghar"
    VASHI = "Vashi"
    NERUL = "Nerul"
    BELAPUR = "CBD Belapur"
    BELAPUR_LOCAL = "Belapur"
    PANVEL = "Panvel"
    AIROLI = "Airoli"
    GHANSOLI = "Ghansoli"
    KOPAR_KHAIRANE = "Kopar Khairane"
    SEAWOODS = "Seawoods"
    SANPADA = "Sanpada"
    TURBHE = "Turbhe"
    TALOJA = "Taloja"
    ULWE = "Ulwe"
    DRONAGIRI = "Dronagiri"
    KAMOTHE = "Kamothe"
    KALAMBOLI = "Kalamboli"
    NEW_PANVEL = "New Panvel"
    ROADPALI = "Roadpali"
    MANSAROVAR = "Mansarovar"
    SECTOR_19 = "Sector 19"


class PredictionRequest(BaseModel):
    """Schema for house price prediction request.

    Validates all feature inputs before passing to the ML service.
    """

    location: NaviMumbaiLocation = Field(
        ...,
        description="Locality in Navi Mumbai",
        json_schema_extra={"examples": ["Kharghar"]},
    )
    area_sqft: float = Field(
        ...,
        ge=300.0,
        le=10000.0,
        description="Total built-up area in square feet",
        json_schema_extra={"examples": [950.0]},
    )
    bhk: int = Field(
        ...,
        ge=1,
        le=5,
        description="Number of bedrooms (BHK)",
        json_schema_extra={"examples": [2]},
    )
    bathrooms: int = Field(
        ...,
        ge=1,
        le=5,
        description="Number of bathrooms",
        json_schema_extra={"examples": [2]},
    )
    floor: int = Field(
        ...,
        ge=0,
        le=60,
        description="Floor number of the unit (0 = ground)",
        json_schema_extra={"examples": [5]},
    )
    total_floors: int = Field(
        ...,
        ge=1,
        le=60,
        description="Total floors in the building",
        json_schema_extra={"examples": [12]},
    )
    age_of_property: int = Field(
        ...,
        ge=0,
        le=50,
        description="Age of the property in years",
        json_schema_extra={"examples": [3]},
    )
    parking: int = Field(
        ...,
        ge=0,
        le=1,
        description="Parking availability (0 = No, 1 = Yes)",
        json_schema_extra={"examples": [1]},
    )
    lift: int = Field(
        ...,
        ge=0,
        le=1,
        description="Lift/elevator availability (0 = No, 1 = Yes)",
        json_schema_extra={"examples": [1]},
    )

    @field_validator("floor")
    @classmethod
    def floor_must_not_exceed_total(cls, floor: int, info) -> int:
        """Validates that the unit floor does not exceed total floors."""
        total = info.data.get("total_floors")
        if total is not None and floor > total:
            raise ValueError(
                f"Floor ({floor}) cannot exceed total floors ({total})"
            )
        return floor

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "location": "Kharghar",
                    "area_sqft": 950,
                    "bhk": 2,
                    "bathrooms": 2,
                    "floor": 5,
                    "total_floors": 12,
                    "age_of_property": 3,
                    "parking": 1,
                    "lift": 1,
                }
            ]
        }
    }


class FeatureImportanceItem(BaseModel):
    """Represents importance score for a single feature."""

    name: str
    importance: float
    display_name: str


class ModelMetrics(BaseModel):
    """Model performance metrics."""

    r2_score: float
    rmse: float
    mae: float


class PredictionResponse(BaseModel):
    """Schema for house price prediction response."""

    predicted_price: float = Field(..., description="Predicted price in INR")
    price_in_lakhs: float = Field(..., description="Predicted price in Lakhs (INR)")
    price_range_low: float = Field(..., description="Lower bound estimate in INR")
    price_range_high: float = Field(..., description="Upper bound estimate in INR")
    price_per_sqft: float = Field(..., description="Price per square foot in INR")
    confidence_score: float = Field(..., description="Model confidence score (0-1)")
    input_summary: dict = Field(..., description="Echo of validated input features")


class ModelInfoResponse(BaseModel):
    """Schema for model information endpoint."""

    model_name: str
    model_version: str
    task_type: str
    dataset_rows: int
    features: list[str]
    metrics: ModelMetrics
    feature_importance: list[FeatureImportanceItem]


class HealthResponse(BaseModel):
    """Schema for health check endpoint."""

    status: str
    model_loaded: bool
    version: str
    message: str


class LocationsResponse(BaseModel):
    """Schema for available locations endpoint."""

    locations: list[str]
    total: int
