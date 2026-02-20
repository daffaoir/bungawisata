import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TourDetail from './pages/TourDetail';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans text-slate-900 bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tour/:id" element={<TourDetail />} />
        </Routes>
        <div id="contact">
          <Footer />
        </div>
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}

export default App;