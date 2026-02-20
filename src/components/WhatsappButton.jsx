import React from 'react';
import { Phone } from 'lucide-react';

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all animate-bounce"
            aria-label="Chat with us on WhatsApp"
        >
            <Phone size={32} fill="white" />
        </a>
    );
}
