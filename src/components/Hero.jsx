// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image dengan Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=1920&auto=format&fit=crop"
          alt="Candi Borobudur saat matahari terbit"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content Minimalis */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
          Jelajahi Keindahan <br />
          <span className="text-secondary bg-clip-text text-transparent bg-gradient-to-r from-secondary to-teal-400">Indonesia</span> Bersama Kami
        </h1>
        <p className="text-lg md:text-xl text-slate-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Temukan pengalaman wisata tak terlupakan di destinasi terbaik.
          Bunga Wisata siap menemani setiap langkah petualangan Anda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-primary/50 hover:-translate-y-1">
            Lihat Paket Wisata
          </button>
          <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/50 px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-1">
            Hubungi Kami
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;