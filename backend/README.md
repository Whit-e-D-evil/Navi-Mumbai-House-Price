# 🏠 Navi Mumbai House Price Predictor — Backend

FastAPI-based REST API serving a Gradient Boosting Regressor model for predicting property prices in Navi Mumbai.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | FastAPI 0.115 |
| ML Model | scikit-learn GradientBoostingRegressor |
| Validation | Pydantic v2 |
| Runtime | Python 3.11 |
| Deployment | Render |

## Model Performance

| Metric | Value |
|--------|-------|
| R² Score | **0.8385** |
| RMSE | ₹38.8 Lakhs |
| MAE | ₹23.9 Lakhs |
| Training samples | 2,450 |

## Local Setup

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Train the model (saves to models/)
python train_model.py

# 3. Start the server
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/health` | Health check |
| `POST` | `/api/v1/predict` | Predict house price |
| `GET` | `/api/v1/locations` | List supported locations |
| `GET` | `/api/v1/model-info` | Model metadata & metrics |

### Prediction Request Example

```json
POST /api/v1/predict
{
  "location": "Kharghar",
  "area_sqft": 950,
  "bhk": 2,
  "bathrooms": 2,
  "floor": 5,
  "total_floors": 12,
  "age_of_property": 3,
  "parking": 1,
  "lift": 1
}
```

### Prediction Response Example

```json
{
  "predicted_price": 8750000.0,
  "price_in_lakhs": 87.5,
  "price_range_low": 8050000.0,
  "price_range_high": 9450000.0,
  "price_per_sqft": 9210.52,
  "confidence_score": 0.84,
  "input_summary": { ... }
}
```

## Deployment on Render

1. Push code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Connect your repository
4. Render auto-detects `render.yaml` — no manual configuration needed
5. Set environment variables in Render dashboard if needed

> The `build` command in `render.yaml` automatically runs `train_model.py` before starting the server.

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app factory
│   ├── core/config.py       # Settings (Pydantic BaseSettings)
│   ├── api/routes/
│   │   ├── health.py        # GET /api/v1/health
│   │   └── predict.py       # POST /api/v1/predict
│   ├── schemas/prediction.py # Pydantic request/response models
│   └── services/ml_service.py # ML inference service
├── train_model.py            # Model training script
├── requirements.txt
└── render.yaml               # Render deployment config
```
