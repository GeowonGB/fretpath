import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Roadmap from './pages/Roadmap';
import Home from './pages/Home';
import Stage from './pages/Stage';
import Chapter from './pages/Chapter';
import Test from './pages/Test';
import Tuner from './pages/Tuner';
import Fretboard from './pages/Fretboard';
import NotFound from './pages/NotFound';
import Header from './components/layout/Header';
import GuideOrb from './components/guide/GuideOrb';
import SettingsDrawer from './components/layout/SettingsDrawer';
import { useState } from 'react';

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-900 text-stone-300 flex flex-col font-sans">
        <Header onOpenSettings={() => setSettingsOpen(true)} />
        <main className="flex-1 relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/fretboard" element={<Fretboard />} />
            <Route path="/tools" element={<Tuner />} />
            <Route path="/stage/:stageId" element={<Stage />} />
            <Route path="/stage/:stageId/test" element={<Test />} />
            <Route path="/stage/:stageId/:chapterId" element={<Chapter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Global Guide Components */}
        <GuideOrb />
        <SettingsDrawer isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
