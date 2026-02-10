import React, { useEffect } from 'react';
import { Users, Award, Brain, Clock } from 'lucide-react';
import ExpertGrid from '../components/ExpertGrid';

const teamStats = [
  { icon: Users, number: '15+', label: '专家团队', color: '#00B4D8' },
  { icon: Award, number: '30+', label: '年均经验', color: '#C59D5F' },
  { icon: Brain, number: '8', label: '专业领域', color: '#10B981' },
  { icon: Clock, number: '24h', label: '服务保障', color: '#6366F1' },
];

const Team = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-team">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <h1>专家团队</h1>
          <p>汇聚以吴爱勤院长为代表的国家级、教授级专家，平均从业经验超过30年</p>
        </div>
      </div>

      {/* Team Stats */}
      <section className="section bg-white">
        <div className="container">
          <div className="team-stats-grid">
            {teamStats.map((stat, i) => (
              <div key={i} className="team-stat-card">
                <div className="team-stat-icon" style={{ background: `${stat.color}12`, color: stat.color }}>
                  <stat.icon size={28} strokeWidth={1.5} />
                </div>
                <div className="team-stat-number">{stat.number}</div>
                <div className="team-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert List */}
      <ExpertGrid hideTitle={true} />

      <style>{`
        .team-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-lg);
          max-width: 800px;
          margin: 0 auto;
        }
        .team-stat-card {
          text-align: center;
          padding: 1.5rem 1rem;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(11, 48, 88, 0.06);
          transition: all var(--transition-normal);
        }
        .team-stat-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: transparent;
        }
        .team-stat-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        .team-stat-number {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--color-primary);
          line-height: 1;
          margin-bottom: 0.35rem;
        }
        .team-stat-label {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        @media (max-width: 640px) {
          .team-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default Team;
