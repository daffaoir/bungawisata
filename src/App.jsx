import Navbar from './components/Navbar';

function App() {
  return (
    <div className="relative font-sans">
      <Navbar />
      
      {/* Spacer untuk Navbar Fixed */}
      <div className="pt-20">
        <div className="min-h-[120vh] bg-slate-50 flex flex-col items-center justify-center">
           <h2 className="text-xl text-slate-400 italic">Navbar Berhasil Terpasang!</h2>
           <p className="mt-4 text-slate-500">Coba scroll ke bawah dan tes mode mobile-nya.</p>
        </div>
      </div>
    </div>
  );
}

export default App;