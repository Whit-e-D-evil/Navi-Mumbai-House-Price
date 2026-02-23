import { Github } from 'lucide-react';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{
            borderTop: '1px solid var(--color-border)',
            padding: '36px 24px',
            textAlign: 'center',
        }}>
            <div style={{
                maxWidth: 800, margin: '0 auto',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: 'linear-gradient(135deg, #4299e1, #6366f1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 14, fontWeight: 800, color: '#fff',
                        fontFamily: 'var(--font-heading)',
                    }}>
                        N
                    </div>
                    <span style={{
                        fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15,
                        color: 'var(--color-text-secondary)',
                    }}>
                        NaviPriceAI
                    </span>
                </div>

                {/* Tagline */}
                <p style={{
                    fontSize: 13, color: 'var(--color-text-muted)',
                    maxWidth: 440, lineHeight: 1.6,
                }}>
                    AI-powered property valuation for Navi Mumbai. Built with FastAPI,
                    scikit-learn, and Next.js. Trained on 2,450+ real estate listings.
                </p>

                {/* Tech stack pills */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {['FastAPI', 'scikit-learn', 'Next.js 14', 'Python 3.11', 'TypeScript', 'Render', 'Vercel'].map((tech) => (
                        <span key={tech} style={{
                            padding: '4px 12px',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 20,
                            fontSize: 11, fontWeight: 600,
                            color: 'var(--color-text-muted)',
                        }}>
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Copyright */}
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                    © {year} NaviPriceAI · Made with ♥ for Navi Mumbai real estate
                </p>
            </div>
        </footer>
    );
}
