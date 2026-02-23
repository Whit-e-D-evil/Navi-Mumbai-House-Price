'use client';

import { motion } from 'framer-motion';
import { Award, Activity, Database, Cpu } from 'lucide-react';

const metrics = [
    {
        icon: Award,
        label: 'R² Score',
        value: '83.85%',
        sub: 'Explains 84% of price variance',
        color: 'var(--color-indigo-400)',
        bg: 'rgba(99,102,241,0.1)',
    },
    {
        icon: Activity,
        label: 'RMSE',
        value: '₹38.8L',
        sub: 'Root Mean Squared Error',
        color: 'var(--color-blue-400)',
        bg: 'rgba(66,153,225,0.1)',
    },
    {
        icon: Database,
        label: 'Training Data',
        value: '2,450',
        sub: 'Navi Mumbai real estate listings',
        color: 'var(--color-teal-400)',
        bg: 'rgba(52,211,153,0.1)',
    },
    {
        icon: Cpu,
        label: 'Algorithm',
        value: 'GBR',
        sub: 'Gradient Boosting Regressor',
        color: 'var(--color-gold-400)',
        bg: 'rgba(245,158,11,0.1)',
    },
];

export default function ModelStats() {
    return (
        <section style={{
            padding: '80px 24px',
            maxWidth: 1100,
            margin: '0 auto',
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: 48 }}
            >
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 16px',
                    background: 'rgba(99,102,241,0.08)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    borderRadius: 30,
                    fontSize: 12, fontWeight: 600,
                    color: 'var(--color-indigo-400)',
                    marginBottom: 20,
                }}>
                    Model Performance
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    fontWeight: 900,
                    marginBottom: 12,
                }}>
                    Powered by{' '}
                    <span className="gradient-text-blue">Machine Learning</span>
                </h2>
                <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', maxWidth: 500, margin: '0 auto' }}>
                    Our Gradient Boosting Regressor is trained and evaluated on real
                    Navi Mumbai property data.
                </p>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 20,
            }}>
                {metrics.map((m, i) => (
                    <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        className="glass-card"
                        style={{ padding: '28px 24px' }}
                    >
                        <div style={{
                            width: 48, height: 48, borderRadius: 14,
                            background: m.bg,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: 16,
                        }}>
                            <m.icon size={22} color={m.color} />
                        </div>
                        <div style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 34, fontWeight: 900,
                            color: '#f1f5f9',
                            lineHeight: 1.1,
                            marginBottom: 4,
                        }}>
                            {m.value}
                        </div>
                        <div style={{
                            fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)',
                            marginBottom: 4,
                        }}>
                            {m.label}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                            {m.sub}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Model pipeline strip */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glass-card"
                style={{ marginTop: 28, padding: '24px 32px' }}
            >
                <p style={{
                    fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.1em', color: 'var(--color-text-muted)',
                    marginBottom: 16,
                }}>
                    ML Pipeline
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto' }}>
                    {['Raw Data', 'Label Encoding', 'Standard Scaling', 'GBR Training', 'FastAPI Serving', 'Next.js UI'].map(
                        (step, i, arr) => (
                            <div key={step} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                                <div style={{
                                    padding: '8px 16px',
                                    background: i === arr.length - 1
                                        ? 'rgba(99,102,241,0.2)'
                                        : 'rgba(255,255,255,0.04)',
                                    border: `1px solid ${i === arr.length - 1 ? 'rgba(99,102,241,0.4)' : 'var(--color-border)'}`,
                                    borderRadius: 8,
                                    fontSize: 12, fontWeight: 600,
                                    color: i === arr.length - 1 ? 'var(--color-indigo-400)' : 'var(--color-text-secondary)',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {step}
                                </div>
                                {i < arr.length - 1 && (
                                    <div style={{
                                        width: 28, height: 1,
                                        background: 'linear-gradient(90deg, var(--color-border), rgba(99,102,241,0.3))',
                                        flexShrink: 0,
                                    }} />
                                )}
                            </div>
                        )
                    )}
                </div>
            </motion.div>
        </section>
    );
}
