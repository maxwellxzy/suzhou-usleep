import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-4 gap-lg footer-content">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <h3 className="footer-logo">USLEEP | 姑苏优眠</h3>
            <p className="footer-desc">
              专注儿童青少年心理健康，提供一站式家庭睡眠管理与精神心理健康解决方案。
            </p>
            <p className="copyright">© 2026 Suzhou Gusu Usleep Medical Center.</p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>快速导航</h4>
            <ul className="footer-links">
              <li><Link to="/">首页 Home</Link></li>
              <li><Link to="/team">专家团队 Experts</Link></li>
              <li><Link to="/technology">核心技术 Technology</Link></li>
              <li><Link to="/services">诊疗服务 Services</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
            <div className="footer-col contact-col">
            <h4>联系我们</h4>
            <ul className="contact-list">
              <li>
                <MapPin size={18} />
                <span>江苏省苏州市姑苏区齐溪街899号3幢4F</span>
              </li>
              <li>
                <Phone size={18} />
                <span>0512-66215999 / 18206250907</span>
              </li>
            </ul>
          </div>

          {/* Hours / Map Placeholder */}
          <div className="footer-col">
            <h4>门诊时间</h4>
            <ul className="contact-list">
              <li>
                <Clock size={18} />
                <span>周一至周日: 8:00 - 17:00 (无节假日)</span>
              </li>
            </ul>
            <div className="map-placeholder">
              <span>查看地图</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--color-primary-dark);
          color: white;
          padding: 4rem 0 2rem;
          margin-top: auto;
        }

        .footer h4 { color: white; opacity: 0.9; margin-bottom: 1.5rem; font-size: 1.1rem; }
        .footer-logo { color: white; margin-bottom: 1rem; }
        .footer-desc { color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 2rem; line-height: 1.8; }
        
        .footer-links li { margin-bottom: 0.75rem; }
        .footer-links a { color: rgba(255,255,255,0.7); transition: color 0.3s; }
        .footer-links a:hover { color: var(--color-secondary-light); }
        
        .contact-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: rgba(255,255,255,0.7);
          font-size: 0.9rem;
        }

        .map-placeholder {
          background: rgba(255,255,255,0.1);
          height: 100px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
        }

        .copyright {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
          margin-top: 2rem;
        }
        
        @media (max-width: 768px) {
          .footer-content { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
