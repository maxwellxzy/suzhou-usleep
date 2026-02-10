import React, { useEffect } from 'react';
import { Cpu, Zap, Activity } from 'lucide-react';
import TechnologySection from '../components/TechnologySection';

const techHighlights = [
  { icon: Cpu, title: '国际前沿', desc: '引进斯坦福 SAINT 等顶级诊疗技术', color: '#00B4D8' },
  { icon: Zap, title: '精准高效', desc: 'TMS/fNIRS 精准定位神经调控', color: '#C59D5F' },
  { icon: Activity, title: '安全无创', desc: '非侵入式治疗，安全性高', color: '#10B981' },
];

const Technology = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-technology">
            {/* Page Hero */}
            <div className="page-hero">
                <div className="container">
                    <h1>核心医疗技术</h1>
                    <p>引进国际前沿治疗技术，结合科学与创新，精准解决精神心理问题</p>
                </div>
            </div>

            {/* Tech Highlights */}
            <section className="section bg-white">
                <div className="container">
                    <div className="tech-highlights">
                        {techHighlights.map((item, i) => (
                            <div key={i} className="tech-highlight-card">
                                <div className="tech-hl-icon" style={{ background: `${item.color}15`, color: item.color }}>
                                    <item.icon size={28} strokeWidth={1.5} />
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Detailed Tech List */}
            <TechnologySection hideTitle={true} />

            <style>{`
                .tech-highlights {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: var(--spacing-lg);
                    max-width: 900px;
                    margin: 0 auto;
                }
                .tech-highlight-card {
                    text-align: center;
                    padding: 2rem 1.5rem;
                    border-radius: var(--radius-lg);
                    border: 1px solid rgba(11, 48, 88, 0.06);
                    transition: all var(--transition-normal);
                }
                .tech-highlight-card:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-md);
                    border-color: transparent;
                }
                .tech-hl-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                }
                .tech-highlight-card h3 {
                    font-size: 1.15rem;
                    color: var(--color-primary);
                    margin-bottom: 0.5rem;
                }
                .tech-highlight-card p {
                    font-size: 0.9rem;
                    color: var(--color-text-secondary);
                }

                @media (max-width: 640px) {
                    .tech-highlights {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default Technology;
