import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <div className="relative font-sans bg-slate-50">
      <Navbar />
      <Hero />
      
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-20 px-4">
        <p className="text-center text-slate-400">Content selanjutnya: Featured Tours Grid...</p>
      </main>
    </div>
  );
}

export default App;