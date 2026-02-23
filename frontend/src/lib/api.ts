/**
 * API client for the Navi Mumbai House Price Predictor backend.
 * Wraps all network calls with typed responses and consistent error handling.
 */

import axios, { AxiosError, AxiosInstance } from 'axios';
import {
    HealthResponse,
    LocationsResponse,
    ModelInfoResponse,
    PredictionRequest,
    PredictionResponse,
} from '@/types/prediction';

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    'https://navi-mumbai-house-price-api.onrender.com';

const API_PREFIX = '/api/v1';

/** Singleton Axios instance with base configuration. */
const apiClient: AxiosInstance = axios.create({
    baseURL: `${API_BASE_URL}${API_PREFIX}`,
    timeout: 30_000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

/** Extracts a human-readable error message from Axios errors. */
function extractErrorMessage(error: unknown): string {
    if (error instanceof AxiosError) {
        const detail = error.response?.data?.detail;
        if (typeof detail === 'string') return detail;
        if (Array.isArray(detail)) return detail.map((d) => d.msg).join(', ');
        if (error.code === 'ECONNABORTED') return 'Request timed out. Please try again.';
        if (!error.response) return 'Network error. Check your connection.';
    }
    return 'An unexpected error occurred.';
}

/**
 * Submits a price prediction request to the backend.
 *
 * @param payload - Validated property feature input.
 * @returns Prediction result with price estimates.
 * @throws Error with descriptive message on failure.
 */
export async function predictPrice(
    payload: PredictionRequest
): Promise<PredictionResponse> {
    try {
        const { data } = await apiClient.post<PredictionResponse>('/predict', payload);
        return data;
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    }
}

/**
 * Fetches the list of supported Navi Mumbai locations.
 *
 * @returns Array of location strings.
 */
export async function fetchLocations(): Promise<string[]> {
    try {
        const { data } = await apiClient.get<LocationsResponse>('/locations');
        return data.locations;
    } catch {
        // Fallback to static list if API unavailable
        return [
            'Airoli', 'CBD Belapur', 'Dronagiri', 'Ghansoli', 'Kamothe',
            'Kalamboli', 'Kharghar', 'Kopar Khairane', 'Mansarovar', 'Nerul',
            'New Panvel', 'Panvel', 'Roadpali', 'Sanpada', 'Seawoods',
            'Sector 19', 'Taloja', 'Turbhe', 'Ulwe', 'Vashi',
        ];
    }
}

/**
 * Fetches model metadata and performance metrics.
 *
 * @returns ModelInfoResponse with feature importance and metrics.
 */
export async function fetchModelInfo(): Promise<ModelInfoResponse> {
    const { data } = await apiClient.get<ModelInfoResponse>('/model-info');
    return data;
}

/**
 * Checks backend health status.
 *
 * @returns HealthResponse indicating API and model status.
 */
export async function checkHealth(): Promise<HealthResponse> {
    const { data } = await apiClient.get<HealthResponse>('/health');
    return data;
}
