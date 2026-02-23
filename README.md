# 🏠 NaviPriceAI — Navi Mumbai House Price Predictor

> A production-ready, full-stack ML application for predicting property prices in Navi Mumbai.

[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)](backend/)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014-000000?style=flat-square&logo=next.js)](frontend/)
[![Model](https://img.shields.io/badge/Model-Gradient%20Boosting-4CAF50?style=flat-square&logo=scikit-learn)](backend/train_model.py)

## Architecture

```
navimumbai-house-price/
├── backend/          # FastAPI + scikit-learn (→ Render)
└── frontend/         # Next.js 14 App Router (→ Vercel)
```

## ML Model

- **Algorithm**: Gradient Boosting Regressor (scikit-learn)
- **R² Score**: 0.8385 (explains 84% of price variance)
- **Features**: Location, Area (sq ft), BHK, Bathrooms, Floor, Total Floors, Age, Parking, Lift
- **Training data**: 2,450 Navi Mumbai real estate listings

## Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
python train_model.py
uvicorn app.main:app --reload
# API running at http://localhost:8000/docs
```

### Frontend

```bash
cd frontend
npm install
# Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
# App running at http://localhost:3000
```

## Deployment

| Service | Platform | Config |
|---------|----------|--------|
| Backend API | [Render](https://render.com) | `backend/render.yaml` |
| Frontend | [Vercel](https://vercel.com) | `frontend/vercel.json` |

### Deploy Backend (Render)
1. Push to GitHub
2. Create Web Service on Render → connect repo → Render detects `render.yaml` automatically
3. The build command trains the model; start command runs uvicorn

### Deploy Frontend (Vercel)
1. Import repo on Vercel
2. Set env var: `NEXT_PUBLIC_API_URL=<your-render-url>`
3. Deploy

## Style Guide

This project follows **Google Python Style Guide** for the backend and
**Google TypeScript Style Guide** for the frontend:
- Full type annotations on all functions
- Docstrings on all public methods
- Dependency injection via FastAPI `Depends()`
- Structured logging with Python's `logging` module
- Strict TypeScript compiler options

## License

MIT
