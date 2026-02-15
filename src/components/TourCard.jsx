// src/components/TourCard.jsx
import React from 'react';
import { MapPin, Star } from 'lucide-react';

const TourCard = ({ tour }) => {
  // Helper untuk format Rupiah
  const formatIDR = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="text-accent fill-accent" size={14} />
          <span className="text-xs font-bold text-slate-700">{tour.rating}</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5">
        <div className="flex items-center gap-1 text-slate-400 mb-2">
          <MapPin size={14} />
          <span className="text-xs font-medium uppercase tracking-wider">{tour.location}</span>
        </div>
        
        <h3 className="text-lg font-bold text-slate-800 mb-3 line-clamp-2 h-14 group-hover:text-primary transition-colors">
          {tour.title}
        </h3>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Mulai dari</p>
            <p className="text-lg font-extrabold text-primary">{formatIDR(tour.price)}</p>
          </div>
          <button className="bg-slate-100 hover:bg-primary hover:text-white text-slate-600 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
            Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;