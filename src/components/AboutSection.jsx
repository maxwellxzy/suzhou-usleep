import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="section bg-light-blue">
      <div className="container">
        <div className="about-content grid grid-cols-2 gap-lg items-center">
          <div className="about-text">
            <h2 className="text-3xl font-bold text-primary-dark mb-4">关于中心</h2>
            <div className="divider"></div>
            <p className="text-secondary mb-6">
              苏州姑苏优眠医学中心（Suzhou Gusu Usleep Medical Center）是专注于儿童青少年心理健康、家庭睡眠管理及综合精神心理服务的专业医疗机构。
            </p>
            <p className="text-secondary mb-6">
              中心秉承“构建健康智慧的精神世界，成就身心共济的健康人生”的愿景，汇聚国内顶尖精神心理专家团队，引进斯坦福SAINT等国际前沿诊疗技术。
            </p>
            <div className="values grid grid-cols-2 gap-md">
              <div className="value-item">
                <span className="value-num">01</span>
                <h4>专业引领</h4>
                <p>国家级专家坐诊</p>
              </div>
              <div className="value-item">
                <span className="value-num">02</span>
                <h4>科学循证</h4>
                <p>前沿物理治疗技术</p>
              </div>
              <div className="value-item">
                <span className="value-num">03</span>
                <h4>身心同治</h4>
                <p>多学科联合诊疗</p>
              </div>
              <div className="value-item">
                <span className="value-num">04</span>
                <h4>人文关怀</h4>
                <p>全周期定制服务</p>
              </div>
            </div>
          </div>
          
          <div className="about-image card">
             {/* Placeholder for an environment image or general hospital image */}
             <div className="image-placeholder">
                <span>中心环境展示</span>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        .bg-light-blue { background: linear-gradient(to right, #F0F4F8, #FFFFFF); }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        
        .divider {
          width: 80px;
          height: 4px;
          background: var(--color-primary);
          margin-bottom: 2rem;
        }

        .about-text { padding-right: 2rem; }

        .image-placeholder {
          width: 100%;
          height: 400px;
          background: var(--color-bg-body);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-light);
          border-radius: var(--radius-md);
        }

        .value-item {
          background: white;
          padding: 1rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          transition: transform 0.3s ease;
        }

        .value-item:hover { transform: translateY(-3px); }

        .value-num {
          font-size: 1.5rem;
          font-weight: 700;
          color: alpha(var(--color-primary), 0.1); /* Fallback */
          color: rgba(15, 76, 129, 0.15);
          display: block;
          margin-bottom: 0.25rem;
        }

        .value-item h4 {
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
          color: var(--color-primary-dark);
        }

        .value-item p {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }

        @media (max-width: 900px) {
          .about-content { grid-template-columns: 1fr; }
          .about-text { padding-right: 0; margin-bottom: 2rem; }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
