import { useState, useEffect } from 'react';
import { useSettingsStore } from '../../lib/settings';
import { X, Settings2, Volume2, VolumeX, FastForward, Activity, PersonStanding } from 'lucide-react';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsDrawer({ isOpen, onClose }: SettingsDrawerProps) {
  const settings = useSettingsStore();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-stone-950/60 z-40 backdrop-blur-sm transition-opacity" 
          onClick={onClose} 
        />
      )}

      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-80 bg-stone-900 border-l border-stone-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-stone-800">
          <h2 className="text-xl font-bold text-stone-100 flex items-center">
            <Settings2 className="w-5 h-5 mr-2 text-amber-500" /> Settings
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-70px)]">
          {/* Guide Voice */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-stone-300 uppercase tracking-wider block">Guide Voice</label>
            <select 
              className="w-full bg-stone-800 border border-stone-700 text-stone-100 rounded px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              value={settings.voiceURI || ''}
              onChange={(e) => settings.setVoice(e.target.value)}
              aria-label="Select guide voice"
            >
              <option value="">Default System Voice</option>
              {voices.filter(v => v.lang.startsWith('en')).map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>

          {/* Speech Rate */}
          <div className="space-y-3">
            <label className="flex justify-between text-sm font-bold text-stone-300 uppercase tracking-wider">
              <span>Speech Rate</span>
              <span className="text-amber-500">{settings.speechRate}x</span>
            </label>
            <input 
              type="range" 
              min="0.5" max="2" step="0.1"
              value={settings.speechRate}
              onChange={(e) => settings.setSpeechRate(parseFloat(e.target.value))}
              className="w-full accent-amber-500"
              aria-label="Speech rate"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-4 pt-4 border-t border-stone-800">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="flex items-center text-stone-300 group-hover:text-stone-100 transition-colors">
                {settings.isMuted ? <VolumeX className="w-4 h-4 mr-3" /> : <Volume2 className="w-4 h-4 mr-3" />}
                Mute Guide
              </span>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" checked={settings.isMuted} onChange={(e) => settings.setIsMuted(e.target.checked)} />
                <div className="w-10 h-5 bg-stone-700 rounded-full peer peer-checked:bg-amber-500 peer-focus:ring-2 peer-focus:ring-amber-500 transition-colors"></div>
                <div className="absolute left-1 top-1 bg-stone-100 w-3 h-3 rounded-full transition-all peer-checked:translate-x-5"></div>
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer group">
              <span className="flex items-center text-stone-300 group-hover:text-stone-100 transition-colors">
                <FastForward className="w-4 h-4 mr-3" />
                Auto-Advance Steps
              </span>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" checked={settings.autoAdvance} onChange={(e) => settings.setAutoAdvance(e.target.checked)} />
                <div className="w-10 h-5 bg-stone-700 rounded-full peer peer-checked:bg-amber-500 peer-focus:ring-2 peer-focus:ring-amber-500 transition-colors"></div>
                <div className="absolute left-1 top-1 bg-stone-100 w-3 h-3 rounded-full transition-all peer-checked:translate-x-5"></div>
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer group">
              <span className="flex items-center text-stone-300 group-hover:text-stone-100 transition-colors">
                <Activity className="w-4 h-4 mr-3" />
                Reduced Motion
              </span>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" checked={settings.reducedMotion} onChange={(e) => settings.setReducedMotion(e.target.checked)} />
                <div className="w-10 h-5 bg-stone-700 rounded-full peer peer-checked:bg-amber-500 peer-focus:ring-2 peer-focus:ring-amber-500 transition-colors"></div>
                <div className="absolute left-1 top-1 bg-stone-100 w-3 h-3 rounded-full transition-all peer-checked:translate-x-5"></div>
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer group">
              <span className="flex items-center text-stone-300 group-hover:text-stone-100 transition-colors">
                <PersonStanding className="w-4 h-4 mr-3" />
                Left-Handed Mode
              </span>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" checked={settings.leftHanded} onChange={(e) => settings.setLeftHanded(e.target.checked)} />
                <div className="w-10 h-5 bg-stone-700 rounded-full peer peer-checked:bg-amber-500 peer-focus:ring-2 peer-focus:ring-amber-500 transition-colors"></div>
                <div className="absolute left-1 top-1 bg-stone-100 w-3 h-3 rounded-full transition-all peer-checked:translate-x-5"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
