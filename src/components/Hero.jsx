import React, { useEffect, useRef } from 'react';

const Hero = ({ onOpenBooking }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let lines = [];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      lines = [];
      const lineCount = 15;
      for (let i = 0; i < lineCount; i++) {
        lines.push({
          y: height * 0.5 + (Math.random() - 0.5) * height * 0.5,
          amplitude: Math.random() * 50 + 20,
          frequency: Math.random() * 0.01 + 0.005,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.01,
          color: `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`
        });
      }
    };

    window.addEventListener('resize', init);
    init();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      lines.forEach(line => {
        ctx.beginPath();
        for (let x = 0; x < width; x+=5) {
          const y = line.y + Math.sin(x * line.frequency + line.phase) * line.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        line.phase += line.speed;
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-content container">
        <h1 className="hero-title fade-in-up">构建健康智慧的精神世界</h1>
        <p className="hero-subtitle fade-in-up delay-100">成就身心共济的健康人生</p>
        <div className="hero-divider fade-in-up delay-200"></div>
        <p className="hero-text fade-in-up delay-200">
          苏州姑苏优眠医学中心 —— 一站式守护苏州儿童青少年心理健康，专业解决家庭睡眠管理与精神心理健康需求。
        </p>
        <div className="hero-actions fade-in-up delay-300">
          <button className="btn-gold-lg" onClick={onOpenBooking}>立即预约咨询</button>
          <button className="btn-outline-white">了解更多</button>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          height: 100vh;
          min-height: 700px;
          display: flex;
          align-items: center;
          background-color: var(--color-primary); /* Deep Navy */
          background-image: radial-gradient(circle at 50% 50%, #0F3A66 0%, var(--color-primary) 100%);
          color: white;
          overflow: hidden;
        }

        .hero-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 900px;
          padding-top: 60px; /* Offset for fixed header */
        }

        .hero-title {
          font-family: var(--font-heading);
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.1;
          background: linear-gradient(to right, #FFFFFF, #E0E0E0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 2rem;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          letter-spacing: 2px;
        }
        
        .hero-divider {
          width: 80px;
          height: 4px;
          background: var(--color-secondary); /* Gold */
          margin-bottom: 2rem;
        }

        .hero-text {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 3.5rem;
          max-width: 650px;
          line-height: 1.8;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
        }

        .btn-gold-lg {
          padding: 1rem 3rem;
          font-size: 1.1rem;
          background: var(--color-secondary);
          color: white;
          border-radius: var(--radius-full);
          font-weight: 600;
          transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 15px rgba(197, 157, 95, 0.4);
        }

        .btn-gold-lg:hover {
          transform: translateY(-2px);
          background: #D4A017; /* Brighter gold */
          box-shadow: 0 6px 20px rgba(197, 157, 95, 0.6);
        }

        .btn-outline-white {
          padding: 1rem 3rem;
          font-size: 1.1rem;
          background: transparent;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: var(--radius-full);
          transition: all 0.3s ease;
        }

        .btn-outline-white:hover {
          background: white;
          color: var(--color-primary);
          border-color: white;
        }

        /* Animations */
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .delay-100 { animation-delay: 0.2s; }
        .delay-200 { animation-delay: 0.4s; }
        .delay-300 { animation-delay: 0.6s; }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.8rem; }
          .hero-subtitle { font-size: 1.5rem; }
          .hero-actions { flex-direction: column; width: 100%; }
          .btn-gold-lg, .btn-outline-white { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
