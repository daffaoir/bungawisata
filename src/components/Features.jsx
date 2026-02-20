import React from 'react';
import { Map, UserCheck, Eye } from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: <Map size={40} />,
            title: "Rute Teroptimasi",
            description: "Hemat waktu perjalanan dengan rute efisien yang disusun oleh ahli travel kami.",
            color: "bg-blue-100 text-blue-600"
        },
        {
            icon: <UserCheck size={40} />,
            title: "Personalized Service",
            description: "Layanan yang disesuaikan dengan preferensi dan gaya liburan Anda.",
            color: "bg-emerald-100 text-emerald-600"
        },
        {
            icon: <Eye size={40} />,
            title: "Hidden Gems",
            description: "Akses eksklusif ke lokasi-lokasi indah yang jarang diketahui turis biasa.",
            color: "bg-amber-100 text-amber-600"
        }
    ];

    return (
        <section className="py-20 bg-slate-50/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-slate-50 flex flex-col items-center text-center group"
                        >
                            <div className={`p-4 rounded-2xl mb-6 ${feature.color} group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
