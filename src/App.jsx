import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BookingModal from './components/BookingModal';

// Lazy Load Pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Team = React.lazy(() => import('./pages/Team'));
const Technology = React.lazy(() => import('./pages/Technology'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Questionnaire = React.lazy(() => import('./pages/Questionnaire'));

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <Router>
      <Layout onOpenBooking={openBooking}>
        <Suspense fallback={
          <div className="flex justify-center items-center h-screen text-primary">
            Loading...
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home onOpenBooking={openBooking} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/contact" element={<Contact onOpenBooking={openBooking} />} />
            <Route path="/questionnaire/:shareCode" element={<Questionnaire />} />
          </Routes>
        </Suspense>
      </Layout>
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </Router>
  );
}

export default App;

