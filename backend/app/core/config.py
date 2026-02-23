from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # API configuration
    app_name: str = "Navi Mumbai House Price Predictor"
    app_version: str = "1.0.0"
    api_v1_prefix: str = "/api/v1"
    debug: bool = False

    # CORS configuration
    allowed_origins: list[str] = [
        "http://localhost:3000",
        "https://*.vercel.app",
        "https://navimumbai-house-price.vercel.app",
    ]

    # Model paths (relative to backend root)
    model_dir: Path = Path("models")
    model_path: Path = Path("models/model.pkl")
    scaler_path: Path = Path("models/scaler.pkl")
    label_encoder_path: Path = Path("models/label_encoder.pkl")

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
    }


@lru_cache()
def get_settings() -> Settings:
    """Returns a cached instance of the application settings."""
    return Settings()
