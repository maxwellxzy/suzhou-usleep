import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ExpertGrid from '../components/ExpertGrid';
import TechnologySection from '../components/TechnologySection';
import ServiceGrid from '../components/ServiceGrid';

const Home = () => {
  // Simple scroll spy to activate nav links (optional, for future enhancement)
  useEffect(() => {
    // Add smooth scroll behavior to html
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="home-page">
      <div id="home">
        <Hero />
      </div>

      <div id="about">
        <AboutSection />
      </div>
      
      <div id="services">
        <ServiceGrid />
      </div>

      <div id="technology">
        <TechnologySection />
      </div>
      
      <div id="experts">
        <ExpertGrid />
      </div>

      <section id="contact" className="section bg-primary-light text-white text-center">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4">开始您的健康睡眠之旅</h2>
          <p className="mb-8 max-w-2xl mx-auto opacity-90">
            如果您或您的家人正在遭受睡眠障碍或心理困扰，请立即联系我们。专业的医疗团队随时为您提供帮助。
          </p>
          <button className="btn-white-lg">立即预约咨询</button>
        </div>
        <style>{`
          .bg-primary-light {
            background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
            color: white;
          }
          .btn-white-lg {
            background: white;
            color: var(--color-primary);
            padding: 1rem 2.5rem;
            border-radius: var(--radius-full);
            font-weight: 600;
            font-size: 1.1rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .btn-white-lg:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
        `}</style>
      </section>
    </div>
  );
};

export default Home;
