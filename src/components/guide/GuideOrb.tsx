import { useState, useRef, Suspense, lazy, useEffect } from 'react';
import { useSettingsStore } from '../../lib/settings';
import type { OrbState } from './OrbRenderer';

const OrbRenderer = lazy(() => import('./OrbRenderer'));

export default function GuideOrb() {
  const [orbState, setOrbState] = useState<OrbState>('idle');
  const [hasInteracted, setHasInteracted] = useState(false);
  const settings = useSettingsStore();
  
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initX: number; initY: number; isMoving?: boolean } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 100),
        y: Math.min(prev.y, window.innerHeight - 100)
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setHasInteracted(true);
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, initX: position.x, initY: position.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    
    // Check if it was purely a click (no movement)
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragRef.current.isMoving = true;
    }

    setPosition({
      x: Math.max(16, Math.min(window.innerWidth - 96, dragRef.current.initX + dx)),
      y: Math.max(16, Math.min(window.innerHeight - 96, dragRef.current.initY + dy))
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    
    // Only trigger speech if they didn't drag it
    if (dragRef.current && !dragRef.current.isMoving) {
      handleOrbClick();
    }
    
    dragRef.current = null;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const handleOrbClick = () => {
    setHasInteracted(true);

    if (orbState === 'speaking') {
      window.speechSynthesis.cancel();
      setOrbState('idle');
      return;
    }
    
    if (settings.isMuted) return;

    const utterance = new SpeechSynthesisUtterance(
      "Welcome to FretPath! This is your interactive guitar learning journey. Follow the roadmap, complete chapters, and use your microphone to pass the pitch tests. Let's get shredding!"
    );
    utterance.rate = settings.speechRate;
    if (settings.voiceURI) {
      const voice = window.speechSynthesis.getVoices().find(v => v.voiceURI === settings.voiceURI);
      if (voice) utterance.voice = voice;
    }
    
    utterance.onstart = () => setOrbState('speaking');
    utterance.onend = () => setOrbState('idle');
    utterance.onerror = () => setOrbState('idle');
    
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      {/* Sketched Tooltip */}
      {!hasInteracted && (
        <div 
          className="fixed z-50 pointer-events-none flex flex-col items-end transition-opacity duration-1000"
          style={{
            left: `${position.x - 180}px`, // Place to the left of the orb
            top: `${position.y - 40}px`,   // Slightly above
          }}
        >
          <div className="text-amber-400 font-serif text-lg md:text-xl italic transform -rotate-6 animate-pulse drop-shadow-md">
            I'm your AI Tutor! Click me!
          </div>
          <svg viewBox="0 0 100 50" className="w-16 h-12 mr-4 transform rotate-12 stroke-amber-400 fill-none" style={{ strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
            <path d="M10,10 Q40,40 85,30" className="drop-shadow-md" />
            <path d="M75,15 L85,30 L65,35" className="drop-shadow-md" />
          </svg>
        </div>
      )}

      {/* Floating Orb */}
      <div
        className="fixed z-40 shadow-[0_0_20px_rgba(245,158,11,0.2)] bg-stone-900 border border-stone-700 overflow-hidden rounded-full hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-shadow"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '80px',
          height: '80px',
          cursor: isDragging ? 'grabbing' : 'pointer',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        aria-label="AI Guide Orb"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleOrbClick();
          }
        }}
      >
        <div className="w-full h-full relative">
          <Suspense fallback={<div className="w-full h-full rounded-full bg-cyan-900/50" />}>
            <OrbRenderer orbState={orbState} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
