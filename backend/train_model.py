"""Model training and artifact generation script.

Loads the real Navi Mumbai real estate CSV, trains a Gradient Boosting
Regressor, and saves production-ready artifacts:
  - models/model.pkl           — trained GBR model
  - models/scaler.pkl          — StandardScaler for all features
  - models/label_encoder.pkl   — LabelEncoder for the location column

Run this before starting the FastAPI server (or via render.yaml build command):

    pip install -r requirements.txt
    python train_model.py

Falls back to synthetic data generation if the CSV is not found, enabling
Render cloud deployments without needing to commit the dataset.

Google Python Style Guide compliant.
"""

import logging
import pickle
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)
logger = logging.getLogger(__name__)

# ── Configuration ─────────────────────────────────────────────────────────────

RANDOM_STATE = 42
MODEL_DIR = Path("models")
MODEL_PATH = MODEL_DIR / "model.pkl"
SCALER_PATH = MODEL_DIR / "scaler.pkl"
LABEL_ENCODER_PATH = MODEL_DIR / "label_encoder.pkl"
CSV_FILENAME = "navi_mumbai_real_estate_uncleaned_2500_cleaned.csv"

FEATURES = [
    "location",
    "area_sqft",
    "bhk",
    "bathrooms",
    "floor",
    "total_floors",
    "age_of_property",
    "parking",
    "lift",
]
TARGET = "actual_price"

# ── Locations for synthetic fallback ──────────────────────────────────────────

LOCATIONS = [
    "Kharghar", "Vashi", "Nerul", "CBD Belapur", "Panvel", "Airoli",
    "Ghansoli", "Kopar Khairane", "Seawoods", "Sanpada", "Turbhe",
    "Taloja", "Ulwe", "Dronagiri", "Kamothe", "Kalamboli",
    "New Panvel", "Roadpali", "Mansarovar", "Sector 19",
]

LOCATION_BASE_PRICE = {
    "Vashi": 22000, "Nerul": 20000, "CBD Belapur": 19000, "Sanpada": 21000,
    "Seawoods": 18500, "Kopar Khairane": 17500, "Ghansoli": 16500,
    "Airoli": 16000, "Turbhe": 15500, "Kharghar": 14500, "Panvel": 9000,
    "New Panvel": 8500, "Kamothe": 8000, "Kalamboli": 7500, "Taloja": 7000,
    "Roadpali": 7200, "Mansarovar": 7800, "Sector 19": 13000,
    "Ulwe": 8200, "Dronagiri": 6500,
}


def find_csv() -> Path | None:
    """Searches common locations for the training CSV.

    Returns:
        Path to CSV if found, else None.
    """
    search_paths = [
        Path(CSV_FILENAME),            # current dir (backend/)
        Path("..") / CSV_FILENAME,     # parent dir (project root)
        Path("data") / CSV_FILENAME,
    ]
    for path in search_paths:
        if path.exists():
            logger.info("Found CSV at: %s", path.resolve())
            return path
    return None


def load_real_data(csv_path: Path) -> pd.DataFrame:
    """Loads and validates the real estate CSV dataset.

    Args:
        csv_path: Path to the cleaned CSV file.

    Returns:
        DataFrame with required columns present.

    Raises:
        ValueError: If required columns are missing.
    """
    df = pd.read_csv(csv_path)
    logger.info("Loaded CSV: %d rows, %d columns", len(df), len(df.columns))

    # Normalise column names
    df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]

    required = FEATURES + [TARGET]
    missing = [c for c in required if c not in df.columns]
    if missing:
        raise ValueError(f"CSV is missing required columns: {missing}. Found: {list(df.columns)}")

    df = df[required].dropna()
    logger.info("After dropping NaN: %d rows", len(df))
    return df


def generate_synthetic_data(n_samples: int = 2500) -> pd.DataFrame:
    """Generates realistic synthetic Navi Mumbai data as a fallback.

    Args:
        n_samples: Number of synthetic property records.

    Returns:
        DataFrame matching the real dataset schema.
    """
    logger.warning("CSV not found — generating %d synthetic samples as fallback.", n_samples)
    rng = np.random.default_rng(RANDOM_STATE)

    locations = rng.choice(LOCATIONS, size=n_samples)
    bhk = rng.choice([1, 2, 3, 4, 5], size=n_samples, p=[0.10, 0.40, 0.35, 0.12, 0.03])
    bathrooms = np.clip(bhk + rng.integers(-1, 2, size=n_samples), 1, 5)
    area_sqft = (bhk * rng.uniform(300, 500, n_samples) + rng.uniform(-100, 200, n_samples)).clip(300, 10000)
    total_floors = rng.integers(2, 40, size=n_samples)
    floor = np.array([rng.integers(0, tf + 1) for tf in total_floors])
    age = rng.integers(0, 30, size=n_samples)
    parking = rng.choice([0, 1], size=n_samples, p=[0.25, 0.75])
    lift = np.where(total_floors > 4, 1, rng.choice([0, 1], size=n_samples, p=[0.4, 0.6]))
    base = np.array([LOCATION_BASE_PRICE[loc] for loc in locations])
    prices = (
        base * area_sqft + bhk * 50_000 + bathrooms * 30_000
        + (floor / np.maximum(total_floors, 1)) * 200_000
        - age * 15_000 + parking * 80_000 + lift * 50_000
        + rng.normal(0, 200_000, n_samples)
    ).clip(500_000, 50_000_000)

    return pd.DataFrame({
        "location": locations, "area_sqft": area_sqft.round(1), "bhk": bhk,
        "bathrooms": bathrooms, "floor": floor, "total_floors": total_floors,
        "age_of_property": age, "parking": parking, "lift": lift,
        TARGET: prices.round(0).astype(int),
    })


def train_and_save() -> None:
    """Orchestrates end-to-end model training and artifact persistence.

    Steps:
        1. Load real CSV or fall back to synthetic data.
        2. Label-encode the location column.
        3. Scale all features with StandardScaler.
        4. Train GradientBoostingRegressor.
        5. Evaluate on held-out test set and log metrics.
        6. Save model.pkl, scaler.pkl, label_encoder.pkl.
    """
    MODEL_DIR.mkdir(parents=True, exist_ok=True)

    # Step 1 — Load data
    csv_path = find_csv()
    df = load_real_data(csv_path) if csv_path else generate_synthetic_data()

    X = df[FEATURES].copy()
    y = df[TARGET].copy()

    # Step 2 — Encode location
    label_encoder = LabelEncoder()
    X["location"] = label_encoder.fit_transform(X["location"].astype(str))
    logger.info("Location labels: %s", list(label_encoder.classes_))

    # Step 3 — Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Step 4 — Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.20, random_state=RANDOM_STATE
    )

    # Step 5 — Train GBR
    logger.info("Training GradientBoostingRegressor (n_estimators=200)...")
    model = GradientBoostingRegressor(
        n_estimators=200,
        learning_rate=0.05,
        max_depth=5,
        subsample=0.8,
        random_state=RANDOM_STATE,
    )
    model.fit(X_train, y_train)

    r2 = model.score(X_test, y_test)
    logger.info("Test R² score: %.4f", r2)

    # Step 6 — Persist
    with open(MODEL_PATH, "wb") as f:
        pickle.dump(model, f)
    logger.info("Saved model → %s", MODEL_PATH)

    with open(SCALER_PATH, "wb") as f:
        pickle.dump(scaler, f)
    logger.info("Saved scaler → %s", SCALER_PATH)

    with open(LABEL_ENCODER_PATH, "wb") as f:
        pickle.dump(label_encoder, f)
    logger.info("Saved label encoder → %s", LABEL_ENCODER_PATH)

    logger.info(
        "✅ Training complete. R²=%.4f | Artifacts in %s/",
        r2,
        MODEL_DIR,
    )


if __name__ == "__main__":
    train_and_save()
