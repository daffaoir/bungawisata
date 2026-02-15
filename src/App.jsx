import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedTours from './components/FeaturedTours';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="relative font-sans bg-slate-50 min-h-screen selection:bg-primary/20">
      <Navbar />
      <Hero />
      
      {/* Memberikan sedikit padding agar jarak antar section lebih lega */}
      <div className="pt-10">
        <FeaturedTours />
      </div>

      {/* WhatsApp Button selalu di atas konten lain */}
      <WhatsAppButton />

      {/* Footer yang lebih lengkap sesuai standar olovetour */}
      <footer className="bg-slate-900 text-white py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4">Bunga Wisata</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Solusi perjalanan wisata lokal terpercaya di Indonesia. Kami siap menemani petualangan Anda di Jogja, Bali, Semarang, dan sekitarnya.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Layanan</h4>
            <ul className="text-slate-400 text-sm space-y-2">
              <li className="hover:text-white cursor-pointer transition-colors">Paket Tour Jogja</li>
              <li className="hover:text-white cursor-pointer transition-colors">Sewa Mobil Bali</li>
              <li className="hover:text-white cursor-pointer transition-colors">Custom Trip</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Hubungi Kami</h4>
            <p className="text-slate-400 text-sm mb-2">Email: halo@bungawisata.com</p>
            <p className="text-slate-400 text-sm">Alamat: Jl. Wisata No. 336, Malang</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-10 pt-8 text-center text-slate-500 text-xs">
          &copy; 2026 Bunga Wisata Indonesia. Dikembangkan dengan React & Tailwind CSS.
        </div>
      </footer>
    </div>
  );
}

export default App;