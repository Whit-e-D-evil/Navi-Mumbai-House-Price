import pytest

@pytest.mark.anyio
async def test_health_check(client):
    response = await client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["model_loaded"] is True

@pytest.mark.anyio
async def test_get_locations(client):
    response = await client.get("/api/v1/locations")
    assert response.status_code == 200
    data = response.json()
    assert "locations" in data
    assert len(data["locations"]) > 0
    assert "Kharghar" in data["locations"]

@pytest.mark.anyio
async def test_predict_price(client):
    payload = {
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
    response = await client.post("/api/v1/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "predicted_price" in data
    assert data["predicted_price"] > 0
    assert "price_in_lakhs" in data
    assert "confidence_score" in data

@pytest.mark.anyio
async def test_get_model_info(client):
    response = await client.get("/api/v1/model-info")
    assert response.status_code == 200
    data = response.json()
    assert data["model_name"] == "Gradient Boosting Regressor"
    assert "metrics" in data
    assert "feature_importance" in data
