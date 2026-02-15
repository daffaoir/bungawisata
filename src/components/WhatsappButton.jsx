import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  // Ganti dengan nomor WhatsApp admin yang asli
  const phoneNumber = "6281234567890"; 
  const message = "Halo Bunga Wisata, saya tertarik dengan paket tour yang ada di website.";
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-wa-green text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 group flex items-center justify-center"
      aria-label="Chat via WhatsApp"
    >
      {/* Tooltip yang muncul saat di-hover */}
      <span className="absolute right-16 bg-white text-slate-800 px-4 py-2 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
        Tanya Admin Sekarang
      </span>
      
      <MessageCircle size={32} fill="currentColor" />
    </a>
  );
};

export default WhatsAppButton;