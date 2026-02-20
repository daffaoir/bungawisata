import React, { useState } from 'react';
import { Sparkles, Map, Calendar, Loader2 } from 'lucide-react';

export default function AITravelPlanner() {
    const [destination, setDestination] = useState('');
    const [duration, setDuration] = useState(3);
    const [plan, setPlan] = useState('');
    const [loading, setLoading] = useState(false);

    const generatePlan = async () => {
        if (!destination) return;
        setLoading(true);
        setPlan('');

        try {
            const prompt = `Buatkan itinerary wisata ${duration} hari di ${destination} yang santai tapi berkesan. Berikan rekomendasi spesifik untuk pagi, siang, dan malam. Sertakan estimasi budget per hari. Format output menggunakan Markdown. Tulis dalam Bahasa Indonesia yang ramah.`;
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                }
            );

            const data = await response.json();
            if (data.candidates && data.candidates[0].content) {
                setPlan(data.candidates[0].content.parts[0].text);
            } else {
                setPlan('Maaf, saya sedang istirahat sebentar. Coba lagi nanti ya!');
            }
        } catch (error) {
            console.error("Error generating plan:", error);
            setPlan('Terjadi kesalahan koneksi. Pastikan API Key sudah benar.');
        }
        setLoading(false);
    };

    return (
        <section id="ai-planner" className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium mb-4">
                        <Sparkles size={16} />
                        <span>Powered by Gemini AI</span>
                    </div>
                    <h2 className="text-4xl font-bold text-slate-800 mb-4">Rencanakan Liburan Impian</h2>
                    <p className="text-slate-600 max-w-xl mx-auto">
                        Biarkan AI kami membuatkan itinerary personal untuk petualangan Anda berikutnya dalam hitungan detik.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                    <div className="p-8 md:p-10 grid md:grid-cols-2 gap-8">
                        {/* Input Section */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <Map size={18} className="text-primary" />
                                    Tujuan Destinasi
                                </label>
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Contoh: Bali, Lombok, Yogyakarta"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <Calendar size={18} className="text-primary" />
                                    Durasi Liburan (Hari)
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[2, 3, 5, 7].map((d) => (
                                        <button
                                            key={d}
                                            onClick={() => setDuration(d)}
                                            className={`py-2 rounded-lg font-medium transition-all ${duration === d
                                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                        >
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={generatePlan}
                                disabled={loading || !destination}
                                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-lg"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" /> Sedang Meracik Itinerary...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles /> Buat Rencana Perjalanan
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Result Section */}
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 h-[400px] overflow-y-auto custom-scrollbar">
                            {plan ? (
                                <div className="prose prose-sm prose-slate max-w-none">
                                    <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                                        <Map size={20} /> Itinerary untuk {destination}
                                    </h3>
                                    <div className="whitespace-pre-line text-slate-700 leading-relaxed font-medium">
                                        {plan}
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                                    <Sparkles size={48} className="mb-4 opacity-20" />
                                    <p>Masukkan tujuan dan durasi,<br />lalu biarkan magic terjadi!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
