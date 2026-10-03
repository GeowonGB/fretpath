import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-9xl font-bold text-stone-800 mb-4 select-none">404</h1>
      <h2 className="text-3xl font-bold text-stone-100 mb-4">Page not found</h2>
      <p className="text-stone-400 text-lg max-w-md mb-8">
        We couldn't find the page you're looking for. It might have been moved or doesn't exist yet in the current development phase.
      </p>
      <div className="flex space-x-4">
        <Link to="/" className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-900 rounded-lg font-bold transition-colors">
          <Home className="w-4 h-4 mr-2" /> Go Home
        </Link>
        <Link to="/roadmap" className="inline-flex items-center px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg font-medium transition-colors border border-stone-700">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Roadmap
        </Link>
      </div>
    </div>
  );
}
