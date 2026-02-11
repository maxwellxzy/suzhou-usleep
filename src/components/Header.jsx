import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoImgLight from '../assets/logo2.png';
import logoImgDark from '../assets/logo4.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force scrolled style on non-home pages
  const headerClass = `header ${isScrolled || !isHomePage ? 'scrolled' : ''}`;

  return (
    <header className={headerClass}>
      <div className="container flex justify-between items-center h-full">
        {/* Logo */}
        <Link to="/" className="logo">
          <img 
            src={isScrolled || !isHomePage ? logoImgDark : logoImgLight} 
            alt="USLEEP Logo" 
            className="logo-img" 
          />
          <div className="logo-text">
             <div className="logo-title">苏州姑苏优眠医学中心</div>
             <div className="logo-subtitle">SUZHOU GUSU USLEEP MEDICAL CENTER</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav hidden md:flex items-center gap-lg">
          <Link to="/" className="nav-link">首页</Link>
          <Link to="/about" className="nav-link">关于我们</Link>
          <Link to="/services" className="nav-link">诊疗服务</Link>
          <Link to="/team" className="nav-link">专家团队</Link>
          <Link to="/technology" className="nav-link">前沿技术</Link>
          <Link to="/contact" className="nav-link">就医指南</Link>
          <button className="header-cta">立即预约</button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <nav className="flex flex-col gap-md p-lg">
              <Link to="/" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>首页</Link>
              <Link to="/about" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>关于我们</Link>
              <Link to="/services" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>诊疗服务</Link>
              <Link to="/team" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>专家团队</Link>
              <Link to="/technology" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>前沿技术</Link>
              <Link to="/contact" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>就医指南</Link>
              <button className="header-cta w-full mt-4">立即预约</button>
            </nav>
          </div>
        )}
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 90px;
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
          height: 80px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .logo-img {
          height: 50px;
          transition: height 0.3s ease;
        }
        
        .header.scrolled .logo-img { height: 45px; }

        .logo-text {
          display: flex;
          flex-direction: column;
          min-width: max-content; /* 防止 Logo 文字换行 */
        }

        .logo-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.25rem;
          color: white;
          line-height: 1.2;
          letter-spacing: 1px;
          transition: color 0.4s ease;
          white-space: nowrap; /* 强制不换行 */
        }
        
        .logo-subtitle {
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.5px;
          transition: color 0.4s ease;
          white-space: nowrap; /* 强制不换行 */
        }

        .header.scrolled .logo-title { color: var(--color-primary); }
        .header.scrolled .logo-subtitle { color: var(--color-primary-light); }

        .nav-link {
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          position: relative;
          transition: color 0.4s ease;
          font-size: 1.05rem;
          padding: 0.5rem 0.75rem; /* 稍微减小水平内边距 */
          white-space: nowrap; /* 核心修复：防止导航文字换行 */
        }

        .header.scrolled .nav-link { color: var(--color-text-main); }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 1rem;
          right: 1rem;
          height: 2px;
          background: var(--color-secondary);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .nav-link:hover { color: white; }
        .header.scrolled .nav-link:hover { color: var(--color-primary); }
        .nav-link:hover::after { transform: scaleX(1); }

        .header-cta {
          background: var(--color-secondary);
          color: white;
          padding: 0.6rem 1.8rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
          white-space: nowrap;
        }

        .header-cta:hover {
          background: white;
          color: var(--color-primary);
          transform: translateY(-2px);
        }
        
        .header.scrolled .header-cta {
           background: var(--color-primary);
           color: white;
        }
        .header.scrolled .header-cta:hover {
           background: var(--color-primary-dark);
        }

        .mobile-toggle { display: none; background: none; color: white; border: none; }
        .header.scrolled .mobile-toggle { color: var(--color-text-main); }
        
        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          box-shadow: var(--shadow-lg);
          border-top: 1px solid rgba(0,0,0,0.05);
          animation: slideDown 0.3s ease;
          display: none; /* Default hidden */
        }

        .nav-link-mobile {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--color-text-main);
          padding: 1rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          display: block;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) { /* 将断点从 900px 提升到 1024px，避免平板竖屏下挤压 */
          .desktop-nav { display: none; }
          .mobile-toggle { display: block; }
          .logo-title { font-size: 1.1rem; }
          .logo-subtitle { font-size: 0.5rem; }
          
          /* Only show mobile menu when toggled ON MOBILE */
          .mobile-menu { display: block; } 
        }
      `}</style>
    </header>
  );
};

export default Header;
