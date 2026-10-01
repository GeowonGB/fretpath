import { Guitar, Menu, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onOpenSettings?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  return (
    <header className="sticky top-0 z-50 bg-stone-900/80 backdrop-blur-md border-b border-stone-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-stone-100 hover:text-amber-500 transition-colors">
          <Guitar className="w-8 h-8 text-amber-500" />
          <span className="text-2xl font-bold tracking-tight">FretPath</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/roadmap" className="hover:text-amber-500 transition-colors">Roadmap</Link>
            <Link to="/fretboard" className="hover:text-amber-500 transition-colors">Fretboard</Link>
            <Link to="/tools" className="hover:text-amber-500 transition-colors">Tuner</Link>
          </div>
          
          <button 
            onClick={onOpenSettings}
            className="text-stone-300 hover:text-amber-500 transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          <button className="md:hidden text-stone-300 hover:text-amber-500 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
