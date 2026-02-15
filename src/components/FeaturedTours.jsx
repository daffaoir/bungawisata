// src/components/FeaturedTours.jsx
import React from 'react';
import { tours } from '../data/tours';
import TourCard from './TourCard';

const FeaturedTours = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Paket Wisata Populer</h2>
          <p className="text-slate-500">Destinasi pilihan terbaik untuk liburan Anda</p>
        </div>
        <button className="hidden md:block text-primary font-bold hover:underline">
          Lihat Semua Paket →
        </button>
      </div>

      {/* Grid System: 1 Mobile, 2 Tablet, 3-4 Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedTours;