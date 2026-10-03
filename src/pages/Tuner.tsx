import { Link } from 'react-router-dom';
import { Settings2, ArrowLeft } from 'lucide-react';

export default function Tuner() {
  return (
    <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 bg-stone-800 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(245,158,11,0.15)] border border-stone-700">
        <Settings2 className="w-10 h-10 text-amber-500" />
      </div>
      <h1 className="text-4xl font-bold text-stone-100 mb-4">Interactive Tuner</h1>
      <p className="text-stone-400 text-lg max-w-lg mb-8">
        The real-time audio pitch detection tuner is scheduled to be built in <strong>Phase 3</strong>. It will use your device's microphone to help you tune your guitar perfectly!
      </p>
      <Link to="/" className="inline-flex items-center px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg font-medium transition-colors border border-stone-700">
        <ArrowLeft className="w-4 h-4 mr-2" /> Return to Home
      </Link>
    </div>
  );
}
