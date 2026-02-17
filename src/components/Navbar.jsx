import React, { useState, useEffect } from 'react';
import { Menu, X, Palmtree } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#' },
    { name: 'Paket Wisata', href: '#' },
    { name: 'Sewa Mobil', href: '#' },
    { name: 'Kontak', href: '#' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg transition-colors ${isScrolled ? 'bg-primary' : 'bg-white/20 backdrop-blur-sm'}`}>
              <Palmtree className={`${isScrolled ? 'text-white' : 'text-white'}`} size={24} />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-primary' : 'text-white'}`}>
              Bunga<span className={isScrolled ? 'text-secondary' : 'text-white'}>Wisata</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors ${isScrolled
                    ? 'text-slate-600 hover:text-primary'
                    : 'text-white/90 hover:text-white'
                  }`}
              >
                {link.name}
              </a>
            ))}
            <button className={`px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${isScrolled
                ? 'bg-primary text-white hover:bg-primary-hover'
                : 'bg-white text-primary hover:bg-slate-100'
              }`}>
              Pesan Sekarang
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors ${isScrolled ? 'text-slate-600' : 'text-white'}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute w-full bg-white/95 backdrop-blur-xl border-b shadow-lg transition-all duration-300 ${isOpen ? 'top-full opacity-100' : '-top-[400px] opacity-0'}`}>
        <div className="px-4 py-6 space-y-4 flex flex-col items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-slate-700 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="w-full max-w-xs bg-primary text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-primary-hover transition-all">
            Pesan Sekarang
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;