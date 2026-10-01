import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress, StageProgress } from '../types/schema';
import { STAGES } from '../data';
import { isUnlocked } from './gating';

interface ProgressStore extends UserProgress {
  markChapter: (stageId: string, chapterId: string) => void;
  recordTest: (stageId: string, score: number) => void;
  reset: () => void;
}

const initialState: Record<string, StageProgress> = STAGES.reduce((acc, stage) => {
  acc[stage.id] = { status: 'locked', chaptersCompleted: [], testScore: null };
  return acc;
}, {} as Record<string, StageProgress>);
if (STAGES.length > 0) initialState[STAGES[0].id].status = 'unlocked';

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      streak: 0,
      lastActiveDate: new Date().toISOString(),
      totalPracticeTimeMs: 0,
      stageProgress: initialState,

      markChapter: (stageId, chapterId) => {
        set((state) => {
          const stage = state.stageProgress[stageId] || { status: 'locked', chaptersCompleted: [], testScore: null };
          if (stage.chaptersCompleted.includes(chapterId)) return state;
          
          const newStageProgress = { ...state.stageProgress, [stageId]: { ...stage, chaptersCompleted: [...stage.chaptersCompleted, chapterId] } };
          
          // Re-evaluate locks
          STAGES.forEach((s, idx) => {
            if (idx > 0) {
              const unlocked = isUnlocked(idx, STAGES, newStageProgress);
              if (newStageProgress[s.id]) {
                newStageProgress[s.id].status = unlocked ? 'unlocked' : 'locked';
              }
            }
          });
          return { stageProgress: newStageProgress };
        });
      },

      recordTest: (stageId, score) => {
        set((state) => {
          const stage = state.stageProgress[stageId] || { status: 'locked', chaptersCompleted: [], testScore: null };
          const newStageProgress = { ...state.stageProgress, [stageId]: { ...stage, testScore: Math.max(score, stage.testScore || 0) } };
          
          STAGES.forEach((s, idx) => {
            if (idx > 0) {
              const unlocked = isUnlocked(idx, STAGES, newStageProgress);
              if (newStageProgress[s.id]) {
                newStageProgress[s.id].status = unlocked ? 'unlocked' : 'locked';
              }
            }
          });
          return { stageProgress: newStageProgress };
        });
      },

      reset: () => set({ stageProgress: initialState })
    }),
    { name: 'fretpath-progress' }
  )
);
