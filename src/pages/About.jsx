import React, { useEffect } from 'react';
import { Award, Shield, Building2, Heart, Star, Users, Clock, Leaf } from 'lucide-react';

const About = () => {
    const getImageUrl = (name) => {
        return new URL(`../assets/images/${name}`, import.meta.url).href;
    };
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const stats = [
        { number: '5', label: '五优服务', icon: Star, color: '#C59D5F' },
        { number: '7', label: '七大品质', icon: Shield, color: '#00B4D8' },
        { number: '30', unit: '年', label: '从业经验', icon: Clock, color: '#10B981' },
    ];

    const honors = [
        { title: '苏州市立医院北区医联体', icon: Building2 },
        { title: '苏州市未成年人健康成长指导中心分站', icon: Heart },
        { title: '苏州市医保定点医疗机构', icon: Shield },
        { title: '全国十大医学促进贡献专家单位', icon: Award },
    ];

    const values = [
        { title: '专业', desc: '多学科MDT协作诊疗', icon: Users },
        { title: '温暖', desc: '以人为本的关怀服务', icon: Heart },
        { title: '创新', desc: '前沿技术精准治疗', icon: Leaf },
        { title: '卓越', desc: '持续追求诊疗品质', icon: Star },
    ];

    return (
        <div className="page-about">
            {/* Page Hero */}
            <div className="page-hero">
                <div className="container">
                    <h1>关于中心</h1>
                    <p>苏州姑苏优眠医学中心 · Suzhou Gusu Usleep Medical Center</p>
                </div>
            </div>

            {/* Philosophy Section */}
            <section className="section bg-white">
                <div className="container">
                    <div className="about-layout">
                        <div className="about-text-col">
                            <h2 className="about-section-title">办院理念</h2>
                            <div className="about-divider"></div>
                            <p className="about-lead">
                                <strong>苏州姑苏优眠医学中心</strong> 旨在构建"多学科协作（MDT）+ 心理咨询深度融合"体系，同步推进睡眠疾病临床研究与技术转化，形成"筛查 - 诊断 - 干预 - 康复 - 科研"全周期诊疗闭环。
                            </p>
                            <p className="about-body">
                                我们致力于打造以医生与来访者为核心的多元一体化平台，全国范围内首次引进斯坦福加速智能神经调控诊疗模式（SAINT），为大众生命健康节律保驾护航。
                            </p>
                            <div className="slogan-box">
                                <span className="slogan-text">有笑 有爱 有优眠</span>
                            </div>
                        </div>
                        <div className="about-image-col">
                            <div className="about-image-wrapper">
                                <img 
                                    src={getImageUrl('0a502de9b6b26071920a73dc69b143d57ea40da841cdc2325a60b80526c0c795.jpg')} 
                                    alt="优眠医学中心环境" 
                                    className="about-img"
                                />
                                <div className="image-overlay"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section" style={{ background: 'linear-gradient(to bottom, #FFFFFF 0%, var(--color-accent-light) 100%)' }}>
                <div className="container">
                    <div className="section-header">
                        <h2>核心价值</h2>
                        <div className="section-line"></div>
                    </div>
                    <div className="grid grid-cols-4 gap-lg">
                        {values.map((v, i) => (
                            <div key={i} className="value-card">
                                <div className="value-icon-wrap">
                                    <v.icon size={28} strokeWidth={1.5} />
                                </div>
                                <h4>{v.title}</h4>
                                <p>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section bg-white">
                <div className="container">
                    <div className="stats-row">
                        {stats.map((stat, i) => (
                            <div key={i} className="about-stat-card">
                                <div className="about-stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                                    <stat.icon size={28} strokeWidth={1.5} />
                                </div>
                                <div className="about-stat-number">
                                    {stat.number}
                                    {stat.unit && <span className="about-stat-unit">{stat.unit}</span>}
                                </div>
                                <div className="about-stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Honors Section */}
            <section className="section" style={{ background: 'var(--color-accent-light)' }}>
                <div className="container">
                    <div className="section-header">
                        <h2>荣誉资质</h2>
                        <div className="section-line"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-lg">
                        {honors.map((honor, i) => (
                            <div key={i} className="honor-card">
                                <div className="honor-icon-wrap">
                                    <honor.icon size={24} strokeWidth={1.5}/>
                                </div>
                                <span className="honor-title">{honor.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style>{`
                /* About Layout */
                .about-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-xl);
                    align-items: center;
                }
                .about-section-title {
                    font-size: 2rem;
                    color: var(--color-primary);
                    margin-bottom: 0;
                }
                .about-divider {
                    width: 50px;
                    height: 3px;
                    background: linear-gradient(90deg, var(--color-secondary), var(--color-accent));
                    border-radius: 2px;
                    margin: 1rem 0 1.5rem;
                }
                .about-lead {
                    font-size: 1.1rem;
                    color: var(--color-text-main);
                    line-height: 1.8;
                    margin-bottom: 1rem;
                }
                .about-body {
                    color: var(--color-text-secondary);
                    line-height: 1.8;
                    margin-bottom: 2rem;
                }
                .slogan-box {
                    padding: 1.25rem 2rem;
                    background: linear-gradient(135deg, rgba(11, 48, 88, 0.03), rgba(0, 180, 216, 0.05));
                    border-radius: var(--radius-md);
                    border-left: 4px solid var(--color-secondary);
                    display: inline-block;
                }
                .slogan-text {
                    font-family: var(--font-script);
                    font-size: 2rem;
                    color: var(--color-primary);
                    letter-spacing: 0.1em;
                }

                /* Image */
                .about-image-wrapper {
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    box-shadow: var(--shadow-lg);
                    position: relative;
                }
                .about-img {
                    width: 100%;
                    display: block;
                    transition: transform 0.6s ease;
                }
                .about-image-wrapper:hover .about-img {
                    transform: scale(1.03);
                }
                .image-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent 60%, rgba(11,48,88,0.15));
                    pointer-events: none;
                }

                /* Core Values */
                .value-card {
                    text-align: center;
                    padding: 2rem 1.5rem;
                    border-radius: var(--radius-lg);
                    background: rgba(255,255,255,0.8);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(11, 48, 88, 0.06);
                    transition: all var(--transition-normal);
                }
                .value-card:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-md);
                    border-color: transparent;
                }
                .value-icon-wrap {
                    width: 56px;
                    height: 56px;
                    border-radius: var(--radius-md);
                    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                }
                .value-card h4 {
                    font-size: 1.15rem;
                    color: var(--color-primary);
                    margin-bottom: 0.5rem;
                }
                .value-card p {
                    color: var(--color-text-secondary);
                    font-size: 0.9rem;
                }

                /* Stats Row */
                .stats-row {
                    display: flex;
                    justify-content: center;
                    gap: 4rem;
                }
                .about-stat-card {
                    text-align: center;
                }
                .about-stat-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                }
                .about-stat-number {
                    font-size: 3rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    line-height: 1;
                    margin-bottom: 0.5rem;
                }
                .about-stat-unit {
                    font-size: 1.25rem;
                    font-weight: 500;
                    margin-left: 2px;
                }
                .about-stat-label {
                    display: inline-block;
                    background: var(--color-primary);
                    color: white;
                    padding: 0.3rem 1rem;
                    border-radius: var(--radius-full);
                    font-size: 0.875rem;
                    font-weight: 500;
                }

                /* Honors */
                .honor-card {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.5rem 2rem;
                    background: #FFFFFF;
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-sm);
                    transition: all var(--transition-normal);
                    border: 1px solid rgba(11, 48, 88, 0.06);
                }
                .honor-card:hover {
                    transform: translateY(-3px);
                    box-shadow: var(--shadow-md);
                    border-color: var(--color-accent);
                }
                .honor-icon-wrap {
                    width: 44px;
                    height: 44px;
                    min-width: 44px;
                    border-radius: var(--radius-md);
                    background: linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light));
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .honor-title {
                    font-weight: 600;
                    color: var(--color-primary-dark);
                    font-size: 1rem;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .about-layout {
                        grid-template-columns: 1fr;
                        gap: var(--spacing-lg);
                    }
                    .stats-row {
                        gap: 2rem;
                    }
                }
                @media (max-width: 640px) {
                    .stats-row {
                        flex-direction: column;
                        align-items: center;
                        gap: 2rem;
                    }
                    .about-stat-number {
                        font-size: 2.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default About;
