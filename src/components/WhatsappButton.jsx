import React from 'react';

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/6281234567890?text=Halo%20Admin%20Bunga%20Wisata,%20saya%20ingin%20bertanya%20seputar%20paket%20tour."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform duration-300 drop-shadow-2xl group"
            aria-label="Chat with us on WhatsApp"
        >
            <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-slate-800 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
                Hubungi Kami
            </span>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-16 h-16"
            />
        </a>
    );
}
