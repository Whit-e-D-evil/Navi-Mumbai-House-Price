'use client';

import { motion } from 'framer-motion';
import {
    Code2,
    GraduationCap,
    Layers,
    Mail,
    MapPin,
    Phone,
    User,
    Award,
    Briefcase,
    ExternalLink
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const skills = [
    { name: 'Python', level: 85 },
    { name: 'Machine Learning', level: 80 },
    { name: 'Next.js / React', level: 75 },
    { name: 'FastAPI / SQL', level: 70 },
    { name: 'Scikit-Learn', level: 85 },
    { name: 'Data Visualization', level: 75 },
];

const projects = [
    {
        title: 'NaviPriceAI',
        description: 'A production-ready ML application for predicting house prices in Navi Mumbai with 84% accuracy.',
        tags: ['FastAPI', 'Next.js', 'Gradient Boosting', 'Scikit-Learn'],
        link: '/'
    },
    {
        title: 'Real Estate Data Pipeline',
        description: 'Custom ETL process for cleaning and processing 2,500+ Mumbai property listings.',
        tags: ['Pandas', 'NumPy', 'Data Cleaning'],
        link: '#'
    }
];

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-[#060b18] text-white overflow-x-hidden">
            <Navbar />

            <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
                {/* Header Profile */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card mb-12 overflow-hidden"
                    style={{ padding: 0 }}
                >
                    <div style={{ height: 120, background: 'linear-gradient(135deg, #4299e1, #6366f1)', opacity: 0.8 }} />
                    <div style={{ padding: '0 40px 40px', marginTop: -60 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
                            <div style={{
                                width: 120, height: 120, borderRadius: 30,
                                background: 'rgba(13,21,40,0.9)',
                                border: '4px solid #060b18',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                            }}>
                                <User size={60} color="#818cf8" />
                            </div>
                            <div style={{ flex: 1, paddingTop: 60 }}>
                                <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#fff', marginBottom: 8 }}>
                                    Suryansh
                                </h1>
                                <p style={{ fontSize: 18, color: 'var(--color-indigo-400)', fontWeight: 600, marginBottom: 20 }}>
                                    AI & Machine Learning Enthusiast
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, fontSize: 14, color: 'var(--color-text-secondary)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><GraduationCap size={16} /> 1st Year, Lokmanya Tilak College of Engineering</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={16} /> Mumbai, India</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>

                    {/* Left Column: Info & Skills */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        {/* Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card"
                            style={{ padding: 32 }}
                        >
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Layers size={18} color="var(--color-indigo-400)" />
                                Professional Summary
                            </h3>
                            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
                                Ambitious first-year engineering student at LTCE with a deep passion for Artificial Intelligence and Full-Stack Development.
                                Currently focused on building end-to-end ML applications and exploring the intersection of data science and web technologies.
                            </p>
                        </motion.div>

                        {/* Technical Skills */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-card"
                            style={{ padding: 32 }}
                        >
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Code2 size={18} color="var(--color-indigo-400)" />
                                Technical Skills
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                {skills.map((skill, i) => (
                                    <div key={skill.name}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                                            <span style={{ fontWeight: 600 }}>{skill.name}</span>
                                            <span style={{ color: 'var(--color-text-muted)' }}>{skill.level}%</span>
                                        </div>
                                        <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 10, overflow: 'hidden' }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                style={{ height: '100%', background: 'linear-gradient(90deg, #4299e1, #6366f1)' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Projects & Education */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        {/* Projects */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass-card"
                            style={{ padding: 32 }}
                        >
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Briefcase size={18} color="var(--color-indigo-400)" />
                                Featured Projects
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                {projects.map((project) => (
                                    <div key={project.title} style={{ padding: 20, background: 'rgba(0,0,0,0.2)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.03)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                            <h4 style={{ fontWeight: 800, fontSize: 17, color: '#f1f5f9' }}>{project.title}</h4>
                                            <a href={project.link} style={{ color: 'var(--color-indigo-400)' }}><ExternalLink size={16} /></a>
                                        </div>
                                        <p style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                                            {project.description}
                                        </p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                            {project.tags.map(tag => (
                                                <span key={tag} style={{ padding: '4px 10px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 6, fontSize: 11, fontWeight: 600, color: 'var(--color-indigo-400)' }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Education */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="glass-card"
                            style={{ padding: 32 }}
                        >
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Award size={18} color="var(--color-indigo-400)" />
                                Education
                            </h3>
                            <div style={{ position: 'relative', paddingLeft: 24 }}>
                                <div style={{ position: 'absolute', left: 4, top: 8, bottom: 8, width: 2, background: 'rgba(99,102,241,0.3)' }} />
                                <div style={{ position: 'relative', marginBottom: 28 }}>
                                    <div style={{ position: 'absolute', left: -26, top: 0, width: 10, height: 10, borderRadius: '50%', background: 'var(--color-indigo-400)', boxShadow: '0 0 8px rgba(99,102,241,0.8)' }} />
                                    <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>B.S. Engineering (AI & DS)</h4>
                                    <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 4 }}>Lokmanya Tilak College of Engineering (LTCE)</p>
                                    <p style={{ fontSize: 12, color: 'var(--color-indigo-400)', fontWeight: 700 }}>2024 — Present (1st Year)</p>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: -26, top: 0, width: 10, height: 10, borderRadius: '50%', background: 'rgba(99,102,241,0.3)' }} />
                                    <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Higher Secondary Education</h4>
                                    <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Maharashtra State Board</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
