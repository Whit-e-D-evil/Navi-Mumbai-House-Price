/**
 * TypeScript interfaces for the Navi Mumbai House Price Predictor API.
 * Mirrors the FastAPI Pydantic schemas exactly.
 */

export type NaviMumbaiLocation =
    | 'Kharghar'
    | 'Vashi'
    | 'Nerul'
    | 'Belapur'
    | 'CBD Belapur'
    | 'Panvel'
    | 'Airoli'
    | 'Ghansoli'
    | 'Kopar Khairane'
    | 'Seawoods'
    | 'Sanpada'
    | 'Turbhe'
    | 'Taloja'
    | 'Ulwe'
    | 'Dronagiri'
    | 'Kamothe'
    | 'Kalamboli'
    | 'New Panvel'
    | 'Roadpali'
    | 'Mansarovar'
    | 'Sector 19';

export interface PredictionRequest {
    location: NaviMumbaiLocation;
    area_sqft: number;
    bhk: number;
    bathrooms: number;
    floor: number;
    total_floors: number;
    age_of_property: number;
    parking: 0 | 1;
    lift: 0 | 1;
}

export interface PredictionResponse {
    predicted_price: number;
    price_in_lakhs: number;
    price_range_low: number;
    price_range_high: number;
    price_per_sqft: number;
    confidence_score: number;
    input_summary: Record<string, unknown>;
}

export interface FeatureImportanceItem {
    name: string;
    importance: number;
    display_name: string;
}

export interface ModelMetrics {
    r2_score: number;
    rmse: number;
    mae: number;
}

export interface ModelInfoResponse {
    model_name: string;
    model_version: string;
    task_type: string;
    dataset_rows: number;
    features: string[];
    metrics: ModelMetrics;
    feature_importance: FeatureImportanceItem[];
}

export interface HealthResponse {
    status: string;
    model_loaded: boolean;
    version: string;
    message: string;
}

export interface LocationsResponse {
    locations: string[];
    total: number;
}

export interface ApiError {
    detail: string;
}
