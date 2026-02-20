import React from 'react';
import TourCard from './TourCard';
import { tours } from '../data/tours';

export default function FeaturedTours() {
    return (
        <section id="tours" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Paket Wisata Populer</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Temukan destinasi terbaik yang telah kami kurasi khusus untuk pengalaman liburan tak terlupakan.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tours.map((tour) => (
                        <TourCard key={tour.id} tour={tour} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="px-8 py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-slate-900 hover:text-white transition-all">
                        Lihat Semua Paket
                    </button>
                </div>
            </div>
        </section>
    );
}
