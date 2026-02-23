'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PredictionForm from '@/components/PredictionForm';
import PredictionResult from '@/components/PredictionResult';
import ModelStats from '@/components/ModelStats';
import Footer from '@/components/Footer';
import { PredictionResponse } from '@/types/prediction';

export default function HomePage() {
    const [result, setResult] = useState<PredictionResponse | null>(null);

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: 'rgba(13,21,40,0.95)',
                        color: '#f1f5f9',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '12px',
                        fontSize: '14px',
                    },
                    error: {
                        iconTheme: { primary: '#fb7185', secondary: '#fff' },
                    },
                }}
            />

            {/* Navigation */}
            <Navbar />

            {/* Hero */}
            <Hero />

            {/* ── Predict Section ── */}
            <section
                id="predict"
                style={{
                    padding: '80px 24px',
                    background: 'linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%)',
                }}
            >
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    {/* Section heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{ textAlign: 'center', marginBottom: 52 }}
                    >
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(28px, 4vw, 44px)',
                            fontWeight: 900,
                            marginBottom: 12,
                        }}>
                            Get Your{' '}
                            <span className="gradient-text-gold">Price Estimate</span>
                        </h2>
                        <p style={{ fontSize: 16, color: 'var(--color-text-secondary)' }}>
                            Fill in the property details below and our AI will predict the market price instantly.
                        </p>
                    </motion.div>

                    {/* Two-column layout on large screens */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: result ? '1fr 1fr' : '1fr',
                        gap: 28,
                        alignItems: 'start',
                        maxWidth: result ? '100%' : 640,
                        margin: '0 auto',
                        transition: 'max-width 0.4s ease',
                    }}>
                        {/* Form */}
                        <PredictionForm onResult={setResult} />

                        {/* Result */}
                        <AnimatePresence mode="wait">
                            {result && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <PredictionResult result={result} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* ── Model Stats Section ── */}
            <ModelStats />

            {/* ── How It Works ── */}
            <section style={{
                padding: '60px 24px',
                background: 'var(--color-bg-secondary)',
                borderTop: '1px solid var(--color-border)',
            }}>
                <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(24px, 3.5vw, 38px)',
                            fontWeight: 900,
                            marginBottom: 12,
                        }}>
                            How It <span className="gradient-text-blue">Works</span>
                        </h2>
                        <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', marginBottom: 48 }}>
                            Three simple steps to get your property valuation.
                        </p>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: 20,
                    }}>
                        {[
                            {
                                step: '01',
                                title: 'Enter Details',
                                desc: 'Input location, area, BHK, floor, and amenities using our smart form.',
                                color: 'var(--color-indigo-400)',
                            },
                            {
                                step: '02',
                                title: 'AI Analysis',
                                desc: 'Our Gradient Boosting model processes 9 features in milliseconds.',
                                color: 'var(--color-blue-400)',
                            },
                            {
                                step: '03',
                                title: 'Get Estimate',
                                desc: 'Receive a detailed price breakdown with confidence range and feature insights.',
                                color: 'var(--color-gold-400)',
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="glass-card"
                                style={{ padding: '28px 24px', textAlign: 'left' }}
                            >
                                <div style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 48, fontWeight: 900,
                                    color: item.color, opacity: 0.25,
                                    lineHeight: 1, marginBottom: 12,
                                }}>
                                    {item.step}
                                </div>
                                <h3 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 18, fontWeight: 800, marginBottom: 8,
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
