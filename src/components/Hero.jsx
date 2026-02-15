import React from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://placehold.co/1200x800/0284c7/ffffff?text=Eksplor+Keindahan+Indonesia" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
          Temukan Pengalaman <br /> 
          <span className="text-secondary">Wisata Lokal</span> Terbaik
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 font-medium">
          Jelajahi keajaiban Jogja, Bali, hingga Semarang dengan paket tour eksklusif dari Bunga Wisata.
        </p>

        {/* Floating Search Box */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-4 items-center">
          {/* Destinasi */}
          <div className="w-full flex items-center gap-3 border-b md:border-b-0 md:border-r border-slate-200 pb-3 md:pb-0 md:pr-4">
            <MapPin className="text-primary shrink-0" size={24} />
            <div className="text-left w-full">
              <label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Destinasi</label>
              <input 
                type="text" 
                placeholder="Mau ke mana?" 
                className="w-full text-slate-700 font-semibold focus:outline-none placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Tanggal */}
          <div className="w-full flex items-center gap-3 border-b md:border-b-0 md:border-r border-slate-200 pb-3 md:pb-0 md:pr-4">
            <Calendar className="text-primary shrink-0" size={24} />
            <div className="text-left w-full">
              <label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Tanggal</label>
              <input 
                type="date" 
                className="w-full text-slate-700 font-semibold focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Peserta */}
          <div className="w-full flex items-center gap-3 md:pr-4">
            <Users className="text-primary shrink-0" size={24} />
            <div className="text-left w-full">
              <label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Peserta</label>
              <select className="w-full text-slate-700 font-semibold focus:outline-none bg-transparent">
                <option>2 Orang</option>
                <option>3-5 Orang</option>
                <option>Grup Besar</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button className="w-full md:w-auto bg-accent hover:bg-orange-600 text-white p-4 md:p-5 rounded-xl transition-all flex items-center justify-center gap-2 font-bold shadow-lg shadow-accent/30">
            <Search size={24} />
            <span className="md:hidden">Cari Paket</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;