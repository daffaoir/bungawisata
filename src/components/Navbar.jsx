import React, { useState } from 'react';
import { Menu, X, Phone, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Beranda', href: '/#beranda' },
        { name: 'Paket Wisata', href: '/#paket-wisata' },
        { name: 'AI Planner', href: '/#ai-planner' },
        { name: 'Kontak', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 max-w-7xl h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-primary p-2 rounded-lg text-white group-hover:bg-primary-hover transition-colors">
                        <Compass size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-slate-800">
                        Bunga<span className="text-primary">Wisata</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-medium text-slate-600 hover:text-primary transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="https://wa.me/6281234567890"
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
                    >
                        <Phone size={18} />
                        Pesan Sekarang
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-800"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100 p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-slate-700 font-medium py-2 border-b border-slate-100 last:border-0 hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="https://wa.me/6281234567890"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl font-bold"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <Phone size={20} />
                        Hubungi Kami
                    </a>
                </div>
            )}
        </nav>
    );
}
