import React, { useEffect } from 'react';
import { MapPin, Phone, Clock, Mail, Bus, Train, Car, CalendarCheck } from 'lucide-react';

const contactInfo = [
    { icon: MapPin, title: '医院地址', content: '江苏省苏州市姑苏区齐溪街899号3幢4F', color: '#00B4D8' },
    { icon: Phone, title: 'VIP预约', content: '0512-66215999', color: '#C59D5F' },
    { icon: Phone, title: '咨询热线', content: '18206250907', color: '#EF4444' },
    { icon: Clock, title: '门诊时间', content: '周一至周日: 8:00 - 17:00 (无节假日)', color: '#10B981' },
];

const trafficGuide = [
    { icon: Train, title: '地铁路线', desc: '地铁2号线平泻路东下车平泻路出口；地铁4号线平泻路西下车3号出口。', color: '#00B4D8' },
    { icon: Bus, title: '公交路线', desc: '8支线、9013、9013支线、9035路苏大附一院总院下车；36、980、9025路平海路人民路西下车。', color: '#10B981' },
    { icon: Car, title: '自驾停车', desc: '导航至姑苏区齐溪街899号地下停车库，根据指示牌指引乘坐电梯上4楼。', color: '#C59D5F' },
];

const Contact = ({ onOpenBooking }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-contact">
            {/* Page Hero */}
            <div className="page-hero">
                <div className="container">
                    <h1>就医指南</h1>
                    <p>我们期待您的来访，为您提供最优质的医疗服务</p>
                </div>
            </div>

            {/* Contact Info Cards */}
            <section className="section bg-white">
                <div className="container">
                    <div className="contact-grid">
                        {contactInfo.map((info, i) => (
                            <div key={i} className="contact-info-card">
                                <div className="contact-icon" style={{ background: `${info.color}12`, color: info.color }}>
                                    <info.icon size={24} strokeWidth={1.5} />
                                </div>
                                <h4>{info.title}</h4>
                                <p>{info.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map & Traffic Guide */}
            <section className="section" style={{ background: 'var(--color-accent-light)' }}>
                <div className="container">
                    <div className="section-header">
                        <h2>交通指引</h2>
                        <div className="section-line"></div>
                    </div>
                    <div className="contact-map-layout">
                        {/* Traffic Cards */}
                        <div className="traffic-cards">
                            {trafficGuide.map((guide, i) => (
                                <div key={i} className="traffic-card">
                                    <div className="traffic-icon" style={{ background: `${guide.color}15`, color: guide.color }}>
                                        <guide.icon size={22} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4>{guide.title}</h4>
                                        <p>{guide.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Map Area */}
                        <div className="map-wrapper">
                            <div className="map-container">
                                <div className="map-placeholder">
                                    <div className="map-pin-animation">
                                        <MapPin size={40} strokeWidth={1.5} />
                                    </div>
                                    <p className="map-label">苏州姑苏优眠医学中心</p>
                                    <span className="map-sublabel">姑苏区齐溪街899号3幢4F</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="contact-cta">
                <div className="container text-center">
                    <h2>准备好预约了吗？</h2>
                    <p>专业团队随时为您提供咨询和帮助</p>
                    <div className="cta-actions">
                        <a href="tel:051266215999" className="btn-primary">
                            <Phone size={18} /> 电话预约
                        </a>
                        <button className="btn-outline cta-online" onClick={onOpenBooking}>
                            <CalendarCheck size={18} /> 在线预约
                        </button>
                    </div>
                </div>
            </section>

            <style>{`
                /* Contact Grid */
                .contact-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: var(--spacing-lg);
                }
                .contact-info-card {
                    text-align: center;
                    padding: 2rem 1.5rem;
                    border-radius: var(--radius-lg);
                    border: 1px solid rgba(11, 48, 88, 0.06);
                    background: #FFFFFF;
                    transition: all var(--transition-normal);
                }
                .contact-info-card:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-md);
                    border-color: transparent;
                }
                .contact-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: var(--radius-md);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                }
                .contact-info-card h4 {
                    font-size: 1rem;
                    color: var(--color-primary);
                    margin-bottom: 0.5rem;
                }
                .contact-info-card p {
                    font-size: 0.9rem;
                    color: var(--color-text-secondary);
                }

                /* Map & Traffic Layout */
                .contact-map-layout {
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    gap: var(--spacing-xl);
                    align-items: start;
                }
                .traffic-cards {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .traffic-card {
                    display: flex;
                    gap: 1rem;
                    padding: 1.25rem 1.5rem;
                    background: #FFFFFF;
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-sm);
                    transition: all var(--transition-fast);
                }
                .traffic-card:hover {
                    transform: translateX(4px);
                    box-shadow: var(--shadow-md);
                }
                .traffic-icon {
                    width: 44px;
                    height: 44px;
                    min-width: 44px;
                    border-radius: var(--radius-md);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .traffic-card h4 {
                    font-size: 0.95rem;
                    color: var(--color-primary);
                    margin-bottom: 0.25rem;
                }
                .traffic-card p {
                    font-size: 0.85rem;
                    color: var(--color-text-secondary);
                    line-height: 1.5;
                }

                /* Map */
                .map-wrapper {
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    box-shadow: var(--shadow-md);
                }
                .map-container {
                    background: linear-gradient(135deg, #e8f4f8, #f0f4ff);
                    min-height: 320px;
                    position: relative;
                }
                .map-placeholder {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }
                .map-pin-animation {
                    color: var(--color-primary);
                    animation: bounce 2s ease-in-out infinite;
                }
                .map-label {
                    font-weight: 700;
                    color: var(--color-primary);
                    font-size: 1rem;
                }
                .map-sublabel {
                    font-size: 0.85rem;
                    color: var(--color-text-light);
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                /* CTA */
                .contact-cta {
                    padding: 4rem 0;
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
                    color: #FFFFFF;
                    position: relative;
                    overflow: hidden;
                }
                .contact-cta::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 70% 30%, rgba(0, 180, 216, 0.2), transparent 60%);
                    pointer-events: none;
                }
                .contact-cta h2 {
                    color: #FFFFFF;
                    font-size: 2rem;
                    margin-bottom: 0.75rem;
                    position: relative;
                }
                .contact-cta p {
                    opacity: 0.8;
                    margin-bottom: 2rem;
                    font-size: 1.05rem;
                    position: relative;
                }
                .cta-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    position: relative;
                }
                .cta-online {
                    color: #FFFFFF;
                    border-color: rgba(255,255,255,0.5);
                }
                .cta-online:hover {
                    background: rgba(255,255,255,0.15);
                    border-color: rgba(255,255,255,0.8);
                    color: #FFFFFF;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .contact-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .contact-map-layout {
                        grid-template-columns: 1fr;
                    }
                }
                @media (max-width: 640px) {
                    .contact-grid {
                        grid-template-columns: 1fr;
                    }
                    .cta-actions {
                        flex-direction: column;
                        align-items: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default Contact;
