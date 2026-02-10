import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
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
          /* Padding top to account for fixed header if needed, 
             or handle in Hero section to allow full bleed */
        }
      `}</style>
    </div>
  );
};

export default Layout;
