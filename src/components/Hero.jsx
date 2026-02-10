import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle Class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = `rgba(155, 93, 229, ${Math.random() * 0.5})`; // Lavender
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Initialize Particles
    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(window.innerWidth / 10, 100);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    initParticles();

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(15, 76, 129, ${1 - distance / 150})`; // Primary Blue
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and Draw Particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-content container">
        <h1 className="hero-title fade-in-up">构建健康智慧的精神世界</h1>
        <p className="hero-subtitle fade-in-up delay-100">成就身心共济的健康人生</p>
        <p className="hero-text fade-in-up delay-200">
          苏州姑苏优眠医学中心 —— 一站式守护苏州儿童青少年心理健康，专业解决家庭睡眠管理与精神心理健康需求。
        </p>
        <div className="hero-actions fade-in-up delay-300">
          <button className="btn-primary-lg">了解更多</button>
          <button className="btn-outline-lg">预约专家</button>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          height: 90vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #F8F9FA 0%, #E6E6FA 100%);
          overflow: hidden;
        }

        .hero-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: 0.6;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--color-primary-dark);
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 2rem;
          font-weight: 300;
          color: var(--color-secondary);
          margin-bottom: 2rem;
        }

        .hero-text {
          font-size: 1.1rem;
          color: var(--color-text-secondary);
          margin-bottom: 3rem;
          max-width: 600px;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-primary-lg {
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          background: var(--color-primary);
          color: white;
          border-radius: var(--radius-full);
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .btn-primary-lg:hover {
          transform: translateY(-2px);
          background: var(--color-primary-dark);
        }

        .btn-outline-lg {
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          background: transparent;
          color: var(--color-primary);
          border: 2px solid var(--color-primary);
          border-radius: var(--radius-full);
          transition: all 0.3s ease;
        }

        .btn-outline-lg:hover {
          background: var(--color-primary);
          color: white;
        }

        /* Animations */
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .hero-subtitle { font-size: 1.5rem; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
