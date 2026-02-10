import React from 'react';
import { Brain, Stethoscope, HeartHandshake, ShieldCheck, Activity, Microscope } from 'lucide-react';
import Hero from '../components/Hero';
import ServiceGrid from '../components/ServiceGrid';
import TechnologySection from '../components/TechnologySection';
import ExpertGrid from '../components/ExpertGrid';

const advantages = [
  {
    icon: Brain,
    title: '心理干预优先',
    desc: '国内首创"心理干预为先，技术治疗为辅"的诊疗理念，从根源解决睡眠问题。',
    color: '#00B4D8',
  },
  {
    icon: Stethoscope,
    title: '全周期诊疗',
    desc: '构建"筛查-诊断-干预-康复-科研"五位一体闭环，实现精准个性化治疗。',
    color: '#C59D5F',
  },
  {
    icon: ShieldCheck,
    title: '顶尖专家团队',
    desc: '汇聚国内睡眠医学领域顶级专家，多学科协作保障诊疗效果。',
    color: '#10B981',
  },
];

const stats = [
  { number: '50,000+', label: '累计服务患者', icon: HeartHandshake },
  { number: '98%', label: '患者满意度', icon: Activity },
  { number: '20+', label: '核心专利技术', icon: Microscope },
];

const Home = () => {
  return (
    <>
      <Hero />
      
      {/* Wave Transition from Hero */}
      <div style={{
        marginTop: '-2px',
        lineHeight: 0,
        background: '#fff',
      }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#ffffff"/>
          <path d="M0,20 C360,90 1080,90 1440,20 L1440,80 L0,80 Z" fill="#ffffff" opacity="0.5"/>
        </svg>
      </div>

      {/* Core Advantages */}
      <section className="section bg-white" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="section-header">
            <h2>核心优势</h2>
            <p>
              "心理干预为先，技术治疗为辅"——构建"筛查-诊断-干预-康复-科研"全周期诊疗闭环
            </p>
            <div className="section-line"></div>
          </div>

          <div className="grid grid-cols-3 gap-lg">
            {advantages.map((item, i) => (
              <div key={i} className="advantage-card fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="advantage-icon" style={{ background: `${item.color}15`, color: item.color }}>
                  <item.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="advantage-title">{item.title}</h3>
                <p className="advantage-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="stats-bar">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <stat.icon size={24} className="stat-icon" />
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceGrid />
      <TechnologySection limit={3} showViewAll />
      <ExpertGrid limit={4} showViewAll />

      <style>{`
        .advantage-card {
          text-align: center;
          padding: 2.5rem 2rem;
          border-radius: var(--radius-lg);
          background: var(--color-bg-card);
          border: 1px solid rgba(11, 48, 88, 0.06);
          transition: all var(--transition-normal);
          opacity: 0;
        }
        .advantage-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: transparent;
        }
        .advantage-icon {
          width: 72px;
          height: 72px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          transition: transform var(--transition-normal);
        }
        .advantage-card:hover .advantage-icon {
          transform: scale(1.1);
        }
        .advantage-title {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          color: var(--color-primary);
        }
        .advantage-desc {
          color: var(--color-text-secondary);
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 4rem;
          margin-top: 4rem;
          padding: 2.5rem 3rem;
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
          border-radius: var(--radius-lg);
          position: relative;
          overflow: hidden;
        }
        .stats-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 20% 50%, rgba(0, 180, 216, 0.2) 0%, transparent 50%);
          pointer-events: none;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          position: relative;
          color: #FFFFFF;
        }
        .stat-icon {
          opacity: 0.7;
          margin-bottom: 0.25rem;
        }
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--color-secondary-light);
        }
        .stat-label {
          font-size: 0.875rem;
          opacity: 0.8;
        }

        @media (max-width: 1024px) {
          .stats-bar {
            gap: 2rem;
            padding: 2rem;
          }
        }
        @media (max-width: 640px) {
          .stats-bar {
            flex-direction: column;
            gap: 1.5rem;
            align-items: center;
          }
          .stat-number {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
