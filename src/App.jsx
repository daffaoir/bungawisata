import Navbar from './components/Navbar';

function App() {
  return (
    <div className="relative font-sans">
      <Navbar />
      
      {/* Spacer agar konten tidak tertutup Navbar Fixed */}
      <div className="pt-20">
        <div className="min-h-[120vh] bg-slate-50 flex items-center justify-center">
           <p className="text-slate-400">Navbar Ready! Siap ke Tahap 3.</p>
        </div>
      </div>
    </div>
  );
}

export default App;