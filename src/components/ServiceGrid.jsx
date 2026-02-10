import React from 'react';
import { Moon, Heart, User, Users, Brain, Activity } from 'lucide-react';

const ServiceGrid = () => {
    const services = [
    {
      icon: <Moon size={32} />,
      title: "睡眠障碍诊疗",
      desc: "针对失眠症、睡眠呼吸暂停、昼夜节律紊乱等提供综合诊疗方案。"
    },
    {
      icon: <Brain size={32} />,
      title: "焦虑与抑郁",
      desc: "采用认知行为疗法、药物治疗和物理治疗，有效应对情绪困扰。"
    },
    {
      icon: <User size={32} />,
      title: "青少年心理",
      desc: "关注青春期情绪管理、学业压力及自我成长，提供专业心理疏导。"
    },
    {
      icon: <Activity size={32} />,
      title: "物理治疗",
      desc: "rTMS、tDCS、生物反馈等前沿物理治疗技术，非药物干预首选。"
    },
    {
      icon: <Users size={32} />,
      title: "家庭咨询",
      desc: "改善亲子关系、夫妻关系，促进家庭和谐与沟通。"
    },
    {
      icon: <Heart size={32} />,
      title: "心理咨询",
      desc: "个体咨询、团体咨询，帮助个人提升自我认知与心理健康。"
    }
  ];

  return (
    <section id="services" className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-dark mb-4">全面诊疗服务体系</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            构建"筛查-诊断-干预-康复-科研"全周期诊疗闭环，守护您的身心健康。
          </p>
        </div>

        <div className="grid grid-cols-3 gap-lg">
          {services.map((service, index) => (
            <div key={index} className="service-card card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .service-card {
          text-align: center;
          padding: 3rem 2rem;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .service-card:hover {
          border-color: var(--color-primary-light);
          transform: translateY(-5px);
        }

        .service-icon {
          width: 70px;
          height: 70px;
          margin: 0 auto 1.5rem;
          background: var(--color-bg-body);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--color-primary);
          transition: all 0.3s ease;
        }

        .service-card:hover .service-icon {
          background: var(--color-primary);
          color: white;
        }

        .service-title {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          color: var(--color-primary-dark);
        }

        .service-desc {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
        }
      `}</style>
    </section>
  );
};

export default ServiceGrid;
