import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedTours from './components/FeaturedTours';

function App() {
  return (
    <div className="relative font-sans bg-slate-50 min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedTours />
      
      {/* Footer Sederhana */}
      <footer className="bg-white border-t py-10 text-center text-slate-400 text-sm">
        &copy; 2026 Bunga Wisata Indonesia. All rights reserved.
      </footer>
    </div>
  );
}

export default App;