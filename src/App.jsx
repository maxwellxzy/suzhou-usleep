import React, { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import { Loader } from 'lucide-react';

// Lazy load heavy page components
const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <Layout>
      <Suspense fallback={
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Loader className="animate-spin text-primary" size={48} />
          <style>{`
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .animate-spin { animation: spin 1s linear infinite; }
          `}</style>
        </div>
      }>
        <Home />
      </Suspense>
    </Layout>
  );
}

export default App;
