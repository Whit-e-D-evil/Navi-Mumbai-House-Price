from functools import lru_cache
from pathlib import Path
from typing import Any, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # API configuration
    app_name: str = "Navi Mumbai House Price Predictor"
    app_version: str = "1.0.0"
    api_v1_prefix: str = "/api/v1"
    debug: bool = False

    # CORS configuration
    allowed_origins: Union[list[str], str] = [
        "http://localhost:3000",
        "https://*.vercel.app",
        "https://navimumbai-house-price.vercel.app",
    ]

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Any) -> list[str]:
        """Parses comma-separated string into a list of origins."""
        if isinstance(v, str):
            if v.startswith("[") and v.endswith("]"):
                import json
                try:
                    return json.loads(v)
                except:
                    pass
            return [i.strip() for i in v.split(",") if i.strip()]
        return v

    # Model paths (absolute, relative to the backend root)
    model_dir: Path = Path(__file__).parent.parent.parent / "models"
    model_path: Path = Path(__file__).parent.parent.parent / "models/model.pkl"
    scaler_path: Path = Path(__file__).parent.parent.parent / "models/scaler.pkl"
    label_encoder_path: Path = Path(__file__).parent.parent.parent / "models/label_encoder.pkl"

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
    }


@lru_cache()
def get_settings() -> Settings:
    """Returns a cached instance of the application settings."""
    return Settings()
