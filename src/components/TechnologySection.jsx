import React from 'react';
import techData from '../data/technology.json';

const TechnologySection = () => {
  const getImageUrl = (imageName) => {
    return new URL(`../assets/images/${imageName}`, import.meta.url).href;
  };

  return (
    <section id="technology" className="section bg-light">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-dark mb-4">核心医疗技术</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            引进斯坦福加速智能神经调控疗法(SAINT)等国际前沿技术，结合科学与创新。
          </p>
        </div>

        <div className="flex flex-col gap-lg">
          {techData.map((tech, index) => (
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

      <style>{`
        .bg-light { background: var(--color-bg-body); }
        .mb-12 { margin-bottom: 3rem; }
        
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
          padding: 0.5rem; /* Inner border style */
          height: 300px;
        }

        .tech-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          .tech-image-wrapper { width: 100%; height: auto; aspect-ratio: 16/9; }
        }
      `}</style>
    </section>
  );
};

export default TechnologySection;
