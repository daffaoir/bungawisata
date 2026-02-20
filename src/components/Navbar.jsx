import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Compass } from 'lucide-react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Beranda', href: '#' },
        { name: 'Paket Wisata', href: '#tours' },
        { name: 'AI Planner', href: '#ai-planner' },
        { name: 'Kontak', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/80 backdrop-blur-lg shadow-md py-3'
                    : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 group">
                    <div className="bg-primary p-2 rounded-lg text-white group-hover:bg-primary-hover transition-colors">
                        <Compass size={24} />
                    </div>
                    <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-secondary-dark' : 'text-white'}`}>
                        Bunga<span className="text-primary">Wisata</span>
                    </span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`font-medium transition-colors hover:text-primary ${isScrolled ? 'text-secondary' : 'text-white/90 hover:text-white'
                                }`}
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
                    className="md:hidden text-primary"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} color={isScrolled ? '#10b981' : '#ffffff'} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-lg border-t border-slate-100 p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-secondary-dark font-medium py-2 border-b border-slate-100 last:border-0 hover:text-primary transition-colors"
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
