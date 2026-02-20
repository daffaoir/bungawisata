import React from 'react';
import { Star, Clock, MapPin } from 'lucide-react';

export default function TourCard({ tour }) {
    const formatRupiah = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    {tour.rating}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
                    <MapPin size={16} />
                    {tour.location}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {tour.title}
                </h3>

                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                    <Clock size={16} />
                    {tour.duration}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-400 mb-1">Mulai dari</p>
                        <p className="text-lg font-bold text-primary">
                            {formatRupiah(tour.price)}
                        </p>
                    </div>
                    <button className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-primary transition-colors">
                        Detail
                    </button>
                </div>
            </div>
        </div>
    );
}
