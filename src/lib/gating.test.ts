import { describe, it, expect } from 'vitest';
import { unlockReason } from './gating';
import type { Stage, StageProgress } from '../types/schema';

const mockStage: Stage = {
  id: 'stage-1',
  title: 'Test Stage',
  description: '',
  passMark: 0.7,
  chapterThreshold: 0.8,
  chapters: [{ id: 'ch1', title: '', summary: '', blocks: [], quiz: [] }, { id: 'ch2', title: '', summary: '', blocks: [], quiz: [] }],
  finalTest: []
};

describe('Gating Logic', () => {
  it('unlocks if test score >= passMark', () => {
    const progress: StageProgress = { status: 'unlocked', chaptersCompleted: [], testScore: 75 };
    expect(unlockReason(mockStage, progress)).toBe('test');
  });

  it('unlocks if chapter threshold met', () => {
    const progress: StageProgress = { status: 'unlocked', chaptersCompleted: ['ch1', 'ch2'], testScore: null };
    expect(unlockReason(mockStage, progress)).toBe('chapters');
  });

  it('remains locked if neither met', () => {
    const progress: StageProgress = { status: 'unlocked', chaptersCompleted: ['ch1'], testScore: 50 };
    expect(unlockReason(mockStage, progress)).toBe('locked');
  });
});
