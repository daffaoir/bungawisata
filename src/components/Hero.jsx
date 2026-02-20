import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1596401057633-565652b5e260?auto=format&fit=crop&q=80&w=2000"
                    alt="Beautiful Bali Landscape"
                    className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center text-white mt-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in-up">
                    <MapPin size={16} className="text-primary-light" />
                    <span className="text-sm font-medium tracking-wide">Jelajahi Keindahan Indonesia</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight drop-shadow-lg">
                    Eksplorasi <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-emerald-200">
                        Tanpa Batas
                    </span>
                </h1>

                <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                    Nikmati perjalanan impian Anda dengan layanan premium.
                    Dari pantai eksotis hingga pegunungan yang menakjubkan.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <a
                        href="#ai-planner"
                        className="group px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center gap-2"
                    >
                        Buat Itinerary AI
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="#tours"
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold text-lg transition-all"
                    >
                        Lihat Paket Wisata
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
            </div>
        </section>
    );
}
