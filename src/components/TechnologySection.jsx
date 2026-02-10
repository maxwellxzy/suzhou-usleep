import React from 'react';
import { Search, Zap } from 'lucide-react';
import techData from '../data/technology.json';

const TechnologySection = ({ hideTitle = false, limit, showViewAll }) => {
  const getImageUrl = (imageName) => {
    return new URL(`../assets/images/${imageName}`, import.meta.url).href;
  };

  // 按 category 分组
  const categories = [
    { key: '检测仪器', label: '检测仪器', subtitle: '精准诊断，科学评估', icon: Search },
    { key: '物理治疗仪', label: '物理治疗仪', subtitle: '安全无创，高效康复', icon: Zap },
  ];

  const grouped = categories.map(cat => ({
    ...cat,
    items: techData.filter(t => t.category === cat.key),
  }));

  return (
    <section id="technology" className="section bg-light">
      <div className="container">
        {!hideTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-dark mb-4">核心医疗技术</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              引进斯坦福加速智能神经调控疗法(SAINT)等国际前沿技术，配备11项精密检测与治疗设备。
            </p>
          </div>
        )}



        {limit ? (
            // Limited view (Homepage) - Flattened list without subtitles
            <div className="flex flex-col gap-lg">
                {techData.slice(0, limit).map((tech, index) => (
                    <div key={index} className={`tech-row ${index % 2 === 1 ? 'reverse' : ''}`}>
                        <div className="tech-image-wrapper card">
                            <img src={getImageUrl(tech.image)} alt={tech.name} className="tech-img" loading="lazy" />
                        </div>
                        
                        <div className="tech-content">
                            <h3 className="tech-name">{tech.name}</h3>
                            <div className="tech-divider"></div>
                            <p className="tech-desc">{tech.description}</p>
                            <ul className="tech-features">
                                {tech.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            // Full view (Technology Page) - Grouped by category
            grouped.map((group, gi) => (
            <div key={gi} className="tech-category-block">
                <div className="tech-category-header">
                <div className="tech-category-icon">
                    <group.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                    <h3 className="tech-category-title">{group.label}</h3>
                    <p className="tech-category-subtitle">{group.subtitle}</p>
                </div>
                </div>

                <div className="flex flex-col gap-lg">
                {group.items.map((tech, index) => (
                    <div key={index} className={`tech-row ${index % 2 === 1 ? 'reverse' : ''}`}>
                    <div className="tech-image-wrapper card">
                        <img src={getImageUrl(tech.image)} alt={tech.name} className="tech-img" loading="lazy" />
                    </div>
                    
                    <div className="tech-content">
                        <h3 className="tech-name">{tech.name}</h3>
                        <div className="tech-divider"></div>
                        <p className="tech-desc">{tech.description}</p>
                        <ul className="tech-features">
                        {tech.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                        ))}
                        </ul>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            ))
        )}

        {showViewAll && (
          <div className="text-center mt-12">
            <a href="/technology" className="btn-secondary">
              查看全部技术设备
            </a>
          </div>
        )}
      </div>

      <style>{`
        .bg-light { background: var(--color-bg-body); }
        .mt-12 { margin-top: 3rem; }

        .btn-secondary {
          display: inline-block;
          padding: 0.75rem 2rem;
          border: 1px solid var(--color-text-light);
          border-radius: var(--radius-full);
          background: transparent;
          color: var(--color-text-main);
          transition: all 0.3s ease;
          text-decoration: none;
          font-weight: 500;
        }

        .btn-secondary:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .tech-category-block {
          margin-bottom: 4rem;
        }

        .tech-category-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid rgba(0,0,0,0.06);
        }

        .tech-category-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .tech-category-title {
          font-size: 1.5rem;
          color: var(--color-primary-dark);
          margin-bottom: 0.15rem;
        }

        .tech-category-subtitle {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }
        
        .tech-row {
          display: flex;
          align-items: center;
          gap: 4rem;
        }

        .tech-row.reverse {
          flex-direction: row-reverse;
        }

        .tech-image-wrapper {
          flex: 1;
          padding: 0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .tech-img {
          width: auto;
          max-width: 100%;
          max-height: 500px;
          object-fit: contain;
          border-radius: var(--radius-md);
        }

        .tech-content {
          flex: 1;
        }

        .tech-name {
          font-size: 1.75rem;
          color: var(--color-primary-dark);
          margin-bottom: 1rem;
        }

        .tech-divider {
          width: 60px;
          height: 3px;
          background: var(--color-accent);
          margin-bottom: 1.5rem;
        }

        .tech-desc {
          font-size: 1.1rem;
          color: var(--color-text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        .tech-features {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          list-style: none;
        }

        .tech-features li {
          background: white;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          color: var(--color-primary);
          box-shadow: var(--shadow-sm);
        }

        @media (max-width: 900px) {
          .tech-row, .tech-row.reverse {
            flex-direction: column;
            gap: 2rem;
          }
          .tech-image-wrapper { 
            width: 100%; 
            height: auto; 
          }
          .tech-img {
            max-height: 400px;
          }
        }
      `}</style>
    </section>
  );
};

export default TechnologySection;
