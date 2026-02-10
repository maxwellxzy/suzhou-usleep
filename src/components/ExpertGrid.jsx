import React, { useState } from 'react';
import doctorsData from '../data/doctors.json';

const ExpertGrid = ({ hideTitle = false, limit, showViewAll, bioTruncate = true }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  
  const displayData = limit ? doctorsData.slice(0, limit) : doctorsData.slice(0, visibleCount);

  // Helper to resolve image path
  const getImageUrl = (imageName) => {
    return new URL(`../assets/images/${imageName}`, import.meta.url).href;
  };

  return (
    <section id="experts" className="section bg-white">
      <div className="container">
        {!hideTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-dark mb-4">顶尖专家团队</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              汇聚国家级精神心理科专家，平均从业经验超过30年，提供精准、高效的诊疗方案。
            </p>
          </div>
        )}

        <div className="grid grid-cols-4 gap-lg">
          {displayData.map((doc, index) => (
            <div key={index} className="expert-card card">
              <div className="expert-img-wrapper">
                <img 
                  src={getImageUrl(doc.image)} 
                  alt={doc.name} 
                  className="expert-img"
                  loading="lazy"
                />
              </div>
              <div className="expert-info">
                <h3 className="expert-name">{doc.name}</h3>
                <p className="expert-title">{doc.title}</p>
                <div className="expert-tags">
                  {doc.specialty.slice(0, 3).map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
                <p className={`expert-bio ${bioTruncate ? 'line-clamp-3' : ''}`}>{doc.bio}</p>
              </div>
            </div>
          ))}
        </div>



        {showViewAll ? (
          <div className="text-center mt-12">
            <a href="/team" className="btn-secondary">
              查看更多专家
            </a>
          </div>
        ) : (
          visibleCount < doctorsData.length && !limit && (
            <div className="text-center mt-12">
              <button 
                className="btn-secondary"
                onClick={() => setVisibleCount(prev => prev + 4)}
              >
                查看更多专家
              </button>
            </div>
          )
        )}
      </div>

      <style>{`
        .bg-white { background: white; }
        .mb-12 { margin-bottom: 3rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mt-12 { margin-top: 3rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .max-w-2xl { max-width: 42rem; }
        .text-3xl { font-size: 2rem; }

        .expert-card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .expert-img-wrapper {
          height: 220px;
          overflow: hidden;
          background: #f0f0f0;
        }

        .expert-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          transition: transform 0.5s ease;
        }

        .expert-card:hover .expert-img {
          transform: scale(1.05);
        }

        .expert-info {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .expert-name {
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
          color: var(--color-primary);
        }

        .expert-title {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .expert-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .tag {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          background: var(--color-bg-body);
          color: var(--color-primary);
          border-radius: var(--radius-sm);
        }

        .expert-bio {
          font-size: 0.9rem;
          color: var(--color-text-light);
          line-height: 1.5;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .btn-secondary {
          display: inline-block;
          padding: 0.75rem 2rem;
          border: 1px solid var(--color-text-light);
          border-radius: var(--radius-full);
          background: transparent;
          color: var(--color-text-main);
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn-secondary:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
      `}</style>
    </section>
  );
};

export default ExpertGrid;
