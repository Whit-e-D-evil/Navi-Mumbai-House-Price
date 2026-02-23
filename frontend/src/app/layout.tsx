import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'NaviPriceAI — Navi Mumbai House Price Predictor',
    description:
        'AI-powered property price prediction for Navi Mumbai. Gradient Boosting ML model with 83.85% accuracy, trained on 2,450 real estate listings.',
    keywords: [
        'navi mumbai property price',
        'house price predictor india',
        'real estate AI',
        'property valuation navi mumbai',
        'ml house price',
    ],
    authors: [{ name: 'NaviPriceAI' }],
    openGraph: {
        title: 'NaviPriceAI — Navi Mumbai House Price Predictor',
        description: 'Predict property prices in Navi Mumbai using AI and ML.',
        type: 'website',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#060b18',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>{children}</body>
        </html>
    );
}
