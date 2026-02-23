'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: '0 24px',
                transition: 'all 300ms ease',
                background: scrolled
                    ? 'rgba(6, 11, 24, 0.85)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
            }}
        >
            <div style={{
                maxWidth: 1200,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 68,
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #4299e1, #6366f1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#fff',
                        fontFamily: 'var(--font-heading)',
                    }}>
                        N
                    </div>
                    <div>
                        <div style={{
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 800,
                            fontSize: 16,
                            color: '#f1f5f9',
                            lineHeight: 1.2,
                        }}>
                            NaviPriceAI
                        </div>
                        <div style={{
                            fontSize: 11,
                            color: 'var(--color-text-muted)',
                            fontWeight: 500,
                        }}>
                            Navi Mumbai Real Estate
                        </div>
                    </div>
                </div>

                {/* Right side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 14px',
                        background: 'rgba(52, 211, 153, 0.1)',
                        border: '1px solid rgba(52, 211, 153, 0.25)',
                        borderRadius: 30,
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--color-teal-400)',
                    }}>
                        <span style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'var(--color-teal-400)',
                            boxShadow: '0 0 8px rgba(52,211,153,0.8)',
                            display: 'inline-block',
                        }} />
                        ML Model Active
                    </div>

                    <a
                        href="/resume"
                        style={{
                            padding: '8px 18px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid rgba(99,102,241,0.3)',
                            background: 'rgba(99,102,241,0.08)',
                            fontSize: 13,
                            fontWeight: 600,
                            color: 'var(--color-indigo-400)',
                            transition: 'all var(--transition-fast)',
                        }}
                    >
                        My Resume
                    </a>

                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '8px 18px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            background: 'rgba(255,255,255,0.04)',
                            fontSize: 13,
                            fontWeight: 600,
                            color: 'var(--color-text-secondary)',
                            transition: 'all var(--transition-fast)',
                        }}
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </motion.header>
    );
}
