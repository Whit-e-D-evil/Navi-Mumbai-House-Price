'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, MapPin, Home, Layers, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { predictPrice } from '@/lib/api';
import { PredictionRequest, PredictionResponse, NaviMumbaiLocation } from '@/types/prediction';

// ── Zod validation schema ────────────────────────────────────────────────────

const schema = z.object({
    location: z.string().min(1, 'Select a location'),
    area_sqft: z.coerce.number().min(300, 'Min 300 sq ft').max(10000, 'Max 10,000 sq ft'),
    bhk: z.coerce.number().int().min(1).max(5),
    bathrooms: z.coerce.number().int().min(1).max(5),
    floor: z.coerce.number().int().min(0).max(60),
    total_floors: z.coerce.number().int().min(1).max(60),
    age_of_property: z.coerce.number().int().min(0).max(50),
    parking: z.union([z.literal(0), z.literal(1)]),
    lift: z.union([z.literal(0), z.literal(1)]),
}).refine((d) => d.floor <= d.total_floors, {
    message: 'Floor cannot exceed total floors',
    path: ['floor'],
});

type FormValues = z.infer<typeof schema>;

const LOCATIONS: NaviMumbaiLocation[] = [
    'Airoli', 'Belapur', 'CBD Belapur', 'Dronagiri', 'Ghansoli', 'Kamothe',
    'Kalamboli', 'Kharghar', 'Kopar Khairane', 'Mansarovar', 'Nerul',
    'New Panvel', 'Panvel', 'Roadpali', 'Sanpada', 'Seawoods',
    'Sector 19', 'Taloja', 'Turbhe', 'Ulwe', 'Vashi',
];

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionDivider({ label }: { label: string }) {
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0 20px',
        }}>
            <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
            <span style={{
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.1em', color: 'var(--color-text-muted)',
                whiteSpace: 'nowrap',
            }}>
                {label}
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
        </div>
    );
}

function FormField({
    label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="form-label">{label}</label>
            {children}
            {error && <p className="form-error">{error}</p>}
        </div>
    );
}

function NumberSpinner({
    value, onChange, min, max, step = 1,
}: { value: number; onChange: (v: number) => void; min: number; max: number; step?: number }) {
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: 0,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
        }}>
            <button
                type="button"
                onClick={() => onChange(Math.max(min, value - step))}
                style={{
                    width: 40, height: 44, background: 'none', border: 'none',
                    color: 'var(--color-text-secondary)', fontSize: 18, cursor: 'pointer',
                    transition: 'background var(--transition-fast)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
                −
            </button>
            <div style={{
                flex: 1, textAlign: 'center', fontSize: 15, fontWeight: 700,
                color: 'var(--color-text-primary)', userSelect: 'none',
            }}>
                {value}
            </div>
            <button
                type="button"
                onClick={() => onChange(Math.min(max, value + step))}
                style={{
                    width: 40, height: 44, background: 'none', border: 'none',
                    color: 'var(--color-text-secondary)', fontSize: 18, cursor: 'pointer',
                    transition: 'background var(--transition-fast)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
                +
            </button>
        </div>
    );
}

// ── Main Component ───────────────────────────────────────────────────────────

interface PredictionFormProps {
    onResult: (result: PredictionResponse) => void;
}

export default function PredictionForm({ onResult }: PredictionFormProps) {
    const [loading, setLoading] = useState(false);

    const {
        register, handleSubmit, control, setValue, watch,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            location: '' as NaviMumbaiLocation,
            area_sqft: 950,
            bhk: 2,
            bathrooms: 2,
            floor: 4,
            total_floors: 10,
            age_of_property: 3,
            parking: 1,
            lift: 1,
        },
    });

    const parking = watch('parking');
    const lift = watch('lift');

    const onSubmit = useCallback(async (values: FormValues) => {
        setLoading(true);
        try {
            const payload: PredictionRequest = {
                ...values,
                location: values.location as NaviMumbaiLocation,
                parking: values.parking as 0 | 1,
                lift: values.lift as 0 | 1,
            };
            const result = await predictPrice(payload);
            onResult(result);
            // Scroll to result
            setTimeout(() => document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' }), 100);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Prediction failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [onResult]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card"
            style={{ padding: '36px', maxWidth: 640, margin: '0 auto' }}
        >
            {/* Header */}
            <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: 'rgba(99,102,241,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Home size={20} color="var(--color-indigo-400)" />
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800,
                    }}>
                        Property Details
                    </h2>
                </div>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
                    Fill in your property features to get an instant AI price estimate.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                {/* ── Location ── */}
                <SectionDivider label="Location & Size" />

                <div style={{ marginBottom: 16 }}>
                    <FormField label="📍 Location" error={errors.location?.message}>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={14} style={{
                                position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                                color: 'var(--color-text-muted)',
                            }} />
                            <select
                                {...register('location')}
                                className="form-input"
                                style={{ paddingLeft: 36 }}
                            >
                                <option value="">Select locality...</option>
                                {LOCATIONS.map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>
                    </FormField>
                </div>

                {/* Area */}
                <div style={{ marginBottom: 16 }}>
                    <FormField label="📐 Built-up Area (sq ft)" error={errors.area_sqft?.message}>
                        <input
                            type="number"
                            {...register('area_sqft')}
                            className="form-input"
                            placeholder="e.g. 950"
                            min={300}
                            max={10000}
                        />
                    </FormField>
                </div>

                {/* BHK & Bathrooms */}
                <div className="grid-2" style={{ marginBottom: 16 }}>
                    <FormField label="🛏 BHK" error={errors.bhk?.message}>
                        <Controller
                            name="bhk"
                            control={control}
                            render={({ field }) => (
                                <NumberSpinner value={field.value} onChange={field.onChange} min={1} max={5} />
                            )}
                        />
                    </FormField>
                    <FormField label="🚿 Bathrooms" error={errors.bathrooms?.message}>
                        <Controller
                            name="bathrooms"
                            control={control}
                            render={({ field }) => (
                                <NumberSpinner value={field.value} onChange={field.onChange} min={1} max={5} />
                            )}
                        />
                    </FormField>
                </div>

                {/* ── Building Details ── */}
                <SectionDivider label="Building Details" />

                <div className="grid-2" style={{ marginBottom: 16 }}>
                    <FormField label="🏢 Floor No." error={errors.floor?.message}>
                        <Controller
                            name="floor"
                            control={control}
                            render={({ field }) => (
                                <NumberSpinner value={field.value} onChange={field.onChange} min={0} max={60} />
                            )}
                        />
                    </FormField>
                    <FormField label="🏗 Total Floors" error={errors.total_floors?.message}>
                        <Controller
                            name="total_floors"
                            control={control}
                            render={({ field }) => (
                                <NumberSpinner value={field.value} onChange={field.onChange} min={1} max={60} />
                            )}
                        />
                    </FormField>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <FormField label="📅 Age of Property (years)" error={errors.age_of_property?.message}>
                        <input
                            type="number"
                            {...register('age_of_property')}
                            className="form-input"
                            placeholder="e.g. 3"
                            min={0}
                            max={50}
                        />
                    </FormField>
                </div>

                {/* ── Amenities ── */}
                <SectionDivider label="Amenities" />

                <div className="grid-2" style={{ marginBottom: 28 }}>
                    <FormField label="🚗 Parking" error={errors.parking?.message}>
                        <div className="toggle-group">
                            <button type="button"
                                className={`toggle-btn ${parking === 0 ? 'active' : ''}`}
                                onClick={() => setValue('parking', 0)}>
                                No
                            </button>
                            <button type="button"
                                className={`toggle-btn ${parking === 1 ? 'active' : ''}`}
                                onClick={() => setValue('parking', 1)}>
                                Yes
                            </button>
                        </div>
                    </FormField>
                    <FormField label="🛗 Lift" error={errors.lift?.message}>
                        <div className="toggle-group">
                            <button type="button"
                                className={`toggle-btn ${lift === 0 ? 'active' : ''}`}
                                onClick={() => setValue('lift', 0)}>
                                No
                            </button>
                            <button type="button"
                                className={`toggle-btn ${lift === 1 ? 'active' : ''}`}
                                onClick={() => setValue('lift', 1)}>
                                Yes
                            </button>
                        </div>
                    </FormField>
                </div>

                {/* Submit */}
                <button type="submit" className="btn-primary" disabled={loading}>
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.span
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                            >
                                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                Analysing property...
                            </motion.span>
                        ) : (
                            <motion.span
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                            >
                                <Zap size={18} />
                                Predict Price with AI
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </form>

            <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
        </motion.div>
    );
}
