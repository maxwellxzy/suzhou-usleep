import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '#home' },
    { name: '专家团队', href: '#experts' },
    { name: '核心技术', href: '#technology' },
    { name: '诊疗服务', href: '#services' },
    { name: '关于中心', href: '#about' },
    { name: '联系我们', href: '#contact' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container flex justify-between items-center">
        <div className="logo">
          <span className="logo-text-en">USLEEP</span>
          <span className="logo-divider">|</span>
          <span className="logo-text-cn">姑苏优眠</span>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="flex gap-md">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link">{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-md">
          <button className="btn-primary flex items-center gap-sm">
            <Phone size={18} />
            <span className="hidden-mobile">预约咨询</span>
          </button>
          
          <button 
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu card">
          <ul className="flex flex-col gap-md">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: all 0.4s ease;
          background: transparent;
        }

        .header.scrolled {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          height: 70px;
        }

        .logo {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.5rem;
          color: white; /* Default White on Dark Hero */
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.4s ease;
        }
        
        .header.scrolled .logo { color: var(--color-primary); }

        .logo-text-en { font-style: italic; letter-spacing: 1px; }
        .logo-text-cn { font-size: 1.25rem; font-weight: 400; }
        .logo-divider { color: var(--color-secondary); opacity: 0.8; }

        .nav-link {
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9); /* White on Dark Hero */
          position: relative;
          transition: color 0.4s ease;
        }

        .header.scrolled .nav-link { color: var(--color-text-main); }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--color-secondary);
          transition: width 0.3s ease;
        }

        .nav-link:hover { color: white; }
        .header.scrolled .nav-link:hover { color: var(--color-primary); }
        .nav-link:hover::after { width: 100%; }

        .btn-primary {
          background: var(--color-secondary); /* Gold Button */
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background: white;
          color: var(--color-primary);
        }
        
        .header.scrolled .btn-primary {
           background: var(--color-primary);
           color: white;
        }
        .header.scrolled .btn-primary:hover {
           background: var(--color-primary-dark);
        }

        .mobile-toggle { display: none; background: none; color: white; }
        .header.scrolled .mobile-toggle { color: var(--color-text-main); }
        
        .mobile-menu {
          position: absolute;
          top: 80px;
          left: var(--spacing-md);
          right: var(--spacing-md);
          background: white;
          padding: var(--spacing-lg);
          border: 1px solid rgba(0,0,0,0.05);
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .mobile-toggle { display: block; }
          .hidden-mobile { display: none; }
        }
      `}</style>
    </header>
  );
};

export default Header;
