import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AITravelPlanner from './components/AITravelPlanner';
import Features from './components/Features';
import FeaturedTours from './components/FeaturedTours';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <Navbar />

      <main className="flex-grow pt-20">
        <section id="beranda"><Hero /></section>
        <section id="ai-planner"><AITravelPlanner /></section>
        <section id="features"><Features /></section>
        <section id="paket-wisata"><FeaturedTours /></section>
      </main>

      <footer className="bg-slate-900 text-white py-12 px-4 w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-emerald-400">BungaWisata</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">© 2026 Bunga Wisata Travel. All rights reserved.</p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}