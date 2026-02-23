'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import {
    TrendingUp, IndianRupee, Ruler, BarChart3, CheckCircle,
} from 'lucide-react';
import { PredictionResponse } from '@/types/prediction';
import { formatIndianCurrency, toIndianLocale } from '@/lib/utils';

const FEATURE_IMPORTANCE = [
    { display_name: 'Area (sq ft)', importance: 65.5 },
    { display_name: 'BHK', importance: 8.6 },
    { display_name: 'Property Age', importance: 8.1 },
    { display_name: 'Total Floors', importance: 6.5 },
    { display_name: 'Floor', importance: 5.5 },
    { display_name: 'Location', importance: 3.2 },
    { display_name: 'Bathrooms', importance: 2.0 },
    { display_name: 'Parking', importance: 0.4 },
    { display_name: 'Lift', importance: 0.1 },
];

const BAR_COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#8b5cf6', '#7c3aed', '#4299e1', '#63b3ed', '#34d399', '#22d3ee'];

interface CustomTooltipProps {
    active?: boolean;
    payload?: { value: number; payload: { display_name: string } }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: 'rgba(13,21,40,0.95)',
            border: '1px solid var(--color-border-accent)',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 13,
        }}>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 4 }}>
                {payload[0].payload.display_name}
            </p>
            <p style={{ color: 'var(--color-indigo-400)', fontWeight: 700 }}>
                {payload[0].value.toFixed(1)}% importance
            </p>
        </div>
    );
}

interface PredictionResultProps {
    result: PredictionResponse;
}

export default function PredictionResult({ result }: PredictionResultProps) {
    const confidencePct = Math.round(result.confidence_score * 100);

    return (
        <motion.div
            id="result"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
        >
            {/* ── Sample Property Views ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ marginBottom: 8 }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 16,
                    paddingLeft: 4,
                }}>
                    <TrendingUp size={18} color="var(--color-indigo-400)" />
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>
                        SAMPLE PROPERTY MATCHES
                    </span>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 16,
                }}>
                    {[
                        { url: '/images/hero/hero-2.jpg', label: 'Modern Living Space' },
                        { url: '/images/hero/hero-5.jpg', label: 'Premium Architecture' },
                        { url: '/images/hero/hero-9.jpg', label: 'Vibrant Interior' },
                    ].map((img, i) => (
                        <motion.div
                            key={img.url}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                            style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 160, boxShadow: '0 10px 25px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                            <Image
                                src={img.url}
                                alt={img.label}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(13,17,23,0.8) 0%, transparent 60%)',
                                display: 'flex',
                                alignItems: 'flex-end',
                                padding: '12px 16px',
                            }}>
                                <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{img.label}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            {/* ── Main Price Card ── */}
            <div className="price-card">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '5px 14px',
                        background: 'rgba(52,211,153,0.1)',
                        border: '1px solid rgba(52,211,153,0.25)',
                        borderRadius: 30,
                        fontSize: 12, fontWeight: 600,
                        color: 'var(--color-teal-400)',
                        marginBottom: 20,
                    }}>
                        <CheckCircle size={13} />
                        AI Prediction Complete
                    </div>

                    <div style={{ marginBottom: 4, fontSize: 14, color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                        Estimated Market Price
                    </div>
                    <div style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(36px, 6vw, 56px)',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        marginBottom: 8,
                    }}>
                        <span className="gradient-text-blue">
                            {formatIndianCurrency(result.predicted_price)}
                        </span>
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 24 }}>
                        ₹{toIndianLocale(result.predicted_price)}
                    </div>

                    {/* Price range */}
                    <div style={{
                        display: 'inline-flex', gap: 0,
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: 10,
                        border: '1px solid var(--color-border)',
                        overflow: 'hidden',
                        fontSize: 13,
                    }}>
                        <div style={{ padding: '10px 20px', borderRight: '1px solid var(--color-border)' }}>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: 11, marginBottom: 2 }}>LOW ESTIMATE</div>
                            <div style={{ fontWeight: 700 }}>{formatIndianCurrency(result.price_range_low)}</div>
                        </div>
                        <div style={{ padding: '10px 20px' }}>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: 11, marginBottom: 2 }}>HIGH ESTIMATE</div>
                            <div style={{ fontWeight: 700 }}>{formatIndianCurrency(result.price_range_high)}</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── Metrics Row ── */}
            <div className="grid-3">
                {[
                    {
                        icon: IndianRupee,
                        label: 'Price / sq ft',
                        value: `₹${toIndianLocale(Math.round(result.price_per_sqft))}`,
                        color: 'var(--color-blue-400)',
                        bg: 'rgba(66,153,225,0.1)',
                    },
                    {
                        icon: TrendingUp,
                        label: 'Confidence Score',
                        value: `${confidencePct}%`,
                        color: 'var(--color-teal-400)',
                        bg: 'rgba(52,211,153,0.1)',
                    },
                    {
                        icon: Ruler,
                        label: 'Price in Lakhs',
                        value: `₹${result.price_in_lakhs}L`,
                        color: 'var(--color-gold-400)',
                        bg: 'rgba(245,158,11,0.1)',
                    },
                ].map((item) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="glass-card"
                        style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}
                    >
                        <div style={{
                            width: 38, height: 38, borderRadius: 10,
                            background: item.bg,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <item.icon size={18} color={item.color} />
                        </div>
                        <div>
                            <div style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 22, fontWeight: 800, marginBottom: 2,
                            }}>
                                {item.value}
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                                {item.label}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── Feature Importance Chart ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card"
                style={{ padding: '28px' }}
            >
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24,
                }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 9,
                        background: 'rgba(99,102,241,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <BarChart3 size={18} color="var(--color-indigo-400)" />
                    </div>
                    <div>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700 }}>
                            Feature Importance
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                            What drives the prediction most
                        </div>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={260}>
                    <BarChart
                        data={FEATURE_IMPORTANCE}
                        layout="vertical"
                        margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
                    >
                        <XAxis
                            type="number"
                            domain={[0, 70]}
                            tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
                            tickFormatter={(v) => `${v}%`}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            type="category"
                            dataKey="display_name"
                            tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
                            width={90}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                        <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                            {FEATURE_IMPORTANCE.map((_, i) => (
                                <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Input summary */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="glass-card"
                style={{ padding: '20px 24px' }}
            >
                <p className="section-title">Input Summary</p>
                <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: 8,
                }}>
                    {Object.entries(result.input_summary).map(([key, value]) => (
                        <span key={key} style={{
                            padding: '5px 12px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 20,
                            fontSize: 12,
                            color: 'var(--color-text-secondary)',
                        }}>
                            <span style={{ color: 'var(--color-text-muted)' }}>{key.replace(/_/g, ' ')}: </span>
                            <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                                {String(value)}
                            </span>
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
