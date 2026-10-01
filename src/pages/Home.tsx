import { Link } from 'react-router-dom';
import { Guitar, Activity, ShieldCheck, PlayCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-24 pb-32">
        <div className="absolute inset-0 bg-stone-950/40 z-0"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-stone-100 mb-6 tracking-tight">
            Master the Guitar.<br />
            <span className="text-amber-500">Step by Step.</span>
          </h1>
          <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            FretPath is your guided roadmap from absolute beginner to intermediate mastery. We use your browser's microphone to analyze your chords in real-time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/roadmap" className="bg-amber-500 text-stone-900 px-8 py-4 rounded-lg hover:bg-amber-400 transition-all font-bold shadow-lg hover:-translate-y-1 flex items-center">
              <PlayCircle className="mr-2 w-5 h-5" /> Start Your Journey
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-stone-800 py-24 border-y border-stone-700">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500 border border-stone-700">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-stone-100 mb-3">Structured Progression</h3>
              <p className="text-stone-400">Unlock new stages by passing interactive tests. Never feel lost or overwhelmed.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500 border border-stone-700">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-stone-100 mb-3">Audio Recognition</h3>
              <p className="text-stone-400">Our AI listens to your guitar through the mic and verifies your chords instantly.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500 border border-stone-700">
                <Guitar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-stone-100 mb-3">Interactive Tools</h3>
              <p className="text-stone-400">Built-in tuners, metronomes, and ear training exercises inside your browser.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
