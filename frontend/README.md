# 🏠 Navi Mumbai House Price Predictor — Frontend

Next.js 14 App Router frontend for the AI-powered property price prediction platform.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Animations | Framer Motion |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Notifications | React Hot Toast |
| Icons | Lucide React |
| Deployment | Vercel |

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Set environment variable
cp .env.example .env.local
# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:8000

# 3. Start development server
npm run dev
```

Open http://localhost:3000

## Deployment on Vercel

1. Push code to GitHub
2. Import project at [vercel.com](https://vercel.com/new)
3. Set environment variable:
   - `NEXT_PUBLIC_API_URL` = your Render backend URL
4. Deploy — Vercel auto-detects Next.js

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout, SEO metadata
│   │   ├── page.tsx         # Main page (all sections)
│   │   └── globals.css      # Design system, CSS variables
│   ├── components/
│   │   ├── Navbar.tsx       # Sticky navbar with scroll effect
│   │   ├── Hero.tsx         # Animated landing hero
│   │   ├── PredictionForm.tsx  # 9-field property form
│   │   ├── PredictionResult.tsx # Price card + chart
│   │   ├── ModelStats.tsx   # ML metrics & pipeline
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── api.ts           # Axios API client
│   │   └── utils.ts         # Indian currency formatter
│   └── types/
│       └── prediction.ts    # TypeScript interfaces
├── vercel.json
└── next.config.js
```

## Features

- 🎨 **Premium Dark UI** — Glassmorphism cards, animated gradient hero, smooth Framer Motion transitions
- 📊 **Feature Importance Chart** — Recharts horizontal bar showing what drives the prediction
- ✅ **Smart Validation** — Zod schema with cross-field checks (floor ≤ total floors)
- 🔢 **Number Spinners** — Intuitive +/– controls for BHK, bathrooms, floors
- 📱 **Fully Responsive** — Mobile-first, adapts from 320px to 4K
- 🚀 **SEO Ready** — Open Graph tags, proper h1 hierarchy, semantic HTML
