'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, TrendingUp, Database } from 'lucide-react';

const stats = [
    { icon: Building2, label: 'Properties Analyzed', value: '2,450+' },
    { icon: TrendingUp, label: 'Model Accuracy (R²)', value: '83.85%' },
    { icon: Database, label: 'ML Algorithm', value: 'Gradient Boost' },
];

const heroImages = [
    '/images/hero/hero-1.jpg',
    '/images/hero/hero-2.jpg',
    '/images/hero/hero-3.jpg',
    '/images/hero/hero-4.jpg',
    '/images/hero/hero-5.jpg',
    '/images/hero/hero-6.jpg',
    '/images/hero/hero-7.jpg',
    '/images/hero/hero-8.jpg',
    '/images/hero/hero-9.jpg',
    '/images/hero/hero-10.jpg',
];

export default function Hero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 6000); // Change image every 6 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <section
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Background Image Slider */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: -1,
                background: '#0d1117',
            }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url(${heroImages[currentImageIndex]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                </AnimatePresence>
                {/* Dark Vignette Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, rgba(13,17,23,0.3) 0%, rgba(13,17,23,0.8) 100%)',
                }} />
            </div>

            {/* Glass Container for Content */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '120px 24px 80px',
                textAlign: 'center',
            }}>
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 20px',
                        background: 'rgba(99,102,241,0.15)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 30,
                        fontSize: 13,
                        fontWeight: 600,
                        color: 'var(--color-indigo-400)',
                        marginBottom: 32,
                    }}
                >
                    <span style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: 'var(--color-indigo-400)',
                        boxShadow: '0 0 8px rgba(99,102,241,0.8)',
                    }} />
                    AI-Powered Real Estate Valuation · Navi Mumbai
                </motion.div>

                {/* Main heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(42px, 7vw, 80px)',
                        fontWeight: 900,
                        lineHeight: 1.05,
                        maxWidth: 950,
                        marginBottom: 28,
                        color: '#ffffff',
                        textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                    }}
                >
                    Predict{' '}
                    <span className="gradient-text-blue">Property Prices</span>
                    <br />
                    in Navi Mumbai
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    style={{
                        fontSize: 'clamp(16px, 2vw, 20px)',
                        color: 'rgba(255,255,255,0.9)',
                        maxWidth: 620,
                        lineHeight: 1.7,
                        marginBottom: 52,
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    }}
                >
                    Our Gradient Boosting ML model analyzes 9 property features to give you
                    instant, accurate price estimates — trained on 2,450 real listings.
                </motion.p>

                {/* Scroll CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    style={{ marginBottom: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
                >
                    <a
                        href="#predict"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '16px 48px',
                            background: 'linear-gradient(135deg, #4299e1, #6366f1)',
                            color: '#fff',
                            borderRadius: 'var(--radius-md)',
                            fontFamily: 'var(--font-heading)',
                            fontSize: 16,
                            fontWeight: 700,
                            boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
                            transition: 'all var(--transition-fast)',
                        }}
                    >
                        Get Price Estimate →
                    </a>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.5)',
                        background: 'rgba(255,255,255,0.03)',
                        padding: '6px 12px',
                        borderRadius: 20,
                        border: '1px solid rgba(255,255,255,0.05)',
                    }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
                        Note: First prediction may take ~60s if the server is waking up.
                    </div>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    style={{
                        display: 'flex',
                        gap: 20,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                            className="glass-card"
                            style={{
                                padding: '22px 32px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16,
                                minWidth: 220,
                                background: 'rgba(13,21,40,0.4)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255,255,255,0.08)',
                            }}
                        >
                            <div style={{
                                width: 44,
                                height: 44,
                                borderRadius: 12,
                                background: 'rgba(99,102,241,0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <stat.icon size={22} color="#818cf8" />
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 24,
                                    fontWeight: 800,
                                    color: '#ffffff',
                                    lineHeight: 1.1,
                                }}>
                                    {stat.value}
                                </div>
                                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500, marginTop: 4 }}>
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
