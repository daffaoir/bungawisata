import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { tours } from '../data/tours';
import { ArrowLeft, MapPin, Clock, Star, Phone } from 'lucide-react';

export default function TourDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const tour = tours.find((t) => t.id === parseInt(id));

    if (!tour) {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-slate-800">
                <h2 className="text-2xl font-bold mb-4">Paket Wisata Tidak Ditemukan</h2>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                >
                    Kembali ke Beranda
                </button>
            </div>
        );
    }

    const formatRupiah = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Image Section */}
            <div className="relative h-[60vh] w-full">
                <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Back Button */}
                <Link
                    to="/"
                    className="absolute top-24 left-4 md:left-8 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full flex items-center gap-2 hover:bg-white/30 transition-all font-medium"
                >
                    <ArrowLeft size={18} /> Kembali
                </Link>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                    <div className="container mx-auto">
                        <div className="flex items-center gap-2 mb-3 text-emerald-300 font-medium">
                            <MapPin size={20} />
                            {tour.location}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{tour.title}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-sm md:text-base">
                            <span className="flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full"><Clock size={16} /> {tour.duration}</span>
                            <span className="flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full"><Star size={16} className="text-yellow-400 fill-yellow-400" /> {tour.rating} / 5.0</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Deskripsi Paket</h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Nikmati keindahan {tour.title} yang memukau. Paket ini dirancang khusus untuk memberikan pengalaman liburan terbaik dengan fasilitas premium dan pelayanan yang ramah. Jelajahi spot-spot ikonik dan nikmati momen tak terlupakan bersama orang tersayang.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Fasilitas Termasuk</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {['Transportasi AC Premium', 'Akomodasi Hotel Bintang 4', 'Makan 3x Sehari', 'Tiket Masuk Wisata', 'Guide Profesional', 'Dokumentasi Perjalanan'].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-slate-700">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Booking Card */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 sticky top-28">
                        <p className="text-slate-500 mb-1">Harga Mulai Dari</p>
                        <div className="text-3xl font-bold text-slate-900 mb-6">{formatRupiah(tour.price)}<span className="text-sm font-normal text-slate-500">/pax</span></div>

                        <a
                            href={`https://wa.me/6281234567890?text=Halo, saya ingin memesan paket wisata ${tour.title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-green-500/30 mb-4"
                        >
                            <Phone size={20} />
                            Booking via WhatsApp
                        </a>

                        <p className="text-xs text-center text-slate-400">
                            *Harga dapat berubah sewaktu-waktu sesuai musim liburan.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
