import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AITravelPlanner from './components/AITravelPlanner';
import Features from './components/Features';
import FeaturedTours from './components/FeaturedTours';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans text-slate-900 bg-white">
      <Navbar />
      <Hero />
      <AITravelPlanner />
      <Features />
      <FeaturedTours />
      <div id="contact">
        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
}

export default App;