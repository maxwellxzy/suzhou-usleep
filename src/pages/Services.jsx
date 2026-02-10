import React, { useState, useEffect } from 'react';
import { Moon, Brain, User, Users, Briefcase, Heart, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

const serviceCategories = [
  { id: 'sleep', label: '睡眠问题', icon: Moon },
  { id: 'youth', label: '青少年心理', icon: User },
  { id: 'mood', label: '焦虑与抑郁', icon: Brain },
  { id: 'career', label: '职业与人际', icon: Briefcase },
  { id: 'growth', label: '自我成长', icon: Sparkles },
  { id: 'family', label: '婚姻与家庭', icon: Heart },
  { id: 'process', label: '咨询服务流程', icon: Users },
];

const Services = () => {
  const [activeSection, setActiveSection] = useState('sleep');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="page-services">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <h1>全面诊疗服务体系</h1>
          <p>
            构建"筛查 - 诊断 - 干预 - 康复 - 科研"全周期诊疗闭环，为不同人群提供个性化的心理健康解决方案
          </p>
        </div>
      </div>

      <div className="services-layout container">
        {/* Sidebar */}
        <aside className="services-sidebar">
          <nav className="sidebar-nav">
            <h3 className="sidebar-title">服务导航</h3>
            <ul className="sidebar-list">
              {serviceCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => scrollToSection(cat.id)}
                    className={`sidebar-item ${activeSection === cat.id ? 'active' : ''}`}
                  >
                    <cat.icon size={18} strokeWidth={1.5} />
                    <span>{cat.label}</span>
                    {activeSection === cat.id && <ArrowRight size={14} className="sidebar-arrow" />}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="services-main">
          
          {/* Sleep */}
          <section id="sleep" className="service-section">
            <div className="service-section-header">
              <div className="service-icon-wrap" style={{ background: '#00B4D815', color: '#00B4D8' }}>
                <Moon size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h2>睡眠问题</h2>
                <p className="service-section-sub">专业睡眠障碍诊疗</p>
              </div>
            </div>
            <div className="service-grid">
              {[
                { title: '失眠症', desc: '通过斯坦福加速智能神经调控疗法(SAINT)、经颅磁刺激(TMS)及认知行为疗法(CBT-I)等综合手段，帮助患者快速改善长期失眠。' },
                { title: '睡眠呼吸暂停', desc: '使用睡眠脑电脉氧监测设备和个性化干预方案，解决睡眠呼吸紊乱，改善睡眠质量。' },
                { title: '昼夜节律紊乱', desc: '为长期熬夜或作息不规律的患者提供科学的作息调整和光照疗法。' },
                { title: '不宁腿综合症', desc: '帮助 RLS 患者缓解在休息或夜间时期的腿部不适，减少不自主活动冲动。' },
                { title: '其他睡眠障碍', desc: '包括睡眠行为异常、嗜睡症、夜惊症等，通过多导睡眠监测与综合干预方案进行精准诊治。' },
              ].map((item, i) => (
                <div key={i} className="service-item-card">
                  <CheckCircle size={18} className="service-check" />
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Youth */}
          <section id="youth" className="service-section">
            <div className="service-section-header">
              <div className="service-icon-wrap" style={{ background: '#C59D5F15', color: '#C59D5F' }}>
                <User size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h2>青少年心理</h2>
                <p className="service-section-sub">青少年心理健康支持</p>
              </div>
            </div>
            <div className="service-grid">
              {[
                { title: '情绪管理', desc: '帮助青少年学会管理情绪波动，增强自我认知与情绪调节能力。' },
                { title: '青春期心理支持', desc: '关注叛逆期情绪不稳、自我认同危机等成长困扰。' },
                { title: '学业压力疏导', desc: '为面对学业压力、成绩下滑的青少年提供心理辅导，提升自信与学习状态。' },
              ].map((item, i) => (
                <div key={i} className="service-item-card">
                  <CheckCircle size={18} className="service-check" />
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Anxiety & Depression */}
          <section id="mood" className="service-section">
            <div className="service-section-header">
              <div className="service-icon-wrap" style={{ background: '#10B98115', color: '#10B981' }}>
                <Brain size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h2>焦虑与抑郁</h2>
                <p className="service-section-sub">情绪障碍专业干预</p>
              </div>
            </div>
            <div className="service-card-grid">
              {[
                { title: '焦虑症', desc: '采用认知行为疗法、药物治疗和放松训练等综合手段，有效应对过度焦虑和恐慌。', accent: 'var(--color-accent)' },
                { title: '抑郁症', desc: '提供个性化治疗方案，结合心理治疗与药物干预，帮助患者改善情绪，恢复动力。', accent: 'var(--color-primary)' },
                { title: '强迫症', desc: '通过系统的认知行为治疗(ERP)，帮助患者缓解强迫性思维和行为的困扰。', accent: 'var(--color-secondary)' },
              ].map((item, i) => (
                <div key={i} className="mood-card" style={{ borderTopColor: item.accent }}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Career & Social */}
          <section id="career" className="service-section">
            <div className="service-section-header">
              <div className="service-icon-wrap" style={{ background: '#6366F115', color: '#6366F1' }}>
                <Briefcase size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h2>职业与人际</h2>
                <p className="service-section-sub">职场与社交心理支持</p>
              </div>
            </div>
            <div className="service-grid">
              {[
                { title: '职场压力管理', desc: '针对职场高压环境中的情绪困扰和心理疲劳，提供心理支持和情绪疏导。' },
                { title: '社交焦虑与冲突', desc: '为社交恐惧、回避及人际冲突提供干预，提升沟通技巧与自信。' },
              ].map((item, i) => (
                <div key={i} className="service-item-card">
                  <CheckCircle size={18} className="service-check" />
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Self Growth */}
          <section id="growth" className="service-section">
            <div className="service-section-header">
              <div className="service-icon-wrap" style={{ background: '#F59E0B15', color: '#F59E0B' }}>
                <Sparkles size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h2>自我成长与心理健康</h2>
                <p className="service-section-sub">激发个人潜能，促进心理成长</p>
              </div>
            </div>
            <div className="service-grid">
              {[
                { title: '自我认知与成长', desc: '通过专业心理评估与咨询，帮助来访者深入了解自我人格特质与行为模式，促进个人全面发展。' },
                { title: '情绪调节', desc: '运用认知行为疗法、正念冥想等技术，帮助来访者掌握科学的情绪管理方法，提升心理韧性。' },
                { title: '压力管理', desc: '为职场高压、生活压力大的群体提供系统的压力管理方案，包括放松训练与心理支持。' },
              ].map((item, i) => (
                <div key={i} className="service-item-card">
                  <CheckCircle size={18} className="service-check" />
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Family */}
          <section id="family" className="service-section">
            <div className="service-section-header">
              <div className="service-icon-wrap" style={{ background: '#EF444415', color: '#EF4444' }}>
                <Heart size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h2>婚姻与家庭</h2>
                <p className="service-section-sub">家庭关系与亲子支持</p>
              </div>
            </div>
            <div className="service-card-grid cols-2">
              <div className="mood-card" style={{ borderTopColor: 'var(--color-primary)' }}>
                <h3>夫妻关系</h3>
                <p>帮助夫妻解决关系中的冲突和误解，增强情感连接。</p>
              </div>
              <div className="mood-card" style={{ borderTopColor: 'var(--color-secondary)' }}>
                <h3>亲子关系 / 家庭教育</h3>
                <p>改善亲子沟通模式，为家长提供科学的教育方法和心理支持。</p>
              </div>
            </div>
          </section>

          {/* Process */}
          <section id="process" className="service-section">
            <h2 className="process-title">心理咨询服务流程</h2>
            <div className="process-timeline">
              {[
                { step: 1, title: '初步评估', desc: '问卷与面谈' },
                { step: 2, title: '制定方案', desc: '个性化目标' },
                { step: 3, title: '定期会谈', desc: '深入探讨与支持' },
                { step: 4, title: '进展评估', desc: '回顾与调整' },
                { step: 5, title: '后续支持', desc: '结束后的指导' },
              ].map((item) => (
                <div key={item.step} className="process-step">
                  <div className="process-number">{item.step}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="consult-forms">
              <h3 className="consult-forms-title">咨询形式</h3>
              <div className="service-card-grid cols-3">
                <div className="mood-card" style={{ borderTopColor: 'var(--color-primary)' }}>
                  <h3>个体咨询</h3>
                  <p>一对一深度心理咨询，为来访者提供安全、私密的空间探索内心世界。</p>
                </div>
                <div className="mood-card" style={{ borderTopColor: 'var(--color-secondary)' }}>
                  <h3>家庭咨询</h3>
                  <p>以家庭为单位进行咨询，改善家庭成员间的互动模式与沟通方式。</p>
                </div>
                <div className="mood-card" style={{ borderTopColor: 'var(--color-accent)' }}>
                  <h3>团体咨询</h3>
                  <p>通过团体互动和分享，促进个人成长与社会技能发展。</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style>{`
        /* Layout */
        .services-layout {
          display: flex;
          gap: var(--spacing-xl);
          padding-top: 3rem;
          padding-bottom: 4rem;
        }
        .services-sidebar {
          width: 240px;
          flex-shrink: 0;
        }
        .services-main {
          flex: 1;
          min-width: 0;
        }

        /* Sidebar */
        .sidebar-nav {
          position: sticky;
          top: 6rem;
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(11, 48, 88, 0.06);
          padding: 1.5rem;
        }
        .sidebar-title {
          font-size: 1rem;
          color: var(--color-primary);
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid var(--color-accent-light);
        }
        .sidebar-list {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.65rem 0.75rem;
          border-radius: var(--radius-md);
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          background: transparent;
          transition: all var(--transition-fast);
          text-align: left;
          position: relative;
        }
        .sidebar-item:hover {
          background: var(--color-accent-light);
          color: var(--color-primary);
        }
        .sidebar-item.active {
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
          color: #FFFFFF;
          box-shadow: 0 2px 8px rgba(11, 48, 88, 0.2);
        }
        .sidebar-arrow {
          margin-left: auto;
          opacity: 0.7;
        }

        /* Service Sections */
        .service-section {
          padding-bottom: 3rem;
          margin-bottom: 3rem;
          border-bottom: 1px solid rgba(11, 48, 88, 0.06);
          scroll-margin-top: 6rem;
        }
        .service-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .service-section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .service-section-header h2 {
          font-size: 1.5rem;
          margin-bottom: 0;
        }
        .service-section-sub {
          font-size: 0.85rem;
          color: var(--color-text-light);
          margin-top: 0.15rem;
        }
        .service-icon-wrap {
          width: 52px;
          height: 52px;
          min-width: 52px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Service Item Cards */
        .service-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .service-item-card {
          display: flex;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: #FFFFFF;
          border-radius: var(--radius-md);
          border: 1px solid rgba(11, 48, 88, 0.06);
          transition: all var(--transition-fast);
        }
        .service-item-card:hover {
          border-color: var(--color-accent);
          box-shadow: var(--shadow-sm);
          transform: translateX(4px);
        }
        .service-check {
          color: var(--color-success);
          margin-top: 2px;
          flex-shrink: 0;
        }
        .service-item-card h4 {
          font-size: 1rem;
          color: var(--color-primary);
          margin-bottom: 0.35rem;
        }
        .service-item-card p {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        /* Mood Cards (3-column) */
        .service-card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .service-card-grid.cols-2 {
          grid-template-columns: repeat(2, 1fr);
        }
        .mood-card {
          padding: 1.5rem;
          background: #FFFFFF;
          border-radius: var(--radius-md);
          border: 1px solid rgba(11, 48, 88, 0.06);
          border-top: 3px solid var(--color-primary);
          transition: all var(--transition-normal);
        }
        .mood-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        .mood-card h3 {
          font-size: 1.1rem;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }
        .mood-card p {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        /* Process */
        .process-title {
          text-align: center;
          font-size: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .process-timeline {
          display: flex;
          justify-content: space-between;
          position: relative;
        }
        .process-timeline::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 30px;
          right: 30px;
          height: 2px;
          background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
          opacity: 0.2;
        }
        .process-step {
          text-align: center;
          position: relative;
          flex: 1;
        }
        .process-number {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          margin: 0 auto 0.75rem;
          box-shadow: 0 2px 8px rgba(11, 48, 88, 0.2);
        }
        .process-step h4 {
          font-size: 0.95rem;
          color: var(--color-primary);
          margin-bottom: 0.25rem;
        }
        .process-step p {
          font-size: 0.8rem;
          color: var(--color-text-light);
        }

        /* Responsive */
        .consult-forms {
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px dashed rgba(11, 48, 88, 0.1);
        }
        .consult-forms-title {
          font-size: 1.15rem;
          color: var(--color-primary);
          margin-bottom: 1rem;
          text-align: center;
        }
        .service-card-grid.cols-3 {
          grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 1024px) {
          .services-sidebar {
            display: none;
          }
          .service-card-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .process-timeline {
            flex-direction: column;
            gap: 1.5rem;
            align-items: center;
          }
          .process-timeline::before {
            display: none;
          }
          .service-card-grid.cols-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;
