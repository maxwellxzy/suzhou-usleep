import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="section bg-gradient">
      <div className="container">
        {/* Intro */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">医学中心简介</h2>
          <p className="text-secondary opacity-80 uppercase tracking-widest text-sm mb-6">Introduction to Suzhou Gusu Usleep Medical Center</p>
          <div className="divider-center"></div>
        </div>

        <div className="about-content grid grid-cols-2 gap-xl items-center mb-16">
          <div className="about-text">
            <p className="text-main mb-6 leading-relaxed">
              <strong className="text-primary text-lg">苏州姑苏优眠医学中心</strong> 打造以医生与来访者为核心的多元一体化平台，全国范围内首次引进的斯坦福加速智能神经调控诊疗模式，精准靶点高效治疗精神心理疾病。
            </p>
            <p className="text-secondary mb-8 leading-relaxed">
              中心拥有专业的心理诊疗团队，针对各类心理困扰提供个性化的咨询服务及预防干预；拥有AI智能深度睡眠产品，通过环境优化与心理疏导，重塑健康睡眠。
            </p>
            
            <div className="slogan-box">
               <span className="handwriting-font">有笑 有爱 有优眠</span>
            </div>
          </div>
          
          <div className="about-image-wrapper">
             {/* Placeholder for brochure image p1.jpg or similar */}
             <div className="image-placeholder rounded-lg">
                <span>Center Environment</span>
             </div>
          </div>
        </div>

        {/* Stats Section - Brochure Page 3 */}
        <div className="stats-grid grid grid-cols-3 gap-lg">
          <div className="stat-card">
            <div className="stat-number">5</div>
            <div className="stat-label">五优服务</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">7</div>
            <div className="stat-label">七大品质</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">30<span className="stat-unit">年</span></div>
            <div className="stat-label">从业经验</div>
          </div>
        </div>
      </div>

      <style>{`
        .bg-gradient { background: linear-gradient(to bottom, #FFFFFF 0%, var(--color-accent-light) 100%); }
        .gap-xl { gap: 4rem; }
        .mb-12 { margin-bottom: 3rem; }
        .mb-16 { margin-bottom: 4rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        
        .divider-center {
          width: 60px;
          height: 4px;
          background: var(--color-secondary);
          margin: 0 auto;
          border-radius: var(--radius-full);
        }

        .text-main { color: var(--color-text-main); font-size: 1.1rem; }
        
        .handwriting-font {
          font-family: var(--font-script);
          font-size: 2.5rem;
          color: var(--color-primary);
          transform: rotate(-3deg);
          display: inline-block;
        }

        .image-placeholder {
          width: 100%;
          height: 360px;
          background: var(--color-primary);
          opacity: 0.05;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          border: 2px dashed var(--color-primary);
        }
        
        .rounded-lg { border-radius: var(--radius-lg); }

        /* Stats Styling */
        .stats-grid {
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .stat-card {
           position: relative;
        }
        
        /* Add dividers between stats if needed, simplified here */
        
        .stat-number {
          font-size: 5rem;
          font-weight: 700;
          color: var(--color-primary); /* Brochure uses Blue for 5, 7, 30 */
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-unit {
          font-size: 1.5rem;
          margin-left: 0.25rem;
        }

        .stat-label {
          background: var(--color-primary);
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: var(--radius-full);
          display: inline-block;
          font-size: 1.1rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .about-content { grid-template-columns: 1fr; gap: 2rem; }
          .stats-grid { grid-template-columns: 1fr; gap: 3rem; }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
