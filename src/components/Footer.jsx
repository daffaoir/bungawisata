import React from 'react';
import { Compass, Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white py-12 w-full">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4 text-white">
                            <Compass size={32} className="text-primary" />
                            <span className="text-2xl font-bold">Bunga<span className="text-primary">Wisata</span></span>
                        </div>
                        <p className="text-sm leading-relaxed mb-4 text-slate-300">
                            Mitra perjalanan terpercaya Anda unuk menjelajahi keindahan Indonesia dengan kenyamanan dan layanan premium.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Tautan Cepat</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li><a href="/" className="hover:text-primary transition-colors">Beranda</a></li>
                            <li><a href="/#tours" className="hover:text-primary transition-colors">Paket Wisata</a></li>
                            <li><a href="/#ai-planner" className="hover:text-primary transition-colors">AI Planner</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Tentang Kami</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Dukungan</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li><a href="#" className="hover:text-primary transition-colors">Pusat Bantuan</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Hubungi Kami</h4>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li className="flex items-center gap-2">
                                <MapPin size={16} className="text-primary shrink-0" />
                                <span>Jl. Pariwisata No. 1, Denpasar, Bali</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={16} className="text-primary shrink-0" />
                                <span>+62 812 3456 7890</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} className="text-primary shrink-0" />
                                <span>halo@bungawisata.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Bunga Wisata. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
