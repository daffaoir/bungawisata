// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image dengan Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://placehold.co/1200x800/0284c7/ffffff?text=Bunga+Wisata+Indonesia" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20"></div>
      </div>

      {/* Content Minimalis */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Solusi Perjalanan Wisata <br /> 
          <span className="text-secondary">Terbaik di Indonesia</span>
        </h1>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Nikmati kemudahan merencanakan liburan impian Anda bersama Bunga Wisata. 
          Aman, Terpercaya, dan Menyenangkan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg">
            Lihat Paket Wisata
          </button>
          <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/50 px-8 py-3 rounded-full font-bold transition-all">
            Hubungi Kami
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;