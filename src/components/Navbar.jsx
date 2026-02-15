import React, { useState } from 'react';
import { Menu, X, Palmtree } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', href: '#' },
    { name: 'Paket Wisata', href: '#' },
    { name: 'Sewa Mobil', href: '#' },
    { name: 'Kontak', href: '#' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Palmtree className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-primary tracking-tight">
              Bunga<span className="text-secondary">Wisata</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 hover:text-primary font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary-hover transition-all shadow-md shadow-primary/20">
              Pesan Sekarang
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-primary p-2 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute w-full bg-white border-b transition-all duration-300 ease-in-out ${
          isOpen ? 'top-20 opacity-100' : '-top-96 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-4 text-base font-medium text-slate-600 hover:text-primary hover:bg-blue-50 rounded-xl"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4">
            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold">
              Pesan Sekarang
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;