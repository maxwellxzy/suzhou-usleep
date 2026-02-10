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
          transition: background-color 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease;
          background: transparent;
        }

        .header.scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow-sm);
          height: 70px;
        }

        .logo {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--color-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-text-en { font-style: italic; letter-spacing: 1px; }
        .logo-text-cn { font-size: 1.25rem; font-weight: 400; }
        .logo-divider { color: var(--color-secondary); opacity: 0.5; }

        .nav-link {
          font-weight: 500;
          color: var(--color-text-main);
          position: relative;
        }

        .header.scrolled .nav-link { color: var(--color-text-main); }
        .header:not(.scrolled) .nav-link { color: var(--color-text-main); } /* Adjust if hero is dark */

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

        .nav-link:hover::after { width: 100%; }

        .btn-primary {
          background: var(--color-primary);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .btn-primary:hover {
          background: var(--color-primary-dark);
          transform: translateY(-1px);
        }

        .mobile-toggle { display: none; background: none; color: var(--color-text-main); }
        
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
