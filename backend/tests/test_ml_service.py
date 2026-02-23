from app.services.ml_service import ml_service
from app.schemas.prediction import PredictionRequest, NaviMumbaiLocation

# Ensure model is loaded for unit tests
if not ml_service.is_loaded:
    ml_service.load()

def test_ml_service_is_loaded():
    assert ml_service.is_loaded is True

def test_ml_service_predict():
    request = PredictionRequest(
        location=NaviMumbaiLocation.KHARGHAR,
        area_sqft=1000,
        bhk=2,
        bathrooms=2,
        floor=5,
        total_floors=10,
        age_of_property=5,
        parking=1,
        lift=1
    )
    result = ml_service.predict(request)
    assert result.predicted_price > 0
    assert result.price_in_lakhs > 0
    assert result.confidence_score > 0
    assert result.price_per_sqft > 0

def test_ml_service_get_model_info():
    info = ml_service.get_model_info()
    assert info.model_name == "Gradient Boosting Regressor"
    assert info.dataset_rows == 2450
    assert len(info.features) == 9
    assert info.metrics.r2_score == 0.8385
