import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SettingsState {
  voiceURI: string | null;
  speechRate: number;
  autoAdvance: boolean;
  reducedMotion: boolean;
  isMuted: boolean;
  leftHanded: boolean;
  setVoice: (uri: string) => void;
  setSpeechRate: (rate: number) => void;
  setAutoAdvance: (auto: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  setIsMuted: (muted: boolean) => void;
  setLeftHanded: (left: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      voiceURI: null,
      speechRate: 1,
      autoAdvance: true,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      isMuted: false,
      leftHanded: false,
      setVoice: (uri) => set({ voiceURI: uri }),
      setSpeechRate: (rate) => set({ speechRate: rate }),
      setAutoAdvance: (auto) => set({ autoAdvance: auto }),
      setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
      setIsMuted: (muted) => set({ isMuted: muted }),
      setLeftHanded: (left) => set({ leftHanded: left }),
    }),
    { name: 'fretpath-settings' }
  )
);
