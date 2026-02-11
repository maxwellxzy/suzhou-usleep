import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, onOpenBooking }) => {
  return (
    <div className="layout">
      <Header onOpenBooking={onOpenBooking} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      
      <style>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .main-content {
          flex: 1;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Layout;
